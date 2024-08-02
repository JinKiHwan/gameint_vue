import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

export function createHomeAnimations() {
    const animations = {
        titleAni: null,
        titleScrollAni: null,
    };

    function initAnimations() {
        //const bigElements = gsap.utils.toArray('.big span');
        const home = document.querySelector('.homeComp');
        const homeMain = document.querySelector('.homeComp_main');
        const sliders = gsap.utils.toArray('.homeComp_main_books li');
        const slider = document.querySelector('.homeComp_main_books');
        const text_Game = document.querySelector('.homeComp_main_title h2 span');
        const text_DexInt = document.querySelector('.homeComp_main_title h2 i');

        animations.titleAni = gsap
            .timeline({
                defaults: {
                    ease: 'power3.inOut',
                },
            })
            .set(homeMain, {
                backgroundPosition: 'top -1000px center',
            })
            .set(sliders, {
                x: home.offsetWidth,
                y: -150,
            })
            .set(home, {
                overflow: 'hidden',
            })
            .set(text_Game, {
                yPercent: -100,
            })
            .set(text_DexInt, { yPercent: -200 })
            .to(homeMain, {
                duration: 3,
                backgroundPosition: 'top 0px center',
            })
            .to(sliders, {
                duration: 1.5,
                x: 0,
                stagger: { each: 0.3, amount: 0.3 },
            })
            .to(sliders, {
                y: 0,
                delay: -0.5,
                duration: 1.5,
                stagger: { each: 0.3, amount: 0.3, from: 2 },
            })
            .to(text_Game, {
                delay: 1,
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
            .to(home, {
                delay: 1,
                overflowY: 'auto',
                overflowX: 'hidden',
            })
            .to(slider, {
                x: -home.offsetWidth / 2,

                scrollTrigger: {
                    trigger: '.homeComp',
                    scroller: '.homeComp',
                    start: 'center center',
                    end: '110% top',
                    scrub: 1,
                    markers: true,
                },
            });
    }

    return {
        animations,
        initAnimations,
    };
}
