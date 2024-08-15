<script lang="ts" setup>
const { openModal } = useModals();
const currentDate = defineModel<Date>({
  required: true,
});

type TDay = {
  date: Date;
};

const weekDays = ref<TDay[]>();

const generateWeek = () => {
  const startOfWeek = new Date(currentDate.value);
  startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay() /*  + 1 */); // Monday

  const weekDaysArray = [];
  for (let i = 0; i < 7; i++) {
    const day = new Date(startOfWeek);
    day.setDate(startOfWeek.getDate() + i);
    weekDaysArray.push({
      date: day,
    });
  }

  weekDays.value = weekDaysArray;
};
generateWeek();

const previousWeek = () => {
  currentDate.value = new Date(
    currentDate.value.setDate(currentDate.value.getDate() - 7),
  );
  generateWeek();
};

const nextWeek = () => {
  currentDate.value = new Date(
    currentDate.value.setDate(currentDate.value.getDate() + 7),
  );
  generateWeek();
};

const getDayOfWeek = (date: Date) => {
  const day = new Date(date).getDay();
  const daysOfWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];
  return daysOfWeek[day];
};

const isToday = (date: Date) => {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};

const isCurrentDate = (date: Date) => {
  return currentDate.value.getTime() === date.getTime();
};

const isPreviousWeekDisabled = computed(() => {
  const today = new Date();
  const startOfWeek = new Date(currentDate.value);
  startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay() /*  + 1 */); // Monday
  return today >= startOfWeek;
});

const getCurrentMonthAndYear = computed(() => {
  const month = currentDate.value.toLocaleString('default', { month: 'long' });
  const year = currentDate.value.getFullYear();
  return `${month} ${year}`;
});

const searchSchedules = inject('schedules') as () => void;
</script>

<template>
  <div class="flex flex-col items-center gap-4">
    <p class="text-xl capitalize">{{ getCurrentMonthAndYear }}</p>
    <div class="flex items-center gap-2 md:gap-4">
      <button
        :class="[
          'rounded-full bg-gray-400 p-2 transition',
          { 'cursor-not-allowed opacity-20': isPreviousWeekDisabled },
          { 'hover:bg-gray-500': !isPreviousWeekDisabled },
        ]"
        :disabled="isPreviousWeekDisabled"
        @click="previousWeek"
      >
        <i
          class="i-heroicons-chevron-left-20-solid block text-xl md:text-4xl"
        ></i>
      </button>
      <div class="flex gap-1 md:gap-2">
        <div
          v-for="(day, index) in weekDays"
          :key="index"
          :class="[
            'flex flex-1 cursor-pointer flex-col items-center gap-2 rounded-md px-1.5 py-1.5 transition hover:bg-gray-500 hover:text-white md:px-4 md:py-2',
            {
              'bg-gray-400': isToday(day.date) && !isCurrentDate(day.date),
            },
            {
              'bg-yellow-500 text-black hover:bg-yellow-500 hover:text-black':
                isCurrentDate(day.date),
            },
          ]"
          @click="
            currentDate = day.date;
            searchSchedules();
          "
        >
          <span class="md:text-md text-xs">{{ getDayOfWeek(day.date) }}</span>
          <span class="text-lg">{{ day.date.getDate() }}</span>
        </div>
      </div>
      <button
        :class="['rounded-full bg-gray-400 p-2 transition hover:bg-gray-500']"
        @click="nextWeek"
      >
        <i
          class="i-heroicons-chevron-right-20-solid block text-xl md:text-4xl"
        ></i>
      </button>
    </div>
  </div>
</template>
