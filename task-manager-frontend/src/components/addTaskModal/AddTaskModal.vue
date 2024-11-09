<template>
  <div v-if="isVisible" class="modal-overlay" @click="closeModal">
    <div class="modal-content animate__animated animate__fadeInDown" @click.stop>
      <div class="modal-header">
        <h2>New Task</h2>
      </div>
      <form @submit.prevent="submitTask">
        <div class="form-group">
          <label for="taskName">Task Name:</label>
          <input type="text" id="taskName" v-model="taskName" placeholder="Type your task name here..." required />
        </div>

        <div class="form-group">
          <label for="taskCost">Cost:</label>
          <input type="number" id="taskCost" v-model="taskCost" placeholder="Enter the task cost here..." required />
        </div>

        <div class="form-group date-group">
          <div class="date-item">
            <label for="taskStartDate">Start Date:</label>
            <input type="date" id="taskStartDate" v-model="taskStartDate" disabled />
          </div>
          <div class="date-item">
            <label for="taskDeadline">Deadline:</label>
            <input type="date" id="taskDeadline" v-model="taskDeadline" required />
          </div>
        </div>

        <button type="submit" class="submit-button">Add New Task</button>
      </form>
    </div>
  </div>
</template>

<script>
import Cookies from "js-cookie";

export default {
  props: {
    isVisible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      taskName: "",
      taskCost: "",
      taskStartDate: "",
      taskDeadline: "",
    };
  },
  watch: {
    isVisible(newValue) {
      if (newValue) {
        this.resetForm();
      }
    },
  },
  methods: {
    resetForm() {
      const today = new Date().toISOString().split("T")[0];
      this.taskName = "";
      this.taskCost = "";
      this.taskStartDate = today;
      this.taskDeadline = "";
    },
    closeModal() {
      this.$emit("close");
    },
    submitTask() {
      const startDate = new Date(this.taskStartDate + "T00:00:00").toLocaleDateString("pt-BR");
      const deadline = new Date(this.taskDeadline + "T00:00:00").toLocaleDateString("pt-BR");

      const newTask = {
        title: this.taskName,
        cost: String(this.taskCost),
        date: `${startDate} - ${deadline}`,
        completed: false,
        username: Cookies.get("user"),
      };

      this.$emit("add-task", newTask);
      this.closeModal();
    },
  },
};
</script>

<style scoped>
@import "https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css";

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: #fbfcf8;
  padding: 0;
  border-radius: 10px;
  max-width: 500px;
  width: 100%;
}

.modal-header {
  background: linear-gradient(to right, #7a2290, #0360ca);
  padding: 10px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  color: white;
  text-align: center;
}

.form-group {
  margin: 15px 20px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-group input,
textarea {
  width: calc(100% - 20px);
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
  font-size: 16px;
}

.date-group {
  display: flex;
  justify-content: space-between;
}

.date-item {
  width: 48%;
}

.form-group input[type="date"] {
  padding: 8px;
  font-size: 16px;
  border-radius: 5px;
}

.form-group textarea {
  resize: none;
  height: 100px;
}

.submit-button {
  background: #28a745;
  color: white;
  padding: 10px;
  width: calc(100% - 40px);
  margin: 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background 0.3s ease;
}

.submit-button:hover {
  background: #218838;
}
</style>
