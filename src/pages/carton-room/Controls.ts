import { Object3D } from 'three'
import Floor from './Floor'
import Room from './Room'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ASScroll from '@ashthornton/asscroll'
import World from './World'

export default class Controls {
    timeline: GSAPTimeline

    world: World
    room: Room
    floor: Floor
    cube: Object3D

    constructor (world: World, room: Room, floor: Floor) {
        this.timeline = gsap.timeline()

        this.world = world
        this.room = room
        this.floor = floor
        this.cube = room.children.cube

    }

    showWelcome () {
        this.timeline.set('.animate-word', { y: 0, yPercent: 100 })
        this.timeline.to(
            '.loading', 
            {
                opacity: 0,
                onComplete () {
                    const loading = document.querySelector('.loading')
                    loading?.parentNode?.removeChild(loading)
                }
            }
        ).to(
            this.cube.scale, 
            {
                x: 1.4,
                y: 1.4,
                z: 1.4,
                ease: 'back.out(2.5)',
                duration: 0.7
            }
        ).to(
            this.room.body.position, 
            {
                x: -0.87,
                ease: 'power1.out',
                duration: 0.7,
            }
        ).to(
            '.arrow-down', 
            {
                opacity: 1
            },
            '<'
        ).to(
            '.toggle-bar', 
            {
                opacity: 1
            },
            '<'
        ).to(
            '.welcome-text .animate-word', 
            {
                yPercent: 0,
                stagger: 0.05,
                ease: 'back.out(1.7)',
                onComplete: () => {
                    this.showRoom()
                }
            },
            '<'
        )
    }

    showRoom () {

        let wheelEvent = (evt:WheelEvent) => {
            if (evt.deltaY <= 0) return
            window.removeEventListener('wheel', wheelEvent)
    
            this.timeline.to(
                '.welcome-text .animate-word', 
                {
                    yPercent: 100,
                    stagger: 0.05,
                    ease: 'back.out(1.7)'
                }
            ).to(
                '.arrow-down', 
                {
                    opacity: 0,
                }, 
                'same'
            ).to(
                this.room.body.position, 
                {
                    x: 0,
                    y: 0,
                    z: 0,
                    ease: 'power1.out',
                },
                'same'
            ).to(
                this.cube.rotation,
                {
                    y: 2 * Math.PI + Math.PI / 4,
                },
                'same'
            ).to(
                this.cube.scale,
                {
                    x: 10,
                    y: 10,
                    z: 10,
                },
                'same'
            ).to(
                this.world.camera.position,
                {
                    y: 8,
                },
                'same'
            ).to(
                this.room.children.cube.position,
                {
                    x: 0.638711,
                    y: 8.5618,
                    z: 1.3243,
                },
                'same'
            ).set(this.room.children.body.scale, {
                x: 1,
                y: 1,
                z: 1,
            }).to(
                this.room.children.cube.scale,
                {
                    x: 0,
                    y: 0,
                    z: 0,
                    duration: 1,
                },
                'introtext'
            ).to(
                '.hero-main-title .animate-word',
                {
                    yPercent: 0,
                    stagger: 0.07,
                    ease: 'back.out(1.7)',
                },
                'introtext'
            ).to(
                '.hero-main-description .animate-word',
                {
                    yPercent: 0,
                    stagger: 0.07,
                    ease: 'back.out(1.7)',
                },
                'introtext'
            ).to(
                '.first-sub .animate-word',
                {
                    yPercent: 0,
                    stagger: 0.07,
                    ease: 'back.out(1.7)',
                },
                'introtext'
            ).to(
                '.second-sub .animate-word',
                {
                    yPercent: 0,
                    stagger: 0.07,
                    ease: 'back.out(1.7)',
                },
                'introtext'
            ).to(
                this.room.children.aquarium.scale,
                {
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: 'back.out(2.2)',
                    duration: 0.5,
                },
                '>-0.5'
            ).to(
                this.room.children.clock.scale,
                {
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: 'back.out(2.2)',
                    duration: 0.5,
                },
                '>-0.4'
            ).to(
                this.room.children.shelves.scale,
                {
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: 'back.out(2.2)',
                    duration: 0.5,
                },
                '>-0.3'
            ).to(
                this.room.children.floor_items.scale,
                {
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: 'back.out(2.2)',
                    duration: 0.5,
                },
                '>-0.2'
            ).to(
                this.room.children.desks.scale,
                {
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: 'back.out(2.2)',
                    duration: 0.5,
                },
                '>-0.1'
            ).to(
                this.room.children.table_stuff.scale,
                {
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: 'back.out(2.2)',
                    duration: 0.5,
                },
                '>-0.1'
            ).to(this.room.children.computer.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: 'back.out(2.2)',
                duration: 0.5,
            }).set(this.room.children.mini_floor.scale, {
                x: 1,
                y: 1,
                z: 1,
            }).to(
                this.room.children.chair.scale,
                {
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: 'back.out(2.2)',
                    duration: 0.5,
                },
                'chair'
            ).to(
                this.room.children.fish.scale,
                {
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: 'back.out(2.2)',
                    duration: 0.5,
                },
                'chair'
            ).to(
                this.room.children.chair.rotation,
                {
                    y: 4 * Math.PI + Math.PI / 4,
                    ease: 'power2.out',
                    duration: 1,
                    onComplete: () => {
                        this.enableScroll()
                    }
                },
                'chair'
            )
            
        }
        window.addEventListener('wheel', wheelEvent)
    }

    enableScroll () {
        const page = document.querySelector('.page')
        if (page instanceof HTMLElement) {
            page.style.overflow = 'visible'
        }

        gsap.registerPlugin(ScrollTrigger)

        const asscroll = new ASScroll({
            ease: 0.5,
            disableRaf: true
        })
        gsap.ticker.add(asscroll.update)

        ScrollTrigger.defaults({
            scroller: asscroll.containerElement
        })

        ScrollTrigger.scrollerProxy(asscroll.containerElement, {
            scrollTop (value: any) {
                if (arguments.length) {
                    asscroll.currentPos = value
                    return
                }
                return asscroll.currentPos
            },
            getBoundingClientRect () {
                return {
                    top: 0,
                    left: 0,
                    width: window.innerWidth,
                    height: window.innerHeight,
                }
            }
        })

        asscroll.on('update', ScrollTrigger.update)
        ScrollTrigger.addEventListener('refresh', asscroll.resize)

        // requestAnimationFrame(() => {
        //     asscroll.enable({
        //         newScrollElements: document.querySelectorAll(
        //             '.gsap-marker-start, .gsap-marker-end, [asscroll]'
        //         ),
        //     })
        // })

        asscroll.enable()

        ScrollTrigger.matchMedia({
            all: () => {
                // First timeline
                const firstMoveTimeline = gsap.timeline({
                    scrollTrigger: {
                        trigger: '.first-move',
                        start: 'top top',
                        end: 'bottom bottom',
                        scrub: 0.6,
                        invalidateOnRefresh: true
                    }
                })
                firstMoveTimeline.to(
                    this.room.body.position,
                    { 
                        x: this.world.size.width * 0.0014
                    }
                ).to(
                    this.floor.circlePink.scale,
                    {
                        x: 3,
                        y: 3, 
                        z: 3
                    },
                    '<'
                )

                // Second timeline
                const secondMoveTimeline = gsap.timeline({
                    scrollTrigger: {
                        trigger: '.second-move',
                        start: 'top top',
                        end: 'bottom bottom',
                        scrub: 0.6,
                        invalidateOnRefresh: true
                    }
                })
                secondMoveTimeline.to(
                    this.floor.circleBlue.scale,
                    {
                        x: 3,
                        y: 3, 
                        z: 3
                    }
                ).to(
                    this.room.body.position,
                    {
                        x: 1,
                        z: this.world.size.height * 0.0032
                    },
                    '<'
                ).to(
                    this.room.body.scale,
                    {
                        x: 0.4,
                        y: 0.7,
                        z: 0.4,
                    },
                    '<'
                )

                // Third timeline
                const thirdMoveTimeline = gsap.timeline({
                    scrollTrigger: {
                        trigger: '.third-move',
                        start: 'top top',
                        end: 'bottom bottom',
                        scrub: 0.6,
                        invalidateOnRefresh: true
                    },
                })
                thirdMoveTimeline.to(
                    this.floor.circleGreen,
                    {
                        x: 3,
                        y: 3,
                        z: 3,
                    }
                ).to(
                    this.room.body.position,
                    {
                        x: 4.02,
                        z: -4.5
                    },
                    '<'
                )
            }
        })
        
    }
}