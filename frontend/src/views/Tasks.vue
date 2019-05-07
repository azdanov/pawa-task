<template>
  <div>
    <h1 class="title">Tasks</h1>
    <TaskList :tasks="tasks"></TaskList>
  </div>
</template>

<script>
import { mapState } from "vuex";
import TaskList from "@/components/TaskList";

export default {
  components: { TaskList },
  computed: {
    ...mapState(["tasks"])
  },
  created() {
    this.$store.dispatch("fetchTasks");
  }
};
</script>

<style lang="scss" scoped>
.title {
  margin: 0 0 1.5rem;
  font-size: 3rem;
  font-weight: lighter;
  text-align: center;
}
</style>
