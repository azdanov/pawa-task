<template>
  <div class="box">
    <input
      :id="label"
      :value="value"
      class="checkbox"
      type="checkbox"
      @input="$emit('input', $event.target.value)"
    />
    <label :for="label" class="label"
      >{{ label }} <span class="checkmark"></span
    ></label>
  </div>
</template>

<script>
export default {
  name: "Checkbox",
  props: {
    label: { type: String, required: true },
    value: { type: [Boolean, String], required: true }
  }
};
</script>

<style lang="scss" scoped>
@import "../../styles/variables";

.box {
  width: 100%;
  color: $gray-800;
  margin: 0.3rem 0;
  position: relative;
  display: flex;
  align-items: center;
}

.label {
  font-weight: 400;
  font-size: 1rem;
  margin: 0.3rem 0;
}

.checkbox {
  opacity: 0;
  position: absolute;
  margin-right: 1rem;
  line-height: 1.25;
  font-size: 1.125rem;
}

.checkbox + .label:before {
  width: 1.25rem;
  height: 1.25rem;
  border: 1px solid $gray-100;
  position: absolute;
  left: 9ch;
  top: 0;
  margin-top: 0.25rem;
  content: " ";
}

.checkbox:checked + .label:before {
  border: 1px solid $gray-800;
  background: $gray-800;
}

.checkmark {
  position: absolute;
  display: inline-block;
  top: 2px;
  left: 110px;
  margin-top: 0.25rem;
  cursor: pointer;
  width: 22px;
  height: 20px;
  -webkit-transform: rotate(45deg);
  transform: rotate(45deg);
}

.checkmark:before {
  position: absolute;
  background-color: #fff;
  content: "";
  width: 3px;
  height: 12px;
  left: 12px;
  top: 3px;
}

.checkmark:after {
  position: absolute;
  background-color: #fff;
  content: "";
  width: 5px;
  height: 3px;
  left: 8px;
  top: 12px;
}

.checkbox:focus + .label:before {
  box-shadow: 0 0 0 3px rgba($blue, 0.5);
  outline: 0;
}
</style>
