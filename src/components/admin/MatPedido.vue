<template>
  <div class="produtos-pedidos-admin">
      <input id="produto-id" type="hidden" v-model="produto.id">

      <div class="form-produto">
            <!--Inicio Material -->
            <div class="produto">
            <div>
                <label for="produto">Material:</label>
            </div>
            <b-form-select id="produto-id" name="produto" v-model="produto.material_id" required>
                    <option v-for="(material, id) in materiais"
                    :key="id"
                    :value="material.id"
                    :title="material.name || null">
                    {{material.name}}
                    </option>
            </b-form-select>
            <div class="novo-material">
                <button id="btn-novo-material" type="button" class="btn btn-primary" @click="showModal=true">
                    Novo Material
                </button>
                <Modal v-model="showModal" @after-close="loadMateriais" title="Cadastro de Materiais">
                    <ProdutosAdmin />

                </Modal>
            </div>
            </div> <!--Fim Material -->

            <!--Inicio Quantidade -->
            <div class="quantidade">
                <div>
                    <label for="quantidade">Qauntidade:</label>
                </div>
                <div>
                    <input class="entrada" type="text" name="quantidade" 
                        v-model="produto.quantidade" required
                        placeholder="Quantidade do Produto..." >
                </div>
            </div><!--Fim Quantidade -->

            <!--Inicio Botoes -->
            <div class="botoes">
                <b-button id="salvar" variant="primary" v-if="mode === 'save'"
                    @click="save">Salvar</b-button>
                <b-button id="cancelar" variant="primary" @click="reset">Cancelar</b-button>
            </div><!--Fim Botoes -->
        </div>
     
    
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
.form-produto{
    width: 100%;
    height: 110px;
    margin-top: -10px;
    padding: 10px;
    
    float: left;
    
}

.produto{
    background: white;
    margin: 0 10px;
    padding: 10px 5px 5px 10px;
    width: 490px;
    height: 80px;
    float: left;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 5px;
}

#produto-id{
    height: 30px;
    width: 350px;
    float: left;
}
.novo-material{
    float: left;
    margin-left: 5px;
}
#btn-novo-material{
    height: 30px;
    padding: 5px;
}
.quantidade{
    width: 250px;
    height: 80px;
    padding: 5px 15px;
    float: left;
     background: white;
     box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 5px;
}

.botoes{
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
#salvar{
    margin-bottom: 5px;
    height: 30px;
    align-items: center;
}
#cancelar{
    height: 30px;
    background: coral;
    border: none;
}
</style>