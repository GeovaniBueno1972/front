<template>
  <header class="header">
      <div class="titulo">
            <h1 class="title">
                <router-link to='/home'> {{ title }}</router-link>
            </h1>
            <div class="dropdown">
                <UserDropdown v-if="!hideUserDropdown" />
            </div>
            
      </div>
      
      <div id="navegacao">
          <ul>
            <li> 
                <span>
                    <router-link to='/home' class="link"> Home </router-link>
                </span>
            </li>
            <li v-if="user.funcao === 'vendedor'"> 
                
                <span>
                    {{user.funcao}}
                    <router-link to='/pedidos' class="link"> Pedidos </router-link>
                </span>
            </li>
            <li v-if="user.funcao === 'administracao'"> 
                <router-link to='/admin' class="link"> Administração </router-link>
            </li> 
            <li> 
                <router-link to='/' class="link"> Sair </router-link>
            </li>   
              
          </ul>
          
      </div>
      
  </header>
</template>

<script>
import UserDropdown from './UserDropdown.vue'
import {mapGetters} from 'vuex'

export default {
    name: 'Header',
    components: {UserDropdown},
    computed: {
        ...mapGetters(['user'])},
    props: {
        title: String,
        hideUserDropdown: Boolean
    }
}
</script>

<style>
    .header{
        
        background: blue;
        display: block;
        text-align: center;
    }
    .titulo{
        padding: 10px;
        height: 40px;
       
    }

    .title {
        font-size: 1.2rem;
        color: #fff;
        font-weight: 100;

      
        }

    .title a{
        color: #fff;
        text-decoration: none;
    }

    #navegacao {
        height: 30px;
        background: #ff9900;
        display: flex;
        padding: 5px;
    }

    ul {
        width: 100%;
        margin: 0 auto;
        
        padding: 0;
        list-style: none;
       
    }

    #navegacao ul{
        
        float: left;
    }

    #navegacao ul li{
        float: left;
    }
    .link{
        padding: 0 20px ;
        display: block;
        text-decoration: none;
        color: rgb(0, 0, 0);
        font-size: 0.9em;
    }
    .link:hover{
        background: coral;
        text-decoration: none;
    }
    .dropdown{
        float: right;
    }
</style>