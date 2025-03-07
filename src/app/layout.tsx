// // import type { Metadata } from "next"
// // import { Inter } from 'next/font/google'
// // import "./globals.css"
// // import "@/app/styles/article.css"
// // import { Navbar } from "@/components/navbar"
// // import { Footer } from "@/components/footer"
// // import { ThemeProvider } from "@/components/theme-provider"
// // import {Toaster} from "@/components/ui/toaster";
// // import {AuthProvider} from "@/components/auth/AuthContext";
// //
// // const inter = Inter({ subsets: ["latin"] })
// //
// // export const metadata: Metadata = {
// //     title: {
// //         default: "JomNum Blog  | Where good ideas find you",
// //         template: "%s | JomNum Blog"
// //     },
// //     description: "Discover stories, thinking, and expertise from writers on any topic.",
// //     keywords: ["blog", "articles", "writing", "reading", "medium", "content"],
// //     authors: [{ name: "JomNum Blog Team" }],
// //     creator: "JomNum Blog",
// //     publisher: "JomNum Blog",
// //     formatDetection: {
// //         email: false,
// //         address: false,
// //         telephone: false,
// //     },
// //     metadataBase: new URL("https://jomnumtech-api.shinoshike.studio/uploads/045473bd-ba5d-4057-a824-96353082045b.jpg"),
// //     alternates: {
// //         canonical: "/",
// //     },
// //     openGraph: {
// //         type: "website",
// //         locale: "en_US",
// //         url: "https://jomnumtech-api.shinoshike.studio/uploads/045473bd-ba5d-4057-a824-96353082045b.jpg",
// //         title: "JomNum Blog | Where good ideas find you",
// //         description: "Discover stories, thinking, and expertise from writers on any topic.",
// //         siteName: "JomNum Blog",
// //         images: [
// //             {
// //                 url: "https://jomnumtech-api.shinoshike.studio/uploads/045473bd-ba5d-4057-a824-96353082045b.jpg",
// //                 width: 1200,
// //                 height: 630,
// //                 alt: "JomNum Blog",
// //             },
// //         ],
// //     },
// //     twitter: {
// //         card: "summary_large_image",
// //         title: "JomNum Blog | Where good ideas find you",
// //         description: "Discover stories, thinking, and expertise from writers on any topic.",
// //         creator: "@mediumclone",
// //         images: ["/twitter-image.png"],
// //     },
// //     robots: {
// //         index: true,
// //         follow: true,
// //         googleBot: {
// //             index: true,
// //             follow: true,
// //             "max-video-preview": -1,
// //             "max-image-preview": "large",
// //             "max-snippet": -1,
// //         },
// //     },
// //     // icons: {
// //     //     icon: "/favicon.ico",
// //     //     shortcut: "/favicon-16x16.png",
// //     //     apple: "/apple-touch-icon.png",
// //     // },
// // }
// //
// // export default function RootLayout({
// //                                        children,
// //                                    }: Readonly<{
// //     children: React.ReactNode
// // }>) {
// //     return (
// //         <html lang="en" suppressHydrationWarning>
// //         <body className={inter.className}>
// //         <AuthProvider>
// //         <ThemeProvider
// //             attribute="class"
// //             defaultTheme="system"
// //             enableSystem
// //             disableTransitionOnChange>
// //             <div className="flex min-h-screen flex-col">
// //                 <Navbar />
// //                 <main className="flex-1">{children}</main>
// //                 <Toaster />
// //                 <Footer />
// //             </div>
// //         </ThemeProvider>
// //         </AuthProvider>
// //         </body>
// //         </html>
// //     )
// // }
// import React, {Suspense} from "react"
// import type { Metadata } from "next"
// import { Inter } from "next/font/google"
// import "./globals.css"
// import "@/app/styles/article.css"
// import { Navbar } from "@/components/navbar"
// import { Footer } from "@/components/footer"
// import { ThemeProvider } from "@/components/theme-provider"
// import { Toaster } from "@/components/ui/toaster"
// import { AuthProvider } from "@/components/auth/AuthContext"
// import {ErrorBoundary} from "next/dist/client/components/error-boundary";
// import Error from "./error"
// import NoInternetConnection from "@/components/no-internet-connection/NoInternetConnection";
// const inter = Inter({ subsets: ["latin"] })
//
// export const metadata: Metadata = {
//     title: {
//         default: "JomNum Blog  | Where good ideas find you",
//         template: "%s | JomNum Blog",
//     },
//     description: "Discover stories, thinking, and expertise from writers on any topic.",
//     keywords: ["blog", "articles", "writing", "reading", "medium", "content"],
//     authors: [{ name: "JomNum Blog Team" }],
//     creator: "JomNum Blog",
//     publisher: "JomNum Blog",
//     formatDetection: {
//         email: false,
//         address: false,
//         telephone: false,
//     },
//     metadataBase: new URL("https://jomnumtech-api.shinoshike.studio/uploads/045473bd-ba5d-4057-a824-96353082045b.jpg"),
//     alternates: {
//         canonical: "/",
//     },
//     openGraph: {
//         type: "website",
//         locale: "en_US",
//         url: "https://jomnumtech-api.shinoshike.studio/uploads/045473bd-ba5d-4057-a824-96353082045b.jpg",
//         title: "JomNum Blog | Where good ideas find you",
//         description: "Discover stories, thinking, and expertise from writers on any topic.",
//         siteName: "JomNum Blog",
//         images: [
//             {
//                 url: "https://jomnumtech-api.shinoshike.studio/uploads/045473bd-ba5d-4057-a824-96353082045b.jpg",
//                 width: 800,
//                 height: 600,
//                 alt: "JomNum Blog",
//             },
//         ],
//     },
//     twitter: {
//         card: "summary_large_image",
//         title: "JomNum Blog | Where good ideas find you",
//         description: "Discover stories, thinking, and expertise from writers on any topic.",
//         creator: "@MuyleangIng",
//         images: ["https://jomnumtech-api.shinoshike.studio/uploads/045473bd-ba5d-4057-a824-96353082045b.jpg"],
//     },
//     robots: {
//         index: true,
//         follow: true,
//         googleBot: {
//             index: true,
//             follow: true,
//             "max-video-preview": -1,
//             "max-image-preview": "large",
//             "max-snippet": -1,
//         },
//     },
// }
//
// export default function RootLayout({
//                                        children,
//                                    }: Readonly<{
//     children: React.ReactNode
// }>) {
//     return (
//         <html lang="en" suppressHydrationWarning>
//         <body className={inter.className}>
//         <AuthProvider>
//             <Suspense fallback={""}>
//                 <ErrorBoundary errorComponent={Error}>
//                     <NoInternetConnection>
//                         <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
//                             <div className="flex min-h-screen flex-col">
//                                 <Navbar />
//                                 <main className="flex-1">{children}</main>
//                                 <Toaster />
//                                 <Footer />
//                             </div>
//                         </ThemeProvider>
//                     </NoInternetConnection>
//                 </ErrorBoundary>
//             </Suspense>
//         </AuthProvider>
//         </body>
//         </html>
//     )
// }
//
import React, { Suspense } from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "@/app/styles/article.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/components/auth/AuthContext";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import Error from "./error";
import NoInternetConnection from "@/components/no-internet-connection/NoInternetConnection";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: {
        default: "JomNum Blog  | Where good ideas find you",
        template: "%s | JomNum Blog",
    },
    description: "Discover stories, thinking, and expertise from writers on any topic.",
    keywords: ["blog", "articles", "writing", "reading", "medium", "content"],
    authors: [{ name: "JomNum Blog Team" }],
    creator: "JomNum Blog",
    publisher: "JomNum Blog",
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    metadataBase: new URL("https://jomnumtech-api.shinoshike.studio/uploads/045473bd-ba5d-4057-a824-96353082045b.jpg"),
    alternates: {
        canonical: "/",
    },
    openGraph: {
        type: "website",
        locale: "en_US",
        url: "https://jomnumtech-api.shinoshike.studio/uploads/045473bd-ba5d-4057-a824-96353082045b.jpg",
        title: "JomNum Blog | Where good ideas find you",
        description: "Discover stories, thinking, and expertise from writers on any topic.",
        siteName: "JomNum Blog",
        images: [
            {
                url: "https://jomnumtech-api.shinoshike.studio/uploads/045473bd-ba5d-4057-a824-96353082045b.jpg",
                width: 800,
                height: 600,
                alt: "JomNum Blog",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "JomNum Blog | Where good ideas find you",
        description: "Discover stories, thinking, and expertise from writers on any topic.",
        creator: "@MuyleangIng",
        images: ["https://jomnumtech-api.shinoshike.studio/uploads/045473bd-ba5d-4057-a824-96353082045b.jpg"],
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
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en" suppressHydrationWarning>
        <meta name="google-adsense-account" content="ca-pub-3619132572394417"/>
        <head>
            <script async
                    src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3619132572394417"
                    crossorigin="anonymous"></script>
        </head>
        <body className={inter.className}>
        <AuthProvider>
            <Suspense fallback={""}>
                <ErrorBoundary errorComponent={Error}>
                    <NoInternetConnection>
                        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                            <div className="flex min-h-screen flex-col">
                                <Navbar/>
                                <main className="flex-1">{children}</main>
                                <Toaster/>
                                <Footer/>
                            </div>
                        </ThemeProvider>
                    </NoInternetConnection>
                </ErrorBoundary>
            </Suspense>
        </AuthProvider>
        </body>
        </html>
    );
}
