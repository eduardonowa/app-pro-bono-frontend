<template>
  <header>
    <div class="container header-content">
      <RouterLink
        to="/"
        class="logo-container"
      >
        <div class="logo-placeholder">Logo</div>
        <span class="logo-text">Rigon e Fassina Advogados Associados</span>
      </RouterLink>
      <nav>
        <RouterLink to="/">Início</RouterLink>
        <RouterLink to="/cadastro">Solicitar Atendimento</RouterLink>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { RouterLink } from 'vue-router';
</script>

<style scoped>
header {
  background-color: var(--primary-color);
  color: var(--light-text-color);
  padding: 1rem 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.logo-container {
  display: flex;
  align-items: center;
  gap: 1rem;
  color: var(--light-text-color);
  text-decoration: none; /* Garante que não haja sublinhado */
}
.logo-placeholder {
  width: 45px;
  height: 45px;
  background-color: #f0f0f0;
  color: #333;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  font-size: 0.8rem;
  font-weight: bold;
  flex-shrink: 0; /* Impede que o logo encolha */
}
.logo-text {
  font-size: 1.2rem;
  font-weight: bold;
}
nav a {
  color: var(--light-text-color);
  margin-left: 1.5rem;
  font-size: 1rem;
  transition: opacity 0.3s ease;
  white-space: nowrap; /* Impede que os links quebrem linha */
}
nav a:hover {
  opacity: 0.8;
}

/* ADICIONADO: Media Query para telas menores */
@media (max-width: 768px) {
  .header-content {
    flex-direction: column; /* Empilha o logo e a navegação */
    gap: 1rem;
  }

  .logo-text {
    font-size: 1rem; /* Reduz um pouco o texto do logo */
  }

  nav {
    width: 100%;
    display: flex;
    justify-content: center; /* Centraliza os links de navegação */
  }

  nav a {
    margin: 0 0.75rem; /* Ajusta as margens para centralização */
  }
}
</style>
