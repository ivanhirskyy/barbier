<script setup lang="ts">
import type { TMyButton } from '~/types';

definePageMeta({
  layout: 'landing',
});

const buttons: TMyButton[] = [
  {
    variant: 'primary',
    size: 'lg',
    link: '/',
    icon: 'i-heroicons-calendar-days-solid text-2xl',
    text: 'Marcações',
  },
  {
    variant: 'secondary',
    size: 'lg',
    link: 'https://api.whatsapp.com/send?phone=351911871557',
    icon: 'i-heroicons-chat-bubble-bottom-center-text text-2xl',
    text: 'WhatsApp',
  },
  {
    variant: 'primary',
    size: 'lg',
    link: 'https://maps.app.goo.gl/j7b8Q2QwLJm8SqEQ9',
    icon: 'i-heroicons-map-pin text-2xl',
    text: 'Localização',
  },
  {
    variant: 'secondary',
    size: 'lg',
    link: 'https://instagram.com/jogadordocortebarbershop?igshid=MmU2YjMzNjRlOQ==',
    icon: 'i-heroicons-camera text-2xl',
    text: 'Instagram',
  },
  {
    variant: 'primary',
    size: 'lg',
    link: 'https://www.google.com/search?kgmid=/g/11k4k8dgk_&hl=pt-BR&q=jogador+do+corte+barbershop+cr%C3%ADticas&kgs=d31924157b9304fe&shndl=0&source=sh/x/kp/osrp/m5/2&si=ACFMAn-JlfkjHh0ezdNAbIMBZMsz2pZUCvXAg_gwiJ8w9ZZwYsOQjMfQr7TwYr9M8uh75wHr-zGWjJjFlO14J2OyfK0nif6UtxYpzJtZosO3NmNOZsJYluHlgb_val-vQbQcTiDpZBjGqeCKDbnmJ6MZysPDAe1uv-8q_lDTCz99l8ent4nFwPc%253D&ictx=1&ved=2ahUKEwikpp7ZzuiAAxWwdaQEHeKnCBwQyNoBKAN6BAgQEAo',
    icon: 'i-heroicons-star text-2xl',
    text: 'Avaliação',
  },
];
</script>

<template>
  <div class="flex min-h-screen flex-col items-center justify-center gap-8 p-8">
    <NuxtImg
      src="./login-banner.webp"
      alt="Login Banner"
      class="absolute -z-10 h-full w-full object-cover brightness-[.3]"
    />

    <NuxtLink
      to="/"
      class="absolute top-8 shrink-0 overflow-hidden rounded shadow-logo shadow-yellow-500"
    >
      <NuxtImg class="h-50 rounded" src="./logo.webp" alt="Logo" height="50" />
    </NuxtLink>

    <div class="w-full max-w-md space-y-6">
      <MyButton
        v-for="(button, index) in buttons"
        :key="index"
        :variant="button.variant"
        :size="button.size"
        :link="button.link"
        :text="button.text"
        class="transform text-xl transition-transform duration-300 hover:scale-105"
      >
        <i :class="button.icon" class="absolute left-4"></i>
      </MyButton>
    </div>
  </div>
</template>
