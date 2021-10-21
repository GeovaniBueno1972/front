<template>
	<div id="app">
		<Header title="Gerenciamento de Produção"
		:hideUserDropdown="!user"/>
		<Content />
		<Footer />
	</div>
</template>

<script>
import {mapGetters} from 'vuex'
import Header from "./components/template/Header.vue"
import Content from "./components/template/Content.vue"
import Footer from "./components/template/Footer.vue"

export default {
	name: "App",
	components: {Header, Content, Footer},
	computed: {
		...mapGetters(['user'])}
}
</script>

<style>
	*{
		font-family: "Lato", sans-serif;
	}

	body{
		margin: 0;

	}

	#app {
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;

		height: 100vh;
		display: grid;
		grid-template-rows: 70px 1fr 40px;
		grid-template-areas: 
		"header"
		"content"
		"footer";
	}
</style>