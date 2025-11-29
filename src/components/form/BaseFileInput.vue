<template>
  <div class="form-group">
    <label>{{ label }}</label>
    <div class="file-input-container">
      <input
        type="file"
        ref="fileInputRef"
        @change="handleFileChange"
        multiple
        accept="image/*,.pdf,.doc,.docx"
        class="file-input"
      />
      <button
        type="button"
        @click="triggerFileInput"
        class="btn btn-secondary"
      >
        Escolher Arquivos
      </button>
      <span class="file-info">{{ fileCountText }}</span>
    </div>
    <ul
      v-if="modelValue.length > 0"
      class="file-list"
    >
      <li
        v-for="(file, index) in modelValue"
        :key="index"
      >
        <span>{{ file.name }}</span>
        <button
          type="button"
          @click="removeFile(index)"
          class="remove-file-btn"
        >
          &times;
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  label: String,
  modelValue: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(['update:modelValue']);

const fileInputRef = ref(null);

const fileCountText = computed(() => {
  const count = props.modelValue.length;
  if (count === 0) return 'Nenhum arquivo selecionado';
  if (count === 1) return '1 arquivo selecionado';
  return `${count} arquivos selecionados`;
});

function triggerFileInput() {
  fileInputRef.value.click();
}

function handleFileChange(event) {
  const newFiles = Array.from(event.target.files);
  emit('update:modelValue', [...props.modelValue, ...newFiles]);
  // Limpa o input para permitir selecionar o mesmo arquivo novamente
  event.target.value = '';
}

function removeFile(index) {
  const updatedFiles = [...props.modelValue];
  updatedFiles.splice(index, 1);
  emit('update:modelValue', updatedFiles);
}
</script>

<style scoped>
.file-input-container {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.file-input {
  display: none;
}
.file-info {
  font-style: italic;
  color: #555;
}
.file-list {
  list-style-type: none;
  padding: 0;
  margin-top: 1rem;
}
.file-list li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f9f9f9;
  padding: 0.5rem;
  border-radius: 4px;
  margin-bottom: 0.5rem;
}
.remove-file-btn {
  background: none;
  border: none;
  color: #c62828;
  font-size: 1.5rem;
  cursor: pointer;
  line-height: 1;
}
</style>
