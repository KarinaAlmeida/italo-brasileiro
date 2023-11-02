import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
const dbName = 'MeuBancoDeDados';
const storeName = 'usuarios';

const request = indexedDB.open(dbName, 1);

request.onupgradeneeded = (event) => {
  const db = event.target.result;
  if (!db.objectStoreNames.contains(storeName)) {
    const objectStore = db.createObjectStore(storeName, { keyPath: 'login' });
    objectStore.createIndex('nome', 'nome', { unique: false });
    objectStore.createIndex('grupo', 'grupo', { unique: false });
  }
};

request.onsuccess = (event) => {
  const db = event.target.result;

  createApp(App).use(router).provide('db', db).mount('#app');
};

request.onerror = (event) => {
  console.error('Erro ao abrir o banco de dados', event.target.error);
};