<script setup lang="ts">
const { isOpenModal, closeModal } = useModals();

defineProps<{
  id: string;
  title: string;
}>();

const slots = useSlots();
</script>

<template>
  <div
    role="dialog"
    class="relative z-50"
    aria-modal="true"
    @click="closeModal(id)"
  >
    <div
      class="fixed inset-0 bg-gray-200/75 transition-opacity dark:bg-gray-800/75"
    ></div>
    <div class="fixed inset-0 overflow-y-auto">
      <div
        class="flex min-h-full items-center justify-center p-4 sm:items-center sm:p-0"
      >
        <div
          class="min-w-md relative divide-y divide-gray-100 rounded-lg bg-white shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none dark:divide-gray-500 dark:bg-gray-800 dark:ring-gray-700"
          @click.stop
        >
          <div
            class="relative flex items-center justify-between px-2.5 py-4 text-left md:px-4"
          >
            <p
              class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
            >
              {{ title }}
            </p>
            <slot name="header"></slot>

            <MyButton
              variant="link"
              size="icon"
              class="hover:bg-gray-100 dark:hover:bg-gray-600"
              @click="closeModal(id)"
            >
              <i
                class="i-heroicons-x-mark-20-solid text-2xl text-black dark:text-white"
              ></i>
            </MyButton>
          </div>

          <div class="px-2.5 py-5 md:px-4">
            <slot></slot>
          </div>

          <div v-if="slots.footer" class="px-2.5 py-4 md:px-4">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
