/* 用户信息验证模块 */ 
const Joi = require('joi');

/**
 * string() 值必须是字符串
 * alphanum() 值只能是包含 a-zA-Z0-9 的字符串
 * min(length) 最小长度
 * max(length) 最大长度
 * required() 值是必填项，不能为 undefined
 * pattern(正则表达式) 值必须符合正则表达式的规则
 */

const schema = Joi.object({
    // 用户名验证规则
    username:Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),
    // 密码验证规则
    password: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
})

const verify_userpwd = (req,res,next)=>{
    let userinfo = req.body;
    const result = schema.validate({
        username:userinfo.username,
        password:userinfo.password
    })
    // 验证失败
    if(result.error instanceof Joi.ValidationError) return res.output(result.error);
    next();
}

const schema_update = Joi.object({
    // id
    id:Joi.number()
    .integer()
    .min(1)
    .required(),
    // email
    email:Joi.string()
    .email()
    .required()
})

const verify_update = (req,res,next)=>{
    let userinfo = req.body;
    const result = schema_update.validate({
        id:userinfo.id,
        email:userinfo.email
    })
    if(result.error instanceof Joi.ValidationError) return res.output(result.error);
    next();
}

const schema_updatepwd = Joi.object({
    // id
    id:Joi.number()
    .integer()
    .min(1)
    .required(),
    // 密码验证规则
    password: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    // .not(Joi.ref('password')).concat(),
    newPwd:Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    .not(Joi.ref('password'))
})

const verify_updatepwd = (req,res,next)=>{
    console.log(req);
    let userinfo = req.body;
    const result = schema_updatepwd.validate({
        id:userinfo.id,
        password:userinfo.oldPwd,
        newPwd:userinfo.newPwd
    })
    if(result.error instanceof Joi.ValidationError) return res.output(result.error);
    next();
}

const schema_hPic = Joi.object({
    photo: Joi.string()
    .dataUri()
    .required()
})

const verify_hPic = (req,res,next)=>{
    let userinfo = req.body;
    const result = schema_hPic.validate({
        photo: userinfo.h_Pic
    })
    if(result.error instanceof Joi.ValidationError) return res.output(result.error);
    next();
}

module.exports = {
    verify_userpwd,
    verify_update,
    verify_updatepwd,
    verify_hPic
}





