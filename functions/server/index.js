const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const serverless = require('serverless-http');

const app = express();

app.use(bodyParser.json());
app.use(cors());

const posts = require('./routes/api/posts.js');

app.use('/api/posts', posts);

module.exports.handler = serverless(app);