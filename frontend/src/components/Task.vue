<template>
  <div
    class="task focus"
    tabindex="0"
    @click="onOpen(task.id)"
    @keyup.enter="onOpen(task.id)"
  >
    <Portal v-if="openModal" to="modal">
      <TaskModal
        :edit="true"
        :close="() => (openModal = false)"
        :task="task"
      ></TaskModal>
    </Portal>
    <p :class="['text', task.status && !open ? 'checked' : '']">
      <span class="title">{{ task.title }}</span>
      <br />
      <span class="description">{{ task.description }}</span>
    </p>
    <div v-if="open" class="meta">
      <div class="meta__absolute">
        <button class="link meta__edit" @click.stop="openModal = true">
          Edit Task
        </button>
        <Badge
          :state="task.status ? 'complete' : 'incomplete'"
          class="meta__badge"
          >{{ task.status ? "Done" : "Ongoing" }}
        </Badge>
      </div>
      <p class="meta__item">Priority: {{ task.priority }}</p>
      <p class="meta__item">Due: {{ date(task.dueDate) }}</p>
    </div>
    <CommentList
      v-if="open"
      :task-id="task.id"
      :comments="task.comments"
    ></CommentList>
    <Arrow :rotate="open ? 180 : 0" class="arrow"></Arrow>
  </div>
</template>

<script>
import { format, parse } from "date-fns";
import Arrow from "@/components/Icons/Arrow";
import Badge from "@/components/Badge";
import CommentList from "@/components/CommentList";
import TaskModal from "@/components/Modal/TaskModal";

export default {
  name: "Task",
  components: { TaskModal, CommentList, Badge, Arrow },
  props: {
    task: { type: Object, required: true },
    open: { type: Boolean, default: false }
  },
  data: function() {
    return {
      openModal: false
    };
  },
  methods: {
    date(taskDate) {
      return format(
        parse(taskDate, "yyyy-MM-dd HH:mm:ss.SSSxx"),
        "Do MMM YYYY [at] HH:mm"
      );
    },
    onOpen(id) {
      this.$emit("toggle", id);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/variables";

.task {
  font-weight: 300;
  padding: 1rem 2rem 1rem 1rem;
  border-bottom: 1px solid $gray-100;
  position: relative;
  cursor: pointer;
}

.text {
  margin: 0;
  display: inline-block;
}

.arrow {
  width: 1.5rem;
  height: 1.5rem;
  right: 15px;
  top: calc(50% - 1.5rem / 2);
  float: right;
  cursor: pointer;
  position: absolute;
  color: $gray-300;

  &:hover {
    color: $gray-900;
  }
}

.title {
  font-weight: 500;
}

.description {
  font-size: $text-sm;
  color: $gray-700;
}

.checked {
  color: $gray-200;

  & .description {
    color: $gray-200;
  }
}

.meta {
  font-size: $text-sm;
  margin-top: 0.5rem;

  &__badge {
  }

  &__item {
    display: inline-block;
    margin-right: 1rem;
    color: $gray-400;
  }

  &__absolute {
    display: flex;
    flex-direction: row-reverse;
    align-items: baseline;
    top: 21px;
    right: 20px;
    margin-bottom: 0.5rem;
  }

  &__edit {
    margin-left: 0.5rem;
    margin-right: auto;
    font-size: $text-sm;
    margin-top: 0.5rem;
  }
}
@media (min-width: 576px) {
  .meta {
    &__absolute {
      position: absolute;
      display: block;
      margin-bottom: 0;
    }
    &__edit {
      margin-left: 0;
      margin-right: 0.5rem;
      margin-top: 0;
    }
  }
}
</style>
