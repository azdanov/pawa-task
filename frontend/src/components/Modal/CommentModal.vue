<template>
  <ModalBase :close="close" :title="task.title" :action="action">
    <p class="description">{{ task.description }}</p>
    <div class="meta">
      <p><span class="bold">Date:</span> {{ task.dueDate | date }}</p>
      <p>
        <span class="bold">Priority:</span> {{ task.priority | capitalize }}
      </p>
    </div>
    <div class="comments">
      <div
        v-for="taskComment in task.comments"
        :key="taskComment.id"
        class="comment"
      >
        <small class="date"
          ><timeago :datetime="taskComment.date"></timeago
        ></small>
        <p class="text">{{ taskComment.text }}</p>
      </div>
    </div>
    <form class="form" @submit.prevent="submit">
      <input
        v-model="comment"
        class="input"
        type="text"
        placeholder="Write a comment..."
      />
      <Button class="button">Add&nbsp;comment</Button>
    </form>
  </ModalBase>
</template>

<script>
import { mapActions } from "vuex";
import ModalBase from "@/components/Modal/BaseModal";
import Button from "@/components/Button";

export default {
  name: "CommentModal",
  components: { Button, ModalBase },
  props: {
    task: { type: Object, required: true },
    close: { type: Function, required: true },
    action: {
      type: Object,
      required: false,
      default: () => ({ title: "", callback: () => {} })
    }
  },
  data: function() {
    return {
      comment: ""
    };
  },
  methods: {
    ...mapActions(["saveComment"]),
    submit() {
      this.saveComment({
        taskId: this.task.id,
        comment: { text: this.comment, date: new Date() }
      });
      this.comment = "";
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../styles/variables";

.description {
  margin-top: 1rem;
}
.meta {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid $gray;
  padding-bottom: 0.5rem;
  margin-bottom: 1.5rem;
}
.bold {
  font-weight: bold;
}
.comments {
  max-height: 200px;
  overflow: auto;
  .comment {
    padding-bottom: 1.5rem;
    .text,
    .date {
      margin: 0;
    }
    .date {
      display: inline-block;
      margin-bottom: 0.2rem;
      color: darken($gray, 20%);
    }
  }
}

.form {
  border-top: 1px solid $gray;
  background-color: $gray-lightest;
  margin: 0 -1rem -1rem -1rem;
  padding: 1.2rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .input {
    display: inline-block;
    width: 100%;
    padding: 0.4rem;
    border: 1px solid $gray;
    font-size: $font-size;
    margin: 0 0.6rem 0 0;
    font-family: initial;

    &::placeholder {
      color: $gray;
    }
  }

  .button {
    border: 1px solid $orange;
  }
}
</style>
