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
     res.redirect('/home');
})

var homePage = require('./router/home');
app.use('/', homePage);

var backPage = require('./router/back');
app.use('/', backPage);

var SchedulehPage = require('./router/Scheduleh');
app.use('/', SchedulehPage);



// var memberPage = require('./router/member');
// app.use('/', memberPage);



app.listen(2407, function () {
     console.log('徜徉和旅啟動中' + new Date().toLocaleTimeString())
})