module.exports = {
    chainWebpack: config => {
        config.module.rules.delete('eslint');
    },
    configureWebpack: {
    module: {
      rules: [
        {
          test: /\.(csv|xlsx|xls)$/,
          loader: 'file-loader',
          options: {
              name: `files/[name].[ext]`
          }
        }
      ]
    }
  }
}
