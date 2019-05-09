<template>
  <div>
    <div class="overlay" @click="close()"></div>
    <div ref="modal" :style="`margin-top: -${modalHeight / 2}px`" class="box">
      <header class="header">
        <h2 ref="title" class="title" tabindex="-1">{{ title }}</h2>
        <button class="link close" @click="close()">
          <img class="close" src="../../assets/multiply.png" alt="Close" />
        </button>
      </header>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "ModalBase",
  props: {
    title: { type: String, required: true },
    close: { type: Function, required: true }
  },
  data: function() {
    return { modalHeight: 0 };
  },
  mounted() {
    this.$refs.title.focus();
    this.modalHeight = this.$refs.modal.clientHeight;
  }
};
</script>

<style lang="scss" scoped>
@import "../../styles/variables";

.title {
  margin: 0;
  &:focus {
    outline: none;
  }
}

.overlay {
  width: 100%;
  position: absolute;
  height: 100vh;
  background-color: #001919;
  opacity: 0.7;
  top: 0;
  left: 0;
  overflow: hidden;
}

.box {
  background: $white;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 300px;
  margin-left: -150px;
  border: 1px solid $gray;
  padding: 1rem;

  @media (min-width: 600px) {
    width: 400px;
    margin-left: -200px;
  }
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;

  .close {
    cursor: pointer;
    border: none;
    width: 1.2rem;
    height: 1.2rem;
    padding: 0;
  }
}
</style>
