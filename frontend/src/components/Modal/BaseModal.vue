<template>
  <div class="modal">
    <div class="overlay" @click="close()"></div>
    <div ref="modal" class="box">
      <header class="header">
        <div class="section">
          <h2 ref="title" class="title" tabindex="-1">{{ title }}</h2>
          <button class="link action" @click="action.callback">
            {{ action.title }}
          </button>
        </div>
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
    close: { type: Function, required: true },
    action: {
      type: Object,
      required: false,
      default: () => ({ title: "", callback: () => {} })
    }
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
@import "../../styles/common";

.title {
  margin: 0;
  &:focus {
    outline: none;
  }
}

.modal {
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.overlay {
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: #001919;
  opacity: 0.7;
  top: 0;
  left: 0;
  overflow: hidden;
}

.box {
  z-index: 10;
  background: $white;
  border: 1px solid $gray;
  padding: 1rem;
  width: 100%;
  overflow: scroll;
  @media (min-width: 640px) {
    width: 500px;
  }
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;

  .section {
    display: flex;
    align-items: center;

    .action {
      white-space: nowrap;
      display: inline-block;
      margin-left: 0.8rem;
      margin-top: 0.2rem;
      margin-right: 1rem;
    }
  }

  .close {
    cursor: pointer;
    border: none;
    width: 1.2rem;
    height: 1.2rem;
    padding: 0;
    margin-top: 0.1rem;

    @media (min-width: 640px) {
      margin-top: 0;
    }
  }
}
</style>
