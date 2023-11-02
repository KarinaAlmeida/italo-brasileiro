<template>
  <div class="menu">
    <h1>Menu Inicial</h1>

     <!-- Seção para Listar Nomes de Alunos -->
    <div class="menu-section">
      <button @click="listarNomesAlunos" class="menu-button">Listar Nomes de Alunos</button>
      <ul>
        <li v-for="nome in nomesAlunos" :key="nome">{{ nome }}</li>
      </ul>
    </div>


    <!-- Seção para Alterar E-mail -->
    <div class="menu-section">
      <label for="novoEmail">Novo E-mail:</label>
      <input type="text" id="novoEmail" v-model="novoEmail" class="menu-input" />
      <button @click="alterarEmail" class="menu-button">Alterar E-mail</button>
    </div>

    <!-- Seção para Deletar Usuário -->
    <div class="menu-section">
      <label for="usuarioParaDeletar">ID do Usuário a Deletar:</label>
      <input type="text" id="usuarioParaDeletar" v-model="idUsuarioParaDeletar" class="menu-input" />
      <button @click="deletarUsuario" class="menu-button">Deletar Usuário</button>
    </div>
  </div>
</template>


<script>
import axios from 'axios';

export default {
  data() {
    return {
      novoEmail: '',
    };
  },
  methods: {
    async listarNomesAlunos() {
      // Realize a chamada para o servidor para atualizar o e-mail do usuário
      try {
        const response = await axios.put('URL_DO_SEU_ENDPOINT', { novoEmail: this.novoEmail });
        // Se a atualização for bem-sucedida, atualize a interface do usuário e limpe o campo de novo e-mail
        // Você pode adicionar feedback ao usuário, como uma mensagem de sucesso ou erro.
        console.log('E-mail atualizado com sucesso:', response.data);
        this.novoEmail = '';
      } catch (error) {
        console.error('Erro ao atualizar o e-mail:', error);
        // Lidar com erros, mostrar mensagens de erro, etc.
      }
    },

    async alterarEmail() {

    },

    async deletarUsuario() {

    }
  },
};
</script>

<style scoped>
.menu {
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

.menu-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.menu-input {
  width: 100%;
  height: 40px;
  border-radius: 6px;
  font-size: 20px;
  padding: 10px;
  border: 2px solid;
  box-sizing: border-box;
  margin-bottom: 10px;
}

.menu-button {
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

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

li {
  font-size: 20px;
}

a {
  cursor: pointer;
}
</style>