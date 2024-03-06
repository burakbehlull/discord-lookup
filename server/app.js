const express = require('express')
const axios = require('axios')
const cors = require('cors')
const {Client, GatewayIntentBits} = require('discord.js')
require('dotenv').config()

const {PORT, BOT_TOKEN} = process.env
// alternatif config
const {TOKEN} = require('./config.json')

let SET_TOKEN = BOT_TOKEN || TOKEN

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

function ConvertColor(intColor) {
    const r = (intColor >> 16) & 255
    const g = (intColor >> 8) & 255
    const b = intColor & 255
    const hexColor = ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
    return hexColor.toUpperCase()
}

function NitroControl(type){
    switch(type){
        case 0:
            return "No Nitro"
        case 1:
            return "Classic Nitro"
        case 2:
            return "Boostlu Nitro"
        default: 
            return;
    }
}

async function getUser(userId){
    try {
        const user = await client.users.fetch(userId)
        return user
    } catch (err) {
        return err
    }
}

async function getInfo(userId){
    try {
        const response = await axios.get(`https://discord.com/api/v9/users/${userId}`, {
            headers: {
                Authorization: `Bot ${SET_TOKEN}`
            }
        })        
        const data = response.data;
        
    
        return data || null
    } catch (err) {
        return {
            message: err
        }
    }
}



// pages
app.get('/user/:userId', async (req,res)=> {
    const {userId} = req.params
    try {
        const user = await getUser(userId)
        const info = await getInfo(userId) 
        return res.status(200).json({
            success: true,
            message: "Kullanıcı bulundu.",
            user: {
                id: user.id,
                displayName: info.global_name,
                username: user.username,
                created: user.createdAt,

                avatar: user.displayAvatarURL({ format: 'png', size: 4096, dynamic: true }),
                banner: `https://cdn.discordapp.com/banners/${userId}/${info.banner}.jpg?size=4096`,
                
                nitro_level: NitroControl(info.premium_type),

                color: "#"+ConvertColor(info.accent_color), 
                banner_color: info.banner_color,

                discriminator: user.discriminator,
            }
        })
    } catch (err) {
        return res.status(404).json({
            success: false,
            message: "Kullanıcı bulunamadı.",
            user: null,
            error: err
        })
    }
})


client.login(SET_TOKEN)
.then(()=>console.log('Token başarılı'))
.catch((err)=> console.log('Hata', err))
app.listen(PORT || 3000, ()=> {
    console.log(`Sunucu ${PORT || 80} portunda başlatıldı.`)
})