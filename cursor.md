`fetch-compositions.js` 是使用 cursor 生成的，描述如下：

```
使用js创建脚本，递归抓取对应的json文件并保存到本地文件夹中。
步骤：
1. 获取 https://chakra-v3-docs.vercel.app/compositions/index.json，解析每一项并按照 https://chakra-v3-docs.vercel.app/compositions/{id}.json 的格式依次抓取对应的json

json保存在当前目录的 compositions 目录中，将使用到的第三方依赖列在package.json中

请求json文件的时候，需要使用本地代理，本地代理的配置如下：

    HTTP，127.0.0.1，7890 	
    SOCKS，127.0.0.1，7891 

```