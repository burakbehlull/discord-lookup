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

</template>

<style scoped>

</style>
