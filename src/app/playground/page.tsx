"use client"

import { useEffect, useRef } from "react"
import sdk from "@stackblitz/sdk"

export default function PlaygroundPage() {
    const embedRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (embedRef.current) {
            sdk.embedProjectId(embedRef.current, "react-ts", {
                forceEmbedLayout: true,
                openFile: "src/App.tsx",
                hideExplorer: false,
                hideNavigation: false,
                height: "100%",
            })
        }
    }, [])

    return (
        <div className="flex flex-col h-[calc(100vh-64px)]">
            <div ref={embedRef} className="flex-1 w-full border border-gray-300" />
        </div>
    )
}
//
// "use client";
//
// import { useState, useRef, useEffect } from "react";
// import sdk from "@stackblitz/sdk";
//
// export default function PlaygroundPage() {
//     const [selectedFramework, setSelectedFramework] = useState<"next" | "react" | null>(null);
//     const embedRef = useRef<HTMLDivElement>(null);
//
//     useEffect(() => {
//         if (embedRef.current && selectedFramework) {
//             let projectConfig;
//
//             // ✅ Next.js 14.1.4 Configuration
//             if (selectedFramework === "next") {
//                 projectConfig = {
//                     title: "Next.js 14.1.4 Playground",
//                     description: "A Next.js 14.1.4 App Router sandbox with Tailwind CSS",
//                     template: "node",
//                     files: {
//                         "package.json": JSON.stringify({
//                             name: "next-playground",
//                             version: "0.1.0",
//                             private: true,
//                             scripts: {
//                                 dev: "next dev",
//                                 build: "next build",
//                                 start: "next start",
//                                 lint: "next lint",
//                             },
//                             dependencies: {
//                                 next: "14.1.4",
//                                 react: "^19.0.0",
//                                 "react-dom": "^19.0.0",
//                                 tailwindcss: "latest",
//                                 autoprefixer: "latest",
//                                 postcss: "latest",
//                             },
//                             devDependencies: {
//                                 "@types/node": "^20",
//                                 "@types/react": "^19",
//                                 "@types/react-dom": "^19",
//                                 typescript: "^5",
//                             },
//                         }, null, 2),
//
//                         "postcss.config.mjs": `export default { plugins: { tailwindcss: {}, autoprefixer: {} } };`,
//
//                         "tailwind.config.mjs": `export default {
//   content: ["./src/app/**/*.{js,ts,jsx,tsx}"],
//   theme: { extend: {} },
//   plugins: [],
// };`,
//
//                         "src/app/globals.css": `@tailwind base;
// @tailwind components;
// @tailwind utilities;`,
//
//                         "src/app/layout.tsx": `"use client"
// import "./globals.css";
//
// export default function RootLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <html lang="en">
//       <body className="bg-gray-100">{children}</body>
//     </html>
//   );
// }`,
//
//                         "src/app/page.tsx": `"use client"
// export default function Home() {
//   return (
//     <div className="flex min-h-screen items-center justify-center bg-gray-100">
//       <h1 className="text-4xl font-bold text-blue-600">Welcome to Next.js 14.1.4!</h1>
//     </div>
//   );
// }`,
//                     },
//                 };
//             }
//
//             // ✅ React 19 Configuration
//             else if (selectedFramework === "react") {
//                 projectConfig = {
//                     title: "React 19 Playground",
//                     description: "A React 19 project with Tailwind CSS",
//                     template: "node",
//                     files: {
//                         "package.json": JSON.stringify({
//                             name: "react-playground",
//                             version: "0.1.0",
//                             private: true,
//                             scripts: {
//                                 start: "vite",
//                                 build: "vite build",
//                                 dev: "vite",
//                             },
//                             dependencies: {
//                                 react: "^19.0.0",
//                                 "react-dom": "^19.0.0",
//                                 "tailwindcss": "latest",
//                                 autoprefixer: "latest",
//                                 postcss: "latest",
//                                 "vite": "latest"
//                             },
//                             devDependencies: {
//                                 "@types/react": "^19",
//                                 "@types/react-dom": "^19",
//                                 "typescript": "^5"
//                             }
//                         }, null, 2),
//
//                         "index.html": `<!DOCTYPE html>
// <html lang="en">
// <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>React 19 Playground</title>
//     <link rel="stylesheet" href="./src/styles.css">
// </head>
// <body>
//     <div id="root"></div>
//     <script type="module" src="./src/main.tsx"></script>
// </body>
// </html>`,
//
//                         "postcss.config.mjs": `export default { plugins: { tailwindcss: {}, autoprefixer: {} } };`,
//
//                         "tailwind.config.mjs": `export default {
//   content: ["./src/**/*.{js,ts,jsx,tsx}"],
//   theme: { extend: {} },
//   plugins: [],
// };`,
//
//                         "src/styles.css": `@tailwind base;
// @tailwind components;
// @tailwind utilities;`,
//
//                         "src/main.tsx": `import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App";
// import "./styles.css";
//
// ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );`,
//
//                         "src/App.tsx": `export default function App() {
//   return (
//     <div className="flex min-h-screen items-center justify-center bg-gray-100">
//       <h1 className="text-4xl font-bold text-blue-600">Welcome to React 19!</h1>
//     </div>
//   );
// }`
//                     },
//                 };
//             }
//
//             sdk.embedProject(embedRef.current, projectConfig, {
//                 height: 500,
//                 hideNavigation: false,
//             });
//         }
//     }, [selectedFramework]);
//
//     return (
//         <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-10">
//             <h1 className="text-3xl font-bold mb-6">Choose a Playground</h1>
//             <div className="flex gap-4">
//                 <button
//                     className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
//                     onClick={() => setSelectedFramework("next")}
//                 >
//                     Next.js 14.1.4
//                 </button>
//                 <button
//                     className="px-6 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-800"
//                     onClick={() => setSelectedFramework("react")}
//                 >
//                     React 19
//                 </button>
//             </div>
//             <div ref={embedRef} className="w-full mt-6 border border-gray-300 rounded-lg" />
//         </div>
//     );
// }
