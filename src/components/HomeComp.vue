<template>
    <div class="homeComp">
        <div class="homeComp_inner">
            <div class="homeComp_main">
                <div class="homeComp_main_title">
                    <h2>
                        <span>Game</span><i>Int<br />Dex</i>
                    </h2>
                    <p><span>민첩에 올인한 사우를 위한 지식함양 동호회</span></p>
                </div>

                <div class="homeComp_main_picture top">
                    <ul>
                        <li><img :src="picture[0].img" alt="" /></li>
                        <li><img :src="picture[1].img" alt="" /></li>
                        <li><img :src="picture[2].img" alt="" /></li>
                        <li><img :src="picture[3].img" alt="" /></li>
                        <li><img :src="picture[4].img" alt="" /></li>
                        <li><img :src="picture[0].img" alt="" /></li>
                        <li><img :src="picture[1].img" alt="" /></li>
                        <li><img :src="picture[2].img" alt="" /></li>
                        <li><img :src="picture[3].img" alt="" /></li>
                        <li><img :src="picture[4].img" alt="" /></li>
                    </ul>
                </div>

                <div class="homeComp_main_picture bottom">
                    <ul>
                        <li><img :src="picture[0].img" alt="" /></li>
                        <li><img :src="picture[1].img" alt="" /></li>
                        <li><img :src="picture[2].img" alt="" /></li>
                        <li><img :src="picture[3].img" alt="" /></li>
                        <li><img :src="picture[4].img" alt="" /></li>
                        <li><img :src="picture[0].img" alt="" /></li>
                        <li><img :src="picture[1].img" alt="" /></li>
                        <li><img :src="picture[2].img" alt="" /></li>
                        <li><img :src="picture[3].img" alt="" /></li>
                        <li><img :src="picture[4].img" alt="" /></li>
                    </ul>
                </div>
            </div>

            <div class="homeComp_merit">
                <article>
                    <h3>여러 작가를 만나다</h3>
                    <ul>
                        <li></li>
                    </ul>
                </article>
                <article>
                    <h3>다양한 의견을 나누다</h3>
                    <ul>
                        <li></li>
                    </ul>
                </article>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { createHomeAnimations } from '@/assets/js/animation.js';

export default {
    name: 'homeComp',

    setup() {
        const oilpastelImg = require('@/assets/img/oilpastel.webp');
        const bigTitle = ref(null);
        const { animations, initAnimation, initMainScrollMotion } = createHomeAnimations();
        const telegramLogo = require('@/assets/img/telegram.svg');
        const bg = require('@/assets/img/home/library.mp4');
        const picture = [{ img: require('@/assets/img/home/picture01.png') }, { img: require('@/assets/img/home/picture02.png') }, { img: require('@/assets/img/home/picture03.png') }, { img: require('@/assets/img/home/picture04.png') }, { img: require('@/assets/img/home/picture05.png') }];

        onMounted(() => {
            initAnimation();
            initMainScrollMotion();
        });

        return {
            oilpastelImg,
            bigTitle,
            animations,
            telegramLogo,
            picture,
            bg,
        };
    },
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400..900;1,6..96,400..900&display=swap');

.homeComp {
    background: #000;
    height: 100%;
    overflow: auto;

    &_inner {
        width: 100%;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    &_main {
        width: 100%;
        aspect-ratio: 16/9;
        position: relative;
        z-index: 0;

        &_title {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            gap: 1vw;

            h2 {
                font-size: 5vw;
                height: 5vw;
                font-weight: 600;
                overflow: hidden;
                display: flex;
                color: #fff;
                font-family: 'Bodoni Moda', serif;

                i {
                    //margin-left: 10px;
                    text-align: center;
                }
            }
            p {
                font-size: 1.5vw;
                height: 1.5vw;
                padding-right: 1.5vw;
                color: #fff;
                overflow: hidden;
                span {
                    display: block;
                }
            }
        }

        &_picture {
            width: min(100%, 1920px);
            aspect-ratio: 1920/200;
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            pointer-events: none;

            ul {
                width: 100%;
                height: 100%;
                position: relative;

                li {
                    width: 15%;
                    position: absolute;
                    top: 0;
                    left: 100%;
                    img {
                        width: 100%;
                        object-fit: cover;
                        box-shadow: 0 5px 15px rgba($color: #000000, $alpha: 0.5);
                    }

                    &:nth-child(1) {
                        left: -5%;
                        transform: rotate(5deg);
                        z-index: 1;
                    }
                    &:nth-child(2) {
                        top: 5%;
                        left: 5%;
                        transform: rotate(-8deg);
                        z-index: -2;
                    }
                    &:nth-child(3) {
                        top: -14%;
                        left: 10%;
                        transform: rotate(35deg);
                        z-index: -1;
                    }
                    &:nth-child(4) {
                        top: 5%;
                        left: 20%;
                        transform: rotate(7deg);
                        z-index: -2;
                    }
                    &:nth-child(5) {
                        top: -1%;
                        left: 33%;
                        transform: rotate(2deg);
                    }
                    &:nth-child(6) {
                        top: 3%;
                        left: 45%;
                        transform: rotate(-3deg);
                    }
                    &:nth-child(7) {
                        top: 1%;
                        left: 55%;
                        transform: rotate(2deg);
                        z-index: 1;
                    }
                    &:nth-child(8) {
                        top: -45%;
                        left: 65%;
                        transform: rotate(-1deg);
                        z-index: -1;
                    }
                    &:nth-child(9) {
                        top: 0;
                        left: 75%;
                        transform: rotate(2deg);
                    }
                    &:nth-child(10) {
                        left: 85%;
                        transform: rotate(5deg);
                        z-index: -1;
                    }
                }
            }

            &.top {
                bottom: auto;
                top: 0;
                transform: translate(-50%, -50%);

                ul {
                    flex-direction: row-reverse;
                    li {
                        img {
                            transform: rotate(180deg);
                        }
                    }
                }
            }
        }
    }

    &_merit {
        width: 100%;
        height: 100vh;

        article {
            height: auto;
        }
    }
}
</style>
