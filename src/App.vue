<template>
  <router-view />
</template>

<style lang="scss">
body {
  margin: 0;
}

#app {
  * {
    box-sizing: border-box !important;
  }
  .step-content {
    width: 100%;
    height: 100%;
    padding: 1rem;
    box-sizing: border-box;

    &.animate-screen-on {
      animation: screen-on 0.5s;
    }
  }

  button {
    cursor: pointer;
  }
}

@font-face {
  font-family: Terminal;
  src: url("@/assets/fonts/VT323-Regular.ttf");
}

@keyframes screen-on {
  from {
    position: absolute;
    height: 0%;
    top: 50%;
  }

  to {
    position: absolute;
    height: calc(100vh - 25px);
    top: 0%;
  }
}
</style>
