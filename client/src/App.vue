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

  <h1> DISCORD LOOKUP </h1>

  <div class="profile" v-if="udata.success">
    <h3 class="head">{{ user.username }} | {{ user.id }} </h3>
    <h2 class="display"> {{ user.displayName }} </h2>

    <h2 v-if="user.bot" class="bot"> Bot </h2>
    <h2 v-else class="bot"> Bot Değil </h2>

    <p class="created"> Created: {{ user.created }}</p>
    <p class="nitro"> {{ user.nitro_level }} </p>
    <p class="decoration" v-if="user.decoration"> Decoration var </p>

    <img :src="user.avatar" class="avatar">
    <img v-if="user.banner" :src="user.banner" class="banner">
    <input type="color" :value="user.color" disabled>
    <input type="color" :value="user.banner_color" disabled>
  </div>
  <div v-else></div>

  


  <input type="text" v-model="uid">
  <button @click="fetchUser(uid)">Lookup</button>
</template>

<style scoped>
.profile {
  display: flex;
  flex-direction: column;
}
.banner, .avatar {
  width: 50vw;
  object-fit: cover;
  /* height: 40vh; */
}
</style>
