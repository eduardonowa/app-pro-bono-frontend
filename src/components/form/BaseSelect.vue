<template>
  <div class="form-group">
    <label :for="uuid">{{ label }}</label>
    <select
      :id="uuid"
      :value="modelValue"
      @change="$emit('update:modelValue', $event.target.value)"
      v-bind="$attrs"
    >
      <option disabled value="">Por favor, selecione uma opção</option>
      <option v-for="option in options" :key="option" :value="option">{{ option }}</option>
    </select>
  </div>
</template>

<script setup>
import { ref } from 'vue';
defineProps({
  label: String,
  modelValue: String,
  options: {
    type: Array,
    required: true
  }
});
defineEmits(['update:modelValue']);
const uuid = ref('select-' + Math.random().toString(36).substr(2, 9));
</script>

<style scoped>
.form-group {
  margin-bottom: 1rem;
}
label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
}
select {
  width: 100%;
  padding: 0.8rem;
  border: 1px solid var(--border-color);
  border-radius: 5px;
  font-size: 1rem;
  background-color: white;
}
</style>
