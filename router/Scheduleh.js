var express = require('express');
var app = express.Router();
var mysql = require('mysql');


app.use('/', express.static('public'));

var myDBconn = require('../db');


app.get('/Scheduleh', function (req, res) {
    // res.sendFile(__dirname + '/html/IntroduceScheduleh.html');
    var sqlorderinfo = "SELECT orderinfo.*, area.* FROM orderinfo JOIN area ON orderinfo.Area = area.Area "; //sql指令：全部資料(倒序)
    var sqlflyinfo = "SELECT * FROM `flyinfo` ";
    var sqllive = "SELECT * FROM `live` ";
    var sqlview = "SELECT * FROM `view` ";
    var sqlarea = "SELECT * FROM `area` ";

    myDBconn.exec(sqlorderinfo, [], function (orderinfo, fields) {
        myDBconn.exec(sqlflyinfo, [], function (flyinfo, fields) {
            myDBconn.exec(sqllive, [], function (live, fields) {
                myDBconn.exec(sqlview, [], function (view, fields) {
                    myDBconn.exec(sqlarea, [], function (area, fields) {
                        // res.redirect('/page/1'); ==============================>可以直接轉到第一頁
                        //   console.log(data);
                        //   console.log(data[0].GoAir);
                        res.render('Scheduleh', { //渲染檔案Scheduleh.ejs  ->一定要在views資料夾底下 
                            orderinfo: orderinfo,
                            flyinfo: flyinfo,
                            live: live,
                            view: view,
                            area: area,
                            // rows是資料庫回傳
                        })

                    })
                })
            })
        })
    })
});

app.get('/IntroduceScheduleh/:id', function (req, res) {

    const id = req.params.id; // 從 URL 取得 id 參數
    // res.sendFile(__dirname + '/html/IntroduceScheduleh.html');
    var sqlorderinfo = "SELECT * FROM `orderinfo` "; //sql指令：全部資料(倒序)
    var sqlflyinfo = "SELECT * FROM `flyinfo` ";
    var sqllive = "SELECT * FROM `live` WHERE live.Orderinfo =" + (parseInt(id) + 1);
    var sqlview = "SELECT orderinfo.*, view.* FROM view JOIN orderinfo ON orderinfo.Area = view.Area WHERE orderinfo.id = " + (parseInt(id) + 1);
    var sqlarea = "SELECT orderinfo.id, area.Area FROM area JOIN orderinfo ON area.Area = orderinfo.Area; ";
    var sqlday1 = "SELECT * FROM `view` WHERE view.orderinfo =" + (parseInt(id) + 1) + "&& view.day = 1 ";
    var sqlday2 = "SELECT * FROM `view` WHERE view.orderinfo =" + (parseInt(id) + 1) + "&& view.day = 2 ";
    var sqlday3 = "SELECT * FROM `view` WHERE view.orderinfo =" + (parseInt(id) + 1) + "&& view.day = 3 ";
    var sqlday4 = "SELECT * FROM `view` WHERE view.orderinfo =" + (parseInt(id) + 1) + "&& view.day = 4 ";
    var sqlday5 = "SELECT * FROM `view` WHERE view.orderinfo =" + (parseInt(id) + 1) + "&& view.day = 5 ";

    myDBconn.exec(sqlorderinfo, [], function (orderinfo, fields) {
        myDBconn.exec(sqlflyinfo, [], function (flyinfo, fields) {
            myDBconn.exec(sqllive, [], function (live, fields) {
                myDBconn.exec(sqlview, [], function (view, fields) {
                    myDBconn.exec(sqlarea, [], function (area, fields) {
                        myDBconn.exec(sqlday1, [], function (day1, fields) {
                            myDBconn.exec(sqlday2, [], function (day2, fields) {
                                myDBconn.exec(sqlday3, [], function (day3, fields) {
                                    myDBconn.exec(sqlday4, [], function (day4, fields) {
                                        myDBconn.exec(sqlday5, [], function (day5, fields) {
                                            // res.redirect('/page/1'); ==============================>可以直接轉到第一頁
                                            //   console.log(data);
                                            //   console.log(data[0].GoAir);
                                            res.render('IntroduceScheduleh', { //渲染檔案IntroduceScheduleh.ejs  ->一定要在views資料夾底下 
                                                orderinfo: orderinfo[id],
                                                flyinfo: flyinfo[id],
                                                live: live,
                                                view: view,
                                                area: area[id],
                                                day1: day1,
                                                day2: day2,
                                                day3: day3,
                                                day4: day4,
                                                day5: day5,
                                                // rows是資料庫回傳
                                            })

                                        })
                                    })
                                })
                            })
                        })
                    })
                })
            })
        })
    })
});





module.exports = app;
