<script setup lang="ts">
import type { TMyButton } from '~/types';

const props = defineProps<TMyButton>();

const getComponent = () => {
  if (props.link) {
    return resolveComponent('NuxtLink');
  }

  return 'button';
};

const getProps = () => {
  const obj: Record<string, unknown> = {
    ...props,
  };

  if (props.link) obj['to'] = props.link;

  return obj;
};

const getClassesBySize = () => {
  if (props.variant === 'link') {
    return '';
  }

  switch (props.size) {
    case 'icon':
      return 'px-2 py-2';
    case 'lg':
      return 'px-8 py-3 text-lg min-h-12';
    case 'sm':
      return 'px-4 py-2 text-sm min-h-8';
    default:
      return 'px-6 py-2 text-base min-h-10';
  }
};

const getClassesByVariant = () => {
  switch (props.variant) {
    case 'link':
      return 'text-yellow-600 hover:underline';
    case 'secondary':
      return 'bg-white text-black hover:bg-gray-100 hover:shadow-logo hover:shadow-gray-500';
    default:
      return 'bg-yellow-500 text-black hover:bg-yellow-400 hover:shadow-logo hover:shadow-yellow-500';
  }
};
</script>
<template>
  <component
    :is="getComponent()"
    :class="[
      'btn group relative flex cursor-pointer items-center justify-center gap-2 overflow-hidden text-nowrap rounded text-base font-medium transition-all duration-300',
      getClassesBySize(),
      getClassesByVariant(),
    ]"
    :disabled="props.loading"
    :type="props.type"
    v-bind="getProps()"
  >
    <slot></slot>
    <span
      v-if="props.loading"
      class="absolute flex h-full w-full items-center justify-center bg-inherit"
    >
      <IconLoading />
    </span>
  </component>
</template>
