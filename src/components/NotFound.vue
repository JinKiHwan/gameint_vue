<template>
    <div>
        <h1>404 - 페이지를 찾을 수 없습니다</h1>
        <router-link to="/">홈으로 돌아가기</router-link>
    </div>
</template>

<script>
export default {
    name: 'NotFound',
};
</script>

<style lang="scss" scoped>
div {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 2vw;
    h1 {
        font-size: 35px;
        font-weight: 600;
        color: #fff;
    }

    a {
        color: #fff;
        text-decoration: underline;

        &:hover {
            opacity: 0.5;
        }
    }
}
</style>
