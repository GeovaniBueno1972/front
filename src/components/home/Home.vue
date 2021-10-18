<template>
    <div class="home">
        <h1>Tela inicial</h1>
        <a href="/admin">Tela de Administração</a>
        <a href="/">Sair</a>
        <Content />
        <Footer />
    </div>
</template>

<script>
import Content from '../template/Content.vue'
import Footer from '../template/Footer.vue'
export default {
    name: 'Home',
    components: {Content, Footer}
}
</script>

<style>

</style>