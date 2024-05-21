<script setup lang="ts">
import type { TAuthResponse } from '~/types';

const user = reactive({
  username: '',
  email: '',
  password: '',
});

const { apiRequest } = useApi();

const register = async () => {
  try {
    if (!user.username || !user.email || !user.password) {
      return;
    }

    const response = await apiRequest<TAuthResponse>('/auth/local/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: user.username,
        email: user.email,
        password: user.password,
      }),
    });

    console.log(response);
  } catch (error) {
    console.error(error);
  }
};
</script>

<template>
  <div class="container mx-auto py-4">register</div>
</template>
