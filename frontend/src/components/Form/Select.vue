<template>
  <div class="box">
    <Arrow class="arrow"></Arrow>
    <label :for="label" class="label">{{ label }} </label>
    <select :id="label" :value="value" class="focus select">
      <option v-for="choice in choices" :key="choice">{{ choice }}</option>
    </select>
  </div>
</template>

<script>
import Arrow from "@/components/Icons/Arrow";

export default {
  name: "Select",
  components: { Arrow },
  props: {
    label: { type: String, required: true },
    value: { type: String, required: true },
    choices: { type: Array, required: true }
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
}

.label {
  font-weight: 400;
  font-size: 1rem;
  margin: 0.3rem 0;
}

.select {
  margin-top: 0.3rem;
  width: 100%;
  -webkit-appearance: none;
  -webkit-border-radius: 0;
  background-color: $white;
  border-color: $gray-100;
  padding: 0.3rem 0.5rem;
  font-size: $text-sm;
}

.arrow {
  z-index: 100;
  width: 1.2rem;
  height: 1.2rem;
  right: 5px;
  top: 34px;
  float: right;
  position: absolute;
  color: $gray-500;
  pointer-events: none;
}
</style>
