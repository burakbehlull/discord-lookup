const express = require('express')
const axios = require('axios')
const {Client, GatewayIntentBits} = require('discord.js')
require('dotenv').config()
const {PORT, BOT_TOKEN} = process.env

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildMembers,
		GatewayIntentBits.MessageContent,
    ]
})

const app = express()

// pages
app.get('/user/:userId', async (req,res)=> {
    const {userId} = req.params
    const user = await getUser(userId)
    const info = await getInfo(userId, BOT_TOKEN) 

    try {
        res.status(200).json({
            success: true,
            message: "Kullanıcı bulundu.",
            user: {
                id: user.id,
                username: user.username,
                discriminator: user.discriminator,
                avatar: user.displayAvatarURL({ format: 'png', size: 4096, dynamic: true }),
                banner: `https://cdn.discordapp.com/banners/${userId}/${info.banner}.jpg?size=4096`,
                u_color: info.color, 
                created: user.createdAt,
            }
        })
    } catch (err) {
        res.status(204).json({
            success: false,
            message: "Kullanıcı bulunamadı.",
            user: null
        })
    }
})


client.login(BOT_TOKEN)
app.listen(process.env.PORT, ()=> {
    console.log(`Sunucu ${PORT} portunda başlatıldı.`)
})