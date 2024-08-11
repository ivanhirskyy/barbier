<template>
  <div class="barberContainer">
    <div class="ball top"></div>

    <div class="endCap top"></div>

    <div class="cap"></div>

    <div class="barber"></div>

    <div class="cap"></div>

    <div class="endCap bottom"></div>

    <div class="ball bottom"></div>
  </div>
</template>

<style scoped>
.barberContainer {
  margin: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: fit-content;
  position: relative;
  --color1: #000;
}

.ball {
  height: 12px;
  width: 20px;
  border-radius: 999px 999px 0 0;
  background-color: var(--color1);
}
.ball.bottom {
  border-radius: 0 0 999px 999px;
}

.endCap {
  width: 50px;
  height: 15px;
  border-radius: 999px 999px 0 0;
  background-color: var(--color1);
}

.endCap.bottom {
  border-radius: 0 0 999px 999px;
}

.cap {
  width: 80px;
  height: 20px;
  background-color: var(--color1);
  border-radius: 20px;
}

.barber {
  height: 136px;
  width: 55px;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

  background-image: repeating-linear-gradient(
    -45deg,
    red,
    blue 1rem,
    rgb(253 223 1) 1rem,
    rgb(253 223 1) 2rem
  );
  background-size: 200% 200%;
  animation: barberpole 4s linear infinite;
}

.barber::before {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  width: 0px;
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
