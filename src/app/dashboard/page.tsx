"use client"
import {useAuth} from "@/components/auth/AuthContext";

export default  function DashboardPage() {
    const { user } = useAuth();
    console.log(user);
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Welcome to your Dashboard</h1>
      <p>You are logged in as: {user?.email || user?.username}</p>
    </div>
  )
}

