/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer, dev }) => {
    //! This will add the file-loader to process MP3 files
    config.module.rules.push({
      test: /\.mp3$/,
      type: 'asset/resource',
      generator: {
        filename: 'static/chunks/[path][name].[hash][ext]', // Customize output path
      }
    });
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: "lh3.googleusercontent.com", // Google user icon
        pathname: '**' // Match all paths
      },
      {
        protocol: 'https',
        hostname: "res.cloudinary.com", // Cloudinary
        pathname: '**' // Match all paths
      },
    ]
  }
};

export default nextConfig;
