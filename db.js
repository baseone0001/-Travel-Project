var mysql = require('mysql');

function db(sql,data,callback) {
     const connection = mysql.createConnection({
          //根據自己的電腦輸入資訊
          host: '127.0.0.1',// or 'localhost'
          port: '8889',
          user: 'root',
          password: 'root',
          database: 'travel',

          //是否允許使用者一口氣傳入很多sql指令
          multipleStatements: true,
     });

     connection.connect(function (err) {
          if (err) {
               console.log('資料庫有問題----------------檢查有沒有開mamp');
               console.log(err);//這邊必須看到null才等於有連上DB
          } else {
               // console.log('資料庫OK----------------------');    
               //若覺得consle很煩可以關掉
     
          }
     })

     connection.query(sql,data,function(error,results,fields){  //(錯誤,資訊本人,欄位)
          if(error) {
                console.log(error)
          };
          callback(results, fields); //呼叫函式
    })
    connection.end();

     
     
}

exports.exec = db;