<template>
  <ModalBase :close="close" :title="task.title || 'New Task'">
    <form class="form" @submit.prevent="submit">
      <label class="label" for="title">Title:</label>
      <input
        id="title"
        v-model.trim="$v.newTask.title.$model"
        :class="{
          input: true,
          'input--error': $v.newTask.title.$error
        }"
        :placeholder="$v.newTask.title.$error ? 'Enter a title' : ''"
        type="text"
      />

      <label class="label" for="description">Description:</label>
      <textarea
        id="description"
        v-model.trim="$v.newTask.description.$model"
        :class="{
          description: true,
          'description--error': $v.newTask.description.$error
        }"
        name="description"
        rows="4"
        :placeholder="
          $v.newTask.description.$error ? 'Enter a description' : ''
        "
      ></textarea>

      <label class="label" for="date">Set due date:</label>
      <div class="date">
        <input
          id="date"
          v-model.number="$v.date.day.$model"
          :class="{
            input: true,
            'input--error': $v.date.day.$error
          }"
          type="number"
          placeholder="DD"
          min="1"
          max="31"
          name="day"
        />
        <input
          v-model.number="$v.date.month.$model"
          :class="{
            input: true,
            'input--error': $v.date.month.$error
          }"
          type="number"
          placeholder="MM"
          min="1"
          max="12"
          name="month"
        />
        <input
          v-model.number="$v.date.year.$model"
          :class="{
            input: true,
            'input--error': $v.date.year.$error
          }"
          type="number"
          placeholder="YYYY"
          :min="currentYear"
          :max="currentYear + 10"
          name="year"
        />
      </div>

      <label class="label" for="priority">Priority:</label>
      <select
        id="priority"
        v-model="$v.newTask.priority.$model"
        :class="{
          priority: true,
          'priority--error': $v.newTask.priority.$error
        }"
      >
        <option value="" disabled selected>Select priority</option>
        <option v-for="priority in priorities" :key="priority" :value="priority"
          >{{ priority | capitalize }}
        </option>
      </select>

      <label class="label" for="comments">Comments:</label>
      <Comments
        id="comments"
        class="comments"
        :comments="task.comments"
        :edit="true"
      ></Comments>

      <footer :class="['footer', edit ? '' : 'footer--single']">
        <Button v-if="edit" class="link" @click.native.prevent="remove"
          >Remove task
        </Button>
        <Button :class="{ button: true }" :disabled="$v.validationGroup.$error"
          >{{ edit ? "Edit" : "Add a new" }} task</Button
        >
      </footer>
    </form>
  </ModalBase>
</template>

<script>
import required from "vuelidate/src/validators/required";
import { getDate, getMonth, getYear } from "date-fns";
import { mapActions } from "vuex";
import ModalBase from "./BaseModal";
import Button from "@/components/Button";
import Comments from "@/components/Comments";

export default {
  name: "TaskModal",
  components: { Comments, Button, ModalBase },
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
        comments: []
      })
    }
  },
  data: function() {
    return {
      priorities: ["low", "normal", "high"],
      date: null,
      newTask: null
    };
  },
  validations: {
    newTask: {
      title: { required },
      description: { required },
      priority: { required }
    },
    date: {
      day: { required },
      month: { required },
      year: { required }
    },
    validationGroup: ["newTask", "date"]
  },
  computed: {
    currentYear() {
      return new Date().getFullYear();
    }
  },
  created() {
    this.newTask = Object.assign({}, this.newTask, { ...this.task });

    let date;

    if (this.edit) {
      date = {
        year: getYear(this.task.dueDate),
        month: getMonth(this.task.dueDate) + 1,
        day: getDate(this.task.dueDate)
      };
    } else {
      date = {
        year: "",
        month: "",
        day: ""
      };
    }

    this.date = Object.assign({}, this.date, date);
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
      if (this.$v.validationGroup.$invalid) {
        this.$v.validationGroup.$touch();
        return;
      }

      if (!this.$v.validationGroup.$anyDirty) {
        this.close();
        return;
      }

      const { year, month, day } = this.date;
      this.newTask.dueDate = new Date(year, month - 1, day);

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

.comments,
.description,
.input {
  display: block;
  padding: 0.4rem;
  margin: 0;
  border: 1px solid $gray;
  font-size: $font-size;
  font-family: initial;

  &--error {
    border: 1px solid $orange;

    &::placeholder {
      color: $orange;
    }
  }
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
      width: 30%;
    }

    &:nth-child(2) {
      width: 30%;
    }

    &:nth-child(3) {
      width: 40%;
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
  font-family: initial;

  &--error {
    color: $orange;
    border: 1px solid $orange;
  }
}

.input,
.description,
.footer {
  width: 100%;
}

.comments,
.description,
.input,
.date,
.priority {
  margin-bottom: 0.7rem;
}

.footer {
  display: flex;
  justify-content: space-between;

  &--single {
    justify-content: flex-end;
  }

  & .button {
    margin-bottom: 0;
  }
}

.description {
  resize: none;
}
</style>
