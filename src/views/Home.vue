<template>
  <Nav />
  <!-- customEvent of the homeView that will fire the add-to-do function -->
  <NewTask @newTask="addNewTask" />
  <TaskItem @childToggle="toggleTask" @childRemove="remove" @childEdit="edit" v-for="(task, index) in tasks" :key="index" :item="task"/>
  <Footer />
</template>

<script setup>
import Nav from '../components/Nav.vue';
import Footer from '../components/Footer.vue';
import NewTask from '../components/NewTask.vue';
import TaskItem from '../components/TaskItem.vue';
import { ref } from "vue";
import { useTaskStore } from "../stores/task";


//Tasks contained in an array
let tasks = ref([]);

//Async function to get tasks stored in supabase
const getTasks = async () => {
  tasks.value = await useTaskStore().fetchTasks();
}

getTasks();

const addNewTask = async (taskTitle, taskDescription) => {
  await useTaskStore().addTask(taskTitle, taskDescription);
  getTasks();
}

const toggleTask = async (item) => {
  const toggleComplete = !item.is_complete;
  const toggleId = item.id;
  await useTaskStore().toggleDone(toggleComplete, toggleId);
  getTasks();
}

const remove = async (item) => {
  await useTaskStore().deleteTask(item.id);
  getTasks();
}

const edit = async (item) => {
  const newTitle = item.newTitle;
  const newDescription = item.newDescription;
  const editId = item.oldValue.id;
  await useTaskStore().editTask(newTitle, newDescription, editId);
  getTasks();
}


</script>

<style></style>

// <!-- 
// 7. TaskItem component will loop through the tasks-array that will print an individual instance of an individual TaskItem component. TaskItem will receive 3 customEvents on this instance of the homeView. 1 customEvent for toggling the task to show either a text or an icon to display if the task is completed or not completed. 1 customEevent for removing/deleting the task out of the array. 1 customEvent for editing the task title and description. This function needs to call the function mentioned on hint4.
// 7.1-customEvent will fire an async function that will take in 1 param/argument. On the body of this function the param/argument will be used to define 2 constants. 1 of this constants will take care of setting the boolean value to the opposite of the value that checks wether this task is_complete. 1 of this constants will take of calling the id of this specific task in order to call the right id. 
// 7.2-customEvent will fire an asynf function that will take in 1 param/argument. This async function's body will be used to call the deleteTaskmethod which will take the param/argument's id in order to delete the task. This function needs to call the function mentioned on hint4. 
// 7.3-customEvent will fire an async function that will take in 1 param/argument. this async function's body will be used to take in 2 constants. 1 constant will take in the param/argument newValue. 1 constant will be used to get the param/argument oldValue id. These 2 constants will be sent to the backend via the useTaskStore which holds an editTask method. This function needs to call the function mentioned on hint4.
// -->
