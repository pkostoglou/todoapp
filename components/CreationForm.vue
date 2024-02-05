<script setup lang="ts">
import { useNotificationsStore } from '~/stores/notifications';

const notificationsStore = useNotificationsStore();
const taskName = ref("")
const props = defineProps(['title', 'placeholder', 'buttonTitle', 'triggerReload'])

const handleClick = async () => {
    try {
        //Display a message to the user in case he tries to create an empty task
        if (taskName.value == "") {
            setTimeout(() => {
                notificationsStore.setMessage(`You can't create a task with no name! ${taskName.value}`)
            }, 100)
            return
        }
        const body = {
            title: taskName.value
        }
        await fetch("https://to-do-kostoglou.titlos.com/todos", {
            method: 'Post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        })
        //if the creation of the task is successfull reload the data, set a notification message and empty the input
        props.triggerReload()
        notificationsStore.setMessage(`The task "${taskName.value}" has been successfully created!`)
        taskName.value = ""
    } catch (error) {
        notificationsStore.setMessage('Something went wrong with the task creation')
    }
}
</script>
<template>
    <div class="text-normal w-full px-2">
        <h2>
            {{ title }}
        </h2>
        <div class="flex justify-between">
            <input class="w-full border-y-2 border-t-black bg-grayMain focus-visible:outline-none" type="text"
                :placeholder="placeholder" v-model="taskName" />
            <button @click="handleClick"
                class="bg-black text-white px-8 pt-1 pb-2 transition-background hover:bg-yellowMain hover:text-black hover:scale-105 active:scale-100">
                {{ buttonTitle }}
            </button>
        </div>
    </div>
</template>