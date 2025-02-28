/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'miro.medium.com',
            },
            {
                protocol: 'https',
                hostname: 'encrypted-tbn0.gstatic.com',
            }
        ],
    },
    reactStrictMode: true,
    typescript: {
        // !! WARN !!
        // Dangerously allow production builds to successfully complete even if
        // your project has type errors.
        // !! WARN !!
        ignoreBuildErrors: true,
    },
    // ... any other existing configurations
}

module.exports = nextConfig

