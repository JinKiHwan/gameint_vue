<template>
    <div class="wrap">
        <header class="header"></header>

        <transition name="fade" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
export default {
    name: 'WrapComp',
};
</script>

<style lang="scss">
.wrap {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: min(95%, 1500px);
    aspect-ratio: 1920/1080;
    background: rgba($color: #fff, $alpha: 0.5);
    backdrop-filter: blur(5px);
    border-radius: 10px;
    overflow: hidden;
    display: flex;
    flex-direction: column;

    .header {
        width: 100%;
        height: 50px;
        background: #00f;
        margin-bottom: 10px;
    }
}

/* 트랜지션 애니메이션 정의 */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
    opacity: 0;
}
</style>
