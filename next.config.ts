import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Tetap pertahankan domain lama dan tambahkan domain LinkedIn
    domains: ["lh3.googleusercontent.com", "i.pravatar.cc", "media.licdn.com","www.google.com"],

    // Disarankan juga tambahkan remotePatterns agar lebih fleksibel
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.licdn.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
