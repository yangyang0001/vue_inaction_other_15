const path = require('path')
const coverPath = path.join(__dirname, './src/assets/cover.less')

// const { defineConfig } = require('@vue/cli-service')
module.exports = {
    transpileDependencies: true,
    publicPath: './',       // 作用: npm run build 在 dist 文件夹下生成的 html 能够在本地打开!
    css: {                  // 定制主题样式
        loaderOptions: {
            less: {
                // 若 less-loader 版本小于 6.0，请移除 lessOptions 这一级，直接配置选项。
                lessOptions: {
                    modifyVars: {
                        // 直接覆盖变量
                        // 'nav-bar-background-color': 'red',
                        // 或者可以通过 less 文件覆盖（文件路径为绝对路径）
                        hack: `true; @import "${coverPath}";`,
                    },
                },
            },
        },
    },
}