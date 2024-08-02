<template>
    <div class="favorite">
        <div class="favorite_inner">
            <div class="favorite_list">
                <ul>
                    <li v-for="(info, index) in isFavoriteBookList" :key="index">
                        <div class="fav_img" 
                            @mouseover="doMouseOver(index)" 
                            @mouseleave="doMouseLeave(index)" 
                            @touchstart="doMouseOver(index)" 
                            @touchend="doMouseLeave(index)" > 
                            <img :src="`${info.img}`" />
                            <div class="fav_recommender">
                                <span class="fav_profile">
                                    <img :src="`${info.recommender}`" />
                                </span>
                            </div>
                            <div v-show="info.isHovered" class="fav_hover">
                                <div class="fav_hover_inner">
                                    <div v-if="info.edit">
                                        <button type="button" class="cool-button btn-blue">내용 수정</button>
                                    </div>
                                    <div>
                                        <button type="button" class="cool-button btn-green">글 보기</button>
                                    </div>
                                    <div v-if="info.master" class="bt">
                                        <button type="button" class="cool-button btn-red">책 당선</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <dl>
                            <dt>
                                <div class="fav_title">  
                                    {{ info.title }}
                                </div>
                                <div class="fav_comment">
                                    <span class="fav_comment_num">
                                        {{ info.commentNum}}
                                    </span>
                                </div>
                            </dt>
                            <dd>
                                <span class="fav_pub">
                                    {{ info.publisher}}
                                </span>
                                <span class="fav_wri">
                                    {{ info.writer}}
                                </span>
                            </dd>
                        </dl>
                    </li>
                </ul>
            </div>
        </div>
        <div class="writeBtn">
            <button type="button" class="cool-button btn-blue">글쓰기</button>
        </div>
    </div>
</template>

<script>
import { ref, reactive } from 'vue';
export default {
    name: 'FavoriteBookComp',
    setup() {
        // 변수
        let isFavoriteBookList = [];
        let bookName = ref('');
        let publisher = ref('');
        let writer = ref('');
        let commentNum = ref('');
        let edit = false; // 본인 작성 글 true
        let master = false; // 마스터 시 true

        // ================ 테스트 데이터================
        let memberId = 1; // (e.x 마스터 idx : 1)
        let bookIndex = 1; // (e.x 멤버 idx 와 비교 할 책 index)
        // ================//테스트 데이터================

        // 계정이 마스터 시 true
        if (memberId === 1) {
            master = true;
        }

        // 본인이 쓴 글은 내용 수정 가능 true
        if (memberId == bookIndex) {
            edit = true;
        }

        // 북 리스트 Array
        let bookList = reactive([
            {

                img: require('@/assets/img/favorite/book28.webp'),
                title: bookName.value = '제일 긴 책제목은 과연 몇자일까요오오오오오',
                publisher: publisher.value = '민음사',
                writer: writer.value = '김동동',
                commentNum: commentNum.value = '10',
                recommender: require('@/assets/img/profile/test.jpg'),
                edit,
                master,
                isHovered: false,
            },
            {
                img: require('@/assets/img/favorite/book28.webp'),
                title: bookName.value = '제일 긴 책제목은 과연',
                publisher: publisher.value = '민음사',
                writer: writer.value = '김동동',
                commentNum: commentNum.value = '10',
                recommender: require('@/assets/img/profile/test.jpg'),
                edit,
                master,
                isHovered: false,
            },
            {
                img: require('@/assets/img/favorite/book28.webp'),
                title: bookName.value = ' 몇자일까요오오오오오',
                publisher: publisher.value = '민음사',
                writer: writer.value = '김동동',
                commentNum: commentNum.value = '2',
                recommender: require('@/assets/img/profile/test.jpg'),
                edit,
                master,
                isHovered: false,
            },
            {
                img: require('@/assets/img/favorite/book28.webp'),
                title: bookName.value = '효자손으로도 때리지 말라',
                publisher: publisher.value = '민음사',
                writer: writer.value = '김동동',
                commentNum: commentNum.value = '3',
                recommender: require('@/assets/img/profile/test.jpg'),
                edit,
                master,
                isHovered: false,
            },
            {
                img: require('@/assets/img/favorite/book28.webp'),
                title: bookName.value = '임금 인상을 요청하기 위해 과장에게 접근하는 기술과 방법',
                publisher: publisher.value = '민음사',
                writer: writer.value = '김동동',
                commentNum: commentNum.value = '4',
                recommender: require('@/assets/img/profile/test.jpg'),
                edit,
                master,
                isHovered: false,
            },
            {
                img: require('@/assets/img/favorite/book28.webp'),
                title: bookName.value = '에피쿠로스 쾌락 6',
                publisher: publisher.value = '민음사',
                writer: writer.value = '김동동',
                commentNum: commentNum.value = '4',
                recommender: require('@/assets/img/profile/test.jpg'),
                edit,
                master,
                isHovered: false,
            },
            {
                img: require('@/assets/img/favorite/book28.webp'),
                title: bookName.value = '에피쿠로스 쾌락 7',
                publisher: publisher.value = '민음사',
                writer: writer.value = '김동동',
                commentNum: commentNum.value = '5',
                recommender: require('@/assets/img/profile/test.jpg'),
                edit,
                master,
                isHovered: false,
            },
            {
                img: require('@/assets/img/favorite/book28.webp'),
                title: bookName.value = '에피쿠로스 쾌락 7',
                publisher: publisher.value = '민음사',
                writer: writer.value = '김동동',
                commentNum: commentNum.value = '5',
                recommender: require('@/assets/img/profile/test.jpg'),
                edit,
                master,
                isHovered: false,
            },
            {
                img: require('@/assets/img/favorite/book28.webp'),
                title: bookName.value = '에피쿠로스 쾌락 7',
                publisher: publisher.value = '민음사',
                writer: writer.value = '김동동',
                commentNum: commentNum.value = '5',
                recommender: require('@/assets/img/profile/test.jpg'),
                edit,
                master,
                isHovered: false,
            },
            {
                img: require('@/assets/img/favorite/book28.webp'),
                title: bookName.value = '에피쿠로스 쾌락 7',
                publisher: publisher.value = '민음사',
                writer: writer.value = '김동동',
                commentNum: commentNum.value = '5',
                recommender: require('@/assets/img/profile/test.jpg'),
                edit,
                master,
                isHovered: false,
            },
        ])

        // 추천 책 설정 창 on/off
        const doMouseOver = (index) => {
            bookList[index].isHovered = true;
        }
        const doMouseLeave = (index) => {
            bookList[index].isHovered = false;
        }

        // 데이터 매핑
        isFavoriteBookList = bookList;

        return {
            isFavoriteBookList,
            doMouseOver,
            doMouseLeave,
        };
    },
}
</script>

<style lang="scss">
/*
@font-face {
    font-family: 'Hahmlet-Regular';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_2110@1.0/Hahmlet-Regular.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
}
*/
.favorite{
    /*
     font-family: 'Hahmlet-Regular';
    */
    height: 100%;
    position: relative;
    &_inner {
        width: 100%;
        height: 92%;
        overflow: auto;
        display: flex;
        justify-content: center;
        position: relative;
        box-sizing: content-box;
        gap: 20px;
        /* 스크롤바 설정*/
        &::-webkit-scrollbar{
        width: 8px;
        }

        /* 스크롤바 막대 설정*/
        &::-webkit-scrollbar-thumb{
        background-color: #333333;
        /* 스크롤바 둥글게 설정    */
        border-radius: 10px; 
        border: 7px solid #333;
        }

        /* 스크롤바 뒷 배경 설정*/
        &::-webkit-scrollbar-track{
        background-color: rgba(0,0,0,0);
        }
    }
    &_list{
        width: 90%;
        margin: 0 auto;
        height: calc(100% - 35px);
        padding: 20px 0;
        > ul{
            display: grid;
            grid-template-columns: 20% 20% 20% 20% 20%; 
            > li{
                margin: 0 20px 40px;
                > dl {
                    > dt{
                        width: 100%;
                        display: flex;
                        justify-content: space-between;
                        margin-top: 10px;
                        font-size: 15px;
                        line-height: 23px;
                        letter-spacing: -0.01em;
                        font-weight: bold;
                        color: #000;
                    }
                    > dd{
                        display: flex;
                        margin-top: 5px;
                        font-size: 13px;
                        color: #424242;
                        letter-spacing: -0.01em;
                    }
                }
                .fav_img{
                    position: relative;
                    cursor: pointer;
                    > img {
                        border-radius: 18px;
                    }
                }
                .fav_hover{
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    width: 100%;
                    height: 100%;
                    z-index: 1;
                    
                .fav_hover_inner{
                    position: relative;
                    width: 100%;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    > div{
                        margin-bottom: 10px;    
                    }

                    button{
                        position: relative;
                        z-index: 2;
                        color: #fff;
                        min-width: 150px;
                    }
                    
                    .bt{
                        position: absolute;
                        margin-bottom: 0;
                        bottom: 15px;
                        z-index: 1;
                    }
                    &::before{
                        position: absolute;
                        z-index: 1;
                        top: 0;
                        left: 0;
                        right: 0;
                        width: 100%;
                        height: 100%;
                        border-radius: 18px;
                        content:'';
                        display: block;
                        background: rgba(0, 0, 0, 0.8);
                    }
                }

                }
                .fav_recommender{
                    position: absolute;
                    bottom: 0;
                    right: 0;
                    z-index: 1;
                    background: rgba($color: #dfdfdf, $alpha: 0.8);
                    backdrop-filter: blur(15px);
                    padding: 8px 0 0 8px;
                    border-radius: 32.5px 0px 32.5px 0px;

                }
                .fav_profile{
                    width: 48px;
                    height: 48px;
                    overflow: hidden;
                    position: relative;
                    display: block;
                    border-radius: 50%;
                    background-color: #eee;
                }
                .fav_title{
                    width: 80%;
                    word-break: break-word;
                }
                .fav_pub{
                    &::after{
                        position: relative;
                        top: -1px;
                        padding: 0 5px;
                        content:'|';
                        color: #999;;
                    }
                }
                .fav_comment{
                    width: 17%;
                    margin-left: 3%;                    
                    position: relative;
                    &::after{
                    position: absolute;
                    z-index: 1;
                    top: 0;
                    left: 0;
                    right: 0;
                    display: block;
                    width: 15px;
                    height: 15px;
                    content:'';
                    background: url('/src/assets/img/icon/ico-comment.webp') no-repeat 100% 100% / cover;
                    }
                }
                .fav_comment_num{
                    padding-left: 16px;
                    font-size: 12px;
                }
            }
        }
    }
    .writeBtn{
        position:absolute;
        bottom: 5px;
        right: 10px;
        z-index: 1;
    }
}
.cool-button{
    padding: 15px 30px;
    font-size: 14px;
    border: none;
    cursor: pointer;
    color: #fff;
    border-radius: 5px;
    box-sizing: border-box;
    background: #6E6D70;
    border: 0.5px solid rgba(0, 0, 0, 0.12);
    box-shadow: 0px 0.5px 1px rgba(0, 0, 0, 0.1), inset 0px 0.5px 0.5px rgba(255, 255, 255, 0.5);
    border-radius: 6px;
    transition: all 0.2s ease-in-out;

    &:hover,
    &.-active{
        &.btn-blue{
            background: #4B91F7;
        }
        &.btn-green{
            background: #0CBB7C;
        }
        &.btn-red{
            background: #FC0C0C;
        }
    }
}

</style>
