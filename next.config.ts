import type { NextConfig } from 'next';

const nextConfig: NextConfig = process.env.NETLIFY
  ? { output: 'export', images: { unoptimized: true } }
  : {};

export default nextConfig;
