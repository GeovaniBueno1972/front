<template>
  <div class="auth-content">
      <div class="auth-modal">
            
            <hr>
            <div class="auth-title"> {{showSignup ? 'Cadastro' : 'Login'}} </div>

            <input v-model="user.name" type="text" placeholder="Nome">
            
            
            <input v-model="user.password" type="password" placeholder="Senha" >
            
            
            <button  @click="signIn"> Entrar</button>

            
        </div>
  </div>
</template>

<script>
import {baseApiUrl, showError, chave} from '@/global'

import axios from 'axios'

export default {
    name: 'Auth',
    
    data: function(){
        return{
            showSignup: false,
            user: {}
        }
    },
    methods: {
        signIn(){
            axios.post(`${baseApiUrl}/signin`, this.user)
            .then(res => {
                this.$store.commit('setUser', res.data)
                console.log(res.data)
                localStorage.removeItem(chave)
                localStorage.setItem(chave, JSON.stringify(res.data))
                this.$router.push({path: '/home'})
            })
            .catch(showError)
        },
        signUp(){
            axios.post(`${baseApiUrl}/signup`, this.user)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.user = {}
                    this.showSignup = false
                })
                .catch(showError)
        }
    }
}
</script>

<style>

    .auth-content {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .auth-modal {
        background-color: #f1962ef1;
        width: 350px;
        padding: 35px;
        box-shadow: 0 1px 5px rgba(0,0,0,0.15);

        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .auth-title{
        font-size: 1.2rem;
        font-weight: 100;
        margin-top: 10px;
        margin-bottom: 15px;
    }

    .auth-modal input, select{
        border: 1px solid #bbb;
        width: 100%;
        margin-bottom: 15px;
        padding: 3px 8px;
        outline: none;
    }

    .auth-modal button {
        align-self: flex-end;
        background-color: #2460ae;
        color: #fff;
        padding: 5px 15px;
    }

    .auth-modal a {
        padding-top: 35px;
    }

    .auth-modal hr {
        border: 0;
        width: 100%;
        height: 1px;
        background-image: linear-gradient(to right,
            rgba(120, 120, 120, 0),
            rgba(120, 120, 120, 0.75),
            rgba(120, 120, 120, 0));
    }
</style>