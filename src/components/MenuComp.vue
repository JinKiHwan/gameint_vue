<template>
    <div class="menu">
        <ul>
            <li class="home"><a href="#!"></a></li>
            <li class="montly"><a href="#!"></a></li>
            <li class="recommend"><a href="#!"></a></li>
            <li class="history"><a href="#!"></a></li>
            <li class="mybooks"><a href="#!"></a></li>
            <li class="bookreviews"><a href="#!"></a></li>
            <li class="place"><a href="#!"></a></li>
            <li class="mypage"><a href="#!"></a></li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'menuComp',
};
</script>

<style lang="scss">
.menu {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    ul {
        width: min(1000, 50%);
        display: flex;
        flex-wrap: wrap;

        li {
            width: calc((100% - 6vw) / 4);
            aspect-ratio: 1/1;
            background: #fff;
            margin-left: 2vw;
            margin-bottom: 4vw;
            border-radius: 15px;
            position: relative;

            &::after {
                position: absolute;
                left: 50%;
                bottom: -2vw;
                transform: translateX(-50%);
                color: #fff;
            }

            &.home {
                &::after {
                    content: '홈';
                }
            }

            &.montly {
                &::after {
                    content: '이번달 책';
                }
            }

            &.recommend {
                &::after {
                    content: '책 추천';
                }
            }

            &.history {
                &::after {
                    content: '지난 이야기';
                }
            }

            &.mybooks {
                &::after {
                    content: '나의 책장 소개';
                }
            }

            &.bookreviews {
                &::after {
                    content: '책 감상문';
                }
            }

            &.place {
                &::after {
                    content: '장소 추천';
                }
            }

            &.mypage {
                &::after {
                    content: '마이페이지';
                }
            }

            &:nth-child(1),
            &:nth-child(5) {
                margin-left: 0;
            }

            &:nth-child(n + 5) {
                margin-bottom: 0;
            }
        }
    }
}
</style>
