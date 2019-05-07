<template>
  <div class="box">
    <label :for="label" class="label">{{ label }}</label>
    <textarea
      v-if="type === 'textarea'"
      :id="label"
      class="focus textarea"
      :value="value"
      rows="4"
    ></textarea>
    <input
      v-else
      :id="label"
      :type="type"
      :value="value"
      class="focus input"
      @input="$emit('input', $event.target.value)"
    />
  </div>
</template>

<script>
export default {
  name: "Input",
  props: {
    type: { type: String, required: true },
    label: { type: String, required: true },
    value: { type: [String, Boolean], required: true }
  }
};
</script>

<style scoped lang="scss">
@import "../../styles/variables";

.box,
.input,
.textarea {
  width: 100%;
  color: $gray-800;
  margin: 0.3rem 0;
}

.label {
  font-weight: 400;
  font-size: 1rem;
  margin: 0.3rem 0;
}

.input {
  font-size: $text-sm;
  padding: 0.3rem;
  border: 1px solid $gray-100;
}

.textarea {
  margin-top: 0.3rem;
  font-size: $text-sm;
  color: $gray-800;
  border: 1px solid $gray-100;
}
</style>
