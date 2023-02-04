---
title: Node.js API接口文档 v1.0.0
language_tabs:
  - shell: Shell
  - http: HTTP
  - javascript: JavaScript
  - ruby: Ruby
  - python: Python
  - php: PHP
  - java: Java
  - go: Go
toc_footers: []
includes: []
search: true
code_clipboard: true
highlight_theme: darkula
headingLevel: 2
generator: "@tarslib/widdershins v4.0.17"

---

# Node.js API接口文档

> v1.0.0

该项目是一个后台的API接口项目，采用的是Express框架结合Node.js + MySQL + ES6做项目开发，项目进行了CORS跨域 ，项目主分为四大模块：1.登录注册模块 2.个人中心模块 3.文章分类管理模块 4.文章管理模块; 下面来登录注册模块主要内容是将用户的注册信息保存到数据库，且要保证数据库内的数据安全性，在登录时可以在后台获取到token进行保存以便下次请求严重；个人中心模块内容主要是能够获取、更行用户信息以及可以重置密码和更换头像；文章分类管理模块主要是文章的增删查改内容；文章管理主要是对发布内容进行管理；

Base URLs:

* <a href="http://localhost:3000">开发环境: http://localhost:3000</a>

# 登录注册模块

## POST 注册接口

POST /api/register

用户注册

> Body 请求参数

```yaml
username: admin
password: admin

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|object| 否 |none|
|» username|body|string| 是 |用户名称|
|» password|body|string| 是 |用户密码|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

## POST 登录接口

POST /api/login

用户登录，获取token

> Body 请求参数

```yaml
username: admin
password: admin

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|object| 否 |none|
|» username|body|string| 是 |用户名称|
|» password|body|string| 是 |用户密码|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

# 个人中心模块

## GET 获取用户基本信息

GET /my/getUserInfo

获取用户非敏感性信息 —— id (标识)，username (用户名称)，email (邮箱)，photo (头像)

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Authorization|header|string| 是 |携带登录接口登录成功获取的token值|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

## POST 更新用户基本信息

POST /my/userinfo

修改用户的基本信息

> Body 请求参数

```yaml
id: string
email: 10086@qq.com

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Authorization|header|string| 是 |携带登录接口登录成功获取的token值|
|body|body|object| 否 |none|
|» id|body|string| 是 |用户标识|
|» email|body|string| 是 |用户邮箱|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

## GET 重置密码

GET /my/updatepwd

重置密码需要提供原密码和新密码

> Body 请求参数

```yaml
id: "1"
oldPwd: test
newPwd: tests

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Authorization|header|string| 是 |携带登录接口登录成功获取的token值|
|body|body|object| 否 |none|
|» id|body|string| 是 |用户标识|
|» oldPwd|body|string| 是 |旧密码|
|» newPwd|body|string| 是 |新密码|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

## GET 更新用户头像

GET /my/update/h_pic

更新用户头像 

> Body 请求参数

```yaml
id: "1"
h_Pic: string

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Authorization|header|string| 是 |none|
|body|body|object| 否 |none|
|» id|body|string| 是 |none|
|» h_Pic|body|string| 是 |none|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

# 文章分类管理模块

## GET 获取分类列表

GET /cate/cateList

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Authorization|header|string| 是 |none|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

## GET 新增文章分类

GET /cate/addCate

> Body 请求参数

```yaml
name: 武侠
alias: wuxia

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Authorization|header|string| 是 |none|
|body|body|object| 否 |none|
|» name|body|string| 是 |分类名|
|» alias|body|string| 是 |别名|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

## GET 删除文章分类

GET /cate/delCate/{id}

> Body 请求参数

```yaml
{}

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|id|path|string| 是 |none|
|Authorization|header|string| 是 |none|
|body|body|object| 否 |none|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

## GET 获取分类数据

GET /cate/getCateDate/{id}

> Body 请求参数

```yaml
{}

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|id|path|string| 是 |none|
|Authorization|header|string| 是 |none|
|body|body|object| 否 |none|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

## GET 更新分类数据

GET /cate/updateCate

> Body 请求参数

```yaml
id: "1"
name: 诗集
alias: shiji

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Authorization|header|string| 是 |none|
|body|body|object| 否 |none|
|» id|body|string| 否 |用户标识|
|» name|body|string| 否 |分类名|
|» alias|body|string| 否 |别名|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

# 文章管理模块

## POST 发布文章接口

POST /arts/publish

> Body 请求参数

```yaml
title: 我的第一篇博客
cate_id: "1"
content: 暂无
author_id: "1"
state: 草稿
cover_img: file://C:\Users\Administrator\Desktop\uni素材\2f3fcb4aa49e6c4156eac4c4425c789.jpg

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Authorization|header|string| 是 |none|
|body|body|object| 否 |none|
|» title|body|string| 是 |文章标题|
|» cate_id|body|string| 是 |文章分类|
|» content|body|string| 是 |文章内容|
|» author_id|body|string| 是 |作者|
|» state|body|string| 是 |[ 草稿 和 已发布 ]两个状态|
|» cover_img|body|string(binary)| 是 |封面上传|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

# 数据模型

