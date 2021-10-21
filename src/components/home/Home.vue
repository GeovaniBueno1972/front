<template>
    <div class="home">
             
        <PageTitle main="Pedidos" sub="semana" />
        
    </div>
</template>

<script>
import PageTitle from '../template/PageTitle.vue'
import axios from 'axios'
import { baseApiUrl } from '@/global'
import {mapGetters} from 'vuex'

export default {
    name: 'Home',
    components: {PageTitle},
    computed: mapGetters(['user']),
    
    
    methods: {
       console(){
           console.log(this.user)
       },
      getStats(){
        axios.get(`${baseApiUrl}/stats`).then(res => this.stat = res.data)
    },
      
  }
    
}
</script>

<style>

</style>