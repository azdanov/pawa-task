<template>
  <ModalBase :close="close">
    <Form :on-submit="submit">
      <input :value="newTask.id" name="id" type="hidden" />
      <Input v-model="newTask.title" label="Title" type="text" />
      <Input
        v-model="newTask.description"
        label="Description"
        type="textarea"
      />
      <Select v-model="newTask.priority" :choices="priority" label="Priority" />
      <DateTime v-model="newTask.dueDate" label="Due Date" />
      <div class="actions">
        <Checkbox v-model="newTask.status" label="Completed" />
        <Button class="button">Submit</Button>
      </div>
    </Form>
  </ModalBase>
</template>

<script>
import Button from "@/components/Button";
import ModalBase from "@/components/Modal/ModalBase";
import Form from "@/components/Form/Form";
import Input from "@/components/Form/Input";
import Select from "@/components/Form/Select";
import Checkbox from "@/components/Form/Checkbox";
import DateTime from "@/components/Form/DateTime";

export default {
  name: "TaskModal",
  components: { DateTime, Checkbox, Input, Form, ModalBase, Button, Select },
  props: {
    close: { type: Function, required: true },
    task: {
      type: Object,
      required: false,
      default: () => ({
        id: 0,
        title: "",
        description: "",
        priority: "",
        status: false,
        dueDate: ""
      })
    }
  },
  data: function() {
    return { priority: ["LOW", "NORMAL", "HIGH"] };
  },
  computed: {
    newTask() {
      return { ...this.task };
    }
  },
  methods: {
    submit() {
      this.close();
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../styles/variables";

.label {
  font-weight: 300;
  font-size: 1.5rem;
  text-align: center;
  color: $gray-800;
}

.actions {
  display: flex;
  width: 100%;
  margin-top: 1rem;
}
</style>
