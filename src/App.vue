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

        @include mobile {
            height: 35vh;
        }
    }
}

.btnWraps {
    display: flex;
    gap: 0.5vw;
    margin-left: 1vw;

    @include mobile() {
        gap: 2vw !important;
        margin-left: 2vw !important;
    }

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
            background: #ff453a;
        }
        &.yellow {
            background: #ff9f0a;
        }
        &.green {
            background: #30d158;
        }
    }
}

$desktop: 1560px;
$labtop: 1300px;
$tablet: 1024px;
$mobile: 750px;
$mobile-mini: 450px;

@mixin desktop {
    @media screen and (max-width: #{$desktop}) {
        @content;
    }
}

@mixin labtop {
    @media screen and (max-width: #{$labtop}) {
        @content;
    }
}

@mixin tablet {
    @media screen and (min-width: #{$mobile}) and (max-width: 1024px) {
        @content;
    }
}

@mixin mobile {
    @media screen and (max-width: 1024px) {
        @content;
    }
}

@mixin mobile-mini {
    @media screen and (max-width: #{$mobile-mini}) {
        @content;
    }
}

@mixin custom($width) {
    @media screen and (max-width: #{$width}) {
        @content;
    }
}

@mixin hover {
    @media (hover: hover) and (pointer: fine) {
        &:hover {
            @content;
        }
    }
}

@-webkit-keyframes vibrate-1 {
    0% {
        -webkit-transform: translate(0);
        transform: translate(0);
    }
    20% {
        -webkit-transform: translate(-2px, 2px);
        transform: translate(-2px, 2px);
    }
    40% {
        -webkit-transform: translate(-2px, -2px);
        transform: translate(-2px, -2px);
    }
    60% {
        -webkit-transform: translate(2px, 2px);
        transform: translate(2px, 2px);
    }
    80% {
        -webkit-transform: translate(2px, -2px);
        transform: translate(2px, -2px);
    }
    100% {
        -webkit-transform: translate(0);
        transform: translate(0);
    }
}
@keyframes vibrate-1 {
    0% {
        -webkit-transform: translate(0);
        transform: translate(0);
    }
    20% {
        -webkit-transform: translate(-2px, 2px);
        transform: translate(-2px, 2px);
    }
    40% {
        -webkit-transform: translate(-2px, -2px);
        transform: translate(-2px, -2px);
    }
    60% {
        -webkit-transform: translate(2px, 2px);
        transform: translate(2px, 2px);
    }
    80% {
        -webkit-transform: translate(2px, -2px);
        transform: translate(2px, -2px);
    }
    100% {
        -webkit-transform: translate(0);
        transform: translate(0);
    }
}
</style>
