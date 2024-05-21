<script lang="ts" setup>
import { z } from 'zod';
import type { FormSubmitEvent } from '#ui/types';
import type { TAuthResponse } from '~/types';
import MyModal from './MyModal.vue';

const { apiRequest } = useApi();
const toast = useToast();
const strapi_jwt = useStrapiToken();
const user = useStrapiUser();

const isLoading = ref(false);
const form = ref();

type Schema = z.output<typeof schema>;
const schema = z.object({
  identifier: z.string().email('Tem de ser um email válido'),
  password: z.string().min(8, 'Tem de ter pelo menos 8 caracteres'),
});

const state = reactive({
  identifier: undefined,
  password: undefined,
});

const onSubmit = async (event: FormSubmitEvent<Schema>) => {
  form.value.clear();
  isLoading.value = true;

  try {
    const response = await apiRequest<TAuthResponse>('/auth/local', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(event.data),
    });

    toast.add({ title: 'Success', description: 'Login com sucesso' });

    if ('error' in response) {
      throw new Error();
    }

    strapi_jwt.value = response.jwt;
    user.value = response.user;

    navigateTo('/');
  } catch (err) {
    if (typeof err === 'object' && err !== null) {
      if ('statusCode' in err && 'message' in err) {
        if (err.statusCode === 400) {
          form.value.setErrors([
            {
              message: ' ',
              path: 'identifier',
            },
            {
              message: 'Email or password is invalid',
              path: 'password',
            },
          ]);
        } else {
          form.value.setErrors([
            {
              message: ' ',
              path: 'identifier',
            },
            {
              message:
                'Ocorreu um erro inesperado no login, tente mais tarde.' ||
                err.message,
              path: 'password',
            },
          ]);
        }
      }
      toast.add({
        title: 'Erro',
        description: 'Ocorreu um erro no login, por favor verifique os campos.',
      });
    }
  }

  isLoading.value = false;
};
</script>

<template>
  <UForm
    ref="form"
    :schema="schema"
    :state="state"
    class="space-y-4 bg-white rounded shadow-xl p-8"
    @submit="onSubmit"
    @error="
      toast.add({
        title: 'Erro',
        description: 'Ocorreu um erro no login, por favor verifique os campos.',
      })
    "
  >
    <UFormGroup label="Email" name="identifier">
      <UInput v-model="state.identifier" placeholder="Insira o seu email..." />
    </UFormGroup>

    <UFormGroup label="Password" name="password">
      <UInput
        v-model="state.password"
        placeholder="Insira a sua password..."
        type="password"
      />
    </UFormGroup>

    <MyButton
      class="btn-primary"
      label="submit"
      type="submit"
      :loading="isLoading"
    ></MyButton>
  </UForm>
</template>
