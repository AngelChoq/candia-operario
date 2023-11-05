module.exports = {
  resolve: {
    fallback: {
      stream: require.resolve('stream-browserify'),
      util: require.resolve('util/'),
      path: require.resolve('path-browserify'),
      fs: false,
      os: false,
      path: false
    }
  }
};
