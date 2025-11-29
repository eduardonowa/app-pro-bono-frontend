<template>
  <div class="login-container">
    <h1>Painel Administrativo</h1>

    <form @submit.prevent="login">
      <BaseInput
        v-model="password"
        type="password"
        label="Senha de Administrador"
        required
      />

      <button class="btn btn-primary">Entrar</button>

      <p
        v-if="error"
        class="error"
      >
        Senha incorreta
      </p>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import BaseInput from '@/components/form/BaseInput.vue';

const password = ref('');
const error = ref(false);

function login() {
  const ADMIN_PASS = import.meta.env.VITE_ADMIN_PASS;

  if (password.value === ADMIN_PASS) {
    localStorage.setItem('admin-auth', 'true');
    return (window.location.href = '/admin');
  }

  error.value = true;
}
</script>

<style scoped>
.login-container {
  max-width: 360px;
  margin: 4rem auto;
}
.error {
  color: red;
  margin-top: 10px;
}
</style>
