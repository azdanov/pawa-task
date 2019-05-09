import { parse } from "date-fns";

export default {
  sortTasks({ state }) {
    state.tasks.sort((a, b) => a.id - b.id);
  },
  async fetchTasks({ commit, dispatch }) {
    const response = await fetch("/api/tasks");
    const tasks = await response.json();
    if (!response.ok) {
      console.error(response);
      return;
    }

    tasks.forEach(task => (task.dueDate = parse(task.dueDate)));

    commit("SAVE_TASKS", tasks);
    dispatch("sortTasks");
  },
  async updateTask({ commit, dispatch }, task) {
    const response = await fetch(`/api/tasks`, {
      method: "put",
      body: JSON.stringify(task),
      headers: { "Content-Type": "application/json" }
    });
    if (!response.ok) {
      console.error(response);
      return;
    }

    const taskNew = await response.json();
    commit("UPDATE_TASK", taskNew);
    dispatch("sortTasks");
  },
  async completeTask({ dispatch }, task) {
    task.status = !task.status;

    dispatch("updateTask", task);
  }
};
