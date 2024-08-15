<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
});

const { openModal } = useModals();

/* const user = useStrapiUser(); */
const user = useSupabaseUser();

const date = ref(new Date());

const attrs = ref([
  {
    highlight: {
      key: 'today',
      color: 'yellow',
      fillMode: 'outline',
    },
    dot: {
      color: 'yellow',
    },
    dates: new Date(),
  },
]);
</script>
<template>
  <HeroBanner />

  <ServicesBlock />

  <div class="fixed bottom-6 right-6">
    <MyButton
      class="aspect-[1/1] rounded-full bg-white md:hidden"
      icon="i-heroicons-plus-circle-20-solid"
      size="sm"
      variant="primary"
      @click="openModal('BookingModal')"
    >
      <i class="i-heroicons-calendar-days-solid text-4xl transition-all"></i>
    </MyButton>
  </div>

  <!--  <div>
    <client-only>
      <h2>Calendar</h2>
      <VCalendar v-model="date" />
      <h2>Date Picker</h2>
      <VDatePicker v-model="date" :attributes="attrs" />
    </client-only>
  </div> -->
  <!-- <BookingModal /> -->

  <!--  <ServiceBlock /> -->
</template>

<style>
/* .vc-day-content {
  @apply text-black;
} */

/* 50: '#feffe7',
          100: '#fbffc1',
          200: '#fcff86',
          300: '#fffc41',
          400: '#ffee0e',
          500: '#fddf01', //base
          600: '#d0a600',
          700: '#a67702',
          800: '#895d0a',
          900: '#744c0f',
          950: '#442804', */

/* .vc-yellow {
  --vc-accent-50: #feffe7;
  --vc-accent-100: #fbffc1;
  --vc-accent-200: #fcff86;
  --vc-accent-300: #fffc41;
  --vc-accent-400: #ffee0e;
  --vc-accent-500: #fddf01;
  --vc-accent-600: #d0a600;
  --vc-accent-700: #a67702;
  --vc-accent-800: #895d0a;
  --vc-accent-900: #744c0f;
  --vc-accent-950: #442804;
} */
/* .is-today .vc-day-content {
  @apply border-yellow-200;
} */
</style>
