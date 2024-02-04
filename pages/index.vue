<script setup>
const {data:tasks} = await useFetch('https://to-do-kostoglou.titlos.com/todos')
console.log(tasks.value[0])
</script>
<template>
    <div class="">
        <div class="max-w-[800px] m-auto">
            <CreationForm title="New Task" placeholder="Type task name" buttonTitle="ADD" />
        </div>
    </div>
</template>