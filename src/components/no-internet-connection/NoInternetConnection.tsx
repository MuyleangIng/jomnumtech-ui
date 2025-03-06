"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { WifiOff } from "lucide-react"
import Tetris from "./tetris"
import CustomAlert from "./CustomAlert"

interface OfflineHandlerProps {
	children: React.ReactNode
}

export default function NoInternetConnection({ children }: OfflineHandlerProps) {
	const [isOnline, setIsOnline] = useState(true)
	const [showGame, setShowGame] = useState(false)
	const [alertMessage, setAlertMessage] = useState("")
	const [alertType, setAlertType] = useState("online")
	const [loading, setLoading] = useState(false)

	const handleTryAgain = () => {
		setLoading(true)
		setTimeout(() => {
			window.location.reload()
			setLoading(false)
		}, 2000)

		setAlertMessage("Trying to reconnect...")
	}

	useEffect(() => {
		// Check initial online status
		setIsOnline(navigator.onLine)

		const handleOnline = () => {
			setIsOnline(true)
			setAlertMessage("You are back online!")
			setAlertType("online")

			// Hide the game after a short delay when coming back online
			setTimeout(() => {
				setShowGame(false)
			}, 3000)
		}

		const handleOffline = () => {
			setIsOnline(false)
			setShowGame(true)
			setAlertMessage("You are offline!")
			setAlertType("offline")
		}

		window.addEventListener("online", handleOnline)
		window.addEventListener("offline", handleOffline)

		return () => {
			window.removeEventListener("online", handleOnline)
			window.removeEventListener("offline", handleOffline)
		}
	}, [])

	// For testing purposes - allow manually toggling the game
	const toggleGameManually = () => {
		setShowGame(!showGame)
	}

	return (
		<>
			{alertMessage && <CustomAlert message={alertMessage} type={alertType} />}

			{isOnline && !showGame ? (
				children
			) : (
				<div className="flex h-[calc(100vh-80px)] flex-col items-center justify-center p-5 w-full bg-white dark:bg-gray-900 dark:text-white">
					<div className="text-center mb-6">
						<div className="inline-flex rounded-full bg-red-100 p-4 dark:bg-gray-700 mb-4">
							<div className="rounded-full stroke-red-600 bg-red-200 p-4 dark:bg-gray-800">
								<WifiOff className="w-16 h-16 text-red-500 dark:text-red-400" />
							</div>
						</div>
						<h1 className="mt-5 text-[36px] font-bold text-slate-800 lg:text-[50px] dark:text-slate-400">
							គ្មានការតភ្ជាប់អ៊ីនធឺណិត
						</h1>
						<p className="text-slate-600 mt-5 lg:text-lg dark:text-slate-500 mb-6">
							សូមពិនិត្យមើលការតភ្ជាប់អ៊ីនធឺណិតរបស់អ្នក ហើយព្យាយាមម្តងទៀត។
						</p>

						<div className="flex flex-col items-center gap-4">
							<p className="text-lg font-medium">Play Tetris while you wait</p>
							<Tetris />

							<Button
								className="mt-6 bg-BackgroundColor hover:bg-Btn text-white py-2 rounded-[10px] focus:outline-none focus:ring-2 focus:ring-blue-500"
								onClick={handleTryAgain}
								disabled={loading}
							>
								{loading ? "កំពុងភ្ជាប់..." : "ព្យាយាមម្តងទៀត"}
							</Button>
						</div>
					</div>
				</div>
			)}
		</>
	)
}

