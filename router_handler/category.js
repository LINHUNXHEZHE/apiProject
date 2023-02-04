/* 处理 router/category.js 中的路由函数 */ 

const db = require('../database/conn_mysql');

// 获取分类列表
exports.getCateList = (req,res)=>{
    const sqlStr = `SELECT * FROM category WHERE is_delete = 0 order BY id asc`;
    db.query(sqlStr,(err,results)=>{
        if(err) return res.output(err);
        res.send({
            status:0,
            msg:'获取文章列表成功',
            data:results
        })
    })
}

// 新增分类
exports.addCategory = (req,res)=>{
    let cate = req.body;
    const sql = `SELECT * FROM category WHERE name = ? or alias = ?`;
    db.query(sql,[cate.name,cate.alias],(err,results)=>{
        if(err) return res.output(err);
        if(results.length === 2) return res.output('分类名与别名已被占用，请更换重试...');
        if(results.length === 1 && results[0].name === req.body.name && results[0].alias === req.body.alias)
            return res.output('分类名称与别名已被占用，请更换后重试！');
        if(results.length === 1 && results[0].name === req.body.name) 
            return res.output('分类名称已被占用，请更换重试！');
        if(results.length === 1 && results[0].alias === req.body.alias)
            return res.output('别名已被占用，请更换重试！')

        const sqlStr = `INSERT INTO category SET ?`;
        db.query(sqlStr,[cate],(err,results)=>{
            if(err) return res.output(err);
            if(results.affectedRows !== 1) return res.output('新增分类失败！');
            res.output('新增分类成功',0);
        })
    });
}

// 删除分类
exports.delCategory = (req,res)=>{
    let cate = req.params;
    const sqlStr = `UPDATE category SET is_delete = 1 WHERE id =?`;
    db.query(sqlStr,[cate.id],(err,results)=>{
        if(err) return res.output(err);
        if(results.affectedRows !==1) return res.output('删除分类失败！');
        res.output('删除分类成功！',0);
    })
}

// 获取分类数据
exports.getCateById = (req,res)=>{
    let cate = req.params;
    const sqlStr = `SELECT * FROM category WHERE id = ?`;
    db.query(sqlStr,[cate.id],(err,results)=>{
        if(err) return res.output(err);
        if(results.length !== 1) return res.output('获取分类数据失败');
        res.send({
            status:0,
            msg:"获取分类数据成功",
            data:results[0]
        })
    })
}

// 更新分类数据
exports.updateCateDate = (req,res)=>{
    const sql = `SELECT * FROM category WHERE id<>? AND (name=? OR alias=?)`;
    db.query(sql,[req.body.id,req.body.name,req.body.alias],(err,results)=>{
        if(err) return res.output(err);
        // if(results.length === 2) return res.output('分类名和别名已被占用');
        if(results.length === 1 && results[0].name === req.body.name && results[0].alias === updateCate.alias )
            return res.output('分类名与别名被占用,请更换重试！');
        if(results.length === 1 && results[0].name === req.body.name ) return res.output('分类名称已被占用,请更换后重试！');
        if(results.length === 1 && results[0].alias === req.body.alias ) return res.output('分类别名已被占用,请更换后重试！');
        const sqlStr = `UPDATE category SET ? WHERE id = ?`;
        db.query(sqlStr,[req.body,req.body.id],(err,results)=>{
            if(err) return res.output(err);
            if(results.affectedRows !== 1) return res.output('更新分类数据失败！');
            res.output('更新文章成功！',0);
        })
    })
}

