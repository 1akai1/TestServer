const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const serverless = require('serverless-http');
const { MongoClient, ServerApiVersion} = require('mongodb');
const path = require('path');

const app = express();
const router = express.Router();

const uri = "mongodb+srv://admin:admin@cluster0.sszhxie.mongodb.net/?retryWrites=true&w=majority";

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.json())

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run(callback) {

  try {
    const database = client.db('TestDB')
    const posts = database.collection('posts')

    const result = await callback(posts)
    return result
  } finally {
        await client.close();
  }
}

router.get('/get', async (req, res) => {
  try {
    const result = await run(async (posts) => {
      const result = await posts.find({}).limit(10).toArray()
      return {
        statusCode: 200,
        body: JSON.stringify(result),
    }
    })
    res.send(result);
  } catch (error) {
    res.status(500).send('error');
  }
});

router.post('/add',async (req, res) => {
  try {
    const result = await run(async (posts) => {
       const result = await posts.insertOne(req.body)
       return result
    })
    res.send(result)
  } catch (error) {
    res.status(500).send('error');
  }
});

router.get('/index', (req, res)=>{
  res.sendFile(path.join(__dirname, '../dist','index.html'))
})
    // await posts.insertOne({ a: 1 })
    // await posts.insertMany([{ a: 1 }, { a: 2 }, { a: 3 }])
    


// //Get all students
// router.get('/', (req, res) => {
//   res.send('App is running..');
// });

// //Create new record
// router.post('/add', (req, res) => {
//   res.send('New record added.');
// });

// //delete existing record
// router.delete('/', (req, res) => {
//   res.send('Deleted existing record');
// });

// //updating existing record
// router.put('/', (req, res) => {
//   res.send('Updating existing record');
// });


app.use('/api', router)

module.exports.handler = serverless(app);