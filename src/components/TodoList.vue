<template>
  <div>
   <input type="text" v-model='newTask' placeholder="enter a new task">
   <button @click="addTask">Add</button>
   <ol>
      <todo-item
        v-for="(task, index) in filteredList"
        :item="task"
        :key="index"
      >
    </todo-item>
    </ol>
    <select v-model="selectedFilter">
    	<option v-for="option in filters" v-bind:value="option.value">
   			{{ option.text }}
 			</option>
		</select>
  </div>
</template>

<script>
  import TodoItem from '@/components/TodoItem'

  export default {
    components: {
      TodoItem
    },
    data () {
      return {
        newTask: '',
        selectedFilter: 'all',
        filters: [{
          text: 'All',
          value: 'all'
        }, {
          text: 'TO-DO',
          value: 'todo'
        }, {
          text: 'Completed',
          value: 'completed'
        }]
      }
    },
    computed: {
      filteredList () {
        if (this.selectedFilter === 'all') {
          return this.$store.state.todoList
        } else if (this.selectedFilter === 'todo') {
          return this.$store.getters.incompleteTasks
        } else if (this.selectedFilter === 'completed') {
          return this.$store.getters.completedTasks
        }
      }
    },
    methods: {
      addTask (e) {
        let text = this.newTask
        if (text.trim()) {
          this.$store.commit('addTask', { text })
        }
        this.newTask = ''
      }
    }
  }
</script>
