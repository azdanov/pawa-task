export default {
  async fetchTasks({ commit }) {
    const body = await fetch("/api/tasks");
    const tasks = await body.json();

    commit("FETCH_TASKS", tasks);
  }
};
