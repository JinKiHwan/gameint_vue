<template>
    <router-view></router-view>
</template>

<script>
export default {
    name: 'App',
};
</script>

<style lang="scss">
body {
    margin: 0;
    background: url('/src/assets/img/bg.webp') no-repeat 100% 100% / cover;
    background-position: center center;
    #app {
        height: 100vh;
    }
}

.btnWraps {
    display: flex;
    gap: 0.5vw;
    margin-left: 1vw;

    li {
        border-radius: 50%;
        overflow: hidden;
        width: 15px;
        aspect-ratio: 1/1;

        a {
            width: 100%;
            height: 100%;
            display: block;
        }

        &.red {
            background: red;
        }
        &.yellow {
            background: orange;
        }
        &.green {
            background: greenyellow;
        }
    }
}
</style>
