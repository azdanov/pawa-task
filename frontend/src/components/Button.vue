<template>
  <button class="focus button">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "Button"
};
</script>

<style lang="scss" scoped>
@import "../styles/variables";

.button {
  background-color: $white;
  border: 1px solid $gray-100;
  display: inline-block;
  cursor: pointer;
  color: $gray-700;
  font-size: 15px;
  font-weight: bold;
  padding: 6px 24px;
  text-decoration: none;
  text-transform: uppercase;

  &:hover {
    background-color: $gray-100;
    color: $gray-800;
  }
}
</style>
