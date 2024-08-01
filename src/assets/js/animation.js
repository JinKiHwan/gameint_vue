import { gsap } from 'gsap';

export function createHomeAnimations() {
    const animations = {
        titleAni: null,
    };

    function initAnimations() {
        // const bigElements = gsap.utils.toArray('.big span');

        animations.titleAni = gsap;
    }

    return {
        animations,
        initAnimations,
    };
}
