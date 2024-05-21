<script setup lang="ts">
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

const items = computed(() => {
  return [
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
    {
      label: 'Logout',
      icon: 'i-heroicons-arrow-right-circle-20-solid',
      click: () => {
        logout();
        navigateTo('/login');
      },
      hide: !user.value,
    },
  ];
});
</script>

<template>
  <div class="sticky top-0 z-10">
    <nav class="bg-gray-800">
      <div
        class="container mx-auto py-8 flex items-center gap-20 transition-all duration-300"
        :class="user ? 'justify-between' : 'justify-center'"
      >
        <NuxtLink
          to="/"
          class="overflow-hidden rounded shadow-yellow-500 shadow-logo"
        >
          <NuxtImg class="rounded" src="./logo.webp" alt="Logo" height="50" />
        </NuxtLink>

        <!-- plus or booking icon -->

        <MyButton
          v-if="user"
          label="Faça a sua reserva"
          class="btn-secondary"
          icon="i-heroicons-plus-circle-20-solid"
        />

        <!-- <UDropdown :items="items" :popper="{ placement: 'bottom-start' }">
          <template #item="{ item }">
            <span class="truncate">{{ item.label }}</span>

            <UIcon
              :name="item.icon"
              class="flex-shrink-0 h-4 w-4 text-gray-400 dark:text-gray-500 ms-auto"
            /> </template
          ><UButton
            color="white"
            label="Options"
            trailing-icon="i-heroicons-chevron-down-20-solid"
          />
        </UDropdown> -->

        <MyDropdown v-if="user" position="right" :items="items" />

        <!-- <ul class="flex items-center">
          <li v-if="!user">
            <NuxtLink to="/login" class="text-white px-5 py-2">
              Login
            </NuxtLink>
          </li>
          <li v-if="!user">
            <NuxtLink to="/register" class="text-white px-4 py-2">
              Register
            </NuxtLink>
          </li>

          <li>
            <UDropdown :items="items" :popper="{ placement: 'bottom-start' }">
              <template #item="{ item }">
                <span class="truncate">{{ item.label }}</span>

                <UIcon
                  :name="item.icon"
                  class="flex-shrink-0 h-4 w-4 text-gray-400 dark:text-gray-500 ms-auto"
                /> </template
              ><UButton
                color="white"
                label="Options"
                trailing-icon="i-heroicons-chevron-down-20-solid"
              />
            </UDropdown>
          </li>
        </ul> -->
      </div>
    </nav>
  </div>
</template>
