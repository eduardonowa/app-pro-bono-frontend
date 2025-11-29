<template>
  <div class="form-group">
    <label :for="uuid">{{ label }}</label>
    <input
      :id="uuid"
      :type="type"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      v-bind="$attrs"
      v-maska
      :data-maska="mask"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';

defineProps({
  label: String,
  type: {
    type: String,
    default: 'text',
  },
  modelValue: [String, Number],
  mask: {
    type: [String, Array],
    default: null,
  },
  maxlength: [String, Number],
});

defineEmits(['update:modelValue']);

const uuid = ref('input-' + Math.random().toString(36).substr(2, 9));
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
input {
  width: 100%;
  padding: 0.8rem;
  border: 1px solid var(--border-color);
  border-radius: 5px;
  font-size: 1rem;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}
</style>
