"use client"

import { useState } from "react"
import { useCallback } from "react"
import { loadFull } from "tsparticles"
import type { Container, Engine } from "tsparticles-engine"
import Particles from "react-tsparticles"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CheckCircle, Code2, Rocket, Star } from "lucide-react"
import { useTheme } from "next-themes"
import {Button} from "@/components/ui/button";
import {Card, CardContent} from "@/components/ui/card";

export default function AboutUs() {
    const [isLoaded, setIsLoaded] = useState(false)
    const { theme } = useTheme()

    const particlesInit = useCallback(async (engine: Engine) => {
        await loadFull(engine)
    }, [])

    const particlesLoaded = useCallback(async (container: Container | undefined) => {
        if (container) {
            setIsLoaded(true)
        }
    }, [])
    const teamMembers = [
        { name: "Muyleang Ing", role: "Team Leader", image: "/placeholder.svg?height=100&width=100" },
        { name: "Member 2", role: "Developer", image: "/placeholder.svg?height=100&width=100" },
        { name: "Member 3", role: "Designer", image: "/placeholder.svg?height=100&width=100" },
        { name: "Member 4", role: "Researcher", image: "/placeholder.svg?height=100&width=100" },
    ]
    return (
        <div className="min-h-screen bg-background text-foreground overflow-hidden relative">
            {/* Particles background */}
            <Particles
                id="tsparticles"
                init={particlesInit}
                loaded={particlesLoaded}
                options={{
                    fullScreen: {
                        enable: true,
                        zIndex: 0
                    },
                    background: {
                        color: {
                            value: "transparent"
                        }
                    },
                    fpsLimit: 60,
                    particles: {
                        color: {
                            value: theme === "dark" ? "#ffffff" : "#0080ff"
                        },
                        links: {
                            color: theme === "dark" ? "#ffffff" : "#0080ff",
                            distance: 150,
                            enable: true,
                            opacity: 0.5,
                            width: 1
                        },
                        move: {
                            direction: "none",
                            enable: true,
                            outMode: "bounce",
                            random: false,
                            speed: 2,
                            straight: false
                        },
                        number: {
                            density: {
                                enable: true,
                                value_area: 800
                            },
                            value: 80
                        },
                        opacity: {
                            value: theme === "dark" ? 0.5 : 0.3
                        },
                        shape: {
                            type: "circle"
                        },
                        size: {
                            random: true,
                            value: 5
                        }
                    },
                    detectRetina: true
                }}
            />
            {/* Main Content */}
            <main className="relative z-10 container mx-auto px-4 pt-24">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="flex items-center justify-center mb-6">
                        <Avatar className="h-24 w-24 mr-4">
                            <AvatarImage src="/muyleanging.jpg?height=96&width=96" alt="Muyleang Ing" />
                            <AvatarFallback>MI</AvatarFallback>
                        </Avatar>
                        <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-[#4A90E2] via-[#9B51E0] to-[#E91E63] text-transparent bg-clip-text">
                            Muyleang Ing
                        </h1>
                    </div>

                    <div className="flex flex-wrap justify-center gap-3 mb-6">
                        <Badge variant="outline" className="py-1 px-3 text-[#4A90E2] border-[#4A90E2] hover:bg-[#4A90E2]/10">
                            <Star className="h-4 w-4 mr-1" />
                            DevOps Engineer
                        </Badge>
                        <Badge variant="outline" className="py-1 px-3 text-[#9B51E0] border-[#9B51E0] hover:bg-[#9B51E0]/10">
                            <Code2 className="h-4 w-4 mr-1" />
                            Full-Stack Developer
                        </Badge>
                        <Badge variant="outline" className="py-1 px-3 text-[#E91E63] border-[#E91E63] hover:bg-[#E91E63]/10">
                            <Rocket className="h-4 w-4 mr-1" />
                            AI Researcher
                        </Badge>
                        <Badge variant="outline" className="py-1 px-3 text-green-500 border-green-500 hover:bg-green-500/10">
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Verified
                        </Badge>
                    </div>

                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Exploring the intersection of DevOps, AI, and Full-Stack Development
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mb-12 mt-12 ">
                        <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
                            <CardContent className="p-6">
                                <h3 className="text-xl font-bold mb-2 text-primary">Education</h3>
                                <ul className="list-disc list-inside text-foreground">
                                    <li>RUPP Alumni, Computer Science & Engineering</li>
                                    <li>Studying AI Convergence at PKNU</li>
                                </ul>
                            </CardContent>
                        </Card>

                        <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
                            <CardContent className="p-6">
                                <h3 className="text-xl font-bold mb-2 text-primary">Experience</h3>
                                <ul className="list-disc list-inside text-foreground">
                                    <li>DevOps Engineering Instructor at ISTAD</li>
                                    <li>Full-Stack Development</li>
                                </ul>
                            </CardContent>
                        </Card>

                        <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
                            <CardContent className="p-6">
                                <h3 className="text-xl font-bold mb-2 text-primary">Research</h3>
                                <ul className="list-disc list-inside text-foreground">
                                    <li>Quantum Machine Learning</li>
                                    <li>AI Convergence</li>
                                </ul>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Team Section */}
                    <h2 className="text-3xl font-bold mb-6 text-center">Our Team</h2>
                    <div className="flex flex-wrap justify-center gap-8 mb-12">
                        {teamMembers.map((member, index) => (
                            <div key={index} className="flex flex-col items-center">
                                <Avatar className="w-24 h-24 mb-2">
                                    <AvatarImage src={member.image} alt={member.name} />
                                    <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                </Avatar>
                                <h3 className="text-lg font-semibold">{member.name}</h3>
                                <p className="text-sm text-muted-foreground">{member.role}</p>
                            </div>
                        ))}
                    </div>

                    <Button className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                        Connect with Us
                    </Button>
                </div>
            </main>
        </div>
    )
}

