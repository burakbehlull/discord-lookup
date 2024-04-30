<script>
export default {
    name: 'Feature',
    methods: {
        close(){
            window.ipcRenderer.send('close')
        }
    }
}
</script>

<template>
    <ul class="flex pl-2 w-full g-2">
        <li class="border w-full text-discordbtn move rounded"></li>
        <li class="ml-2 px-2 border border-[#bd3f3f] text-[#bd3f3f] rounded hover:bg-[#bd3f3f] hover:text-[white] hover:cursor-pointer" @click="close()">X</li>
    </ul>
</template>

