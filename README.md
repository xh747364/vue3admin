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

> 数据示例
> ~~~json
> {
>    "_id": "6666666666",
>    "title": "文章标题示例",
>    "desc": "文章简介示例",
>    "content": "文章内容示例",
>    "categories": ["分类示例"],
>    "tags": ["标签示例"],
>    "createDate": "2021-01-01 00:00:00",
>    "updateDate": "2021-01-01 00:00:00",
>}
>~~~

- 分类

|数据类型|接口url|请求方式|返回类型
|-|-|-|-|
|分类列表|/v1/categories|GET|Array|
|分类创建|/v1/categories|POST|Array|
|分类详情|/v1/categories/:id|GET|JSON|
|分类编辑|/v1/categories/:id|PUT|JSON|
|分类删除|/v1/categories/:id|DELETE|JSON|

> 数据示例
> ~~~json
> {
>    "_id": "6666666666",
>    "title": "分类示例",
>    "createDate": "2021-01-01 00:00:00",
>    "updateDate": "2021-01-01 00:00:00",
>}
>~~~

- 标签

|数据类型|接口url|请求方式|返回类型
|-|-|-|-|
|标签列表|/v1/tags|GET|Array|
|标签创建|/v1/tags|POST|Array|
|标签详情|/v1/tags/:id|GET|JSON|
|标签编辑|/v1/tags/:id|PUT|JSON|
|标签删除|/v1/tags/:id|DELETE|JSON|

> 数据示例
> ~~~json
> {
>    "_id": "6666666666",
>    "title": "标签示例",
>    "createDate": "2021-01-01 00:00:00",
>    "updateDate": "2021-01-01 00:00:00",
>}
>~~~

- 友链

|数据类型|接口url|请求方式|返回类型
|-|-|-|-|
|友链列表|/v1/page-table|GET|Array|
|友链创建|/v1/page-table|POST|Array|
|友链详情|/v1/page-table/:id|GET|JSON|
|友链编辑|/v1/page-table/:id|PUT|JSON|
|友链删除|/v1/page-table/:id|DELETE|JSON|

> 数据示例
> ~~~json
> {
>    "_id": "6666666666",
>    "title": "友链示例",
>    "link": "https://xhxiehuan.club",
>    "createDate": "2021-01-01 00:00:00",
>    "updateDate": "2021-01-01 00:00:00",
>}
>~~~

- 评论

> 数据示例
> ~~~json
> {
>    "_id": "6666666666",
>    "article_id": "1000000",
>    "user_id": ObjectId(_id),
>    "createDate": "2021-01-01 00:00:00",
>    "updateDate": "2021-01-01 00:00:00",
>}
>~~~
