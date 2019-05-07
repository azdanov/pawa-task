<template>
  <div class="box">
    <label :for="label" class="label">{{ label }}</label>
    <input
      :id="label"
      :value="parsedDate"
      class="focus input"
      type="datetime-local"
      @input="$emit('input', $event.target.value)"
    />
  </div>
</template>

<script>
import { format, parse } from "date-fns";

export default {
  name: "DateTime",
  props: {
    label: { type: String, required: true },
    value: { type: [String, Boolean], required: true }
  },
  computed: {
    parsedDate() {
      return format(
        parse(this.value, "yyyy-MM-dd HH:mm:ss.SSSxx"),
        "YYYY-MM-DDTHH:mm"
      );
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../styles/variables";

.box,
.input {
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
</style>
