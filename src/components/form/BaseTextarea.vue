<template>
  <div class="form-group">
    <label :for="uuid">{{ label }}</label>
    <textarea
      :id="uuid"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      rows="5"
      v-bind="$attrs"
    ></textarea>
  </div>
</template>

<script setup>
import { ref } from 'vue';
defineProps({
  label: String,
  modelValue: String
});
defineEmits(['update:modelValue']);
const uuid = ref('textarea-' + Math.random().toString(36).substr(2, 9));
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
textarea {
  width: 100%;
  padding: 0.8rem;
  border: 1px solid var(--border-color);
  border-radius: 5px;
  font-size: 1rem;
  font-family: inherit;
}
</style>
