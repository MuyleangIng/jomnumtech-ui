import { Navbar } from "@/components/navbar"
import type { Metadata } from "next"
import { Shield, Lock, Eye, FileText, UserCheck, Globe, Server } from "lucide-react"

export const metadata: Metadata = {
    title: "Privacy Policy | JomNum",
    description: "Learn how we collect, use, and protect your personal information",
}

export default function PrivacyPage() {
    return (
        <>
            <main className="container max-w-4xl mx-auto px-4 py-8">
                <div className="space-y-8">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
                        <p className="text-muted-foreground">Last updated: March 6, 2025</p>
                    </div>

                    <div className="grid gap-8 md:grid-cols-3 mb-12">
                        <div className="bg-card rounded-lg p-6 shadow-sm flex flex-col items-center text-center">
                            <Shield className="h-10 w-10 text-primary mb-4" />
                            <h3 className="text-xl font-medium mb-2">Data Protection</h3>
                            <p className="text-sm text-muted-foreground">
                                Your data is protected with industry-standard encryption and security practices.
                            </p>
                        </div>

                        <div className="bg-card rounded-lg p-6 shadow-sm flex flex-col items-center text-center">
                            <Lock className="h-10 w-10 text-primary mb-4" />
                            <h3 className="text-xl font-medium mb-2">Privacy First</h3>
                            <p className="text-sm text-muted-foreground">
                                We only collect information that's necessary to provide our services.
                            </p>
                        </div>

                        <div className="bg-card rounded-lg p-6 shadow-sm flex flex-col items-center text-center">
                            <UserCheck className="h-10 w-10 text-primary mb-4" />
                            <h3 className="text-xl font-medium mb-2">Your Control</h3>
                            <p className="text-sm text-muted-foreground">
                                You have full control over your data with easy access to privacy settings.
                            </p>
                        </div>
                    </div>

                    <section className="space-y-6">
                        <div className="border-b pb-4">
                            <div className="flex items-center gap-3 mb-4">
                                <Eye className="h-6 w-6 text-primary" />
                                <h2 className="text-2xl font-semibold">Information We Collect</h2>
                            </div>
                            <div className="space-y-4 pl-9">
                                <p>
                                    We collect information to provide better services to our users. The types of information we collect
                                    include:
                                </p>
                                <ul className="list-disc pl-5 space-y-2">
                                    <li>
                                        <span className="font-medium">Account Information:</span> When you create an account, we collect
                                        your name, email address, and password.
                                    </li>
                                    <li>
                                        <span className="font-medium">Usage Information:</span> We collect information about how you use our
                                        services, such as game scores, preferences, and settings.
                                    </li>
                                    <li>
                                        <span className="font-medium">Device Information:</span> We collect device-specific information such
                                        as your hardware model, operating system version, and browser type.
                                    </li>
                                    <li>
                                        <span className="font-medium">Location Information:</span> With your consent, we may collect and
                                        process information about your actual location using various technologies including IP address, GPS,
                                        and other sensors.
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="border-b pb-4">
                            <div className="flex items-center gap-3 mb-4">
                                <FileText className="h-6 w-6 text-primary" />
                                <h2 className="text-2xl font-semibold">How We Use Your Information</h2>
                            </div>
                            <div className="space-y-4 pl-9">
                                <p>We use the information we collect to:</p>
                                <ul className="list-disc pl-5 space-y-2">
                                    <li>Provide, maintain, and improve our services</li>
                                    <li>Develop new features and functionality</li>
                                    <li>Personalize your experience</li>
                                    <li>Send you important notifications and updates</li>
                                    <li>Measure performance and analyze how users interact with our services</li>
                                    <li>Protect against fraud and abuse</li>
                                </ul>
                            </div>
                        </div>

                        <div className="border-b pb-4">
                            <div className="flex items-center gap-3 mb-4">
                                <Globe className="h-6 w-6 text-primary" />
                                <h2 className="text-2xl font-semibold">Information Sharing</h2>
                            </div>
                            <div className="space-y-4 pl-9">
                                <p>
                                    We do not share your personal information with companies, organizations, or individuals outside of
                                    JomNum except in the following cases:
                                </p>
                                <ul className="list-disc pl-5 space-y-2">
                                    <li>
                                        <span className="font-medium">With your consent:</span> We will share personal information with
                                        companies, organizations, or individuals outside of JomNum when we have your consent to do so.
                                    </li>
                                    <li>
                                        <span className="font-medium">For legal reasons:</span> We will share personal information if we
                                        have a good-faith belief that access, use, preservation, or disclosure of the information is
                                        reasonably necessary to meet any applicable law, regulation, legal process, or enforceable
                                        governmental request.
                                    </li>
                                    <li>
                                        <span className="font-medium">With service providers:</span> We may share your information with
                                        trusted service providers who work on our behalf, such as hosting providers, analytics services, and
                                        customer support.
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="border-b pb-4">
                            <div className="flex items-center gap-3 mb-4">
                                <Server className="h-6 w-6 text-primary" />
                                <h2 className="text-2xl font-semibold">Data Security</h2>
                            </div>
                            <div className="space-y-4 pl-9">
                                <p>
                                    We work hard to protect our users from unauthorized access to or unauthorized alteration, disclosure,
                                    or destruction of information we hold. In particular:
                                </p>
                                <ul className="list-disc pl-5 space-y-2">
                                    <li>We encrypt our services using SSL</li>
                                    <li>
                                        We review our information collection, storage, and processing practices, including physical security
                                        measures, to prevent unauthorized access to our systems
                                    </li>
                                    <li>
                                        We restrict access to personal information to employees, contractors, and agents who need that
                                        information to process it for us, and who are subject to strict contractual confidentiality
                                        obligations
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <UserCheck className="h-6 w-6 text-primary" />
                                <h2 className="text-2xl font-semibold">Your Rights</h2>
                            </div>
                            <div className="space-y-4 pl-9">
                                <p>You have certain rights regarding your personal information, including:</p>
                                <ul className="list-disc pl-5 space-y-2">
                                    <li>The right to access, update, or delete your information</li>
                                    <li>The right to rectification (to request that we update or correct your information)</li>
                                    <li>The right to object (to our processing of your information)</li>
                                    <li>The right to restriction (to request that we restrict the processing of your information)</li>
                                    <li>
                                        The right to data portability (to request a copy of your information in a structured, commonly used,
                                        and machine-readable format)
                                    </li>
                                    <li>The right to withdraw consent (where we rely on your consent to process your information)</li>
                                </ul>
                                <p className="mt-4">To exercise any of these rights, please contact us at privacy@jomnum.com.</p>
                            </div>
                        </div>
                    </section>

                    <div className="bg-muted p-6 rounded-lg mt-8">
                        <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
                        <p className="mb-4">If you have any questions about this Privacy Policy, please contact us:</p>
                        <ul className="space-y-2">
                            <li>By email: privacy@jomnum.com</li>
                            <li>By phone: +1 (555) 123-4567</li>
                            <li>By mail: JomNum Inc., 123 Privacy Street, San Francisco, CA 94103, USA</li>
                        </ul>
                    </div>
                </div>
            </main>
        </>
    )
}

