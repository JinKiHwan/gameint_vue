import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

export function createHomeAnimations() {
    const animations = {
        titleAni: null,
        mainScrollAni: null,
    };

    // Intro
    function initAnimation() {
        const text_title = document.querySelector('.homeComp_main_title h2');
        const text_Game = document.querySelector('.homeComp_main_title h2 span');
        const text_DexInt = document.querySelector('.homeComp_main_title h2 i');
        const text_sub = document.querySelector('.homeComp_main_title p');
        const text_sub_span = document.querySelector('.homeComp_main_title p span');
        const homeComp = document.querySelector('.homeComp');
        const homeCompMain = document.querySelector('.homeComp_main');
        const pictureWraps = gsap.utils.toArray('.homeComp_main_picture ul li');
        const booksTop = gsap.utils.toArray('.homeComp_main_picture.top ul li');
        const booksBottom = gsap.utils.toArray('.homeComp_main_picture.bottom ul li');

        animations.titleAni = gsap
            .timeline({
                defaults: {
                    ease: 'power3.inOut',
                },
            })
            .set(pictureWraps, {
                opacity: 0,
            })
            .set(text_Game, {
                yPercent: -100,
            })
            .set(homeComp, { overflow: 'hidden' })
            .set(text_DexInt, { yPercent: -200 })
            .set(text_sub_span, { yPercent: -100 })
            .to(homeCompMain, {
                height: homeComp.offsetHeight,
            })
            .to(text_Game, {
                yPercent: 0,
            })
            .to(
                text_DexInt,
                {
                    yPercent: -100,
                },
                '<'
            )
            .to(text_DexInt, {
                delay: 1,
                yPercent: 0,
                ease: 'back(3)',
            })
            .to(
                text_sub_span,
                {
                    yPercent: 0,
                    ease: 'back(3)',
                },
                '+=0.5'
            )
            .to(homeComp, {
                duration: 1.5,
                backgroundColor: '#fff',
            })
            .to(
                text_title,
                {
                    duration: 1.5,
                    color: 'transparent',
                    webkitTextStroke: '2px #000',
                    fontSize: '10vw',
                    height: '10vw',
                },
                '<'
            )
            .to(
                text_sub_span,
                {
                    duration: 1.5,
                    color: 'transparent',
                    webkitTextStroke: '1px #000',
                },
                '<'
            )

            .from(pictureWraps, {
                duration: 1.5,
                left: '100%',
                top: 0,
                opacity: 1,
            })
            .to(homeComp, {
                overflow: 'auto',

                onComplete: () => {
                    animations.mainScrollAni = gsap
                        .timeline({
                            scrollTrigger: {
                                trigger: '.homeComp_main',
                                start: 'center center',
                                end: '+=5000',
                                scroller: '.homeComp',
                                scrub: 1,
                                markers: true,
                                pin: true,
                                pinSpacing: true,
                            },
                        })
                        .to(booksTop, {
                            yPercent: -100,
                            //opacity: 0,
                            stagger: {
                                each: 0.1,
                                from: 'random',
                            },

                            onComplete: () => {
                                document.addEventListener('DOMContentLoaded', () => {
                                    const pinSpacers = document.querySelectorAll('.pin-spacer');
                                    pinSpacers.forEach((spacer) => {
                                        spacer.style.backgroundColor = 'red';
                                        spacer.style.border = '1px solid blue';
                                    });
                                });
                            },
                        })
                        .to(
                            booksBottom,
                            {
                                yPercent: 100,
                                //opacity: 0,
                                stagger: {
                                    each: 0.1,
                                    from: 'random',
                                },
                            },
                            '<'
                        )
                        .to(booksBottom, {
                            opacity: 0,
                        })
                        .to(
                            [text_title, text_sub],
                            {
                                scale: 1.5,
                                filter: 'blur(10px)',
                                opacity: 0,
                            },
                            '<'
                        );
                },
            });
    }

    //scroll
    function initMainScrollMotion() {}

    return {
        animations,
        initAnimation,
        initMainScrollMotion,
    };
}
