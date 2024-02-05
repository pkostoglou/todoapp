<script lang="ts" setup>
const { data: tasks } = await useFetch('https://to-do-kostoglou.titlos.com/todos')

//Function that will reload the tasks
const reloadData = async () => {
    const response = await $fetch(`https://to-do-kostoglou.titlos.com/todos`, {
        method: 'GET'
    })
    tasks.value=response
};
</script>
<template>
    <div class="bg-grayMain min-h-[100vh]">
        <h1 class="text-center text-titles font-bold pt-4 pb-8 bg-white">
            TO DO LIST
        </h1>
        <div class="max-w-[800px] m-auto">
            <CreationForm title="New Task" placeholder="Type task name" buttonTitle="ADD" class="pt-8" :triggerReload="reloadData"/>
            <ListItems :data="tasks" class="pt-20" :triggerReload="reloadData"/>
        </div>
    </div>
</template>