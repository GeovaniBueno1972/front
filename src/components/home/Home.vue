<template>
    <div class="home">
        <Header  title="Gerenciamento de Produção"
		:hideUserDropdown="!user"/>
        <div class="pagina">
            <PageTitle main="Pedidos" sub="semana" />
           
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
                       <td >
                           <div v-if="pedido.estado === 'Aguardando'" class="aguardando" @click="loadPedido(pedido)">
                               {{pedido.numero}}</div>
                           <div v-else>{{null}}</div>
                       </td>
                       <td >
                           <div v-if="pedido.estado === 'Producao'" class="producao" @click="loadPedido(pedido)">
                               {{pedido.numero}}</div>
                           <div v-else>{{null}}</div>
                       </td>
                       <td >
                           <div v-if="pedido.estado === 'Impedimento'" class="impedimento" @click="loadPedido(pedido)">
                               {{pedido.numero}}</div>
                           <div v-else>{{null}}</div>
                       </td>
                        <td >
                           <div v-if="pedido.estado === 'Concluido'" class="concluido" @click="loadPedido(pedido)">
                               {{pedido.numero}}</div>
                           <div v-else>{{null}}</div>
                        </td>
                        
                                               
                    </tr>
                </tbody>
                
            </table>
            <Modal v-model="showModal" title="Informações do Pedido" 
            @before-open="loadPedProducao(pedido.numero)"
            @after-close="loadPedidos()">
                <div>
                    <div>
                        <div v-if="pedido.estado === 'Aguardando'" class="aguardando">
                            {{pedido.estado}}
                        </div>
                        <div v-else-if="pedido.estado === 'Producao'" class="producao">
                            {{pedido.estado}}
                        </div>
                        <div v-else-if="pedido.estado === 'Impedimento'" class="impedimento">
                            {{pedido.estado}}
                        </div>
                        <div v-else-if="pedido.estado === 'Concluido'" class="concluido">
                            {{pedido.estado}}
                        </div>
                        <br>
                    </div>
                    <div>Pedido: {{pedido.numero}}</div>
                    <div>Cliente: {{pedido.cliente}}</div>
                    <div>Vendedor: {{pedido.usuario}}</div>
                    <div>Data de lançamento: {{convertData(pedido.data_lancamento)}}</div>
                    <div>Data de entrega: <b>{{convertData(pedido.data_entrega)}}</b></div>
                    <hr>
                    <div v-if="pedido.estado === 'Aguardando'">
                            <b-button id="paraProducao" variant="primary" 
                                @click="pedidoProducao(pedido)">Colocar em produção</b-button>
                        <div class="prod" v-if="paraProducao">
                            <Producao />
                        </div>
                    </div>
                    
                    
                    <div v-if="pedido.estado === 'Producao'">
                        <div>Inicio produção: {{convertData(pedProducao.data_ini_producao)}}</div>
                        <div>Operador: {{pedProducao.operador}}</div>
                    </div>
                    <div v-if="pedido.estado === 'Producao'">
                        <b-button id="paraConcluir" variant="primary" 
                            @click="paraConcluido(pedido)">Concluir Pedido</b-button>
                    </div>
                    <div v-if="pedido.estado === 'Concluido'">
                        <div>Inicio da produção: {{convertData(pedProducao.data_ini_producao)}}</div>
                        <div>Operador: {{pedProducao.operador}}</div>
                        <div>Fim da produção: {{convertData(pedProducao.data_conclusao)}}</div>
                    </div>

                    <div>
                        <b-button id="fechar" variant="primary" 
                    @click="showModal=false">Encerrar</b-button>
                    </div>
                </div>

            </Modal>
    </div>
</template>

<script>
import Header from '../template/Header.vue'
import PageTitle from '../template/PageTitle.vue'
import Producao from '../cadastros/Producao.vue'
import axios from 'axios'
import { baseApiUrl } from '@/global'
import { mapState, mapGetters} from 'vuex'
import Modal from '@kouts/vue-modal'

export default {
    name: 'Home',
    components: {Header, PageTitle, Modal , Producao},
    computed: {
        ...mapGetters(['user']),
        ...mapState([
            'pedidoAtual'
        ])
        },
    data: function(){
        return {
            showModal: false,
            paraProducao: false,
            pedido: {},
            pedidos: [],
            pedProducao:{}
           
        }
    },
    
    methods: {
       console(){
           console.log(this.user)
       },
        pedidoProducao(pedido){
            this.$store.commit('setPedidoAtual', pedido.numero)
            this.paraProducao = true
        },

        loadPedidos(){
            const url = `${baseApiUrl}/pedidos`
            axios.get(url).then(res => {
                this.pedidos = res.data
            })              
        }, 
        convertData(dataInput){
                let data = new Date(dataInput);
                let dataFormatada = data.toLocaleDateString('pt-BR', {timeZone: 'UTC'});
                return dataFormatada
        },
        loadPedido(pedido){
            this.pedido = {...pedido}
            this.showModal=true
        },
        loadPedProducao(pedido){
            console.log(pedido)
            const url = `${baseApiUrl}/producao/${pedido}`
            axios.get(url).then(res => {
                this.pedProducao = res.data
            })
        },
        paraConcluido(pedido){
            console.log(pedido.numero)
            pedido.data_conclusao = Date.now()
            console.log(pedido.data_conclusao)
            const url = `${baseApiUrl}/pedidos_concluido/${pedido.numero}`
            axios.put(url, this.pedido).then(() => {
                this.$toasted.global.defaultSuccess()
            })
            const url2 = `${baseApiUrl}/concluido/${pedido.numero}`
            axios.put(url2, this.pedido).then(()=> {
                this.$toasted.global.defaultSuccess()
            })
            this.showModal=false
        }
      
  },
  mounted(){
        this.loadPedidos()
        this.paraProducao=false
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
    border-bottom: 1px solid #81817e;
}
.tabela tbody td:hover{
    background: dimgrey;
}
.aguardando{
    background: #A4B3BB;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.producao{
    background: #009AF0;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.prod{
    background: white;
}
.impedimento{
    background: #fae955;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.concluido{
     background: #7af16a;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
}
#fechar{
    background: green;
    margin-top: 5px;
    width: 100%;
}
</style>