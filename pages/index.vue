<script lang="ts" setup>
const runtimeConfig = useRuntimeConfig()
const { data: tasks } = await useFetch(`${runtimeConfig.public.BASE_URL}/todos`)

//Function that will reload the tasks
const reloadData = async () => {
    const response = await $fetch(`${runtimeConfig.public.BASE_URL}/todos`, {
        method: 'GET'
    })
    tasks.value=response
};
</script>
<template>
    <div class="bg-grayMain min-h-[100vh] font-main">
        <h1 class="text-center text-titles font-bold pt-4 pb-8 bg-white">
            TO DO LIST
        </h1>
        <div class="max-w-[800px] m-auto">
            <CreationForm title="New Task" placeholder="Type task name" buttonTitle="ADD" class="pt-8" :triggerReload="reloadData"/>
            <ListItems :data="tasks" class="pt-20" :triggerReload="reloadData"/>
        </div>
    </div>
</template>