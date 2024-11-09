<template>
  <div class="task-card animate__animated" :class="{
    animate__fadeInUp: !isBeingRemoved,
    animate__fadeOutDown: isBeingRemoved,
    'list-view': isListView
  }" :style="{ animationDelay: !isBeingRemoved ? `${index * 0.2}s` : '0s' }" @click="$emit('click')">
  
    <div class="task-content">
      <div class="task-top">
        <h3> Task #{{ id }} - {{ title }}</h3>
        <p :class="[isHighCost ? 'high-cost' : '', 'p-money'] ">Cost: R$ {{ cost }}</p>
      </div>

      <div class="task-bottom">
        <div class="task-header">
          <i class="fas fa-calendar-alt"></i>
          <span class="task-date">{{ date }}</span>
        </div>
        <hr class="dashed-line" />
        <div class="task-footer">
          <span :class="['task-status', statusClass]">{{ statusText }}</span>
          <div class="task-actions">
            <div class="arrow-buttons">
              <i class="fas fa-arrow-up" @click.stop="handleMoveUp"></i>
              <i class="fas fa-arrow-down" @click.stop="handleMoveDown"></i>
            </div>
            <i class="fas fa-pencil" @click.stop="handleUpdateTask"></i>
            <i class="fas fa-trash" @click.stop="handleDeleteTask"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "animate.css";

export default {
  props: {
    id: Number,
    title: String,
    cost: String,
    date: String,
    completed: Boolean,
    tag: String,
    index: Number,
    confirmDelete: Boolean,
    isListView: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      isBeingRemoved: false,
    };
  },
  computed: {
    statusClass() {
      return this.completed ? "completed" : "uncompleted";
    },
    statusText() {
      return this.completed ? "completed" : "uncompleted";
    },
    isHighCost() {
      return parseFloat(this.cost) >= 1000;
    },
  },
  methods: {
    handleDeleteTask() {
      this.$emit("delete-task", this.id);
    },
    handleUpdateTask() {
      setTimeout(() => {
        this.$emit("update-task", this.id);
      }, 500);
    },
    handleMoveUp() {
      this.$emit("move-up", this.id);
    },
    handleMoveDown() {
      this.$emit("move-down", this.id);
    },
    startRemoveAnimation() {
      this.isBeingRemoved = true;
    },
  },
  watch: {
    confirmDelete: {
      handler(confirmed) {
        if (confirmed) {
          this.startRemoveAnimation();
        }
      },
      immediate: true
    }
  }
};
</script>

<style scoped>
.task-card {
  display: flex;
  width: 100%;
  min-height: 250px;
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  position: relative;
}

.task-content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
}

.task-top {
  flex-shrink: 0;
}

.task-bottom {
  margin-top: auto;
}

h3 {
  text-align: left;
}

p {
  text-align: left;
}

.p-money {
  text-align: left;
  color: #00ff00;
}

.high-cost {
  color: #00ff00;
  animation: colorPulse 2s infinite;
}

@keyframes colorPulse {
  0%, 100% {
    color: #ffe600;
  }
  50% {
    color: #aa9902;
  }
}

.task-card:hover {
  background-color: #a35eff;
  color: white;
  transform: scale(1.05);
}

.task-card:hover .task-date {
  color: white;
}

.task-card:hover .fas,
.task-card:hover .fa-solid {
  color: white;
}

.task-header {
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #7e7e7e;
  margin-bottom: 10px;
}

.task-header i {
  margin-right: 5px;
}

.dashed-line {
  border: none;
  border-top: 1px dashed #d3d3d3;
  margin: 10px 0;
}

.task-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
}

.task-date {
  font-size: 14px;
}

.task-status {
  padding: 5px;
  border-radius: 5px;
  font-size: 12px;
}

.task-status.completed {
  background-color: #00d68f;
  color: white;
}

.task-status.uncompleted {
  background-color: #ffda44;
  color: white;
}

.task-actions {
  display: flex;
  gap: 10px;
}

.task-actions i {
  cursor: pointer;
  color: #7e7e7e;
}

.arrow-buttons {
  display: flex;
  gap: 5px;
  margin-right: 5px;
  padding-right: 10px;
  border-right: 1px solid #d3d3d3;
}

.task-card.list-view {
  min-height: auto;
  padding: 15px;
}

.task-card.list-view .task-content {
  flex-direction: row;
  align-items: center;
  gap: 20px;
}

.task-card.list-view .task-top {
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.task-card.list-view .task-bottom {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-top: 0;
}

.task-card.list-view .dashed-line {
  display: none;
}

.task-card.list-view:hover {
  transform: scale(1.01);
}
</style>