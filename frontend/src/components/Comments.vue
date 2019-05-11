<template>
  <article class="comments">
    <p v-if="comments.length === 0" class="none">None available</p>
    <section
      v-for="(taskComment, index) in comments"
      v-else
      :key="taskComment.id"
      class="comment"
    >
      <div class="meta">
        <small class="date">
          <timeago :datetime="taskComment.date"></timeago>
        </small>
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
      <div
        v-if="editingComment && editingComment.id === taskComment.id"
        class="commentEdit"
      >
        <textarea
          v-model.trim="$v.editingComment.text.$model"
          :class="{
            textarea: true,
            'textarea--error': $v.editingComment.text.$error
          }"
          placeholder="Enter a comment"
        ></textarea>
        <Button
          class="link cancel"
          @click.native.prevent="editingComment = null"
          >Cancel
        </Button>
        <Button
          class="save"
          :disabled="$v.editingComment.text.$error"
          @click.native.prevent="() => saveComment(index)"
          >Save
        </Button>
      </div>
      <p v-else class="text">{{ taskComment.text }}</p>
    </section>
  </article>
</template>

<script>
import { mapActions } from "vuex";
import required from "vuelidate/src/validators/required";
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
  validations: {
    editingComment: {
      text: {
        required
      }
    }
  },
  methods: {
    ...mapActions(["deleteComment", "updateComment"]),
    removeComment(index) {
      if (!window.confirm(`Remove this comment?`)) {
        return;
      }
      this.deleteComment(this.comments[index].id);
    },
    editComment(index) {
      this.editingComment = Object.assign(
        {},
        this.editingComment,
        this.comments[index]
      );
    },
    saveComment(index) {
      if (this.$v.editingComment.text.$invalid) {
        this.$v.comment.$touch();
        return;
      }

      if (!this.$v.editingComment.$dirty) {
        this.editingComment = null;
        return;
      }

      this.updateComment(this.editingComment);
      this.$set(this.comments[index], "text", this.editingComment.text);
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

.cancel,
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

  &--error {
    border: 1px solid $orange;

    &::placeholder {
      color: $orange;
    }
  }
}

.cancel,
.save {
  margin-top: 0.5rem;
}

.cancel {
  margin-right: 1rem;
}

.actions {
  display: inline-block;
  margin-left: 0.2rem;
}
</style>
