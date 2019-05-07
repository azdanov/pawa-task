export default {
  async fetchTasks({ commit }) {
    const body = await fetch("/api/tasks");
    const tasks = await body.json();

    commit("FETCH_TASKS", tasks);
  },
  async saveComment({ commit }, { taskId, comment }) {
    const response = await fetch(`/api/tasks/${taskId}/comments`, {
      method: "post",
      body: JSON.stringify(comment),
      headers: { "Content-Type": "application/json" }
    });
    const task = await response.json();
    commit("UPDATE_TASK", task);
  },
  async updateComment({ commit }, comment) {
    const response = await fetch(`/api/comments`, {
      method: "put",
      body: JSON.stringify(comment),
      headers: { "Content-Type": "application/json" }
    });
    const commentUpdated = await response.json();
    commit("UPDATE_COMMENT", commentUpdated);
  }
};
