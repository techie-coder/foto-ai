/** @type {import('next').NextConfig} */
import process from 'process';
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ['v3.fal.media', process.env.NEXT_PUBLIC_IMAGE_KEY],
    }
};

export default nextConfig;
