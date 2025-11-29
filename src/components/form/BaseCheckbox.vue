<template>
  <div class="form-group-checkbox">
    <input
      :id="uuid"
      type="checkbox"
      :checked="modelValue"
      @change="$emit('update:modelValue', $event.target.checked)"
      v-bind="$attrs"
    >
    <label :for="uuid">{{ label }}</label>
  </div>
</template>

<script setup>
import { ref } from 'vue';
defineProps({
  label: String,
  modelValue: Boolean
});
defineEmits(['update:modelValue']);
const uuid = ref('checkbox-' + Math.random().toString(36).substr(2, 9));
</script>

<style scoped>
.form-group-checkbox {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}
input[type="checkbox"] {
  margin-right: 0.75rem;
  width: 18px;
  height: 18px;
}
label {
  font-weight: normal;
}
</style>
