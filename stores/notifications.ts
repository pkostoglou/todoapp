import { defineStore } from "pinia";

export const useNotificationsStore = defineStore("notifications", () => {
  const message = ref("");
  const setMessage = (newMessage:string) => (message.value = newMessage);

  return {
    message,
    setMessage
  };
});