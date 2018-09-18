const express = require('express');
const bodyparser = require('body-parser');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');

const app = express();
const router = express.Router();
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('combined'));
}
app.use(bodyparser.json());
app.use(bodyparser.json({type: 'application/json'}));
app.use(bodyparser.urlencoded({extended:true}))

let dataPath = path.join(__dirname, 'data.json')
let rawdata = fs.readFileSync(dataPath, 'utf8');
let cache = JSON.parse(rawdata);

router.get('/', (req, res) => {
  res.status(200).json(cache);
});

// router.post('/add', (req, res) => {
//   for (const key in req.body) {
//     if (req.body.hasOwnProperty(key)) {
//       cache[key] = req.body[key]; 
//     }
//   }
//   fs.writeFileSync(dataPath, JSON.stringify(cache));
//   res.status(200).json(cache);
// })

app.use(router);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`App runnning on port ${port}`)
})

module.exports = app;


