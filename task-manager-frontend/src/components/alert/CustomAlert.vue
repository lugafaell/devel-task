<template>
  <div class="custom-alert" :class="type" v-if="visible">
    <span>{{ message }}</span>
    <div class="actions" v-if="confirm">
      <button @click="confirmAlert" class="confirm">
        <i-check class="icon" size="20" />
      </button>
      <button @click="closeAlert" class="close">
        <i-x class="icon" size="20" />
      </button>
    </div>
    <button v-else @click="closeAlert" class="close">
      <i-x class="icon" size="20" />
    </button>
  </div>
</template>

<script>
import { Check as iCheck, X as iX } from 'lucide-vue-next';

export default {
  name: 'CustomAlert',
  components: {
    iCheck,
    iX
  },
  props: {
    message: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: 'info',
    },
    duration: {
      type: Number,
      default: 3000,
    },
    confirm: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      visible: true,
    };
  },
  methods: {
    closeAlert() {
      this.visible = false;
      this.$emit('close');
    },
    confirmAlert() {
      this.visible = false;
      this.$emit('confirm');
    }
  },
  mounted() {
    if (!this.confirm) {
      setTimeout(this.closeAlert, this.duration);
    }
  }
};
</script>

<style scoped>
.custom-alert {
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 20px;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #000000;
  min-width: 300px;
  z-index: 1000;
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
  animation: slide-in-right 0.5s ease-out;
}

.custom-alert.info {
  background-color: #17a2b8;
}

.custom-alert.success {
  background-color: #ffffff;
  border-bottom: 4px solid rgb(11, 167, 19);
}

.custom-alert.warn {
  background-color: #ffffff;
  border-bottom: 4px solid #fffb00;
}

.custom-alert.error {
  background-color: #ffffff;
  border-bottom: 4px solid #dc3545;
}

.actions {
  display: flex;
  gap: 10px;
}

.confirm{
  background: none;
  border: none;
  color: rgb(11, 167, 19);
  font-size: 16px;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: background-color 0.2s;
}


.close {
  background: none;
  border: none;
  color: #dc3545;
  font-size: 16px;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.confirm:hover,
.close:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.icon {
  stroke-width: 1.5;
}

@keyframes slide-in-right {
  from {
    transform: translateX(100%);
    opacity: 0;
  }

  to {
    transform: translateX(0);
    opacity: 1;
  }
}
</style>