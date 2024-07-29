<template>
    <div class="wrap">
        <header class="header"></header>

        <MonthlyComp></MonthlyComp>
    </div>
</template>

<script>
import MonthlyComp from '../components/MonthlyComp.vue';

export default {
    name: 'WrapComp',
    components: {
        MonthlyComp,
    },
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
</style>
