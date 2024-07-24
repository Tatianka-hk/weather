<template>
  <div class="modal-overlay">
    <div class="modal">
      <p>{{ $t('modals.limit-message') }}</p>
      <button @click="$emit('confirm')">OK</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'VsLimitExceededModal'
})
</script>

<style>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: white;
  padding: 20px;
  border-radius: 5px;
  text-align: center;
}
</style>
