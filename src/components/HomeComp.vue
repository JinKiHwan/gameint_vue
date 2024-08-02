<template>
    <div class="homeComp">
        <div class="homeComp_inner">
            <div class="homeComp_main">
                <div class="homeComp_main_title">
                    <h2>
                        <span>GAME</span><i>INT<br />DEX</i>
                    </h2>
                </div>

                <ul class="homeComp_main_books">
                    <li class="small"><img :src="books[0].img" alt="" /></li>
                    <li class="medium"><img :src="books[1].img" alt="" /></li>
                    <li class="big"><img :src="books[2].img" alt="" /></li>
                    <li class="medium"><img :src="books[3].img" alt="" /></li>
                    <li class="small"><img :src="books[4].img" alt="" /></li>
                    <li class="small"><img :src="books[5].img" alt="" /></li>
                    <li class="medium"><img :src="books[6].img" alt="" /></li>
                    <li class="big"><img :src="books[7].img" alt="" /></li>
                    <li class="medium"><img :src="books[8].img" alt="" /></li>
                    <li class="small"><img :src="books[9].img" alt="" /></li>
                </ul>
            </div>

            <div class="homeComp_bubble"></div>
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
        const { animations, initAnimations } = createHomeAnimations();
        const telegramLogo = require('@/assets/img/telegram.svg');
        const books = [
            { img: require('@/assets/img/home/slide01.webp') },
            { img: require('@/assets/img/home/slide02.webp') },
            { img: require('@/assets/img/home/slide03.webp') },
            { img: require('@/assets/img/home/slide04.webp') },
            { img: require('@/assets/img/home/slide05.webp') },
            { img: require('@/assets/img/home/slide06.webp') },
            { img: require('@/assets/img/home/slide07.webp') },
            { img: require('@/assets/img/home/slide08.webp') },
            { img: require('@/assets/img/home/slide09.webp') },
            { img: require('@/assets/img/home/slide10.webp') },
        ];

        onMounted(() => {
            initAnimations();
        });

        return {
            oilpastelImg,
            bigTitle,
            animations,
            telegramLogo,
            books,
        };
    },
};
</script>

<style lang="scss" scoped>
.homeComp {
    background: #fff;
    height: 100%;
    overflow: auto;

    &_inner {
        width: 100%;
        overflow: hidden;
    }

    &_main {
        width: 100%;
        aspect-ratio: 16/9;
        position: relative;
        background-image: linear-gradient(180deg, rgba(120, 191, 255, 1) 0%, rgba(255, 255, 255, 1) 100%);
        background-repeat: no-repeat;

        &_title {
            width: 100%;
            height: 35%;
            display: flex;
            align-items: center;
            justify-content: center;

            h2 {
                font-size: 5vw;
                height: 5vw;
                font-weight: 800;
                overflow: hidden;
                display: flex;
                color: #fff;

                i {
                    margin-left: 10px;
                }
            }
        }

        &_books {
            display: flex;
            align-content: center;
            justify-content: flex-start;
            align-items: center;
            width: 200%;
            box-sizing: content-box;
            gap: 0.5%;
            li {
                width: 9.775%;

                &.small {
                    width: 9.275%;
                }
                &.big {
                    width: 10.775%;
                }

                img {
                    width: 100%;
                }
            }
        }
    }

    &_bubble {
        height: 100vh;
    }
}
</style>
