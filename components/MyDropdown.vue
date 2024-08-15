<script setup lang="ts">
const props = defineProps<{
  position: 'left' | 'right' | 'center';
  label: string;
  variant: 'primary' | 'secondary';
  items: {
    label: string;
    href?: string;
    click?: () => void;
    hide?: boolean;
  }[];
}>();

const open = ref(false);

const getPositionClasses = () => {
  return {
    'left-0 text-left': props.position === 'left',
    'right-0 text-right': props.position === 'right',
    'left-1/2 transform -translate-x-1/2 text-center':
      props.position === 'center',
  };
};

const getClasses = () => {
  return getPositionClasses();
};

const toggle = () => {
  open.value = !open.value;
};

const close = () => {
  console.log('close');
  open.value = false;
};

const clickAway = (event: MouseEvent) => {
  if (!(event.target as HTMLElement).closest('.relative')) {
    close();
  }
};

onMounted(() => {
  document.addEventListener('click', clickAway);
});

onUnmounted(() => {
  document.removeEventListener('click', clickAway);
});
</script>
<template>
  <div class="relative">
    <MyButton
      :label="props.label"
      size="icon"
      :variant="props.variant"
      @click="toggle"
    >
      <i class="i-heroicons-user-circle-20-solid text-2xl"></i>
      <i
        class="text-2xl"
        :class="
          open
            ? 'i-heroicons-chevron-up-20-solid'
            : 'i-heroicons-chevron-down-20-solid'
        "
      ></i
    ></MyButton>
    <div
      v-show="open"
      class="absolute top-full z-10 mt-[1px] w-full w-max min-w-full divide-y divide-gray-100 overflow-hidden rounded-md border border-secondary-200 bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:divide-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:ring-gray-900"
      :class="getClasses()"
    >
      <template v-for="(item, index) in props.items" :key="index">
        <NuxtLink
          :to="item.href"
          class="block cursor-pointer px-6 py-2 hover:bg-gray-50 dark:hover:bg-gray-700"
          @click="item.click"
        >
          {{ item.label }}
        </NuxtLink>
      </template>
    </div>
  </div>
</template>
