const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

// 路由处理函数
const articlesHandler = require('../router_handler/articles.js');

// 验证
// multer实例,dest指定存放路径
const upload = multer({dest : path.join(__dirname,'../uploads')});
const { verify_addArts } = require('../schema/articles');

// 发布文章功能
router.post('/publish',upload.single('cover_img'),verify_addArts,articlesHandler.publishArt);

module.exports = router;