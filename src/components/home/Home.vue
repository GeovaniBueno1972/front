<template>
    <div class="home">
        <Header  title="Gerenciamento de Produção"
		:hideUserDropdown="!user"/>
        <div class="pagina">
            <div id="pesquisa">
                <b-button id="paraPesquisa" variant="primary" 
                @click="tipoPesquisa('atualizar')">Atualizar</b-button>
                <b-button id="paraPesquisa" variant="primary" 
                @click="tipoPesquisa('data')">Pesquisar por Data</b-button>
                <b-button id="paraPesquisa" variant="primary" 
                @click="tipoPesquisa('periodo')">Pesquisar por Período</b-button>            
            </div>
            
           <div v-if="data || periodo" id="dataIni">
               <label for="dataIni">Data inicial:</label>
               <input type="date" name="dataIni" v-model="datas.data_ini">
           </div>
           <div v-if="periodo" id="dataFin">
               <label for="dataFin">Data final:</label>
               <input type="date" name="dataFin" v-model="datas.data_fin">
           </div>
           <div v-if="data || periodo" id="pesquisar">
               <b-button id="paraPesquisa" variant="primary" 
                @click="loadPedidosPesquisa()">Pesquisar</b-button>
           </div>
        </div>
        <div class="topo">
            <h5>Aguardando</h5>
            <h5>Em Produção</h5>
            <h5>Impedimento</h5>
            <h5>Concluído</h5>
        </div>
        <div class="containerTabela">
            <table class="tabela" >
                <thead class="cabecalho">
                    <tr hidden=true>
                        <td>Aguardando</td>
                        <td>Em Produção</td>
                        <td>Impedimento</td>
                        <td>Concluído</td>
                    </tr>
                </thead>
                <tbody >
                    <tr v-for="pedido in pedidos" v-bind:key="pedido.numero">
                       <td >
                            <div id="card" v-if="pedido.estado === 'Aguardando'" class="aguardando" @click="loadPedido(pedido)" 
                                >
                               <div id="card-data">
                                    <div class="numero">
                                        <h6>{{pedido.numero}}</h6>
                                    </div>
                                    <div class="data">
                                        <h6>{{convertData(pedido.data_entrega)}}</h6>
                                    </div>
                                    
                               </div>
                               <div class="nome">
                                    {{pedido.cliente}}
                               </div>                                
                            </div>
                           <div v-else>{{null}}</div>
                       </td>
                       <td >
                           <div id="card" v-if="pedido.estado === 'Producao'" class="producao" @click="loadPedido(pedido)">
                                <div id="card-data">
                                    <div class="numero">
                                        <h6>{{pedido.numero}}</h6>
                                    </div>
                                    <div class="data">
                                        <h6>{{convertData(pedido.data_entrega)}}</h6>
                                    </div>
                               </div>
                               <div class="nome">
                                    {{pedido.cliente}}
                               </div> 
                            </div>
                           <div v-else>{{null}}</div>
                       </td>
                       <td >
                           <div id="card" v-if="pedido.estado === 'Impedimento'" class="impedimento" @click="loadPedido(pedido)">
                               <div id="card-data">
                                    <div class="numero">
                                        <h6>{{pedido.numero}}</h6>
                                    </div>
                                    <div class="data">
                                        <h6>{{convertData(pedido.data_entrega)}}</h6>
                                    </div>
                               </div>
                               <div class="nome">
                                    {{pedido.cliente}}
                               </div> 
                            </div>
                           <div v-else>{{null}}</div>
                       </td>
                        <td >
                           <div id="card" v-if="pedido.estado === 'Concluido'" class="concluido" @click="loadPedido(pedido)">
                                <div id="card-data">
                                    <div class="numero">
                                        <h6>{{pedido.numero}}</h6>
                                    </div>
                                    <div class="data">
                                        <h6>{{convertData(pedido.data_entrega)}}</h6>
                                    </div>
                               </div>
                               <div class="nome">
                                    {{pedido.cliente}}
                               </div>   
                            </div>
                           <div v-else>{{null}}</div>
                        </td>
                        
                                               
                    </tr>
                </tbody>
                
            </table>
        </div>    
        <div class="base">
            <div>
                <span>total de pedidos aguardando: {{totalPedAguardando}}</span>
            </div>
        </div>
            <Modal v-model="showModal" title="Informações do Pedido" 
            @before-open="loadPedProducao(pedido.numero)"
            @after-close="loadPedidosPesquisa()">
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
                    <router-link to='/pedidos/detalhe' class="link"> Ver Pedido </router-link>
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
//import PageTitle from '../template/PageTitle.vue'
import Producao from '../cadastros/Producao.vue'
import axios from 'axios'
import { baseApiUrl } from '@/global'
import { mapState, mapGetters} from 'vuex'
import Modal from '@kouts/vue-modal'
import { now } from 'moment'


export default {
    name: 'Home',
    components: {Header, Modal , Producao},
    computed: {
        ...mapGetters(['user']),
        ...mapState([
            'pedidoAtual'
        ])
        },
    data: function(){
        return {
            padrao: true,
            data: false,
            periodo: false,
            totalPedAguardando: 0,
            showModal: false,
            paraProducao: false,
            pedido: {},
            pedidos: [],
            pedProducao:{},
            datas:{}
           
        }
    },
    
    methods: {
        
        tipoPesquisa(tipo){
            this.padrao = false
            if (tipo === 'data') {
                this.data = true
                this.periodo = false
            }else if (tipo === 'atualizar') {
                this.padrao = true
                this.data = false
                this.periodo = false
                this.loadPedidosPesquisa()
            }else{
                this.data = false
                this.periodo = true
            }
        },
       console(){
           console.log(this.user)
       },
        pedidoProducao(pedido){
            this.$store.commit('setPedidoAtual', pedido.numero)
            this.paraProducao = true
        },
        datasPadrao(){
            let hoje = new Date(now())
            let dataMenos = new Date()
            let dataMais = new Date()
            dataMenos.setDate(hoje.getDate()-5)
            dataMais.setDate(hoje.getDate()+20)
            this.datas.data_ini = dataMenos
            this.datas.data_fin = dataMais
        },

        loadPedidosPesquisa(){
            console.log(this.paraProducao)
            this.totalPedAguardando = 0
            if (this.padrao === true) {
                this.datasPadrao()
                } else {
                    if (this.data === true) {
                    this.datas.data_fin = this.datas.data_ini
                    }
                }  
            
            
            const url = `${baseApiUrl}/pedidos_pesquisa`
            axios.post(url, this.datas).then(res => {
                this.pedidos = res.data
                for (let index = 0; index < this.pedidos.length; index++) {
                    const element = this.pedidos[index];
                    if (element.estado === 'Aguardando') {
                        this.totalPedAguardando ++
                    }
                }
            }) 
            this.paraProducao = false             
        },

        loadPedidos(){
            const url = `${baseApiUrl}/pedidos`
            axios.get(url).then(res => {
                this.pedidos = res.data
                for (let index = 0; index < this.pedidos.length; index++) {
                    const element = this.pedidos[index];
                    if (element.estado === 'Aguardando') {
                        this.totalPedAguardando ++
                    }
                }
            }) 
                
        }, 
        convertData(dataInput){
                let data = new Date(dataInput);
                let dataFormatada = data.toLocaleDateString('pt-BR', {timeZone: 'UTC'});
                return dataFormatada
        },
        loadPedido(pedido){
            this.pedido = {...pedido}
            this.$store.commit('setPedidoAtual', pedido.numero)
            this.showModal=true
        },
        loadPedProducao(pedido){
            const url = `${baseApiUrl}/producao/${pedido}`
            axios.get(url).then(res => {
                this.pedProducao = res.data
            })
        },
        paraConcluido(pedido){
            pedido.data_conclusao = Date.now()
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
        this.loadPedidosPesquisa()
        this.paraProducao=false
        
        
    }
}
    

</script>

<style>
.pagina{
    padding: 20px;
}
.containerTabela{
    overflow-y: scroll;
    height: 400px;
}
.tabela{
    width: 95%;
    height: 100px;
    margin: 0 2.5%;
    border: 1px solid red;
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
.topo{
    margin-top: 15px;
    margin-left: 2.5%;
    padding: 0 80px;
    width: 94%;
    border: 1px solid black;
    display: flex;
    justify-content: space-between;
}

.tabela tbody td{
    width: 25%;
    text-align: center;
    border-bottom: 1px solid #81817e;
}
.tabela tbody td:hover{
    background: dimgrey;
}
.aguardando{
    background: #A4B5BB;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 5px;
    padding-left: 10px;
    display: flex;
    justify-content: left;
    align-items: center;
}

.producao{
    background: #009AF0;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 5px;
    display: flex;
    padding-left: 10px;
    justify-content: left;
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
    padding-left: 10px;
    justify-content: left;
    align-items: center;
}
.concluido{
     background: #7af16a;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 5px;
    display: flex;
    padding-left: 10px;
    justify-content: left;
    align-items: center;
}
#fechar{
    background: green;
    margin-top: 5px;
    width: 100%;
}
#pesquisa{
    padding: 0 5px;
    float: left;
}
#paraPesquisa{
    margin: 0 5px;
    padding: 0 5px;
}
#dataIni{
    float: left;
    margin-left: 110px;    
}

#dataFin{
    float: left;
    margin: 0 15px;
}
#card{
    display: block;
    
}
#card-data{
    display: flex;
    justify-content: space-between;
}
.numero{
    float: left;
    padding: 3px;
}
.data{
    float: left;
    padding: 3px;
}
.nome{
    display: flex;
}
</style>