import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "ipfs.io", pathname: "/ipfs/**" },
    ],
  },
  // Evita el warning de múltiples lockfiles: usa esta carpeta como root
  turbopack: {
    root: path.join(__dirname),
  },
};

export default nextConfig;
