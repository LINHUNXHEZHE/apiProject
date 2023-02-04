const express = require('express');
const router = express.Router();
// 路由处理函数
const userinfoHandler = require('../router_handler/userinfo');
const { verify_update, verify_updatepwd, verify_hPic } = require('../schema/user');

// 获取用户信息
router.get('/getUserInfo',userinfoHandler.getUserInfo);
// 更新用户信息
router.post('/userinfo',verify_update,userinfoHandler.updateUserInfo);
// 重置密码
router.get('/updatepwd',verify_updatepwd,userinfoHandler.updatePassword);
// 更新用户头像
router.get('/update/h_pic',verify_hPic,userinfoHandler.updateHPic);

module.exports = router

