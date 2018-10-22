# [react app](https://github.com/pdsuwwz/react-app) &middot;

react 前端项目架构的基本搭建，若本项目有帮到你，可以点个 star 哈 ✨

## 使用技术：

> react16 + react-router4 + react-redux + babel7 + webpack4 + express

## 开发文档：

```
// 安装依赖
npm install OR yarn install
```

```
// 抽离依赖库
npm run dll
```

---

```
// 模块打包
npm run build

// 开起服务
node index

OR

// 直接使用 WDS 
npm run dev OR npm start

```

## 目录结构

```
├── build                          打包配置，这里包括了抽离库的配置（ dll 配置）
│   ├── webpack.config.js
│   └── webpack.dll.config.js
├── .babelrc                       babel 配置
├── bundle-config.json             第三方库自动插入模板文件配置
├── index.js                       服务开启入口
├── package.json
├── postcss.config.js              css 规范化配置
├── public                         打包后的文件目录
│   ├── bundle.css
│   ├── bundle.js
│   └── index.html
├── src                            源文件目录
│   ├── common                     公共方法及配置
│   │   ├── base.js
│   │   ├── config.js
│   │   └── utils.js
│   ├── script                     核心代码
│   │   ├── actions                action creator
│   │   ├── components             react 组件
│   │   ├── constants              存放 action 所需常量
│   │   ├── container              redux 容器组件
│   │   ├── middleware             中间件配置
│   │   ├── reducers               state 处理函数
│   │   ├── routes                 路由配置
│   │   ├── store.js               存放 state 的对象配置，核心
│   │   └── app.js                 webpack 入口文件
│   ├── server                     静态服务渲染
│   │   └── index.js
│   └── styles                     暂定为公共 css
│       └── common.scss
├── vendor                         抽离的公共库目录
│   └── dll
│       ├── vendor-manifest.json
│       └── vendor.xxx.dll.js
└── templates                      总模板渲染文件
    └── index.html
```

注：控制台执行命令 `tree -I '*node_module*' -L 3` 可以生成目录结构