'use strict'

var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var nodemailer = require('nodemailer');
var router = express.Router();

var app = express();
var PORT = process.env.PORT || 3000;

app.set('view engine', 'jade');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/sayHello', router);

router.post('/', handleSayHello);

function handleSayHello(req, res) {
  var transporter = nodemailer.createTransport({
    service: 'SendGrid',
    auth: {
      user: process.env.SENDGRID_USERNAME,
      pass: process.env.SENDGRID_PASSWORD
    }
  });

  transporter.sendMail(message, function(error, info){
    if(error){
        console.log(error);
        res.json({yo: 'error'});
    }else{
        console.log('Message sent: ' + info.response);
        res.json({yo: info.response});
    };
  });
}

var text = "Esto es un texto de prueba";

var message = {
  from: 'sebas.cj@gmail.com',
  to:'sebas.cj@gmail.com',
  subject: 'Notification',
  text: text
}

app.get('/', function(req,res){
  res.render('index');
});

app.listen(PORT, function() {
   console.log(`Api rest corriendo en http://localhost:${PORT}`);
});
