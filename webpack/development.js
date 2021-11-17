module.exports = {
  devServer: {
    contentBase: "./public",
    port: 3000,
  },
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.module\.s(a|c)ss$/,
        use: [
          "style-loader",
          "css-modules-typescript-loader",
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: "[local]",
              },
            },
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.(s(a|c)ss|css)$/,
        exclude: /\.module.(s(a|c)ss)$/,
        use: [
          "style-loader",
          "css-modules-typescript-loader",
          "css-loader",
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      // {
      //   test: /\.scss$/,
      //   include: path.join(__dirname, "src/component"),
      //   use: [
      //     "style-loader",
      //     {
      //       loader: "typings-for-css-modules-loader?modules",
      //       options: {
      //         modules: true,
      //         namedExport: true,
      //       },
      //     },
      //   ],
      // },
    ],
  },
};
