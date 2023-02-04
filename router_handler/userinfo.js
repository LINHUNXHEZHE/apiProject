/* 处理 router/userinfo.js 中的路由函数 */ 

const db = require('../database/conn_mysql');
const bcrypt = require('bcryptjs'); 

// 获取用户信息
exports.getUserInfo = (req,res)=>{
    const sqlStr = `SELECT id, username, email, photo From user WHERE id =?`
    db.query(sqlStr,[req.auth.id],(err,results)=>{
        if(err) return res.output(err);
        if(results.length !==1 ) return res.output('获取用户信息失败!');
        // 将用户信息响应给客户端
        res.send({
            status:0,
            msg:'获取用户信息成功',
            data:results[0]
        })
    })
}

// 更新用户信息
exports.updateUserInfo = (req,res)=>{
    const sqlStr = `UPDATE user SET ? WHERE id = ?`;
    db.query(sqlStr,[req.body,req.body.id],(err,results)=>{
        if(err) return res.output(err);
        if(results.affectedRows !== 1) return res.output('修改用户信息失败');
        return res.output('修改用户信息成功',0);
    })
}

// 密码重置
exports.updatePassword = (req,res)=>{
    console.log(req);
    // 根据id查询用户数据
    const sql = `SELECT * FROM user WHERE id = ?`;
    db.query(sql,[req.auth.id],(err,results)=>{
        if(err) return res.output(err);
        if(results.length !== 1) return res.output('用户不存在');

        // 用户存在,提交的旧密码是否正确
        const compareResult = bcrypt.compareSync(req.body.oldPwd,results[0].password); // 返回布尔值
        if(!compareResult) res.output('原密码错误');

        // 密码更新
         const sqlStr = `UPDATE user SET password = ? WHERE id = ?`;
        // 加密 —— 新密码
        const newPwd = bcrypt.hashSync(req.body.newPwd,10);
        db.query(sqlStr,[newPwd,req.body.id],(err,results)=>{
            if(err) return res.output(err);
            if(results.affectedRows !==1) return res.output('密码更新失败!')
            res.output('密码更新成功',0);
        })
    })
}

// 更新用户头像
exports.updateHPic = (req,res)=>{
    const sqlStr = `UPDATE user SET photo =? WHERE id = ?`;
    db.query(sqlStr,[req.body.h_Pic,req.body.id],(err,results)=>{
        if(err) return res.output(err);
        if(results.affectedRows !==1) return res.output('更新头像失败');
        return res.output('更新头像成功',0);
    })
}



