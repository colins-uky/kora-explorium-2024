/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    images: { unoptimized: true },
    basePath: '/out',
    assetPrefix: '/out/',
}

module.exports = nextConfig
