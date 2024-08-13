<template>
    <div class="monthly">
        <div class="monthly_inner" v-if="monthlyStatus === 0">
            <div class="monthly_book">
                <div class="monthly_book_wrap">
                    <div class="monthly_book_bg"><img :src="monthlyBook" alt="" /></div>

                    <figure class="monthly_book_img">
                        <img :src="monthlyBook" alt="" />
                        <figcaption>{{ currentMonthBook }}</figcaption>
                    </figure>

                    <div class="monthly_book_info">
                        <ul class="monthly_book_tab">
                            <li v-for="tab in tabs" :key="tab.id" @click="activeTab = tab.id" :class="{ active: activeTab === tab.id }">{{ tab.name }}</li>
                        </ul>

                        <div class="tab-content">
                            <div v-if="activeTab === 'book'">
                                <h3>
                                    <span class="gsap-text-ani">{{ bookName }}</span>
                                </h3>
                                <ul>
                                    <li>
                                        <span class="gsap-text-ani"><b>작가</b> {{ bookWriter }}</span>
                                    </li>
                                    <li>
                                        <span class="gsap-text-ani"><b>출판사</b> {{ publisher }}</span>
                                    </li>
                                    <li>
                                        <span class="gsap-text-ani"><b>카테고리</b> {{ category }}</span>
                                    </li>
                                </ul>
                            </div>

                            <div v-else-if="activeTab === 'recommend'">
                                <ul>
                                    <li>
                                        <span class="gsap-text-ani"><b>추천인 </b> {{ recommendUser }}</span>
                                    </li>
                                    <li class="recommend_reason">
                                        <b>추천이유 </b>

                                        <i> {{ recommendReason }}</i>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="monthly_book_btn">
                <div class="monthly_book_btn_wrap">
                    <a href="javascript:void(0)" @click="menuStatusChange"> <span></span><span></span><span></span> <i class="x1"></i><i class="x2"></i></a>
                    <button class="view_review" @click="monthlyAnimationLeave"></button>
                    <button class="write_review" @click="writeReview"></button>
                </div>
            </div>

            <!-- <button class="view_review" @click="monthlyAnimationLeave">작성글보기→</button> -->
            <!-- <button class="write_review" @click="writeReview" v-if="userStore.isLogin">리뷰 작성</button> -->
            <div class="monthly_review" v-if="reviewPopup">
                <form action="">
                    <h3>리뷰 작성</h3>
                    <dl>
                        <dt>평점</dt>
                        <dd><input type="number" max="5" min="1" v-model.number="value" step="0.01" placeholder="1~5점을 입력해 주세요" /></dd>
                    </dl>

                    <dl>
                        <dt>리뷰</dt>
                        <dd><textarea v-model="reviewContents" placeholder="책을 읽고 느낀점을 자유롭게 적어주세요"></textarea></dd>
                    </dl>

                    <div class="btn_wrap">
                        <button class="close" @click="closeReview">닫기</button>
                        <button class="write" @click="monthlyBookReview">작성하기</button>
                    </div>
                </form>
            </div>
        </div>

        <div class="monthly_inner" v-if="monthlyStatus === 1">
            <div class="monthly_book">
                <p>GameInt 리뷰</p>
            </div>

            <div class="monthly_book_wrap">
                <div class="member_profile">
                    <ul>
                        <li v-for="(user, index) in userReviewWraps" :key="index" @click="selectUser(index)" :class="{ active: selectedIndex === index }">
                            <img :src="user.userProfile" alt="" />
                        </li>
                    </ul>
                </div>

                <div class="member_review" v-if="selectedUser">
                    <ul>
                        <li>{{ selectedUser.userName }}님의 리뷰</li>
                        <li>{{ selectedUser.userReview }}</li>
                        <li class="user-rating">평점: {{ selectedUser.userPoint }} / 5</li>
                    </ul>
                    <button v-if="selectedUser.userId == userStore.memberIdx" class="edit_review" @click="editReview">수정하기</button>
                </div>
            </div>

            <button class="history_back" @click="monthlyAnimation2Leave">←뒤로가기</button>

            <div class="monthly_review_edit" v-if="reviewEditPopup">
                <form action="">
                    <h3>리뷰 수정</h3>
                    <dl>
                        <dt>평점</dt>
                        <dd><input type="number" max="5" min="1" v-model.number="value" step="0.01" placeholder="1~5점을 입력해 주세요" /></dd>
                    </dl>

                    <dl>
                        <dt>리뷰</dt>
                        <dd><textarea name="" id="" placeholder="책을 읽고 느낀점을 자유롭게 적어주세요"></textarea></dd>
                    </dl>

                    <div class="btn_wrap">
                        <button class="close" @click="closeEditReview">닫기</button>
                        <button class="write">수정하기</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, computed, onMounted, watch, nextTick } from 'vue';
import axios from 'axios';
import { gsap } from 'gsap';
import { CSSPlugin } from 'gsap/CSSPlugin';
gsap.registerPlugin(CSSPlugin);

import { useUserStore } from '@/store/user';

export default {
    name: 'MonthlyComp',

    setup() {
        const userStore = useUserStore();
        const monthlyBook = ref('https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9791193044162.jpg');
        const currentMonthBook = computed(() => {
            const now = new Date();
            //const year = now.getFullYear();
            const month = now.getMonth() + 1;
            return `${month} 월의 책`;
        });

        const data = ref('');
        const error = ref('');

        const bookIdx = ref(null);
        const bookName = ref('');
        const bookWriter = ref('');
        const publisher = ref('');
        const category = ref('');
        const recommendUser = ref('');
        const recommendReason = ref('');
        const reviewPopup = ref(false); //팝업 on/off
        const reviewEditPopup = ref(false);
        const monthlyStatus = ref(0);
        const userReviewWraps = ref([
            {
                userId: '1',
                userName: '안승필',
                userProfile: require('@/assets/img/profile/profile_df.webp'),
                userReview: '세계정세가 급박하게 바뀌던 과거에 시대의 부조리와 불안감을  암울한 미래사회로 나타낸 작품입니다. 디스토피아를 다룬 많은 이야기에 영향을 주었던 작품입니다.현재 읽고 있는데 ',
                userPoint: 4,
            },
            {
                userId: '2',
                userName: '김효종',
                userProfile: require('@/assets/img/profile/profile_df.webp'),
                userReview: '세계정세가 급박하게 바뀌던 과거에 시대의 부조리와 불안감을  암울한 미래사회로 나타낸 작품입니다. 디스토피아를 다룬 많은 이야기에 영향을 주었던 작품입니다.현재 읽고 있는데 ',
                userPoint: 3,
            },
            {
                userId: '3',
                userName: '진기환',
                userProfile: require('@/assets/img/profile/profile_df.webp'),
                userReview: '세계정세가 급박하게 바뀌던 과거에 시대의 부조리와 불안감을  암울한 미래사회로 나타낸 작품입니다. 디스토피아를 다룬 많은 이야기에 영향을 주었던 작품입니다.현재 읽고 있는데 ',
                userPoint: 2,
            },
            {
                userId: '4',
                userName: '맹주영',
                userProfile: require('@/assets/img/profile/profile_df.webp'),
                userReview: '세계정세가 급박하게 바뀌던 과거에 시대의 부조리와 불안감을  암울한 미래사회로 나타낸 작품입니다. 디스토피아를 다룬 많은 이야기에 영향을 주었던 작품입니다.현재 읽고 있는데 ',
                userPoint: 1,
            },
            {
                userId: '5',
                userName: '안승필',
                userProfile: require('@/assets/img/profile/profile_df.webp'),
                userReview: '세계정세가 급박하게 바뀌던 과거에 시대의 부조리와 불안감을  암울한 미래사회로 나타낸 작품입니다. 디스토피아를 다룬 많은 이야기에 영향을 주었던 작품입니다.현재 읽고 있는데 ',
                userPoint: 4,
            },
            {
                userId: '6',
                userName: '김효종',
                userProfile: require('@/assets/img/profile/profile_df.webp'),
                userReview: '세계정세가 급박하게 바뀌던 과거에 시대의 부조리와 불안감을  암울한 미래사회로 나타낸 작품입니다. 디스토피아를 다룬 많은 이야기에 영향을 주었던 작품입니다.현재 읽고 있는데 ',
                userPoint: 3,
            },
            {
                userId: '7',
                userName: '진기환',
                userProfile: require('@/assets/img/profile/profile_df.webp'),
                userReview: '세계정세가 급박하게 바뀌던 과거에 시대의 부조리와 불안감을  암울한 미래사회로 나타낸 작품입니다. 디스토피아를 다룬 많은 이야기에 영향을 주었던 작품입니다.현재 읽고 있는데 ',
                userPoint: 2,
            },
            {
                userId: '8',
                userName: '맹주영',
                userProfile: require('@/assets/img/profile/profile_df.webp'),
                userReview:
                    '세계정세가 급박하게 바뀌던 과거에 시대의 부조리와 불안감을  암울한 미래사회로 나타낸 작품입니다. 디스토피아를 다룬 많은 이야기에 영향을 주었던 작품입니다.현재 읽고 있는데 세계정세가 급박하게 바뀌던 과거에 시대의 부조리와 불안감을  암울한 미래사회로 나타낸 작품입니다. 디스토피아를 다룬 많은 이야기에 영향을 주었던 작품입니다.현재 읽고 있는데 세계정세가 급박하게 바뀌던 과거에 시대의 부조리와 불안감을  암울한 미래사회로 나타낸 작품입니다. 디스토피아를 다룬 많은 이야기에 영향을 주었던 작품입니다.현재 읽고 있는데 ',
                userPoint: 1,
            },
        ]);
        const selectedIndex = ref(0);
        const value = ref(null);
        const reviewContents = ref('');
        let menuStatus = ref(false);

        const selectUser = (index) => {
            selectedIndex.value = index;
        };

        const selectedUser = computed(() => {
            return selectedIndex.value !== null ? userReviewWraps.value[selectedIndex.value] : null;
        });
        const tabs = [
            { id: 'book', name: '책 정보' },
            { id: 'recommend', name: '추천 정보' },
        ];
        const activeTab = ref('book');

        /* //////////////////////////////// */
        /* //MonthlyBook 데이터 받아오기///// */
        /* /////////////////////////////// */
        const monthlyBookDetail = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/book/monthly/this-month', { withCredentials: true });
                console.log(response.data.data);

                if (response.data.code === 1) {
                    bookIdx.value = response.data.data.bookIdx;
                    bookName.value = response.data.data.bookTitle; //책제목
                    category.value = response.data.data.bookCategory; //카테고리
                    publisher.value = response.data.data.bookPublisher; //출판사
                    bookWriter.value = response.data.data.author; //작가명
                    recommendUser.value = response.data.data.memberName; //추천인
                    recommendReason.value = response.data.data.recommendReason; //추천이유
                } else if (response.data.code === -1) {
                    // 책 리스트가 비어있는 경우
                    error.value = '추천 책 리스트가 비어있습니다.';
                } else if (response.data.code === -2) {
                    console.log('이거 왜 안돼');
                } else {
                    // 기타 오류
                    error.value = response.data.message || '알 수 없는 오류가 발생했습니다.';
                }
            } catch (err) {
                error.value = '서버 오류가 발생했습니다. 나중에 다시 시도해주세요.';
            }
        };

        /* //////////////////////////////// */
        /* //MonthlyBook 리뷰 데이터 전달//// */
        /* /////////////////////////////// */
        const monthlyBookReview = async () => {
            event.preventDefault(); // 기본 동작 방지

            console.log('별점:', value.value);
            console.log('리뷰 내용:', reviewContents.value);

            if (!value.value || !reviewContents.value) {
                alert('입력을 하시죠');
            } else {
                try {
                    const reviewData = {
                        contents: reviewContents.value,
                        star: value.value,
                    };

                    const response = await axios.post(`http://localhost:3000/api/book/monthly/${bookIdx.value}/evaluate`, reviewData);
                    switch (response.data.code) {
                        case 1:
                            console.log('평가 성공:', response.data.message);

                            break;
                        case -1:
                            console.log('오류: 로그인이 필요합니다.');
                            // 로그인 페이지로 리다이렉트 또는 로그인 모달 표시
                            break;
                        case -2:
                            console.log('오류: 당선된 책 평가가 아닙니다.');
                            // 사용자에게 알림 표시
                            break;
                        case -99:
                            console.log('서버 오류 발생');
                            // 일반적인 오류 메시지 표시
                            break;
                        default:
                            console.log('알 수 없는 오류 발생:', response.data);
                        // 예상치 못한 응답에 대한 처리
                    }
                } catch (error) {
                    console.error('Error uploading file:', error);
                }
            }
        };

        /* //////////////////////////////// */
        /* //리뷰작성 & 수정하기 팝업 On&Off/// */
        /* /////////////////////////////// */
        const writeReview = () => {
            reviewPopup.value = true;
        };
        const closeReview = () => {
            event.preventDefault(); // 기본 동작 방지
            reviewPopup.value = false;
        };
        const editReview = () => {
            reviewEditPopup.value = true;
        };
        const closeEditReview = () => {
            reviewEditPopup.value = false;
        };

        /* //////////////////////////////// */
        /* //리뷰작성 메뉴 애니메이션//////////// */
        /* /////////////////////////////// */

        let isAnimating = false;

        const menuStatusChange = () => {
            if (isAnimating) return; // 애니메이션 중이면 함수 실행을 중단

            isAnimating = true;
            menuStatus.value = !menuStatus.value;

            const timeline = gsap.timeline({
                defaults: { ease: 'back(3)' },
                onComplete: () => {
                    isAnimating = false; // 애니메이션이 완료되면 플래그를 false로 설정
                },
            });

            if (menuStatus.value) {
                menuOpen(timeline);
            } else {
                menuClose(timeline);
            }
        };

        const menuOpen = (timeline) => {
            const menuHamburger = gsap.utils.toArray('.monthly_book_btn_wrap > a > span');
            const menuX = gsap.utils.toArray('.monthly_book_btn_wrap > a > i');
            const viewReview = document.querySelector('.view_review');
            const writeReview = document.querySelector('.write_review');

            timeline
                .to(menuHamburger, {
                    opacity: 0,
                    scale: 0,
                })
                .to(menuX, {
                    opacity: 1,
                    scale: 1,
                })
                .to(
                    viewReview,
                    {
                        x: -60,
                    },
                    '<'
                )
                .to(
                    writeReview,
                    {
                        x: -30,
                        y: -60,
                        delay: 0.1,
                    },
                    '<'
                )
                .to(menuX, {
                    rotate: gsap.utils.wrap([45, -45]),
                });
        };

        const menuClose = (timeline) => {
            const menuHamburger = gsap.utils.toArray('.monthly_book_btn_wrap > a > span');
            const menuX = gsap.utils.toArray('.monthly_book_btn_wrap > a > i');
            const viewReview = document.querySelector('.view_review');
            const writeReview = document.querySelector('.write_review');

            timeline
                .to(menuX, {
                    rotate: 0,
                })
                .to(
                    viewReview,
                    {
                        x: 0,
                        ease: 'back.in(1.7)',
                    },
                    '<'
                )
                .to(
                    writeReview,
                    {
                        delay: 0.1,
                        x: 0,
                        y: 0,
                        ease: 'back.in(1.7)',
                    },
                    '<'
                )
                .to(menuX, {
                    opacity: 0,
                    scale: 0,
                })

                .to(menuHamburger, {
                    opacity: 1,
                    scale: 1,
                });
        };

        /* //////////////////////////////// */
        /* ///Monthly Component 애니메이션// */
        /* /////////////////////////////// */
        const monthlyAnimation = () => {
            const figure = document.querySelector('.book_figure figure img');
            const text = gsap.utils.toArray('.gsap-text-ani');
            gsap.set(figure, { xPercent: 150 });
            gsap.set(text, { yPercent: 200 });
            gsap.timeline({ defaults: { duration: 0.3 } })
                .to(figure, { xPercent: 0, delay: 0.5 })
                .to(text, {
                    yPercent: 0,
                    stagger: { each: 0.1 },
                });
        };

        const monthlyAnimationLeave = () => {
            const figure = document.querySelector('.book_figure figure img');
            const text = gsap.utils.toArray('.gsap-text-ani');

            gsap.timeline({ defaults: { duration: 0.3 } })
                .to(figure, { xPercent: -150 })
                .to(text, {
                    yPercent: -200,
                    stagger: { each: 0.1 },

                    onComplete: () => {
                        monthlyStatus.value = 1;
                        menuStatus.value = false;
                    },
                });
        };

        const monthlyAnimation2 = () => {
            const profile = gsap.utils.toArray('.member_profile ul li');
            const review = gsap.utils.toArray('.member_review ul li');

            gsap.set(profile, { scale: 0 });
            gsap.set(review, { opacity: 0, y: 50 });

            gsap.timeline({ defaults: { duration: 0.3 } })
                .to(profile, { scale: 1, stagger: { each: 0.1 } })
                .to(review, { opacity: 1, y: 0, stagger: { each: 0.1 } }, '<');
        };

        const monthlyAnimation2Leave = () => {
            const profile = gsap.utils.toArray('.member_profile ul li');
            const review = gsap.utils.toArray('.member_review ul li');

            gsap.timeline({ defaults: { duration: 0.3 } })
                .to(profile, { scale: 0 })
                .to(
                    review,
                    {
                        transformOrigin: 'center left',
                        scale: 0,
                        stagger: {
                            each: 0.2,
                            from: 'end',
                        },
                        onComplete: () => {
                            monthlyStatus.value = 0;
                        },
                    },
                    '<'
                );
        };

        onMounted(() => {
            monthlyStatus.value = 0; //초기 화면 값

            monthlyAnimation();
            watch(monthlyStatus, (newValue) => {
                if (newValue === 1) {
                    nextTick(() => {
                        monthlyAnimation2();
                    });
                } else if (newValue === 0) {
                    nextTick(() => {
                        monthlyAnimation();
                    });
                }
            });

            monthlyBookDetail();
        });

        /* //////////////////////////////// */
        /* ///리뷰 점수 1~5점만 입력 가능하게// */
        /* /////////////////////////////// */
        watch(value, (newValue) => {
            if (newValue > 5) {
                value.value = 5;
            }
            // 소수점 둘째자리까지 반올림하고 다시 숫자로 변환
            value.value = Number(Number(value.value).toFixed(2));
        });

        return {
            userStore,
            monthlyBook,
            currentMonthBook,
            bookName,
            bookWriter,
            publisher,
            category,
            recommendUser,
            recommendReason,
            reviewPopup,
            reviewEditPopup,
            writeReview,
            closeReview,
            monthlyStatus,
            userReviewWraps,
            monthlyBookDetail,
            monthlyBookReview,
            data,
            error,
            tabs,
            activeTab,
            selectUser,
            selectedUser,
            monthlyAnimation,
            monthlyAnimationLeave,
            monthlyAnimation2,
            monthlyAnimation2Leave,
            selectedIndex,
            value,
            reviewContents,
            editReview,
            closeEditReview,
            bookIdx,
            menuOpen,
            menuClose,
            menuStatus,
            menuStatusChange,
        };
    },
};
</script>

<style lang="scss" scoped>
.monthly {
    position: relative;
    height: 100%;
    .gsap-text-ani {
        display: block;
    }

    height: 100%;
    overflow: auto;
    &_inner {
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        overflow: hidden;
    }

    &_book {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;

        &_bg {
            position: fixed;
            z-index: -1;
            width: 100%;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            filter: blur(15px) brightness(0.5);
            img {
                width: 100%;
                object-fit: cover;
            }
        }

        > p {
            text-align: center;
            font-size: 15px;
            color: #fff;
            writing-mode: vertical-rl;
            text-orientation: upright;
        }

        &_wrap {
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: flex-start;
            height: 70%;
            gap: 25px;

            .member_review {
                width: 50%;

                ul {
                    li {
                        padding: 10px;
                        line-height: 1.2;
                    }
                }
            }
        }
        &_img {
            height: 100%;
            position: relative;

            img {
                height: 100%;
                object-fit: contain;
                box-shadow: 0 0 15px rgba($color: #fff, $alpha: 1);
            }

            figcaption {
                position: absolute;
                font-size: 15px;
                left: -26px;
                top: 0;
                writing-mode: vertical-rl;
                text-orientation: upright;
                color: #eee;
            }
        }

        &_info {
            width: min(300px, 45%);
            color: #ededed;
        }

        &_tab {
            display: flex;
            gap: 15px;
            margin-bottom: 20px;

            li {
                font-size: 18px;
                padding: 3px 15px;
                position: relative;
                z-index: 0;
                cursor: pointer;
                opacity: 0.7;
                &::after {
                    content: '';
                    width: 0;
                    height: 8px;
                    background: #30d158;
                    z-index: -1;
                    display: block;
                    position: absolute;
                    left: 50%;
                    bottom: -1px;
                    transform: translateX(-50%);
                    transition: width 0.3s;
                }

                &:hover {
                    opacity: 1;
                }
                &.active {
                    color: #fff;
                    opacity: 1;
                    &::after {
                        width: 100%;
                    }
                }
            }
        }

        &_btn {
            position: fixed;
            right: 25px;
            bottom: 25px;
            width: 50px;
            aspect-ratio: 1/1;

            &_wrap {
                position: relative;
                width: 100%;
                height: 100%;
            }

            a {
                display: block;
                width: 100%;
                height: 100%;
                background: #c79707;
                border-radius: 50%;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                gap: 5px;
                position: relative;

                span {
                    display: block;
                    height: 2px;
                    width: 50%;
                    background: #fff;
                    transform-origin: center center;
                }

                i {
                    position: absolute;
                    display: block;
                    width: 50%;
                    height: 2px;
                    background: #fff;
                    scale: 0;
                    opacity: 0;

                    &.x1 {
                        transform: rotate(45deg);
                    }
                    &.x2 {
                        transform: rotate(-45deg);
                    }
                }
            }

            .view_review,
            .write_review {
                width: 100%;
                height: 100%;
                border-radius: 50%;
                background: #f00;
                position: absolute;
                left: 0;
                top: 0;
                z-index: -1;
            }
        }
    }

    .tab-content {
        h3 {
            font-size: 28px;
            font-weight: 600;
            margin-bottom: 15px;
        }

        ul {
            display: flex;
            flex-direction: column;
            gap: 8px;

            li {
                display: flex;

                b {
                    display: inline-block;
                    width: 65px;
                    opacity: 0.8;
                }

                i {
                    display: inline-block;
                    width: calc(100% - 65px);
                    line-height: 1.2;
                }
            }
        }
    }

    .edit_review {
        position: fixed;
        right: 10px;
        bottom: 10px;
        width: 150px;
        height: 35px;
        background: #222;
        color: #fff;
    }

    &_review,
    &_review_edit {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: rgba($color: #000000, $alpha: 0.5);
        display: flex;
        align-items: center;
        justify-content: center;

        form {
            width: min(500px, 95%);
            aspect-ratio: 16/9;
            background: #eee;
            display: flex;
            flex-direction: column;

            h3 {
                text-align: center;
                padding: 10px 0;
                border-bottom: 1px solid #000;
                font-weight: 800;
                font-size: 18px;
            }

            dl {
                display: flex;
                dt {
                    width: 50px;
                    display: flex;
                    justify-content: center;
                    padding-top: 10px;
                    border-right: 1px solid #000;
                    border-bottom: 1px solid #000;
                }

                dd {
                    flex-grow: 1;
                    padding: 10px;
                    border-bottom: 1px solid #000;

                    input {
                        padding-left: 5px;
                        width: 100%;
                        border: 0;
                        background: 0;

                        &::-webkit-outer-spin-button,
                        &::-webkit-inner-spin-button {
                            -webkit-appearance: none;
                            margin: 0;
                        }

                        &:focus {
                            outline: none;
                        }
                    }

                    textarea {
                        width: 100%;
                        aspect-ratio: 3/1;
                        resize: none;
                        padding: 0 10px;
                        line-height: 1.5;
                        background-color: transparent;
                        color: #000;
                        border: 0;

                        &:focus {
                            outline: none;
                        }
                    }
                }
            }

            .btn_wrap {
                display: flex;
                justify-content: flex-end;
                flex-grow: 1;

                button {
                    width: 100px;
                    height: 100%;
                    border-left: 1px solid #000;

                    &.close {
                        //background: #f00;
                        &:hover {
                            background: #ff453a;
                        }
                    }
                    &.write {
                        &:hover {
                            background: #30d158;
                        }
                    }
                }
            }
        }
    }

    .history_back {
        height: 48px;
        position: absolute;
        left: 10px;
        top: 35px;
    }
}
</style>
