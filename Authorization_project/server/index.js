// This is for api token

const { verify } = require('crypto');
const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

app.post('/login',(req,res)=>{
    const user={
        id:Date.now(),
        email:'test@gmail.com',
        pwd:"123"
    }

    //creating the token
    jwt.sign({user: user},'key',(err,token)=>{
        res.json({
            token: token
        });
        console.log(token);
    })

})

app.get('/profile',verifytoken,(req,res)=>{
    jwt.verify(req.token,'key',(err,authdata)=>{
        if(err)
        {res.sendStatus(403)}
        else{
            res.json({
                message:"Welcome",
                authdata
            })
            console.log(authdata);
        }
    })
})



function verifytoken(req,res,next){
    const header=req.headers["authorization"];
    if(typeof header !== 'undefined'){
        const bearer = header.split(' ');
        const bearerToken=bearer[1];
        req.token=bearerToken;
        next();
    }
    else{
        res.sendStatus(403)
    }
}

app.listen(4000,err=>{
    if(err)
    {console.log(err);};
    console.log(`server running on port 4000`);
})
