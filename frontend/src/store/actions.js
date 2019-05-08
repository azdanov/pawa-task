export default {
  async fetchTasks({ commit }) {
    const body = await fetch("/api/tasks");
    const tasks = await body.json();

    tasks.sort((a, b) => b.id - a.id);

    commit("FETCH_TASKS", tasks);
  },
  async saveComment({ commit }, { taskId, comment }) {
    const response = await fetch(`/api/tasks/${taskId}/comments`, {
      method: "post",
      body: JSON.stringify(comment),
      headers: { "Content-Type": "application/json" }
    });

    if (!response.ok) {
      return;
    }

    const task = await response.json();
    commit("UPDATE_TASK", task);
  },
  async updateComment({ commit }, comment) {
    const response = await fetch(`/api/comments`, {
      method: "put",
      body: JSON.stringify(comment),
      headers: { "Content-Type": "application/json" }
    });

    if (!response.ok) {
      return;
    }

    const commentUpdated = await response.json();
    commit("UPDATE_COMMENT", commentUpdated);
  },
  async deleteComment({ dispatch }, commentId) {
    const response = await fetch(`/api/comments/${commentId}`, {
      method: "delete"
    });

    if (!response.ok) {
      return;
    }

    dispatch("fetchTasks");
  },
  async saveTask({ commit }, task) {
    const response = await fetch(`/api/tasks`, {
      method: "post",
      body: JSON.stringify(task),
      headers: { "Content-Type": "application/json" }
    });
    if (!response.ok) {
      return;
    }

    const taskNew = await response.json();
    commit("UPDATE_TASK", taskNew);
  }
};
