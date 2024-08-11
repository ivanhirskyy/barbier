<template>
  <div
    class="barber-container relative flex w-fit flex-col items-center justify-center"
  >
    <div class="ball h-3 w-5 rounded-t-full bg-black"></div>
    <div class="end-cap h-4 w-12 rounded-t-full bg-black"></div>
    <div class="cap h-5 w-20 rounded-full bg-black"></div>
    <div
      class="barber relative flex h-[136px] w-14 items-center justify-center overflow-hidden"
    ></div>
    <div class="cap h-5 w-20 rounded-full bg-black"></div>
    <div class="end-cap h-4 w-12 rounded-b-full bg-black"></div>
    <div class="ball h-3 w-5 rounded-b-full bg-black"></div>
  </div>
</template>

<style scoped>
.barber-container {
  --color1: #000;
}

.barber {
  background-image: repeating-linear-gradient(
    -45deg,
    #ec1d25,
    #243d92 1rem,
    #fddf01 1rem,
    #fddf01 2rem
  );
  background-size: 200% 200%;
  animation: barberpole 4s linear infinite;
}

.barber::before {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  width: 0;
  height: 100%;
  background-color: transparent;
  opacity: 0.75;
  box-shadow: 0 0 15px 15px #fff;
}

@keyframes barberpole {
  0% {
    background-position: 100% 100%;
  }
  100% {
    background-position: 100% 200%;
  }
}
</style>
