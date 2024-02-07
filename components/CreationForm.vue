<script setup lang="ts">
import { useNotificationsStore } from '~/stores/notifications';

const runtimeConfig = useRuntimeConfig()
const notificationsStore = useNotificationsStore();

const props = defineProps(['title', 'placeholder', 'buttonTitle', 'triggerReload'])

const taskName = ref("")

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
        await fetch(`${runtimeConfig.public.BASE_URL}/todos`, {
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
            <div class="relative w-full">
                <input @keyup.enter="handleClick" class="w-full border-t-2 border-t-black peer bg-grayMain focus-visible:outline-none" type="text"
                    :placeholder="placeholder" v-model="taskName" />
                <span class="bg-gray-200 absolute bottom-0 left-0 h-0.5 w-full peer-focus:w-0"></span>
                <span class="bg-black absolute bottom-0 left-0 h-0.5 w-0 transition-all peer-focus:w-full"></span>
            </div>
            <button @click="handleClick"
                class="bg-black text-white px-8 pt-1 pb-2 transition-background hover:bg-yellowMain hover:text-black hover:scale-105 active:scale-100">
                {{ buttonTitle }}
            </button>
        </div>
    </div>
</template>