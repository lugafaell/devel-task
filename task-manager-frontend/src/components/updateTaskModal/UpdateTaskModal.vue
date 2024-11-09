<template>
    <div v-if="isVisible" class="modal-overlay" @click="closeModal">
      <div
        class="modal-content animate__animated animate__fadeInDown"
        @click.stop
      >
        <div class="modal-header">
          <h2>Task {{ taskNameInternal }}</h2>
        </div>
        <form @submit.prevent="submitTask">
          <div class="form-group">
            <label for="taskName">Task Name:</label>
            <input
              type="text"
              id="taskName"
              v-model="taskNameInternal"
              placeholder="Type your task name here..."
              required
            />
          </div>
  
          <div class="form-group">
            <label for="taskCost">Cost:</label>
          <input type="number" id="taskCost" v-model="taskCost" placeholder="Enter the task cost here..." required />
          </div>
  
          <div class="form-group date-group">
            <div class="date-item">
              <label for="taskStartDate">Start Date:</label>
              <input
                type="date"
                id="taskStartDate"
                v-model="taskStartDate"
                disabled
              />
            </div>
            <div class="date-item">
              <label for="taskDeadline">Deadline:</label>
              <input
                type="date"
                id="taskDeadline"
                v-model="taskDeadline"
                required
              />
            </div>
          </div>
  
          <div class="form-group">
            <div class="status-buttons">
              <button
                type="button"
                @click="updateStatus('completed')"
                :class="{ active: taskStatus === 'completed' }"
                class="completed-btn"
              >
                Completed
              </button>
              <button
                type="button"
                @click="updateStatus('uncompleted')"
                :class="{ active: taskStatus === 'uncompleted' }"
                class="uncompleted-btn"
              >
                Uncompleted
              </button>
            </div>
          </div>
  
          <button type="submit" class="submit-button">Update Task</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      isVisible: Boolean,
      task: Object,
    },
    data() {
      return {
        taskNameInternal: this.task?.title || "",
        taskCost: this.task?.cost || "",
        taskStartDate: this.task?.startDate || "",
        taskDeadline: this.task?.deadline || "",
        taskStatus: this.task?.completed ? "completed" : "uncompleted",
      };
    },
    watch: {
      task: {
        immediate: true,
        handler(newTask) {
          if (newTask) {
            this.resetForm();
          }
        },
      },
    },
    methods: {
      resetForm() {
        const today = new Date().toISOString().split("T")[0];
        if (this.task) {
          this.taskNameInternal = this.task.title || "";
          this.taskCost = this.task.cost || "";
          this.taskStartDate = today;
          this.taskDeadline = this.task.deadline || "";
          this.taskStatus = this.task.completed ? "completed" : "uncompleted";
        }
      },
      updateStatus(newStatus) {
        this.taskStatus = newStatus;
      },
      closeModal() {
        this.$emit("close");
      },
      submitTask() {
        const startDate = new Date(this.taskStartDate + "T00:00:00").toLocaleDateString("pt-BR");
      const deadline = new Date(this.taskDeadline + "T00:00:00").toLocaleDateString("pt-BR");
        const updatedTask = {
          ...this.task,
          title: this.taskNameInternal,
          cost: String(this.taskCost),
          date: `${startDate} - ${deadline}`,
          completed: this.taskStatus === "completed",
        };
        this.$emit("update-task", updatedTask);
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
  textarea,
  select {
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
  
  .status-buttons {
  display: flex;
  gap: 10px;
}

.status-buttons button {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  font-weight: bold;
  transition: background 0.3s ease;
  margin-left: 10px;
}

.completed-btn {
  background-color: #00c851;
  border: white;
}

.uncompleted-btn {
  background-color: #ffbb33;
  border: white;
}

.status-buttons button img {
  width: 16px;
  height: 16px;
}

.completed-btn:hover {
  background-color: #007e33;
}

.uncompleted-btn:hover {
  background-color: #ff8800;
}

.active {
  border: 2px solid #000000;
}
  </style>
  