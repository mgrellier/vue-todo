import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

// shape [{text, done}]
const state = {
  todoList: []
}

const getters = {
  completedTasks: state => {
    return state.todoList.filter(task => task.done)
  },
  incompleteTasks: state => {
    return state.todoList.filter(task => !task.done)
  }
}

const mutations = {
  addTask (state, { text }) {
    state.todoList.push({
      text: text,
      done: false
    })
  },
  editTask (state, {task, newText}) {
    task.text = newText
  },
  deleteTask (state, { task }) {
    state.todoList.splice(state.todoList.indexOf(task), 1)
  },
  toggleTask (state, { task }) {
    task.done = !task.done
  }
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  strict: debug
})
