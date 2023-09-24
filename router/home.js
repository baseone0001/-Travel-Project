var express = require('express');
var app = express.Router();
var mysql = require('mysql');
var session = require('express-session');//


app.use('/', express.static('public'));

var myDBconn = require('../db');

app.use(session({
     secret: 'mysession',
     resave: false,
     saveUninitialized: true,

     cookie: {
          path: '/',
          httpOnly: true,
          secure: false,
          maxAge: 20 * 60 * 1000 // 20分鐘
     }
}))



app.get('/home', function (req, res) {
     // res.sendFile(__dirname + '/html/home.html');
     var sql = "SELECT * FROM `news` ORDER BY dd DESC "; //sql指令：全部資料(倒序)

     myDBconn.exec(sql, [], function (data, fields) {
          // res.redirect('/page/1'); ==============================>可以直接轉到第一頁
          // console.log(data);
          res.render('home', { //渲染檔案home.ejs  ->一定要在views資料夾底下 
               data: data,
               // rows是資料庫回傳
          })

     })
})

app.get('/news', function (req, res) {
     var sql = "SELECT * FROM `news` ORDER BY dd DESC "
     myDBconn.exec(sql, [], function (data, fields) {
          res.render('news', {
               data: data,
          })

     })
})

app.post('/news', function (req, res) {
     // console.log(req.body);
     var data = req.body;
     
     req.session.news = {
          viewid: data
     }

     res.redirect('/newsview');
})


app.get('/newsview', function (req, res) {
     // console.log(req.session.news.viewid);
     var data = req.session.news.viewid.newsid;
     var sql = "SELECT * FROM news WHERE newsid = ?"
     myDBconn.exec(sql,data,function(results,fields){
          // console.log(results);
          res.render('newsview',{
               data:results
          })

     })
})

app.get('/contact',function(req,res){
     res.render('contact');
})


module.exports = app;
