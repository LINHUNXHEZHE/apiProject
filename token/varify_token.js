// const jwt = require('jsonwebtoken');
// const fs = require('fs');
// const path = require('path'); 

// const v_token = (req,res,next)=>{
//     // const t_k = req.body
//     let t_k = req.headers.authorization
//     t_k = t_k.substring(7);

//     // 公钥
//     const publickey = fs.readFileSync(path.join(__dirname,'../token/key/publickey.pem'));
    
//     // jwt.verify()解析token
//     // jwt.verify(参数1,参数2); —— 参数1:token,参数2:密钥
//     let decoded = jwt.verify(t_k,publickey);
//     console.log(decoded);
//     next();
// }

// module.exports = v_token;