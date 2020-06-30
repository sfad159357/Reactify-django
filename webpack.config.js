module.exports = {
    module:{
        rules:[
            {
                test:/\.js$/,
                exclude: /node_mouldes/,
                use:{
                    loader:"babel-loader"
                }
            }
        ]
    }
}

//  /xxx/，正則表達式。\，代表任何字母。$，代表結束
// 測試任何.js檔
// exclude，對node_mouldes排除測試
// 使用babel-loader，來負責轉譯