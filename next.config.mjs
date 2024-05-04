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
};

export default nextConfig;
