const { dependencies } = require('./package.json');

module.exports = {
  name: 'com_rak_spectral_scan',
  exposes: {
    './SpectralScan': './src/SpectralScan',
  },
  filename: 'remoteEntry.js',
  remotes: {
    host: 'host@../remoteEntry.js',
  },
  shared: {
    ...dependencies,
    react: {
      singleton: true,
      requiredVersion: dependencies['react'],
    },
    'react-dom': {
      singleton: true,
      requiredVersion: dependencies['react-dom'],
    },
    '@material-ui/core': {
      singleton: true,
      requiredVersion: dependencies['@material-ui/core'],
    },
    '@material-ui/styles': {
      singleton: true,
      requiredVersion: dependencies['@material-ui/styles'],
    },
  },
};
