
<script setup>
import { computed } from 'vue'

const props = defineProps({
    text: {
        type: String,
        default: ''
    }
})

const words = computed(() => {
    return props.text.split('')
})
</script>
<template>
    <div class="animate-text">
        <span class="animate-word" :class="{empty: item === ' '}" v-for="(item, index) in words" :key="index">{{ item }}</span>
    </div>
</template>
<style lang="scss">
.animate-text {
    overflow: hidden;
    .animate-word {
        display: inline-block;
        transform: translateY(100%);
        height: 100%;
        &.empty {
            margin-left: 0.3em;
        }
    }
}
</style>
