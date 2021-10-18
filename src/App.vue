<template>
	<div id="app">
		<Content />
	</div>
</template>

<script>
import Content from "./components/template/Content.vue"
export default {
	name: "App",
	components: {Content}
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