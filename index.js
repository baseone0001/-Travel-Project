var express = require('express'); //
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded()) 

var session = require('express-session');//
var mysql = require('mysql'); //
app.use('/', express.static('public'));
app.set('view engine', 'ejs');//

const cors = require('cors');
app.use(express.json());
app.use(cors());

var myDBconn = require('./db');


// //---------------------資料庫-----------------------------

// var myDBconn = mysql.createConnection({  //啟動套件並連結資料庫
//      host: '127.0.0.1',// or 'localhost'
//      port: '8889',
//      user: 'root',
//      password: 'root',
//      database: 'travel'
// })


// myDBconn.connect(function (err) {
//      if (err) {
//           console.log('資料庫有問題----------------檢查有沒有開mamp');
//           console.log(err);//這邊必須看到null才等於有連上DB
//      } else {
//           console.log('資料庫OK----------------------');

//      }
// })
// //---------------------資料庫-----------------------------

//---------------------session---------------------------
app.use(session({
     secret: 'iamagooddeveloperofjavascript,iwoilllearnaboutallofthisapplication',
     resave: false,
     saveUninitialized: false,

     cookie: {
          path: '/',
          httpOnly: true,
          secure: false,
          maxAge: 2 * 60 * 1000 // 2分鐘
     }
}))
//---------------------session---------------------------




app.get('/', function (req, res) {
     res.send('這是首頁')
})

var homePage = require('./router/home');
app.use('/', homePage);

var backPage = require('./router/back');
app.use('/', backPage);

// var memberPage = require('./router/member');
// app.use('/', memberPage);












app.listen(2407, function () {
     console.log('徜徉和旅啟動中' + new Date().toLocaleTimeString())
})