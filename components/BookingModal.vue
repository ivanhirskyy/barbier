<script setup lang="ts">
import type { TBarber } from '~/types';

/* const user = useStrapiUser(); */

const user = useSupabaseUser();
const { openModal } = useModals();

const currentBarber = ref<TBarber | null>(null);
const currentDate = ref(new Date());

const searchSchedules = () => {
  if (user.value === null && currentBarber !== null) {
    /* openModal('AuthModal'); */
    return;
  }

  console.log('Get schedules');
};

provide('schedules', searchSchedules);
</script>
<template>
  <MyModal id="BookingModal" title="Reserve o seu corte">
    <div class="flex flex-col gap-8">
      <Transition mode="out-in">
        <KeepAlive>
          <Suspense>
            <BookingModalCalendar v-model="currentDate" />
            <template #fallback> Loading... </template>
          </Suspense>
        </KeepAlive>
      </Transition>
      <!-- area with the professional barbers list -->

      <Transition mode="out-in">
        <KeepAlive>
          <Suspense>
            <BookingModalBarbers v-model="currentBarber" />
            <template #fallback> Loading... </template>
          </Suspense>
        </KeepAlive>
      </Transition>
    </div>
  </MyModal>
</template>
