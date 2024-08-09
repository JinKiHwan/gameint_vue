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
        <ul>
            <li class="home">
                <a href="javascript:void(0)" @click="browserOpen('home')">
                    <figure>
                        <img :src="home" alt="" />
                    </figure>
                </a>
            </li>
            <li class="monthly">
                <!-- <a href="javascript:void(0)" @click="browserOpen('monthly')"> -->
                <a href="javascript:void(0)" @click="preparingForService()">
                    <figure>
                        <img :src="monthly" alt="" />
                    </figure>
                </a>
            </li>
            <li class="recommend">
                <!-- <a href="javascript:void(0)" @click="browserOpen('favorite')"> -->
                <a href="javascript:void(0)" @click="preparingForService()">
                    <figure>
                        <img :src="recommend" alt="" />
                    </figure>
                </a>
            </li>
            <li class="history">
                <!-- <a href="javascript:void(0)" @click="browserOpen('history')"> -->
                <a href="javascript:void(0)" @click="preparingForService()">
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
            <li class="mypage">
                <!-- <a href="javascript:void(0)" @click="popupOpen()"> -->
                <a href="javascript:void(0)" @click="preparingForService()">
                    <figure>
                        <img :src="mypage" alt="" />
                    </figure>
                </a>
            </li>
        </ul>
    </div>

    <LoginComp v-if="popupState" v-model:popupState="popupState"></LoginComp>

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
</template>

<script>
import LoginComp from '@/components/LoginComp.vue';
import HomeComp from '@/components/HomeComp.vue';
import MonthlyComp from '@/components/MonthlyComp.vue';
import FavoriteBookComp from '@/components/FavoriteBookComp.vue';
import HistoryComp from '@/components/HistoryComp.vue';

import { ref, onMounted, reactive, computed, onUnmounted } from 'vue';
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
        const popupState = ref(false);
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

        let timer;
        const menuStatus = reactive({
            home: false,
            monthly: false,
            favorite: false,
            history: false,
            // 추가 메뉴들...
        });

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

        const updateTime = () => {
            currentTime.value = new Date();
        };

        onMounted(() => {
            timer = setInterval(updateTime, 1000); // 1초마다 업데이트
        });
        onUnmounted(() => {
            clearInterval(timer); // 컴포넌트 소멸 시 타이머 정리
        });
        // Toggle the popup state
        function popupOpen() {
            popupState.value = true;
        }

        const browserOpen = (page) => {
            //console.log(`Opening browser with page: ${page}`);
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

        return {
            home,
            bookreviews,
            history,
            monthly,
            mybooks,
            mypage,
            place,
            recommend,
            popupState,
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
        };
    },

    methods: {},
};
</script>

<style lang="scss">
body {
    font-family: -apple-system, BlinkMacSystemFont, sans-serif;
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

    @include mobile {
        padding-top: 15vw;
        align-items: flex-start !important;
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
                margin-bottom: 12vw !important;

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
                    font-size: 3vw !important;
                    bottom: 0 !important;
                    top: 17.5vw;
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
            background: #333333;
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
</style>
