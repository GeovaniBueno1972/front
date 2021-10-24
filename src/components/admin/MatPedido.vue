<template>
  <div class="produtos-pedidos-admin">
      <b-form>
          <input id="produto-id" type="hidden" v-model="produto.id">
          <b-row>
              <b-col md="5" sm="12">
                  <b-form-group label="Produto:" label-for="produto-id">
                      <b-form-select id="produto-id"  v-model="produto.material_id" required>
                        <option v-for="(material, id) in materiais"
                        :key="id"
                        :value="material.id"
                        :title="material.name || null">
                        {{material.name}}
                        </option>
                      </b-form-select>
                    </b-form-group>
                    <button type="button" class="btn btn-primary" @click="showModal=true">
                        Novo Material
                    </button>
                    <Modal v-model="showModal" @after-close="loadMateriais" title="Cadastro de Materiais">
                        <ProdutosAdmin />

                    </Modal>
              </b-col>
              <b-col md="2" sm="12">
                  <b-form-group label="Quantidade:" label-for="produto-quantidade">
                      <b-form-input id="produto-nome" type="text"
                        v-model="produto.quantidade" required
                        placeholder="Quantidade do Produto..." />
                  </b-form-group>
              </b-col>
                <b-button  size="sm" variant="primary" v-if="mode === 'save'"
                    @click="save">Salvar</b-button>
                <b-button size="sm" variant="danger" v-if="mode === 'remove'"
                    @click="remove">Excluir</b-button>
                <b-button size="sm" class="ml-2" @click="reset">Cancelar</b-button>
          </b-row>
          
          
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
import Modal from '@kouts/vue-modal'
import {baseApiUrl, showError} from '@/global'
import axios from 'axios'
import {mapGetters} from 'vuex'
import ProdutosAdmin from './ProdutosAdmin.vue'

export default {
    name: 'MatPedido',
    components: {ProdutosAdmin, Modal},
    computed: {
        ...mapGetters(['pedidoAtual'])
    },
    data: function(){
        return {
            showModal: false,
            mode: 'save',
            materiais: [],
            produto: {},
            produtos: [],
            fields: [
                {key: 'id', label: 'ID', sortable: true},
                {key: 'pedido_numero', label: 'Pedido'},
                //{key: 'codigo', label: 'Código', sortable: true},
                {key: 'name', label: 'Produto'},
                {Key: 'quantidade', label: 'Qtd'},
                {key: 'actions', label: 'Ações'}
            ]
        }
    }, 
    methods: {
        loadMateriais(){
            const url = `${baseApiUrl}/materiais`
            axios.get(url).then(res => {
                this.materiais = res.data
            })
        },
        loadProdutos(){
            const id = `${this.pedidoAtual}`
            const url = `${baseApiUrl}/materialpedidos/${id}`
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
            this.produto.pedido_numero = this.pedidoAtual
            console.log(this.produto)
            const method = this.produto.id ? 'put' : 'post'
            const id = this.produto.id ? `/${this.produto.id}` : ''
            axios[method](`${baseApiUrl}/material_pedidos${id}`, this.produto)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                })
                .catch(showError)

        },
        remove(){
            const id = this.produto.id
            axios.delete(`${baseApiUrl}/material_pedidos/${id}`)
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
        this.loadMateriais()
    }
}
</script>

<style>

</style>