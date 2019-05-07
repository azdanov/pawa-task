<template>
  <div class="tasks">
    <Portal v-if="openModal" to="modal">
      <TaskModal :close="() => (openModal = false)"></TaskModal>
    </Portal>
    <div class="box">
      <button class="link add" @click.stop="addTask">Add Task</button>
      <Task
        v-for="task in tasks"
        :key="task.id"
        :task="task"
        :open="open[task.id]"
        @toggle="toggle"
      ></Task>
    </div>
  </div>
</template>

<script>
import Task from "@/components/Task";
import TaskModal from "@/components/Modal/TaskModal";
export default {
  name: "TaskList",
  components: { TaskModal, Task },
  props: { tasks: { type: Array, required: true } },
  data: function() {
    return { open: {}, openModal: false };
  },
  created() {
    this.tasks.forEach(({ id }) => {
      this.$set(this.open, id, false);
    });
  },
  methods: {
    addTask() {
      this.openModal = true;
    },
    toggle(id) {
      this.$set(this.open, id, !this.open[id]);
    }
  }
};
</script>

<style scoped lang="scss">
@import "../styles/variables";
.tasks {
  margin: 0 auto 3rem;

  @media (min-width: 768px) {
    & {
      width: 100%;
    }
  }

  @media (min-width: 992px) {
    & {
      width: 80%;
    }
  }

  @media (min-width: 1200px) {
    & {
      width: 70%;
    }
  }
}

.box {
  box-shadow: 0 2px 4px 0 rgba($gray-900, 0.2),
    0 25px 50px 0 rgba($gray-900, 0.1);
  position: relative;
}

.add {
  font-size: $text-sm;
  position: absolute;
  top: -1.3rem;
  right: 1rem;
}
</style>
