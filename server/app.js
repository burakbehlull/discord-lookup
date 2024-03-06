const express = require('express')
const axios = require('axios')
const cors = require('cors')
const {Client, GatewayIntentBits} = require('discord.js')
require('dotenv').config()

const {PORT, BOT_TOKEN} = process.env
// alternatif config
const {TOKEN} = require('./config.json')

const SET_TOKEN = BOT_TOKEN || TOKEN

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

app.use(cors())

// functions
async function getUser(userId){
    try {
        const user = await client.users.fetch(userId)
        return user
    } catch (err) {
        return err
    }
}

async function getInfo(userId,token){
    try {
        const response = await axios.get(`https://discord.com/api/v9/users/${userId}`, {
            headers: {
                Authorization: `Bot ${token}`
            }
        })
        
        const data = response.data;

        function ConvertColor(intColor) {
            const r = (intColor >> 16) & 255
            const g = (intColor >> 8) & 255
            const b = intColor & 255
            const hexColor = ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
            return hexColor.toUpperCase()
        }
    
        if (data) {
            return {
                color: ConvertColor(data.accent_color),
                banner: data.banner
            }
        } else {
            return null
        }

    } catch (error) {
        return null
    }
}

// pages
app.get('/user/:userId', async (req,res)=> {
    const {userId} = req.params
    const user = await getUser(userId)
    const info = await getInfo(userId, SET_TOKEN) 

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
                u_color: "#"+info.color, 
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


client.login(SET_TOKEN)
app.listen(process.env.PORT || 80, ()=> {
    console.log(`Sunucu ${PORT} portunda başlatıldı.`)
})