const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcrypt")
const validator = require("../server/validator")

const app = express();
const db = require("./database/models");
// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));


const Tutorial = db.tutorials;

var corsOptions = {
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));

db.sequelize.sync();

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to My application." });
});



app.post("/data",validator,(req, res) => {
  const tutorial = {
    
    Firstname: req.body.data.fname,
    Lastname: req.body.data.lname,
    dob: req.body.data.dob,
    email: req.body.data.email,
    password: req.body.data.pwd,
    address: req.body.data.address,
  };
  
   console.log(tutorial);
  let privateNumber = 10
  const salt =  bcrypt.genSaltSync(Number(privateNumber));
  console.log('Salt:::::::::::',JSON.stringify(salt));
  tutorial.password = bcrypt.hashSync(String(tutorial.password), salt);
  console.log('tutorial password:::::::::::::', tutorial.password);

  Tutorial.create((tutorial))
    .then(() => {
      res.status(200).json({
        status: true,
        message: "sign up"
      })
    })
    .catch((err) => {
      res.status(200).json({
        status: false,
        message: "sign up"
      })
    });
});



app.post("/check",validator,async(req,res)=>{
  let a=req.body.data.email;
  let b=req.body.data.pwd;
  console.log(a,b);
  let data1=await Tutorial.findOne({
    where:{
      email: a
    }
  })
  const match= bcrypt.compareSync(b,data1.password)
  console.log(match);
  
  console.log("1->"+data1.password,"2->"+b);
  if(match)
      {
        res.status(200).json({status:true})
      }
      else {
        res.status(200).json({status:false})
      }
  
}),



app.get('/print',(req,res)=>{
  let a= req.body.email;
  console.log("a:::::::::"+a);
  let data2=Tutorial.findOne({
    where:{
      email:a
    },
  })
  if(a==data2.email){
    console.log(req.body);
  }


  console.log("data2:::::::::::::::::::"+data2);

})

app.post("/update",(req,res)=>{
  const e = req.body.data.email;
  console.log(e);
  const a=req.body;
  console.log(a);
  const c=req.body.status
  console.log(c);

  let privateNumber = 10
  const salt =  bcrypt.genSaltSync(Number(privateNumber));
  console.log('Salt:::::::::::',JSON.stringify(salt));
  req.body.data.password = bcrypt.hashSync(String(req.body.data.password), salt);
  console.log('tutorial password:::::::::::::', req.body.data.password);
  

  Tutorial.update(req.body.data, {
    where: { email: e }
  }).then((email) => {
      if (req.body.data.email == e ) {
        res.status(200).json({
          status: true,
        message: "updated"
        });
      } else {
        res.send({
          message: `Cannot update Tutorial with email=${e}. Maybe Tutorial was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Tutorial with email"
      });
    });
    
})

require("./Database/routes/tutorial.routes")(app);

app.listen(4005, () => {
  console.log("server running on port 4005");
});
