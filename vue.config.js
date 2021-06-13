module.exports={
    devServer: {
        host:'0.0.0.0',
        proxy: {
            '/v1': {
                target: 'http://127.0.0.1:2664',
                changeOrigin: true,  //是否跨域
                pathRewrite: {
                    '^/v1': ''
                }
            },
        }
    }
}