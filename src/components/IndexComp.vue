<template>
    <div class="menu">
        <ul>
            <li class="home">
                <router-link to="/">
                    <figure>
                        <img :src="home" alt="" />
                    </figure>
                </router-link>
            </li>
            <li class="monthly">
                <router-link to="/">
                    <figure>
                        <img :src="monthly" alt="" />
                    </figure>
                </router-link>
            </li>
            <li class="recommend">
                <router-link to="/">
                    <figure>
                        <img :src="recommend" alt="" />
                    </figure>
                </router-link>
            </li>
            <li class="history">
                <router-link to="/">
                    <figure>
                        <img :src="history" alt="" />
                    </figure>
                </router-link>
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
</template>

<script>
import LoginComp from '@/components/LoginComp.vue';

import { ref, onMounted } from 'vue';
export default {
    name: 'IndexComp',
    components: {
        LoginComp,
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

        onMounted(() => {});

        // Toggle the popup state
        function popupOpen() {
            popupState.value = true;
        }

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
</style>
