<script lang="ts" setup>
import { set, z } from 'zod';

const toast = useToast();
const { register } = useStrapiAuth();

const isLoading = ref(false);
const form = ref();
const currentTimestamp = Date.now().toString();

const registerData = reactive({
  email: '',
  username: useId() + currentTimestamp,
  password: '',
  phone: '',
});

/* type Schema = z.output<typeof schema>; */
const schema = z.object({
  email: z.string().email('Tem de ser um email válido'),
  password: z.string().min(4, 'Tem de ter pelo menos 4 caracteres'),
  phone: z.string().min(9, 'Tem de ter menos 9 caracteres'),
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
    await register(registerData);

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
    :state="registerData"
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
    <UFormGroup label="Email" name="email">
      <UInput
        v-model="registerData.email"
        placeholder="Insira o seu email..."
      />
    </UFormGroup>

    <UFormGroup label="Telemóvel" name="phone">
      <UInput
        v-model="registerData.phone"
        placeholder="Insira o seu número de telemóvel..."
      />
    </UFormGroup>

    <UFormGroup label="Password" name="password">
      <UInput
        v-model="registerData.password"
        placeholder="Insira a sua password..."
        type="password"
      />
    </UFormGroup>

    <UFormGroup name="error"></UFormGroup>

    <MyButton class="btn-primary btn-sm" type="submit" :loading="isLoading"
      >Criar conta</MyButton
    >
  </UForm>
</template>
