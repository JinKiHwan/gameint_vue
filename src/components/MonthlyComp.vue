<template>
    <div class="monthly">
        <div class="monthly_inner" v-if="monthlyStatus === 0">
            <div class="monthly_book">
                <div class="monthly_book_wrap">
                    <div class="monthly_book_bg"><img :src="monthlyBook" alt="" /></div>

                    <figure class="monthly_book_img">
                        <img :src="monthlyBook" alt="" />
                        <figcaption><i></i><span></span></figcaption>
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
                                        <span class="gsap-text-ani"><b>작가</b>{{ bookWriter }}</span>
                                    </li>
                                    <li>
                                        <span class="gsap-text-ani"><b>출판사</b>{{ publisher }}</span>
                                    </li>
                                    <li>
                                        <span class="gsap-text-ani"><b>카테고리</b>{{ category }}</span>
                                    </li>
                                </ul>
                            </div>

                            <div v-else-if="activeTab === 'recommend'">
                                <ul>
                                    <li>
                                        <span class="gsap-text-ani"><b>추천인</b>{{ recommendUser }}님</span>
                                    </li>
                                    <li class="recommend_reason">
                                        <span class="gsap-text-ani">
                                            <b>추천이유 </b>
                                            <i v-html="recommendReason"></i>
                                        </span>
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
                    <button class="view_review" @click="monthlyAnimationLeave"><img :src="menuImg[0].img" alt="" /></button>
                    <button class="write_review" @click="writeReview()">
                        <img :src="menuImg[1].img" alt="" />
                    </button>
                </div>
            </div>

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
            <div class="monthly_book_bg" style="filter: blur(10px) brightness(0.5)"><img :src="monthlyBook" alt="" /></div>
            <div class="monthly_book_review">
                <Flicking :options="{ circular: false, horizontal: true, adaptive: false }" :plugins="plugins" @ready="updateTransform">
                    <div class="card-panel" v-for="(member, index) in userReviewWraps" :key="index">
                        <div class="review_text">
                            <div class="review_text_wrap" v-if="userStore.isLogin">
                                {{ member.evaluateContents }}
                            </div>
                            <div class="review_text_wrap blur" v-else></div>
                        </div>
                        <div class="review_user">
                            <div class="profile">
                                <figure>
                                    <img :src="member.profileImg" alt="" />
                                </figure>
                                <p>{{ member.name }} 님</p>
                            </div>

                            <b>{{ member.evaluateStar }}점</b>
                        </div>

                        <button v-if="member.name == userStore.name" class="edit_review" @click="editReview(member)">수정</button>
                    </div>
                </Flicking>
            </div>

            <button class="history_back" @click="monthlyAnimation2Leave">
                <img :src="menuImg[2].img" alt="" />
            </button>
            <button class="review_copy" @click="reviewCopy">
                <img :src="menuImg[3].img" alt="" />
            </button>

            <div class="monthly_review_edit" v-if="reviewEditPopup">
                <form action="">
                    <h3>리뷰 수정</h3>
                    <dl>
                        <dt>평점</dt>
                        <dd><input type="number" max="5" min="1" v-model.number="editPoint" step="0.01" /></dd>
                    </dl>

                    <dl>
                        <dt>리뷰</dt>
                        <dd><textarea name="" id="" placeholder="책을 읽고 느낀점을 자유롭게 적어주세요" v-model.number="editText"></textarea></dd>
                    </dl>

                    <div class="btn_wrap">
                        <button class="close" @click="closeEditReview">닫기</button>
                        <button class="write" @click="editReviewConfirm">수정하기</button>
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
import { TextPlugin } from 'gsap/TextPlugin';
gsap.registerPlugin(TextPlugin);

import Flicking from '@egjs/vue3-flicking';
import { Perspective } from '@egjs/flicking-plugins';
import '@/assets/css/monthlyFlicking.css';

import { useUserStore } from '@/store/user';

export default {
    name: 'MonthlyComp',
    components: {
        Flicking: Flicking,
    },
    setup() {
        //const apiUrl = process.env.VUE_APP_API_URL;
        const userStore = useUserStore();
        const monthlyBook = ref('');
        const currentMonthBook = computed(() => {
            const now = new Date();
            //const year = now.getFullYear();
            const month = now.getMonth() + 1;
            return `${month} 월의 책`;
        });

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
        const menuImg = ref([{ img: require('@/assets/img/ico-view.webp') }, { img: require('@/assets/img/ico-write.webp') }, { img: require('@/assets/img/ico-back.webp') }, { img: require('@/assets/img/ico-copy.webp') }]);
        const defaultProfileUrl = require('@/assets/img/profile/profile_df.webp'); // 기본 프로필 이미지 경로

        const reviewPoint = ref(null);
        const userReviewWraps = ref(null);
        const selectedIndex = ref(0);
        const value = ref(null);
        const reviewContents = ref('');
        const editPoint = ref(null);
        const editText = ref(null);
        const editReviewIdx = ref(null);
        const editBookIdx = ref(null);
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
                const response = await axios.get('http://www.gameint.site/api/book/monthly/this-month', { withCredentials: true });

                console.log(response.data.data);

                if (response.data.code === 1) {
                    bookIdx.value = response.data.data.bookIdx;
                    bookName.value = response.data.data.bookTitle; //책제목
                    category.value = response.data.data.bookCategory; //카테고리
                    publisher.value = response.data.data.bookPublisher; //출판사
                    bookWriter.value = response.data.data.author; //작가명
                    recommendUser.value = response.data.data.memberName; //추천인
                    recommendReason.value = response.data.data.recommendReason; //추천이유
                    monthlyBook.value = response.data.data.bookImgUrl;
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

            /* console.log('별점:', value.value);
            console.log('리뷰 내용:', reviewContents.value); */

            if (!value.value || !reviewContents.value) {
                alert('빈 값은 보낼 수 없습니다.');
            } else {
                try {
                    const reviewData = {
                        contents: reviewContents.value,
                        star: value.value,
                    };

                    const response = await axios.post(
                        `http://www.gameint.site/api/book/monthly/${bookIdx.value}/evaluate`,
                        {
                            reviewData, // 쿠키를 주고받을 수 있게 설정
                        },
                        { withCredentials: true }
                    );

                    switch (response.data.code) {
                        case 1:
                            //console.log('평가 성공:', response.data.message);
                            alert('작성완료!');
                            reviewPopup.value = false;
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
        /* //MonthlyBook 리뷰 받아오기////// */
        /* /////////////////////////////// */
        const monthlyBookReviewWrap = async () => {
            try {
                const response = await axios.get(`http://www.gameint.site/api/book/monthly/${bookIdx.value}/evaluate/list`, { withCredentials: true });

                console.log(response, '리스폰');

                if (response.data.code === 1) {
                    userReviewWraps.value = response.data.data;
                    console.log(userReviewWraps.value);

                    userReviewWraps.value = response.data.data.map((user) => ({
                        ...user,
                        // profile: user.profile || defaultProfileUrl,
                    }));
                } else if (response.data.code === -1) {
                    // 리뷰가 비어있는 경우
                    error.value = '리뷰가 없어요';
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
        /* //리뷰작성 & 수정하기 팝업 On&Off/// */
        /* /////////////////////////////// */
        const writeReview = () => {
            if (!userStore.isLogin) {
                alert('로그인이 필요한 컨텐츠입니다');
                return;
            } else {
                reviewPopup.value = true;
            }
        };
        const closeReview = () => {
            event.preventDefault(); // 기본 동작 방지
            reviewPopup.value = false;
        };
        const editReview = (member) => {
            reviewEditPopup.value = true;
            console.log();

            editPoint.value = member.evaluateStar;
            editText.value = member.evaluateContents;
            editReviewIdx.value = member.bookEvaluationIdx;
            editBookIdx.value = bookIdx.value;
        };

        const editReviewConfirm = async () => {
            event.preventDefault(); // 기본 동작 방지

            try {
                const response = await axios.post(
                    'http://www.gameint.site/api/book/monthly/evaluate/update',
                    {
                        bookEvaluationIdx: editReviewIdx.value,
                        bookIdx: bookIdx.value,
                        contents: editText.value,
                        star: editPoint.value,
                    },
                    { withCredentials: true }
                );

                switch (response.data.code) {
                    case 1:
                        console.log('평가 성공:', response.data.message);
                        //alert('작성완료!');

                        break;
                    case -1:
                        console.log('code -1');

                        break;
                    case -2:
                        console.log('code -2');
                        break;
                    case -99:
                        console.log('code -99');
                        break;
                    default:
                        console.log('알 수 없는 오류 발생:', response.data);
                    // 예상치 못한 응답에 대한 처리
                }
            } catch (error) {
                console.error('Error uploading file:', error);
            }
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
            const menu = document.querySelector('.monthly_book_btn_wrap > a');
            const menuHamburger = gsap.utils.toArray('.monthly_book_btn_wrap > a > span');
            const menuX = gsap.utils.toArray('.monthly_book_btn_wrap > a > i');
            const viewReview = document.querySelector('.view_review');
            const writeReview = document.querySelector('.write_review');
            gsap.set([viewReview, writeReview], {
                opacity: 0,
            });
            gsap.set(menu, {
                //backgroundPosition: 'bottom 0 center',
                backgroundColor: '#30d158',
            });
            timeline
                .to(menuHamburger, {
                    scale: 0,
                })
                .to(
                    menu,
                    {
                        duration: 1,
                        //backgroundPosition: 'bottom -25px center',
                        ease: 'none',
                        backgroundColor: '#ff9f0a',
                    },
                    '<'
                )
                .to(
                    viewReview,
                    {
                        delay: 0.3,
                        x: -60,
                        opacity: 1,
                    },
                    '<'
                )
                .to(
                    writeReview,
                    {
                        x: -30,
                        y: -60,
                        delay: 0.1,
                        opacity: 1,
                    },
                    '<'
                )
                .to(menuX, {
                    width: '50%',
                    //opacity: 1,
                    //scale: 1,
                })
                .to(menuX, {
                    rotate: gsap.utils.wrap([45, -45]),
                });
        };

        const menuClose = (timeline) => {
            const menu = document.querySelector('.monthly_book_btn_wrap > a');
            const menuHamburger = gsap.utils.toArray('.monthly_book_btn_wrap > a > span');
            const menuX = gsap.utils.toArray('.monthly_book_btn_wrap > a > i');
            const viewReview = document.querySelector('.view_review');
            const writeReview = document.querySelector('.write_review');

            timeline
                .to(menuX, {
                    rotate: 0,
                })
                .to(
                    menu,
                    {
                        duration: 1,
                        //backgroundPosition: 'bottom -25px center',
                        ease: 'none',
                        backgroundColor: '#30d158',
                    },
                    '<'
                )
                .to(
                    viewReview,
                    {
                        x: 0,
                        ease: 'back.in(1.7)',
                        opacity: 0,
                    },
                    '<'
                )
                .to(
                    writeReview,
                    {
                        delay: 0.1,
                        x: 0,
                        y: 0,
                        opacity: 0,
                        ease: 'back.in(1.7)',
                    },
                    '<'
                )
                .to(menuX, {
                    width: 0,
                    //opacity: 0,
                    //scale: 0,
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
            const bg = document.querySelector('.monthly_book_bg');
            const bookImg = document.querySelector('.monthly_book_img');
            const tabMenu = gsap.utils.toArray('.monthly_book_tab');
            const bookInfo = gsap.utils.toArray('.gsap-text-ani');
            const figcaption = document.querySelector('.monthly_book_img figcaption i');

            gsap.timeline()
                .to(bg, {
                    filter: 'blur(15px) brightness(0.5)',
                })
                .from(bookImg, {
                    y: 50,
                    opacity: 0,
                })
                .from(
                    tabMenu,
                    {
                        delay: 0.1,
                        opacity: 0,
                        y: 50,
                    },
                    '<'
                )
                .from(bookInfo, {
                    opacity: 0,
                    x: 50,
                    stagger: {
                        each: 0.3,
                        amount: 0.3,
                    },
                })
                .to(
                    bookImg,
                    {
                        boxShadow: '0 0 15px rgba(255,255,255,1)',
                    },
                    '<'
                )
                .to(figcaption, {
                    text: `${currentMonthBook.value}`,
                    duration: 1,
                });
        };

        const monthlyAnimationLeave = () => {
            const bg = document.querySelector('.monthly_book_bg');
            const bookImg = document.querySelector('.monthly_book_img');
            const tabMenu = gsap.utils.toArray('.monthly_book_tab');
            const bookInfo = gsap.utils.toArray('.gsap-text-ani');

            gsap.timeline()
                .to([bookImg, tabMenu, bookInfo], { opacity: 0, stagger: { each: 0.3, amount: 0.5 } })
                .to(
                    bg,
                    {
                        delay: 0.5,
                        filter: 'blur(5px) brightness(0)',
                        onComplete: () => {
                            monthlyStatus.value = 1;
                            menuStatus.value = false;
                            monthlyBookReviewWrap();
                        },
                    },
                    '<'
                );
        };

        const monthlyAnimation2 = () => {
            const reviews = gsap.utils.toArray('.card-panel');
            const bg = document.querySelector('.monthly_book_bg');

            gsap.timeline()
                .from(bg, {
                    filter: 'blur(5px) brightness(0)',
                })
                .from(reviews, {
                    opacity: 0,
                    stagger: {
                        each: 0.1,
                    },
                });
        };

        const monthlyAnimation2Leave = () => {
            const reviews = gsap.utils.toArray('.card-panel');
            const bg = document.querySelector('.monthly_book_bg');

            gsap.timeline()
                .to(reviews, { opacity: 0, scale: 0 })
                .to(bg, {
                    filter: 'blur(5px) brightness(0)',

                    onComplete: () => {
                        monthlyStatus.value = 0;
                    },
                });
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
        watch(editPoint, (newValue) => {
            if (newValue > 5) {
                editPoint.value = 5;
            }
            // 소수점 둘째자리까지 반올림하고 다시 숫자로 변환
            editPoint.value = Number(Number(editPoint.value).toFixed(2));
        });

        /* /////////////////////////////////*/
        /* ///리뷰 복사하기//////////////////*/
        /* ///////////////////////////////*/
        const reviewCopy = () => {
            if (userStore.isLogin === false) {
                alert('회원만 이용 가능한 기능입니다.');
                return;
            }

            const formattedReviews = userReviewWraps.value.map((review) => `${review.name}\n평점:${review.evaluateStar} \n${review.evaluateContents}`).join('\n\n');

            if (navigator.clipboard) {
                navigator.clipboard
                    .writeText(formattedReviews)
                    .then(() => {
                        alert('클립보드에 복사되었습니다');
                    })
                    .catch((err) => {
                        console.error('클립보드 복사 실패', err);
                        fallbackCopyToClipboard(formattedReviews);
                    });
            } else {
                fallbackCopyToClipboard(formattedReviews);
            }
        };

        const fallbackCopyToClipboard = (text) => {
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            alert('클립보드에 복사되었습니다');
        };

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
            monthlyBookReviewWrap,
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
            editReviewConfirm,
            closeEditReview,
            bookIdx,
            menuOpen,
            menuClose,
            menuStatus,
            menuStatusChange,
            menuImg,
            plugins: [new Perspective({ rotate: 0.5 })],
            reviewCopy,
            defaultProfileUrl,
            reviewPoint,
            editPoint,
            editText,
            editReviewIdx,
            editBookIdx,
        };
    },

    methods: {
        updateTransform: (e) => {
            e;
            //console.log(e.currentTarget.panels);
            /* e.currentTarget.panels.forEach((panel, index) => {
                console.log(e, index);

            }); */
        },
    },
};
</script>

<style lang="scss" scoped>
@font-face {
    font-family: 'Bujangnim_nunchi';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/naverfont_02@1.0/Bujangnim_nunchi.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}

.flicking-viewport {
    height: 70%;
}
.card-panel {
    font-size: 26px;
    width: 350px;
    aspect-ratio: 6/5;
    border: 3px solid #fff;
    box-shadow: 0 0 15px rgba($color: #000000, $alpha: 0.5);
    position: relative;

    .review_text {
        width: 100%;
        height: 70%;
        overflow: auto;
        font-family: 'Bujangnim_nunchi';

        &::-webkit-scrollbar {
            width: 2px; /* 스크롤바의 너비 */
        }

        &::-webkit-scrollbar-thumb {
            background: #41b883;
            border-radius: 10px;
        }

        &::-webkit-scrollbar-track {
            background: rgba(33, 122, 244, 0.1); /*스크롤바 뒷 배경 색상*/
        }

        .review_text_wrap {
            min-height: 100%;
            background-image: url('/src/assets/img/texture.webp');
            background-repeat: no-repeat;
            background-size: cover;
            background-position: center center;
            padding: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;

            &.blur {
                background-image: url('/src/assets/img/review_blur.webp');
            }
        }
    }

    .review_user {
        height: 30%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: #fff;
        padding: 10px;
        font-family: 'Bujangnim_nunchi';

        .profile {
            display: flex;
            height: 100%;
            align-items: center;
            gap: 10px;

            figure {
                height: 100%;
                overflow: hidden;
                border-radius: 50%;
                aspect-ratio: 1/1;
                border: 1px solid #222;

                img {
                    height: 100%;
                    object-fit: cover;
                }
            }
        }
    }

    .edit_review {
        position: absolute;
        right: -3px;
        bottom: -45px;
        padding: 8px 15px;
        font-size: 15px;
        background: #ff9f0a;
        color: #fff;
        border-radius: 5px;
    }
}

.monthly {
    position: relative;
    height: 100%;
    overflow: auto;

    .gsap-text-ani {
        display: flex;
        width: 100%;
    }
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
            filter: blur(15px) brightness(0);
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
            justify-content: flex-end;
            align-items: flex-start;
            height: 70%;
            gap: 25px;
            padding: 0 50px;

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
                //box-shadow: 0 0 15px rgba($color: #fff, $alpha: 1);
            }

            figcaption {
                position: absolute;
                font-size: 15px;
                width: 18px;
                left: -26px;
                top: 0;
                writing-mode: vertical-rl;
                text-orientation: upright;
                color: #eee;

                span {
                    width: 100%;
                    height: 1px;
                    background: #fff;
                    display: inline-block;
                    margin-top: 5px;
                    animation: cursor 1s infinite;
                    animation-timing-function: steps(1, end);
                }
            }
        }

        &_info {
            width: 50%;
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
                background: #30d158;
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
                    height: 2px;
                    background: #fff;
                    width: 0;

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
                padding: 5px;
                background: #41b883;
                opacity: 0;
                position: absolute;
                left: 0;
                top: 0;
                z-index: -1;
                transition: box-shadow 0.3s;

                &:hover {
                    box-shadow: 0 0 15px rgba($color: #fff, $alpha: 0.3);
                }
            }
            .write_review {
                background: #35495e;
            }
        }

        &_review {
            height: 100%;
            display: flex;
            align-items: center;
        }
    }
    .history_back {
        position: fixed;
        left: 25px;
        bottom: 25px;
        width: 50px;
        aspect-ratio: 1/1;
        background: #35495e;
        border-radius: 50%;
        padding: 5px;

        &:hover {
            -webkit-animation: vibrate-1 0.3s linear infinite both;
            animation: vibrate-1 0.3s linear infinite both;
        }
    }

    .review_copy {
        position: fixed;
        right: 25px;
        bottom: 25px;
        width: 50px;
        aspect-ratio: 1/1;
        background: #41b883;
        border-radius: 50%;
        padding: 5px;
        transition: transform 0.3s, box-shadow 0.3s;

        &:hover {
            transform: scale(1.05);
            box-shadow: 0 0 15px rgba($color: #fff, $alpha: 0.3);
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
                    width: 80px;
                    opacity: 0.8;
                }

                i {
                    display: inline-block;
                    width: calc(100% - 80px);
                    line-height: 1.2;
                }
            }
        }
    }

    &_review,
    &_review_edit {
        z-index: 9;
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
}
</style>
