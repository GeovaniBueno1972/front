<template>
  <div class="usuario-admin">
      <b-form>
          <input id="user-id" type="hidden" v-model="user.id">
          <b-row>
              <b-col md="6" sm="12">
                  <b-form-group label="Nome:" label-for="user-name">
                      <b-form-input id="user-name" type="text"
                        v-model="user.name" required
                        placeholder="Informe o Nome do Usuário..." />
                  </b-form-group>
              </b-col>
              <b-col md="6" sm="12">
                  <b-form-group label="Função:" label-for="user-funcao">
                      <b-form-input id="user-funcao" type="text"
                        v-model="user.funcao" required
                        placeholder="Informe a Função do Usuário..." />
                  </b-form-group>
              </b-col>
          </b-row>
          <b-row>
              <b-col md="6" sm="12">
                  <b-form-group label="Senha:" label-for="user-password">
                      <b-form-input id="user-password" type="password"
                        v-model="user.password" required
                        placeholder="Informe a Senha do Usuário..." />
                  </b-form-group>
              </b-col>
              <b-col md="6" sm="12">
                  <b-form-group label="Confirmação da Senha:" label-for="user-confirmPassword">
                      <b-form-input id="user-confirmPassword" type="password"
                        v-model="user.confirmPassword" required
                        placeholder="Confirme a Senha do Usuário..." />
                  </b-form-group>
              </b-col>
          </b-row>
          <b-button variant="primary" v-if="mode === 'save'"
            @click="save">Salvar</b-button>
          <b-button variant="danger" v-if="mode === 'remove'"
            @click="remove">Salvar</b-button>
          <b-button class="ml-2" @click="reset">Cancelar</b-button>
      </b-form>
      <hr>
      <b-table hover small striped :items="users" :fields="fields">
          <template :slot="actions" slot-scope="data"> 
              <b-button variant="warning" @click="loadUser(data.item)" class="mr-2">
                  <i class="fa fa-pencil"></i>
              </b-button>
              <b-button variant="danger" @click="loadUser(data.item, 'remove')">
                  <i class="fa fa-trash"></i>
              </b-button>
          </template>
      </b-table>
  </div>
</template>

<script>
import {baseApiUrl, showError} from '@/global'
import axios from 'axios'

export default {
    name: 'UsuarioAdmin',
    data: function(){
        return {
            mode: 'save',
            user: {},
            users: [],
            fields: [
                {key: 'id', label: 'Código', sortable: true},
                {key: 'name', label: 'Nome', sortable: true},
                {key: 'funcao', label: 'Função'},
                {key: 'actions', label: 'Ações'}
            ]
        }
    }, 
    methods: {
        loadUsers(){
            const url = `${baseApiUrl}/users`
            axios.get(url).then(res => {
                this.users = res.data
            })
        }, 
        reset(){
            this.mode = 'save'
            this.user = {}
            this.loadUsers()
        },
        save(){
            const method = this.user.id ? 'put' : 'post'
            const id = this.user.id ? `/${this.user.id}` : ''
            axios[method](`${baseApiUrl}/users${id}`, this.user)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                })
                .catch(showError)

        },
        remove(){
            const id = this.user.id
            axios.delete(`${baseApiUrl}/users/${id}`)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                })
                .catch(showError)
        },
        loadUser(user, mode = 'save'){
            this.mode = mode
            this.user = {...user}
        }
    },
    mounted(){
        this.loadUsers()
    }
}
</script>

<style>

</style>