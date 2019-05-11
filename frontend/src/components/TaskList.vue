<template>
  <ul class="list">
    <Portal v-if="openEditModal" to="modal">
      <TaskModal
        :edit="true"
        :close="() => (openEditModal = false)"
        :task="tasks[selectedTask]"
      ></TaskModal>
    </Portal>
    <Portal v-if="openShowModal" to="modal">
      <CommentModal
        :edit="true"
        :close="() => (openShowModal = false)"
        :task="tasks[selectedTask]"
        :action="{
          title: 'Edit task',
          callback: () => {
            openShowModal = false;
            openEditModal = true;
          }
        }"
      ></CommentModal>
    </Portal>
    <li v-for="(task, index) in tasks" :key="task.id" class="task">
      <Checkbox
        v-model="task.status"
        :name="task.id"
        :on-checked="() => toggleStatus(task)"
        >{{ task.title }}</Checkbox
      >
      <div class="panel">
        <div class="panel__date">
          <img class="icon" src="../assets/calendar.png" alt="Calendar" />
          <span class="date">{{ task.dueDate | date }}</span>
        </div>
        <div class="panel__actions">
          <Button @click.native.prevent="() => openModal('show', index)"
            ><img
              class="icon"
              src="../assets/speech-bubble.png"
              alt="Speech Icon"
          /></Button>
          <Button @click.native.prevent="() => openModal('edit', index)"
            ><img class="icon" src="../assets/pencil.png" alt="Pencil"
          /></Button>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
import { mapActions } from "vuex";
import Button from "../components/Button";
import TaskModal from "../components/Modal/TaskModal";
import Checkbox from "../components/Checkbox";
import CommentModal from "@/components/Modal/CommentModal";

export default {
  components: { CommentModal, Checkbox, Button, TaskModal },
  props: { tasks: { type: Array, required: true } },
  data: function() {
    return {
      openEditModal: false,
      openShowModal: false,
      selectedTask: 0
    };
  },
  methods: {
    ...mapActions(["completeTask"]),
    toggleStatus(task) {
      this.completeTask(task);
    },
    openModal(type, index) {
      if (type === "show") {
        this.openShowModal = true;
      } else {
        this.openEditModal = true;
      }
      this.selectedTask = index;
    }
  }
};
</script>

<style scoped lang="scss">
@import "../styles/variables";
.list {
  margin: 0;
  padding: 0;
  list-style-type: none;
}
.task {
  display: flex;
  border-bottom: 1px solid $gray;
  padding: 0.6rem 0;
  position: relative;
  justify-content: space-between;
  align-items: center;

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
}
.panel {
  display: flex;
  align-items: center;
  flex-direction: column;

  .panel__actions {
    display: flex;
    align-items: center;
  }

  .panel__date {
    display: none;
  }

  @media (min-width: 600px) {
    .panel__date {
      display: block;
    }
    flex-direction: row;
  }
}
.icon {
  height: 1.2rem;
  width: 1.2rem;
}
.date {
  font-size: $font-size;
  margin: 0 1rem 0 0.4rem;
}
.button {
  margin: 0 0.3rem 0.1rem;
  padding: 0.4rem;
  display: flex;
  align-items: center;

  .icon {
    height: 0.9rem;
    width: 0.9rem;
  }

  &:last-child {
    margin-right: 0;
  }
}
</style>
