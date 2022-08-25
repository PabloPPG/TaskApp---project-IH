<template>
  <div
    class="container bg-light-grey rounded-md shadow-lg p-10 gap-5 items-center justify-center my-5 max-w-screen-md mx-auto px-4 py-10 border-4 border-at-light-green"
  >
    <!-- Task -->
    <div class="text-center">
      <p class="text-center flex justify-center w-full mb-10 text-lg font-bold">
        {{ item.title }}
      </p>
      <p class="text-center flex justify-center w-full mb-10 text-sm">
        {{ item.description }}
      </p>
      <p class="text-center w-full text-xs mb-10">
        {{ item.inserted_at.split("T")[0] }}
      </p>
    </div>

        <!-- Buttons -->
        
    <div
      class="w-full flex flex-col sm:flex-row gap-2 items-center justify-between"
    >
      <button
        v-if="item.is_complete"
        type="button"
        class="block w-3/12 text-white bg-green-500 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-200 font-medium rounded-sm text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        @click="toggleTask"
      >
        Done
      </button>
      <button
        v-if="!item.is_complete"
        class="block w-3/12 text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-sm text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:focus:ring-yellow-900"
        @click="toggleTask"
      >
        Not done
      </button>
      <button
        class="block w-3/12 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-sm text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        @click="toggleEdit"
      >
        Modify
      </button>
      <button
        class="block w-3/12 text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-sm text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
        @click.prevent="remove"
      >
        Delete
      </button>
    </div>

    <!-- Edit dialog -->
    <form action="">
      <div
        v-if="inputVisibility"
        class="bg-light-grey rounded-md p-10 gap-5 items-center justify-center max-w-screen-md mx-auto px-4 py-10"
      >
        <div class="flex flex-col">
          <label
            for="new-task-title"
            class="mb-1 text-sm text-at-light-green w-full"
            >New Task Title</label
          >
          <input
            type="text"
            class="p-2 text-gray-500 focus:outline-none"
            id="new-task-title"
            v-model="editNewTaskTitle"
            placeholder="Input your new task title to modify it"
          />
        </div>
        <div class="flex flex-col">
          <label
            for="new-task-description"
            class="mb-1 text-sm text-at-light-green w-full"
            >New Task Description</label
          >
          <textarea
            rows="4"
            type="text"
            class="p-2 text-gray-500 focus:outline-none resize-none"
            id="new-task-description"
            v-model="editNewTaskDescription"
            placeholder="Input your new task description to modify it"
          ></textarea>
        </div>
        <button
          @click.prevent="edit"
          class="mt-6 py-2 px-6 rounded-sm self-start text-sm text-white bg-at-light-green duration-300 border-solid border-2 border-transparent hover:border-at-light-green hover:bg-white hover:text-at-light-green"
        >
          Modify it!
        </button>
        <div v-if="empty" class="mt-10 p-4 bg-gray-300 rounded-md shadow-lg">
          <p class="text-red-500">{{ errorMsg }}</p>
        </div>
      </div>
    </form>

  </div>
</template>

<script setup>
import { ref } from "vue";
// const emit = defineEmits([
//   ENTER-EMITS-HERE
// ])
const emit = defineEmits([
  "childEdit",
  "childToggleEdit",
  "childRemove",
  "childToggle",
]);

// const props = defineProps(["ENTER-PROP-HERE"]);
const props = defineProps(["item"]);

//a boolean to store a false
let empty = ref(false);
//a string to store an error
let errorMsg = ref("");
//string to store the value of the task that the user can edit
let editNewTaskTitle = ref("");
let editNewTaskDescription = ref("");
//an initial false boolean to hide the inputFIeld used to edit the new task detail or details
let inputVisibility = ref(false); // initially hidden
let removeDialog = ref(false);

//Function to handle the error with the data properties used to control the error and the the boolean controlling the boolean empty variable.
const errorHandling = () => {
  empty.value = true;
  errorMsg.value = "Field cannot be empty";
  setTimeout(() => {
    empty.value = false;
  }, 5000);
};

// Function to handle the edit dialogue where the inputField is displayed and the string used to store the value of the inputField will be used here to save the value as a prop on this function.
const toggleEdit = () => {
  inputVisibility.value = !inputVisibility.value;
  removeDialog.value = false;
  editNewTaskTitle.value = props.item.title;
  editNewTaskDescription.value = props.item.description;
};

// Function to emmit a custom event emit() that takes 2 parameters a name for the custom event and the value that will be send via the prop to the parent component. This function can control the toggle completion of the task on the homeview.
const toggleTask = () => {
  emit("childToggle", props.item);
};

// Function to edit the task information that you decided that the user can edit. This function's body takes in a conditional that first checks if the value of the task [either title and description or just title] is empty which if true it runs the function used to handle the error on hint4. Else, the conditional sets the first mentioned boolean data property on hint2 back to its inital boolean value to hide the error message and repeat the same for the data property mentioned 4th on hint2; a constant that stores an object that holds the oldValue from the prop item and the value of the task coming from the data property mentioned 3rd on hint2; a custom event emit() that takes 2 parameters a name for the custom event and the value from the object used on this part of the conditional and lastly this part of the conditional sets the value of input field to an empty string to clear it from the ui.
function edit() {
  if (editNewTaskTitle.value === "" || editNewTaskDescription.value === "") {
    errorHandling();
  }
  // shows error message
  else {
    empty.value = false;
    inputVisibility.value = false;
    const editValues = {
      oldValue: props.item,
      newTitle: editNewTaskTitle.value,
      newDescription: editNewTaskDescription.value,
    };
    emit("childEdit", editValues);
    editNewTaskTitle.value = "";
    editNewTaskDescription.value = "";
  }
}

// Function to emmit a custom event emit() that takes 2 parameters a name for the custom event and the value that will be send via the prop to the parent component. This function can control the removal of  the task on the homeview.
const remove = () => {
  emit("childRemove", props.item);
};
</script>

<style></style>
