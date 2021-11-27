import Vue from 'vue'
import Toasted from 'vue-toasted'


Vue.use(Toasted, {
    iconPack: 'fontawesome',
    duration: 3000
})

Vue.toasted.register(
    'defaultSuccess',
    payload => !payload.msg ? 'Operação realizada com sucesso!' : payload.msg,
    { type: 'success', icon: 'check' }
)

Vue.toasted.register(
    'defaultError',
    payload => !payload.msg ? 'Oops.. Erro inesperado.' : payload.msg,
    { type : 'error', icon : 'times' }
)

Vue.toasted.register(
    'semCliente',
    payload => !payload.msg ? 'Oops.. Esqueceu do cliente!!.' : payload.msg,
    { type : 'error', icon : 'times' }
)

Vue.toasted.register(
    'dataInvalida',
    payload => !payload.msg ? 'Oops.. Data inválida!! Data de Entrega anterior a Data de hoje.' : payload.msg,
    { type : 'error', icon : 'times' }
)
