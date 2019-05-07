<template>
  <div id="layout">
    <nav class="nav">
      <router-link class="link logo focus" to="/">pawaTask</router-link>
    </nav>
    <main class="container">
      <router-view />
    </main>
    <PortalTarget name="modal" @change="handleChange"></PortalTarget>
  </div>
</template>

<script>
const body = document.querySelector("body");
export default {
  data: function() {
    return {
      modalOpen: false
    };
  },
  methods: {
    handleChange(newContent) {
      if (newContent) {
        body.style.overflow = "hidden";
        window.scrollTo(0, 0);
      } else {
        body.style.overflow = "auto";
      }
    }
  }
};
</script>

<style lang="scss">
@import "styles/variables";
@import "styles/defaults";
@import "styles/utilities";

.nav {
  display: flex;
  padding: 1rem 2rem;
  border-top: 3px solid $gray-900;

  .link {
    text-decoration: none;
    border-bottom: 1px solid transparent;
    color: $gray-900;
    transition: 0.1s border-bottom-color;
    cursor: pointer;

    &:hover {
      border-bottom: 1px solid $gray-900;
    }
  }

  .logo {
    font-weight: lighter;
    font-size: 2rem;
    letter-spacing: 1px;
  }
}

@media (min-width: 768px) {
  .nav {
    padding-bottom: 0;
  }
}
</style>
