const express = require('express')
const Mongoclient = require('mongodb').MongoClient
const cors = require('cors')
const multer = require('multer')

const app = express()

app.use(cors())

const CONNECTION_STRING='mongodb+srv://admin:admin@cluster0.sszhxie.mongodb.net/?retryWrites=true&w=majority'

const DATABASENAME = 'todoappdb'
let database

app.listen(5038,()=>{
    Mongoclient.connect(CONNECTION_STRING,(error, client)=>{
        database=client.db(DATABASENAME)
        console.log('Mongo DB Conneced')
    })
})