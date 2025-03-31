/** @type {import('next').NextConfig} */
import path from "path";

const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        hostname: '**',
      },
    ]
  },
  webpack(config) {
    let hasFound = false

    for (let i = 0; i < config.module.rules.length; i++) {
      const rule = config.module.rules[i]

      if (!rule.oneOf) continue

      rule.oneOf.forEach(one => {
        if (!`${one.issuer?.and}`.includes('_app')) return
        one.issuer.and = [path.resolve()]
        hasFound = true
      })

      if (hasFound) break
    }

    return config;
  },
  rewrites: async () => [
    {
      source: '/image-sitemap.xml',
      destination: '/sitemap',
    }
  ]
};

export default nextConfig;
