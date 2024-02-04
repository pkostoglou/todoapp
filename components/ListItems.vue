<script setup lang="ts">
const props = defineProps(['data'])
const handleDelete = async (id: number) => {
    try {
        await $fetch(`https://to-do-kostoglou.titlos.com/todos/${id}`, {
            method: 'Delete'
        })
    } catch (error) {
        console.log(error)
    }
}

const handleTaskClick = async (completed: boolean, id: number) => {
    try {
        const body = {
            completed: !completed
        }
        await $fetch(`https://to-do-kostoglou.titlos.com/todos/${id}`, {
            method: 'Put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        })
    } catch (error) {
        console.log(error)
    }
}
</script>
<template>
    <div>
        <div class="border-b-2 transition-background" v-for="item in data" :key="item.id">
            <div class="relative hover:cursor-pointer item-wrapper">
                <div class="flex justify-between p-2 h-[40px] relative z-10">
                    <p @click="() => handleTaskClick(item.completed, item.id)" class="w-full"
                        :class="item.completed ? 'completed' : ''">{{ item.title }}</p>
                    <button class="font-extrabold" @click="() => handleDelete(item.id)">&#88;</button>
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
    height: 40px;
}

</style>