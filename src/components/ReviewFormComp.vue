<template>
    <div class="review_form">
        <form action="">
            <dl>
                <dt>평점</dt>
                <dd><input type="number" max="5" min="1" /></dd>
            </dl>
        </form>
    </div>
</template>

<script>
export default {
    name: 'reviewForm',
};
</script>

<style lang="scss">
.review_form {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -55%);
    width: 500px;
    height: 450px;
    background: #ddd;
}
</style>
