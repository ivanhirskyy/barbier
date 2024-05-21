<script setup lang="ts">
const props = defineProps<{
  label: string;
  icon?: string;
  link?: string;
  type?: 'button' | 'submit';
}>();

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
</script>
<template>
  <component
    :is="getComponent()"
    class="btn"
    :type="props.type"
    v-bind="getProps()"
  >
    {{ props.label }}
  </component>
</template>
