/* 处理 router/user.js 中的路由函数 */
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path'); 
const db = require('../database/conn_mysql');
const bcrypt = require('bcryptjs');

// 注册路由
exports.register = (req,res)=>{
    // 获取客户端提交到服务器信息
    const userinfo = req.body
    console.log(userinfo);
    // 对表单数据合法校验
    if(!userinfo.username || !userinfo.password){
        res.send({
            status:1,
            msg:'用户名或密码不为空'
        })
    }

    // 查询
    const sqlStr = 'SELECT * FROM user WHERE username = ?';
    db.query(sqlStr,[userinfo.username],(err,results)=>{
        if(err){
            // return res.send({status:1,msg:err.message});
            return res.output(err);
        }
        // 判断是否被占用
        if(results.length>0){
            // return res.send({status:0,msg:'用户已被占用'});
            return res.output('用户已被占用',0);
        }
        // 密码加密
        // 调用hashSync(参数1,参数2)方法加密 —— 参数1：密码,参数2：加密长度)
        userinfo.password = bcrypt.hashSync(userinfo.password,10);

        // 录入数据库
        const addRecord = 'INSERT INTO user SET ?';
        const addInfo = {
            username:userinfo.username,
            password:userinfo.password
        }
        db.query(addRecord,addInfo,(err,results)=>{
            // if(err) return res.send({status:1,msg:err.message});
            if(err) return res.output(err);
            // 影响行数是否为1;
            // if(results.affectedRows !== 1) return res.send({status:1,msg:'注册失败,请稍后重试...'});
            if(results.affectedRows !== 1) return res.output('注册失败,请稍后重试...');
            // 注册成功
            // res.send({status:0,msg:'注册成功'});
            res.output('注册成功',0);
        })
        
    })
}

// 登录路由
exports.login = (req,res)=>{
    // 获取前端数据
    const userinfo = req.body;
    // sql语句
    const sqlStr = `SELECT * FROM user WHERE username = ?`;
    db.query(sqlStr,[userinfo.username],(err,results)=>{
        if(err) return res.output(err);
        if(results.length !== 1) return res.output('登录失败'); 
        // 调用bcrypt.compareSync()判断密码是否一致;
        // bcrypt.compareSync(参数1,参数2); —— 参数1:输入密码,参数2:正确密码
        const result = bcrypt.compareSync(userinfo.password,results[0].password);
        if(!result) return res.output('登录失败');
        // ES6 高级语法 提出password和email;保留id和username;
        const user = { ...results[0],password:'',email:'' };

        // 私钥
        const privatekey = fs.readFileSync(path.join(__dirname,'../token/key/privatekey.pem'));
        // jwt.sign()生成token
        const t_k = jwt.sign(user,privatekey,{expiresIn:'10h',algorithm:'RS256'});
        
        // 响应客户端
        res.send({
            status:0,
            msg:'登录成功',
            token:'Bearer '+ t_k
        });
    })
}


