<template>
    <div class="pagina">
        
        <div class="corpo">
            <MatPedido />
        </div>
        
        
    </div>
</template>

<script>
import MatPedido from '../admin/MatPedido.vue'
export default {
    name: 'PedidoView',
    components: {MatPedido}
}
</script>

<style>
.pagina{
    display: grid;
    grid-template-rows: 100px 1fr ;
    height: 100%;
    position: relative;
}
.cabecalho{
    border: 1px solid red;
}
.corpo{
    border: 1px solid blue;
    
    height: 100%;
}
.base{
    border: 1px solid red;
    height: 20px;
    width: 100%;
    position: absolute;
    bottom: 0;
}

</style>