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
                        <li><img :src="picture[5].img" alt="" /></li>
                        <li><img :src="picture[6].img" alt="" /></li>
                        <li><img :src="picture[7].img" alt="" /></li>
                        <li><img :src="picture[8].img" alt="" /></li>
                        <li><img :src="picture[9].img" alt="" /></li>
                    </ul>
                </div>

                <div class="homeComp_main_picture bottom">
                    <ul>
                        <li><img :src="picture[10].img" alt="" /></li>
                        <li><img :src="picture[11].img" alt="" /></li>
                        <li><img :src="picture[12].img" alt="" /></li>
                        <li><img :src="picture[13].img" alt="" /></li>
                        <li><img :src="picture[14].img" alt="" /></li>
                        <li><img :src="picture[15].img" alt="" /></li>
                        <li><img :src="picture[16].img" alt="" /></li>
                        <li><img :src="picture[17].img" alt="" /></li>
                        <li><img :src="picture[18].img" alt="" /></li>
                        <li><img :src="picture[19].img" alt="" /></li>
                    </ul>
                </div>
            </div>

            <div class="homeComp_merit">
                <article>
                    <h3>Meet several writers <span>여러 작가를 만나다</span></h3>
                    <ul>
                        <li>
                            <img src="https://image.ajunews.com/content/image/2021/12/01/20211201155123634014.jpg" alt="" />
                        </li>
                        <li>
                            <img src="https://i.namu.wiki/i/HAkoBRVZDjrcAN_piKSCY64WZZpYRGYjsTd9vRB1YeQM6gSgEAGSauMJPF81090jrQ7aPQC8UvepudfYdsiPYAMAhcARCU_ap8S5qNCQY5NwGIOEWWr84Ci2VVabcFRwokat2UV-LYc_4VF2k_rTumKTrKBI2TuToNWF6tdX3Tw.webp" alt="" />
                        </li>
                        <li>
                            <img src="https://www.theartof.com/assets/images/speaker-headshots/large/ChipHeath.jpg" alt="" />
                        </li>
                        <li>
                            <img src="https://i.namu.wiki/i/HAkoBRVZDjrcAN_piKSCY-6nfUIpeRj6fkLGisZD6c4ichJmSztoZD143Q4u655FIivuas1qDq5Q9oN1dpzLBea5BZEahdc-81iujmypt-ywpeUJrScozyEnRcGoQ6lZ3-WDIFYiENTTaJojVUUBTUcBUXIYsTBaE6Jh_PROq3A.jpg" alt="" />
                        </li>
                        <li>
                            <img src="https://www.kyobostory.co.kr/resources/front/images/contents/fs_travel/20191010/img03.png" alt="" />
                        </li>
                        <li>
                            <img src="https://i.namu.wiki/i/HAkoBRVZDjrcAN_piKSCY537tZ-XL2gIGBD-bBee89bMcGM33P18poSbjanO3MSPhBFNEDnNSYdNOLKein00xBoL1MBxsSJDwGL6qy9cPNyTq9XEuS0VL7D-h0KNWXLuEeKSlIp_6gXnCd6j7j3MkDYwMqVwJFDebR2DRWcpQko.webp" alt="" />
                        </li>
                    </ul>
                </article>
                <article>
                    <h3>Share various opinions<span>다양한 의견을 나누다</span></h3>
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
        const picture = [
            { img: require('@/assets/img/home/picture01.png') },
            { img: require('@/assets/img/home/picture02.png') },
            { img: require('@/assets/img/home/picture03.png') },
            { img: require('@/assets/img/home/picture04.png') },
            { img: require('@/assets/img/home/picture05.png') },
            { img: require('@/assets/img/home/picture06.png') },
            { img: require('@/assets/img/home/picture07.png') },
            { img: require('@/assets/img/home/picture08.png') },
            { img: require('@/assets/img/home/picture09.png') },
            { img: require('@/assets/img/home/picture10.png') },
            { img: require('@/assets/img/home/picture11.png') },
            { img: require('@/assets/img/home/picture12.png') },
            { img: require('@/assets/img/home/picture13.png') },
            { img: require('@/assets/img/home/picture14.png') },
            { img: require('@/assets/img/home/picture15.png') },
            { img: require('@/assets/img/home/picture16.png') },
            { img: require('@/assets/img/home/picture17.png') },
            { img: require('@/assets/img/home/picture18.png') },
            { img: require('@/assets/img/home/picture19.png') },
            { img: require('@/assets/img/home/picture20.png') },
        ];

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
            width: 95%;
            margin: 0 auto;

            h3 {
                font-size: 3vw;
                font-weight: 800;
                color: transparent;
                -webkit-text-stroke: 1px #000;
                font-family: 'Bodoni Moda', serif;

                span {
                    font-size: 1vw;
                }
            }
            ul {
                display: flex;
                gap: 1vw;
                li {
                    width: min(600px, 25vw);
                    aspect-ratio: 1/1;
                    border: 1px solid #000;
                    img {
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                        filter: grayscale(1);
                    }
                }
            }
        }
    }
}
</style>
