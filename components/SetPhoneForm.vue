<script setup lang="ts">
import { z } from 'zod';

const toast = useToast();
const supabase = useSupabaseClient();

const form = ref();
const isLoading = ref(false);
const emit = defineEmits(['onSubmit']);

const status = ref<'phone' | 'token'>('phone');

const phoneData = reactive({
  phone: '',
  token: '',
});

const remainingSeconds = ref(240);
const interval = ref();

const startTimer = () => {
  interval.value = setInterval(() => {
    remainingSeconds.value -= 1;
    if (remainingSeconds.value === 0) {
      clearInterval(interval.value);
    }
  }, 1000);
};

const resetTimer = () => {
  remainingSeconds.value = 240;
  clearInterval(interval.value);
};

const schemaPhone = z.object({
  phone: z.string().min(9, 'Tem de ter pelo menos 9 caracteres'),
});

const schemaToken = z.object({
  token: z.string().length(6, 'Tem de ter 6 caracteres'),
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
    const { error } = await supabase.auth.updateUser({
      phone: '+351' + phoneData.phone,
    });

    if (error) {
      throw error;
    }

    status.value = 'token';
    startTimer();

    toast.add({
      title: 'Success',
      description:
        'Por favor confirme o numero de telemovel através do sms enviado.',
    });
  } catch (err) {
    setErrors('Ocorreu um erro inesperado, tente mais tarde.', 'error');
    /*  if (
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
    } */
  }

  isLoading.value = false;
};

const onConfirm = async () => {
  form.value.clear();
  isLoading.value = true;

  try {
    const { error } = await supabase.auth.verifyOtp({
      phone: '+351' + phoneData.phone,
      token: phoneData.token,
      type: 'phone_change',
    });

    if (error) {
      throw error;
    }

    toast.add({
      title: 'Success',
      description: 'Numero de telemovel confirmado com sucesso.',
    });
    emit('onSubmit');
  } catch (err) {
    console.log(err);
    setErrors('O token inserido está errado ou expirado.', 'error');
  }

  isLoading.value = false;
};
</script>

<template>
  <UForm
    v-if="status === 'phone'"
    ref="form"
    :schema="schemaPhone"
    :state="phoneData"
    class="space-y-4"
    @submit="onSubmit"
    @error="console.log('error')"
  >
    <UFormGroup label="Telemóvel" name="phone">
      <UInput
        v-model="phoneData.phone"
        placeholder="Insira o seu número de telefone..."
      />
    </UFormGroup>

    <UFormGroup name="error"></UFormGroup>

    <MyButton type="submit" :loading="isLoading">Enviar</MyButton>
  </UForm>

  <UForm
    v-else
    ref="form"
    :schema="schemaToken"
    :state="phoneData"
    class="space-y-4"
    @submit="onConfirm"
    @error="console.log('error')"
  >
    <UFormGroup label="Código" name="token">
      <UInput
        v-model="phoneData.token"
        placeholder="Insira o token enviado por sms..."
      />
    </UFormGroup>

    <p class="text-sm">
      Foi enviado um código para o número
      <span class="text-primary">{{ phoneData.phone }}</span>
    </p>
    <p class="text-sm">
      O token expira dentro de
      {{ remainingSeconds }} segundos
    </p>

    <UFormGroup name="error"></UFormGroup>

    <div class="flex gap-4 pt-4">
      <MyButton
        variant="secondary"
        @click="
          status = 'phone';
          phoneData.token = '';
          resetTimer();
        "
      >
        Alterar número</MyButton
      >
      <MyButton type="submit" :loading="isLoading">Confirmar</MyButton>
    </div>
  </UForm>
</template>
