const path = require("path"); //Esto ya viene en Node
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = {
  entry: "./src/index.js", //De aquí entra todo
  output: {
    path: path.resolve(__dirname, "dist"), //Aquí lo manda
    filename: "[name].[contenthash].js", //En este archivo lo resuelve
    assetModuleFilename: "assets/images/[hash][ext][query]",
  },
  mode: "development",
  devtool: "source-map",
  resolve: {
    extensions: [".js"], //Ahora usaremos solo esto
    alias: {
      "@utils": path.resolve(__dirname, "src/utils/"),
      "@templates": path.resolve(__dirname, "src/templates/"),
      "@styles": path.resolve(__dirname, "src/styles/"),
      "@images": path.resolve(__dirname, "src/assets/images/"),
    },
  },
  module: {
    rules: [
      {
        test: /\.m?js$/, //Expresión Regular: usa cualquier mjs o js
        exclude: /node_module/, //Excluye esta carpeta
        use: {
          loader: "babel-loader", //Indica qué loader usarás
        },
      },
      {
        test: /\.css|.styl$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "stylus-loader"], //Esta configuración depende del plugin en sí
      },
      {
        test: /\.(png|jpg|svg|jpeg|gif)$/i,
        type: "asset/resource", //generator: {filename: 'static/images/[hash][ext][query]'}  salida
      },
      {
        test: /\.(woff|woff2)$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 10000,
            mimetype: "application/font-woff", //MIME Type: Standard para enviar contenid en la red
            name: "[name].[contenthash].[ext]",
            outputPath: "./assets/fonts/", //Salida en este directorio
            publicPath: "./assets/fonts/", //Salida en este directorio público
            esModule: false, //Avisa si es un módulo
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true, //Inyecta el bundle al template HTML
      template: "./public/index.html", //El template que toma como referencia
      filename: "./index.html", //Nombre del archivo que se genera en dist
    }),
    new MiniCssExtractPlugin({
      filename: "assets/[name].[contenthash].css",
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src", "assets/images"),
          to: "assets/images",
        },
      ],
    }),
    new Dotenv(),
    new BundleAnalyzerPlugin(),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
      watch: true,
    },
    watchFiles: path.join(__dirname, "./**"), //observa los cambios en todos nuestros archivos y actualiza el navegador
    compress: true,
    historyApiFallback: true,
    port: 3006,
    open: true, //Hace que se abra en el navegador
  },
};
