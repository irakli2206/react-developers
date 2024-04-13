/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [{
            hostname: 'fakeimg.pl',
            protocol: 'https'
        }]
    }
};

export default nextConfig;
