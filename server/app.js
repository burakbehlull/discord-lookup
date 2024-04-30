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

function NitroControl(type){
    switch(type){
        case 0:
            return "No Nitro"
        case 1:
            return "Classic Nitro"
        case 2:
            return "Boostlu Nitro"
        default: 
            break;
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
        const data = response.data    
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
        const userBanner = info.banner ? `https://cdn.discordapp.com/banners/${userId}/${info.banner}.jpg?size=4096` : null

        return res.status(200).json({
            success: true,
            message: "Kullanıcı bulundu.",
            user: {
                id: user.id,
                bot: user.bot,
                
                displayName: info.global_name,
                username: user.username,
                created: user.createdAt,

                avatar: user.displayAvatarURL({ format: 'png', size: 4096, dynamic: true }),
                banner: userBanner,
                
                nitro_level: NitroControl(info.premium_type),

                color: user.accentColor, 
                banner_color: info.banner_color,
                decoration: user.avatarDecoration,
                
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