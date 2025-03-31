/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true, // Active les Server Actions pour Supabase
  },
};

module.exports = nextConfig;
