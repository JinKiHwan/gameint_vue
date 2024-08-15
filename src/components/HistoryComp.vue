<template>
    <div class="historyComp">
        <div class="historyComp_inner">
            <div v-for="year in years" :key="year">
                <article>
                    <h3>{{ year }}</h3>
                    <div class="second" v-if="getBooksByYearAndHalf(year, 'second').length > 0">
                        <ul>
                            <li v-for="book in getBooksByYearAndHalf(year, 'second')" :key="book.month">
                                <img :src="book.bookImg" :alt="book.bookName" />
                            </li>
                        </ul>
                    </div>
                    <div class="first" v-if="getBooksByYearAndHalf(year, 'first').length > 0">
                        <ul>
                            <li v-for="book in getBooksByYearAndHalf(year, 'first')" :key="book.month">
                                <img src="" alt="" />
                                <img :src="book.bookImg" :alt="book.bookName" />
                            </li>
                        </ul>
                    </div>
                </article>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { onMounted, computed } from 'vue';

export default {
    name: 'HistoryCompComp',

    setup() {
        const testData = [
            { bookImg: require('@/assets/img/books/book49.jpg'), bookName: '아무튼, 디지몬', bookStar: '5', month: '8', year: 2024 },
            { bookImg: require('@/assets/img/books/book38.webp'), bookName: '지옥변', bookStar: '5', month: '7', year: 2024 },
            { bookImg: require('@/assets/img/books/book33.webp'), bookName: '종이여자', bookStar: '5', month: '6', year: 2024 },
            { bookImg: require('@/assets/img/books/book11.webp'), bookName: '이방인', bookStar: '5', month: '5', year: 2024 },
            { bookImg: require('@/assets/img/books/book25.webp'), bookName: '구의 증명', bookStar: '5', month: '4', year: 2024 },
            { bookImg: require('@/assets/img/books/book06.webp'), bookName: '스틱!', bookStar: '5', month: '3', year: 2024 },
            { bookImg: require('@/assets/img/books/book13.webp'), bookName: '참을 수 없는 존재의 가벼움', bookStar: '5', month: '2', year: 2024 },
            { bookImg: require('@/assets/img/books/book07.webp'), bookName: '내가 한 말을 오해하지 않기로 함', bookStar: '5', month: '1', year: 2024 },
            { bookImg: require('@/assets/img/books/book01.webp'), bookName: '심판', bookStar: '5', month: '12', year: 2023 },
        ];

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
        };
    },
};
</script>

<style lang="scss">
.historyComp {
    height: 100%;
    background: beige;
    &_inner {
        width: 100%;
        height: 100%;
        overflow: auto;
        padding: 10px;

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
                        transition: transform 0.3s;
                        cursor: pointer;

                        &:hover {
                            transform: translateY(-15px);
                        }

                        img {
                            transition: box-shadow 0.3s;
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
</style>
