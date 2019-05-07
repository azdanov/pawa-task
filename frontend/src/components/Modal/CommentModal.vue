<template>
  <ModalBase :close="close">
    <Form>
      <input :value="newComment.id" name="id" type="hidden" />
      <input :value="newComment.task_id" name="task_id" type="hidden" />
      <Input :value="newComment.description" label="Comment" type="textarea" />
      <Button>Submit</Button>
    </Form>
  </ModalBase>
</template>

<script>
import Button from "@/components/Button";
import ModalBase from "@/components/Modal/ModalBase";
import Form from "@/components/Form/Form";
import Input from "@/components/Form/Input";

export default {
  name: "CommentModal",
  components: { Input, Form, ModalBase, Button },
  props: {
    close: { type: Function, required: true },
    comment: {
      type: Object,
      required: false,
      default: () => ({ id: 0, description: "", task_id: 0 })
    }
  },
  computed: {
    newComment() {
      return { ...this.comment };
    }
  }
};
</script>

<style lang="scss" scoped></style>
