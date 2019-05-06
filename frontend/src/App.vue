<template>
  <div id="app" class="subpixel-antialiased">
    <nav class="nav">
      <router-link to="/" class="link logo">pawaTask</router-link>
    </nav>
    <main>
      <router-view />
    </main>
  </div>
</template>

<style lang="scss">
@import "styles/variables";
*,
*::before,
*::after {
  box-sizing: inherit;
}

html {
  box-sizing: border-box;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji",
    "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  line-height: 1.15;
  font-size: 20px;
}

body {
  margin: 0;
}

html,
body,
#app {
  height: 100%;
}

#app {
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
}

.subpixel-antialiased {
  -webkit-font-smoothing: subpixel-antialiased;
  -moz-osx-font-smoothing: auto;
}

.nav {
  display: flex;
  justify-content: center;
  padding: 1rem 0;
  background-color: $gray-900;

  .link {
    text-decoration: none;
    border-bottom: 1px solid transparent;
    color: $white;

    &:hover {
      border-bottom: 1px solid $white;
    }
  }

  .logo {
    font-size: 2rem;
    letter-spacing: 1px;
  }
}
</style>
