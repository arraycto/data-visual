/* 脚手架基础配置项 */
const path = require("path");
const paths = require("react-scripts/config/paths");
const {
  override,
  disableEsLint,
  adjustWorkbox,
  addLessLoader,
  fixBabelImports,
  addWebpackAlias,
  overrideDevServer
} = require("customize-cra");
const { getThemeVariables } = require("antd/dist/theme");
const CompressionWebpackPlugin = require("compression-webpack-plugin");

const resolve = (dir) => path.join(__dirname, dir);

// 打包自定义配置
const buildCustomize = () => (config) => {
  if (config.mode === "development") {
    console.log("evn is development, skip build path change...");
  } else if (config.mode === "production") {
    console.log("evn is production, change build path...");
    // 关闭sourceMap
    config.devtool = false;
    // 配置打包后的文件位置修改path目录
    paths.appBuild = path.join(path.dirname(paths.appBuild), "dist");
    config.output.path = path.join(path.dirname(config.output.path), "./dist");
    // 添加js打包gzip配置
    config.plugins.push(
      new CompressionWebpackPlugin({
        test: /\.js$|\.css$/,
        threshold: 1024
      })
    );
  }

  return config;
};

// 跨域配置
const devServerConfig = () => (config) => {
  return {
    ...config,
    proxy: {
      "/api": {
        target: process.env.REACT_APP_API,
        changeOrigin: true,
        pathRewrite: {
          "^/api": "/"
        }
      }
    }
  };
};

module.exports = {
  webpack: override(
    // do stuff with the webpack config...
    disableEsLint(),
    // 按需加载
    fixBabelImports("import", {
      libraryName: "antd",
      libraryDirectory: "es",
      style: true
    }),
    // 配置别名
    addWebpackAlias({
      "@": resolve("src"),
      "~components": resolve("src/components"),
      "~packages": resolve("src/packages"),
      "~renderer": resolve("src/renderer")
    }),
    adjustWorkbox((wb) =>
      Object.assign(wb, {
        skipWaiting: true,
        exclude: (wb.exclude || []).concat("index.html")
      })
    ),
    addLessLoader({
      localIdentName: "[local]--[hash:base64:5]",
      modifyVars: getThemeVariables({
        dark: true, // 开启暗黑模式
        compact: true // 开启紧凑模式
      }),
      javascriptEnabled: true
    }),
    buildCustomize()
  ),
  devServer: overrideDevServer(devServerConfig())
};
