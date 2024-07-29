<template>
    <MenuComp></MenuComp>

    <WrapComp> </WrapComp>
</template>

<script>
import MenuComp from './components/MenuComp.vue';
import WrapComp from './components/WrapComp.vue';

export default {
    name: 'App',
    components: {
        MenuComp,
        WrapComp,
    },
};
</script>

<style lang="scss">
body {
    margin: 0;
    background: url('/src/assets/img/bg.png') no-repeat 100% 100% / cover;
    #app {
        height: 100vh;
    }
}
</style>
