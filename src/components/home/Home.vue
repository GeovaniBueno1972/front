<template>
    <div class="home">
        <Header  title="Gerenciamento de Produção"
		:hideUserDropdown="!user"/>
        <div id="pagina">
            <div id="pesquisa">
                <b-button id="paraPesquisa" variant="primary" 
                @click="tipoPesquisa('atualizar')">Atualizar</b-button>
                <b-button id="paraPesquisa" variant="primary" 
                @click="tipoPesquisa('data')">Pesquisar por Data</b-button>
                <b-button id="paraPesquisa" variant="primary" 
                @click="tipoPesquisa('periodo')">Pesquisar por Período</b-button> 
                <b-button id="paraPesquisa" variant="primary" 
                @click="tipoPesquisa('cliente')">Pesquisar por Cliente</b-button> 
                <b-button id="paraPesquisa" variant="primary" 
                @click="tipoPesquisa('numero')">Pesquisar por Numero</b-button>           
            </div>
            <div id="linhaPesquisa">
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
                <div v-if="cliente" id="selecionar_cliente" >
                        <b-form-select id="btn-select" type="selct" name="pedido-cliente"  v-model="nomes.name" required> 
                            <option v-for="(cliente, id) in clientes"
                                    :key="id"
                                    :value="cliente.name"
                                    :title="cliente.name || null">
                                    {{cliente.name}}
                                    </option>
                        </b-form-select> 
                        <b-button id="paraPesquisa" variant="primary" 
                        @click="loadPedidosPorCliente()">Pesquisar</b-button>
                </div>
                <div v-if="numero" id="selecionar_pedido">
                    <input type="text" name="numero_pedido" id="numero_pedido" v-model="numeroPedido.numero">
                    <b-button id="paraPesquisa" variant="primary" 
                        @click="loadPedidosPorNumero()">Pesquisar</b-button>
                </div>
            </div>
        </div>

        <div id="resumos">
            <div id="resumo-pedidos">
                <span>Total de pedidos aguardando: <strong>{{totalPedAguardando}}</strong> pedidos</span>
            </div>
            <div id="resumo-chapas">
                <span>Total de chapas: <strong>{{totalChapas}}</strong> chapas</span>
            </div>
            <div id="resumo-cortes">
                <span>Total de cortes: <strong>{{totalCortes}}</strong> cortes </span>
            </div>
            <div id="resumo-colagem">
                <span>Total de colagem: <strong>{{totalColagem}}</strong> metros </span>
            </div>
        </div>

        <div class="topo">
            <div id="topoAguardando">
                <h5 >Aguardando</h5>
            </div>
            <div  id="topoEmProducao">
                <h5 >Em Produção</h5>
            </div>
            <div id="topoImpedimento">
                <h5>Impedimento</h5>
            </div>
            <div id="topoConcluido">
                <h5>Concluído</h5>
            </div>
            
            
            
            
        </div>
        <div class="containerTabela" overflow="scroll">
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
                    <div>Pedido: <b>{{pedido.numero}}</b></div>
                    <div>Cliente: {{pedido.cliente}}</div>
                    <div>Vendedor: {{pedido.usuario}}</div>
                    <div>Data de lançamento: {{convertData(pedido.data_lancamento)}}</div>
                    <div>Data de entrega: <b>{{convertData(pedido.data_entrega)}}</b></div>
                    <hr>
                    <ul>
                        <li v-for="produto in produtos" :key="produto.id">
                            {{produto.quantidade}} {{produto.unidade}} - {{produto.name}}
                        </li>
                    </ul>
                    <router-link to='/pedidos/detalhe' class="link" v-if="pedido.estado === 'Aguardando'"> Alterar Materiais </router-link>
                    <hr>
                    <div v-if="pedido.estado === 'Aguardando'">
                            
                            <b-button v-if="user.funcao != 'vendedor' " id="paraProducao" variant="primary" 
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
            atualPedido: '',
            clientes:[],
            nomes: {},
            numeroPedido: {},
            padrao: true,
            data: false,
            periodo: false,
            cliente: false,
            numero: false,
            totalPedAguardando: 0,
            totalChapas: 0,
            totalCortes: 0,
            totalColagem: 0,
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
                this.cliente = false
                this.numero = false
                this.loadPedidosPesquisa()
            }else if(tipo === 'numero'){
                this.data = false
                this.periodo = false
                this.cliente = false
                this.numero = true
            }else if(tipo === 'cliente'){
                this.data = false
                this.periodo = false
                this.cliente = true
            }else{
                this.data = false
                this.periodo = true
                this.cliente = false
                this.numero = false
            }
        },
              
        loadProdutos(){
            const id = `${this.atualPedido}`
            console.log(id)
            const url = `${baseApiUrl}/materialpedidos/${id}`
            axios.get(url).then(res => {
                this.produtos = res.data
                for (let index = 0; index < this.produtos.length; index++) {
                    const element = this.produtos[index];
                    if (element.unidade === 'CH') {
                        this.totalChapas = this.totalChapas + element.quantidade
                    }else if(element.unidade === 'UN'){
                        this.totalCortes = this.totalCortes + element.quantidade
                    }else if(element.unidade === 'ML'){
                        this.totalColagem = this.totalColagem + element.quantidade
                    }
                }
            })
        },

        loadClientes(){
            const url = `${baseApiUrl}/clientes`
            axios.get(url).then(res => {
                this.clientes = res.data
            })
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

        resetTotais(){
            this.totalPedAguardando = 0
            this.totalChapas = 0
            this.totalCortes = 0
            this.totalColagem = 0
        },

        loadPedidosPesquisa(){
            console.log(this.paraProducao)
            this.resetTotais()
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
                        this.atualPedido = element.numero
                        console.log('Aqui está o numero' + this.atualPedido)
                        this.loadProdutos()
                    }
                }
            }) 
            this.paraProducao = false             
        },

        loadPedidosPorCliente(){
            this.totalPedAguardando = 0
            console.log(this.name)
            const url = `${baseApiUrl}/PedidoCliente`
            axios.post(url, this.nomes).then(res => {
                this.pedidos = res.data
                for (let index = 0; index < this.pedidos.length; index++) {
                    const element = this.pedidos[index];
                    if (element.estado === 'Aguardando') {
                        this.totalPedAguardando ++
                    }
                }
            }) 
        },

        loadPedidosPorNumero(){
            this.totalPedAguardando = 0
            console.log(this.name)
            const url = `${baseApiUrl}/PedidoNumero`
            axios.post(url, this.numeroPedido).then(res => {
                this.pedidos = res.data
                for (let index = 0; index < this.pedidos.length; index++) {
                    const element = this.pedidos[index];
                    if (element.estado === 'Aguardando') {
                        this.totalPedAguardando ++
                    }
                }
            }) 
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
                this.atualPedido = pedido
                this.loadProdutos()
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
        this.loadClientes()
        this.loadPedidosPesquisa()
        this.paraProducao=false
        
        
    }
}
    

</script>

<style>
.home{
    display: flex;
    flex-direction: column;
    
}
#pagina{
    display: flex;
    flex-direction: column;
      
    
}
#pesquisa{
    
    height: 35px;
    padding: 5px 5px;
    float: left;
   
}
#paraPesquisa{
    margin:  5px;
    padding: 0 5px;
}
#dataIni{
    float: left;
    padding: 5px;
  
}

#dataFin{
    float: left;
    padding: 5px;
}

#selecionar_cliente{
    margin-top: 5px;
    margin-left: 10px;
    height: 45px;
    width: 500px;
    display: flex;
    align-content: flex-start;
}
#selecionar_pedido{
    margin-top: 5px;
}

#linhaPesquisa{
    margin: 5px;
}

.containerTabela{
    overflow-y: scroll;
    height: 1fr;
}
.tabela{
    width: 95%;
    height: 100px;
    margin: 0 2.5%;
    
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
    width: 94%;
    border: 1px solid black;
    display: flex;
    
}
#topoAguardando{
    width: 25%;
    background: #A4B5BB;
    text-align: center;
}
#topoEmProducao{
    width: 25%;
    background: #009AF0;
    text-align: center;
}
#topoImpedimento{
    width: 25%;
    background: #fae955;
    text-align: center;
}

#topoConcluido{
    width: 25%;
    background: #7af16a;
    text-align: center;
}

.tabela tbody td{
    width: 25%;
    text-align: center;
    
}
.tabela tbody td:hover{
    background: dimgrey;
}

#resumos{
    margin-left: 0%;
    display: flex;
    justify-content: space-around;
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