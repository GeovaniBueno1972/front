<template>
    <div class="home">
        <Header  title="Gerenciamento de Produção"
		:hideUserDropdown="!user"/>
        <div class="pagina">
            <PageTitle main="Pedidos" sub="semana" />
        </div>    
        
        
    </div>
</template>

<script>
import Header from '../template/Header.vue'
import PageTitle from '../template/PageTitle.vue'
import axios from 'axios'
import { baseApiUrl } from '@/global'
import {mapGetters} from 'vuex'

export default {
    name: 'Home',
    components: {Header, PageTitle},
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
.pagina{
    padding: 20px;
}
</style>