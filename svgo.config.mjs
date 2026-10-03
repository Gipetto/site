export default {
  multipass: true,
  plugins: [
    {
      name: 'preset-default',
      params: {
        overrides: {
          // removeDimensions: false,
          inlineStyles: {
            onlyMatchedOnce: false,
          }
        },
      },
    },
  ],
};
