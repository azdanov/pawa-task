<template>
  <ModalBase :close="close">
    <Form>
      <input type="hidden" name="id" :value="newComment.id" />
      <input type="hidden" name="task_id" :value="newComment.task_id" />
      <Input type="textarea" label="Comment" :value="newComment.description" />
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

<style scoped lang="scss"></style>
