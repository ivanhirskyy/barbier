<script setup lang="ts">
const props = defineProps<{
  position: 'left' | 'right' | 'center';
  items: {
    label: string;
    href: string;
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
    <div class="relative">
      <MyButton label="Options" class="btn-primary" @click="toggle" />
      <div
        v-show="open"
        class="absolute min-w-full w-max w-full z-10 bg-white border border-secondary-200 divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        :class="getClasses()"
      >
        <template v-for="(item, index) in props.items" :key="index">
          <a :href="item.href" class="block px-12 py-6" @click="item.click">
            {{ item.label }}
          </a>
        </template>
      </div>
    </div>
  </div>
</template>
