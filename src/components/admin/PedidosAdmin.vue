<template>
  <div class="pedidos-admin">
           
         
      <b-table hover small striped :items="pedidos" :fields="fields">
          <template #cell(data_entrega)="data">
              <b>{{convertData(data.item.data_entrega)}}</b>
          </template>    
          <template #cell(actions)="data"> 
              <b-button variant="warning" @click="loadPedido(data.item)" class="mr-2">
                  <i class="fa fa-pencil"></i>
              </b-button>
              <b-button variant="danger" @click="loadPedido(data.item)">
                  <i class="fa fa-trash"></i>
              </b-button>
          </template>
      </b-table>
      
  </div>
</template>

<script>
//import Modal from '@kouts/vue-modal'
import moment from 'moment'
import {baseApiUrl, showError} from '@/global'
import axios from 'axios'
import { mapState, mapGetters} from 'vuex'
moment.locale('pt-br');


export default {
    name: 'PedidosAdmin',
    //components: { Modal},
    computed: {
        ...mapGetters([
            'user', 'pedidoAtua'
        ]),
        ...mapState([
            'pedidoAtual'
        ])
    },
    data: function(){
        return {
            mode: 'save',
            clientes:[],
            pedido: {},
            pedidos: [],
            showModal: false,
            fields: [
                {key: 'numero', label: 'Pedido', sortable: true},
                {key: 'data_entrega', label: 'Data Entrega', sortable: true},
                {key: 'usuario', label: 'Vendedor'},
                {key: 'estado', label: 'Estatus', sortable: true},
                {key: 'actions', label: 'Ações'}
            ]
        }
        
    },
    methods: {
       
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

        reset(){
            this.mode = 'save'
            this.pedido = {}
            this.loadPedidos()
        },
               
        remove(){
            const id = this.pedido.numero
            axios.delete(`${baseApiUrl}/pedidos/${id}`)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                })
                .catch(showError)
        },
        loadPedido(pedido){
            this.pedido = {...pedido}
            console.log(this.pedido.data_entrega)
            this.remove()
         },
        convertData(dataInput){
                let data = new Date(dataInput);
                let dataFormatada = data.toLocaleDateString('pt-BR', {timeZone: 'UTC'});
                //console.log(dataFormatada)
                return dataFormatada
        }
         
         
     },
    mounted(){
        this.loadPedidos()
    }
}
</script>

<style>
 .fullscreen-modal {
  width: 100%;
  max-width: 90%;
  top: 0;
  margin-left: 45px;
  
  
}
</style>