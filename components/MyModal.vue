<script setup lang="ts">
const emit = defineEmits(['success']);
function onSuccess() {
  emit('success');
}
</script>
<template>
  <UModal>
    <UCard>
      <UCardHeader>
        <UCardTitle>Modal Title</UCardTitle>
        <UCardClose />
      </UCardHeader>
      <UCardBody>
        <p>Modal Content</p>
      </UCardBody>
      <UCardFooter>
        <UButton>Cancel</UButton>
        <UButton @click="onSuccess">Save</UButton>
      </UCardFooter>
    </UCard>
  </UModal>
</template>
