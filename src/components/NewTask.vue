<template>
  <div>New Task Component</div>
</template>

<script setup>
import {ref} from "vue"

// constant to save a variable that define the custom event that will be emitted to the homeView
const newTaskEmitted = ref("")
// constant to save a variable that holds the value of the title input field of the new task
const taskTitle = ref("")
// constant to save a variable that holds the value of the description input field of the new task
const taskDescription = ref("")
// constant to save a variable that holds an initial false boolean value for the errorMessage container that is conditionally displayed depending if the input field is empty
const emptyInput = ref(false)
// const constant to save a variable that holds the value of the error message
const errorMsg = ref("")
// arrow function to call the form holding the task title and task description that uses a conditional to first checks if the task title is empty, if true the error message is displayed through the errorMessage container and sets a timeOut method that hides the error after some time. Else, its emmits a custom event to the home view with the task title and task description; clears the task title and task description input fields.
const addNewTask = () => {
  
}
</script>

<style></style>
