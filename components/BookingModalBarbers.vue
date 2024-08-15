<script lang="ts" setup>
import type { TBarber } from '~/types';
/* const { find } = useStrapi(); */

const supabase = useSupabaseClient();

const currentBarber = defineModel<TBarber | null>({
  required: true,
});

/* const {
  data: barbers,
  pending,
  refresh,
  error,
} = await useAsyncData('barber', () => find<TBarber>('barbers')); */

const { data: barbers } = await useAsyncData('barbers', async () => {
  const { data } = await supabase
    .from('barbers')
    .select('id, email, avatar, name');
  return data;
});

console.log(barbers);
/* const { data: availableSchedules } = await useAsyncData(
  'get-available-barbers',
  () => find<any>('get-available-barbers'),
);

console.log(availableSchedules); */

const searchSchedules = inject('schedules') as () => void;
</script>

<template>
  <div class="flex flex-col items-center gap-4">
    <p class="text-xl">Selecione um profissional</p>
    <div class="flex items-center gap-2 md:gap-4">
      <div
        v-for="(barber, index) in barbers"
        :key="index"
        :class="[
          'flex cursor-pointer flex-col items-center gap-2 rounded-md px-2 py-2 transition hover:bg-gray-500 md:px-4',
          {
            'bg-gray-600 ring-1 ring-gray-300': currentBarber?.id === barber.id,
          },
        ]"
        @click="
          currentBarber = barber;
          searchSchedules();
        "
      >
        <img :src="barber.avatar" alt="barber" class="h-14 w-14 rounded-full" />
        <span class="md:text-md text-sm">{{ barber.name }}</span>
      </div>
    </div>
  </div>
</template>
