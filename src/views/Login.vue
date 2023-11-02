<template>
  <div class="login">
    <h1>Login</h1>
    <form @submit.prevent="efetuarLogin">
      <div>
        <label for="login">Login:</label>
        <input type="text" id="login" v-model="credenciais.login" required>
      </div>
      <div>
        <label for="senha">Senha:</label>
        <input type="password" id="senha" v-model="credenciais.senha" required>
      </div>
      <button type="submit">Entrar</button>
    </form>
    <p v-if="mensagemErro">{{ mensagemErro }}</p>
     <a @click="redirecionarParaCadastro" class="link-cadastro">Não tem conta? Cadastre-se</a>

  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      credenciais: {
        login: '',
        senha: ''
      },
      mensagemErro: ''
    };
  },
  methods: {
    efetuarLogin() {
    
      const url = 'http://localhost:3000/users';

      
      const { login, senha } = this.credenciais;
      
      axios.get(url)
        .then(response => {
          const usuarios = response.data;
          const usuarioEncontrado = usuarios.find(user => user.login === login && user.senha === senha);

          if (usuarioEncontrado) {
            
            this.$router.push('/menu');
          } else {
            this.mensagemErro = 'Algo está errado. Verifique seu login e senha.';
          }
        })
        .catch(error => {
          console.error('Erro ao obter usuários:', error);
          this.mensagemErro = 'Ocorreu um erro durante o login.';
        });
    },
     redirecionarParaCadastro() {
      this.$router.push('/cadastro');
    }
  }
};
</script>

<style scoped>
.login {
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

input {
  width: 100%;
  height: 40px;
  border-radius: 6px;
  font-size: 20px;
  padding: 10px;
  border: 2px solid;
  box-sizing: border-box;
  margin-bottom: 10px;
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