<script lang="ts" setup>
const { modals } = useModals();
</script>

<template>
  <template v-for="modal in modals" :key="modal.id">
    <Transition name="fade">
      <component :is="modal.id" v-if="modal.isOpen" />
    </Transition>
  </template>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
