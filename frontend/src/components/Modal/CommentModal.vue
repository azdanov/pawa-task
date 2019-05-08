<template>
  <ModalBase :close="close">
    <Form :on-submit="submit">
      <input :value="newComment.id" name="id" type="hidden" />
      <input :value="newComment.task_id" name="task_id" type="hidden" />
      <Input v-model="newComment.description" label="Comment" type="textarea" />
      <div class="actions">
        <button v-if="edit" class="link focus remove" @click.prevent="remove">
          Remove
        </button>
        <Button>Submit</Button>
      </div>
    </Form>
  </ModalBase>
</template>

<script>
import { mapActions } from "vuex";
import Button from "@/components/Button";
import ModalBase from "@/components/Modal/ModalBase";
import Form from "@/components/Form/Form";
import Input from "@/components/Form/Input";

export default {
  name: "CommentModal",
  components: { Input, Form, ModalBase, Button },
  props: {
    edit: { type: Boolean, required: false, default: false },
    close: { type: Function, required: true },
    taskId: { type: Number, required: true },
    comment: {
      type: Object,
      required: false,
      default: () => ({ id: 0, description: "", task_id: 0 })
    }
  },
  data: function() {
    return {
      newComment: null
    };
  },
  created() {
    this.newComment = Object.assign({}, this.newComment, { ...this.comment });
  },
  methods: {
    ...mapActions(["saveComment", "updateComment", "deleteComment"]),
    remove() {
      this.deleteComment(this.newComment.id);
      this.close();
    },
    submit() {
      if (this.edit) {
        this.updateComment(this.newComment);
      } else {
        this.saveComment({ taskId: this.taskId, comment: this.newComment });
      }
      this.close();
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../styles/variables";
.actions {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.remove {
  font-size: $text-sm;
  color: $gray-800;
}
</style>
