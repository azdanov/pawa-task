<template>
  <div class="body">
    <Portal v-if="openModal" to="modal">
      <TaskModal :close="() => (openModal = false)"></TaskModal>
    </Portal>
    <main class="main">
      <header class="header">
        <h1 class="title">PawaTask</h1>
        <Button @click.native.prevent="addTask">Add a new task</Button>
      </header>
      <TaskList v-if="tasks" :tasks="tasks"></TaskList>
      <p v-else>
        You do not have any tasks <button class="link">add a new task</button>
      </p>
    </main>
  </div>
</template>

<script>
import { mapState } from "vuex";
import TaskList from "../components/TaskList";
import Button from "../components/Button";
import TaskModal from "../components/Modal/TaskModal";

export default {
  components: { Button, TaskList, TaskModal },
  data: function() {
    return { openModal: false };
  },
  computed: {
    ...mapState(["tasks"])
  },
  created() {
    this.$store.dispatch("getTasks");
  },
  methods: {
    addTask() {
      this.openModal = true;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/variables";
@import "../styles/common";

.body {
  background: $gray-lightest;
  min-height: 100vh;
  padding: 1.2rem;
}
.main {
  margin: 0 auto;
  background: $white;
  border: 1px solid $gray;
  padding: 1.5rem 1.3rem 1rem;

  @media (min-width: 600px) {
    width: 600px;
  }
}
.title {
  margin: 0;
  font-size: 1.5rem;
  line-height: 1px;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid $gray;
  padding-bottom: 0.8rem;
}
</style>
