<template>
    <div class="history">
        <h2>지난 이야기</h2>
        <article class="history_selected">
            <ul>
                <li>2024년</li>
                <li>2023년</li>
            </ul>

            <div class="list"></div>
        </article>
    </div>
</template>

<script>
export default {
    name: 'HistoryComp',

    setup() {
        const testBook = require('@/assets/img/books/book20.webp');
        const textData = [
            { bookImg: require('@/assets/img/books/book20.webp'), bookName: '아버지해방일지', bookStar: '5', month: '8' },
            { bookImg: require('@/assets/img/books/book19.webp'), bookName: '아버지해방일지', bookStar: '5', month: '8' },
            { bookImg: require('@/assets/img/books/book18.webp'), bookName: '아버지해방일지', bookStar: '5', month: '8' },
            { bookImg: require('@/assets/img/books/book17.webp'), bookName: '아버지해방일지', bookStar: '5', month: '8' },
            { bookImg: require('@/assets/img/books/book16.webp'), bookName: '아버지해방일지', bookStar: '5', month: '8' },
            { bookImg: require('@/assets/img/books/book15.webp'), bookName: '아버지해방일지', bookStar: '5', month: '8' },
            { bookImg: require('@/assets/img/books/book14.webp'), bookName: '아버지해방일지', bookStar: '5', month: '8' },
            { bookImg: require('@/assets/img/books/book13.webp'), bookName: '아버지해방일지', bookStar: '5', month: '8' },
            { bookImg: require('@/assets/img/books/book12.webp'), bookName: '아버지해방일지', bookStar: '5', month: '8' },
            { bookImg: require('@/assets/img/books/book11.webp'), bookName: '아버지해방일지', bookStar: '5', month: '8' },
            { bookImg: require('@/assets/img/books/book10.webp'), bookName: '아버지해방일지', bookStar: '5', month: '8' },
        ];

        return {
            testBook,
            textData,
        };
    },
};
</script>

<style lang="scss">
.history {
    h2 {
        text-align: center;
        font-size: 22px;
        font-weight: 800;
        margin-top: 15px;
        padding-bottom: 15px;
        border-bottom: 1px solid #000;
    }

    &_selected {
        > ul {
            display: flex;
            border-bottom: 1px solid #000;
            li {
                border-right: 1px solid #000;
                padding: 10px 15px;
            }
        }

        .list {
            .swiper-wrapper {
                display: flex;
            }
            .swiper-slide {
                padding: 30px;
                border-right: 1px solid #000;
                border-bottom: 1px solid #000;

                figure {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                &:nth-child(1) {
                    border-left: 1px solid #000;
                }
            }
        }
    }
}
</style>
