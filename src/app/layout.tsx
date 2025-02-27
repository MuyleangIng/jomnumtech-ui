import type { Metadata } from "next"
import { Inter } from 'next/font/google'
import "./globals.css"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
    title: {
        default: "QDev Blog  | Where good ideas find you",
        template: "%s | QDev Blog"
    },
    description: "Discover stories, thinking, and expertise from writers on any topic.",
    keywords: ["blog", "articles", "writing", "reading", "medium", "content"],
    authors: [{ name: "QDev Blog Team" }],
    creator: "QDev Blog",
    publisher: "QDev Blog",
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    metadataBase: new URL("https://qci.dlr.de/wp-content/uploads/2022/10/symbolbild-quantentechnologie-qubits2.jpg"),
    alternates: {
        canonical: "/",
    },
    openGraph: {
        type: "website",
        locale: "en_US",
        url: "https://qci.dlr.de/wp-content/uploads/2022/10/symbolbild-quantentechnologie-qubits2.jpg",
        title: "QDev Blog | Where good ideas find you",
        description: "Discover stories, thinking, and expertise from writers on any topic.",
        siteName: "QDev Blog",
        images: [
            {
                url: "https://qci.dlr.de/wp-content/uploads/2022/10/symbolbild-quantentechnologie-qubits2.jpg",
                width: 1200,
                height: 630,
                alt: "QDev Blog",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "QDev Blog | Where good ideas find you",
        description: "Discover stories, thinking, and expertise from writers on any topic.",
        creator: "@mediumclone",
        images: ["/twitter-image.png"],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
    icons: {
        icon: "/favicon.ico",
        shortcut: "/favicon-16x16.png",
        apple: "/apple-touch-icon.png",
    },
    manifest: "/site.webmanifest",
}

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <div className="flex min-h-screen flex-col">
                <Navbar />
                <main className="flex-1">{children}</main>
                <Footer />
            </div>
        </ThemeProvider>
        </body>
        </html>
    )
}
