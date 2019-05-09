export default {
  SAVE_TASKS(state, tasks) {
    state.tasks = tasks;
  },
  UPDATE_TASK(state, task) {
    state.tasks = [task, ...state.tasks.filter(({ id }) => id !== task.id)];
  }
};
