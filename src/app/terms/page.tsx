import { Navbar } from "@/components/navbar"
import type { Metadata } from "next"
import { FileText, Scale, AlertTriangle, Copyright, Globe, Clock, Shield } from "lucide-react"

export const metadata: Metadata = {
    title: "Terms & Conditions | JomNum",
    description: "Terms and conditions for using JomNum services",
}

export default function TermsPage() {
    return (
        <>
            <main className="container max-w-4xl mx-auto px-4 py-8">
                <div className="space-y-8">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold mb-4">Terms & Conditions</h1>
                        <p className="text-muted-foreground">Last updated: March 6, 2025</p>
                    </div>

                    <div className="bg-muted p-6 rounded-lg mb-8">
                        <div className="flex items-start">
                            <AlertTriangle className="h-6 w-6 text-amber-500 mr-4 mt-1 flex-shrink-0" />
                            <div>
                                <h2 className="text-lg font-semibold mb-2">Please Read Carefully</h2>
                                <p className="text-sm">
                                    By accessing or using JomNum services, you agree to be bound by these Terms and Conditions. If you do
                                    not agree to all the terms and conditions, you may not access or use our services.
                                </p>
                            </div>
                        </div>
                    </div>

                    <section className="space-y-6">
                        <div className="border-b pb-4">
                            <div className="flex items-center gap-3 mb-4">
                                <FileText className="h-6 w-6 text-primary" />
                                <h2 className="text-2xl font-semibold">1. Introduction</h2>
                            </div>
                            <div className="space-y-4 pl-9">
                                <p>
                                    Welcome to JomNum. These Terms and Conditions govern your use of our website, games, and services
                                    (collectively, the "Services") operated by JomNum Inc. ("us", "we", or "our").
                                </p>
                                <p>
                                    By accessing or using our Services, you agree to be bound by these Terms. If you disagree with any
                                    part of the terms, you may not access the Services.
                                </p>
                            </div>
                        </div>

                        <div className="border-b pb-4">
                            <div className="flex items-center gap-3 mb-4">
                                <Copyright className="h-6 w-6 text-primary" />
                                <h2 className="text-2xl font-semibold">2. Intellectual Property</h2>
                            </div>
                            <div className="space-y-4 pl-9">
                                <p>
                                    The Services and their original content, features, and functionality are and will remain the exclusive
                                    property of JomNum Inc. and its licensors. The Services are protected by copyright, trademark, and
                                    other laws of both the United States and foreign countries.
                                </p>
                                <p>
                                    Our trademarks and trade dress may not be used in connection with any product or service without the
                                    prior written consent of JomNum Inc.
                                </p>
                            </div>
                        </div>

                        <div className="border-b pb-4">
                            <div className="flex items-center gap-3 mb-4">
                                <Scale className="h-6 w-6 text-primary" />
                                <h2 className="text-2xl font-semibold">3. User Responsibilities</h2>
                            </div>
                            <div className="space-y-4 pl-9">
                                <p>By using our Services, you agree to:</p>
                                <ul className="list-disc pl-5 space-y-2">
                                    <li>Provide accurate, current, and complete information when creating an account</li>
                                    <li>Maintain and promptly update your account information</li>
                                    <li>Maintain the security of your account by not sharing your password with others</li>
                                    <li>
                                        Promptly notify JomNum if you discover or suspect any security breaches related to the Services
                                    </li>
                                    <li>Take responsibility for all activities that occur under your account</li>
                                    <li>Not use the Services for any illegal or unauthorized purpose</li>
                                    <li>Not violate any laws in your jurisdiction</li>
                                </ul>
                            </div>
                        </div>

                        <div className="border-b pb-4">
                            <div className="flex items-center gap-3 mb-4">
                                <Shield className="h-6 w-6 text-primary" />
                                <h2 className="text-2xl font-semibold">4. Acceptable Use</h2>
                            </div>
                            <div className="space-y-4 pl-9">
                                <p>You agree not to use the Services to:</p>
                                <ul className="list-disc pl-5 space-y-2">
                                    <li>Violate any laws or regulations</li>
                                    <li>Infringe upon the rights of others or violate their privacy</li>
                                    <li>Impersonate any person or entity</li>
                                    <li>Harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
                                    <li>Submit false or misleading information</li>
                                    <li>Upload or transmit viruses or any other type of malicious code</li>
                                    <li>Collect or track the personal information of others</li>
                                    <li>Spam, phish, pharm, pretext, spider, crawl, or scrape</li>
                                    <li>Interfere with or circumvent the security features of the Services</li>
                                </ul>
                            </div>
                        </div>

                        <div className="border-b pb-4">
                            <div className="flex items-center gap-3 mb-4">
                                <Globe className="h-6 w-6 text-primary" />
                                <h2 className="text-2xl font-semibold">5. Third-Party Links</h2>
                            </div>
                            <div className="space-y-4 pl-9">
                                <p>
                                    Our Services may contain links to third-party websites or services that are not owned or controlled by
                                    JomNum Inc.
                                </p>
                                <p>
                                    JomNum Inc. has no control over, and assumes no responsibility for, the content, privacy policies, or
                                    practices of any third-party websites or services. We do not warrant the offerings of any of these
                                    entities/individuals or their websites.
                                </p>
                                <p>
                                    You acknowledge and agree that JomNum Inc. shall not be responsible or liable, directly or indirectly,
                                    for any damage or loss caused or alleged to be caused by or in connection with the use of or reliance
                                    on any such content, goods, or services available on or through any such third-party websites or
                                    services.
                                </p>
                            </div>
                        </div>

                        <div className="border-b pb-4">
                            <div className="flex items-center gap-3 mb-4">
                                <AlertTriangle className="h-6 w-6 text-primary" />
                                <h2 className="text-2xl font-semibold">6. Limitation of Liability</h2>
                            </div>
                            <div className="space-y-4 pl-9">
                                <p>
                                    In no event shall JomNum Inc., nor its directors, employees, partners, agents, suppliers, or
                                    affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages,
                                    including without limitation, loss of profits, data, use, goodwill, or other intangible losses,
                                    resulting from:
                                </p>
                                <ul className="list-disc pl-5 space-y-2">
                                    <li>Your access to or use of or inability to access or use the Services</li>
                                    <li>Any conduct or content of any third party on the Services</li>
                                    <li>Any content obtained from the Services</li>
                                    <li>Unauthorized access, use, or alteration of your transmissions or content</li>
                                </ul>
                            </div>
                        </div>

                        <div className="border-b pb-4">
                            <div className="flex items-center gap-3 mb-4">
                                <Clock className="h-6 w-6 text-primary" />
                                <h2 className="text-2xl font-semibold">7. Termination</h2>
                            </div>
                            <div className="space-y-4 pl-9">
                                <p>
                                    We may terminate or suspend your account and bar access to the Services immediately, without prior
                                    notice or liability, under our sole discretion, for any reason whatsoever and without limitation,
                                    including but not limited to a breach of the Terms.
                                </p>
                                <p>
                                    If you wish to terminate your account, you may simply discontinue using the Services, or contact us to
                                    request account deletion.
                                </p>
                                <p>
                                    All provisions of the Terms which by their nature should survive termination shall survive
                                    termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity, and
                                    limitations of liability.
                                </p>
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <FileText className="h-6 w-6 text-primary" />
                                <h2 className="text-2xl font-semibold">8. Changes to Terms</h2>
                            </div>
                            <div className="space-y-4 pl-9">
                                <p>
                                    We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a
                                    revision is material, we will provide at least 30 days' notice prior to any new terms taking effect.
                                    material, we will provide at least 30 days' notice prior to any new terms taking effect. What
                                    constitutes a material change will be determined at our sole discretion.
                                </p>
                                <p>
                                    By continuing to access or use our Services after any revisions become effective, you agree to be
                                    bound by the revised terms. If you do not agree to the new terms, you are no longer authorized to use
                                    the Services.
                                </p>
                            </div>
                        </div>
                    </section>

                    <div className="bg-muted p-6 rounded-lg mt-8">
                        <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
                        <p className="mb-4">If you have any questions about these Terms and Conditions, please contact us:</p>
                        <ul className="space-y-2">
                            <li>By email: legal@jomnum.com</li>
                            <li>By phone: +1 (555) 123-4567</li>
                            <li>By mail: JomNum Inc., 123 Legal Street, San Francisco, CA 94103, USA</li>
                        </ul>
                    </div>
                </div>
            </main>
        </>
    )
}

