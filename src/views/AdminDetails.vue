<template>
  <div class="details">
    <h1>Detalhes da Solicitação</h1>

    <div class="actions">
      <button
        class="btn"
        @click="$router.back()"
      >
        ← Voltar
      </button>
      <button
        class="btn btn-primary"
        @click="exportPDF"
      >
        📄 Exportar PDF
      </button>
    </div>

    <div
      v-if="item"
      class="card"
    >
      <h2>{{ item.data.nome }}</h2>
      <p><strong>CPF:</strong> {{ item.data.cpf }}</p>
      <p><strong>Nascimento:</strong> {{ item.data.dataNascimento }}</p>

      <h3>Contato</h3>
      <p><strong>Telefone:</strong> {{ item.data.telefonePrincipal }}</p>
      <p><strong>Email:</strong> {{ item.data.email }}</p>

      <h3>Endereço</h3>
      <p>{{ item.data.rua }}, {{ item.data.numero }}</p>
      <p>{{ item.data.bairro }} – {{ item.data.cidade }}</p>
      <p>CEP: {{ item.data.cep }}</p>

      <h3>Análise Socioeconômica</h3>
      <p><strong>Renda Familiar:</strong> {{ item.data.rendaFamiliar }}</p>
      <p><strong>Dependentes:</strong> {{ item.data.dependentes }}</p>
      <p><strong>Benefício Governo:</strong> {{ item.data.beneficioGoverno }}</p>

      <h3>Resumo do Caso</h3>
      <p>{{ item.data.resumoCaso }}</p>

      <h3>Anexos</h3>
      <ul v-if="item.documentos.length > 0">
        <li
          v-for="doc in item.documentos"
          :key="doc"
        >
          <a
            :href="`${API_URL}/api/files/${doc}`"
            target="_blank"
            >📄 {{ doc }}</a
          >
        </li>
      </ul>
      <p v-else>Nenhum documento enviado.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { jsPDF } from 'jspdf';
import axios from 'axios';
import { useRoute } from 'vue-router';

const API_URL = 'https://app-pro-bono.onrender.com';

const item = ref(null);
const route = useRoute();

onMounted(async () => {
  const { data } = await axios.get(`${API_URL}/api/submissions/${route.params.id}`);
  item.value = data;
});

// -------------------------
//     EXPORTAR PDF
// -------------------------
async function exportPDF() {
  const pdf = new jsPDF({ unit: 'pt', format: 'a4' });

  const margin = 40;
  let y = margin;

  function title(text) {
    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'bold');
    pdf.text(text, margin, y);
    y += 24;
  }

  function section(text) {
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text(text, margin, y);
    y += 18;
  }

  function line(text) {
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'normal');
    pdf.text(text, margin, y);
    y += 16;
  }

  // ---------------------------------------------------------
  // ---------------------------------------------------------
  pdf.setFontSize(20);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Rigon e Fassina Advogados Associados', margin, y);
  y += 26;

  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'normal');
  pdf.text('Atendimento Jurídico Pro Bono', margin, y);
  y += 18;

  pdf.text('Nosso compromisso é garantir acesso à justiça para todos,', margin, y);
  y += 16;
  pdf.text('especialmente para aqueles que não possuem condições financeiras.', margin, y);
  y += 22;

  pdf.setDrawColor(180);
  pdf.line(margin, y, 550, y);
  y += 28;

  // ---------------------------------------------------------
  // ---------------------------------------------------------
  title('Informações da Solicitação');

  line(`ID Interno: ${item.value.id}`);
  line(`Recebido em: ${new Date(item.value.createdAt).toLocaleString('pt-BR')}`);

  y += 10;

  // ---------------------------------------------------------
  section('1. Informações Pessoais');
  line(`Nome: ${item.value.data.nome}`);
  line(`CPF: ${item.value.data.cpf}`);
  line(`Nascimento: ${item.value.data.dataNascimento}`);

  y += 10;

  // ---------------------------------------------------------
  section('2. Endereço');
  line(`${item.value.data.rua}, ${item.value.data.numero}`);
  line(`${item.value.data.bairro} – ${item.value.data.cidade}`);
  line(`CEP: ${item.value.data.cep}`);
  y += 10;

  // ---------------------------------------------------------
  section('3. Contato');
  line(`Telefone: ${item.value.data.telefonePrincipal}`);
  line(`Email: ${item.value.data.email || 'Não informado'}`);

  y += 10;

  // ---------------------------------------------------------
  section('4. Análise Socioeconômica');
  line(`Renda Familiar: ${item.value.data.rendaFamiliar}`);
  line(`Dependentes: ${item.value.data.dependentes}`);
  line(`Benefício do Governo: ${item.value.data.beneficioGoverno}`);

  y += 10;

  // ---------------------------------------------------------
  section('5. Área do Direito e Resumo do Caso');
  line(`Área: ${item.value.data.areaDireito}`);

  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'normal');

  const wrapped = pdf.splitTextToSize(item.value.data.resumoCaso, 500);
  pdf.text(wrapped, margin, y);
  y += wrapped.length * 14 + 10;

  // ---------------------------------------------------------
  section('6. Documentos Anexados');

  if (item.value.documentos.length === 0) {
    line('Nenhum documento enviado.');
  } else {
    item.value.documentos.forEach((doc) => {
      line(`• ${doc}`);
    });
  }

  y += 30;

  // ---------------------------------------------------------
  // ---------------------------------------------------------
  pdf.setFontSize(10);
  pdf.setTextColor(120);
  pdf.text('Documento gerado automaticamente pelo Sistema Pro Bono – Erechim/RS', margin, 815);

  pdf.text(`Página 1 de 1`, 500, 815);

  // ---------------------------------------------------------
  // SALVAR PDF
  // ---------------------------------------------------------
  pdf.save(`solicitacao-${item.value.id}.pdf`);
}
</script>

<style scoped>
.card {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  margin-top: 1rem;
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.08);
}
.details {
  padding: 2rem;
}
.actions {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}
</style>
