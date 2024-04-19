/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [{
            hostname: 'fakeimg.pl',
            protocol: 'https'
        }]
    },
    eslint: {
        ignoreDuringBuilds: true
    }
};

export default nextConfig;
