<template>
    <div class="system">
        <div class="current_time">{{ formattedTime }}</div>
        <div class="widgets">
            <ul>
                <li><img :src="signal" alt="" /></li>
                <li><img :src="wifi" alt="" /></li>
                <li>100%</li>
                <li><img :src="battery" alt="" /></li>
            </ul>
        </div>
    </div>

    <div class="menu">
        <div class="welcome_txt">
            <h3 class="loginBefore" v-if="!userStore.isLogin"></h3>
            <h3 class="loginAfter" v-else></h3>

            <span class="cursor"></span>
        </div>
        <ul>
            <li class="home">
                <a href="javascript:void(0)" @click="browserOpen('home')">
                    <figure>
                        <img :src="home" alt="" />
                    </figure>
                </a>
            </li>
            <li class="monthly">
                <a href="javascript:void(0)" @click="browserOpen('monthly')">
                    <figure>
                        <img :src="monthly" alt="" />
                    </figure>
                </a>
            </li>
            <li class="recommend">
                <a href="javascript:void(0)" @click="browserOpen('favorite')">
                    <figure>
                        <img :src="recommend" alt="" />
                    </figure>
                </a>
            </li>
            <li class="history">
                <a href="javascript:void(0)" @click="browserOpen('history')">
                    <figure>
                        <img :src="history" alt="" />
                    </figure>
                </a>
            </li>
            <li class="mybooks">
                <a href="javascript:void(0)" @click="preparingForService()">
                    <figure>
                        <img :src="mybooks" alt="" />
                    </figure>
                </a>
            </li>
            <li class="bookreviews">
                <a href="javascript:void(0)" @click="preparingForService()">
                    <figure>
                        <img :src="bookreviews" alt="" />
                    </figure>
                </a>
            </li>
            <li class="place">
                <a href="javascript:void(0)" @click="preparingForService()">
                    <figure>
                        <img :src="place" alt="" />
                    </figure>
                </a>
            </li>
            <li class="mypage" @click="popupOpen">
                <a href="javascript:void(0)">
                    <figure>
                        <img :src="mypage" alt="" />
                    </figure>
                </a>
            </li>
        </ul>
    </div>

    <LoginComp v-if="userStore.loginPopup"></LoginComp>

    <Transition name="fade">
        <div class="browser" v-if="browserStatus">
            <article class="browser_wrap" ref="browserRef">
                <header class="header">
                    <ul class="btnWraps">
                        <li class="red"><a href="javascript:void(0)" @click="browserClose"></a></li>
                        <li class="yellow"><a href="javascript:void(0)"></a></li>
                        <li class="green"><a href="javascript:void(0)" @click="browserFullmode"></a></li>
                    </ul>
                </header>

                <div class="browser_content">
                    <HomeComp v-if="menuStatus.home"></HomeComp>
                    <MonthlyComp v-if="menuStatus.monthly"></MonthlyComp>
                    <FavoriteBookComp v-if="menuStatus.favorite"></FavoriteBookComp>
                    <HistoryComp v-if="menuStatus.history"></HistoryComp>
                </div>
            </article>
        </div>
    </Transition>

    <div class="producer">
        <div class="producer_wrap">
            <p @click="madeIt()">Who Made it?</p>

            <ul class="producer_member" v-if="madeInfo">
                <li>Frontend : <a href="https://github.com/JinKiHwan" target="_blank"> Jin Kihwan</a></li>
                <li>Backend : <a href="https://github.com/kimgihean" target="_blank"> Kim Kihyun</a></li>

                <li class="close" @click="madeIt()"><i></i><i></i></li>
            </ul>
        </div>
    </div>

    <div class="notice" v-show="notice">
        <div class="notice_wrap">
            <button @click="notice = false"></button>
            <p>글 작성 이슈가 있을시 로그아웃 → 새로고침 → 로그인 → 새로고침 후 작성해주시길 바랍니다.</p>
            <p>해당 이슈는 조속히 수정할 수 있도록 하겠습니다. 감사합니다.</p>
        </div>
    </div>
</template>

<script>
import LoginComp from '@/components/LoginComp.vue';
import HomeComp from '@/components/HomeComp.vue';
import MonthlyComp from '@/components/MonthlyComp.vue';
import FavoriteBookComp from '@/components/FavoriteBookComp.vue';
import HistoryComp from '@/components/HistoryComp.vue';

import { ref, onMounted, reactive, computed, onUnmounted, watch } from 'vue';

import { useUserStore } from '@/store/user';
import { userLoginInput } from '@/store/loginInput';
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
gsap.registerPlugin(TextPlugin);

export default {
    name: 'IndexComp',
    components: {
        LoginComp,
        HomeComp,
        MonthlyComp,
        FavoriteBookComp,
        HistoryComp,
    },

    setup() {
        const userStore = useUserStore();
        const loginInputStore = userLoginInput();
        const home = ref(require('@/assets/img/home.webp'));
        const bookreviews = ref(require('@/assets/img/bookreviews.webp'));
        const history = ref(require('@/assets/img/history.webp'));
        const monthly = ref(require('@/assets/img/monthly.webp'));
        const mybooks = ref(require('@/assets/img/mybooks.webp'));
        const mypage = ref(require('@/assets/img/mypage.webp'));
        const place = ref(require('@/assets/img/place.webp'));
        const recommend = ref(require('@/assets/img/recommend.webp'));
        const battery = ref(require('@/assets/img/battery.svg'));
        const signal = ref(require('@/assets/img/signal.svg'));
        const wifi = ref(require('@/assets/img/wifi.svg'));
        const browserRef = ref(null);
        const isFullScreen = ref(false);
        const browserStatus = ref(false);
        const currentTime = ref(new Date());
        const popupState = ref(false);
        const text01 = ref(['GameInt에 오신걸 환영합니다!', '동호회 가입시 컨텐츠 이용이 가능합니다!']);
        const text02 = ref([`반갑습니다 ` + userStore.name + `님!`, 'GameInt에 오신걸 환영합니다!']);
        const madeInfo = ref(false);
        const notice = ref(false);

        /* //////////////////// */
        /* ///컴포넌트 스테이터스/ */
        /* /////////////////// */

        const menuStatus = reactive({
            home: false,
            monthly: false,
            favorite: false,
            history: false,
            // 추가 메뉴들...
        });

        /* ////////////////// */
        /* ///시간 표기/////// */
        /* ///////////////// */
        const formattedTime = computed(() => {
            const date = currentTime.value;
            const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            const month = months[date.getMonth()];
            const day = date.getDate();
            const weekday = days[date.getDay()];
            const hours = date.getHours().toString().padStart(2, '0');
            const minutes = date.getMinutes().toString().padStart(2, '0');

            return `${month} ${day} ${weekday} ${hours}:${minutes}`;
        });

        let timer;
        const updateTime = () => {
            currentTime.value = new Date();
        };

        /* //////////////////////////////// */
        /* ///Welcome Text 애니메이션/////// */
        /* /////////////////////////////// */
        let welcomeText01 = () => {
            if (!userStore.isLogin) {
                gsap.timeline().to('.welcome_txt h3.loginBefore', {
                    duration: 2.5,
                    text: text01.value[0],
                    yoyo: true,
                    repeat: 1,
                    ease: 'power(3)',
                });

                text01.value.push(text01.value.shift());

                gsap.delayedCall(5, welcomeText01, [text01.value]);
            } else {
                gsap.timeline().to('.welcome_txt h3.loginAfter', {
                    duration: 2.5,
                    text: text02.value[0],
                    yoyo: true,
                    repeat: 1,
                    ease: 'power(3)',
                });

                text02.value.push(text02.value.shift());

                gsap.delayedCall(5, welcomeText01, [text02.value]);
            }
        };

        onMounted(() => {
            timer = setInterval(updateTime, 1000);
            welcomeText01();
            userStore.initializeStore();
        });

        onUnmounted(() => {
            clearInterval(timer); // 컴포넌트 소멸 시 타이머 정리
        });

        /* //////////////////////////////// */
        /* ///컴포넌트 On/Off/////////////// */
        /* /////////////////////////////// */
        const popupOpen = () => {
            userStore.loginPopup = true;
        };

        const browserOpen = (page) => {
            browserStatus.value = true;

            Object.keys(menuStatus).forEach((key) => {
                menuStatus[key] = false;
            });
            if (page in menuStatus) {
                menuStatus[page] = true;
            }
        };

        const browserClose = () => {
            browserStatus.value = false;

            Object.keys(menuStatus).forEach((key) => {
                menuStatus[key] = false;
            });
        };

        const browserFullmode = () => {
            if (browserRef.value) {
                isFullScreen.value = !isFullScreen.value;

                if (isFullScreen.value) {
                    //전체창 모드 시
                    browserRef.value.style.width = '100%';
                    browserRef.value.style.height = '100%';
                    browserRef.value.style.borderRadius = '0';
                } else {
                    //전체창 모드 해제 시
                    browserRef.value.style.width = '';
                    browserRef.value.style.height = '';
                    browserRef.value.style.borderRadius = '';
                }
            }
        };

        const preparingForService = () => {
            alert('준비중입니다.');
        };

        /* //////////////////////////////// */
        /* ///Who Made It///////////////// */
        /* /////////////////////////////// */
        const madeIt = () => {
            madeInfo.value = !madeInfo.value;
        };

        watch(
            /* //////////////////////////////// */
            /* ///watch 사용할 곳이 있을까?////// */
            /* /////////////////////////////// */
            () => userStore.isLogin,
            (newValue, oldValue) => {
                console.log('isLogin changed:', oldValue, '->', newValue);
                if (newValue === true) {
                    console.log('로그인');
                } else {
                    // 로그아웃 되었을 때의 로직
                    console.log('로그아웃');
                }
            }
        );

        return {
            userStore,
            loginInputStore,
            home,
            bookreviews,
            history,
            monthly,
            mybooks,
            mypage,
            place,
            recommend,
            popupOpen,
            browserStatus,
            browserOpen,
            browserClose,
            browserFullmode,
            browserRef,
            menuStatus,
            formattedTime,
            battery,
            signal,
            wifi,
            isFullScreen,
            preparingForService,
            popupState,
            welcomeText01,
            madeInfo,
            madeIt,
            notice,
        };
    },
};
</script>

<style lang="scss">
body {
    font-family: -apple-system, BlinkMacSystemFont, sans-serif;

    @include mobile {
        &::before {
            // content: '모바일은 지원되지 않습니다';
            color: #fff;
            font-size: 18px;
            position: absolute;
            left: 0;
            top: 50%;
            width: 100%;
            text-align: center;
            transform: translateY(-50%);
        }
    }
}
.system {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 25px;
    padding: 0 17px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    pointer-events: none;

    @include mobile {
        padding: 1vw 3vw !important;
        height: auto !important;
    }

    .current_time {
        color: #fff;
        font-weight: 500;

        @include mobile {
            font-size: 3vw;
        }
    }

    .widgets {
        ul {
            height: 100%;
            display: flex;
            align-items: center;
            gap: 5px;
            color: #fff;

            @include mobile {
                font-size: 3vw;
                gap: 1vw !important;

                li {
                    height: 3vw;

                    img {
                        height: 100%;
                        object-fit: contain;
                    }
                }
            }
        }
    }
}

.menu {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 15px;

    @include mobile {
        display: flex !important;
    }

    .welcome_txt {
        width: min(550px, 45%);
        padding: 10px;
        background: rgba($color: #fff, $alpha: 0.2);
        border-radius: 10px;
        backdrop-filter: blur(10px);
        height: 36px;
        display: flex;
        gap: 3px;

        h3 {
            color: rgba($color: #fff, $alpha: 0.8);
        }
        .cursor {
            display: block;
            height: 100%;
            width: 1px;
            background: rgba($color: #fff, $alpha: 0.8);
            animation: cursor 1s infinite;
            animation-timing-function: steps(1, end);
        }

        @include mobile {
            display: none !important;
        }

    }

    ul {
        width: min(550px, 45%);
        display: flex;
        flex-wrap: wrap;

        @include mobile {
            width: min(90%, 100%) !important;
        }

        li {
            width: calc((100% - 6vw) / 4);
            aspect-ratio: 1/1;
            margin-left: 2vw;
            margin-bottom: 4vw;
            position: relative;
            background-size: cover;
            background-repeat: no-repeat;
            background-position: center center;

            @include mobile {
                width: calc((100% - 24vw) / 4) !important;
                margin-left: 8vw !important;
                margin-bottom: 9vw !important;

                &:nth-child(1),
                &:nth-child(5) {
                    margin-left: 0 !important;
                }
            }

            &:hover {
                figure {
                    filter: brightness(0.5);
                    transform: scale(0.95);
                }
            }

            a {
                display: block;
                width: 100%;
                height: 100%;

                figure {
                    width: 100%;
                    height: 100%;
                    border-radius: 15px;
                    overflow: hidden;
                    transition: filter 0.3s, transform 0.3s;

                    img {
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                    }
                }
            }

            &::after {
                position: absolute;
                width: 100%;
                text-align: center;
                left: 50%;
                bottom: -1.5vw;
                transform: translateX(-50%);
                color: #fff;
                font-size: 16px;

                @include mobile {
                    // font-size: 3vw !important;
                    // bottom: 0 !important;
                    // top: 17.5vw;
                    display: none;
                }
            }

            &.home {
                &::after {
                    content: '홈';
                }
            }

            &.monthly {
                &::after {
                    content: '이번달 책';
                }
            }

            &.recommend {
                &::after {
                    content: '책 추천';
                }
            }

            &.history {
                &::after {
                    content: '지난 이야기';
                }
            }

            &.mybooks {
                &::after {
                    content: '나의 책장 소개';
                }
            }

            &.bookreviews {
                &::after {
                    content: '책 감상문';
                }
            }

            &.place {
                &::after {
                    content: '장소 추천';
                }
            }

            &.mypage {
                &::after {
                    content: '마이페이지';
                }
            }

            &:nth-child(1),
            &:nth-child(5) {
                margin-left: 0;
            }

            &:nth-child(n + 5) {
                margin-bottom: 0;
            }
        }
    }

    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 0.5s ease;
    }

    .fade-enter-from,
    .fade-leave-to {
        opacity: 0;
    }
}

.browser {
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 25px;
    z-index: 1;

    &_wrap {
        width: min(1300px, 95%);
        height: 85%;
        //aspect-ratio: 16/9;
        border-radius: 15px;
        background: rgba($color: #dfdfdf, $alpha: 0.8);
        backdrop-filter: blur(15px);
        overflow: hidden;
        box-shadow: 0 0 10px rgba($color: #000000, $alpha: 0.5);
        transition: all 0.5s;

        @include mobile {
            border-radius: 5px !important;
        }

        .header {
            width: 100%;
            height: 35px;
            display: flex;
            align-items: center;
            background: linear-gradient(180deg, rgba(62, 62, 62, 1) 0%, rgba(51, 51, 51, 1) 40%, rgba(51, 51, 51, 1) 60%, rgba(62, 62, 62, 1) 100%);
        }
    }

    &_content {
        width: 100%;
        height: calc(100% - 35px);
        //overflow: auto;

        > div {
            &::-webkit-scrollbar {
                width: 8px; /* 스크롤바의 너비 */
            }

            &::-webkit-scrollbar-thumb {
                height: 30%; /* 스크롤바의 길이 */
                background: #535353; /* 스크롤바의 색상 */

                border-radius: 10px;
            }

            &::-webkit-scrollbar-track {
                background: rgba(33, 122, 244, 0.1); /*스크롤바 뒷 배경 색상*/
            }
        }
    }
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease, transform 0.3s ease;
    transform-origin: center bottom;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
    transform: scale(0);
    transform-origin: center bottom;
    /* transform-origin: center bottom; */
}

@keyframes cursor {
    0% {
        opacity: 0;
    }
    50% {
        opacity: 1;
    }
    100% {
        opacity: 0;
    }
}

.recommend_reason {
    h1 {
        font-size: 2em;
    }
    h2 {
        font-size: 1.5em;
    }
    h3 {
        font-size: 1.17em;
    }
    p {
        counter-reset: list-1 list-2 list-3 list-4 list-5 list-6 list-7 list-8 list-9;
    }

    strong {
        font-weight: bold;
    }
    em {
        font-style: italic;
    }
    u {
        text-decoration: underline;
    }
    pre {
        background-color: #23241f;
        color: #f8f8f2;
        overflow: visible;
    }

    ol {
        padding-left: 1.5em;
        li {
            counter-reset: list-1 list-2 list-3 list-4 list-5 list-6 list-7 list-8 list-9;
            counter-increment: list-0;
            list-style: decimal;
        }
    }
    blockquote {
        border-left: 4px solid #ccc;
        margin-bottom: 5px;
        margin-top: 5px;
        padding-left: 16px;
    }
}

.producer {
    position: absolute;
    right: 50px;
    bottom: 20px;
    z-index: 0;

    &_wrap {
        position: relative;
        > p {
            color: rgba($color: #fff, $alpha: 0.5);
            cursor: pointer;
            font-size: 12px;

            &:hover {
                text-decoration: underline;
            }
        }
    }

    &_member {
        position: absolute;
        right: 0;
        bottom: 0;
        background: rgba($color: #fff, $alpha: 0.6);
        width: 200px;
        padding: 15px;
        border-radius: 5px;
        backdrop-filter: blur(2px);

        li {
            display: flex;
            margin: 5px 0;

            a {
                color: blue;
                text-decoration: underline;
                padding-left: 3px;
            }

            &.close {
                position: absolute;
                right: 8px;
                top: 2px;
                width: 12px;
                height: 12px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                cursor: pointer;

                i {
                    display: inline-block;
                    width: 100%;
                    height: 1px;
                    background: #000;
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    &:nth-child(1) {
                        transform: translate(-50%, -50%) rotate(45deg);
                    }
                    &:nth-child(2) {
                        transform: translate(-50%, -50%) rotate(-45deg);
                    }
                }
            }
        }
    }
}

.notice {
    position: fixed;
    left: 30px;
    top: 50%;
    transform: translateY(-50%);
    width: 400px;
    height: 150px;
    border-radius: 8px;
    background: rgba($color: #fff, $alpha: 0.8);
    backdrop-filter: blur(5px);

    &_wrap {
        width: 100%;
        height: 100%;
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 15px;
        gap: 10px;
        padding-top: 20px;
        p {
            line-height: 1.3;
        }
    }

    button {
        position: absolute;
        left: 10px;
        top: 5px;
        background: #ff453a;
        width: 15px;
        aspect-ratio: 1/1;
        border-radius: 50%;
    }
}
</style>
