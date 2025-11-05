// src/eventBus.js
import { reactive } from 'vue'

export const eventBus = reactive({
  username: null,
  setUsername(name) {
    this.username = name
  },
  clear() {
    this.username = null
  },
})
