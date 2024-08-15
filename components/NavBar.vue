<script setup lang="ts">
import { useDraggable } from '@vueuse/core';
import BookingModal from './BookingModal.vue';

const route = useRoute();
const { logout } = useStrapiAuth();
/* const user = useStrapiUser(); */
const user = useSupabaseUser();
const supabase = useSupabaseClient();

console.log('User', user);

const { openModal } = useModals();

type TDropdownItem = {
  label: string;
  icon: string;
  click?: () => void;
  href?: string;
  hide?: boolean;
};

const dropdownItems = computed(() => {
  if (!user.value) return [];
  const data: TDropdownItem[] = [
    {
      label: 'Perfil',
      href: '/profile',
      icon: 'i-heroicons-user-circle-20-solid',
    },
    {
      label: 'Terminar sessão',
      icon: 'i-heroicons-arrow-right-circle-20-solid',
      click: async () => {
        await signOut();
      },
      hide: !user.value,
    },
  ];

  return data;
});

const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) console.log(error);
};

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

watch(
  () => route.path,
  () => {
    isMenuOpen.value = false;
  },
);

watch(
  () => user.value,
  () => {
    isMenuOpen.value = false;
  },
);
</script>

<template>
  <div class="sticky top-0 z-10">
    <nav class="bg-gray-800">
      <div
        class="container mx-auto flex h-20 items-center justify-between gap-8 py-2 transition-all duration-300"
      >
        <NuxtLink
          to="/"
          class="shrink-0 overflow-hidden rounded shadow-logo shadow-yellow-500"
        >
          <NuxtImg
            class="h-[50px] rounded"
            src="./logo.webp"
            alt="Logo"
            height="50"
          />
        </NuxtLink>

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
              variant="primary"
              class="hidden md:flex"
              @click="openModal('BookingModal')"
            >
              <p class="hidden max-md:block lg:block">Faça a sua reserva</p>
              <i
                class="i-heroicons-calendar-days-solid text-2xl transition-all"
              ></i>
            </MyButton>

            <!-- v-if="user" -->

            <MyDropdown
              v-if="user"
              class="hidden md:block"
              position="right"
              label="Conta"
              variant="secondary"
              :items="dropdownItems"
            />
            <MyButton
              v-else
              variant="secondary"
              @click="openModal('AuthModal')"
            >
              <p class="hidden max-md:block lg:block">Entrar</p>
              <i
                class="i-heroicons-arrow-right-circle-20-solid text-2xl transition-all"
              ></i>
            </MyButton>
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
        <div class="flex gap-8 md:hidden">
          <MyButton
            v-if="user"
            variant="primary"
            size="icon"
            @click="openModal('PhoneModal')"
          >
            <i class="i-heroicons-phone-solid text-xl transition-all"></i>
          </MyButton>
          <button class="block" @click="toggleMenu">
            <i
              class="i-heroicons-bars-3-bottom-right-20-solid block cursor-pointer text-4xl text-white"
            ></i>
          </button>
        </div>
      </div>
    </nav>
  </div>
</template>
