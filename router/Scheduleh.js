var express = require('express');
var app = express.Router();
var mysql = require('mysql');


app.use('/', express.static('public'));

var myDBconn = require('../db');


app.get('/Scheduleh', function (req, res) {
    // res.sendFile(__dirname + '/html/Scheduleh.html');
    var sqlorderinfo = "SELECT * FROM `orderinfo` "; //sql指令：全部資料(倒序)
    var sqlflyinfo = "SELECT * FROM `flyinfo` "; //sql指令：全部資料(倒序)

    myDBconn.exec(sqlorderinfo, [], function (orderinfo, fields) {
        myDBconn.exec(sqlflyinfo, [], function (flyinfo, fields) {
            // res.redirect('/page/1'); ==============================>可以直接轉到第一頁
            //   console.log(data);
            //   console.log(data[0].GoAir);
            res.render('Scheduleh', { //渲染檔案Scheduleh.ejs  ->一定要在views資料夾底下 
                orderinfo: orderinfo,
                flyinfo: flyinfo,
                // rows是資料庫回傳
            })

        })
    })
});

// app.get('/IntroduceScheduleh', function (req, res) {
//     // res.sendFile(__dirname + '/html/IntroduceScheduleh.html');
//     var sql = "SELECT * FROM `orderinfo` "; //sql指令：全部資料(倒序)

//     myDBconn.exec(sql, [], function (data, fields) {
//         // res.redirect('/page/1'); ==============================>可以直接轉到第一頁
//         //   console.log(data);
//         //   console.log(data[0].GoTo);
//         res.render('IntroduceScheduleh', { //渲染檔案Scheduleh.ejs  ->一定要在views資料夾底下 
//             data: data,
//             // rows是資料庫回傳
//         })

//     })
// })

app.get('/IntroduceScheduleh', function (req, res) {
    // res.sendFile(__dirname + '/html/IntroduceScheduleh.html');
    var sqlorderinfo = "SELECT * FROM `orderinfo` "; //sql指令：全部資料(倒序)
    var sqlflyinfo = "SELECT * FROM `flyinfo` "; //sql指令：全部資料(倒序)
    var sqllive = "SELECT * FROM `live` ";
    var sqlview = "SELECT * FROM `view` ";

    myDBconn.exec(sqlorderinfo, [], function (orderinfo, fields) {
        myDBconn.exec(sqlflyinfo, [], function (flyinfo, fields) {
            myDBconn.exec(sqllive, [], function (live, fields) {
                myDBconn.exec(sqlview, [], function (view, fields) {
                    // res.redirect('/page/1'); ==============================>可以直接轉到第一頁
                    //   console.log(data);
                    //   console.log(data[0].GoAir);
                    res.render('IntroduceScheduleh', { //渲染檔案Scheduleh.ejs  ->一定要在views資料夾底下 
                        orderinfo: orderinfo,
                        flyinfo: flyinfo,
                        live: live,
                        view: view,
                        // rows是資料庫回傳
                    })

                })
            })
        })
    })
});

module.exports = app;
