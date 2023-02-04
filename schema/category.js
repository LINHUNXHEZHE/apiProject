const Joi = require('joi');

// 验证新增分类表单
const schema_addCate = Joi.object({
    name:Joi.string()
            .required(),
    alias:Joi.string()
             .alphanum()
             .required(),
})

const verify_addCate = (req,res,next)=>{
    let cateInfo = req.body;
    const result = schema_addCate.validate({
        name:cateInfo.name,
        alias:cateInfo.alias
    })
    if(result.error instanceof Joi.ValidationError) return res.output(result.error);
    next();
}

const schema_delCate = Joi.object({
    id:Joi.number()
          .integer()
          .min(1)
          .required()
})

const verify_delCate = (req,res,next)=>{
    let cateInfo = req.params;
    const result = schema_delCate.validate({
        id:cateInfo.id
    })
    if(result.error instanceof Joi.ValidationError) return res.output(result.error);
    next();
}

const schema_updateCate = Joi.object({
    id:Joi.number()
          .integer()
          .min(1)
          .required(),
    name:Joi.string()
            .required(),
    alias:Joi.string()
            .alphanum()
            .required()
})

const verify_updateCate = (req,res,next)=>{
    const result = schema_updateCate.validate({
        id: req.body.id,
        name: req.body.name,
        alias: req.body.alias
    })
    if(result.error instanceof Joi.ValidationError) return res.output(result.error);
    next();
}

module.exports = {
    verify_addCate,
    verify_delCate,
    verify_updateCate
};

