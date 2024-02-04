<script setup>
const { data: tasks } = await useFetch('https://to-do-kostoglou.titlos.com/todos')
</script>
<template>
    <div class="bg-grayMain min-h-[100vh]">
        <h1 class="text-center text-titles font-bold pt-4 pb-8 bg-white">
            TO DO LIST
        </h1>
        <div class="max-w-[800px] m-auto">
            <CreationForm title="New Task" placeholder="Type task name" buttonTitle="ADD" class="pt-8"/>
            <ListItems :data="tasks" class="pt-20"/>
        </div>
    </div>
</template>