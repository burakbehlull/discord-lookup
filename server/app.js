const express = require('express')

require('dotenv').config()
const app = express()

const {PORT} = process.env

app.get('/api',(req,res)=> {
    res.send('Merhaba API!')
})

app.listen(process.env.PORT, ()=> {
    console.log(`Sunucu ${PORT} portunda başlatıldı.`)
})