<template>
    <div class="historyComp">
        <section class="history_book_list" v-if="historyStatus === 0">
            <div class="historyComp_inner">
                <div v-for="year in years" :key="year">
                    <article>
                        <h3>{{ year }}</h3>
                        <div class="second" v-if="getBooksByYearAndHalf(year, 'second').length > 0">
                            <ul>
                                <li v-for="book in getBooksByYearAndHalf(year, 'second')" :key="book.month" @click="historyBookSelect(book.bookIdx)">
                                    <img :src="book.bookImage" :alt="book.selectedMonth" />
                                </li>
                            </ul>
                        </div>
                        <div class="first" v-if="getBooksByYearAndHalf(year, 'first').length > 0">
                            <ul>
                                <li v-for="book in getBooksByYearAndHalf(year, 'first')" :key="book.month" @click="historyBookSelect(book.bookIdx)">
                                    <img :src="book.bookImage" :alt="book.selectedMonth" />
                                </li>
                            </ul>
                        </div>
                    </article>
                </div>
            </div>
        </section>

        <section class="history_book_selected" v-if="historyStatus === 1">
            <div class="historyBg"><img :src="selectedBook?.bookImage" :alt="selectedBook?.selectedMonth" /></div>
            <div class="historyComp_inner">
                <div class="history_book_selected_wrap">
                    <figure>
                        <div>
                            <img :src="selectedBook?.bookImage" :alt="selectedBook?.selectedMonth" />
                        </div>
                    </figure>

                    <ul class="history_book_selected_review">
                        <li v-for="(review, index) in selectedBookReview" :key="index">
                            <div class="review_text">
                                <div class="review_text_wrap">
                                    {{ review.evaluateContents }}
                                </div>
                            </div>
                            <div class="review_user">
                                <div class="profile">
                                    <figure>
                                        <img :src="review.profileImg" alt="" />
                                    </figure>
                                    <p>{{ review.name }} 님</p>
                                </div>

                                <b>{{ review.evaluateStar }}점</b>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

            <button class="history_back" @click="historyBack">
                <img :src="menuImg[0].img" alt="" />
            </button>
            <button class="history_next" @click="historyNext">
                <img :src="menuImg[1].img" alt="" />
            </button>
        </section>

        <section class="history_book_past_list" v-if="historyStatus === 2">
            <div class="historyComp_inner">
                <ul>
                    <li v-for="(books, index) in selectedBookOthers" :key="index" @click="historyBookListComment(books.bookIdx)">
                        <div class="book_image">
                            <figure class=""><img :src="books.imgUrl" alt="" /></figure>

                            <figure class="profile"><img :src="books.profileImg" alt="" /></figure>
                        </div>
                        <dl>
                            <dt>{{ books.title }}</dt>
                            <dd>{{ books.author }} | {{ books.bookPublisher }}</dd>
                        </dl>
                    </li>
                </ul>
            </div>
            <button class="history_back" @click="historyBack">
                <img :src="menuImg[0].img" alt="" />
            </button>
        </section>

        <section class="history_book_past_list_detail" v-if="historyStatus === 3">
            <figure class="historyBg">
                <img :src="selectedBookOthersBookData.bookImage" alt="" />
            </figure>
            <div class="historyComp_inner">
                <figure class="bookImg">
                    <div>
                        <img :src="selectedBookOthersBookData.bookImage" alt="" />
                    </div>
                </figure>

                <div>
                    <div class="recommender">
                        <figure><img :src="selectedBookOthersBookData.memberImage" alt="" /></figure>
                        <p>
                            {{ selectedBookOthersBookData.recommendReason }}
                        </p>
                    </div>
                    <hr />
                    <b>댓글 {{ selectedBookOthersBookData.commentCount }}</b>
                    <ul class="history_book_selected_comment">
                        <li v-for="(comment, index) in selectedBookOthersComment" :key="index">
                            <figure>
                                <img :src="comment.memberImage" />
                            </figure>

                            <p>
                                {{ comment.contents }}
                            </p>
                        </li>
                    </ul>
                </div>
            </div>
            <button class="history_back" @click="historyBack">
                <img :src="menuImg[0].img" alt="" />
            </button>
        </section>
    </div>
</template>

<script>
import axios from 'axios';
import { ref, onMounted, computed } from 'vue';

export default {
    name: 'HistoryCompComp',

    setup() {
        const bookList = ref([]);
        const historyStatus = ref(0);
        const menuImg = ref([{ img: require('@/assets/img/ico-back.webp') }, { img: require('@/assets/img/ico-book.webp') }]);
        const selectedBook = ref(null);
        const selectedBookReview = ref(null);
        const selectedBookUpdate = ref(null);
        const selectedBookOthers = ref([]);
        const selectedBookOthersBookData = ref(null);
        const selectedBookOthersComment = ref([]);

        /* //////////////////////////////// */
        /* ///History 스테이터스 변경 ////// */
        /* ////////////////////////////// */
        const historyBookSelect = async (idx) => {
            try {
                //console.log(idx);
                const response = await axios.get(`http://localhost:3000/api/book/monthly/recommend/${idx}`, { withCredentials: true });
                if (response.data.code === 1) {
                    selectedBook.value = response.data.data.bookData;
                    historyBookSelectReview(idx);
                    historyStatus.value = 1;
                    selectedBookUpdate.value = response.data.data.bookData.updDate;

                    console.log('통신성공');
                } else if (response.data.code === -1) {
                    console.log('통신실패 -1');
                } else if (response.data.code === -2) {
                    console.log('통신실패 -2');
                } else {
                    // 기타 오류
                    console.log('통신실패 etc');
                }
            } catch (err) {
                console.log('서버오류');
            }
        };

        const historyBack = () => {
            historyStatus.value -= 1;
        };

        /* //////////////////////////////// */
        /* ///해당 달에 추천된 책 조회///////// */
        /* ////////////////////////////// */
        const historyNext = async () => {
            //console.log(selectedBookUpdate.value);

            try {
                const response = await axios.get(`http://localhost:3000/api/book/last/recommend/list?updDate=${selectedBookUpdate.value}`, { withCredentials: true });
                if (response.data.code === 1) {
                    selectedBookOthers.value = response.data.data;

                    console.log(selectedBookOthers.value, '추천된 책 조회');

                    console.log('통신성공');
                    historyStatus.value = 2;
                } else if (response.data.code === -1) {
                    console.log('통신실패 -1');
                } else if (response.data.code === -2) {
                    console.log('통신실패 -2');
                } else {
                    // 기타 오류
                    console.log('통신실패 etc');
                }
            } catch (err) {
                console.log('서버오류');
            }
        };

        /* //////////////////////////////// */
        /* ///History 셀렉트 리뷰 조회////// */
        /* ////////////////////////////// */
        const historyBookSelectReview = async (idx) => {
            try {
                const response = await axios.get(`http://localhost:3000/api/book/monthly/${idx}/evaluate/list`, { withCredentials: true });

                if (response.data.code === 1) {
                    // 모든 데이터의 profileImg 처리
                    //console.log(response.data.data);

                    selectedBookReview.value = response.data.data.map((item) => {
                        if (item.profileImg == null) {
                            item.profileImg = require('@/assets/img/profile/profile_df.webp');
                        }
                        return item;
                    });

                    console.log('통신성공');
                } else if (response.data.code === -1) {
                    console.log('통신실패 -1', '댓글조회');
                    selectedBookReview.value = null;
                } else if (response.data.code === -2) {
                    console.log('통신실패 -2', '댓글조회');
                    selectedBookReview.value = null;
                } else {
                    // 기타 오류
                    console.log('통신실패 etc', '댓글조회');
                    selectedBookReview.value = null;
                }
            } catch (err) {
                console.log('서버오류', '댓글조회');
            }
        };

        /* //////////////////////////////// */
        /* ///HistoryBook 리스트 Array///// */
        /* ////////////////////////////// */
        const years = computed(() => {
            return [...new Set(bookList.value.map((book) => new Date(book.selectedMonth).getFullYear()))].sort((a, b) => b - a);
        });

        const getBooksByYearAndHalf = (year, half) => {
            const startMonth = half === 'first' ? 0 : 6; // JavaScript의 월은 0부터 시작합니다
            const endMonth = half === 'first' ? 5 : 11;

            return bookList.value
                .filter((book) => {
                    const date = new Date(book.selectedMonth);
                    return date.getFullYear() === year && date.getMonth() >= startMonth && date.getMonth() <= endMonth;
                })
                .sort((a, b) => new Date(a.selectedMonth) - new Date(b.selectedMonth));
        };

        const historyCompBookList = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/book/last/list?year=2024', { withCredentials: true });
                //console.log(response.data.data);

                if (response.data.code === 1) {
                    bookList.value = response.data.data;
                    return bookList.value;
                } else if (response.data.code === -1) {
                    console.log('통신실패 -1');
                } else if (response.data.code === -2) {
                    console.log('통신실패 -2');
                } else {
                    // 기타 오류
                    console.log('통신실패 etc');
                }
            } catch (err) {
                console.log('서버오류');
            }
        };

        /* //////////////////////////////// */
        /* ///HistoryBook 그 달 상세보기///// */
        /* ////////////////////////////// */
        const historyBookListComment = async (idx) => {
            //(idx);
            try {
                const response = await axios.get(`http://localhost:3000/api/book/monthly/recommend/${idx}`, { withCredentials: true });

                selectedBookOthersBookData.value = response.data.data.bookData;
                selectedBookOthersComment.value = response.data.data.commentData;
                console.log(response.data.data.commentData, '상세보기');

                if (response.data.code === 1) {
                    console.log('통신성공');
                    historyStatus.value = 3;
                } else if (response.data.code === -1) {
                    console.log('통신실패 -1');
                } else if (response.data.code === -2) {
                    console.log('통신실패 -2');
                } else {
                    // 기타 오류
                    console.log('통신실패 etc');
                }
            } catch (err) {
                console.log('서버오류');
            }
        };

        onMounted(async () => {
            await historyCompBookList();
        });

        return {
            bookList,
            menuImg,
            historyCompBookList,
            years,
            getBooksByYearAndHalf,
            selectedBook,
            selectedBookReview,
            selectedBookUpdate,
            selectedBookOthers,
            selectedBookOthersBookData,
            selectedBookOthersComment,
            historyStatus,
            historyBookSelect,
            historyBookSelectReview,
            historyBookListComment,
            historyBack,
            historyNext,
        };
    },
};
</script>

<style lang="scss" scoped>
.historyComp {
    height: 100%;

    .historyBg {
        position: fixed;
        width: 100%;
        height: 100%;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        z-index: -1;
        filter: blur(15px) brightness(0.2);

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

    section {
        height: 100%;

        &.history_book_list {
            background: beige;
        }
    }

    &_inner {
        width: 100%;
        height: 100%;
        overflow: auto;
        padding: 10px;

        /* 스크롤바 설정*/
        &::-webkit-scrollbar {
            width: 8px;
        }

        /* 스크롤바 막대 설정*/
        &::-webkit-scrollbar-thumb {
            background-color: #333333;
            /* 스크롤바 둥글게 설정    */
            border-radius: 10px;
            border: 7px solid #333;
        }

        article {
            h3 {
                font-size: 22px;
                font-weight: 600;
                margin-bottom: 2vw;
            }

            > div {
                padding: 0 25px;
                position: relative;

                &::after {
                    content: '';
                    width: 100%;
                    height: 35px;
                    background: rgb(215, 157, 86);
                    display: block;
                    position: absolute;
                    left: 0;
                    bottom: -25px;
                    border-top-right-radius: 5px;
                    border-top-left-radius: 5px;
                    border-bottom-right-radius: 8px;
                    border-bottom-left-radius: 8px;
                    box-shadow: -5px 10px 15px rgba($color: #000000, $alpha: 0.3), 0 3px 5px rgba($color: #fff, $alpha: 0.5) inset;
                }

                ul {
                    display: flex;
                    width: 100%;
                    margin-bottom: 6vw;
                    gap: 100px;

                    li {
                        width: calc((100% - 500px) / 6);
                        //margin-left: 7vw;
                        display: flex;
                        align-items: flex-end;
                        cursor: pointer;

                        &:hover {
                            img {
                                transform: translateY(-15px);
                            }
                        }

                        img {
                            transition: transform 0.3s;

                            box-shadow: -5px 10px 15px rgba($color: #000000, $alpha: 0.5);
                        }

                        &:nth-child(1) {
                            margin-left: 0;
                        }
                    }
                }
            }
        }
    }
}

.history_book_selected {
    &_wrap {
        height: 100%;
        display: flex;
        gap: 30px;
        > figure {
            width: 45%;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            margin: auto 0;
            position: relative;

            div {
                height: 70%;
                position: relative;

                &::before {
                    font-size: 28px;
                    content: 'Review';
                    color: #fff;
                    position: absolute;
                    left: 0;
                    top: -45px;
                    font-weight: 800;
                }
            }

            img {
                height: 100%;

                object-fit: contain;
                box-shadow: 0 0 15px rgba($color: #fff, $alpha: 0.5);
            }
        }
    }
    &_review {
        height: 100%;
        overflow: auto;
        width: 50%;
        padding: 8% 0;
        display: flex;
        align-items: flex-start;
        gap: 15px;
        flex-wrap: wrap;

        /* 스크롤바 설정*/
        &::-webkit-scrollbar {
            width: 0;
        }

        /* 스크롤바 막대 설정*/
        &::-webkit-scrollbar-thumb {
            background-color: #333333;
            /* 스크롤바 둥글게 설정    */
            border-radius: 10px;
            border: 7px solid #333;
        }

        > li {
            width: calc((100% - 15px) / 2);
            aspect-ratio: 6/5;
            border: 3px solid #fff;
            box-shadow: 0 0 15px rgba($color: #000000, $alpha: 0.5);
            position: relative;
        }

        .review_text {
            width: 100%;
            height: 70%;
            overflow: auto;
            font-family: 'Bujangnim_nunchi';

            &::-webkit-scrollbar {
                width: 2px; /* 스크롤바의 너비 */
            }

            &::-webkit-scrollbar-thumb {
                background: #217af4;
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
                font-size: 24px;
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
            font-size: 20px;

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
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                    }
                }
            }
        }

        /*  li {
            display: flex;
            align-items: flex-start;
            gap: 30px;
            color: #fff;
            margin-bottom: 25px;
            &:last-child {
                margin-bottom: 0;
            }

            > figure {
                width: 60px;
                aspect-ratio: 1/1;
                overflow: hidden;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                background: #fff;

                img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
            }

            p {
                max-width: calc((100% - 60px) - 30px);
                display: flex;
                align-items: center;
                align-self: center;
                line-height: 1.3;
                padding: 15px 10px;
                background: #42b883;
                border-radius: 10px;
                word-break: break-word;
                position: relative;
                &:before {
                    content: '';
                    display: block;
                    width: 10px;
                    height: 10px;
                    border-right: 10px solid #42b883;
                    border-left: 10px solid transparent;
                    border-bottom: 10px solid transparent;
                    position: absolute;
                    left: -20px;
                    top: 15px;
                }

                span {
                    font-size: 16px;
                    position: absolute;
                    right: 10px;
                    bottom: -22px;
                }
            }

            &:nth-child(even) {
                p {
                    background: #35495e;
                    &:before {
                        border-right: 10px solid #35495e;
                    }
                }
            }
        } */
    }
}

.history_book_past_list {
    ul {
        display: flex;
        flex-wrap: wrap;
        gap: 20px;
        li {
            width: calc((100% - 80px) / 5);
            margin-bottom: 30px;
            cursor: pointer;

            .book_image {
                position: relative;
                margin-bottom: 10px;
                border-radius: 5px;
                overflow: hidden;

                .profile {
                    position: absolute;
                    right: 0;
                    bottom: 0;
                    width: 35%;
                    aspect-ratio: 1/1;
                    //background: #fff;
                    border-top-left-radius: 50%;
                    padding: 5px;
                    img {
                        display: block;
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                        background: #f00;
                        border-radius: 50%;
                    }
                }
            }

            dl {
                dt {
                    font-weight: 800;
                    margin-bottom: 5px;
                }
            }
        }
    }
}

.history_book_past_list_detail {
    .historyComp_inner {
        display: flex;
        align-items: center;

        > div {
            width: 50%;
            height: 70%;
            position: relative;

            &:before {
                font-size: 28px;
                content: 'Recommender & Comment';
                color: #fff;
                position: absolute;
                left: 0;
                top: -45px;
                font-weight: 800;
            }
        }
    }
    .bookImg {
        width: 45%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin: auto 0;
        position: relative;

        div {
            height: 70%;
            position: relative;

            &:before {
                font-size: 28px;
                content: 'Comment';
                color: #fff;
                position: absolute;
                left: 0;
                top: -45px;
                font-weight: 800;
            }

            img {
                height: 100%;
                -o-object-fit: contain;
                object-fit: contain;
                box-shadow: 0 0 15px rgba(255, 255, 255, 0.5);
            }
        }
    }

    .recommender {
        display: flex;
        align-items: flex-start;
        margin-bottom: 5px;
        width: 100%;
        gap: 20px;

        figure {
            width: 80px;
            aspect-ratio: 1/1;
            border-radius: 50%;
            border: 1px solid #000;
            background: #fff;
            overflow: hidden;
        }

        p {
            max-width: calc(100% - 100px);
            align-self: center;
            line-height: 1.3;
            padding: 15px 10px;
            background: #42b883;
            border-radius: 10px;
            word-break: break-word;
            position: relative;
            color: #fff;
            &:before {
                content: '';
                display: block;
                width: 10px;
                height: 10px;
                border-right: 10px solid #42b883;
                border-left: 10px solid transparent;
                border-bottom: 10px solid transparent;
                position: absolute;
                left: -20px;
                top: 15px;
            }
        }
    }
    hr {
        margin-bottom: 5px;
    }

    hr + b {
        color: #fff;
    }

    ul {
        height: 85%;
        overflow: auto;
        padding: 3% 0;
        display: flex;
        flex-direction: column;
        gap: 15px;

        /* 스크롤바 설정*/
        &::-webkit-scrollbar {
            width: 2px;
        }

        /* 스크롤바 막대 설정*/
        &::-webkit-scrollbar-thumb {
            background-color: #333333;
            /* 스크롤바 둥글게 설정    */
            border-radius: 10px;
            border: 7px solid #333;
        }

        li {
            gap: 20px;
            display: flex;
            align-items: flex-start;

            figure {
                width: 60px;
                aspect-ratio: 1/1;
                border-radius: 50%;
                border: 1px solid #000;
                background: #fff;
                overflow: hidden;
                img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
            }

            p {
                max-width: calc(100% - 80px);
                align-self: center;
                line-height: 1.3;
                padding: 15px 10px;
                background: #42b883;
                border-radius: 10px;
                word-break: break-word;
                position: relative;
                color: #fff;
                &:before {
                    content: '';
                    display: block;
                    width: 10px;
                    height: 10px;
                    border-right: 10px solid #42b883;
                    border-left: 10px solid transparent;
                    border-bottom: 10px solid transparent;
                    position: absolute;
                    left: -20px;
                    top: 15px;
                }
            }

            &:nth-child(odd) {
                p {
                    background: #35495e;
                    &:before {
                        border-right: 10px solid #35495e;
                    }
                }
            }
        }
    }
}

.history_back {
    position: absolute;
    left: 25px;
    bottom: 25px;
    width: 50px;
    aspect-ratio: 1/1;
    background: #ff9f0a;
    border-radius: 50%;
    padding: 5px;
    &:hover {
        -webkit-animation: vibrate-1 0.3s linear infinite both;
        animation: vibrate-1 0.3s linear infinite both;
    }
}

.history_next {
    position: absolute;
    right: 25px;
    bottom: 25px;
    width: 50px;
    aspect-ratio: 1/1;
    background: #0a84ff;
    border-radius: 50%;
    padding: 5px;
}
</style>
