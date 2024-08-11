<script setup lang="ts">
import { useDraggable } from '@vueuse/core';

const route = useRoute();
const { logout } = useStrapiAuth();
const user = useStrapiUser();

/* const links = [
  {
    label: 'Horizontal Navigation',
    to: `${route.path.startsWith('/dev') ? '/dev' : ''}/components/horizontal-navigation`,
  },
  {
    label: 'Command Palette',
    to: '/components/command-palette',
  },
  {
    label: 'Table',
    to: '/components/table',
  },
]; */

/* const items = computed(() => [
  [
    {
      label: 'Profile',
      icon: 'i-heroicons-user-circle-20-solid',
    },
    {
      label: 'Edit',
      icon: 'i-heroicons-pencil-square-20-solid',
      click: () => {
        console.log('Edit');
      },
    },
  ],
  [
    {
      label: 'Logout',
      icon: 'i-heroicons-arrow-right-circle-20-solid',
      click: () => {
        logout();
        navigateTo('/login');
      },
      hide: !user.value,
    },
  ],
]); */

const dropdownItems = computed(() => {
  return [
    {
      label: 'Perfil',
      icon: 'i-heroicons-user-circle-20-solid',
      href: '/profile',
    },
    {
      label: 'Terminar sessão',
      icon: 'i-heroicons-arrow-right-circle-20-solid',
      click: async () => {
        await navigateTo('/login');
        logout();
      },
      hide: !user.value,
    },
  ];
});

const links = [
  {
    label: 'Sobre nós',
    href: `${route.path.startsWith('/dev') ? '/dev' : ''}/components/horizontal-navigation`,
  },
  {
    label: 'Serviços',
    href: '/components/command-palette',
  },
  {
    label: 'Contacte-nos',
    href: '/components/command-palette',
  },
];

const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};
</script>

<template>
  <div class="sticky top-0 z-10">
    <nav class="bg-gray-800">
      <div
        class="container mx-auto flex h-20 items-center gap-8 py-2 transition-all duration-300"
        :class="user ? 'justify-between' : 'justify-center'"
      >
        <NuxtLink
          to="/"
          class="shrink-0 overflow-hidden rounded shadow-logo shadow-yellow-500"
        >
          <NuxtImg class="rounded" src="./logo.webp" alt="Logo" height="50" />
        </NuxtLink>

        <button class="md:hidden" @click="toggleMenu">
          <i
            class="i-heroicons-bars-3-bottom-right-20-solid block cursor-pointer text-4xl text-white"
          ></i>
        </button>
        <div
          class="absolute right-0 top-20 flex h-[calc(100dvh-5rem)] w-full grow flex-col items-end gap-8 bg-gray-950 p-6 md:static md:h-auto md:flex-row md:items-center md:justify-between md:bg-inherit md:p-0"
          :class="isMenuOpen ? 'block' : 'max-md:hidden'"
        >
          <ul class="flex flex-col items-end md:flex-row md:items-center">
            <li v-for="(link, index) in links" :key="index">
              <NuxtLink
                :to="link.href"
                class="block rounded px-4 py-2 text-lg text-white hover:bg-gray-600"
              >
                {{ link.label }}
              </NuxtLink>
            </li>
          </ul>

          <div class="flex flex-col items-end gap-8 md:flex-row md:gap-4">
            <MyButton
              v-if="user"
              class="max-sm:hidden"
              icon="i-heroicons-plus-circle-20-solid"
              variant="primary"
              ><p class="hidden max-md:block lg:block">Faça a sua reserva</p>
              <i
                class="i-heroicons-calendar-days-solid text-2xl transition-all"
              ></i>
            </MyButton>

            <MyDropdown
              v-if="user"
              class="hidden md:block"
              position="right"
              label="Conta"
              variant="secondary"
              :items="dropdownItems"
            />
            <div class="flex flex-col items-end md:hidden">
              <NuxtLink
                v-for="(link, index) in dropdownItems"
                :key="index"
                :to="link.href"
                class="block rounded px-4 py-2 text-lg text-white hover:bg-gray-600"
                @click="link.click"
              >
                <p class="hidden max-md:block lg:block">{{ link.label }}</p>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>
