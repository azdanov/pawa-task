export default {
  sortTasks({ state }) {
    state.tasks.sort((a, b) => b.id - a.id);
  },
  async fetchTasks({ commit, dispatch }) {
    const body = await fetch("/api/tasks");
    const tasks = await body.json();

    commit("FETCH_TASKS", tasks);
    dispatch("sortTasks");
  },
  async saveComment({ commit, dispatch }, { taskId, comment }) {
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
    dispatch("sortTasks");
  },
  async updateComment({ commit, dispatch }, comment) {
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
    dispatch("sortTasks");
  },
  async deleteComment({ dispatch }, commentId) {
    const response = await fetch(`/api/comments/${commentId}`, {
      method: "delete"
    });

    if (!response.ok) {
      return;
    }

    dispatch("fetchTasks");
    dispatch("sortTasks");
  },
  async saveTask({ commit, dispatch }, task) {
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
    dispatch("sortTasks");
  },
  async updateTask({ commit, dispatch }, task) {
    const response = await fetch(`/api/tasks`, {
      method: "put",
      body: JSON.stringify(task),
      headers: { "Content-Type": "application/json" }
    });
    if (!response.ok) {
      return;
    }

    const taskNew = await response.json();
    commit("UPDATE_TASK", taskNew);
    dispatch("sortTasks");
  }
};
