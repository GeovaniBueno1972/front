<template>
  <div class="pedidos-admin">
        <div class="titulo">
           <Header  title="Cadastro de Pedidos" :hideUserDropdown="!user"/>
        </div>
        <!--Inicio Formulario Pedido-->
        <div class="form-pedido">
            <!--Inicio cliente-->
            <div class="cliente">
                <div>
                    <label for="pedido-cliente" >Cliente:</label>
                </div>
                                
                <div class="select">
                    <b-form-select id="btn-select" type="selct" name="pedido-cliente"  v-model="pedido.cliente_id" required> 
                        <option v-for="(cliente, id) in clientes"
                                :key="id"
                                :value="cliente.id"
                                :title="cliente.name || null">
                                {{cliente.name}}
                                </option>
                    </b-form-select> 
                </div>

                <div class="novo-cliente">
                     <button id="novo-cliente" type="button" class="btn btn-primary" @click="showModal=true">
                         Novo Cliente
                    </button>
                </div> 
            </div> <!--Fim cliente-->

            <!--Inicio Numero pedido-->
            <div class="numero-pedido">
                <div>
                    <label for="numero-pedido">Número do Pedido:</label>
                </div>
                <div>
                    <input class="entrada" type="text" name="numero-pedido" 
                    placeholder="Informe o Número"
                    v-model="pedido.numero" required>
                </div>
            </div><!--Fim numero do pedido-->

            <!--Inicio Data Entrega-->
            <div class="data-entrega">
                <div>
                    <label for="pedido-data-entrega">Data de entrega:</label>
                </div>
                <div>
                    <input class="entrada" type="date" name="pedido-data-entrega"
                    v-model="pedido.data_entrega" required >
                </div>
            </div> <!--Fim Data Entrega-->

            <!--Inicio botoes-->
            <div class="botoes-pedido">
                    <button id="salvar-pedido" type="button" class="btn btn-primary" @click="save" >
                         Salvar
                    </button>
                    <button id="cancelar-pedido" type="button" class="btn btn-primary" @click="reset">
                         Cancelar
                    </button>
            </div><!--Fim botoes-->

            <!--Inicio modal Clientes-->
            <Modal
                v-model="showModal"
                title="Novo Cliente"                     
                modal-class="fullscreen-modal"
                @after-close="loadClientes()">
                    <div>
                            <ClientesAdmin />
                    </div>
                    <div class="row fullscreen-modal-footer">
                        <div class="col-sm-12">
                        <div class="float-right">
                            <button class="btn btn-secondary" type="button" @click="showModal = false">Close</button>
                        </div>
                        </div>
                    </div>
            </Modal><!--Fim Modal Clientes-->

        </div><!--Fim Formulario Pedido-->
           
      <div v-if="pedidoAtual">
          <MatPedido />
      </div>
      <div class="concluir">
                <b-button id="encerrar" variant="primary" 
                    @click="concluir">Concluir</b-button>
        </div>
      
  </div>
</template>

<script>
import Header from '../template/Header.vue'
import Modal from '@kouts/vue-modal'
import {baseApiUrl, showError} from '@/global'
import axios from 'axios'
import { mapState, mapGetters} from 'vuex'
import MatPedido from '../admin/MatPedido.vue'
import ClientesAdmin from '../admin/ClientesAdmin.vue'


export default {
    name: 'Pedidos',
    components: {Header, MatPedido, ClientesAdmin, Modal},
    computed: {
        ...mapGetters([
            'user', 'pedidoAtual'
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
            showModal: false
        }
        
    },
    methods: {
       
        loadClientes(){
            const url = `${baseApiUrl}/clientes`
            axios.get(url).then(res => {
                this.clientes = res.data
            })
        }, 
        reset(){
            this.mode = 'save'
            this.cliente = {}
            this.loadClientes()
        },
        concluir(){
            this.$store.commit('setPedidoAtual', null)
            this.$router.push({path: '/home'})
        },
        save(){
            const method = this.pedido.numero ? 'put' : 'post'
            const id = this.pedido.numero ? `/${this.pedido.numero}` : ''
            
            this.pedido.user_id = this.user.id
            this.pedido.estado = 'Aguardando'
            console.log(this.pedido)
            axios[method](`${baseApiUrl}/pedidos${id}`, this.pedido)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.setPedido()
                    this.reset()
                })
                .catch(showError)
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
        loadCliente(cliente, mode = 'save'){
            this.mode = mode
            this.cliente = {...cliente}
        }, 
        setPedido(){
            this.$store.commit('setPedidoAtual', this.pedido.numero)
        }
    },
    mounted(){
        this.loadClientes()
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

.pedidos-admin{
    margin: 0;
    padding: 0;
    height: 300px;
}
.titulo{
    margin: 0;
    padding: 0;
    display: block;
}
.form-pedido{
    width: 100%;
    height: 110px;
    margin: 0 ;
    padding: 10px;
    margin-top: 30px;
   
    float: inherit;
    
}
.cliente{
    background: white;
    margin: 0 10px;
    padding: 5px 0 5px 10px;
    width: 490px;
    height: 80px;
    float: left;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 5px;
}
.select{
    width: 350px;
    float: left;
}
#btn-select{
    height: 40px;
}
.novo-cliente{
    padding: 0 5px;
    float: left;
}

#novo-cliente{
    height: 40px;
    background: cadetblue;
}
.numero-pedido{ 
    width: 250px;
    height: 80px;
    padding: 5px 15px;
    float: left;
     background: white;
     box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 5px;
}
.data-entrega{
    margin-left: 10px;
    padding: 0 15px;
    height: 80px;
    width: 250px;
    float: left;
     background: white;
     box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 5px;
}
.entrada{
    width: 220px;
}
.botoes-pedido{
    margin-left: 10px;
    width: 180px;
    padding: 5px 15px;
    background: white;
    float: left;
    flex-direction: column;
    display: flex;
    height: 80px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 5px;
}
#salvar-pedido{
    background: cadetblue;
    width: 150px;
    height: 30px;
    border: none;
}
#cancelar-pedido{
    background: coral;
    margin-top: 5px;
    height: 30px;
    width: 150px;
    border: none;
}
.concluir{
    margin-left: 10px;
    width: 250px;
    padding: 5px 15px;
    background: white;
    float: left;
    flex-direction: column;
    display: flex;
    height: 50px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 5px;
}
</style>