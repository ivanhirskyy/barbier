<script lang="ts" setup>
import { z } from 'zod';
import type { FormSubmitEvent } from '#ui/types';
import type { TAuthResponse } from '~/types';

const { apiRequest } = useApi();
const toast = useToast();
const strapi_jwt = useStrapiToken();
const user = useStrapiUser();

const isLoading = ref(false);
const form = ref();

type Schema = z.output<typeof schema>;
const schema = z.object({
  email: z.string().email('Tem de ser um email válido'),
  password: z.string().min(8, 'Tem de ter pelo menos 8 caracteres'),
  phone: z.string().min(9, 'Tem de ter pelo menos 9 caracteres'),
});

const currentTimestamp = Date.now().toString();

const state = reactive({
  email: undefined,
  username: useId() + currentTimestamp,
  password: undefined,
  phone: undefined,
});

const onSubmit = async (event: FormSubmitEvent<Schema>) => {
  form.value.clear();
  isLoading.value = true;
  try {
    const response = await apiRequest<TAuthResponse>('/auth/local/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(event.data),
    });

    if ('error' in response) {
      throw response.error;
    }

    toast.add({ title: 'Success', description: 'Registado com sucesso' });

    strapi_jwt.value = response.jwt;
    user.value = response.user;

    navigateTo('/');
  } catch (err) {
    if (typeof err === 'object' && err !== null) {
      if ('statusCode' in err && 'message' in err) {
        console.log(err.message);

        if (err.statusCode === 400) {
          form.value.setErrors([
            {
              message: 'Email or password is invalid',
              path: 'error',
            },
          ]);
        } else {
          form.value.setErrors([
            {
              message:
                'Ocorreu um erro inesperado no registo, tente mais tarde.' ||
                err.message,
              path: 'error',
            },
          ]);
        }
      }
      toast.add({
        title: 'Erro',
        description:
          'Ocorreu um erro no registo, por favor verifique os campos.',
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
    @submit.prevent="onSubmit"
    @error="
      toast.add({
        title: 'Erro',
        description: 'Ocorreu um erro no login, por favor verifique os campos.',
      })
    "
  >
    <UFormGroup label="Email" name="email">
      <UInput v-model="state.email" placeholder="Insira o seu email..." />
    </UFormGroup>

    <UFormGroup label="Telemóvel" name="phone">
      <UInput
        v-model="state.phone"
        placeholder="Insira o seu número de telemóvel..."
      />
    </UFormGroup>

    <UFormGroup label="Password" name="password">
      <UInput
        v-model="state.password"
        placeholder="Insira a sua password..."
        type="password"
      />
    </UFormGroup>

    <UFormGroup label="" name="error"></UFormGroup>

    <MyButton
      class="btn-primary btn-sm"
      label="submit"
      type="submit"
      :loading="isLoading"
    ></MyButton>
  </UForm>
</template>
