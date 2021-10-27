<template>
    <div class="home">
        <Header  title="Gerenciamento de Produção"
		:hideUserDropdown="!user"/>
        <div class="pagina">
            <PageTitle main="Pedidos" sub="semana" />
            <h1>Ola</h1>

        </div>    
         <table class="tabela">
                <thead class="cabecalho">
                    <tr>
                        <td>Aguardando</td>
                        <td>Em Produção</td>
                        <td>Impedimento</td>
                        <td>Concluído</td>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="pedido in pedidos" v-bind:key="pedido.numero">
                        <td >{{pedido.estado === 'Aguardando' ? pedido.numero : null}}</td>
                       <td >{{pedido.estado === 'Producao' ? pedido.numero : null}}</td>
                       <td >{{pedido.estado === 'Impedimento' ? pedido.numero : null}}</td>
                       <td >{{pedido.estado === 'Concluido' ? pedido.numero : null}}</td>
                        
                                               
                    </tr>
                </tbody>
                
            </table>
        
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
    data: function(){
        return {
            pedido: {},
            pedidos: [],
            //showModal: false,
        }
    },
    
    methods: {
       console(){
           console.log(this.user)
       },
      getStats(){
        axios.get(`${baseApiUrl}/stats`).then(res => this.stat = res.data)
    },

    loadPedidos(){
            const url = `${baseApiUrl}/pedidos`
            axios.get(url).then(res => {
                this.pedidos = res.data
            })
            for (let index = 0; index < this.pedidos.length; index++) {
                const element = this.pedidos[index].data_entrega;
                console.log(element)
                this.pedidos[index].data_entrega=this.convertData(element)
                console.log(index)
            }
            
        }, 
        convertData(dataInput){
                let data = new Date(dataInput);
                let dataFormatada = data.toLocaleDateString('pt-BR', {timeZone: 'UTC'});
                //console.log(dataFormatada)
                return dataFormatada
        },
      
  },
  mounted(){
        this.loadPedidos()
    }
}
    

</script>

<style>
.pagina{
    padding: 20px;
}
.tabela{
    width: 80%;
    margin: 0 10%;
}
.tabela table{
    border: 1px solid black;
}
.cabecalho td{
    background: cornflowerblue;
    text-align: center;
    border: 1px solid blue;
    color: darkblue;
    font-weight: bold;
}
.tabela tbody td{
    text-align: center;
    border: 1px solid red;
}
</style>