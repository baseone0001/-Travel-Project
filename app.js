const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('express-flash');
const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 86400000, //設定為一天
    },
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(express.static('router'));

app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(express.json());
app.use(cors({ origin: '*' }));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: '',
    database: 'test',
    port: 3306,
    multipleStatements: true,
});

db.connect((err) => {
    if (err) {
        console.error('Database connection error: ' + err.message);
    } else {
        console.log('Connected to the database');
    }
});

// 登入-----------------------------------------
passport.use(new LocalStrategy(
    (username, password, done) => {
        const SQL = 'SELECT * FROM users WHERE username = ?';
        db.query(SQL, [username], async (err, results) => {
            if (err) {
                return done(err);
            } else {
                if (!results || results.length === 0) {
                    return done(null, false, { message: '无此用户' });
                } else {
                    const user = results[0];
                    const isPasswordValid = await bcrypt.compare(password, user.password);
                    if (isPasswordValid) {
                        return done(null, user);
                    } else {
                        return done(null, false, { message: '密码错误' });
                    }
                }
            }
        });
    }
));

passport.serializeUser((user, done) => {
    done(null, user.uid);
});

passport.deserializeUser((uid, done) => {
    const SQL = 'SELECT * FROM users WHERE uid = ?';
    db.query(SQL, [uid], (err, results) => {
        if (err) {
            return done(err);
        }
        if (!results || results.length === 0) {
            return done(null, false);
        }
        const user = results[0];
        done(null, user);
    });
});

app.get('/login', (req, res) => {
    const data = {};
    res.render('login', data);
});

app.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ success: false, message: err.message });
        }
        if (!user) {
            return res.status(401).json({ success: false, message: info.message });
        }
        req.logIn(user, (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ success: false, message: err.message });
            }
            res.json({ success: true, message: '登入成功' });
        });
        req.session.user = user;
    })
        (req, res, next);
});
// ----------------------------------------------


// 登出------------------------------------------
app.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err);
        } else {
            res.redirect('/login');
        }
    })
})


// 註冊------------------------------------------
app.get('/register', (req, res) => {
    const data = {};
    res.render('register', data);
});

app.post('/register', async (req, res) => {
    const sentEmail = req.body.email;
    const sentUserName = req.body.username;
    const sentPassword = req.body.password;
    const sentName = req.body.name;
    const sentIdentity = req.body.identity;
    const sentPhone = req.body.phone;
    const sentAddress = req.body.address;
    const sentSex = req.body.sex;
    try {
        const hashedpassword = await bcrypt.hash(sentPassword, 10);
        const SQL = 'INSERT INTO users(email, username, password, name, identity, phone, address, sex) VALUES(?,?,?,?,?,?,?,?)';
        const values = [sentEmail, sentUserName, hashedpassword, sentName, sentIdentity, sentPhone, sentAddress, sentSex];
        db.query(SQL, values, (err, results) => {
            if (err) {
                console.error(err);
                res.status(500).json({ success: false, message: '註冊失敗' });
            } else {
                console.log('註冊成功！');
                res.json({ success: true, message: '註冊成功' });
            }
        });
    } catch (error) {
        console.error('密碼錯誤', error);
        res.status(500).json({ success: false, message: '註冊失敗' });
    }
});


// 修改個資-------------------------------------------
app.get('/accountinfo', isAuthenticated, (req, res) => {
    const data = req.user;

    res.render('accountinfo', data);
});

app.post('/accountinfo', isAuthenticated, async (req, res) => {
    const userId = req.user.uid;
    const { name, identity, phone, email, address, sex } = req.body;

    try {
        const SQL = 'UPDATE users SET name = ?, identity = ?, phone = ?, email = ?, sex = ?, address = ? WHERE uid = ?';
        const values = [name, identity, phone, email, sex, address, userId];

        db.query(SQL, values, (error, results) => {
            if (error) {
                console.error('更新失败', error);
                res.status(500).json({ success: false, message: '更新失败' });
            } else {
                console.log('更新成功', results.affectedRows);
                res.json({ success: true, message: '更新成功' });
            }
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: '更新失败' });
    }
});


// 傳送到訂單----------------------------------------------
app.get('/', (req, res) => {
    const query = 'SELECT FormId,Area,Title,GoTo FROM orderinfo';
    db.query(query, (err, results) => {
        if (err) {
            console.error('發生錯誤', err);
            throw err;
        }

        res.render('bought', { orders: results });
    })
})
app.post('/add-to-order', isAuthenticated, (req, res) => {
    const userId = req.user.uid;
    const formId = req.body.formId;
    const insertQuery = 'INSERT INTO `order`(orderinfo_id,user_id)VALUES(?,?)';
    db.query(insertQuery, [formId, userId], (err, results) => {
        if (err) {
            console.error('發生錯誤', err);
        } else {
            const orderId = results.insertId;
            console.log("成功插入訂單" + orderId);
            res.redirect('/');
        }
    })
})
// -----------------------------------------------------------


// 訂單資訊--------------------------------------
app.get('/shoppingCart', isAuthenticated, (req, res) => {
    const userId = req.user.uid;
    const page = parseInt(req.query.page) || 1;
    const itemsPerPage = 5;
    const startIndex = (page - 1) * itemsPerPage;
    const SQL =
        `SELECT Area,Title,GoTo,Price,order_id From orderinfo
        INNER JOIN \`order\`
        ON FormId = orderinfo_id
        WHERE user_id = ?
        LIMIT ?,?
    `;
    db.query(SQL, [userId, startIndex, itemsPerPage], (err, results) => {
        if (err) {
            console.error('錯誤', err);
        } else {
            const totalCountSQL = `
            SELECT COUNT(*)AS totalCount FROM orderinfo
            INNER JOIN \`order\`
            ON FormId = orderinfo_id
            WHERE user_id =?
            `;

            db.query(totalCountSQL, [userId], (err, countResult) => {
                if (err) {
                    console.error('錯誤', err);
                } else {
                    
                    const totalOrders = countResult[0].totalCount;
                    const totalPages = Math.ceil(totalOrders / itemsPerPage);
                    const orders = results.length > 0 ? results : null;
                    res.render('shoppingCart', {
                        orders: results,
                        currentPage: page,
                        totalPages: totalPages,
                        nextPageDisabled: page === totalPages,
                        message: null,
                    });
                }
            })
        }
    })
})

app.post('/deleteCart', isAuthenticated, (req, res) => {
    const userId = req.user.uid;
    const orderId = req.body.order_id;
    const SQL = `Delete FROM \`order\` WHERE order_id=? AND user_id =?`;
    db.query(SQL, [orderId, userId], (err, results) => {
        if (err) {
            console.error('刪除失敗', err);
        } else {
            console.log("刪除成功");
            res.redirect('/shoppingCart');
        }
    })
})
// -----------------------------------------------


// 參團紀錄---------------------------------------------
app.get('/logging', (req, res) => {
    const data = {};
    res.render('logging', data);
})


// ------------------------------------------------------------------
function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

app.listen(2407, () => {
    console.log('Server is running on port 2407');
});

