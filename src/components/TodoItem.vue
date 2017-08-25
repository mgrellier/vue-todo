<template>
  <li>
    <input type="checkbox" @change="toggleTask({ task: item })">
		<label v-show="!isEditable" @dblclick="inEditMode">
      {{ item.text }}
    </label>
    <input type="text" v-item-focus="isEditable" :value="item.text" v-show="isEditable" @blur="doneEditing" @keyup.enter="doneEditing" @keyup.esc="cancelEditing">
		<button @click="deleteTask({ task: item })">x</button>
  </li>
</template>

<script>
  import { mapMutations } from 'vuex'

  export default {
    props: ['item'],
    data () {
      return {
        isEditable: false
      }
    },
    template: '',
    methods: {
      ...mapMutations([
        'editTask',
        'toggleTask',
        'deleteTask'
      ]),
      inEditMode: function () {
        this.isEditable = true
      },
      doneEditing (e) {
        const value = e.target.value.trim()
        const task = this.item

        if (!value) {
          this.deleteTask({ task })
        } else if (this.isEditable) {
          this.editTask({ task: task, newText: value })
          this.isEditable = false
        }
      },
      cancelEditing: function () {
        this.isEditable = false
      }
    },
    directives: {
      'item-focus': {
        componentUpdated: function (el, binding) {
          if (binding.value) {
            el.focus()
          }
        }
      }
    }
  }
</script>
