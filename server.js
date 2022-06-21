const http = require('http');
const express = require('express');
const path = require('path');
const fs = require('fs');
var cortex = require('./cortex');
const app = express();
app.use(express.json());
app.use(express.static("express"));

app.set('view engine', 'ejs');

//serve experiment page 
app.get('/experimento', function(req, res) {
  res.render('pages/experimento');
});

//experiment page
app.post('/experimento', function(req, res){
  const { estado } = req.body

  if(estado == "comenzar")
  {
    let profileName = 'test'
    let numberOfTrain = 1
    let trainingActions = ['neutral', 'push']
    c.train(profileName, trainingActions, numberOfTrain)
  
    c.live(profileName)
  }
  else if(estado == "finalizar")
  {
    //code
  }

});

//serve index page
app.get('/', function(req, res) {
  res.render('pages/index');
});



const server = http.createServer(app);
const port = 3000;
server.listen(port);
console.debug('Server listening on port ' + port);

try {
  const clientId = fs.readFileSync('secrets/client-id-tfg', 'utf8').trim();
  const clientSecret = fs.readFileSync('secrets/client-secret-tfg', 'utf8').trim();

  let socketUrl = 'wss://localhost:6868'
  let user = {
      "clientId":clientId,
      "clientSecret":clientSecret,
      "debit":1
  }

  let c = new cortex.Cortex(user, socketUrl)


  /*  
  let streams = ['eeg']
  c.sub(streams)
  */

} catch (err) {
  console.error(err);
}
