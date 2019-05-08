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
      <Checkbox v-model="newTask.status" label="Completed" />
      <div class="actions">
        <button v-if="edit" class="link focus remove" @click.prevent="remove">
          Remove
        </button>
        <Button class="button">Submit</Button>
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
import Select from "@/components/Form/Select";
import Checkbox from "@/components/Form/Checkbox";
import DateTime from "@/components/Form/DateTime";

export default {
  name: "TaskModal",
  components: { DateTime, Checkbox, Input, Form, ModalBase, Button, Select },
  props: {
    close: { type: Function, required: true },
    edit: { type: Boolean, required: false, default: false },
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
    return {
      priority: ["LOW", "NORMAL", "HIGH"],
      newTask: null
    };
  },
  created() {
    this.newTask = Object.assign({}, this.newTask, { ...this.task });
  },
  methods: {
    ...mapActions(["saveTask", "updateTask", "deleteTask"]),
    remove() {
      this.deleteTask(this.newTask.id);
      this.close();
    },
    submit() {
      if (this.edit) {
        this.updateTask(this.newTask);
      } else {
        this.saveTask(this.newTask);
      }
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
  justify-content: space-between;
  width: 100%;
  margin-top: 1rem;
}

.remove {
  font-size: $text-sm;
}
</style>
