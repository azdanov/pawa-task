import { parse } from "date-fns";

export default {
  sortTasks({ state }) {
    state.tasks.sort((a, b) => a.id - b.id);
  },
  async getTasks({ commit, dispatch }) {
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
  async saveTask({ commit, dispatch }, task) {
    const response = await fetch(`/api/tasks`, {
      method: "post",
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
  async deleteTask({ dispatch }, taskId) {
    const response = await fetch(`/api/tasks/${taskId}`, {
      method: "delete"
    });

    if (!response.ok) {
      console.error(response);
      return;
    }

    dispatch("getTasks");
  },
  async completeTask({ dispatch }, task) {
    task.status = !task.status;

    dispatch("updateTask", task);
  },
  async saveComment({ commit, dispatch }, { taskId, comment }) {
    const response = await fetch(`/api/tasks/${taskId}/comments`, {
      method: "post",
      body: JSON.stringify(comment),
      headers: { "Content-Type": "application/json" }
    });

    if (!response.ok) {
      console.error(response);
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
      console.error(response);
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
      console.error(response);
      return;
    }

    dispatch("getTasks");
  }
};
