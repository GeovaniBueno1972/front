<template>
    <div class="home">
        <h1>Tela inicial</h1>
        <a href="/admin">Tela de Administração</a>
        <a href="/">Sair</a>
        <h1>{{user}}</h1>
        <PageTitle main="Pedidos" sub="semana" />
        
    </div>
</template>

<script>
import PageTitle from '../template/PageTitle.vue'
import axios from 'axios'
import { baseApiUrl } from '@/global'
import {mapState} from 'vuex'

export default {
    name: 'Home',
    components: {PageTitle},
    computed: mapState(['user']),
    
    data: function () {
      return {
        user : this.user,
        stat: {}
      }
    },
    methods: {
      getStats(){
        axios.get(`${baseApiUrl}/stats`).then(res => this.stat = res.data)
    },
      
  }
    
}
</script>

<style>

</style>