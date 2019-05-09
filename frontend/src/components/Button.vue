<template>
  <button class="button" @click="onClick"><slot></slot></button>
</template>

<script>
export default {
  name: "Button",
  props: { onClick: { type: Function, required: false, default: () => {} } }
};
</script>

<style scoped lang="scss">
@import "../styles/variables";
.button {
  background-color: $orange;
  font-family: initial;
  border: none;
  display: inline-block;
  cursor: pointer;
  color: $white;
  font-size: $font-size;
  font-weight: bold;
  padding: 0.4rem 0.8rem;
  text-decoration: none;
  margin-bottom: 7px;
}
</style>
