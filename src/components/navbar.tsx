//
// "use client"
//
// import {useEffect, useRef, useState} from "react"
// import Link from "next/link"
// import Image from "next/image"
// import { Bell, Edit, LogIn, Search, User, Webhook, Code, Menu, X } from "lucide-react"
// import { useAuth } from "@/components/auth/AuthContext"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { ThemeToggle } from "@/components/theme-toggle"
// import { AuthDialog } from "@/components/auth/auth-dialog"
// import {
//     DropdownMenu,
//     DropdownMenuContent,
//     DropdownMenuItem,
//     DropdownMenuSeparator,
//     DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
// // import {Notifications} from "@/components/Notifications";
//
// export function Navbar() {
//     const [authDialogOpen, setAuthDialogOpen] = useState(false)
//     const [authDialogView, setAuthDialogView] = useState<"sign-in" | "sign-up">("sign-in")
//     const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
//     const [isSearchOpen, setIsSearchOpen] = useState(false) // 🔍 State for search popup
//     const { user, logout , tokens } = useAuth()
//     const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
//     const dropdownRef = useRef<HTMLDivElement>(null)
//
//     const handleSignInClick = () => {
//         setAuthDialogView("sign-in")
//         setAuthDialogOpen(true)
//     }
//     // Close dropdown when clicking outside
//     useEffect(() => {
//         function handleClickOutside(event: MouseEvent) {
//             if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
//                 setIsNotificationsOpen(false)
//             }
//         }
//         document.addEventListener("mousedown", handleClickOutside)
//         return () => document.removeEventListener("mousedown", handleClickOutside)
//     }, [])
//     return (
//         <>
//             {/* Main Navbar */}
//             <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
//                 <div className="container flex h-16 items-center justify-between px-4 md:px-6">
//
//                     {/* Left Side (Logo) */}
//                     <Link href="/" className="flex items-center space-x-2">
//                         <Image src="/jom.png" alt={"jomnumtech-logo"} className="h-8 w-8"
//                             width={100}
//                                height={100}
//                         />
//                         {/*<span className="hidden font-bold md:inline-block text-[rgb(10,61,243)]">JomNum Blog</span>*/}
//
//                         <span className="hidden font-bold md:inline-block">JomNum Blog</span>
//                     </Link>
//
//                     {/* Search Bar (Visible on Desktop, Hidden on Mobile) */}
//                     <div className="hidden md:flex flex-1 max-w-sm">
//                         <div className="relative w-full">
//                             <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
//                             <Input
//                                 type="search"
//                                 placeholder="Search articles..."
//                                 className="w-full rounded-full bg-background pl-8 md:w-[300px] lg:w-[400px]"
//                             />
//                         </div>
//                     </div>
//
//                     {/* Right Side (Nav Icons & Mobile Menu Button) */}
//                     <div className="flex items-center space-x-2 md:space-x-4">
//
//                         {/* Search Icon (Opens Popup on Mobile) */}
//                         <Button
//                             variant="ghost"
//                             size="icon"
//                             className="md:hidden"
//                             onClick={() => setIsSearchOpen(!isSearchOpen)}
//                         >
//                             <Search className="h-5 w-5" />
//                         </Button>
//
//                         {/* Playground Button - Hidden on Mobile */}
//                         <div className="hidden md:flex">
//                             <Button
//                                 variant="outline"
//                                 size="lg"
//                                 asChild
//                                 className="px-4 py-2 flex items-center gap-3 rounded-lg shadow-md
//                   border border-gray-300 hover:border-blue-500
//                   hover:bg-blue-50 transition-all duration-300"
//                             >
//                                 <Link href="/playground" className="flex items-center gap-2">
//                                     <Code className="w-5 h-5 text-blue-500" />
//                                     <span className="text-lg font-semibold text-gray-700">Playground</span>
//                                 </Link>
//                             </Button>
//                         </div>
//
//                         {/*/!* Notifications *!/*/}
//                         {/*<Button variant="ghost" size="icon">*/}
//                         {/*    <Bell className="h-5 w-5" />*/}
//                         {/*</Button>*/}
//                         {/* Notifications (Bell Icon)*/}
//                         {/* Notifications (Bell Icon) with Alert Count*/}
//                         <div className="relative">
//                             <Button variant="ghost" size="icon" onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}>
//                                 <Bell className="h-5 w-5" />
//                                 {/* Notification Badge (Only shows if there are notifications) */}
//                                 {3 > 0 && (
//                                     <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
//                 3
//             </span>
//                                 )}
//                             </Button>
//
//                             {/* Notification Dropdown (Centered Below) */}
//                             {isNotificationsOpen && (
//                                 <div
//                                     ref={dropdownRef}
//                                     className="absolute right-1/2 translate-x-1/2 mt-2 w-64 bg-white shadow-md border rounded-lg p-3 z-50"
//                                 >
//                                     <p className="text-sm font-semibold">Notifications</p>
//                                     <ul className="mt-2 space-y-2">
//                                         <li className="text-sm p-2 hover:bg-gray-100 rounded cursor-pointer">🔔 New article published!</li>
//                                         <li className="text-sm p-2 hover:bg-gray-100 rounded cursor-pointer">📩 You have a new message</li>
//                                         <li className="text-sm p-2 hover:bg-gray-100 rounded cursor-pointer">🚀 Check out our latest update!</li>
//                                     </ul>
//                                 </div>
//                             )}
//                         </div>
//                         {/*<Notifications />*/}
//                         <Button variant="ghost" size="icon" asChild>
//                            <Link href="/write">
//                              <Edit className="h-5 w-5" />
//                              <span className="sr-only">Write</span>
//                            </Link>
//                          </Button>
//
//                         {/* Theme Toggle (Dark Mode / Light Mode) */}
//                         <ThemeToggle />
//
//                         {/* User Profile or Auth Buttons */}
//                         {user ? (
//                             <DropdownMenu>
//                                 <DropdownMenuTrigger asChild>
//                                     <Button variant="ghost" size="icon" className="rounded-full">
//                                         {user.profile_image ? (
//                                             <Image
//                                                 src={user.profile_image || "/placeholder.svg"}
//                                                 alt={user.username || "User"}
//                                                 className="h-8 w-8 rounded-full"
//                                                 width={100}
//                                                 height={100}
//                                                 unoptimized
//                                             />
//                                         ) : (
//                                             <User className="h-5 w-5" />
//                                         )}
//                                     </Button>
//                                 </DropdownMenuTrigger>
//                                 <DropdownMenuContent align="end">
//                                     <DropdownMenuItem asChild>
//                                         <Link href="/profile">Profile</Link>
//                                     </DropdownMenuItem>
//                                     <DropdownMenuItem asChild>
//                                         <Link href="/settings">Settings</Link>
//                                     </DropdownMenuItem>
//                                     <DropdownMenuSeparator />
//                                     <DropdownMenuItem onClick={logout}>Sign out</DropdownMenuItem>
//                                 </DropdownMenuContent>
//                             </DropdownMenu>
//                         ) : (
//                             <>
//                                 <Button variant="ghost" size="icon" onClick={handleSignInClick}>
//                                     <LogIn className="h-5 w-5" />
//                                 </Button>
//                             </>
//                         )}
//
//                         {/* Mobile Menu Button */}
//                         <Button
//                             variant="ghost"
//                             size="icon"
//                             className="md:hidden"
//                             onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//                         >
//                             <Menu className="h-6 w-6" />
//                         </Button>
//                     </div>
//                 </div>
//             </header>
//
//             {/* 🔍 Search Popup (Positioned Below Navbar) */}
//             {isSearchOpen && (
//                 <div className="absolute left-0 right-0 top-16 bg-white shadow-md border-t p-4 flex items-center z-40">
//                     <div className="relative w-full">
//                         <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
//                         <Input
//                             type="search"
//                             placeholder="Search articles..."
//                             className="w-full rounded-full bg-background pl-8"
//                             autoFocus
//                         />
//                     </div>
//                     <Button
//                         variant="ghost"
//                         size="icon"
//                         className="ml-2"
//                         onClick={() => setIsSearchOpen(false)}
//                     >
//                         <X className="h-5 w-5" />
//                     </Button>
//                 </div>
//             )}
//
//             {/* Mobile Menu (Shows when toggled) */}
//             {isMobileMenuOpen && (
//                 <div className="absolute top-16 left-0 w-full bg-white shadow-md border-b p-4 flex flex-col space-y-3 md:hidden z-50">
//                     {/* Playground (Moved to Mobile Menu) */}
//                     <Link href="/playground" className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded">
//                         <Code className="w-5 h-5 text-blue-500" />
//                         <span className="text-lg font-semibold text-gray-700">Playground</span>
//                     </Link>
//
//                     {/* Write Article (Moved to Mobile Menu) */}
//                     <Link href="/write" className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded">
//                         <Edit className="h-5 w-5" />
//                         <span>Write Article</span>
//                     </Link>
//
//                     {/* Notifications */}
//                     <Link href="/notifications" className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded">
//                         <Bell className="h-5 w-5" />
//                         <span>Notifications</span>
//                     </Link>
//
//                     {/* Profile */}
//                     <Link href="/profile" className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded">
//                         <User className="h-5 w-5" />
//                         <span>Profile</span>
//                     </Link>
//                 </div>
//             )}
//
//             <AuthDialog open={authDialogOpen} onOpenChange={setAuthDialogOpen} initialView={authDialogView} />
//         </>
//     )
// }
"use client"
import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import {
    Bell,
    Edit,
    LogIn,
    Search,
    User,
    Code,
    Menu,
    X,
    MapPin,
    Cloud,
    CloudRain,
    Sun,
    ChevronDown,
    Clock,
} from "lucide-react"
import { useAuth } from "@/components/auth/AuthContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ThemeToggle } from "@/components/theme-toggle"
import { AuthDialog } from "@/components/auth/auth-dialog"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

// Types for location and weather data
interface LocationData {
    city: string
    country: string
    latitude: number
    longitude: number
}

interface WeatherData {
    temp: number
    condition: string
    icon: string
    humidity: number
    windSpeed: number
    feelsLike: number
}

export function Navbar() {
    const [authDialogOpen, setAuthDialogOpen] = useState(false)
    const [authDialogView, setAuthDialogView] = useState<"sign-in" | "sign-up">("sign-in")
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const { user, logout, tokens } = useAuth()
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

    const [currentTime, setCurrentTime] = useState(new Date())
    const [weather, setWeather] = useState<WeatherData | null>(null)
    const [location, setLocation] = useState<LocationData | null>(null)
    const [locationError, setLocationError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    const handleSignInClick = () => {
        setAuthDialogView("sign-in")
        setAuthDialogOpen(true)
    }

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsNotificationsOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    // Get user's location and weather data
    useEffect(() => {
        const getUserLocation = async () => {
            try {
                // First get the user's IP
                const ipResponse = await fetch("https://api64.ipify.org?format=json")
                const ipData = await ipResponse.json()
                const userPublicIP = ipData.ip
                console.log("User IP:", ipResponse)
                // Then get location from IP
                const locationResponse = await fetch(`https://geolocation-db.com/json/${userPublicIP}&position=true`)
                const locationData = await locationResponse.json()
                console.log("locationRe",locationData)
                // Set location data
                setLocation({
                    city: locationData.city || "Unknown",
                    country: locationData.country_name || "Unknown",
                    latitude: locationData.latitude || 0,
                    longitude: locationData.longitude || 0,
                })

                // Now get weather data using the coordinates
                const weatherResponse = await fetch(
                    `https://api.openweathermap.org/data/2.5/weather?lat=${locationData.latitude}&lon=${locationData.longitude}&units=metric&appid=YOUR_API_KEY`,
                )

                if (!weatherResponse.ok) {
                    // Use mock data for testing if weather API fails
                    setWeather({
                        temp: 22,
                        condition: "Clear",
                        icon: "01d",
                        humidity: 65,
                        windSpeed: 5.2,
                        feelsLike: 23,
                    })
                    return
                }

                const weatherData = await weatherResponse.json()
                setWeather({
                    temp: Math.round(weatherData.main.temp),
                    condition: weatherData.weather[0].main,
                    icon: weatherData.weather[0].icon,
                    humidity: weatherData.main.humidity,
                    windSpeed: weatherData.wind.speed,
                    feelsLike: Math.round(weatherData.main.feels_like),
                })
            } catch (error) {
                console.error("Error fetching location/weather data:", error)
                // Use fallback data for testing
                setLocation({
                    city: "New York",
                    country: "US",
                    latitude: 40.7128,
                    longitude: -74.006,
                })
                setWeather({
                    temp: 22,
                    condition: "Clear",
                    icon: "01d",
                    humidity: 65,
                    windSpeed: 5.2,
                    feelsLike: 23,
                })
            } finally {
                setIsLoading(false)
            }
        }

        getUserLocation()
    }, [])
    const formattedTime = currentTime
        .toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
        })
        .replace(":", ":")

    // Get weather icon based on condition
    const getWeatherIcon = () => {
        if (!weather) return <Cloud className="h-5 w-5" />

        switch (weather.condition.toLowerCase()) {
            case "rain":
            case "drizzle":
            case "thunderstorm":
                return <CloudRain className="h-5 w-5" />
            case "clear":
                return <Sun className="h-5 w-5" />
            default:
                return <Cloud className="h-5 w-5" />
        }
    }

    return (
        <>
            {/* Main Navbar */}
            <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container flex h-16 items-center justify-between px-4 md:px-6">
                    {/* Left Side (Logo) */}
                    <Link href="/" className="flex items-center space-x-2">
                        <Image src="/jom.png" alt={"jomnumtech-logo"} className="h-8 w-8" width={100} height={100} />
                        <span className="hidden font-bold md:inline-block">JomNum Blog</span>
                    </Link>

                    {/* Center - Compact Status Information with Dropdown */}
                    <div className="hidden md:flex items-center">
                        {/* Location */}
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-8 gap-1">
                                    <MapPin className="h-4 w-4 text-blue-500" />
                                    {isLoading ? (
                                        <span className="text-xs">Loading...</span>
                                    ) : (
                                        <>
                                            {location && <span className="text-xs font-medium">{location.city}</span>}
                                            <ChevronDown className="h-3 w-3 opacity-50" />
                                        </>
                                    )}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-64">
                                {location ? (
                                    <div className="space-y-2">
                                        <h4 className="font-medium leading-none">Location Details</h4>
                                        <div className="text-sm text-muted-foreground">
                                            <div className="flex justify-between py-1">
                                                <span>City:</span>
                                                <span>{location.city}</span>
                                            </div>
                                            <div className="flex justify-between py-1">
                                                <span>Country:</span>
                                                <span>{location.country}</span>
                                            </div>
                                            <div className="flex justify-between py-1">
                                                <span>Coordinates:</span>
                                                <span>
                          {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}
                        </span>
                                            </div>
                                        </div>
                                        <div className="pt-2">
                                            <a
                                                href={`https://www.google.com/maps/search/?api=1&query=${location.latitude},${location.longitude}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-xs text-blue-500 hover:underline"
                                            >
                                                View on Google Maps
                                            </a>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-sm text-muted-foreground">{locationError || "Loading location data..."}</div>
                                )}
                            </PopoverContent>
                        </Popover>

                        {/* Time */}
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-8 gap-1">
                                    <Clock className="h-4 w-4" />
                                    <span className="text-xs font-medium">{formattedTime}</span>
                                    <ChevronDown className="h-3 w-3 opacity-50" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-64">
                                <div className="space-y-2">
                                    <h4 className="font-medium leading-none">Date & Time</h4>
                                    <div className="text-sm text-muted-foreground">
                                        <div className="flex justify-between py-1">
                                            <span>Local Time:</span>
                                            <span>
                        {currentTime.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit",
                            hour12: true,
                        })}
                      </span>
                                        </div>
                                        <div className="flex justify-between py-1">
                                            <span>Date:</span>
                                            <span>
                        {currentTime.toLocaleDateString([], {
                            month: "numeric",
                            day: "numeric",
                            year: "numeric",
                        })}
                      </span>
                                        </div>
                                        <div className="flex justify-between py-1">
                                            <span>Timezone:</span>
                                            <span>{Intl.DateTimeFormat().resolvedOptions().timeZone}</span>
                                        </div>
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>
                    </div>

                    {/* Search Bar (Visible on Desktop, Hidden on Mobile) */}
                    <div className="hidden md:flex flex-1 max-w-sm">
                        <div className="relative w-full">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder="Search articles..."
                                className="w-full rounded-full bg-background pl-8 md:w-[300px] lg:w-[400px]"
                            />
                        </div>
                    </div>

                    {/* Right Side (Nav Icons & Mobile Menu Button) */}
                    <div className="flex items-center space-x-2 md:space-x-4">
                        {/* Search Icon (Opens Popup on Mobile) */}
                        <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsSearchOpen(!isSearchOpen)}>
                            <Search className="h-5 w-5" />
                        </Button>

                        {/* Playground Button - Hidden on Mobile */}
                        <div className="hidden md:flex">
                            <Button
                                variant="outline"
                                size="lg"
                                asChild
                                className="px-4 py-2 flex items-center gap-3 rounded-lg shadow-md
                  border border-gray-300 hover:border-blue-500
                  hover:bg-blue-50 transition-all duration-300"
                            >
                                <Link href="/playground" className="flex items-center gap-2">
                                    <Code className="w-5 h-5 text-blue-500" />
                                    <span className="text-lg font-semibold text-gray-700">Playground</span>
                                </Link>
                            </Button>
                        </div>

                        {/* Notifications (Bell Icon) with Alert Count*/}
                  {/*      <div className="relative">*/}
                  {/*          <Button variant="ghost" size="icon" onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}>*/}
                  {/*              <Bell className="h-5 w-5" />*/}
                  {/*              /!* Notification Badge (Only shows if there are notifications) *!/*/}
                  {/*              {3 > 0 && (*/}
                  {/*                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">*/}
                  {/*  3*/}
                  {/*</span>*/}
                  {/*              )}*/}
                  {/*          </Button>*/}

                  {/*          /!* Notification Dropdown (Centered Below) *!/*/}
                  {/*          {isNotificationsOpen && (*/}
                  {/*              <div*/}
                  {/*                  ref={dropdownRef}*/}
                  {/*                  className="absolute right-1/2 translate-x-1/2 mt-2 w-64 bg-white shadow-md border rounded-lg p-3 z-50"*/}
                  {/*              >*/}
                  {/*                  <p className="text-sm font-semibold">Notifications</p>*/}
                  {/*                  <ul className="mt-2 space-y-2">*/}
                  {/*                      <li className="text-sm p-2 hover:bg-gray-100 rounded cursor-pointer">🔔 New article published!</li>*/}
                  {/*                      <li className="text-sm p-2 hover:bg-gray-100 rounded cursor-pointer">📩 You have a new message</li>*/}
                  {/*                      <li className="text-sm p-2 hover:bg-gray-100 rounded cursor-pointer">*/}
                  {/*                          🚀 Check out our latest update!*/}
                  {/*                      </li>*/}
                  {/*                  </ul>*/}
                  {/*              </div>*/}
                  {/*          )}*/}
                  {/*      </div>*/}

                        <Button variant="ghost" size="icon" asChild>
                            <Link href="/write">
                                <Edit className="h-5 w-5" />
                                <span className="sr-only">Write</span>
                            </Link>
                        </Button>

                        {/* Theme Toggle (Dark Mode / Light Mode) */}
                        <ThemeToggle />

                        {/* User Profile or Auth Buttons */}
                        {user ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="rounded-full">
                                        {user.profile_image ? (
                                            <Image
                                                src={user.profile_image || "/placeholder.svg"}
                                                alt={user.username || "User"}
                                                className="h-8 w-8 rounded-full"
                                                width={100}
                                                height={100}
                                                unoptimized
                                            />
                                        ) : (
                                            <User className="h-5 w-5" />
                                        )}
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem asChild>
                                        <Link href="/profile">Profile</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <Link href="/settings">Settings</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={logout}>Sign out</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <>
                                <Button variant="ghost" size="icon" onClick={handleSignInClick}>
                                    <LogIn className="h-5 w-5" />
                                </Button>
                            </>
                        )}

                        {/* Mobile Menu Button */}
                        <Button
                            variant="ghost"
                            size="icon"
                            className="md:hidden"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            <Menu className="h-6 w-6" />
                        </Button>
                    </div>
                </div>
            </header>

            {/* 🔍 Search Popup (Positioned Below Navbar) */}
            {isSearchOpen && (
                <div className="absolute left-0 right-0 top-16 bg-white shadow-md border-t p-4 flex items-center z-40">
                    <div className="relative w-full">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search articles..."
                            className="w-full rounded-full bg-background pl-8"
                            autoFocus
                        />
                    </div>
                    <Button variant="ghost" size="icon" className="ml-2" onClick={() => setIsSearchOpen(false)}>
                        <X className="h-5 w-5" />
                    </Button>
                </div>
            )}

            {/* Mobile Menu (Shows when toggled) */}
            {isMobileMenuOpen && (
                <div className="absolute top-16 left-0 w-full bg-white shadow-md border-b p-4 flex flex-col space-y-3 md:hidden z-50">
                    {/* Status Information for Mobile */}
                    <div className="flex flex-col space-y-2 p-2 bg-gray-50 rounded-lg">
                        {!isLoading && weather && (
                            <div className="flex justify-between">
                                <div className="flex items-center space-x-2">
                                    {getWeatherIcon()}
                                    <span className="text-sm">
                    {weather.temp}°C, {weather.condition}
                  </span>
                                </div>
                                <span className="text-sm">{formattedTime}</span>
                            </div>
                        )}

                        {!isLoading && location && (
                            <div className="flex items-center space-x-2">
                                <MapPin className="h-4 w-4 text-blue-500" />
                                <span className="text-sm">
                  {location.city}, {location.country}
                </span>
                            </div>
                        )}
                    </div>

                    {/* Playground (Moved to Mobile Menu) */}
                    <Link href="/playground" className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded">
                        <Code className="w-5 h-5 text-blue-500" />
                        <span className="text-lg font-semibold text-gray-700">Playground</span>
                    </Link>

                    {/* Write Article (Moved to Mobile Menu) */}
                    <Link href="/write" className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded">
                        <Edit className="h-5 w-5" />
                        <span>Write Article</span>
                    </Link>

                    {/* Notifications */}
                    <Link href="/notifications" className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded">
                        <Bell className="h-5 w-5" />
                        <span>Notifications</span>
                    </Link>

                    {/* Profile */}
                    <Link href="/profile" className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded">
                        <User className="h-5 w-5" />
                        <span>Profile</span>
                    </Link>
                </div>
            )}

            <AuthDialog open={authDialogOpen} onOpenChange={setAuthDialogOpen} initialView={authDialogView} />
        </>
    )
}

