<template>
    <div class="dim"></div>
    <div class="review_form">
        <form action="">
            <dl>
                <dt>평점</dt>
                <dd><input type="number" max="5" min="1" /></dd>
            </dl>
            <dl>
                <dt>책리뷰</dt>
                <dd>
                    <textarea name="" id=""></textarea>
                </dd>
            </dl>

            <div class="review_form_btns">
                <button class="close" @click="closeForm">닫기</button>
                <div class="write"><router-link to="/Monthly/review">작성</router-link></div>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    name: 'reviewForm',
    methods: {
        closeForm() {
            this.$emit('close-form');
        },
        submitForm() {},
    },
};
</script>

<style lang="scss">
.dim {
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    background: rgba($color: #000000, $alpha: 0.5);
}
.review_form {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -55%);
    width: 500px;
    height: 450px;
    background: #ddd;
    z-index: 0;
    padding: 10px;

    form {
        width: 100%;
        height: 100%;
        border: 1px solid #f00;
        position: relative;

        .review_form_btns {
            position: absolute;
            right: 0;
            bottom: 0;
            display: flex;
            gap: 1vw;

            button,
            div {
                width: 100px;
                height: 50px;
                color: #fff;
                display: flex;
                align-items: center;
                justify-content: center;

                &.close {
                    background: red;
                }
                &.write {
                    background: blue;
                }
            }
        }
    }

    dl {
        display: flex;
        align-items: center;

        textarea {
            resize: none;
        }
    }
}
</style>
