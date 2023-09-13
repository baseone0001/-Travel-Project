var express = require('express');
var app = express.Router();
var mysql = require('mysql');


app.use('/', express.static('public'));

var myDBconn = require('../db');


app.get('/Scheduleh', function (req, res) {
    res.sendFile(__dirname + '/html/Scheduleh.html');

})
app.get('/IntroduceScheduleh', function (req, res) {
    res.sendFile(__dirname + '/html/IntroduceScheduleh.html');

})

module.exports = app;
