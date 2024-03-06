const express = require('express')

require('dotenv').config()
const {PORT} = process.env

const app = express()

app.post('/user', (req,res)=> {
    const {userId} = req.body
    
    try {
        res.status(200).json({
            success: true,
            message: "Kullanıcı bulundu.",
            user: ''
        })
    } catch (err) {
        res.status(204).json({
            success: false,
            message: "Kullanıcı bulunamadı.",
            user: null
        })
    }
})

app.listen(process.env.PORT, ()=> {
    console.log(`Sunucu ${PORT} portunda başlatıldı.`)
})