<script lang="ts" setup>
const supabase = useSupabaseClient();

const { data: services } = await useAsyncData('services', async () => {
  const { data } = await supabase
    .from('services')
    .select('id, name, image, duration, price');
  return data;
});
</script>

<template>
  <div class="container flex flex-col gap-8 py-12">
    <h2 class="text-center text-2xl font-bold">Serviços</h2>

    <div class="flex flex-wrap justify-center gap-8">
      <div
        v-for="(service, index) in services"
        :key="index"
        class="service-item flex min-w-[200px] flex-1 cursor-pointer flex-col items-center gap-2 rounded-lg border border-gray-200 p-4 text-center hover:bg-gray-900"
      >
        <span>{{ service.name }}</span>
        <span class="flex items-center gap-2">
          <i class="i-heroicons-clock-20-solid"></i>
          {{ service.duration }} min</span
        >
        <span>{{ service.price }}€</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.service-item {
  max-width: calc(50% - 1rem);
}
</style>
