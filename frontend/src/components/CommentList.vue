<template>
  <div class="comments">
    <Portal v-if="openModal" to="modal">
      <CommentModal
        :close="() => (openModal = false)"
        :comment="selectedComment"
        :task-id="taskId"
        :edit="selectedComment !== undefined"
      ></CommentModal>
    </Portal>
    <button class="link add" @click.stop="addComment">
      Add&nbsp;Comment
    </button>

    <div v-for="comment in comments" :key="comment.id" class="comments__item">
      <p>{{ comment.description }}</p>
      <button class="link edit" @click.stop="editComment(comment.id)">
        Edit&nbsp;Comment
      </button>
    </div>
  </div>
</template>

<script>
import CommentModal from "@/components/Modal/CommentModal";

export default {
  name: "CommentList",
  components: { CommentModal },
  props: {
    comments: { type: Array, required: false, default: () => [] },
    taskId: { type: Number, required: true }
  },
  data: function() {
    return { openModal: false };
  },
  methods: {
    addComment() {
      this.openModal = true;
      this.selectedComment = undefined;
    },
    editComment(commentId) {
      this.openModal = true;
      this.selectedComment = this.comments.filter(
        ({ id }) => id === commentId
      )[0];
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/variables";

.comments {
  font-size: $text-sm;
  margin-top: 1rem;

  &__item {
    padding: 0.5rem 0;
    margin-right: 0.5rem;
    line-height: 1.3;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid $gray-100;

    &:last-child {
      border-bottom: none;
    }
  }
}

.add,
.edit {
  font-size: 0.7rem;
}

.edit {
}
</style>
