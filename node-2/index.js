const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const  bodyParser  =  require('body-parser');
const app = express();
const router = express.Router();
const option = {
    host: 'localhost',
    user: 'root',
    passward: '',
    port: '3306',
    database: 'test',
    connectTimeout: 5000,
    multipleStatements: false
}
app.listen(8012, () => console.log('服务开启'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({  extended:  false  }));

const conn = mysql.createConnection(option);
app.all('/login',   (req,  res)  =>  {   
    conn.query('SELECT * FROM users', (e, r) => res.json(new Result({ data: r })));
})
app.all('/register',   (req,  res)  =>  {
    var name = req.query["name"];
    var pwd = req.query["pwd"];
    var sex = req.query["sex"];
    var email = req.query["email"];
    var queryStr = 'INSERT INTO users VALUES("' + name + '","' + pwd + '","' + sex + '","' + email + '")';
    conn.query(queryStr, (e, r) => res.json(new Result({ data: r })));

})

function Result({ code = 1, msg = '', data = {} }) {
    this.code = code;
    this.msg = msg;
    this.data = data;
}