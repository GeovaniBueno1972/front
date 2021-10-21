<template>
  <div class="pedidos-admin">
           
      <b-form>
            <b-row>
              <b-col md="5" sm="12">
                  <b-form-group label="Número:" label-for="pedido-numero">
                      <b-form-input id="pedido-numero" type="text"
                        v-model="pedido.numero" required
                        placeholder="Número do Pedido..." />
                  </b-form-group>
              </b-col>
              <b-col md="2" sm="12">
                  <b-form-group label="Data da Entrega:" label-for="data-entrega">
                      <b-form-input id="data-entrega" type="date"
                        v-model="pedido.data_entrega" required
                        placeholder="data da Entrega..." />
                  </b-form-group>
              </b-col>
              <b-col md="5" sm="12">
                  <b-form-group label="Cliente:" label-for="pedido-cliente">
                      <b-form-select id="pedido-cliente"  v-model="pedido.cliente_id" required>
                        <option v-for="(cliente, id) in clientes"
                        :key="id"
                        :value="cliente.id"
                        :title="cliente.name || null">
                        {{cliente.name}}
                        </option>
                      </b-form-select>
                  </b-form-group>
              </b-col>
          </b-row>
          
          <b-button variant="primary" v-if="mode === 'save'"
            @click="save">Salvar</b-button>
          <b-button variant="danger" v-if="mode === 'remove'"
            @click="remove">Excluir</b-button>
          <b-button class="ml-2" @click="reset">Cancelar</b-button>
      </b-form>
      <hr>
  </div>
</template>

<script>
import {baseApiUrl, showError} from '@/global'
import axios from 'axios'
import { mapGetters} from 'vuex'

export default {
    name: 'PedidosAdmin',
    computed: {
        ...mapGetters([
            'user'
        ])
    },
    data: function(){
        return {
            mode: 'save',
            clientes:[],
            pedido: {},
            pedidos: [],
            userName: ''
        }
    },
    methods: {
       
        loadClientes(){
            axios.defaults.headers.common = {'Authorization' : `Bearer ${this.user.token}`}
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
        save(){
            const method = this.pedido.numero ? 'put' : 'post'
            const id = this.pedido.numero ? `/${this.pedido.numero}` : ''
            
            this.pedido.user_id = this.user.id
            this.pedido.estado = 'Aguardando'
            console.log(this.pedido)
            axios[method](`${baseApiUrl}/pedidos${id}`, this.pedido)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
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
        }
    },
    mounted(){
        this.loadClientes()
    }
}
</script>

<style>

</style>