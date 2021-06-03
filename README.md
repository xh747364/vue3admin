# vue3博客后台管理

## V1.0.0初始化
> 基于 vue3 + typescript + element ui plus开发

## 文件目录结构

~~~js
├── src
│   ├── assets
│   ├── components
│   ├── hooks
│   ├── interface
│   ├── layout
│   ├── pages
│   ├── plugins
│   ├── router
│   └── store
~~~

- assets 静态文件
- components 公共组件
- hooks 工具类
- interface 接口类
- layout layout布局
- pages 页面
- plugins 插件
- router 路由
- store 状态管理(暂未使用)

## API 列表

- 文章

|数据类型|接口url|请求方式|返回类型
|-|-|-|-|
|文章列表|/v1/posts|GET|Array|
|文章创建|/v1/posts|POST|Array|
|文章详情|/v1/posts/:id|GET|JSON|
|文章编辑|/v1/posts/:id|PUT|JSON|
|移入回收站|/v1/posts/:id|POST|JSON|
|回收站还原|/v1/posts/recovery/:id|POST|JSON|
|回收站删除|/v1/posts/:id|DELETE|JSON|

> 返回数据示例
> ~~~json
> [{
>    "title": "文章标题示例",
>    "desc": "文章简介示例",
>    "content": "文章内容示例",
>    "categories": ["分类示例"],
>    "tags": ["标签示例"],
>    "createDate": "2000-01-01 00:00:00",
>    "updateDate": "2000-01-01 00:00:00",
>}]
>~~~

