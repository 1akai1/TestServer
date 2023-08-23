const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb+srv://admin:<password>@cluster0.sszhxie.mongodb.net/?retryWrites=true&w=majority";

const router = express.Router();


const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});


async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

// router.get('/', async (req, res) => {
//     res.send('hello');
//   });

  router.get('/', async (req, res) => {
  res.send(run().catch(console.dir));
});

// Get Posts
// router.get('/', async (req, res) => {
//   const posts = await loadPostsCollection();
//   res.send(await posts.find({}).toArray());
// });

// // Add Post
// router.post('/', async (req, res) => {
//   const posts = await loadPostsCollection();
//   await posts.insertOne({
//     text: req.body.text,
//     createdAt: new Date()
//   });
//   res.status(201).send();
// });

// // Delete Post
// router.delete('/:id', async (req, res) => {
//   const posts = await loadPostsCollection();
//   await posts.deleteOne({ _id: new mongodb.ObjectID(req.params.id) });
//   res.status(200).send({});
// });

// async function loadPostsCollection() {
//   const client = await mongodb.MongoClient.connect(
//     'mongodb://YOUR_OWN_MONGODB',
//     {
//       useNewUrlParser: true
//     }
//   );
//   console.log('Connected to database');
//   return client.db('vue_express').collection('posts');
// }

// function loadPostsCollection() {
//   const mongo = new Mongo('mongodb+srv://admin:admin@cluster0.sszhxie.mongodb.net/?retryWrites=true&w=majority');
//   const db = mongo.getDB('TestDB');
//   console.log('Connected to database');
//   return db.getCollection('posts');
// }
module.exports = router;