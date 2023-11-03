<template>
  <div class="menu">
    <h1>Menu Inicial</h1>

    <!-- Seção para Alterar login -->
    <div class="menu-section">
      <label for="novoLogin">Novo login:</label>
      <input
        type="text"
        id="novoLogin"
        v-model="novoLogin"
        class="menu-input"
      />
      <button @click="alterarLogin" class="menu-button">
        Alterar meu login
      </button>
    </div>

    <!-- Seção para Listar Nomes de Alunos -->
    <div class="menu-section">
      <button @click="listarNomesAlunos" class="menu-button">
        {{ mostrarNomesAlunos ? "Esconder Alunos" : "Listar Alunos" }}
      </button>
      <ul v-if="mostrarNomesAlunos">
        <li v-for="nome in nomesAlunos" :key="nome">{{ nome }}</li>
      </ul>
    </div>

    <!-- Seção para Deletar Usuário -->
    <div class="menu-section">
      <button @click="deletarUsuario" class="menu-button">
        Deletar usuário
      </button>
    </div>
    <!-- Botão de Logout -->
    <div class="menu-section">
      <button @click="efetuarLogout" class="menu-button">Logout</button>
    </div>
  </div>
</template>


<script>
import axios from "axios";

export default {
  created() {
    if (!this.verificarUsuarioLogado()) {
      this.$router.push("/");
    }
  },
  data() {
    return {
      novoLogin: "",
      mostrarNomesAlunos: false,
      nomesAlunos: [],
    };
  },
  methods: {
    verificarUsuarioLogado() {
      const usuarioLogado = localStorage.getItem("usuarioLogado");

      return !!usuarioLogado;
    },

    async listarNomesAlunos() {
      this.mostrarNomesAlunos = !this.mostrarNomesAlunos;

      if (this.mostrarNomesAlunos) {
        try {
          const response = await axios.get(
            "http://localhost:3000/users?grupo=aluno"
          );
          this.nomesAlunos = response.data.map((usuario) => usuario.nome);
        } catch (error) {
          console.error("Erro ao listar os nomes dos alunos:", error);
        }
      }
    },

    async alterarLogin() {
      const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

      if (!usuarioLogado) {
        console.error("Usuário logado não encontrado no localStorage.");
        return;
      }

      if (usuarioLogado.login === "admin") {
        alert('Usuário "admin" não pode alterar o login.');
        return;
      }

      const usuarioId = usuarioLogado.id;

      try {
        await axios.patch(`http://localhost:3000/users/${usuarioId}`, {
          login: this.novoLogin,
        });

        usuarioLogado.login = this.novoLogin;
        localStorage.setItem("usuarioLogado", JSON.stringify(usuarioLogado));

        alert("Login alterado com sucesso.");
        this.novoLogin = "";
      } catch (error) {
        console.error("Erro ao alterar o login:", error);
      }
    },

    async deletarUsuario() {
      const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

      if (!usuarioLogado) {
        console.error("Usuário logado não encontrado no localStorage.");
        return;
      }

      if (usuarioLogado.login === "admin") {
        alert('Usuário "admin" não pode ser deletado.');
        return;
      }

      const usuarioId = usuarioLogado.id;

      try {
        await axios.delete(`http://localhost:3000/users/${usuarioId}`);
        localStorage.removeItem("usuarioLogado");
        localStorage.removeItem("usuarioLogadoId");

        alert("Usuário deletado com sucesso.");

        this.$router.push("/");
      } catch (error) {
        console.error("Erro ao excluir o usuário:", error);
      }
    },

    efetuarLogout() {
      localStorage.removeItem("usuarioLogado");
      this.$router.push("/");
    },
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
  background-color: #cf9fff;
}

h1 {
  font-size: 36px;
  color: #682da4;
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
  width: 250px;
  height: 50px;
  background: #682da4;
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