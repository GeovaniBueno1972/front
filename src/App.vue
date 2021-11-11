<template>
	<div id="app">
		
		{{logado()}}
		<Content />
		<!--
		<Footer  />
		-->
	</div>
</template>

<script>
import {mapGetters} from 'vuex'

import Content from "./components/template/Content.vue"
//import Footer from "./components/template/Footer.vue"

export default {
	name: "App",
	components: { Content, },
	computed: {
		...mapGetters(['user'])},
	methods: {
		logado(){
			console.log(this.user)
		}
	}
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
		grid-template-rows: 1fr 40px;
		grid-template-areas: 
		"content"
		"footer";
	}
</style>