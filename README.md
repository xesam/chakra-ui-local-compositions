# chakra UI local compositions

根据 chakra UI 官网的文档，添加组件的时候，主要使用

```
npx @chakra-ui/cli snippet add
```

的方式，这个命令会读取远程的组件配置文件，然后根据配置文件生成组件代码。比如：

```
npx @chakra-ui/cli snippet add button
```

会拉取 `button.json` 文件，然后在 `components/ui` 文件夹下生成 `Button.tsx` 文件。

_这种方案还是挺糟心的，特别是远程配置与本地代码版本有差异的时候，就需要手动排错了_

但是这些组件的文件配置部署在 `vercel` 上，由于众所周知的原因，这些资源在国内无法访问，所以在国内使用这个命令的时候，会报错：

```
FetchError: request to https://chakra-v3-docs.vercel.app/compositions/index.json failed, reason: connect ETIMEDOUT
```

这里提供一个替代方案，既然部署在 `vercel` 上的配置无法访问，那就把配置文件下载下来，然后本地使用，思路：

1. 挂个代理，把配置文件下载下来，放置在本地；
2. 基于本地文件，开启一个静态文件服务器；
3. `@chakra-ui/cli snippet` 可以使用环境变量修改配置文件地址，这里我们指向第二步服务器的地址，具体可以参见：[https://github.com/chakra-ui/chakra-ui/blob/main/packages/cli/src/utils/fetch.ts](https://github.com/chakra-ui/chakra-ui/blob/main/packages/cli/src/utils/fetch.ts)；

## 具体步骤：

1. 下载本工程，其中 `compositions` 目录就是所有组件的配置文件；
2. `npm install` 安装依赖；
3. `npm run serve` 启动静态文件服务器，默认 `3000` 端口，如果有端口冲突，可以修改 [package.json](./package.json) 中的 `serve:8081` 命令；
4. 在目标工程的 `package.json` 文件中，增加：

```json
  "scripts": {
      "snippet:all": "cross-env REGISTRY_URL=http://localhost:3000 npx @chakra-ui/cli snippet add --all",
      "snippet": "cross-env REGISTRY_URL=http://localhost:3000 npx @chakra-ui/cli snippet"
  },
```

5. 执行 `npm run snippet add button`，即可下载 `Button` 组件配置文件，并生成 `Button` 组件代码：

```
λ npm run snippet add button

> chakra-ui-empty@0.0.1 snippet
> cross-env REGISTRY_URL=http://localhost:3000 npx @chakra-ui/cli snippet add button

┌  Chakra CLI ⚡️
│
●  Adding 1 snippet(s)...
│
◇  Writing selected snippets
│
└  Done!
```

6. 执行 `npm run snippet:all`，即可下载全部组件配置文件，并生成组件代码：

```
λ npm run snippet:all

> chakra-ui-empty@0.0.1 snippet:all
> cross-env REGISTRY_URL=http://localhost:3000 npx @chakra-ui/cli snippet add --all

┌  Chakra CLI ⚡️
│
●  Adding all snippets...
│
◇  Installing required dependencies...
│
◇  Writing file dependencies
│
◇  Writing selected snippets
│
└  Done!
```

_注意：第 4 步中的 `REGISTRY_URL` 需要与第 3 步的保持兼容_，如果端口被占用，可以酌情修改：

```json
  "scripts": {
    "serve": "serve",
    "serve:8081": "serve -p 8081"
  },
```

具体可以参考示例： [chakra-ui-snippet-sample](./chakra-ui-snippet-sample)

## compositions 配置文件更新记录

- 2025-02-12
- 2025-01-02
