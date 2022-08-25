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
