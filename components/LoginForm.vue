<script lang="ts" setup>
import { z } from 'zod';

const toast = useToast();
const { login } = useStrapiAuth();

const isLoading = ref(false);
const form = ref();

const loginData = reactive({
  identifier: '',
  password: '',
});

/* type Schema = z.output<typeof schema>; */
const schema = z.object({
  identifier: z.string().email('Tem de ser um email válido'),
  password: z.string().min(4, 'Tem de ter pelo menos 4 caracteres'),
});

const setErrors = (message: string, path?: string) => {
  form.value.setErrors([
    {
      message,
      path,
    },
  ]);
};

const onSubmit = async () => {
  form.value.clear();
  isLoading.value = true;

  try {
    await login(loginData);

    toast.add({ title: 'Success', description: 'Login com sucesso' });

    navigateTo('/');
  } catch (err) {
    if (
      typeof err === 'object' &&
      err !== null &&
      'error' in err &&
      err.error !== null &&
      typeof err.error === 'object' &&
      err.error !== null &&
      'status' in err.error &&
      'message' in err.error
    ) {
      if (err.error.status === 400) {
        setErrors('Email ou palavra passe errados.', 'error');
      } else {
        setErrors(
          'Ocorreu um erro inesperado no login, tente mais tarde.' ||
            err.error.message,
          'error',
        );
      }
    } else {
      setErrors('Ocorreu um erro inesperado no login, tente mais tarde.');
    }
  }

  isLoading.value = false;
};
</script>

<template>
  <UForm
    ref="form"
    :schema="schema"
    :state="loginData"
    class="space-y-4"
    @submit="onSubmit"
    @error="
      /* toast.add({
        title: 'Erro',
        description: 'Ocorreu um erro no login, por favor verifique os campos.',
      }) */
      console.log('error')
    "
  >
    <UFormGroup label="Email" name="identifier">
      <UInput
        v-model="loginData.identifier"
        placeholder="Insira o seu email..."
      />
    </UFormGroup>

    <UFormGroup label="Password" name="password">
      <UInput
        v-model="loginData.password"
        placeholder="Insira a sua password..."
        type="password"
      />
    </UFormGroup>

    <UFormGroup name="error"></UFormGroup>

    <MyButton class="btn-primary" type="submit" :loading="isLoading"
      >Entrar</MyButton
    >
  </UForm>
</template>
