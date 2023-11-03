<template>
  <div class="cadastro">
    <h1>Cadastro de Usuário</h1>
    <form @submit.prevent="cadastrarUsuario">
      <div>
        <label for="nome">Nome:</label>
        <input type="text" id="nome" v-model="novoUsuario.nome" required>
      </div>
      <div>
        <label for="login">Login:</label>
        <input type="text" id="login" v-model="novoUsuario.login" required>
      </div>
      <div>
        <label for="senha">Senha:</label>
        <input type="password" id="senha" v-model="novoUsuario.senha" required>
      </div>
       <div class="grupo-input">
        <label for="grupo">Grupo:</label>
        <select id="grupo" v-model="novoUsuario.grupo" required>
          <option value="aluno">Aluno</option>
          <option value="professor">Professor</option>
        </select>
      </div>
      <button type="submit">Cadastrar</button>
    </form>
    <p v-if="mensagemErro">{{ mensagemErro }}</p>
    <a @click="redirecionarParaLogin" class="link-cadastro">Já tem conta? Logue aqui</a>
  </div>
</template>

<script>
import axios from 'axios';


export default {
  data() {
    return {
      novoUsuario: {
        nome: '',
        login: '',
        senha: '',
        grupo: ''
      },
      mensagemErro: ''
    };
  },
  methods: {
    async cadastrarUsuario() {
      const usuarioExistente = await this.verificarUsuarioExistente(this.novoUsuario.login);
      if (usuarioExistente) {
        this.mensagemErro = 'O login já está em uso.';
        return;
      }

     
      axios.post('http://localhost:3000/users', this.novoUsuario)
        .then(response => {
          console.log('Novo usuário cadastrado:', response.data);
          this.mensagemErro = ''; 
          this.novoUsuario = {
            nome: '',
            login: '',
            senha: '',
            grupo: ''
          };
           this.$router.push('/');

        })
        .catch(error => {
          console.error('Erro ao cadastrar usuário:', error);
          this.mensagemErro = 'Ocorreu um erro durante o cadastro.';
        });
    },
    verificarUsuarioExistente(login) {
      return axios.get('http://localhost:3000/users?login=' + login)
        .then(response => response.data.length > 0)
        .catch(error => {
          console.error('Erro ao verificar usuário existente:', error);
          return false;
        });
    },
    redirecionarParaLogin() {
      this.$router.push('/');
    }
  }
};
</script>

<style scoped>
.cadastro {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  font-family: "Oswald", sans-serif;
  font-weight: 700;
  gap: 10px;
  background-color: #CF9FFF;
}

h1 {
  font-size: 36px;
  color: #682DA4;
}

label {
  font-size: 24px;
}

input, select {
  width: 100%;
  height: 40px;
  border-radius: 6px;
  font-size: 20px;
  padding: 10px;
  border: 2px solid;
  box-sizing: border-box;
  margin-bottom: 10px;
}

.grupo-input {
  text-align: left;
}

button {
  width: 100%;
  height: 50px;
  background: #682DA4;
  border-radius: 6px;
  font-weight: 700;
  font-size: 24px;
  color: #ffffff;
  border: none;
  cursor: pointer;
}

p {
  color: red;
  font-size: 18px;
  margin-top: 10px;
}
a {
  cursor: pointer;
}
</style>