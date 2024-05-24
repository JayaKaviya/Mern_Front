
   // next.config.js
export default {
  pageExtensions: ['js', 'mjs'],
   
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Add Babel loader for .mjs files
    config.module.rules.push({
      test: /\.mjs$/,
      include: /node_modules/,
      type: 'javascript/auto', // This ensures that .mjs files are treated as ES modules
    });

    return config;
  }, 
  
};

  
  