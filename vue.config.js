module.exports = {
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
                    @import "scss-loader.scss";
                `,
      },
    },
  },
};
