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
        <div v-if="edit" class="actions">
          -
          <button
            class="link remove"
            @click.prevent="() => removeComment(index)"
          >
            Remove
          </button>
          -
          <button class="link edit" @click.prevent="() => editComment(index)">
            Edit
          </button>
        </div>
      </div>
      <div v-if="editingComment === index" class="commentEdit">
        <textarea v-model="taskComment.text" class="textarea"></textarea>
        <Button class="save" @click.native.prevent="() => saveComment(index)"
          >Save</Button
        >
      </div>
      <p v-else class="text">{{ taskComment.text }}</p>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Button from "@/components/Button";
export default {
  name: "Comments",
  components: { Button },
  props: {
    comments: { type: Array, required: true },
    edit: { type: Boolean, required: false, default: false }
  },
  data: function() {
    return {
      editingComment: null
    };
  },
  methods: {
    ...mapActions(["deleteComment", "updateComment"]),
    removeComment(index) {
      this.deleteComment(this.comments[index].id);
    },
    editComment(index) {
      this.editingComment = index;
    },
    saveComment(index) {
      this.updateComment(this.comments[index]);
      this.editingComment = null;
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
.save,
.remove,
.edit,
.meta {
  font-size: small;
}
.commentEdit {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
}
.textarea {
  width: 100%;
  border: 1px solid $gray;
  display: block;
  padding: 0.4rem;
  margin: 0;
  font-size: $font-size;
  font-family: initial;
}
.save {
  margin-top: 0.5rem;
}
.actions {
  display: inline-block;
  margin-left: 0.2rem;
}
</style>
