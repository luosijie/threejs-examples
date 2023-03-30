
<script setup>
</script>
<template>
    <div class="loading">
        <div class="dots">
            <div class="circle"></div>
            <div class="circle"></div>
            <div class="circle"></div>
        </div>
    </div>
</template>
<style lang="scss">
.loading {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    background-color: var(--color-background-light);
    opacity: 1;
    .dots {
        display: flex;
        justify-content: center;
        align-items: center;
        .circle {
            margin: 6px;
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background-color: var(--color-pink-light);
            animation: bounce 1s ease-in-out infinite;
            &:nth-child(2) {
                animation-delay: 0.1s;
            }
            &:nth-child(3) {
                animation-delay: 0.2s;
            }
        }
    }
}

@keyframes bounce {
    0% {
        transform: translateY(0)
    }
    20% {
        transform: translateY(-12px)
    }
    40% {
        transform: translateY(0)
    }
  
}
</style>
