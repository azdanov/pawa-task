<template>
  <div>
    <div class="overlay" @click="close()"></div>
    <div ref="modal" :style="`margin-top: -${modalHeight / 2}px`" class="box">
      <button ref="close" class="link close focus" @click="close()">
        Close
      </button>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "ModalBase",
  props: { close: { type: Function, required: true } },
  data: function() {
    return { modalHeight: 0 };
  },
  mounted() {
    this.$refs.close.focus();
    this.modalHeight = this.$refs.modal.clientHeight;
  }
};
</script>

<style lang="scss" scoped>
@import "../../styles/variables";

.overlay {
  width: 100%;
  position: absolute;
  height: 100vh;
  background-color: $gray-500;
  opacity: 0.5;
  top: 0;
  left: 0;
  overflow: hidden;
}

.box {
  background: #ffffff;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 400px;
  margin-left: -200px;
  box-shadow: 0 2px 4px 0 rgba($gray-900, 0.2),
    0 25px 50px 0 rgba($gray-900, 0.1);
}

.close {
  position: absolute;
  right: 10px;
  top: 10px;
}
</style>
