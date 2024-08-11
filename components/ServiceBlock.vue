<script lang="ts" setup>
import type { SR } from '~/types';
const { apiRequest } = useApi();

type TService = {
  duration: number;
  name: string;
  price: number;
};

/* const { data, pending, refresh, error } = await useAsyncData<SR<TService>>(() =>
  apiRequest('/services'),
); */

const { find } = useStrapi();

/* const response = await find<TService>('services'); */

const {
  data: services,
  pending,
  refresh,
  error,
} = await useAsyncData('restaurant', () => find<TService>('services'));
/* console.log(response.data); */
</script>
<template>
  <div
    v-if="services"
    ref="container"
    class="container mx-auto grid gap-10 py-10"
  >
    <h2 class="text-center text-3xl font-bold">Serviços</h2>
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
      <div
        v-for="(item, index) in services.data"
        :key="index"
        class="group relative flex items-center justify-center rounded border px-4 py-2 shadow-md"
      >
        <div class="w-full transition-all group-hover:opacity-0">
          <p class="font-bold">{{ item.attributes.name }}</p>
          <p>{{ convertPrice(item.attributes.price) }}</p>
          <p class="flex items-center gap-2">
            <i class="i-heroicons-clock"></i>
            {{ item.attributes.duration }} min
          </p>
        </div>
        <div class="absolute opacity-0 transition-all group-hover:opacity-100">
          <MyButton>Reservar</MyButton>
        </div>
      </div>
    </div>
  </div>
</template>
