<template>
  <div class="modal-overlay">
    <div class="modal">
      <p>{{ $t('modals.delete-message') }}</p>
      <div class="buttons">
        <button class="button-confirm" @click="$emit('confirm')">{{ $t('modals.confirm') }}</button>
        <button class="button-cancel" @click="$emit('cancel')">{{ $t('modals.cancel') }}</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'VsConfirmationModal'
})
</script>
<style>
.button-confirm {
  background-color: green;
}
.button-cancel {
  background-color: red;
}

.buttons {
  display: flex;
  gap: 10px;
  border: none;
}
</style>
