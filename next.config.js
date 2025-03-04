/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone",

    // Ignore ESLint warnings during build
    eslint: {
        ignoreDuringBuilds: true,
    },

    // Image domains allowed for Next.js Image Optimization
    images: {
        remotePatterns: [
            { protocol: 'https', hostname: 'miro.medium.com' },
            { protocol: 'https', hostname: 'encrypted-tbn0.gstatic.com' },
            { protocol: 'https', hostname: 'i.pinimg.com' },
            { protocol: 'http', hostname: '136.228.158.126' },
            { protocol: 'https', hostname: 'www.zdnet.com' },
            { protocol: 'https', hostname: 'jomnumtech-api.shinoshike.studio' },
            { protocol: 'https', hostname: 'source.unsplash.com' },
            { protocol: 'https', hostname: 'example.com' }
        ],
    },

    // Enable React Strict Mode (Good for catching potential issues)
    reactStrictMode: true,

    // Allow production builds even if TypeScript has errors (use carefully)
    typescript: {
        ignoreBuildErrors: true,
    },

    // Webpack Configurations
    webpack: (config, { isServer }) => {
        if (isServer) {
            // Prevent SSR-related errors
            config.externals = [...config.externals, 'document', 'window'];
        }

        // Resolve potential build errors related to modules
        config.resolve.fallback = {
            fs: false, // Prevents "fs" module errors in client-side code
            path: false, // Prevents "path" module errors
            os: false, // Prevents "os" module errors
        };

        return config;
    },

    // **Fix Prerendering Issues**
    experimental: {
        appDir: true, // Ensure the app router is enabled
        serverComponentsExternalPackages: ["some-external-package"], // If using external packages
    },

    // **Disable Server-Side Rendering (SSR) for certain pages**
    async rewrites() {
        return [
            {
                source: "/some-client-only-page",
                destination: "/api/client-only",
            },
        ];
    },

    // **Prevent build from failing on missing env variables**
    env: {
        NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || "https://fallback-api.com",
    },
};

module.exports = nextConfig;
