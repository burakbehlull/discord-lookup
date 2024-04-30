<script>
import {ref} from 'vue'
import axios from 'axios'
import Feature from './src/Feature.vue'
export default {
  name: "App",
  components: {
    Feature
  },
  data(){
    let uid = ref('')
    return {
      udata: {
        success: null
      },
      user: undefined,
      uid: uid.value,
    }
  },
  methods: {
    async fetchUser(userid){
      console.log(userid)
      try {
        await axios.get(`http://localhost:3000/user/${userid}`)
        .then((res)=> {
          this.udata = res.data
          this.user = res.data['user']
          console.log(res.data)
        })
        .catch((err)=> console.log(err))
      } catch (err) {
        return err
      }
    }
  }
}
</script>

<template>

  <Feature />
  <section class="flex flex-col justify-center items-center text-center w-[90vw] h-[60vh]"> <!-- electron: w-[90vw] h-[80vh] and client: w-full h-full -->
    
    
    <h1 class="text-4xl text-discordtext"> DISCORD LOOKUP V1 </h1>
    
    <div class="flex flex-col gap-4 mt-8">
      <input type="text" v-model="uid" class="border border-2 border-discordtext rounded-sm p-2 outline-none text-center bg-discordbg text-discordtext">
      <button class="border border-discordbtn text-discordbg bg-discordbtn py-1 px-2 hover:bg-discordbg hover:border-discordtext hover:text-discordbtn" @click="fetchUser(uid)">Lookup</button>
    </div>
    
    <div class="flex flex-col mt-5 justify-start items-center gap-4" v-if="udata.success">
      <h2>username & id: <span>{{ user.username }} | {{ user.id }}</span> </h2>
      <h2> Display Name:  <span>{{ user.displayName }}</span> </h2>

      <h2> Bot Durumu: <span>{{ user.bot ? "Bot" : "Bot değil." }}</span> </h2>
      <h2> Nitro durumu: <span>{{ user.nitro_level }}</span> </h2>

      <h2> Yaratılma Tarihi: <span>{{ user.created }}</span></h2>
      <p v-if="user.decoration"> Decoration var </p>

      <div class="flex gap-4">
        <input type="color" :value="user.color">
        <input type="color" :value="user.banner_color">
      </div>

      <a :href="user.avatar" target="_blank">
        <img :src="user.avatar">
      </a>
      <a :href="user.banner" target="_blank">
        <img v-if="user.banner" :src="user.banner">
      </a>
    </div>
    <div v-else>
      <h2>Bir user id giriniz.</h2>
    </div>
  </section>
</template>

<style scoped>

</style>
