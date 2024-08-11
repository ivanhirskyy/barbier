<script setup lang="ts">
const slides = [
  {
    id: 1,
    title: 'Slide 1',
    description: 'Slide 1 description',
    image: 'https://fakeimg.pl/1920x1080/?text=Slide%201&font=lobster1',
  },
  {
    id: 2,
    title: 'Slide 2',
    description: 'Slide 2 description',
    image: 'https://fakeimg.pl/1920x1080/?text=Slide%202&font=lobster2',
  },
  {
    id: 3,
    title: 'Slide 3',
    description: 'Slide 3 description',
    image: 'https://fakeimg.pl/1920x1080/?text=Slide%203&font=lobster3',
  },
];
</script>

<template>
  <Swiper
    :slides-per-view="1"
    :modules="[SwiperAutoplay]"
    :loop="true"
    :autoplay="{
      delay: 4000,
      disableOnInteraction: false,
    }"
  >
    <SwiperSlide v-for="(slide, index) in slides" :key="index" class="h-full">
      <NuxtImg
        :src="slide.image"
        :alt="slide.title"
        :loading="index > 0 ? 'lazy' : 'eager'"
        class="block h-full max-h-[70svh] w-full object-cover"
      />
    </SwiperSlide>
  </Swiper>
</template>
