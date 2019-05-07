<template>
  <form class="form">
    <slot></slot>
  </form>
</template>

<script>
export default {
  name: "Form"
};
</script>

<style lang="scss" scoped>
.form {
  margin: 1rem 2rem;
  display: flex;
  align-items: center;
  flex-direction: column;
}
</style>
