<template>
    <div class="monthly">
        <div class="monthly_inner" v-if="monthlyStatus === 0">
            <div class="monthly_book">
                <p>{{ currentMonthBook }}</p>

                <div class="monthly_book_wrap">
                    <div class="book_figure">
                        <figure>
                            <img :src="monthlyBook" alt="" ref="figure" />
                        </figure>
                    </div>

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
                                    <li><b>추천인 </b> {{ recommendUser }}</li>
                                    <li class="recommend_reason">
                                        <b>추천이유 </b>
                                        <i>{{ recommendReason }}</i>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <button class="view_review" @click="monthlyAnimationLeave">작성글보기→</button>
            <button class="write_review" @click="writeReview">리뷰 작성</button>
            <Transition name="opacity">
                <div class="monthly_review" v-if="reviewPopup">
                    <form action="">
                        <dl>
                            <dt>평점</dt>
                            <dd></dd>
                        </dl>

                        <dl>
                            <dt>리뷰</dt>
                            <dd><textarea name="" id=""></textarea></dd>
                        </dl>

                        <div class="btn_wrap">
                            <button class="close" @click="closeReview">닫기</button>
                            <button class="write">작성하기</button>
                        </div>
                    </form>
                </div>
            </Transition>
        </div>

        <div class="monthly_inner" v-if="monthlyStatus === 1">
            <div class="monthly_book">
                <p>GameInt 리뷰</p>
            </div>

            <div class="monthly_book_wrap">
                <div class="member_profile">
                    <ul>
                        <li v-for="(user, index) in userReviewWraps" :key="index" @click="selectUser(index)">
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
                </div>
            </div>

            <button class="history_back" @click="monthlyBack">←뒤로가기</button>
        </div>
    </div>
</template>

<script>
import { ref, computed, onMounted, watch, nextTick } from 'vue';
import axios from 'axios';
import { gsap } from 'gsap';
import { CSSPlugin } from 'gsap/CSSPlugin';
gsap.registerPlugin(CSSPlugin);

export default {
    name: 'MonthlyComp',

    setup() {
        const monthlyBook = ref('https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9791188331796.jpg');
        const currentMonthBook = computed(() => {
            const now = new Date();
            //const year = now.getFullYear();
            const month = now.getMonth() + 1;
            return `${month}월의 책`;
        });

        const data = ref('');
        const error = ref('');

        const bookName = ref('');
        const bookWriter = ref('');
        const publisher = ref('');
        const category = ref('');
        const recommendUser = ref('');
        const recommendReason = ref('');
        const reviewPopup = ref(false); //팝업 on/off
        const monthlyStatus = ref(0);
        const userReviewWraps = ref([
            {
                userName: '안승필',
                userProfile: require('@/assets/img/profile/profile_df.webp'),
                userReview: '세계정세가 급박하게 바뀌던 과거에 시대의 부조리와 불안감을  암울한 미래사회로 나타낸 작품입니다. 디스토피아를 다룬 많은 이야기에 영향을 주었던 작품입니다.현재 읽고 있는데 ',
                userPoint: 4,
            },
            {
                userName: '김효종',
                userProfile: require('@/assets/img/profile/profile_df.webp'),
                userReview: '세계정세가 급박하게 바뀌던 과거에 시대의 부조리와 불안감을  암울한 미래사회로 나타낸 작품입니다. 디스토피아를 다룬 많은 이야기에 영향을 주었던 작품입니다.현재 읽고 있는데 ',
                userPoint: 3,
            },
            {
                userName: '진기환',
                userProfile: require('@/assets/img/profile/profile_df.webp'),
                userReview: '세계정세가 급박하게 바뀌던 과거에 시대의 부조리와 불안감을  암울한 미래사회로 나타낸 작품입니다. 디스토피아를 다룬 많은 이야기에 영향을 주었던 작품입니다.현재 읽고 있는데 ',
                userPoint: 2,
            },
            {
                userName: '맹주영',
                userProfile: require('@/assets/img/profile/profile_df.webp'),
                userReview: '세계정세가 급박하게 바뀌던 과거에 시대의 부조리와 불안감을  암울한 미래사회로 나타낸 작품입니다. 디스토피아를 다룬 많은 이야기에 영향을 주었던 작품입니다.현재 읽고 있는데 ',
                userPoint: 1,
            },
            {
                userName: '안승필',
                userProfile: require('@/assets/img/profile/profile_df.webp'),
                userReview: '세계정세가 급박하게 바뀌던 과거에 시대의 부조리와 불안감을  암울한 미래사회로 나타낸 작품입니다. 디스토피아를 다룬 많은 이야기에 영향을 주었던 작품입니다.현재 읽고 있는데 ',
                userPoint: 4,
            },
            {
                userName: '김효종',
                userProfile: require('@/assets/img/profile/profile_df.webp'),
                userReview: '세계정세가 급박하게 바뀌던 과거에 시대의 부조리와 불안감을  암울한 미래사회로 나타낸 작품입니다. 디스토피아를 다룬 많은 이야기에 영향을 주었던 작품입니다.현재 읽고 있는데 ',
                userPoint: 3,
            },
            {
                userName: '진기환',
                userProfile: require('@/assets/img/profile/profile_df.webp'),
                userReview: '세계정세가 급박하게 바뀌던 과거에 시대의 부조리와 불안감을  암울한 미래사회로 나타낸 작품입니다. 디스토피아를 다룬 많은 이야기에 영향을 주었던 작품입니다.현재 읽고 있는데 ',
                userPoint: 2,
            },
            {
                userName: '맹주영',
                userProfile: require('@/assets/img/profile/profile_df.webp'),
                userReview:
                    '세계정세가 급박하게 바뀌던 과거에 시대의 부조리와 불안감을  암울한 미래사회로 나타낸 작품입니다. 디스토피아를 다룬 많은 이야기에 영향을 주었던 작품입니다.현재 읽고 있는데 세계정세가 급박하게 바뀌던 과거에 시대의 부조리와 불안감을  암울한 미래사회로 나타낸 작품입니다. 디스토피아를 다룬 많은 이야기에 영향을 주었던 작품입니다.현재 읽고 있는데 세계정세가 급박하게 바뀌던 과거에 시대의 부조리와 불안감을  암울한 미래사회로 나타낸 작품입니다. 디스토피아를 다룬 많은 이야기에 영향을 주었던 작품입니다.현재 읽고 있는데 ',
                userPoint: 1,
            },
        ]);
        const selectedIndex = ref(0);

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

        //데이터 여기에 넣으면 됩니당
        bookName.value = '심판';
        bookWriter.value = '베르베르';
        publisher.value = '열린책들';
        category.value = '희곡';
        recommendUser.value = '진기환';
        recommendReason.value = `계속 소설이 채택된다는 목소리가 나왔기에 다른 장르의 책을 추천해봅니다.읽은지 오래되어 자세히 기억이 나지는 않습니다만,뇌를 연구하는 물리학자 정재승이 인간의 뇌 구조를 기반으로 이런 저런 이야기를 적어놓은 책입니다.오늘 점심 뭐 먹지? 결정장애가 생기는 이유에서부터 사람이 미신에 빠져드는 이유까지흥미로운 주제를 한 사람의 주관이 아닌 인간의 뇌구조를 기반으로 설명해주니이런 장르에 관심이 없는 저도 굉장히 재밌게 읽을 수 있었습니다.계속 소설이 채택된다는 목소리가 나왔기에 다른 장르의 책을 추천해봅니다.읽은지 오래되어 자세히 기억이 나지는 않습니다만,뇌를 연구하는 물리학자 정재승이 인간의 뇌 구조를 기반으로 이런 저런 이야기를 적어놓은 책입니다.오늘 점심 뭐 먹지? 결정장애가 생기는 이유에서부터 사람이 미신에 빠져드는 이유까지흥미로운 주제를 한 사람의 주관이 아닌 인간의 뇌구조를 기반으로 설명해주니이런 장르에 관심이 없는 저도 굉장히 재밌게 읽을 수 있었습니다.계속 소설이 채택된다는 목소리가 나왔기에 다른 장르의 책을 추천해봅니다.읽은지 오래되어 자세히 기억이 나지는 않습니다만,뇌를 연구하는 물리학자 정재승이 인간의 뇌 구조를 기반으로 이런 저런 이야기를 적어놓은 책입니다.오늘 점심 뭐 먹지? 결정장애가 생기는 이유에서부터 사람이 미신에 빠져드는 이유까지흥미로운 주제를 한 사람의 주관이 아닌 인간의 뇌구조를 기반으로 설명해주니이런 장르에 관심이 없는 저도 굉장히 재밌게 읽을 수 있었습니다.계속 소설이 채택된다는 목소리가 나왔기에 다른 장르의 책을 추천해봅니다.읽은지 오래되어 자세히 기억이 나지는 않습니다만,뇌를 연구하는 물리학자 정재승이 인간의 뇌 구조를 기반으로 이런 저런 이야기를 적어놓은 책입니다.오늘 점심 뭐 먹지? 결정장애가 생기는 이유에서부터 사람이 미신에 빠져드는 이유까지흥미로운 주제를 한 사람의 주관이 아닌 인간의 뇌구조를 기반으로 설명해주니이런 장르에 관심이 없는 저도 굉장히 재밌게 읽을 수 있었습니다.`;

        const monthlyBookDetail = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/book/monthly/recommend/1');
                data.value = response.data;
                console.log(response.data);

                if (response.data.code === 1) {
                    console.log(response.data.data);
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

        const writeReview = () => {
            reviewPopup.value = true;
        };
        const closeReview = () => {
            event.preventDefault(); // 기본 동작 방지
            reviewPopup.value = false;
        };
        const viewReview = () => {
            monthlyStatus.value = 1;
        };

        const monthlyBack = () => {
            monthlyStatus.value = 0;
        };

        /* //////////////////////////////// */
        /* ///Monthly Component 애니메이션/// */
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

                        const profile = gsap.utils.toArray('.member_profile ul li');

                        console.log(profile);
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

        return {
            monthlyBook,
            currentMonthBook,
            bookName,
            bookWriter,
            publisher,
            category,
            recommendUser,
            recommendReason,
            reviewPopup,
            writeReview,
            closeReview,
            monthlyStatus,
            viewReview,
            userReviewWraps,
            monthlyBack,
            monthlyBookDetail,
            data,
            error,
            tabs,
            activeTab,
            selectUser,
            selectedUser,
            monthlyAnimation,
            monthlyAnimationLeave,
            monthlyAnimation2,
        };
    },
};
</script>

<style lang="scss" scoped>
.monthly {
    .gsap-text-ani {
        display: block;
    }

    background: #e4e6e7;
    height: 100%;
    overflow: auto;
    &_inner {
        box-sizing: border-box;
        width: 100%;
        overflow: auto;
        position: relative;
    }

    &_book {
        p {
            text-align: center;
            font-size: 22px;
            font-weight: 800;
            margin-top: 15px;
            padding-bottom: 15px;
            border-bottom: 1px solid #000;
        }
    }
    &_book_wrap {
        display: flex;
        border-bottom: 1px solid #000;
        height: 505px;

        .book_figure {
            width: 50%;
            border-right: 1px solid #000;
            figure {
                width: auto;
                height: 100%;
                margin: 0 auto;
                max-width: 55%;
                display: flex;
                justify-content: center;
                overflow: hidden;

                img {
                    object-fit: contain;
                    height: 100%;
                }
            }
        }

        .member_profile {
            width: 50%;
            border-right: 1px solid #000;
            padding: 15px;
            ul {
                display: flex;
                flex-wrap: wrap;
                gap: 20px;
                li {
                    width: calc((100% - (20px * 5)) / 6);
                    border-radius: 50%;
                    overflow: hidden;
                    cursor: pointer;
                    aspect-ratio: 1/1;
                    border: 1px solid #000;
                    box-shadow: 0 0 15px rgba($color: #000000, $alpha: 0.3);
                }
            }
        }
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
    &_book_info {
        width: 50%;
        height: 100%;
        overflow: auto;
        display: flex;
        flex-direction: column;

        .monthly_book_tab {
            width: 100%;
            display: flex;
            border-bottom: 1px solid #000;
            li {
                height: 32px;
                width: 110px;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                transition: all 0.1s;
                border-right: 1px solid #000;

                &.active,
                &:hover {
                    background: #000;
                    color: #fff;
                }
            }
        }

        .tab-content {
            display: flex;

            > div {
                width: 100%;
                b {
                    font-weight: 800;
                }
                h3 {
                    font-size: 45px;
                    font-weight: 800;
                    letter-spacing: -1px;
                    padding: 10px;
                    border-bottom: 1px solid #000;
                    overflow: hidden;
                }
                h4 {
                    padding: 10px;
                    overflow: hidden;
                }

                ul {
                    li {
                        overflow: hidden;
                        max-width: 100%;
                        padding: 10px;
                        border-bottom: 1px solid #000;
                        &.recommend_reason {
                            border-bottom: 0;

                            i {
                                line-height: 1.5;
                            }

                            p {
                                line-height: 1.5;
                                margin-top: 15px;
                                width: 80%;
                            }
                        }
                    }
                }
            }
        }
    }

    .view_review {
        position: absolute;
        right: 10px;
        top: 10px;
    }

    .write_review {
        position: fixed;
        right: 10px;
        bottom: 10px;
        width: 150px;
        height: 35px;
        background: #222;
        color: #fff;
    }

    &_review {
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
            background: #fff;
            padding: 10px;
            padding-top: 35px;
            display: flex;
            flex-direction: column;
            gap: 15px;
            dl {
                display: flex;
                dt {
                    width: 50px;
                }

                dd {
                    flex-grow: 1;
                    textarea {
                        width: 100%;
                        aspect-ratio: 3/1;
                        resize: none;
                        padding: 10px;
                        line-height: 1.5;
                    }
                }
            }

            .btn_wrap {
                margin-top: auto;
                margin-left: auto;
                display: flex;
                gap: 10px;

                button {
                    width: 100px;
                    height: 30px;
                    color: #fff;

                    &.close {
                        background: #f00;
                    }
                    &.write {
                        background: #00f;
                    }
                }
            }
        }
    }

    .history_back {
        position: absolute;
        left: 10px;
        top: 10px;
    }
}
.opacity-enter-active,
.opacity-leave-active {
    transition: opacity 0.3s ease;
    /* transform-origin: center bottom; */
}

.opacity-enter-from,
.opacity-leave-to {
    opacity: 0;

    /* transform-origin: center bottom; */
}
</style>
