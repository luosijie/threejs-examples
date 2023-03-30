
<script setup >
import { onMounted, reactive } from 'vue'
import emitter, { EmitterType } from './emitter.ts'
import Loader from '@/utils/Loader.ts'
import resources from './config/resources.ts'

import World from './World.ts'
import Room from './Room.ts'
import Floor from './Floor.ts'
import Controls from './Controls.ts'

import Loading from './components/Loading.vue'
import ToggleBar from './components/ToggleBar.vue'
import AnimateText from './components/AnimateText.vue'
import Stats from 'stats.js'
import { Clock } from 'three'

const status = reactive({
    dark: false // true:dark-theme; false: light-theme
})

onMounted(() => {
    const stats = new Stats()
    stats.showPanel(0)
    document.body.appendChild( stats.dom )
    
    const canvas = document.querySelector('#canvas')
    const world = new World(canvas)

    const loader = new Loader()
    loader.load(resources)
    loader.onLoadEnd(() => {

        const floor = new Floor()
        world.scene.add(floor.body)

        const room = new Room(loader.resources)
        world.scene.add(room.body)
        
        const controls = new Controls(world, room, floor)
        controls.showWelcome()

        const clock = new Clock()
        const tick = () => {
            stats.begin()
            emitter.emit(EmitterType.Tick, clock)
            
            world.render()
            stats.end()

            window.requestAnimationFrame(tick)            
        }

        tick()
    })

    window.addEventListener('resize', () => {
        world.updateSize()
    })

})

</script>
<template>
    <div :class="[status.dark ? 'dark-theme' : 'light-theme']">
        <canvas id="canvas"/>
        <Loading/>
        <ToggleBar v-model="status.dark"/>
        
        <div class="arrow-down">
            <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path fill="currentColor" d="M12 14.95q-.2 0-.375-.063-.175-.062-.325-.212L6.675 10.05q-.275-.275-.262-.688.012-.412.287-.687.275-.275.7-.275.425 0 .7.275l3.9 3.9 3.925-3.925q.275-.275.688-.263.412.013.687.288.275.275.275.7 0 .425-.275.7l-4.6 4.6q-.15.15-.325.212-.175.063-.375.063Z"/></svg>
        </div>

        <!-- page -->
        <div class="page" asscroll-container>

            <div class="page-wrapper" asscroll>
                <section class="hero">
                    <div class="hero-wrapper">

                        <AnimateText text="Welcome to my portfolio!" class="welcome-text"/>

                        <div class="hero-main">
                            <AnimateText text="Abigail Bloom" class="hero-main-title"/>
                            <AnimateText text="Digital Media Student | 3D Artist" class="hero-main-description"/>
                        </div>

                        <div class="hero-second">
                            <AnimateText text="AbigailBloom" class="hero-second-subheading first-sub"/>
                            <AnimateText text="Portfolio" class="hero-second-subheading second-sub"/>
                        </div>

                    </div>
                </section>

                <div class="first-move section-margin">first move</div>

                <section class="first-section section left">
                    <div class="progress-wrapper progress-bar-wrapper-left">
                        <div class="progress-bar"></div>
                    </div>

                    <div class="section-intro-wrapper">
                        <h1 class="section-title">
                            <span class="section-title-text">About Me</span>
                            <div class="section-title-decoration styleOne"></div>
                            <div class="section-title-decoration styleTwo"></div>
                            <div class="section-title-decoration styleThree"></div>
                        </h1>
                        <span class="section-number">01</span>
                    </div>

                    <div class="section-detail-wrapper">
                        <!-- <h3 class="section-heading">Hello!</h3> -->
                        <p class="section-text">Hi there 👋! I'm a third-year digital media student from UK currently studying in Germany. My dream is to work for Disney or Pixar one day.</p>
                        <p class="section-text"> I love creating art and playing with my cats! I also like drinking bubble tea and going for hikes! Totally hippie lol ✌️. Welcome to my portfolio!</p>
                    <!-- <h3 class="section-heading">Lorem Ipsum</h3>
                    <p class="section-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic expedita qui quae officiis, magni velit iste repellat consequuntur temporibus. Quasi atque officia iste beatae rerum, harum itaque accusamus. At, natus?</p> -->
                    <!-- <h3 class="section-heading">Lorem Ipsum</h3>
                    <p class="section-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic expedita qui quae officiis, magni velit iste repellat consequuntur temporibus. Quasi atque officia iste beatae rerum, harum itaque accusamus. At, natus?</p> -->
                    </div>
                </section>

                <div class="second-move section-margin">second move</div>

                <section class="second-section section right">
                    <div class="progress-wrapper progress-bar-wrapper-right">
                        <div class="progress-bar blue-background"></div>
                    </div>

                    <div class="section-intro-wrapper blue-text blue-border">
                        <h1 class="section-title blue-text blue-border">
                            <span class="section-title-text blue-text">My Work</span>
                            <div class="section-title-decoration styleOne blue-border"></div>
                            <div class="section-title-decoration styleTwo blue-border"></div>
                            <div class="section-title-decoration styleThree blue-background blue-border"></div>
                        </h1>
                        <span class="section-number blue-text">02</span>
                    </div>

                    <div class="section-detail-wrapper">
                        <h3 class="section-heading">Candycane Village</h3>
                        <p class="section-text">This project is in progress but it's about a super colorful village where the entire world including the people are candies. So far the story is that they are set out to explore their "space" only to realize it's a human that will try to destroy them.</p>
                        <h3 class="section-heading">Rebecca's Reddish Radishes</h3>
                        <p class="section-text">Oh what's that? Why, it's a red radish! Oop, another one! In this playful and comedy animation, Rebecca, a young farmer, decided to plant radishes for the first time, but there is a big twist!</p>
                        <h3 class="section-heading">Flora</h3>
                        <p class="section-text">A heartwarming story about a little orphan girl who tries to find her way back home.</p>
                    </div>
                </section>

                <div class="third-move section-margin">third move</div>

                <section class="third-section section left">
                    <div class="progress-wrapper progress-bar-wrapper-left">
                        <div class="progress-bar green-background"></div>
                    </div>

                    <div class="section-intro-wrapper green-text green-border">
                        <h1 class="section-title green-text green-border">
                            <span class="section-title-text green-text">Contact Me</span>
                            <div class="section-title-decoration styleOne green-border"></div>
                            <div class="section-title-decoration styleTwo green-border"></div>
                            <div class="section-title-decoration styleThree green-background green-border"></div>
                        </h1>
                        <span class="section-number green-text">03</span>
                    </div>

                    <div class="section-detail-wrapper">
                        <h3 class="section-heading">ArtStation</h3>
                        <p class="section-text">I post all my work here. I don't want to link it yet because I want to sort it out a little bit!</p>
                        <h3 class="section-heading">Instagram</h3>
                        <p class="section-text">Check out my personal instagram for travel pics and food and stuff.</p>
                        <h3 class="section-heading">LinkedIn</h3>
                        <p class="section-text">Career updates and so much more!</p>
                    </div>
                </section>

            </div>
        </div>
    </div>
</template>
<style>
:root {
    /* Light Theme Variables */
    --color-text-light: #333332;
    --color-background-light: #faf4e5;
    --color-pink-light: #e5a1aa;
    --color-green-light: #7ad0ac;
    --color-blue-light: #8395cd;

    /* Dark Theme Variables */
    --color-text-dark: #faf4e5;
    --color-background-dark: #8395cd;
}
.tp-dfwv {
    position: fixed!important;
    top: 50px;
    left: 10px;
    z-index: 99999!important;
}
</style>
<style lang="scss" scoped>
.section-margin {
    color: red($color: #000000);
}
.light-theme {
    --color-text: var(--color-text-light);
    --color-background: var(--color-background-light);
    --color-pink: var(--color-pink-light);
    --color-green: var(--color-green-light);
    --color-blue: var(--color-blue-light);
}
.dark-theme {
    --color-text: var(--color-text-dark);
    --color-background: var(--color-background-dark);
    --color-pink: var(--color-text-dark);
    --color-green: var(--color-text-dark);
    --color-blue: var(--color-text-dark);
}

// Canvas style
canvas {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;

}

// Page style
.page {
    z-index:99999;
    overflow: hidden;
    width: 100vw;
    height: 100vh;
    .page-wrapper {
        position: relative;
    }
}

/* Preloader Stuff */
.animatedis {
    display: inline-block;
    transform: translateY(100%);
}
.welcome-text {
    position: absolute;
    top: 50%;
    left: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    font-size: 16px;
    font-weight: 500;
    color: var(--color-text);
    transform: translate(-50%, -50%);
}
.arrow-down {
    position: fixed;
    bottom: 10px;
    left: 50%;
    display: flex;
    justify-content: center;
    margin-left: -25px;
    width: 50px;
    color: var(--color-text);
    opacity: 0;
    animation: bounce 0.5s ease-in alternate infinite;
}

@keyframes bounce {
    0% {
        transform: translateY(0)
    }
    100% {
        transform: translateY(8px)
    }
}

/* Section Formatting --------------------------------------------- */
.section-margin {
    width: 100%;
    height: 3000px;
}
.section {
    position: relative;
    overflow: hidden;
    margin: 0;
    padding: 1000px 4%;
    width: 50%;
    background-color: var(--color-background);
}
.left {
    margin-right: auto;
    border-top-right-radius: 700px 700px;
    border-bottom-right-radius: 0 0;
}
.right {
    margin-left: auto;
    border-top-left-radius: 700px 700px;
    border-bottom-left-radius: 0 0;
}

/* Progress bars */
.progress-wrapper {
    z-index: 9999;
    width: 12px;
    height: 0;
}
.progress-bar-wrapper-left {
    position: absolute;
    top: 0;
    left: 0;
}
.progress-bar-wrapper-right {
    position: absolute;
    top: 0;
    right: 0;
}
.progress-bar {
    width: 100%;
    height: 100vh;
    background-color: var(--color-pink);
    transform-origin: top center;
    transform: scaleY(1);
}

/* Sections -------------- */
.section-intro-wrapper {
    position: relative;
    padding: 20% 5%;
    padding-bottom: 400px;
    border-bottom: 2px solid var(--color-pink);
}
.section-intro-wrapper:nth-child(3) {
    border-bottom: 2px solid var(--color-green);
}
.section-detail-wrapper {
    position: relative;
    padding: 20% 5%;
}
.section-heading {
    margin-top: 64px;
    font-size: 18px;
    font-weight: 700;
    color: var(--color-text);
    line-height: 1.8;
}
.section-text {
    line-height: 2;
    margin-top: 18px;
    font-size: 16px;
    color: var(--color-text);
}

/* Fancy Decoration Part of Section */
.section-title {
    position: relative;
    color: var(--color-pink)
}
.section-title-text {
    z-index: 5;
    display: block;
    font-size: 40px;
    font-weight: 500;
    color: var(--color-pink);
    transform-origin: left;
    transform: skewY(25deg);
    text-transform: uppercase;
}
.styleOne,
.styleTwo,
.styleThree {
    position: absolute;
    display: block;
    width: 100%;
    max-width: 278px;
    height: 60px;
    border: 1px solid var(--color-pink);
    transform-origin: left;
    transform: skewY(-25deg);
}
.styleOne {
    top: 0;
}
.styleTwo {
    top: 80px;
}
.styleThree {
    top: 80px;
    transform: skewY(25deg);
    background-color: var(--color-pink);
}
.section-number {
    position: absolute;
    right: 0;
    bottom: 15px;
    font-size: 24px;
    color: var(--color-pink);
}

/* Hero section -------------------------------- */
.hero {
    width: 100vw;
    height: 100vh;
    .hero-wrapper {
        position: relative;
        margin: 0 auto;
        width: 100%;
        max-width: 1100px;
        height: 100%;
        .hero-main {
            position: absolute;
            bottom: 168px;
            left: 0;
            color: var(--color-text);
            .hero-main-title {
                overflow: hidden;
                font-size: 64px;
                color: var(--color-text);
            }
            .hero-main-description {
                font-size: 18px;
                color: var(--color-text);
            }
        }
        .hero-second {
            position: absolute;
            top: calc(50% - 120px);
            right: 0;
            color: var(--color-text);
            .hero-second-subheading {
                font-size: 32px;
                text-transform: uppercase;
                color: var(--color-text);
            }
        }
    }
}

/* Other colors override */
.blue-text {
    color: var(--color-blue)
}
.blue-border {
    border-color: var(--color-blue);
}
.blue-background {
    background-color: var(--color-blue);
}
.green-text {
    color: var(--color-green)
}
.green-border {
    border-color: var(--color-green);
}
.green-background {
    background-color: var(--color-green);
}

/* Media Queries */

@media (max-width: 968px) {
    .section {
        width: 100%;
    }
    .progress-bar-wrapper-left {
        right: 0;
        left: auto;
    }
    .hero-main {
        bottom: 120px;
    }
    .hero-second {
        top: 160px;
    }
    .hero-wrapper {
        width: calc(100% - 60px);
    }
    .hero-main-title {
        font-size: 32px;
    }
    .hero-main-description {
        font-size: 18px;
    }
    .hero-second-subheading {
        font-size: 18px;
    }
}

</style>
