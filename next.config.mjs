import { createJiti } from "jiti";
const jiti = createJiti(import.meta.url);

let userConfig = undefined;
try {
  userConfig = await import("./v0-user-next.config");
} catch (e) {
  // ignore error
}

await jiti.import("./env.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
  basePath: '/ticket/aquaverse', // Set the base path
  transpilePackages: ["@t3-oss/env-nextjs", "@t3-oss/env-core"],
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: false,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'static.bugaboo.tv',
        port: '',
        pathname: '/aquaverse/*',
        search: '',
      },
      {
        protocol: 'https',
        hostname: 'quickchart.io',
        port: '',
        pathname: '/**',
      },

    ],

  },
  experimental: {
    webpackBuildWorker: true,
    parallelServerBuildTraces: true,
    parallelServerCompiles: true,
  },
  async rewrites() {
    return [
      {
        source: "/healthcheck",
        destination: "/api/healthcheck",
      },
      {
        source: "/ticket/aquaverse/api/:path*",
        destination: "/api/:path*",
      },
      {
        source: "/ticket/aquaverse/images/:path*",
        destination: "/images/:path*",
      }
    ];
  },
};

mergeConfig(nextConfig, userConfig);

function mergeConfig(nextConfig, userConfig) {
  if (!userConfig) {
    return;
  }

  for (const key in userConfig) {
    if (
      typeof nextConfig[key] === "object" &&
      !Array.isArray(nextConfig[key])
    ) {
      nextConfig[key] = {
        ...nextConfig[key],
        ...userConfig[key],
      };
    } else {
      nextConfig[key] = userConfig[key];
    }
  }
}

export default nextConfig;
