<template>
  <form class="form" @submit.prevent="onSubmit">
    <slot></slot>
  </form>
</template>

<script>
export default {
  name: "Form",
  props: {
    onSubmit: { type: Function, required: true }
  }
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
