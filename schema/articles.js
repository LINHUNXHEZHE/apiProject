const Joi = require('joi');

const schema_addArts = Joi.object({
    title:Joi.string()
             .required(),
    cate_id:Joi.number()
               .integer()
               .min(1)
               .required(),
    content:Joi.string()
               .required()
               .allow(''),
    state:Joi.string()
             .valid('已发布','草稿')
             .required(),
})

const verify_addArts = (req,res,next)=>{
    let arts = req.body;
    const result = schema_addArts.validate({
        title:arts.title,
        cate_id:arts.cate_id,
        content:arts.content,
        state:arts.state
    })
    if(result.error instanceof Joi.ValidationError) return res.output(result.error);
    next();
}

module.exports = {
    verify_addArts
}