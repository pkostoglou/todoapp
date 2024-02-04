<script setup lang="ts">
const taskName = ref("")
const props = defineProps(['title', 'placeholder', 'buttonTitle'])

const handleClick = async () => {
    try {
        if(taskName.value=="") return
        const body = {
            title: taskName.value
        }
        await fetch("https://to-do-kostoglou.titlos.com/todos", {
            method: 'Post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        })
    } catch (error) {
        console.log(error)
    }
}
</script>
<template>
    <div class="text-normal w-full">
        <h2>
            {{ title }}
        </h2>
        <div class="flex justify-between">
            <input class="w-full border-y-2 border-t-black" type="text" :placeholder="placeholder" v-model="taskName" />
            <button @click="handleClick"
                class="bg-black text-white px-8 pt-1 pb-2 transition-background hover:bg-yellowMain hover:text-black hover:scale-105 active:scale-100">
                {{ buttonTitle }}
            </button>
        </div>
    </div>
</template>