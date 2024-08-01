<template>
    <div class="home">
        <div class="home_inner">
            <div class="home_main"></div>

            <div class="home_bubble"></div>

            <!-- <div class="telegram">
                <a href="https://t.me/" target="_blank">
                    <figure>
                        <img :src="telegramLogo" alt="" />
                    </figure>
                </a>
            </div> -->
        </div>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
// import { gsap } from 'gsap';
import { createHomeAnimations } from '@/assets/js/animation.js';

export default {
    name: 'homeComp',

    setup() {
        const oilpastelImg = require('@/assets/img/oilpastel.webp');
        const bigTitle = ref(null);
        const { animations, initAnimations } = createHomeAnimations();
        const telegramLogo = require('@/assets/img/telegram.svg');

        // const animations = reactive({
        //     titleAni: null,
        // });

        onMounted(() => {
            initAnimations();
        });

        return {
            oilpastelImg,
            bigTitle,
            animations,
            telegramLogo,
        };
    },
};
</script>

<style lang="scss" scoped>
.home {
    background: #fff;
    height: 100%;
    overflow: auto;

    &_inner {
        width: 100%;
        padding: 0 10px;
        overflow-x: hidden;
    }

    &_main {
        width: 100%;
        aspect-ratio: 16/9;
        position: relative;
    }

    &_bubble {
        height: 100vh;
    }
}
</style>
