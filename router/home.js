var express = require('express');
var app = express.Router();
var mysql = require('mysql');


app.use('/', express.static('public'));

var myDBconn = require('../db');


app.get('/home', function (req, res) {
     // res.sendFile(__dirname + '/html/home.html');
     var sql = "SELECT * FROM `news` ORDER BY dd DESC "; //sql指令：全部資料(倒序)

     myDBconn.exec(sql,[], function (data, fields) {
          // res.redirect('/page/1'); ==============================>可以直接轉到第一頁
          // console.log(data);
          res.render('home', { //渲染檔案home.ejs  ->一定要在views資料夾底下 
               data: data,
               // rows是資料庫回傳
          })

     })
})

module.exports = app;
