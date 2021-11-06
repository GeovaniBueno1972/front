<template>
  <div class="prod">
        <div class="label">
                <label for="operador">Operador:</label>
        </div>
        <div class="selecionar">
            <b-form-select id="operador-id" name="operador" v-model="pedProducao.user_id" required>
                    <option v-for="(user, id) in users"
                    :key="id"
                    :value="user.id"
                    :title="user.name || null">
                    {{user.name}}
                    </option>
            </b-form-select>
        </div>
            
            <div class="botao">
                <b-button id="salvar" variant="primary" 
                    @click="save">Confirmar</b-button>
                    
            </div>
  </div>
</template>

<script>
import axios from 'axios'
import {baseApiUrl, showError} from '@/global'
import { mapState, mapGetters} from 'vuex'

export default {
    name: 'Producao',
    computed: {
        ...mapGetters([
            'pedidoAtual', 'pedidoStatus'
        ]),
        ...mapState([
            'pedidoAtual', 'pedidoStatus'
        ])
    },
    data: function(){
        return {
            showModal: false,
            mode: 'save',
            users: [],
            pedProducao: {}                     
        }
    }, 
    methods: {
        loadUsers(){
            const url = `${baseApiUrl}/operador`
            axios.get(url).then(res => {
                this.users = res.data
            })
        },
        save(){
            this.pedProducao.pedido_numero = this.pedidoAtual
            console.log(this.pedProducao.pedido_numero)
            const method = this.pedProducao.id ? 'put' : 'post'
            const id = this.pedProducao.id ? `/${this.pedProducao.id}` : ''
            axios[method](`${baseApiUrl}/producao${id}`, this.pedProducao)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    
                })
                .catch(showError)
            axios.put(`${baseApiUrl}/pedidos_producao/${this.pedidoAtual}`)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    
                })
                .catch(showError)
            this.$store.commit('setPedidoAtual', null)
            this.$store.commit('setPedidoStatus', 'Producao')
            },
    },
    mounted(){
        this.loadUsers()
    }
}
</script>

<style>
.prod{
    background: black;
    padding: 5px;
    }

.label{
    float: left;
}
.selecionar{
    float: left;
}
#operador-id{
    width: 200px;
    margin-left: 5px;
}
</style>