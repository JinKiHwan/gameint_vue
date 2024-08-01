<template>
    <div class="monthly">
        <div class="monthly_inner" v-if="monthlyStatus === 0">
            <div class="monthly_book_img">
                <p>{{ currentMonthBook }}</p>
                <figure>
                    <img :src="monthlyBook" alt="" />
                </figure>
            </div>

            <div class="monthly_book_info">
                <dl>
                    <dt>책 제목</dt>
                    <dd>{{ bookName }}</dd>
                </dl>

                <dl>
                    <dt>출판사</dt>
                    <dd>{{ publisher }}</dd>
                </dl>

                <dl>
                    <dt>카테고리</dt>
                    <dd>{{ category }}</dd>
                </dl>

                <dl>
                    <dt>추천인</dt>
                    <dd>{{ recommendUser }}</dd>
                </dl>

                <dl>
                    <dt>추천이유</dt>
                    <dd>{{ recommendReason }}</dd>
                </dl>
            </div>

            <button class="view_review" @click="viewReview">작성글보기→</button>
            <button class="write_review" @click="writeReview">리뷰 작성하기</button>
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
            <div class="monthly_book_img">
                <p>{{ currentMonthBook }}</p>
                <figure>
                    <img :src="monthlyBook" alt="" />
                </figure>
            </div>

            <div class="monthly_book_reviews">
                <div class=""></div>
                <ul class="review_item">
                    <li v-for="(review, index) in userReviewWraps" :key="index">
                        <div class="user_profile">
                            <figure>
                                <img :src="review.userProfile" :alt="review.userName" />
                            </figure>

                            <span>{{ review.userName }}</span>
                        </div>
                        <div class="user_review">
                            <p>{{ review.userReview }}</p>
                        </div>
                        <div class="user_point">{{ review.userPoint }}</div>
                    </li>
                </ul>
            </div>

            <button class="history_back" @click="monthlyBack">←뒤로가기</button>
        </div>
    </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';

export default {
    name: 'MonthlyComp',

    setup() {
        const monthlyBook = ref(require('@/assets/img/book01.webp'));
        const currentMonthBook = computed(() => {
            const now = new Date();
            const year = now.getFullYear();
            const month = now.getMonth() + 1;
            return `${year}년 ${month}월의 책`;
        });

        const bookName = ref('');
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

        //데이터 여기에 넣으면 됩니당
        bookName.value = '심판';
        publisher.value = '열린책들';
        category.value = '희곡';
        recommendUser.value = '진기환';
        recommendReason.value = `계속 소설이 채택된다는 목소리가 나왔기에 다른 장르의 책을 추천해봅니다.읽은지 오래되어 자세히 기억이 나지는 않습니다만,뇌를 연구하는 물리학자 정재승이 인간의 뇌 구조를 기반으로 이런 저런 이야기를 적어놓은 책입니다.오늘 점심 뭐 먹지? 결정장애가 생기는 이유에서부터 사람이 미신에 빠져드는 이유까지흥미로운 주제를 한 사람의 주관이 아닌 인간의 뇌구조를 기반으로 설명해주니이런 장르에 관심이 없는 저도 굉장히 재밌게 읽을 수 있었습니다.계속 소설이 채택된다는 목소리가 나왔기에 다른 장르의 책을 추천해봅니다.읽은지 오래되어 자세히 기억이 나지는 않습니다만,뇌를 연구하는 물리학자 정재승이 인간의 뇌 구조를 기반으로 이런 저런 이야기를 적어놓은 책입니다.오늘 점심 뭐 먹지? 결정장애가 생기는 이유에서부터 사람이 미신에 빠져드는 이유까지흥미로운 주제를 한 사람의 주관이 아닌 인간의 뇌구조를 기반으로 설명해주니이런 장르에 관심이 없는 저도 굉장히 재밌게 읽을 수 있었습니다.계속 소설이 채택된다는 목소리가 나왔기에 다른 장르의 책을 추천해봅니다.읽은지 오래되어 자세히 기억이 나지는 않습니다만,뇌를 연구하는 물리학자 정재승이 인간의 뇌 구조를 기반으로 이런 저런 이야기를 적어놓은 책입니다.오늘 점심 뭐 먹지? 결정장애가 생기는 이유에서부터 사람이 미신에 빠져드는 이유까지흥미로운 주제를 한 사람의 주관이 아닌 인간의 뇌구조를 기반으로 설명해주니이런 장르에 관심이 없는 저도 굉장히 재밌게 읽을 수 있었습니다.계속 소설이 채택된다는 목소리가 나왔기에 다른 장르의 책을 추천해봅니다.읽은지 오래되어 자세히 기억이 나지는 않습니다만,뇌를 연구하는 물리학자 정재승이 인간의 뇌 구조를 기반으로 이런 저런 이야기를 적어놓은 책입니다.오늘 점심 뭐 먹지? 결정장애가 생기는 이유에서부터 사람이 미신에 빠져드는 이유까지흥미로운 주제를 한 사람의 주관이 아닌 인간의 뇌구조를 기반으로 설명해주니이런 장르에 관심이 없는 저도 굉장히 재밌게 읽을 수 있었습니다.`;

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

        onMounted(() => {
            monthlyStatus.value = 0; //초기 화면 값
        });

        return {
            monthlyBook,
            currentMonthBook,
            bookName,
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
        };
    },
};
</script>

<style lang="scss" scoped>
.monthly {
    height: 100%;
    &_inner {
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        overflow: auto;
        display: flex;
        justify-content: center;
        position: relative;
        padding: 10px;
        gap: 20px;
    }

    &_book_img {
        max-width: 45%;
        p {
            text-align: center;
            font-size: 18px;
            margin-block: 10px;
        }
        figure {
            height: 90%;
            display: flex;
            justify-content: center;
            align-items: center;
            img {
                object-fit: contain;
                height: 100%;
            }
        }
    }
    &_book_info {
        max-width: 40%;
        height: 100%;
        overflow: auto;
        display: flex;
        flex-direction: column;
        gap: 15px;
        padding-top: 40px;
        dl {
            display: flex;
            font-size: 18px;
            font-weight: 600;
            line-height: 1.3;

            dt {
                width: 100px;
            }

            dd {
                width: calc(100% - 100px);
                white-space: pre-wrap;
                position: relative;

                &::before {
                    content: ':';
                    position: absolute;
                    left: -10px;
                    top: 0;
                }
            }

            &:last-child {
                dd {
                    font-weight: 400;
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
        position: absolute;
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

    &_book_reviews {
        width: min(650px, 45%);

        .review_item {
            display: flex;
            flex-direction: column;
            gap: 30px;
            padding-top: 30px;
            height: 100%;
            overflow: auto;

            li {
                display: flex;
                align-items: flex-start;
                gap: 15px;

                .user_profile {
                    position: relative;
                    border-radius: 50%;
                    overflow: hidden;
                    figure {
                        width: 100px;
                        aspect-ratio: 1/1;
                        border-radius: 50%;
                        overflow: hidden;
                    }

                    span {
                        position: absolute;
                        left: 0;
                        top: 0;
                        width: 100%;
                        height: 100%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        background: #000;
                        opacity: 0;
                        color: #fff;
                    }

                    &:hover {
                        span {
                            opacity: 1;
                        }
                    }
                }

                .user_review {
                    width: 70%;
                    line-height: 1.3;
                }
                .user_point {
                    flex-grow: 1;
                    text-align: center;
                    align-self: center;
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
