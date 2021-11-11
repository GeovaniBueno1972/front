<template>
  <div class="produtos-admin">
      <b-form>
          <input id="produto-id" type="hidden" v-model="produto.id">
          <b-row>
              <b-col md="3" sm="12">
                  <b-form-group label="Código:" label-for="produto-codigo">
                      <b-form-input id="produto-codigo" type="text"
                        v-model="produto.codigo" required
                        placeholder="Informe o Código do Produto..." />
                  </b-form-group>
              </b-col>
              <b-col md="7" sm="12">
                  <b-form-group label="Nome:" label-for="produto-nome">
                      <b-form-input id="produto-nome" type="text"
                        v-model="produto.name" required
                        placeholder="Informe Nome do Produto..." />
                  </b-form-group>
              </b-col>
              <b-col md="2" sm="12">
                  <b-form-group label="Unidade:" label-for="produto-unidade">
                    <select v-model="produto.unidade" >
                        <option value="CH">Chapas => CH</option>
                        <option value="UN" selected>Corte => UN</option>
                        <option value="ML" selected>Metro Lineares => ML</option>
                    </select>
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
      <b-table hover small striped :items="produtos" :fields="fields">
          <template #cell(actions)="data"> 
              <b-button variant="warning" @click="loadProduto(data.item)" class="mr-2">
                  <i class="fa fa-pencil"></i>
              </b-button>
              <b-button variant="danger" @click="loadProduto(data.item, 'remove')">
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
    name: 'ProdutosAdmin',
    data: function(){
        return {
            mode: 'save',
            produto: {},
            produtos: [],
            fields: [
                {key: 'id', label: 'ID', sortable: true},
                {key: 'codigo', label: 'Código', sortable: true},
                {key: 'name', label: 'Nome'},
                {key: 'unidade', label: 'UN'},
                {key: 'actions', label: 'Ações'}
            ]
        }
    }, 
    methods: {
        loadProdutos(){
            const url = `${baseApiUrl}/materiais`
            axios.get(url).then(res => {
                this.produtos = res.data
            })
        }, 
        reset(){
            this.mode = 'save'
            this.produto = {}
            this.loadProdutos()
        },
        save(){
            const method = this.produto.id ? 'put' : 'post'
            const id = this.produto.id ? `/${this.produto.id}` : ''
            axios[method](`${baseApiUrl}/materiais${id}`, this.produto)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                })
                .catch(showError)

        },
        remove(){
            const id = this.produto.id
            axios.delete(`${baseApiUrl}/materiais/${id}`)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                })
                .catch(showError)
        },
        loadProduto(produto, mode = 'save'){
            this.mode = mode
            this.produto = {...produto}
        }
    },
    mounted(){
        this.loadProdutos()
    }
}
</script>

<style>
b-table{
    justify-content: left;
}
</style>