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
                                    <img :src="book.bookImg" :alt="book.bookName" />
                                </li>
                            </ul>
                        </div>
                        <div class="first" v-if="getBooksByYearAndHalf(year, 'first').length > 0">
                            <ul>
                                <li v-for="book in getBooksByYearAndHalf(year, 'first')" :key="book.month" @click="historyBookSelect(book.bookIdx)">
                                    <img :src="book.bookImg" :alt="book.bookName" />
                                </li>
                            </ul>
                        </div>
                    </article>
                </div>
            </div>
        </section>

        <section class="history_book_selected" v-if="historyStatus === 1">
            <div class="historyBg"><img :src="selectedBook?.bookImg" :alt="selectedBook?.bookName" /></div>
            <div class="historyComp_inner">
                <div class="history_book_selected_wrap">
                    <figure>
                        <img :src="selectedBook?.bookImg" :alt="selectedBook?.bookName" />
                    </figure>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import axios from 'axios';
import { ref, onMounted, computed } from 'vue';

export default {
    name: 'HistoryCompComp',

    setup() {
        const testData = [
            { bookIdx: 1, bookImg: require('@/assets/img/books/book49.jpg'), bookName: '아무튼, 디지몬', bookStar: '5', month: '8', year: 2024 },
            { bookIdx: 2, bookImg: require('@/assets/img/books/book38.webp'), bookName: '지옥변', bookStar: '5', month: '7', year: 2024 },
            { bookIdx: 3, bookImg: require('@/assets/img/books/book33.webp'), bookName: '종이여자', bookStar: '5', month: '6', year: 2024 },
            { bookIdx: 4, bookImg: require('@/assets/img/books/book11.webp'), bookName: '이방인', bookStar: '5', month: '5', year: 2024 },
            { bookIdx: 5, bookImg: require('@/assets/img/books/book_free.webp'), bookName: '자율', bookStar: '5', month: '4', year: 2024 },
            { bookIdx: 6, bookImg: require('@/assets/img/books/book06.webp'), bookName: '스틱!', bookStar: '5', month: '3', year: 2024 },
            { bookIdx: 7, bookImg: require('@/assets/img/books/book_free.webp'), bookName: '자율', bookStar: '5', month: '2', year: 2024 },
            { bookIdx: 8, bookImg: require('@/assets/img/books/book07.webp'), bookName: '내가 한 말을 오해하지 않기로 함', bookStar: '5', month: '1', year: 2024 },
            { bookIdx: 9, bookImg: require('@/assets/img/books/book01.webp'), bookName: '심판', bookStar: '5', month: '12', year: 2023 },
        ];
        const historyStatus = ref(0);
        const selectedBook = ref(null);

        /* //////////////////////////////// */
        /* ///History 스테이터스 변경 ////// */
        /* ////////////////////////////// */
        const historyBookSelect = (idx) => {
            historyStatus.value = 1;
            selectedBook.value = testData.find((book) => book.bookIdx === idx);
            console.log(idx);
        };

        /* //////////////////////////////// */
        /* ///HistoryBook 리스트 Array///// */
        /* ////////////////////////////// */
        const years = computed(() => {
            return [...new Set(testData.map((book) => book.year))].sort((a, b) => b - a);
        });

        const getBooksByYearAndHalf = (year, half) => {
            const startMonth = half === 'first' ? 1 : 7;
            const endMonth = half === 'first' ? 6 : 12;

            return testData.filter((book) => book.year === year && parseInt(book.month) >= startMonth && parseInt(book.month) <= endMonth).sort((a, b) => parseInt(a.month) - parseInt(b.month));
        };

        const historyCompBookList = async () => {
            try {
                const response = await axios.get('http://localhost:3000//api/book/last/list?year=2024');
                console.log(response);

                if (response.data.code === 1) {
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

        onMounted(() => {
            historyCompBookList();
        });

        return {
            testData,
            historyCompBookList,
            years,
            getBooksByYearAndHalf,
            selectedBook,
            historyStatus,
            historyBookSelect,
        };
    },
};
</script>

<style lang="scss">
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
        filter: blur(15px) brightness(0.5);

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
                    border-bottom-right-radius: 15px;
                    border-bottom-left-radius: 15px;
                    box-shadow: -5px 10px 15px rgba($color: #000000, $alpha: 0.3), 0 3px 5px rgba($color: #fff, $alpha: 0.5) inset;
                }

                ul {
                    display: flex;
                    width: 100%;
                    margin-bottom: 6vw;

                    li {
                        width: calc((100% - 35vw) / 6);
                        margin-left: 7vw;
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

        figure {
            height: 70%;
            margin: auto 0;
            box-shadow: 0 0 15px rgba($color: #fff, $alpha: 0.5);

            img {
                height: 100%;
            }
        }
    }
}
</style>
