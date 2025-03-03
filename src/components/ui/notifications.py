from fastapi import APIRouter, Depends, WebSocket, WebSocketDisconnect, Query
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.models.notification import Notification
from app.models.user import User
from app.auth.auth import get_current_user
from typing import List
from pydantic import BaseModel
import json

router = APIRouter()

class NotificationResponse(BaseModel):
    id: int
    user_id: int
    sender_id: int
    article_id: int
    notification_type: str
    created_at: str
    comment_id: int | None
    is_read: bool

    class Config:
        orm_mode = True

class ConnectionManager:
    def __init__(self):
        self.active_connections: dict[int, WebSocket] = {}

    async def connect(self, websocket: WebSocket, user_id: int):
        await websocket.accept()
        self.active_connections[user_id] = websocket

    def disconnect(self, user_id: int):
        if user_id in self.active_connections:
            del self.active_connections[user_id]

    async def send_notification(self, user_id: int, notification: NotificationResponse):
        if user_id in self.active_connections:
            await self.active_connections[user_id].send_text(notification.json())

manager = ConnectionManager()

@router.get("/notifications", response_model=List[NotificationResponse])
def get_notifications(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
    unread_only: bool = False
):
    query = db.query(Notification).filter(Notification.user_id == current_user.id)
    
    if unread_only:
        query = query.filter(Notification.is_read == False)
    
    notifications = query.order_by(Notification.created_at.desc()).all()
    return [NotificationResponse.from_orm(n) for n in notifications]

@router.get("/notifications/unread_count")
def get_unread_count(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    count = db.query(Notification).filter(
        Notification.user_id == current_user.id,
        Notification.is_read == False
    ).count()
    return {"unread_count": count}

@router.post("/notifications/{notification_id}/read")
def mark_notification_as_read(
    notification_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    notification = db.query(Notification).filter(
        Notification.id == notification_id,
        Notification.user_id == current_user.id
    ).first()
    
    if notification:
        notification.is_read = True
        db.commit()
        return {"success": True}
    return {"success": False, "message": "Notification not found"}

@router.websocket("/ws/notifications")
async def websocket_endpoint(
    websocket: WebSocket,
    token: str = Query(...),
    db: Session = Depends(get_db)
):
    user = get_current_user(token, db)
    if not user:
        await websocket.close(code=4001)
        return

    await manager.connect(websocket, user.id)
    try:
        while True:
            await websocket.receive_text()
    except WebSocketDisconnect:
        manager.disconnect(user.id)

# Add this function to your notification creation logic
async def send_notification(user_id: int, notification: Notification, db: Session):
    notification_response = NotificationResponse.from_orm(notification)
    await manager.send_notification(user_id, notification_response)

