<script>
import {ref} from 'vue'
import axios from 'axios'
export default {
  name: "App",
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

  <section class="flex flex-col justify-center items-center text-center w-full h-full">
    <h1 class="text-3xl text-discordtext"> DISCORD LOOKUP </h1>

    <div class="flex flex-col mt-5" v-if="udata.success">
      <h2>username & id: <span>{{ user.username }} | {{ user.id }}</span> </h2>
      <h2> Display Name:  <span>{{ user.displayName }}</span> </h2>

      <h2> Bot Durumu: <span>{{ user.bot ? "Bot" : "Bot değil." }}</span> </h2>
      <h2> Nitro durumu: <span>{{ user.nitro_level }}</span> </h2>

      <h2> Yaratılma Tarihi: <span>{{ user.created }}</span></h2>
      <p v-if="user.decoration"> Decoration var </p>

      <img :src="user.avatar" class="avatar">
      <img v-if="user.banner" :src="user.banner" class="banner">
      <input type="color" :value="user.color" disabled>
      <input type="color" :value="user.banner_color" disabled>
    </div>
    <div v-else></div>




    <input type="text" v-model="uid">
    <button class="text-discordbg bg-discordbtn py-1 px-2 mt-2" @click="fetchUser(uid)">Lookup</button>
  </section>
</template>

<style scoped>

</style>
