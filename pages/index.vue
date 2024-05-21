<script setup lang="ts">
import type { Strapi4ResponseMany } from '@nuxtjs/strapi';

const { find } = useStrapi();

const { apiRequest } = useApi();

type TService = {
  duration: number;
  name: string;
  price: number;
};

definePageMeta({
  middleware: 'auth',
});

/* const {
  data: services,
  pending,
  refresh,
  error,
} = await useAsyncData('service', () => find<TService[]>('services'), {
  server: false,
}); */

const {
  data: services,
  pending,
  refresh,
  error,
} = await useAsyncData(() =>
  apiRequest<Strapi4ResponseMany<TService[]>>('/services'),
);

/* console.log(services1.value?.data); */

/* const el = ref<HTMLElement | null>(null);
const container = ref<HTMLElement | null>(null);

const disabled = ref(false);
const { x, y, style } = useDraggable(el, {
  initialValue: { x: 40, y: 40 },
  containerElement: container,
}); */
</script>
<template>
  <!-- <p>
    {{ services1.data }}
  </p> -->
  <div v-if="services" ref="container" class="container mx-auto">
    <div v-for="(item, index) in services.data" :key="index">
      <p>{{ item.attributes.name }}</p>
      <p>{{ item.attributes.price }}</p>
      <p>{{ item.attributes.duration }}</p>
    </div>
    <!-- <button ref="el" :style="[style, 'position: fixed', 'width: 400px']">
      Faça sua marcação{{ x }}, {{ y }}
    </button> -->
  </div>
</template>
