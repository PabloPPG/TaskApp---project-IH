<template>
  <div class="max-w-screen-md mx-auto px-4 py-10">
    <!-- Status message -->
    <div v-if="emptyInput" class="mb-10 p-4 bg-light-grey rounded-md shadow-lg">
      <p class="text-red-500"> {{errorMsg}} </p>
    </div>

    <!-- Create the form -->
    <div class="p-8 flex items-start bg-light-grey rounded-md shadow-lg">
      <!-- FORM -->
      <form action="" class="flex flex-col gap-y-5 w-full">
        <h1 class="text-2xl text-at-light-green">Record Task</h1>
        <!-- Task tittle -->
        <div class="flex flex-col">
          <label for="task-title" class="mb-1 text-sm text-at-light-green">Task Title</label>
          <input type="text" class="p-2 text-gray-500 focus:outline-none" id="task-title" v-model="taskTitle"  placeholder="Input a title for the task">
        </div>
        <!-- Task description -->
         <div class="flex flex-col">
          <label for="task-description" class="mb-1 text-sm text-at-light-green">Task Description</label>
          <textarea rows="4" class="p-2 text-gray-500 focus:outline-none resize-none" id="task-description" v-model="taskDescription" placeholder="Describe your task here"></textarea>
        </div>
        <!-- SUBMIT -->
        <button @click.prevent="addNewTask" class="mt-6 py-2 px-6 rounded-sm self-start text-sm text-white bg-at-light-green duration-300 border-solid border-2 border-transparent hover:border-at-light-green hover:bg-white hover:text-at-light-green">Add new task</button>

      </form>
    </div>
  </div>
</template>

<script setup>
import {ref} from "vue"

// constant to save a variable that define the custom event that will be emitted to the homeView
const newTaskEmitted = defineEmits(["newTask"])
// constant to save a variable that holds the value of the title input field of the new task
let taskTitle = ref("")
// constant to save a variable that holds the value of the description input field of the new task
let taskDescription = ref("")
// constant to save a variable that holds an initial false boolean value for the errorMessage container that is conditionally displayed depending if the input field is empty
let emptyInput = ref(false)
// const constant to save a variable that holds the value of the error message
let errorMsg = ref("")
// arrow function to call the form holding the task title and task description that uses a conditional to first checks if the task title is empty, if true the error message is displayed through the errorMessage container and sets a timeOut method that hides the error after some time. Else, its emmits a custom event to the home view with the task title and task description; clears the task title and task description input fields.
const addNewTask = () => {
  if(taskTitle.value === "" || taskDescription.value === ""){
    emptyInput.value = true
    errorMsg.value = "Complete the fields of the new task to be added; It can't be empty"
    setTimeout(()=>{
      emptyInput.value = false
    },5000);
  } else {
    emptyInput.value = false;
    newTaskEmitted("newTask", taskTitle.value, taskDescription.value);
    taskTitle.value = "";
    taskDescription.value = ""; 
  }
}
</script>

<style></style>
