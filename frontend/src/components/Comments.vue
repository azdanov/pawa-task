<template>
  <div class="comments">
    <p v-if="comments.length === 0" class="none">None available</p>
    <div
      v-for="(taskComment, index) in comments"
      v-else
      :key="taskComment.id"
      class="comment"
    >
      <div class="meta">
        <small class="date"
          ><timeago :datetime="taskComment.date"></timeago
        ></small>
        -
        <button class="link remove" @click.prevent="() => removeComment(index)">
          Remove
        </button>
        -
        <button class="link edit" @click.prevent="() => editComment(index)">
          Edit
        </button>
      </div>
      <p class="text">{{ taskComment.text }}</p>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "Comments",
  props: {
    comments: { type: Array, required: true },
    edit: { type: Boolean, required: false, default: false }
  },
  methods: {
    ...mapActions(["deleteComment"]),
    removeComment(index) {
      this.deleteComment(this.comments[index].id);
    },
    editComment(index) {
      console.log(index);
    }
  }
};
</script>

<style scoped lang="scss">
@import "../styles/variables";
@import "../styles/common";
.comments {
  max-height: 200px;
  overflow: auto;
}
.comment {
  padding-bottom: 1.5rem;
  &:last-child {
    padding-bottom: 0;
  }
}
.text,
.date {
  margin: 0;
}
.date {
  display: inline-block;
  margin-bottom: 0.2rem;
  color: darken($gray, 20%);
}
.none {
  margin: 0;
  color: $gray;
}
.remove,
.edit,
.meta {
  font-size: small;
}
</style>
