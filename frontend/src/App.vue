<template>
  <div>
    <router-view />
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
    /**
     * Prevent scrolling of the main window.
     * @param {Boolean} newContent
     */
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
@import "styles/global";
@import "styles/variables";

p,
a,
h1,
h2 {
  color: $gray-darker;
}
</style>
