<template>
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
                <router-link to="/">
                    <figure>
                        <img :src="mybooks" alt="" />
                    </figure>
                </router-link>
            </li>
            <li class="bookreviews">
                <router-link to="/">
                    <figure>
                        <img :src="bookreviews" alt="" />
                    </figure>
                </router-link>
            </li>
            <li class="place">
                <router-link to="/">
                    <figure>
                        <img :src="place" alt="" />
                    </figure>
                </router-link>
            </li>
            <li class="mypage" @click="popupOpen()">
                <a href="javascript:void(0)">
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
            <article class="browser_wrap">
                <header class="header">
                    <ul class="btnWraps">
                        <li class="red"><a href="javascript:void(0)" @click="browserClose"></a></li>
                        <li class="yellow"><a href="javascript:void(0)"></a></li>
                        <li class="green"><a href="javascript:void(0)" @click="browserClose"></a></li>
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

import { ref, onMounted, reactive } from 'vue';
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
        // const browserStatus = ref(false);
        const browserStatus = ref(true);
        const menuStatus = reactive({
            home: false,
            monthly: true,
            favorite: false,
            history: false,
            // 추가 메뉴들...
        });

        onMounted(() => {});

        // Toggle the popup state
        function popupOpen() {
            popupState.value = true;
        }

        const browserOpen = (page) => {
            console.log(`Opening browser with page: ${page}`);
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
            menuStatus,
        };
    },

    methods: {},
};
</script>

<style lang="scss">
.menu {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    ul {
        width: min(550px, 45%);
        display: flex;
        flex-wrap: wrap;

        li {
            width: calc((100% - 6vw) / 4);
            aspect-ratio: 1/1;
            margin-left: 2vw;
            margin-bottom: 4vw;
            position: relative;
            background-size: cover;
            background-repeat: no-repeat;
            background-position: center center;

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

    &_wrap {
        width: min(1300px, 95%);
        height: auto;
        aspect-ratio: 16/9;
        border-radius: 15px;
        background: #eee;
        //backdrop-filter: blur(15px);
        overflow: hidden;
        .header {
            width: 100%;
            height: 35px;
            display: flex;
            align-items: center;
            background: #333333;
        }
    }

    &_content {
        padding: 10px;
        width: 100%;
        height: calc(100% - 35px);
        overflow: auto;
    }
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease, transform 0.3s ease;
    /* transform-origin: center bottom; */
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
    transform: scale(0);
    /* transform-origin: center bottom; */
}
</style>
