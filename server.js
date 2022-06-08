const http = require('http');
const express = require('express');
const path = require('path');
const app = express();
app.use(express.json());
app.use(express.static("express"));

app.set('view engine', 'ejs');

// index page
app.get('/experimento', function(req, res) {
  res.render('pages/experimento');
});


// index page
app.get('/', function(req, res) {
  res.render('pages/index');
});


const server = http.createServer(app);
const port = 3000;
server.listen(port);
console.debug('Server listening on port ' + port);