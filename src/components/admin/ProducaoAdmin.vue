<template>
  <div class="producao-admin">
      <table id="tabela">
          <thead>
              <td>Pedido</td>
              <td>Início Produção</td>
              <td>Operador</td>
              <td>Conclusão</td>
              <td>Ação</td>
          </thead>
          <tbody>
               <tr v-for="pedido in pedidos_producao" v-bind:key="pedido.id">
                  <td >{{pedido.pedido_numero}}</td>
                  <td>{{convertData(pedido.data_ini_producao)}}</td>
                  <td>{{pedido.operador}}</td>
                  <td>{{pedido.data_conclusao === null ? '' : convertData(pedido.data_conclusao)}}</td>
                  <td>
                        <b-button variant="danger" @click="remove(pedido)">
                            <i class="fa fa-trash"></i>
                        </b-button>
                  </td>
              </tr>
          </tbody>
      </table>
  </div>
</template>

<script>
import {baseApiUrl, showError} from '@/global'
import axios from 'axios'


export default {
    name: 'ProducaoAdmin',
    components: {},
    data: function(){
        return {
            showModal: false,
            pedido_producao: {},
            pedidos_producao: [],
            
        }
    }, 
    methods:{
        loadPedidosProducao(){
            const url = `${baseApiUrl}/producao`
            axios.get(url).then(res => {
                this.pedidos_producao = res.data
            })
                       
        }, 
        convertData(dataInput){
                let data = new Date(dataInput);
                let dataFormatada = data.toLocaleDateString('pt-BR', {timeZone: 'UTC'});
                //console.log(dataFormatada)
                return dataFormatada
        },
        remove(produto){
            this.produto_producao = {...produto}
            const id = this.produto_producao.id
            axios.delete(`${baseApiUrl}/producao/${id}`)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.loadPedidosProducao()  
                })
                .catch(showError)
            
        },
    },
    mounted(){
        this.loadPedidosProducao()
    }

}
</script>

<style>
#tabela{
    width: 95%;
    margin: 2.5%;
}
#tabela thead{
    background: skyblue;
}
td{
    justify-content: center;
    text-align: center;
}
tr{
    border-bottom: 1px solid blue;
}
</style>