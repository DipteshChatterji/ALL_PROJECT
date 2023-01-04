const JOI = require("joi");
const { joiPasswordExtendCore } = require('joi-password','email-validator');
const joiPassword = JOI.extend(joiPasswordExtendCore);


const validatePassword = (req , res, next )=>{
        const signupSchema = JOI.object().keys({
        email:JOI.string().email(),
        pwd:joiPassword.string()
        .minOfSpecialCharacters(1)
        .minOfLowercase(1)
        .minOfUppercase(1)
        .minOfNumeric(1)
        .noWhiteSpaces()
        }).unknown(true)

        const {error} = signupSchema.validate(req.body.data);
        if(error){
            console.log(error)
            res.send("enter proper mail address")
            res.send("Incorrect password")
        }else{
            next()
        }

}

  module.exports = validatePassword