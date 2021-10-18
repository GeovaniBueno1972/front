<template>
    <div class="user-dropdown">
        <div class="user-button">
            <span class="d-nome">{{user.name}}</span>
        </div>
        <div class="user-dropdown-content">
            <router-link to="/admin"> Administração </router-link>
            <a href @click.prevent="logout">Sair</a>
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex'
import {chave} from '@/global'

export default {
    name: 'UserDropdown',
    computed: mapState(['user']),
    methods: {
        logout(){
            localStorage.removeItem(chave)
            this.$store.commit('setUser', null)
            this.$router.push({name: 'auth'})
        }
    }
}
</script>

<style>
.user-dropdown{
    position: relative;
    height: 100%;
    padding-top: 20px;
}
.user-button{
    display: flex;
    align-items: center;
    color: #fff;
    padding: 0px 20px;
}

.user-dropdown:hover {
    background-color: rgba(0,0,0,0.2);
}

.user-dropdown-content{
    position: absolute;
    right: 0px;
    background-color: #f9f9f9;
    min-width: 170px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    padding: 10px;
    z-index: 1;

    display: flex;
    flex-direction: column;
    flex-wrap: wrap;

    visibility: hidden;
    opacity: 0;
    transition: visibility 0s, opacity 0.5s linear;
}

.user-dropdown:hover .user-dropdown-content{
    visibility: visible;
    opacity: 1;
}

.user-dropdown-content a{
    text-decoration: none;
    color: #000;
    padding: 10px; 
}

.user-dropdown-content a:hover{
    text-decoration: none;
    color: #000;
    background-color: #ededed;
}
</style>