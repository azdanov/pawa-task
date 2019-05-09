<template>
  <div class="wrapper">
    <input
      :id="name"
      class="checkbox"
      type="checkbox"
      :checked="value"
      :value="value"
      @input="$emit('input', !value)"
    />
    <label :for="name" class="label" @click="onChecked()">
      <h2 class="title"><slot></slot></h2>
      <span class="checkmark"></span>
    </label>
  </div>
</template>

<script>
export default {
  name: "Checkbox",
  props: {
    name: { type: [String, Number], required: true },
    value: { type: [String, Boolean], required: true },
    onChecked: { type: Function, required: true }
  }
};
</script>

<style scoped lang="scss">
@import "../styles/variables";
.wrapper {
  display: flex;
  align-items: center;
}
.title {
  font-weight: normal;
  font-size: $font-size;
  margin: 0 0 0 0.1rem;
}

.label {
  font-weight: 400;
  font-size: 1rem;
  margin: 0.3rem 0;
  cursor: pointer;
}
.checkbox {
  opacity: 0;
  z-index: 10;
  margin-right: 0.5rem;
  cursor: pointer;
}
.checkbox + .label:before {
  width: 0.8rem;
  height: 0.8rem;
  border: 1px solid $gray-darker;
  position: absolute;
  z-index: 0;
  left: 0;
  content: " ";
  margin-top: 2px;
}

.checkmark {
  opacity: 0;
  position: absolute;
  display: inline-block;
  top: 8px;
  left: -4px;
  margin-top: 0.25rem;
  cursor: pointer;
  width: 22px;
  height: 20px;
  -webkit-transform: rotate(45deg);
  transform: rotate(45deg);

  &:before {
    position: absolute;
    background-color: $gray-darker;
    content: "";
    width: 2px;
    height: 9px;
    left: 13px;
    top: 6px;
  }

  &:after {
    position: absolute;
    background-color: $gray-darker;
    content: "";
    width: 4px;
    height: 2px;
    left: 10px;
    top: 13px;
  }
}

.checkbox:checked {
  & + .label {
    opacity: 0.5;
  }
  & + .label .checkmark {
    opacity: 1;
  }
}
</style>
