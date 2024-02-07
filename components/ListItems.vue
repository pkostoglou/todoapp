<script setup lang="ts">
import { useNotificationsStore } from '~/stores/notifications';
const runtimeConfig = useRuntimeConfig()
const notificationsStore = useNotificationsStore();
const props = defineProps(['data',"triggerReload"])
const handleDelete = async (id: number,taskTitle:string) => {
    try {
        await $fetch(`${runtimeConfig.public.BASE_URL}/todos/${id}`, {
            method: 'DELETE'
        })
        props.triggerReload()
        notificationsStore.setMessage(`task "${taskTitle}" was deleted successfully`)
    } catch (error) {
        notificationsStore.setMessage('Something went wrong with the task deletion')
    }
}

const handleTaskClick = async (completed: boolean, id: number) => {
    try {
        const body = {
            completed: !completed
        }
        await $fetch(`${runtimeConfig.public.BASE_URL}/todos/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        })
        props.triggerReload()
    } catch (error) {
        notificationsStore.setMessage('Something went wrong with the task update')
    }
}
</script>
<template>
    <div>
        <div class="border-b-2 transition-background" v-for="item in data" :key="item.id">
            <div class="relative hover:cursor-pointer item-wrapper hover:font-bold">
                <div class="flex justify-between p-2 relative z-10">
                    <p @click="() => handleTaskClick(item.completed, item.id)" class="w-full"
                        :class="item.completed ? 'completed' : ''">{{ item.title }}</p>
                    <button class="font-extrabold hover:scale-105 active:scale-100 p-2" @click="() => handleDelete(item.id,item.title)">&#88;</button>
                </div>
                <div class="bg-yellowMain w-full absolute top-0 z-0 animate-slideRight overflow-hidden"></div>
            </div>
        </div>
    </div>
</template>
<style>
@keyframes slideRight {
    0% {
        transform: scaleX(0);
        transform-origin: 0% 50%;
    }

    100% {
        transform: scaleX(1);
        transform-origin: 0% 50%;
    }
}

.item-wrapper:hover .animate-slideRight {
    animation: slideRight 0.5s ease-out;
    height: 100%;
}

</style>