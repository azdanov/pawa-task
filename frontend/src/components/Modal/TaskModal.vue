<template>
  <ModalBase :close="close" title="New Task">
    <form class="form" @submit.prevent="submit">
      <label class="label" for="title">Title:</label>
      <input id="title" v-model="newTask.title" class="input" type="text" />

      <label class="label" for="description">Description:</label>
      <textarea
        id="description"
        v-model="newTask.description"
        class="description"
        name="description"
        rows="4"
      ></textarea>

      <label class="label" for="date">Set due date:</label>
      <div class="date">
        <input
          id="date"
          v-model="date.day"
          class="input"
          type="number"
          placeholder="DD"
          min="1"
          max="31"
          name="day"
        />
        <input
          v-model="date.month"
          class="input"
          type="number"
          placeholder="MM"
          min="1"
          max="12"
          name="month"
        />
        <input
          v-model="date.year"
          class="input"
          type="number"
          placeholder="AAAA"
          :min="currentYear"
          :max="currentYear + 10"
          name="year"
        />
      </div>

      <label class="label" for="priority">Priority:</label>
      <select id="priority" v-model="newTask.priority" class="priority">
        <option
          v-for="priority in priorities"
          :key="priority"
          :value="priority"
          >{{ priority }}</option
        >
      </select>

      <label class="label" for="comments">Comments:</label>
      <textarea id="comments" class="comments" rows="5" disabled></textarea>

      <footer class="footer footer--single">
        <Button v-if="edit" class="link" @click.prevent="remove"
          >Remove task</Button
        >
        <Button class="button">Add a new task</Button>
      </footer>
    </form>
  </ModalBase>
</template>

<script>
import { mapActions } from "vuex";
import ModalBase from "./BaseModal";
import Button from "@/components/Button";

export default {
  name: "TaskModal",
  components: { Button, ModalBase },
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
        dueDate: "",
        comments: {}
      })
    }
  },
  data: function() {
    return {
      priorities: ["low", "normal", "high"],
      date: { day: "", month: "", year: "" },
      newTask: null
    };
  },
  computed: {
    currentYear() {
      return new Date().getFullYear();
    }
  },
  created() {
    this.newTask = Object.assign({}, this.newTask, { ...this.task });
  },
  methods: {
    ...mapActions(["saveTask", "updateTask", "deleteTask"]),
    remove() {
      if (!window.confirm(`Remove "${this.newTask.title}"?`)) {
        return;
      }

      this.deleteTask(this.newTask.id);
      this.close();
    },
    submit() {
      const { year, month, day } = this.date;
      this.newTask.dueDate = new Date(year, month, day);

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
@import "../../styles/common";

.form {
  margin-top: 1.3rem;
  color: $gray-darker;
}

.label {
  margin: 0.2rem 0;
  display: inline-block;

  &:first-child {
    margin-top: 0;
  }
}

.description,
.input {
  display: inline-block;
  width: 100%;
  padding: 0.4rem;
  margin: 0;
  border: 1px solid $gray;
  font-size: $font-size;
}

.date {
  display: flex;
  width: 60%;

  .input {
    margin: 0 0.6rem 0 0;
    text-align: center;
    font-family: initial;

    &::placeholder {
      color: $gray;
    }

    &:nth-child(1) {
      width: 25%;
    }
    &:nth-child(2) {
      width: 25%;
    }
    &:nth-child(3) {
      width: 50%;
      margin: 0;
    }
  }
}

.priority {
  -webkit-appearance: menulist-button;
  height: 30px;
  display: block;
  width: 60%;
  font-size: $font-size;
}

.comments {
  width: 100%;
}

.description,
.input,
.comments {
  border: 1px solid $gray;
}

.description,
.input,
.date,
.priority,
.comments {
  margin-bottom: 0.7rem;
}

.footer {
  width: 100%;
  display: flex;
  justify-content: space-between;

  &--single {
    justify-content: flex-end;
  }

  & .button {
    margin-bottom: 0;
  }
}

.description,
.comments {
  resize: none;
}
</style>
