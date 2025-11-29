<template>
  <div class="admin-container">
    <h1>Solicitações Recebidas</h1>

    <div class="filters">
      <BaseInput
        v-model="search"
        label="Buscar por nome"
      />

      <BaseSelect
        v-model="filterArea"
        label="Área do Direito"
        :options="areaOptions"
      />
    </div>

    <table class="admin-table">
      <thead>
        <tr>
          <th>Nome</th>
          <th>Área</th>
          <th>Data</th>
          <th>Anexos</th>
          <th></th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="item in filtered"
          :key="item.id"
        >
          <td>{{ item.data.nome }}</td>
          <td>{{ item.data.areaDireito }}</td>
          <td>{{ formatDate(item.createdAt) }}</td>
          <td>{{ item.documentos.length }}</td>
          <td>
            <RouterLink
              :to="`/admin/${item.id}`"
              class="btn btn-sm"
            >
              Ver
            </RouterLink>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import BaseInput from '@/components/form/BaseInput.vue';
import BaseSelect from '@/components/form/BaseSelect.vue';

const API_URL = 'https://app-pro-bono.onrender.com';

const list = ref([]);
const search = ref('');
const filterArea = ref('');

const areaOptions = [
  '',
  'Família (Pensão, Divórcio, Guarda)',
  'Trabalhista',
  'Consumidor',
  'Cível (Dívidas, Contratos)',
  'Previdenciário (INSS)',
  'Não sei / Outro',
];

onMounted(async () => {
  const { data } = await axios.get(`${API_URL}/api/submissions`);
  list.value = data.reverse(); // mais recentes primeiro
});

const filtered = computed(() => {
  return list.value.filter((item) => {
    const matchesSearch = item.data.nome.toLowerCase().includes(search.value.toLowerCase());

    const matchesArea = filterArea.value === '' || item.data.areaDireito === filterArea.value;

    return matchesSearch && matchesArea;
  });
});

function formatDate(d) {
  return new Date(d).toLocaleString('pt-BR');
}
</script>

<style scoped>
.admin-container {
  padding: 2rem;
}
.admin-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}
.admin-table th,
.admin-table td {
  padding: 0.7rem;
  border-bottom: 1px solid #ddd;
}
.filters {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}
.btn-sm {
  padding: 0.3rem 0.6rem;
}

.admin-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
  table-layout: fixed; /* 💥 Força todas as colunas a terem largura consistente */
}

.admin-table th,
.admin-table td {
  padding: 0.7rem;
  border-bottom: 1px solid #ddd;
  text-align: left; /* Alinha tudo certinho */
  white-space: nowrap; /* Evita quebrar texto */
  overflow: hidden;
  text-overflow: ellipsis; /* Se ficar grande, coloca "..." */
}

/* Define larguras consistentes por coluna */
.admin-table th:nth-child(1),
.admin-table td:nth-child(1) {
  width: 25%;
}

.admin-table th:nth-child(2),
.admin-table td:nth-child(2) {
  width: 25%;
}

.admin-table th:nth-child(3),
.admin-table td:nth-child(3) {
  width: 25%;
}

.admin-table th:nth-child(4),
.admin-table td:nth-child(4) {
  width: 10%;
  text-align: center;
}

.admin-table th:nth-child(5),
.admin-table td:nth-child(5) {
  width: 15%;
  text-align: center;
}
</style>
