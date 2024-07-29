<template>
    <div class="montly">
        <div class="montly_inner">
            <div class="montly_book_img">
                <h2>2024년 8월의 책</h2>
                <figure>
                    <img :src="book" alt="" />
                </figure>
            </div>

            <div class="montly_book_info">
                <dl>
                    <dt>책 제목 :</dt>
                    <dd></dd>
                </dl>

                <dl>
                    <dt>출판사 :</dt>
                    <dd></dd>
                </dl>

                <dl>
                    <dt>카테고리 :</dt>
                    <dd></dd>
                </dl>

                <dl>
                    <dt>추천인 :</dt>
                    <dd></dd>
                </dl>

                <dl>
                    <dt>추천 이유:</dt>
                    <dd></dd>
                </dl>
            </div>
        </div>

        <div class="montly_btn_wrap">
            <button class="btn_review_view">리뷰보기</button>
            <button class="btn_review_write">작성하기</button>
        </div>

        <ReviewFormComp></ReviewFormComp>
    </div>
</template>

<script>
import ReviewFormComp from '../components/ReviewFormComp.vue';

export default {
    name: 'monthlyComp',

    components: {
        ReviewFormComp,
    },

    data() {
        return {
            book: require('@/assets/img/book01.webp'),
        };
    },
};
</script>

<style lang="scss">
.montly {
    padding: 0 10px 10px;
    height: calc(100% - 60px);
    position: relative;
    &_inner {
        display: flex;
        width: min(80%, 1000px);
        height: 100%;
        margin: 0 auto;
        padding-bottom: 10px;
        gap: 2vw;
    }

    &_book_img {
        text-align: center;

        h2 {
            margin-block: 10px;
        }
        figure {
            height: calc(100% - 30px);
        }
        img {
            height: 100%;
            object-fit: contain;
        }
    }
    &_book_info {
        flex-grow: 1;
        padding-top: 30px;

        dl {
            font-size: 18px;
            line-height: 1.2;
        }
    }

    &_btn_wrap {
        display: flex;
        position: absolute;
        right: 10px;
        bottom: 10px;
        gap: 1vw;

        button {
            background: #eee;
            border-radius: 5px;
            width: 100px;
            height: 35px;
            color: #fff;
            &.btn_review_view {
                background: blue;
            }
            &.btn_review_write {
                background: darkblue;
            }
        }
    }
}
</style>
