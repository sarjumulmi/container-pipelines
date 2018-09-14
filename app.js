import express from 'express';


const app = express();
const router = express.Router();

router.get('/', (req, res) => {
  res.json({hello: 'world'})
});

app.use(router);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`App runnning on port ${port}`)
})

