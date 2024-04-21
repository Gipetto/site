export default {
  multipass: true,
  plugins: [
    {
      name: 'preset-default',
      params: {
        overrides: {
          removeTitle: false,
          // removeDimensions: false,
          inlineStyles: {
            onlyMatchedOnce: false,
          },
        },
      },
    },
  ],
};