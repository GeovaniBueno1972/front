<template>
    <div class="admin-pages">
        <Header  title="Cadastro de Pedidos" :hideUserDropdown="!user"/>
        <PageTitle main='Administração do sistema' sub="controle de dados" />
        
        <div class="admin-pages-tabs">
            <b-card no-body>
                <b-tabs card>  
                    <b-tab title="Pedidos">
                        <PedidosAdmin />
                    </b-tab>
                    <b-tab title="Clientes">
                        <ClientesAdmin />
                    </b-tab>
                    <b-tab title="Produtos">
                        <ProdutosAdmin />
                    </b-tab>
                    <b-tab title="Produção">
                        <ProducaoAdmin />
                    </b-tab>
                    <b-tab v-if="user.funcao === 'administracao'" title="Usuários">
                        <UsuarioAdmin />
                    </b-tab>

                </b-tabs> 
            </b-card>
        </div>
    </div>
</template>

<script>
import PageTitle from '../template/PageTitle.vue'
import PedidosAdmin from './PedidosAdmin.vue'
import ClientesAdmin from './ClientesAdmin.vue'
import ProdutosAdmin from './ProdutosAdmin.vue'
import UsuarioAdmin from './UsuarioAdmin.vue'
import ProducaoAdmin from './ProducaoAdmin.vue'
import Header from '../template/Header.vue'
import {mapGetters} from 'vuex'

export default {
    name: 'AdminPages',
    components: { Header, PageTitle, PedidosAdmin, ClientesAdmin, ProdutosAdmin, UsuarioAdmin, ProducaoAdmin },
    computed: {
        ...mapGetters(['user'])},
    methods: {
       
    }
    
}
</script>

<style>

</style>