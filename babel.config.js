module.exports = function babel(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ['import-graphql'],
      ['module:react-native-dotenv'],
      ['react-native-reanimated/plugin'],
    ],
  };
};
