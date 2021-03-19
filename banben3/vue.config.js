// vue.config.js
module.exports = {
    publicPath: '/',
    outputDir: 'dist',
    devServer: {
      host: 'localhost',
      port: '8081',
      proxy: {
        '/api': {
          target: 'http://localhost:8088', // 要请求的地址,这里可以换成自己的后端地址
          ws: true,
          changeOrigin: true,
          secure: false,
        }
      }
    }
  };
