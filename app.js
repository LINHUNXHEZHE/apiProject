const express = require('express');
const app = express(); 
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const {expressjwt:jwt} = require('express-jwt');
const publickey = fs.readFileSync(path.join(__dirname,'./token/key/publickey.pem'));

// 注册为中间件
app.use(cors());
// 配置解析表单数据中间件
app.use(express.urlencoded({extended:false}));

// 托管静态资源
app.use('/uploads',express.static('./uploads'));

// 优化res.send()处理中间件
app.use((req,res,next)=>{
    // 0:success 1:fail
    res.output = (err,status = 1)=>{
        res.send({
            status,
            msg:err instanceof Error ? err.message : err
        })
    }
    next();
})

// 解析验证token
app.use(jwt({
    secret:publickey,
    algorithms:['RS256'],
}).unless({ path:['/api/register','/api/login'] }));

// 导入
const userRouter = require('./router/user');
const userinfoRouter = require('./router/userinfo');
const categoryRouter = require('./router/category');
const articlesHandler = require('./router/articles');

// 注册
app.use('/api',userRouter);
app.use('/my',userinfoRouter);
app.use('/cate',categoryRouter);
app.use('/arts',articlesHandler);

// 错误中间件
app.use((err,req,res,next)=>{
    if(err.name === 'UnauthorizedError') return res.output(err);
    res.output(err);
})

app.listen('3000',function(){
    console.log('http://127.0.0.1:3000|Running ...');
})

