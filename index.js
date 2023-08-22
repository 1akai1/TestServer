const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

app.use(bodyParser.json())
app.use(cors())

// const posts = require('./routes/api/posts')

// app.use('/api/posts', posts)

// const port = process.env.PORT || 5000

// app.listen(port, () => console.log(`Server stared on port ${port}`))

app.post('/api/data', (req, res)=>{
    const newData = req.body

    res.json({message: 'Данные успешно добавлены'})
})

const port = 3000

app.listen(port,()=>{
    console.log(`Сервер запущен на порту ${port}`)})
