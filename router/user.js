const express = require('express');
const router = express.Router();
const { verify_userpwd } = require('../schema/user');
// 路由函数处理
const userHandler = require('../router_handler/user');

// 注册路由
router.post('/register',verify_userpwd,userHandler.register);
// 登录路由
router.post('/login',verify_userpwd,userHandler.login);

module.exports = router;

