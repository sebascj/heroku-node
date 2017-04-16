'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var PORT = process.env.PORT || 3000;

app.set('view engine', 'jade');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(__dirname));

app.get('/', function(req,res){
  res.render('index');
});

app.listen(PORT, function() {
   console.log(`Api rest corriendo en http://localhost:${PORT}`);
});
