export default {
  FETCH_TASKS(state, tasks) {
    state.tasks = tasks;
  },
  UPDATE_TASK(state, task) {
    state.tasks = [task, ...state.tasks.filter(({ id }) => id !== task.id)];
  },
  UPDATE_COMMENT(state, comment) {
    // FIXME: Find a better approach
    //   Issues with bidirectional one-to-many in spring rest not setting foreign keys
    const task = state.tasks.find(({ comments }) => {
      return comments.find(({ id }) => id === comment.id);
    });

    task.comments = [
      ...task.comments.filter(({ id }) => id !== comment.id),
      comment
    ];
  }
};
