module.exports = {
  chainWebpack: config => {
    // 移除 prefetch 插件 （首次加载无需一次性全部加载所有的chunk）
    config.plugins.delete('prefetch')
  },
  devServer: {
    host: 'localhost',
    port: 9001,
    hot: true,          // 开启热更新
    overlay: true,      // 开启报错提示显示在浏览器遮罩层
    historyApiFallback: true   // 设置vue-router的模式是histroy
  },
  // multi-page 模式
  pages: {
    index: {
      // page 的入口
      entry: 'src/views/index/main.js',
      // 模板来源
      template: 'public/index.html',
      // 在 dist/index.html 的输出
      filename: 'index.html',
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: 'XX首页',
      // 在这个页面中包含的块，默认情况下会包含
      // 提取出来的通用 chunk 和 vendor chunk。
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    },
    ecc: {
      // page 的入口
      entry: 'src/views/ecc/main.js',
      // 模板来源
      template: 'public/ecc.html',
      // 在 dist/index.html 的输出
      filename: 'ecc.html',
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: 'ecc',
      // 在这个页面中包含的块，默认情况下会包含
      // 提取出来的通用 chunk 和 vendor chunk。
      chunks: ['chunk-vendors', 'chunk-common', 'ecc']
    }
  },
}