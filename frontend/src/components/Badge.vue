<template>
  <div :class="classes">
    <slot></slot>
  </div>
</template>

<script>
export const COMPLETE = "complete";
export const INCOMPLETE = "incomplete";

export default {
  name: "Badge",
  props: {
    state: {
      type: String,
      default: INCOMPLETE,
      validator: val => [COMPLETE, INCOMPLETE].includes(val)
    }
  },
  computed: {
    classes() {
      let style;

      switch (this.state) {
        case COMPLETE:
          style = "green";
          break;
        case INCOMPLETE:
          style = "red";
          break;
      }

      return ["badge", style];
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/variables";

.badge {
  box-shadow: inset 0 2px 4px 0 rgba($gray-500, 0.06);
  padding: 0.15rem 0.75rem;
  display: inline-block;
}

.green {
  background-color: #c6f7e2;
  color: #0c6b58;
}

.red {
  background-color: #ffbdbd;
  color: #8a041a;
}
</style>
