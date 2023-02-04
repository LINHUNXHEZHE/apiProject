const express = require('express');
const router = express.Router();
// 路由处理函数
const categoryHandler = require('../router_handler/category.js')

// 验证表单数据
const { verify_addCate, verify_delCate, verify_updateCate } = require('../schema/category');

// 获取分类列表
router.get('/cateList',categoryHandler.getCateList);
// 新增分类
router.get('/addCate',verify_addCate,categoryHandler.addCategory);
// 删除分类
router.get('/delCate/:id',verify_delCate,categoryHandler.delCategory);
// 获取分类数据
router.get('/getCateDate/:id',verify_delCate,categoryHandler.getCateById);
// 更新分类数据
router.get('/updateCate',verify_updateCate,categoryHandler.updateCateDate);

module.exports = router;

