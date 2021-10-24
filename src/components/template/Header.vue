<template>
  <header class="header">
      <h1 class="title">
         <router-link to='/home'> {{ title }}</router-link>
      </h1>
      <UserDropdown v-if="!hideUserDropdown" />
      <div id="menu">
          <router-link to = '/pedidos' >Lançar Pedidos </router-link>
      </div>
      
  </header>
</template>

<script>
import UserDropdown from './UserDropdown.vue'

export default {
    name: 'Header',
    components: {UserDropdown},
    props: {
        title: String,
        hideUserDropdown: Boolean
    }
}
</script>

<style>
    .header{
        grid-area: header;
        background: blue;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .title {
        font-size: 1.2rem;
        color: #fff;
        font-weight: 100;
        flex-grow: 1;
        text-align: center;
        }

    .title a{
        color: #fff;
        text-decoration: none;
    }

    #menu a{
        padding: 5px;
        background: #c5c5c5;
        color: #fff;
        margin-bottom: 0%;
    }
</style>