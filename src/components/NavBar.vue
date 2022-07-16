<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav>
</template>

<style scoped lang="scss">
nav {
  text-align: center;
  padding-top: 0.2rem;
  a {
    font-weight: bold;
    color: $dbm-blue-secondary;

    &.router-link-exact-active {
      color: $dbm-green;
    }
  }
}
</style>
