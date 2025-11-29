<template>
  <div class="home-view container">
    <section class="hero">
      <h1>Acesso à Justiça para Todos</h1>
      <p class="subtitle">Nosso compromisso é oferecer suporte jurídico qualificado e gratuito para quem mais precisa. Entenda como funciona e veja se você se qualifica.</p>
      <RouterLink to="/cadastro" class="btn">Solicite Atendimento Gratuito</RouterLink>
    </section>

    <section class="info-cards">
      <div class="card">
        <h3>O que é Pro Bono?</h3>
        <p>"Pro bono" vem do latim e significa "para o bem". Na advocacia, refere-se a serviços jurídicos prestados de forma voluntária e gratuita para pessoas e organizações que não podem arcar com os custos.</p>
      </div>
      <div class="card">
        <h3>Como Funciona?</h3>
        <p>Você preenche nosso formulário de solicitação. Nossa equipe analisa as informações para verificar a elegibilidade e a viabilidade do caso. Se aprovado, entramos em contato para iniciar o atendimento.</p>
      </div>
      <div class="card">
        <h3>Sobre o Escritório</h3>
        <p>Somos um escritório de advocacia com forte atuação social na comunidade de Erechim-RS, dedicado a garantir que os direitos de todos sejam defendidos, independentemente de sua condição financeira.</p>
      </div>
    </section>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router';
</script>

<style scoped>
.hero {
  text-align: center;
  padding: 4rem 0;
  background-color: #fff;
  border-radius: 8px;
  margin-bottom: 2rem;
}
.subtitle {
  max-width: 600px;
  margin: 0 auto 2rem auto;
  font-size: 1.1rem;
  color: #555;
}
.info-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}
.card {
  background-color: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
}
.card h3 {
  margin-top: 0;
}
</style>
