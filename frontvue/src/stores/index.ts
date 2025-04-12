import {ref, computed} from 'vue'
import {defineStore} from 'pinia'
import {createPinia} from "pinia";

export const pinia = createPinia()
export const useCounterStore = defineStore('counter', () => {
    const count = ref(0)
    const doubleCount = computed(() => count.value * 2)

    function increment() {
        count.value++
    }

    return {count, doubleCount, increment}
})
export default pinia