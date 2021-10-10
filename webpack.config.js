const path = require("path"); //Esto ya viene en Node
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: "./src/index.js", //De aquí entra todo
  output: {
    path: path.resolve(__dirname, "dist"), //Aquí lo manda
    filename: "main.js", //En este archivo lo resuelve
  },
  resolve: {
    extensions: [".js"], //Ahora usaremos solo esto
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
        test: /\.css| .styl$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "stylus-loader"], //Esta configuración depende del plugin en sí
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true, //Inyecta el bundle al template HTML
      template: "./public/index.html", //El template que toma como referencia
      filename: "./index.html", //Nombre del archivo que se genera en dist
    }),
  ],
};