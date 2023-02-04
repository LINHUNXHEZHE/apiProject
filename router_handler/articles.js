/* router/articles.js 路由处理函数 */

const db = require('../database/conn_mysql');
const path = require('path');

exports.publishArt = (req,res)=>{
    // 判断是否上传封面
    if(!req.file || req.file.fieldname !== 'cover_img') return res.output('文章封面是必须参数！');

    const artsInfo = {
        ...req.body,
        // 文章封面在封面的存放路径;
        cover_img : path.join('/uploads',req.file.filename),
        // 文章发布时间
        pub_data : new Date(),
        // 文章作者id
        author_id : req.auth.id
    }
    const sqlStr = `INSERT INTO articles SET ?`;
    db.query(sqlStr,artsInfo,(err,results)=>{
        if(err) return res.output(err);
        if(results.affectedRows !==1 ) return res.output('发布文章失败！');
        res.output('发布文章成功！',0);
    })
}