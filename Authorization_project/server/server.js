//this is for api key value

const express=require("express")
const app= express();
const auth=require('./apiauth')
const { users, Countries } = require('./initial-data');
app.use(express.json());

// app.post('/test',(req,res)=>{
//     res.send("hi")
// })

app.get('/', (req, res) => {
    //home page
    res.status(200).send({ data: { message: 'You can get list of countires at /api/country.' } });
  });


app.post('/api/register', (req, res) => {
    //create a new with "user:Username"
    let username = req.body.username;
    let user = auth.createUser(username, req);
    res.status(201).send({ data: user });
  });  




  app.get('/api/country', auth.authenticateKey, (req, res) => {
    //get list of all Countries   
    let today = new Date().toISOString().split('T')[0];
    console.log(today);
    res.status(200).send({
      data: Countries,
    });
  });
  app.post('/api/country', auth.authenticateKey, (req, res) => {
    //add a new country
    let country = {
      _id: Date.now(),
      name: req.body.country,
    };
    Countries.push(country);
    res.status(201).send({
      data: country,
    });
  });
  
  app.listen(3000, function (err) {
    if (err) {
      console.error('Failure to launch server');
      return;
    }
    console.log(`Listening on port 3000`);
  });
  