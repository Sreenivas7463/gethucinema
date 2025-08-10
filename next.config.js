/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ['www.gethucinema.com', 'secure.gravatar.com'],
        unoptimized: true,
    },
};

module.exports = nextConfig;