const express = require('express');
const bodyparser = require('body-parser');
const morgan = require('morgan');
const mysql = require('mysql');

const app = express();
const router = express.Router();
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('combined'));
}
app.use(bodyparser.json());
app.use(bodyparser.json({type: 'application/json'}));
app.use(bodyparser.urlencoded({extended:true}))


router.get('/', (req, res) => {
  const conn = mysql.createConnection({
    host: '129.157.248.192',
    user: 'sarju',
    password : 'Oracle123!',
    database : 'persist'
  });
  conn.connect(function(err) {
    if (err) {
      console.log(`Error connecting to db: ${err}`);
      return;
    }
    conn.query('SELECT * FROM jsoncache', function(err, results, fields){
      if (err) {
        throw err;
      }
      conn.end(function(err) {
        if (err) {
          console.log(`Error closing to db: ${err}`);
          return;
        }
        let json = {};
        results.forEach(item => {
          json[item.k] = item.v
        });
        res.send(json);
      });
    });
  }); 
});

router.post('/add', (req, res) => {
  const conn = mysql.createConnection({
    host: '129.157.248.192',
    user: 'sarju',
    password : 'Oracle123!',
    database : 'persist'
  });
  conn.connect(function(err) {
    if (err) {
      console.log(`Error connecting to db: ${err}`);
      return;
    }
    let data = {k: Object.keys(req.body)[0], v: Object.values(req.body)[0]};
    let json = {};
    conn.query('INSERT INTO jsoncache SET ?', data, function(err){
      if (err) {
        throw err;
      }
      conn.query('SELECT * FROM jsoncache', function(error, results) {
        if (error) {
          throw error;
        }
        results.forEach(item => {
          json[item.k] = item.v
        });
      });
      conn.end(function(err) {
        if (err) {
          console.log(`Error closing to db: ${err}`);
          return;
        }
        console.log(json);
        res.send(json);
      });
    });
  }); 
});

app.use(router);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`App runnning on port ${port}`)
})

module.exports = app;


