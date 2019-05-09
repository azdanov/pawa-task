<template>
  <ul class="list">
    <li v-for="task in tasks" :key="task.id" class="task">
      <Checkbox
        v-model="task.status"
        :name="task.id"
        :on-checked="() => toggleStatus(task)"
        >{{ task.title }}</Checkbox
      >
      <div class="panel">
        <img class="icon" src="../assets/calendar.png" alt="Calendar" />
        <span class="date">{{ task.dueDate | date }}</span>
        <Button
          ><img class="icon" src="../assets/speech-bubble.png" alt="Speech Icon"
        /></Button>
        <Button
          ><img class="icon" src="../assets/pencil.png" alt="Pencil"
        /></Button>
      </div>
    </li>
  </ul>
</template>

<script>
import { mapActions } from "vuex";
import Button from "@/components/Button";
import Checkbox from "@/components/Checkbox";
export default {
  components: { Checkbox, Button },
  props: { tasks: { type: Array, required: true } },
  methods: {
    ...mapActions(["completeTask"]),
    toggleStatus(task) {
      this.completeTask(task);
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
  align-items: center;
  display: flex;
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
