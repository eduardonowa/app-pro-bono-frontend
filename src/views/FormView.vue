<template>
  <div class="form-view container">
    <h1>Solicitação de Atendimento Pro Bono</h1>
    <p class="form-description">
      Preencha o formulário abaixo com o máximo de detalhes possível. Todas as informações são
      confidenciais e serão usadas exclusivamente para a análise do seu caso.
    </p>

    <form
      @submit.prevent="submitForm"
      :class="{ submitted: formSubmitted }"
      v-if="!submissionStatus"
      novalidate
    >
      <!-- Seção 1: Informações Pessoais -->
      <fieldset>
        <legend>1. Informações Pessoais</legend>
        <BaseInput
          v-model="formData.nome"
          label="Nome Completo"
          type="text"
          required
        />
        <BaseInput
          v-model="formData.cpf"
          label="CPF"
          type="text"
          mask="###.###.###-##"
          required
        />
        <BaseInput
          v-model="formData.dataNascimento"
          label="Data de Nascimento"
          type="date"
          required
        />
      </fieldset>

      <!-- Seção 1.5: Endereço -->
      <fieldset>
        <legend>1.5. Endereço</legend>
        <div class="address-grid">
          <BaseInput
            v-model="formData.cep"
            label="CEP"
            type="text"
            mask="#####-###"
            required
            class="cep-field"
          />
          <BaseInput
            v-model="formData.rua"
            label="Rua / Logradouro"
            type="text"
            required
            class="rua-field"
          />
          <BaseInput
            v-model="formData.numero"
            label="Número"
            type="text"
            required
            class="numero-field"
          />
          <BaseInput
            v-model="formData.bairro"
            label="Bairro"
            type="text"
            required
            class="bairro-field"
          />
          <BaseInput
            v-model="formData.cidade"
            label="Cidade e Estado"
            type="text"
            required
            class="cidade-field"
          />
        </div>
      </fieldset>

      <!-- Seção 2: Contato -->
      <fieldset>
        <legend>2. Informações de Contato</legend>
        <BaseInput
          v-model="formData.telefonePrincipal"
          label="Telefone Principal (com DDD)"
          type="tel"
          :mask="['(##) #####-####']"
          required
        />

        <BaseInput
          v-model="formData.email"
          label="E-mail (Opcional)"
          type="email"
        />
      </fieldset>

      <!-- Seção 3: Análise Socioeconômica -->
      <fieldset>
        <legend>3. Análise Socioeconômica</legend>
        <BaseSelect
          v-model="formData.rendaFamiliar"
          label="Renda Mensal Familiar"
          :options="rendaOptions"
          required
        />
        <BaseInput
          v-model="formData.dependentes"
          label="Quantas pessoas dependem desta renda?"
          type="number"
          min="1"
          required
        />
        <BaseSelect
          v-model="formData.beneficioGoverno"
          label="Recebe algum benefício do governo? (Ex: Bolsa Família)"
          :options="['Sim', 'Não']"
          required
        />
      </fieldset>

      <!-- Seção 4: Detalhes do Caso -->
      <fieldset>
        <legend>4. Detalhes do Caso</legend>
        <BaseSelect
          v-model="formData.areaDireito"
          label="Área do Direito"
          :options="areaDireitoOptions"
          required
        />
        <BaseInput
          v-model="formData.parteContrariaNome"
          label="Nome Completo da Parte Contrária (Pessoa ou Empresa)"
          type="text"
          required
        />
        <BaseInput
          v-model="formData.parteContrariaDoc"
          label="CPF ou CNPJ da Parte Contrária (se souber)"
          type="text"
          :mask="['###.###.###-##', '##.###.###/####-##']"
        />
        <BaseTextarea
          v-model="formData.resumoCaso"
          label="Resumo do seu problema"
          required
        />
      </fieldset>
      <!-- Seção 4.5: Documentos -->
      <fieldset>
        <legend>4.5. Documentos (Opcional)</legend>
        <p>
          Anexe cópias de documentos importantes para o caso (limite de 5 arquivos). Formatos
          aceitos: Imagens, PDF, Word.
        </p>
        <BaseFileInput
          v-model="formData.documentos"
          label="Anexar Documentos"
        />
      </fieldset>

      <!-- Seção 5: Termos e Consentimento -->
      <fieldset>
        <legend>5. Termos e Consentimento</legend>
        <BaseCheckbox
          v-model="formData.termosVeracidade"
          label="Declaro que todas as informações fornecidas são verdadeiras."
          required
        />
        <BaseCheckbox
          v-model="formData.termosCiencia"
          label="Entendo que o envio deste formulário é uma solicitação de análise e não garante o aceite do meu caso."
          required
        />
      </fieldset>

      <button
        type="submit"
        class="btn btn-primary"
        :disabled="isSubmitting"
      >
        {{ isSubmitting ? 'Enviando...' : 'Enviar Solicitação' }}
      </button>
    </form>

    <div
      v-if="submissionStatus"
      class="submission-feedback"
      :class="submissionStatus"
    >
      <h3>{{ feedbackMessage.title }}</h3>
      <p>{{ feedbackMessage.text }}</p>
      <RouterLink
        to="/"
        class="btn"
        v-if="submissionStatus === 'success'"
        >Voltar para o Início</RouterLink
      >
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue';
import axios from 'axios';
import { RouterLink } from 'vue-router';
import BaseInput from '@/components/form/BaseInput.vue';
import BaseSelect from '@/components/form/BaseSelect.vue';
import BaseTextarea from '@/components/form/BaseTextarea.vue';
import BaseCheckbox from '@/components/form/BaseCheckbox.vue';
import BaseFileInput from '@/components/form/BaseFileInput.vue';

const formSubmitted = ref(false);
const API_URL = 'https://app-pro-bono.onrender.com';

const formData = reactive({
  // Seção 1
  nome: '',
  cpf: '',
  dataNascimento: '',
  // Endereço
  cep: '',
  rua: '',
  numero: '',
  bairro: '',
  cidade: 'Erechim', // Valor padrão
  // Seção 2
  telefonePrincipal: '',
  email: '',
  // Seção 3
  rendaFamiliar: '',
  dependentes: '',
  beneficioGoverno: '',
  // Seção 4
  areaDireito: '',
  parteContrariaNome: '',
  parteContrariaDoc: '',
  resumoCaso: '',
  // Seção 5
  termosVeracidade: false,
  termosCiencia: false,
  documentos: [],
});

const rendaOptions = [
  'Até 1 salário mínimo',
  'Entre 1 e 2 salários mínimos',
  'Entre 2 e 3 salários mínimos',
  'Acima de 3 salários mínimos',
];
const areaDireitoOptions = [
  'Família (Pensão, Divórcio, Guarda)',
  'Trabalhista',
  'Consumidor',
  'Cível (Dívidas, Contratos)',
  'Previdenciário (INSS)',
  'Não sei / Outro',
];

const isSubmitting = ref(false);
const submissionStatus = ref(null);

const feedbackMessage = computed(() => {
  if (submissionStatus.value === 'success') {
    return {
      title: 'Solicitação Enviada com Sucesso!',
      text: 'Recebemos suas informações. Nossa equipe fará a análise e entrará em contato em breve. Obrigado!',
    };
  }
  if (submissionStatus.value === 'error') {
    return {
      title: 'Ocorreu um Erro',
      text: 'Não foi possível enviar sua solicitação. Por favor, verifique os campos e tente novamente.',
    };
  }
  return { title: '', text: '' };
});

async function submitForm(event) {
  formSubmitted.value = true;

  if (!formData.termosVeracidade || !formData.termosCiencia) {
    alert('Você precisa aceitar os termos para continuar.');
    return;
  }

  if (!event.target.checkValidity()) {
    return;
  }

  isSubmitting.value = true;
  submissionStatus.value = null;

  const data = new FormData();

  for (const key in formData) {
    if (key !== 'documentos') {
      data.append(key, formData[key]);
    }
  }

  for (const file of formData.documentos) {
    data.append('documentos', file);
  }

  try {
    const response = await axios.post(`${API_URL}/api/submissions`, data);

    if (response.status === 201) {
      submissionStatus.value = 'success';
    } else {
      submissionStatus.value = 'error';
    }
  } catch (error) {
    console.error('Erro ao enviar formulário:', error);
    submissionStatus.value = 'error';
  } finally {
    isSubmitting.value = false;
  }
}
</script>

<style scoped>
.form-view {
  max-width: 768px;
}
.form-description {
  margin-bottom: 2rem;
  color: #555;
  font-size: 1.1rem;
}
form {
  background-color: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}
fieldset {
  border: none;
  margin-bottom: 1.5rem;
  padding: 0;
}
legend {
  font-size: 1.2rem;
  font-weight: bold;
  color: var(--primary-color);
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid var(--border-color);
  width: 100%;
}
.address-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1rem;
  grid-template-areas:
    'cep rua rua'
    'numero bairro cidade';
}
.cep-field {
  grid-area: cep;
}
.rua-field {
  grid-area: rua;
}
.numero-field {
  grid-area: numero;
}
.bairro-field {
  grid-area: bairro;
}
.cidade-field {
  grid-area: cidade;
}

.submission-feedback {
  padding: 2rem;
  border-radius: 8px;
  text-align: center;
}
.submission-feedback.success {
  background-color: #e8f5e9;
  border: 1px solid var(--accent-color);
  color: #2e7d32;
}
.submission-feedback.error {
  background-color: #ffebee;
  border: 1px solid #c62828;
  color: #c62828;
}
.submission-feedback h3 {
  color: inherit;
}

/* ADICIONADO: Media Query para telas menores (celulares e tablets) */
@media (max-width: 768px) {
  form {
    padding: 1rem; /* Reduz o espaçamento interno do formulário */
  }

  .address-grid {
    grid-template-columns: 1fr; /* Transforma o grid em uma única coluna */
    grid-template-areas: none; /* Remove as áreas nomeadas */
  }

  /* Reseta a área de cada campo para que eles fluam naturalmente na coluna única */
  .cep-field,
  .rua-field,
  .numero-field,
  .bairro-field,
  .cidade-field {
    grid-area: auto;
  }

  legend {
    font-size: 1.1rem;
  }
}
</style>
