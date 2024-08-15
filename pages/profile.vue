<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
});

const user = useSupabaseUser();
const client = useSupabaseClient();

const updateUser = async () => {
  const number = '+351938028711';
  /* const { error } = await client.auth.updateUser({
    phone: number,
  }); */

  const { error } = await client.auth.verifyOtp({
    phone: '+351938028711',
    token: '268171',
    type: 'phone_change',
  });

  console.log(user, error);
};
</script>

<template>
  <!-- user details page with posibilçity to edit info -->
  <div class="container py-12">
    <UCard>
      <div class="flex flex-col gap-4">
        <h1 class="text-2xl font-bold">Perfil</h1>
        <div class="flex flex-col gap-4">
          <!-- <div class="flex flex-col gap-2">
            <label for="email">Email</label>
            <p>{{ user.email }}</p>
          </div>
          <div class="flex flex-col gap-2">
            <label for="phone">Telemovel</label>
            <p>{{ user.phone }}</p>
          </div> -->
        </div>
      </div>
    </UCard>
  </div>
</template>
