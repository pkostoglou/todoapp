<script lang="ts" setup>

const notificationsStore = useNotificationsStore();
const myModalRef = ref<HTMLDivElement | null>(null);
const closeAnimation = ref(false)

const handleCloseModal = () =>{
    closeAnimation.value=true
    setTimeout(()=>{
        notificationsStore.setMessage("")
        closeAnimation.value=false
    },500)
}

const handleClickOutside = (event:Event) => {
    if (notificationsStore.message != "" && myModalRef.value && !myModalRef.value.contains(event.target as Node)) {
        handleCloseModal()
    }
};

onMounted(() => {
    document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside);
});
</script>
<template>
    <div ref="myModalRef" v-if="notificationsStore.message!=''"
        class="fixed w-[100vw] md:w-auto top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 border-2 border-black rounded-md font-main" :class="closeAnimation?'animate-fadeOut':'animate-fadeIn'"> 
        <div class="p-2 bg-yellowMain flex justify-end rounded-t-md">
            <button class="font-extrabold hover:scale-105 active:scale-100" @click="() => handleCloseModal()">&#88;</button>
        </div>
        <p class="p-6 bg-grayMain rounded-b-md text-center">
            {{ notificationsStore.message }}
        </p>
    </div>
</template>
<style>
@keyframes fadeIn {
    0% {
        opacity: 0;
        transform: translate(-50%, -70%);
    }

    100% {
        opacity: 1;
        transform: translate(-50%, -50%);
    }
}

@keyframes fadeOut {
    0% {
        opacity: 1;
        transform: translate(-50%, -50%);
    }

    100% {
        opacity: 0;
        transform: translate(-50%, -30%);
    }
}

.animate-fadeIn {
    animation: fadeIn 0.5s ease-out;
}

.animate-fadeOut {
    animation: fadeOut 0.7s ease-out;
}
</style>