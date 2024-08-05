<template>
    <div class="favorite">
        <div class="favorite_inner" v-bind:class="{ '-view': isFavoriteBookStatus === 1 }">
            <!--[s] 리스트-->
            <div class="favorite_list" v-if="isFavoriteBookStatus === 0">
                <ul>
                    <li v-for="(info, index) in isFavoriteBookList" :key="index">
                        <div class="fav_img" @mouseover="doMouseOver(index)" @mouseleave="doMouseLeave(index)" @touchstart="doMouseOver(index)" @touchend="doMouseLeave(index)">
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
                                        {{ info.commentNum }}
                                    </span>
                                </div>
                            </dt>
                            <dd>
                                <span class="fav_pub">
                                    {{ info.publisher }}
                                </span>
                                <span class="fav_wri">
                                    {{ info.writer }}
                                </span>
                            </dd>
                        </dl>
                    </li>
                </ul>
            </div>
            <!--[e] 리스트-->
            
            <!--[s] 작성/수정/View-->
            <div class="favorite_form" v-if="isFavoriteBookStatus === 1">
                <div class="form-container">
                    <div class="form-left">
                        <ul>
                            <li>
                                <label for="book_name">책 제목</label>
                                <input type="text" v-model="bookTitle" placeholder="책 제목을 작성 해주세요.">
                            </li>
                            <li>
                                <label for="book_pub">출판사</label>
                                <input type="email" v-model="bookPub" placeholder="출판사를 작성 해주세요.">
                            </li>
                            <li>
                                <label for="book_cate">카테고리</label>
                                <input type="text" v-model="bookCate" placeholder="카테고리를 작성 해주세요.">
                            </li>
                            <li class="hc">
                                <label for="message">추천 이유</label>
                                <div class="editerArea">
                                    <QuillEditor v-model="content" ref="quillEditor" />
                                    <div v-if="false" id="preview" class="content ql-editor" v-html="content"></div>
                                </div>
                            </li>
                            <li>
                                <label for="book_img">책 이미지</label>
                                <input type="file" id="upload-image" hidden @change="handleFileUpload"/>
                            </li>
                        </ul>
                    </div>
                    <div class="form-right">
                        <label v-show="emptyImg != true" class="uploadImg">
                            <img ref="previewImage" />
                        </label>
                        <p v-show="emptyImg" class="dfTxt">책 이미지를 첨부해주세요</p>
                    </div>
                </div>
            </div>
            <!--[e] 작성/수정/View-->
        </div>
        <div class="btRightBtn">
            <button v-if="isFavoriteBookStatus === 0" type="button"  @click="changeFavoriteType(1)" class="cool-button btn-blue" >
                <span >
                    글쓰기
                </span>
            </button>
            <button v-else type="submit" class="cool-button btn-blue" @click="changeFavoriteType(0)">
                <span>
                    {{chWriteBtnTxt}}
                </span>
            </button>
        </div>
    </div>
</template>

<script>
///////////////////////////////////////////
// import
///////////////////////////////////////////
import { ref, reactive, computed } from 'vue';
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';

export default {
    name: 'FavoriteBookComp',
    setup() {
        // 변수
        const isFavoriteBookStatus = ref(0); // List : 0, Write & View : 1
        //const isFavoriteBookStatus = ref(1); // List : 0, Write & View : 1
        const bookName = ref('');
        const publisher = ref('');
        const writer = ref('');
        const commentNum = ref('');
        const bookTitle = ref('');
        const bookPub = ref('');
        const bookCate = ref('');
        const fileName = ref(null);
        const previewImage = ref(null);

        let isFavoriteBookList = ref([]);
        let master = ref(false); // 마스터 시 true
        let editMode = ref(false); // 마스터 시 true
        let emptyImg = ref(true);
        let edit = ref(false); // 본인 작성 글 true

        // ================ 테스트 데이터================
        let memberId = 1; // (e.x 마스터 idx : 1)
        let bookIndex = 1; // (e.x 멤버 idx 와 비교 할 책 index)
        // ================//테스트 데이터================

        ///////////////////////////////////////////
        // 공통
        ///////////////////////////////////////////
        const chWriteBtnTxt = computed(() => {
            return editMode.value ? '수정완료' : '작성완료';
        });

        // 계정이 마스터 시 true
        if (memberId === 1) {
            master = true;
        }

        // 본인이 쓴 글은 내용 수정 가능 true
        if (memberId == bookIndex) {
            edit = true;
        }

        ///////////////////////////////////////////
        // 추천 책 리스트
        ///////////////////////////////////////////
        // 북 리스트 Array
        let bookList = reactive([
            {
                img: require('@/assets/img/favorite/book28.webp'),
                title: (bookName.value = '제일 긴 책제목은 과연 몇자일까요오오오오오'),
                publisher: (publisher.value = '민음사'),
                writer: (writer.value = '김동동'),
                commentNum: (commentNum.value = '10'),
                recommender: require('@/assets/img/profile/test.jpg'),
                edit,
                master,
                isHovered: false,
            },
            {
                img: require('@/assets/img/favorite/book28.webp'),
                title: (bookName.value = '제일 긴 책제목은 과연'),
                publisher: (publisher.value = '민음사'),
                writer: (writer.value = '김동동'),
                commentNum: (commentNum.value = '10'),
                recommender: require('@/assets/img/profile/test.jpg'),
                edit,
                master,
                isHovered: false,
            },
            {
                img: require('@/assets/img/favorite/book28.webp'),
                title: (bookName.value = ' 몇자일까요오오오오오'),
                publisher: (publisher.value = '민음사'),
                writer: (writer.value = '김동동'),
                commentNum: (commentNum.value = '2'),
                recommender: require('@/assets/img/profile/test.jpg'),
                edit,
                master,
                isHovered: false,
            },
            {
                img: require('@/assets/img/favorite/book28.webp'),
                title: (bookName.value = '효자손으로도 때리지 말라'),
                publisher: (publisher.value = '민음사'),
                writer: (writer.value = '김동동'),
                commentNum: (commentNum.value = '3'),
                recommender: require('@/assets/img/profile/test.jpg'),
                edit,
                master,
                isHovered: false,
            },
            {
                img: require('@/assets/img/favorite/book28.webp'),
                title: (bookName.value = '임금 인상을 요청하기 위해 과장에게 접근하는 기술과 방법'),
                publisher: (publisher.value = '민음사'),
                writer: (writer.value = '김동동'),
                commentNum: (commentNum.value = '4'),
                recommender: require('@/assets/img/profile/test.jpg'),
                edit,
                master,
                isHovered: false,
            },
            {
                img: require('@/assets/img/favorite/book28.webp'),
                title: (bookName.value = '에피쿠로스 쾌락 6'),
                publisher: (publisher.value = '민음사'),
                writer: (writer.value = '김동동'),
                commentNum: (commentNum.value = '4'),
                recommender: require('@/assets/img/profile/test.jpg'),
                edit,
                master,
                isHovered: false,
            },
            {
                img: require('@/assets/img/favorite/book28.webp'),
                title: (bookName.value = '에피쿠로스 쾌락 7'),
                publisher: (publisher.value = '민음사'),
                writer: (writer.value = '김동동'),
                commentNum: (commentNum.value = '5'),
                recommender: require('@/assets/img/profile/test.jpg'),
                edit,
                master,
                isHovered: false,
            },
            {
                img: require('@/assets/img/favorite/book28.webp'),
                title: (bookName.value = '에피쿠로스 쾌락 7'),
                publisher: (publisher.value = '민음사'),
                writer: (writer.value = '김동동'),
                commentNum: (commentNum.value = '5'),
                recommender: require('@/assets/img/profile/test.jpg'),
                edit,
                master,
                isHovered: false,
            },
            {
                img: require('@/assets/img/favorite/book28.webp'),
                title: (bookName.value = '에피쿠로스 쾌락 7'),
                publisher: (publisher.value = '민음사'),
                writer: (writer.value = '김동동'),
                commentNum: (commentNum.value = '5'),
                recommender: require('@/assets/img/profile/test.jpg'),
                edit,
                master,
                isHovered: false,
            },
            {
                img: require('@/assets/img/favorite/book28.webp'),
                title: (bookName.value = '에피쿠로스 쾌락 7'),
                publisher: (publisher.value = '민음사'),
                writer: (writer.value = '김동동'),
                commentNum: (commentNum.value = '5'),
                recommender: require('@/assets/img/profile/test.jpg'),
                edit,
                master,
                isHovered: false,
            },
        ])
        
        // 데이터 매핑
        isFavoriteBookList = bookList;

        // 추천 책 설정 창 on/off
        const doMouseOver = (index) => {
            bookList[index].isHovered = true;
        };
        const doMouseLeave = (index) => {
            bookList[index].isHovered = false;
        };

        // 추천 책 리스트/작성,수정 전환
        const changeFavoriteType = (index) => {
            resetInputs();
            isFavoriteBookStatus.value = index;

        }

        ///////////////////////////////////////////
        // 추천 책 글쓰기
        ///////////////////////////////////////////
        const resetInputs = () => {
            emptyImg.value = true;
            bookTitle.value = '';
            bookPub.value = '';
            bookCate.value = '';
        };
    
        // 추천 책 이미지 업로드
        const base64 = (file) => {
            return new Promise((resolve) => {
                let reader = new FileReader();
                reader.onload = (e) => {
                    resolve(e.target.result);
                    if (previewImage.value) {
                        previewImage.value.src = e.target.result;
                        emptyImg.value = false; // 이미지가 업로드되었으므로 emptyImg를 false로 설정
                    }
                    
                };
                reader.readAsDataURL(file);
            });
        };

        const uploadImg = async (files) => {
            fileName.value = files[0];
            
            await base64(fileName.value);
        }

        const handleFileUpload = (event) => {
            const files = event.target.files;
            if (files.length > 0) {
                uploadImg(files);
            } else {
                emptyImg.value = true; // 이미지가 업로드되었으므로 emptyImg를 false로 설정
            }
        };


        return {
            isFavoriteBookStatus,
            isFavoriteBookList,
            editMode,
            chWriteBtnTxt,
            emptyImg,
            bookTitle,
            bookPub,
            bookCate,
            fileName,
            previewImage,
            doMouseOver,
            doMouseLeave,
            changeFavoriteType,   
            resetInputs,
            uploadImg, 
            base64,
            handleFileUpload
        };
    },
    components: {
        QuillEditor
    }
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
.favorite {
    /*
     font-family: 'Hahmlet-Regular';
    */
    height: 100%;
    position: relative;
    &_inner {
        width: 100%;
        height: 90%;
        overflow-y: auto;
        display: flex;
        justify-content: center;
        position: relative;
        box-sizing: content-box;
        gap: 20px;
        &.-view{
            height: 100%;
        }
        /* 스크롤바 설정*/
        &::-webkit-scrollbar {
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
        &::-webkit-scrollbar-track {
            background-color: rgba(0, 0, 0, 0);
        }
    }
    &_list {
        width: 90%;
        margin: 0 auto;
        height: calc(100% - 35px);
        padding: 20px 0;
        > ul {
            display: grid;
            grid-template-columns: 20% 20% 20% 20% 20%;
            > li {
                margin: 0 20px 40px;
                > dl {
                    > dt {
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
                    > dd {
                        display: flex;
                        margin-top: 5px;
                        font-size: 13px;
                        color: #424242;
                        letter-spacing: -0.01em;
                    }
                }
                & .fav_img {
                    position: relative;
                    cursor: pointer;
                    width: fit-content;
                    > img {
                        max-width: 191px;
                        border-radius: 18px;
                    }
                }
                & .fav_hover {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    width: 100%;
                    height: 100%;
                    z-index: 1;

                    .fav_hover_inner {
                        position: relative;
                        z-index: 2;
                        color: #fff;
                        min-width: 150px;
                        height: 100%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        flex-direction: column;

                        > div {
                            margin-bottom: 10px;
                        }

                        button {
                            position: relative;
                            z-index: 2;
                            color: #fff;
                            min-width: 150px;
                        }

                        .bt {
                            position: absolute;
                            margin-bottom: 0;
                            bottom: 15px;
                            z-index: 1;
                        }
                        
                    }
                    &:before{
                        position: absolute;
                        content:'';
                        z-index: 1;
                        top: 0;
                        left: 0;
                        right: 0;
                        width: 100%;
                        height: 100%;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        border-radius: 18px;
                        content: "";
                        display: block;
                        background: rgba(0,0,0,.8)
                    }
                }
                .fav_recommender {
                    position: absolute;
                    bottom: 0;
                    right: 0;
                    z-index: 1;
                    background: rgba($color: #dfdfdf, $alpha: 0.8);
                    backdrop-filter: blur(15px);
                    padding: 8px 0 0 8px;
                    border-radius: 32.5px 0 14.5px 0;

                }
                .fav_profile {
                    width: 48px;
                    height: 48px;
                    overflow: hidden;
                    position: relative;
                    display: block;
                    border-radius: 50%;
                    background-color: #eee;
                }
                .fav_title {
                    width: 80%;
                    word-break: break-word;
                }
                .fav_pub {
                    &::after {
                        position: relative;
                        top: -1px;
                        padding: 0 5px;
                        content: '|';
                        color: #999;
                    }
                }
                .fav_comment {
                    width: 17%;
                    margin-left: 3%;
                    position: relative;
                    &::after {
                        position: absolute;
                        z-index: 1;
                        top: 0;
                        left: 0;
                        right: 0;
                        display: block;
                        width: 15px;
                        height: 15px;
                        content: '';
                        background: url('/src/assets/img/icon/ico-comment.webp') no-repeat 100% 100% / cover;
                    }
                }
                .fav_comment_num {
                    padding-left: 16px;
                    font-size: 12px;
                }
            }
        }
    }
    &_form{
        width: 100%;
        .form-container {
            max-width: 100%;
            height: 100%;
            margin: 0 auto;
            padding: 20px;
            background-color: #333; /* Dark form background color */
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
            display: flex;
            flex-direction: row;
            & .form-left{
                width: 70%;
                height: 100%;
                > ul {
                    height: 100%;
                    > li {
                        width: 100%;
                        margin-bottom: 10px;
                        &.hc{
                            height: 55%;
                        }
                        label {
                            width: 10%;
                            display: inline-block;
                            font-size: 16px;
                            color: #bbb; /* Label color for dark mode */
                        }
                        input,
                        .editerArea{
                            display: inline-block;
                            vertical-align: middle;
                            width: 85%;
                            height: 100%;
                        }
                    }
                }
            }
            
            & .form-right{
                width: 30%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                
                .uploadImg{
                    > img{
                        max-width: 210px;
                    }
                }
                & .dfTxt{
                    font-size: 16px;
                    color: #fff;
                    text-align: center;
                }
            }
        }

        input,
        textarea {
            width: 100%;
            padding: 10px;
            font-size: 16px;
            border: 1px solid #555; /* Border color for dark mode */
            border-radius: 5px;
            background-color: #444; /* Input background color for dark mode */
            color: #f2f2f2; /* Text color for dark mode */
            box-sizing: border-box;
        }

        input[type="checkbox"],
        input[type="radio"] {
            display: none;
        }

        .checkbox-label,
        .radio-label {
            position: relative;
            cursor: pointer;
            padding-left: 25px;
        }

        .checkmark {
            position: absolute;
            top: 0;
            left: 0;
            width: 18px;
            height: 18px;
            border: 2px solid #666; /* Border color for dark mode */
            border-radius: 3px;
        }

        input[type="checkbox"]:checked + .checkmark,
        input[type="radio"]:checked + .checkmark {
            background-color: #007aff;
            border: 2px solid #007aff;
        }

        .checkmark:after {
        content: "";
            position: absolute;
            display: none;
        }

        input[type="checkbox"]:checked + .checkmark:after,
        input[type="radio"]:checked + .checkmark:after {
            display: block;
        }

        input[type="checkbox"]:checked + .checkmark:after {
            left: 6px;
            top: 2px;
            width: 4px;
            height: 8px;
            border: solid white;
            border-width: 0 2px 2px 0;
            transform: rotate(45deg);
        }

        input[type="radio"]:checked + .checkmark:after {
            left: 5px;
            top: 5px;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background-color: white;
        }

        > button {
            background-color: #007aff; /* Button background color for dark mode */
            color: #f2f2f2; /* Text color for dark mode */
            border: none;
            padding: 10px 20px;
            font-size: 16px;
            border-radius: 5px;
            cursor: pointer;
            margin-top: 10px;
        }

        button:hover {
            background-color: #0056b3; /* Button background color for dark mode on hover */
        }
    }

    .btRightBtn{
        position:absolute;
        bottom: 5px;
        right: 10px;
        z-index: 1;
    }
    .cool-button{
        border: none;
        cursor: pointer;
        border-radius: 5px;
        box-sizing: border-box;
        background: #6E6D70;
        border: 0.5px solid rgba(0, 0, 0, 0.12);
        box-shadow: 0px 0.5px 1px rgba(0, 0, 0, 0.1), inset 0px 0.5px 0.5px rgba(255, 255, 255, 0.5);
        border-radius: 6px;
        transition: all 0.2s ease-in-out;

        display: block;
        padding: 15px 30px;
        font-size: 14px;
        color: #fff;
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
    .ql-toolbar,
    .ql-container{
        display: inline-block;
        width: 100%;
        background-color: #dddddd;
        box-sizing: border-box;
        strong{
            font-weight: bold;
        }
        em{
            font-style: italic;
        }
    }
    .ql-toolbar{
        height: 13%;
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
        &.ql-snow{
            border-left-width: 0;
            border-right-width: 0;
            border-color: #555;
        }
    }
    .ql-container{
        height: 87%;
        border-top-left-radius: 0;
        border-top-right-radius: 0;
    }
}


</style>
