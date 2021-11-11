<template>
    <div class="card-pedido">
        <div class="numero">
            <h3>{{numero}}</h3>
        </div>
        <div class="data">
            <h3>{{convertData(data)}}</h3>
        </div>
        <div class="nome">
            <h3>{{nome}}</h3>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CardPedido',
    props: ['numero', 'data', 'nome'],
    methods:{
        convertData(dataInput){
                let data = new Date(dataInput);
                let dataFormatada = data.toLocaleDateString('pt-BR', {timeZone: 'UTC'});
                return dataFormatada
        }
    }
}
</script>

<style>

</style>