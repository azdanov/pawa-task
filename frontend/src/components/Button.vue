<template>
  <button
    :class="{ button: true, 'button--disabled': disabled }"
    :disabled="disabled"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "Button",
  props: {
    disabled: { type: Boolean, required: false, default: false }
  }
};
</script>

<style scoped lang="scss">
@import "../styles/variables";

.button {
  border: 1px solid $orange;
  background-color: $orange;
  font-family: initial;
  display: inline-block;
  cursor: pointer;
  color: $white;
  font-size: $font-size;
  font-weight: bold;
  padding: 0.4rem 0.8rem;
  text-decoration: none;

  &--disabled {
    border: 1px solid lighten($orange, 20%);
    background-color: lighten($orange, 20%);
    cursor: not-allowed;
  }
}
</style>
