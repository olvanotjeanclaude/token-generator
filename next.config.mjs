/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    assetPrefix:"https://bookofbonk.site/token",
    trailingSlash: true,
    images:{
        unoptimized:true
    }
};

export default nextConfig;
