var express = require('express');
var app = express.Router();
var mysql = require('mysql');
var session = require('express-session');//
var bodyParser = require('body-parser');
const { render } = require('ejs');
// app.use(bodyParser.urlencoded()) 
var up = bodyParser.urlencoded();
var multer = require('multer');



app.use('/', express.static(__dirname + 'public'));
var myDBconn = require('../db');


//---------------------session---------------------------
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
//---------------------multer---------------------------
var d = new Date();
console.log(d);
var myStorage = multer.diskStorage({
     destination: function (req, file, cb) {
          cb(null, 'public/uploud');
     },
     filename: function (req, file, cb) {
          cb(null, + d.getDate() + '-' + file.originalname);
     }
})

var upload = multer({
     storage: myStorage,
     fileFilter: function (req, file, cb) {
          if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
               return cb(new Error('錯誤的檔案格式'))
          }
          cb(null, true)
     }
})



//---------------------分頁---------------------------


app.get('/background', function (req, res) {
     if (req.session.user) {
          res.redirect('/background/members');
     } else {
          res.redirect('/backform');
          console.log('沒有登入')
     }
     
})



app.get('/background/itineraryAdd', function (req, res) {
     res.render('back_itineraryAdd');
})

app.get('/background/newsAdd', function (req, res) {
     res.render('back_news/back_newsAdd');
})




//-------------------------------登入--------------------------------
app.get('/backform', function (req, res) {
     res.setHeader('Content-type', 'text/html ; charset=utf-8');  //中文編碼
     if (req.session.user) {
          res.write(`<p>${req.session.user.isAccount}你已經登入了</p>`);
          res.write(`<p>登入時間：${req.session.user.logined_at}</p>`);
          res.write(`<a href="/background">到後台首頁</a>`);

          res.end();
     } else {
          res.sendFile(__dirname + '/html/backlogin.html');

     }

})

app.get('/backlogin', function (req, res) {
     res.setHeader('Content-type', 'text/html ; charset=utf-8');  //中文編碼
     if (req.session.user) {//確認req.session.user有無資料
          res.write(`<p>${req.session.user.isAccount}你已經登入了</p>`);
          res.write(`<p>登入時間：${req.session.user.logined_at}</p>`);
          res.write(`<a href="/background">到後台首頁</a>`);


          res.end();
     } else {
          //超過maxAge的時間會到這裡
          res.redirect('/backform'); //重新導向到...
     }

})



app.post('/backlogin', up, function (req, res) {
     res.setHeader('Content-type', 'text/html ; charset=utf-8');  //中文編碼
     console.log(req.body);

     if (req.session.user) {
          res.write(`<p>${req.session.user.isAccount}你已經登入</p>`);
          res.write(`<p>登入時間：${req.session.user.logined_at}</p>`);
          res.write(`<a href="/background">到後台首頁</a>`);
     } else {
          if (req.body.backAcct === '' || req.body.backPwd == undefined) {
               res.write('空值')
          } else {
               var acct = 'back123';
               var pwd = 123123;
               if (req.body.backAcct == acct && req.body.backPwd == pwd) {
                    // res.write('登入成功');
                    req.session.user = {//紀錄session
                         'isAccount': req.body.backAcct,
                         'logined_at': new Date()
                    }
                    res.redirect('/background');

               } else {
                    res.write('帳號或密碼錯誤')
               }
          }


     }
     res.end();
})

app.post('/backlogout', up, function (req, res) {
     //＊＊＊＊＊＊需要清除session*******
     delete req.session.user

     res.redirect('/backform');
})


//-------------------------------消息--------------------------------

app.get('/background/news', function (req, res) {
     var sql = "SELECT * FROM `news` ORDER BY dd DESC"
     myDBconn.exec(sql, [], function (data, fields) {
          res.render('back_news/back_news', {
               data: data
          });

     })

})

app.get('/newsAdd', up, function (req, res) {
     render('back_news/back_newsAdd')
})

app.post('/newsuplowd', upload.single('newsImg'), function (req, res) {
     var file = req.file;
     // console.log(file);
})
app.post('/newsInsert', function (req, res) {
     // console.log(req.body); 
     let sql = `INSERT INTO news(title,contents,img) VALUES(?,?,?) `
     let data = [req.body.newsTitleAJAX, req.body.newsContextAJAX, req.body.newsImgUrl];
     myDBconn.exec(sql, data, function (results, fields) {
          console.log('UPDATE success');
     })
     res.send("更新成功");
     res.redirect('/background/news');

})



app.post('/newsEdit', function (req, res) {
     // console.log(req.body.id);
     var newsID = req.body.id;
     var sql = "SELECT * FROM news WHERE newsid = ?";

     myDBconn.exec(sql, newsID, function (results, fields) {
          req.session.news = {
               newsData: results
          };
          // console.log('----=-=-=-=-=-=-=-req.session.news=-=-=-=-==-=-=-=-==---');
          // console.log(req.session.news);
          //   console.log(req.session.news[0].title);

          res.redirect('/background/newsEdit');
     });
});

app.get('/background/newsEdit', up, function (req, res) {
     // 在这里，数据已经设置到req.session.news中
     // console.log('================data.newsData[0]=======================');
     // console.log(req.session.news);
     // console.log(data.newsData[0]);

     // var data = req.session.news;
     // // 渲染頁面
     // res.render('back_news/back_newsEdit', {
     //      row: data.newsData[0]
     // });
     var data = req.session.news;
     if (!req.session.news == "") {
          res.render('back_news/back_newsEdit', {
               row: data.newsData[0]
          });
     } else {
          data = req.session.news;
          res.redirect('/background/newsEdit');
     }




});

app.post('/newsUpdate', function (req, res) {
     res.setHeader('Content-type', 'text/html ; charset=utf-8');  //中文編碼
     var data = [req.body.newsTitleAJAX, req.body.newsContextAJAX, req.body.newsImgUrl, req.body.newsid];
     var sql = "UPDATE news SET title = ? ,contents = ? ,img = ? WHERE newsid = ?";
     myDBconn.exec(sql, data, function (results, fields) {
          console.log('UPDATE success')
     })
     // res.status(200).send('Success');
     res.send("更新成功");
     res.redirect('/background/news');
})

app.post('/newsDelete', function (req, res) {
     console.log(req.body.id);
     var newsID = req.body.id;
     var sql = "DELETE FROM news WHERE newsid = ?";
     myDBconn.exec(sql, newsID, function (results, fields) {
          console.log('UPDATE success')
     })
     res.send("刪除成功");
     res.redirect('/background/news');
})

//-------------------------------會員--------------------------------
app.get('/background/members', function (req, res) {
     var sql = "SELECT * FROM users"
     myDBconn.exec(sql, [], function (results, fields) {
          // console.log(results);
          res.render('back_member', {
               data: results
          });

     })
})
app.post('/background/member', function (req, res) {
     console.log(req.body);
     var memberId = req.body.memberID;
     req.session.member = memberId;
     res.redirect('/background/memberview');

})
app.get('/background/memberview', function (req, res) {
     var memberId = [req.session.member, req.session.member];
     console.log(memberId);
     var sql = "SELECT uid, username, email, name, sex, identity, address, phone FROM users WHERE uid = ? UNION SELECT uid, username, email, name, sex, identity, address, phone FROM blacklist WHERE uid = ?";
     myDBconn.exec(sql, memberId, function (results, fields) {
          // console.log(results);
          res.render('back_memberview', {
               data: results
          });
     })
})

app.post('/background/memberSelectId', function (req, res) {
     // console.log(req.body);//數字
     if (req.body.memberID) {
          var sql = "SELECT * FROM users WHERE uid = '%'+?+'%'"
          var data = req.body.memberID;
          myDBconn.exec(sql, data, function (results, fields) {
               // console.log(results);
               res.send(results);
          })

     } else {
          var sql = "SELECT * FROM blacklist WHERE uid = '%'+?+'%'"
          var data = req.body.memberBLackID;
          myDBconn.exec(sql, data, function (results, fields) {
               // console.log(results);
               res.send(results);
          })
     }

})
app.post('/background/memberSelectName', function (req, res) {
     console.log(req.body);//name
     if (req.body.memberName) {
          var sql = "SELECT * FROM users WHERE name LIKE CONCAT('%', ?, '%') "
          var data = req.body.memberName;
          myDBconn.exec(sql, data, function (results, fields) {
               // console.log(results);
               res.send(results);
          })
     } else {
          var sql = "SELECT * FROM blacklist WHERE name LIKE CONCAT('%', ?, '%') "
          var data = req.body.memberBLackName;
          myDBconn.exec(sql, data, function (results, fields) {
               // console.log(results);
               res.send(results);
          })
     }
})
// back_memberBlack
app.get('/background/memberBlack', function (req, res) {
     var sql = "SELECT * FROM blacklist"
     myDBconn.exec(sql, [], function (results, fields) {
          // console.log(results);
          res.render('back_memberBlack', {
               data: results
          });

     })
})

app.post('/background/memberBlack', function (req, res) {
     console.log(req.body);
     var data = req.body.memberID;
     var reason = req.body.reason;
     var sql = "SELECT * FROM users WHERE uid = ?";
     myDBconn.exec(sql, data, function (results, fields) {
          // console.log(results);
          // console.log(results[0].uid);

          var rows = [results[0].uid, results[0].username, results[0].password, results[0].email,
          results[0].name, results[0].sex, results[0].identity, results[0].address, results[0].phone, reason];

          var sql2 = "INSERT INTO blacklist(uid,username,password,email,name,sex,identity,address,phone,reason) VALUES(?,?,?,?,?,?,?,?,?,?) ";
          myDBconn.exec(sql2, rows, function (results, fields) {
               // console.log(results);

          })

     })
     var sql3 = "DELETE FROM users WHERE uid = ?"
     myDBconn.exec(sql3, data, function (results, fields) {
          console.log(results);
     })
     res.send();
})

app.post('/background/memberBlackout', function (req, res) {
     console.log(req.body);
     var data = req.body.memberID
     var sql = "SELECT * FROM blacklist WHERE uid = ?";
     myDBconn.exec(sql, data, function (results, fields) {
          // console.log(results);
          // console.log(results[0].uid);

          var rows = [results[0].uid, results[0].username, results[0].password, results[0].email,
          results[0].name, results[0].sex, results[0].identity, results[0].address, results[0].phone];

          var sql2 = "INSERT INTO users(uid,username,password,email,name,sex,identity,address,phone) VALUES(?,?,?,?,?,?,?,?,?) ";
          myDBconn.exec(sql2, rows, function (results, fields) {
               // console.log(results);

          })

     })
     var sql3 = "DELETE FROM blacklist WHERE uid = ?"
     myDBconn.exec(sql3, data, function (results, fields) {
          console.log(results);
     })
     res.send();
})
//-------------------------------行程--------------------------------


app.get('/background/itinerary', function (req, res) {
     var sql = "SELECT * FROM orderinfo INNER JOIN flyinfo ON orderinfo.id = flyinfo.id ORDER BY GoDate "
     myDBconn.exec(sql, [], function (results, fields) {
          res.render('back_itinerary', {
               order: results,
          });
     })
     // res.render('back_itinerary')
})

//-------------------------------訂單--------------------------------
app.get('/background/order', function (req, res) {
     var sql = "SELECT * FROM orderinfo ORDER BY id DESC "
     myDBconn.exec(sql, [], function (results, fields) {
          // console.log(results)
          res.render('back_order', {
               data: results
          });
     })
})



//-------------------------------訊息--------------------------------
app.get('/background/newsContact',function(req,res){
     var sql = "SELECT * FROM contact ORDER BY dd DESC"
     myDBconn.exec(sql,[],function(results,fields){
          console.log(results);
          res.render('back_contact',{
               data:results
          })
     })
})

app.post('/background/contactInsert', function (req, res) {
     // console.log(req.body);
     var data = [req.body.name, req.body.sex, req.body.email, req.body.phone, req.body.time, req.body.area, req.body.people, req.body.date, req.body.days, req.body.budget,req.body.subject, req.body.demand,];
     var sql = "INSERT INTO contact(name,sex,email,phone,time,area,people,date,days,budget,subject,demand) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)";
     myDBconn.exec(sql,data,function(results,fields){
          if(results){
               res.send("成功送出");
          }else{
               res.send('送出失敗，請再試一次')
          }
     })
})



module.exports = app;
