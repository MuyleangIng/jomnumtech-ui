import { Navbar } from "@/components/navbar"
import type { Metadata } from "next"
import { HelpCircle, MessageSquare, Mail, Phone, FileQuestion, Gamepad2, Wifi, Settings, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export const metadata: Metadata = {
    title: "Help & Support | JomNum",
    description: "Get help with JomNum games and services",
}

export default function HelpPage() {
    return (
        <>
            <main className="container max-w-5xl mx-auto px-4 py-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4">Help & Support</h1>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Find answers to common questions or contact our support team for assistance
                    </p>
                </div>

                <Tabs defaultValue="faq" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 mb-8">
                        <TabsTrigger value="faq" className="text-base py-3">
                            <HelpCircle className="mr-2 h-4 w-4" />
                            Frequently Asked Questions
                        </TabsTrigger>
                        <TabsTrigger value="contact" className="text-base py-3">
                            <MessageSquare className="mr-2 h-4 w-4" />
                            Contact Support
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="faq" className="space-y-8">
                        <div className="grid gap-8 md:grid-cols-4">
                            <div className="bg-card rounded-lg p-5 shadow-sm flex flex-col items-center text-center">
                                <Gamepad2 className="h-8 w-8 text-primary mb-3" />
                                <h3 className="text-lg font-medium">Games</h3>
                            </div>

                            <div className="bg-card rounded-lg p-5 shadow-sm flex flex-col items-center text-center">
                                <Wifi className="h-8 w-8 text-primary mb-3" />
                                <h3 className="text-lg font-medium">Connectivity</h3>
                            </div>

                            <div className="bg-card rounded-lg p-5 shadow-sm flex flex-col items-center text-center">
                                <Settings className="h-8 w-8 text-primary mb-3" />
                                <h3 className="text-lg font-medium">Settings</h3>
                            </div>

                            <div className="bg-card rounded-lg p-5 shadow-sm flex flex-col items-center text-center">
                                <Shield className="h-8 w-8 text-primary mb-3" />
                                <h3 className="text-lg font-medium">Account</h3>
                            </div>
                        </div>

                        <div className="bg-card rounded-lg p-6 shadow-sm">
                            <h2 className="text-2xl font-semibold mb-6 flex items-center">
                                <FileQuestion className="h-6 w-6 mr-2 text-primary" />
                                Frequently Asked Questions
                            </h2>

                            <Accordion type="single" collapsible className="w-full">
                                <AccordionItem value="item-1">
                                    <AccordionTrigger>How do I play Tetris offline?</AccordionTrigger>
                                    <AccordionContent>
                                        <p>
                                            Our Tetris game automatically becomes available when you lose internet connection. You can also
                                            test it by clicking the "Test Game" button on the main page without actually going offline.
                                        </p>
                                        <p className="mt-2">
                                            The game will save your high scores locally and sync them when you're back online.
                                        </p>
                                    </AccordionContent>
                                </AccordionItem>

                                <AccordionItem value="item-2">
                                    <AccordionTrigger>What do the network speed indicators mean?</AccordionTrigger>
                                    <AccordionContent>
                                        <p>The network speed indicators in the navbar show your current internet connection status:</p>
                                        <ul className="list-disc pl-5 mt-2 space-y-1">
                                            <li>
                                                <span className="font-medium">Download Speed:</span> How fast you can receive data from the
                                                internet
                                            </li>
                                            <li>
                                                <span className="font-medium">Upload Speed:</span> How fast you can send data to the internet
                                            </li>
                                            <li>
                                                <span className="font-medium">Ping:</span> The response time of your connection (lower is
                                                better)
                                            </li>
                                        </ul>
                                        <p className="mt-2">
                                            Click on the indicator to see more detailed information about your connection.
                                        </p>
                                    </AccordionContent>
                                </AccordionItem>

                                <AccordionItem value="item-3">
                                    <AccordionTrigger>How do I create an account?</AccordionTrigger>
                                    <AccordionContent>
                                        <p>To create an account:</p>
                                        <ol className="list-decimal pl-5 mt-2 space-y-1">
                                            <li>Click the "Sign in" button in the top-right corner of the navbar</li>
                                            <li>Select "Create account" in the dialog that appears</li>
                                            <li>Fill in your email address, username, and password</li>
                                            <li>Click "Sign up" to complete the process</li>
                                        </ol>
                                        <p className="mt-2">
                                            You can also sign up using your Google or GitHub account for faster registration.
                                        </p>
                                    </AccordionContent>
                                </AccordionItem>

                                <AccordionItem value="item-4">
                                    <AccordionTrigger>How do I change my account settings?</AccordionTrigger>
                                    <AccordionContent>
                                        <p>To change your account settings:</p>
                                        <ol className="list-decimal pl-5 mt-2 space-y-1">
                                            <li>Sign in to your account</li>
                                            <li>Click on your profile picture in the top-right corner</li>
                                            <li>Select "Settings" from the dropdown menu</li>
                                            <li>
                                                From there, you can update your profile information, change your password, and manage
                                                notification preferences
                                            </li>
                                        </ol>
                                    </AccordionContent>
                                </AccordionItem>

                                <AccordionItem value="item-5">
                                    <AccordionTrigger>Is my data secure?</AccordionTrigger>
                                    <AccordionContent>
                                        <p>
                                            Yes, we take data security very seriously. All data is encrypted in transit using SSL/TLS
                                            encryption. We also implement industry-standard security practices to protect your information.
                                        </p>
                                        <p className="mt-2">
                                            For more information about how we handle your data, please see our{" "}
                                            <a href="/privacy" className="text-primary hover:underline">
                                                Privacy Policy
                                            </a>
                                            .
                                        </p>
                                    </AccordionContent>
                                </AccordionItem>

                                <AccordionItem value="item-6">
                                    <AccordionTrigger>How do I delete my account?</AccordionTrigger>
                                    <AccordionContent>
                                        <p>To delete your account:</p>
                                        <ol className="list-decimal pl-5 mt-2 space-y-1">
                                            <li>Sign in to your account</li>
                                            <li>Go to Settings {">"} Account</li>
                                            <li>Scroll to the bottom and click &#34;Delete Account&#34;</li>
                                            <li>Confirm your decision by entering your password</li>
                                        </ol>
                                        <p className="mt-2">
                                            Please note that account deletion is permanent and cannot be undone. All your data will be
                                            permanently removed from our systems.
                                        </p>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </div>
                    </TabsContent>

                    <TabsContent value="contact">
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="md:col-span-2">
                                <div className="bg-card rounded-lg p-6 shadow-sm">
                                    <h2 className="text-2xl font-semibold mb-6">Contact Support</h2>

                                    <form className="space-y-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label htmlFor="name" className="text-sm font-medium">
                                                    Name
                                                </label>
                                                <Input id="name" placeholder="Your name" />
                                            </div>
                                            <div className="space-y-2">
                                                <label htmlFor="email" className="text-sm font-medium">
                                                    Email
                                                </label>
                                                <Input id="email" type="email" placeholder="Your email" />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label htmlFor="subject" className="text-sm font-medium">
                                                Subject
                                            </label>
                                            <Input id="subject" placeholder="How can we help you?" />
                                        </div>

                                        <div className="space-y-2">
                                            <label htmlFor="message" className="text-sm font-medium">
                                                Message
                                            </label>
                                            <Textarea id="message" placeholder="Describe your issue in detail..." rows={6} />
                                        </div>

                                        <div className="pt-2">
                                            <Button type="submit" className="w-full md:w-auto">
                                                Send Message
                                            </Button>
                                        </div>
                                    </form>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="bg-card rounded-lg p-6 shadow-sm">
                                    <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
                                    <div className="space-y-4">
                                        <div className="flex items-start">
                                            <Mail className="h-5 w-5 text-primary mt-0.5 mr-3" />
                                            <div>
                                                <p className="font-medium">Email</p>
                                                <p className="text-muted-foreground">support@jomnum.com</p>
                                            </div>
                                        </div>

                                        <div className="flex items-start">
                                            <Phone className="h-5 w-5 text-primary mt-0.5 mr-3" />
                                            <div>
                                                <p className="font-medium">Phone</p>
                                                <p className="text-muted-foreground">+1 (555) 123-4567</p>
                                                <p className="text-xs text-muted-foreground">Mon-Fri, 9am-5pm PT</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-muted p-6 rounded-lg">
                                    <h3 className="text-xl font-semibold mb-4">Response Time</h3>
                                    <p className="text-sm">We typically respond to all inquiries within 24 hours during business days.</p>
                                    <p className="text-sm mt-2">For urgent issues, please contact us by phone.</p>
                                </div>
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>
            </main>
        </>
    )
}

