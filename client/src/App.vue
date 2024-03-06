<script>
import {ref} from 'vue'
import axios from 'axios'
export default {
  name: "App",
  data(){
    let uid = ref('')
    return {
      udata: null,
      user: null,
      uid: uid.value,
    }
  },
  methods: {
    async fetchUser(userid){
      console.log(userid)
      try {
        await axios.get(`http://localhost/user/${userid}`)
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
    <p class="created"> Created: {{ user.created }}</p>
    <img :src="user.avatar" class="avatar">
    <img :src="user.banner" class="banner">
    <input type="color" :value="user.u_color" disabled>
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
