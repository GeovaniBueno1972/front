<template>
  <div class="clientes-admin">
      <b-form>
          <input id="cliente-id" type="hidden" v-model="cliente.id">
          <b-row>
              <b-col md="5" sm="12">
                  <b-form-group label="Nome:" label-for="cliente-nome">
                      <b-form-input id="cliente-nome" type="text"
                        v-model="cliente.name" required
                        placeholder="Informe o Nome do Cliente..." />
                  </b-form-group>
              </b-col>
              <b-col md="2" sm="12">
                  <b-form-group label="Fone:" label-for="Cliente-fone">
                      <b-form-input id="cliente-fome" type="text"
                        v-model="cliente.fone" required
                        placeholder="Fone do Cliente..." />
                  </b-form-group>
              </b-col>
              <b-col md="5" sm="12">
                  <b-form-group label="Bairro:" label-for="cliente-bairro">
                      <b-form-input id="cliente-fone" type="text"
                        v-model="cliente.bairro" required
                        placeholder="Informe o Bairro do Cliente..." />
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
      <b-table hover small striped :items="clientes" :fields="fields">
          <template #cell(actions)="data"> 
              <b-button variant="warning" @click="loadCliente(data.item)" class="mr-2">
                  <i class="fa fa-pencil"></i>
              </b-button>
              <b-button variant="danger" @click="loadCliente(data.item, 'remove')">
                  <i class="fa fa-trash"></i>
              </b-button>
          </template>
      </b-table>
  </div>
</template>

<script>
import {baseApiUrl, showError} from '@/global'
import axios from 'axios'


export default {
    name: 'ClientesAdmin',
    data: function(){
        return {
            mode: 'save',
            cliente: {},
            clientes: [],
            fields: [
                {key: 'id', label: 'Código', sortable: true},
                {key: 'name', label: 'Nome', sortable: true},
                {key: 'fone', label: 'Telefone'},
                {key: 'bairro', label: 'Bairro', sortable: true},
                {key: 'actions', label: 'Ações'}
            ]
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
        save(){
            const method = this.cliente.id ? 'put' : 'post'
            const id = this.cliente.id ? `/${this.cliente.id}` : ''
            axios[method](`${baseApiUrl}/clientes${id}`, this.cliente)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                })
                .catch(showError)

        },
        remove(){
            const id = this.cliente.id
            axios.delete(`${baseApiUrl}/clientes/${id}`)
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