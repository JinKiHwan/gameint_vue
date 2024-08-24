<template>
    <div class="favorite">
        <div
            class="favorite_inner"
            v-bind:class="{
                '-write': isFavoriteBookStatus === 1,
                '-view': isFavoriteBookStatus === 2,
            }">
            <!--[s] 책 추천 리스트-->
            <div class="favorite_list" v-if="isFavoriteBookStatus == 0">
                <ul v-if="isFavoriteBookListLoading">
                    <li v-for="(info, index) in isFavoriteBookList" :key="index">
                        <div class="fav_img" @mouseover="doMouseOver(index)" @mouseleave="doMouseLeave(index)" @touchstart="doMouseOver(index)" @touchend="doMouseLeave(index)">
                            <img :src="`${info.bookImage}`" />
                            <div class="fav_recommender">
                                <span class="fav_profile">
                                    <img :src="`${info.profileImage}`" />
                                </span>
                            </div>
                            <div v-show="info.isHovered" class="fav_hover">
                                <div class="fav_hover_inner">
                                    <div v-if="info.edit">
                                        <button type="button" class="cool-button btn-blue" @click="changeFavoriteType(1, 'edit', info)">내용 수정</button>
                                    </div>
                                    <div>
                                        <button type="button" class="cool-button btn-green" @click="changeFavoriteType(2, 'read', info)">글 보기</button>
                                    </div>
                                    <div v-if="info.master" class="bt">
                                        <button type="button" class="cool-button btn-red" @click="selBook(index, info)">책 당선</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <dl>
                            <dt>
                                <div class="fav_title">
                                    {{ info.bookTitle }}
                                </div>
                                <!-- <div class="fav_comment">
                                    <span class="fav_comment_num">
                                        {{ info.commentNum }}
                                    </span>
                                </div> -->
                            </dt>
                            <dd>
                                <span class="fav_pub">
                                    {{ info.bookPublisher }}
                                </span>
                                <span class="fav_wri">
                                    {{ info.bookAuthor }}
                                </span>
                            </dd>
                        </dl>
                    </li>
                </ul>
                <div v-else>목록이 없습니다.</div>
            </div>
            <!--[e] 책 추천 리스트-->

            <!--[s] 책 추천 작성/수정-->
            <div class="favorite_form" v-if="isFavoriteBookStatus == 1">
                <div class="form-container">
                    <div class="form-left">
                        <ul>
                            <li>
                                <label for="book_name">책 제목</label>
                                <input type="text" v-model.trim="bookTitle" placeholder="책 제목을 작성 해주세요." />
                            </li>
                            <li>
                                <label for="book_pub">출판사</label>
                                <input type="email" v-model.trim="bookPub" placeholder="출판사를 작성 해주세요." />
                            </li>
                            <li>
                                <label for="book_pub">작가</label>
                                <input type="email" v-model.trim="author" placeholder="작가명을 작성 해주세요." />
                            </li>
                            <li>
                                <label for="book_cate">카테고리</label>
                                <input type="text" v-model.trim="bookCate" placeholder="카테고리를 작성 해주세요." />
                            </li>
                            <li class="hc">
                                <label for="message">추천 이유</label>
                                <div class="editerArea">
                                    <QuillEditor v-model:content="bookContent" ref="quillEditor" :options="editorOption" />
                                </div>
                                <textarea v-if="false" id="preview" v-html="bookContent"></textarea>
                            </li>
                            <li>
                                <label for="book_img">책 이미지</label>
                                <div class="bookAddArea">
                                    <input type="text" :disabled="emptyImg === false" v-model.trim="previewImage" placeholder="책 이미지 URL을 넣어주세요." />
                                    <button v-if="emptyImg === true" type="button" @:click="actCopyImgSrc('preview')">미리보기</button>
                                    <button v-else type="button" @:click="actCopyImgSrc('cancle')">취소</button>
                                    <p class="tipTxt">※ Yes24/영풍/교보 홈페이지에서 책 이미지 오른쪽 클릭 ▷ <b>이미지 주소</b> 복사</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="form-right">
                        <label v-show="emptyImg != true" class="uploadImg">
                            <img v-bind:src="previewImage" />
                        </label>
                        <p v-show="emptyImg" class="dfTxt">책 이미지 URL를 첨부해주세요</p>
                    </div>
                </div>
            </div>
            <!--[e] 책 추천 작성/수정-->

            <!--[s] 책 추천 글 보기-->
            <div class="favorite_view" v-if="isFavoriteBookStatus == 2">
                <div class="favorite_bg">
                    <img :src="bookDetailInfo.bookImage" alt="" />
                </div>

                <div class="favorite_area">
                    <div class="favorite_book_img">
                        <figure>
                            <img :src="bookDetailInfo.bookImage" alt="" />
                        </figure>
                    </div>

                    <div class="favorite_book_reviews">
                        <div class="writerArea">
                            <div class="review_item">
                                <div class="review-li">
                                    <div class="user_profile">
                                        <figure>
                                            <img :src="bookDetailInfo.memberImage" :alt="bookDetailInfo.memberImage" />
                                        </figure>
                                        <!-- <span>{{ bookDetailInfo.bookAuthor }}</span> -->
                                    </div>
                                    <div class="user_review">
                                        <div v-html="bookDetailInfo.recommendReason" class="recommend_reason"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="comment">
                                <div class="block">
                                    <div class="block-header">
                                        <div class="title">
                                            <h2>댓글</h2>
                                            <div class="tag">{{ bookDetailInfo.commentCount }}</div>
                                            개
                                        </div>
                                    </div>
                                    <div class="writing">
                                        <input type="text" v-model="commentCreateVal" contenteditable="true" class="textarea" autofocus spellcheck="false" />
                                        <button type="submit" @click="createComment(bookDetailInfo.bookIdx)">등록</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="writerCommentArea">
                            <ul class="review_item">
                                <li v-for="(review, index) in bookDetailCommentInfo" :key="index" class="comment">
                                    <div class="user-banner">
                                        <div class="user">
                                            <div class="avatar">
                                                <img :src="review.memberImage" :alt="review.memberName" />
                                            </div>
                                            <h5>{{ review.memberName }}</h5>
                                        </div>
                                    </div>
                                    <div class="content">
                                        <p v-if="commentEdit !== index">{{ review.contents }}</p>
                                        <div v-else class="writing">
                                            <div contenteditable="true" class="textarea" autofocus spellcheck="false" v-html="review.contents"></div>
                                            <button type="button" @click.once="actComment('edit')">등록</button>
                                        </div>
                                    </div>
                                    <!-- <div v-if="review.memberName == userStore.name" class="writer_util">
                                        <button type="button" @click.once="editComment('edit', index)">수정</button>
                                        <span>|</span><button type="button" @click.once="editComment('del', index)">삭제</button>
                                    </div> -->
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <button class="history_back" @click="changeFavoriteType(0)">
                    <img :src="menuImg[0].img" alt="" />
                </button>
            </div>
            <!--[e] 책 추천 글 보기-->
        </div>

        <!-- [s] 버튼 영역 -->
        <div v-if="isFavoriteBookStatus != 2" class="btRightBtn">
            <div v-if="isFavoriteBookStatus === 0">
                <button type="button" @click.once="changeFavoriteType(1)" class="cool-button btn-blue">
                    <span> 글쓰기 </span>
                </button>
            </div>
            <div v-else>
                <button type="submit" class="cool-button btn-blue" @click.once="actFavoriteWrite()">
                    <span>
                        {{ chWriteBtnTxt }}
                    </span>
                </button>
                <button type="button" class="cool-button btn-black" @click.once="changeFavoriteType(0)">
                    <span> 취소 </span>
                </button>
            </div>
        </div>
        <!-- [e] 버튼 영역 -->
    </div>
</template>

<script>
///////////////////////////////////////////
// import
///////////////////////////////////////////
import { ref, computed, onMounted, reactive, toRaw, watch } from 'vue';
import { useUserStore } from '@/store/user';
import { QuillEditor } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import axios from 'axios';

export default {
    name: 'FavoriteBookComp',
    setup() {
        // 변수
        const apiHost = process.env.VUE_APP_API_URL;
        const userStore = useUserStore();
        const isFavoriteBookStatus = ref(0); // List : 0, Write/Edit : 1, View : 2
        const bookIdxSel = ref('');
        // const publisher = ref('');
        // const writer = ref('');
        // const category = ref('');
        // const commentNum = ref('');
        const bookTitle = ref('');
        const bookPub = ref('');
        const bookCate = ref('');
        const bookContent = ref('');
        const author = ref('');
        const fileName = ref(null);
        const previewImage = ref(null);
        const commentCreateVal = ref('');
        const menuImg = ref([{ img: require('@/assets/img/ico-back.webp') }]);

        const editorOption = {
            modules: {
                toolbar: [[{ header: [1, 2, 3, false] }], ['bold', 'italic', 'underline'], ['code-block'], [{ list: 'ordered' }, 'blockquote']],
            },
            placeholder: '추천 이유를 작성 해주세요.',
        };
        const quillEditor = ref(null); // QuillEditor 인스턴스 참조
        const favoriteBook = ref(require('@/assets/img/book01.webp'));

        let isFavoriteBookList = ref([]);
        let isFavoriteBookListArray = ref([]);
        let isFavoriteBookListLoading = ref(false);

        let master = ref(false); // 마스터 시 true
        let editMode = ref(false); // 본인 작성 글 true
        let emptyImg = ref(true);
        let edit = ref(false); // 본인 작성 글 true
        let commentEdit = ref(false);

        ///////////////////////////////////////////
        // 공통
        ///////////////////////////////////////////
        const chWriteBtnTxt = computed(() => {
            return editMode.value ? '수정완료' : '작성완료';
        });

        ///////////////////////////////////////////
        // 추천 책 리스트
        ///////////////////////////////////////////
        const initRecomBookList = async () => {
            const url = `${apiHost}api/book/monthly/recommend/list`;
            try {
                const response = await axios.get(url, { withCredentials: true });

                if (response.data.code === 1) {
                    isFavoriteBookListArray.value = reactive(response.data.data);
                    isFavoriteBookList.value = toRaw(isFavoriteBookListArray.value);
                    isFavoriteBookList.value.forEach((book) => {
                        book.isHovered = false;
                        book.edit = false;
                        book.master = false;

                        // 계정이 마스터 시 true
                        if (book.memberIdx === 99) {
                            book.master = true;
                        }

                        // 본인이 쓴 글은 내용 수정 가능 true
                        if (book.memberIdx == userStore.memberIdx) {
                            book.edit = true;
                        }
                    });

                    console.log('List successful:', isFavoriteBookList.value);
                } else if (response.data.code === -1) {
                    //
                    alert('책이 없습니다');
                } else if (response.data.code === -2) {
                    alert('오류');
                } else {
                    // 기타 오류
                    alert(response.data.message || '알 수 없는 오류가 발생했습니다.');
                }
            } catch (error) {
                alert(error);
            } finally {
                isFavoriteBookListLoading.value = true;
            }
        };

        onMounted(() => {
            initRecomBookList();
        });

        // 추천 책 설정 창 on/off
        const doMouseOver = (index) => {
            isFavoriteBookList.value[index].isHovered = true;
        };
        const doMouseLeave = (index) => {
            isFavoriteBookList.value[index].isHovered = false;
        };

        // 추천 책 상세보기 (추천 이유 추출)
        const viewBookSelect = async (idx) => {
            try {
                //console.log(idx);
                const response = await axios.get(`${apiHost}api/book/monthly/recommend/${idx}`, { withCredentials: true });
                if (response.data.code === 1) {
                    quillEditor.value.setHTML(response.data.data.bookData.recommendReason);
                } else if (response.data.code === -1) {
                    console.log('통신실패 -1');
                } else if (response.data.code === -2) {
                    console.log('통신실패 -2');
                } else {
                    // 기타 오류
                    console.log('통신실패 etc');
                }
            } catch (err) {
                console.log('서버오류');
            }
        };

        // 추천 책 리스트/작성,수정 전환
        const changeFavoriteType = (index, type, data) => {
            if (type == 'edit') {
                console.log(data);
                bookTitle.value = data.bookTitle;
                bookPub.value = data.bookPublisher;
                author.value = data.bookAuthor;
                bookCate.value = data.bookCategory;

                // edit모드 중인 책 idx
                bookIdxSel.value = data.bookIdx;

                viewBookSelect(data.bookIdx);
                previewImage.value = data.bookImage;
                actCopyImgSrc('preview');

                // 수정모드 ON ( 버튼 명칭 )
                editMode.value = true;
            } else if (type === 'read') {
                getFavoriteBookDetail(data);
            } else {
                resetInputs();
            }

            isFavoriteBookStatus.value = index;
        };

        const selBook = (index, info) => {
            index = index + 1;
            alert('[' + info.title + '] 가(이)\n당선이오  (해당 리스트에 ' + index + '번 책)');
        };
        ///////////////////////////////////////////
        // 추천 책 글쓰기
        ///////////////////////////////////////////
        const resetInputs = () => {
            emptyImg.value = true;
            bookTitle.value = '';
            bookPub.value = '';
            bookCate.value = '';
            commentCreateVal.value = '';
        };
        const actCopyImgSrc = (type) => {
            if (previewImage.value === null) {
                alert('책 이미지 URL을 넣어주세요.');
                return;
            }

            if (type == 'preview') {
                emptyImg.value = false;
            } else if (type == 'cancle') {
                emptyImg.value = true;
            }
        };

        var bookDetailInfo = ref({});
        var bookDetailCommentInfo = ref({});

        const getFavoriteBookDetail = async (data) => {
            var bookIdx = data.bookIdx;
            try {
                const response = await axios.get(`${apiHost}api/book/monthly/recommend/${bookIdx}`, {
                    withCredentials: true,
                });
                console.log(response.data);
                if (response.data.code === 1) {
                    bookDetailInfo.value.bookIdx = bookIdx;
                    bookDetailInfo.value.bookImage = response.data.data.bookData.bookImage;
                    bookDetailInfo.value.memberImage = response.data.data.bookData.memberImage;
                    bookDetailInfo.value.recommendReason = response.data.data.bookData.recommendReason;
                    bookDetailInfo.value.commentCount = response.data.data.bookData.commentCount;

                    if (response.data.data.commentData.length > 0) {
                        // for(var i = 0; i < response.data.data.commentData.length; i++) {
                        // }
                        bookDetailCommentInfo.value = response.data.data.commentData;
                        //console.log(bookDetailCommentInfo.value);
                    }

                    if (response.data.data.commentData.length == 0) {
                        bookDetailCommentInfo.value = null;
                    }
                }

                //changeFavoriteType(0);
            } catch (error) {
                console.error('Error uploading file:', error);
            }
        };

        const actFavoriteWrite = async () => {
            if (bookTitle.value == '' || bookPub.value == '' || bookCate.value == '' || author.value == '') {
                alert('빈 입력 폼을 작성해 주세요.');
            } else if (bookContent.value == '') {
                alert('추천 이유를 작성 해주세요.');
            } else if (previewImage.value == null) {
                alert('책 이미지를 첨부 해주세요.');
            } else {
                var apiUrl = null;

                if (editMode.value) {
                    if (bookIdxSel.value) {
                        // 이달의 책 추천 수정
                        apiUrl = `${apiHost}api/monthly/recommend/` + bookIdxSel.value + '/update';
                    } else {
                        alert('잘못 된 경로로 접근 하셨습니다.');
                        return;
                    }
                } else {
                    // 이달의 책 추천 등록
                    apiUrl = `${apiHost}api/book/monthly/recommend/create`;
                }
                const jsonPayload = {
                    bookImage: previewImage.value,
                    bookTitle: bookTitle.value,
                    publisher: bookPub.value,
                    category: bookCate.value,
                    recommendReason: quillEditor.value.getHTML(),
                    author: author.value,
                };
                console.log(jsonPayload);
                try {
                    const response = await axios.post(apiUrl, jsonPayload, {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        withCredentials: true,
                    });
                    console.log(response.data);
                    if (response.data.code === -6) {
                        // 책 작성 불가능한 멤버일 경우
                        alert('아직 책 추천이 불가능합니다!');
                    } else if (response.data.code === -4) {
                        // 책 중복 작성할 경우
                        alert('이미 추천했습니다!');
                    } else if (response.data.code === -1) {
                        alert('로그인 먼저 해주세요!')
                    } else if (response.data.code === -5) {
                        alert('아직 책 추천 기간이 아닙니다.')
                    } else if (response.data.code === -3) {
                        alert('알 수 없는 에러')
                    } 
                    //changeFavoriteType(0);
                } catch (error) {
                    console.error('Error uploading file:', error);
                } finally {
                    isFavoriteBookStatus.value = 0;
                }
            }
        };

        const createComment = async (bookIdx) => {
            event.preventDefault(); // 기본 동작 방지

            if (userStore.isLogin === false) {
                alert('댓글 기능은 회원만 가능합니다!');
                return;
            }

            const jsonPayload = {
                bookIdx: bookIdx,
                contents: commentCreateVal.value,
            };
            console.log(jsonPayload);

            const browserUpdate = {
                contents: commentCreateVal.value,
                memberImage: userStore.profileImg,
                memberName: userStore.name,
            };

            try {
                const response = await axios.post(`${apiHost}api/comment/create`, jsonPayload, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                });
                if (response.data.code === 1) {
                    console.log('1', browserUpdate);
                    commentCreateVal.value = '';
                } else if (response.data.code === -1) {
                    console.log('-1');
                }

                //changeFavoriteType(0);
            } catch (error) {
                console.error('Error uploading file:', error);
            } finally {
                console.log(bookDetailCommentInfo.value?.length === 0, '댓글몇개');
                browserUpdate.value = '';

                var data;

                for await (var isFavoriteBook of isFavoriteBookList.value) {
                    if (isFavoriteBook.bookIdx === bookIdx) {
                        data = isFavoriteBook;
                    }
                }
                console.log('data test ', data);
                changeFavoriteType(2, 'read', data);
            }
        };

        watch(
            () => bookDetailCommentInfo.value,
            (newCommentData) => {
                // bookDetailCommentInfo 변경 시 화면 업데이트
                console.log('Comment data changed:', newCommentData);
            }
        );

        // 댓글 등록
        const actComment = (type) => {
            if (type == 'edit') {
                alert('댓글 수정 등록');
            } else {
                alert('댓글 등록');
            }
        };
        // 댓글 수정 / 삭제
        const editComment = (type, index) => {
            if (type == 'edit') {
                console.log(index);
                commentEdit.value = index;
            } else if (type == 'del') {
                alert('댓글 삭제');
            }
        };
        return {
            bookIdxSel,
            userStore,
            favoriteBook,
            isFavoriteBookStatus,
            isFavoriteBookList,
            isFavoriteBookListArray,
            isFavoriteBookListLoading,
            master,
            edit,
            editMode,
            commentEdit,
            chWriteBtnTxt,
            emptyImg,
            bookTitle,
            bookPub,
            bookCate,
            bookContent,
            author,
            fileName,
            previewImage,
            editorOption,
            bookDetailInfo,
            quillEditor,
            initRecomBookList,
            doMouseOver,
            doMouseLeave,
            changeFavoriteType,
            resetInputs,
            actCopyImgSrc,
            editComment,
            actComment,
            selBook,
            actFavoriteWrite,
            getFavoriteBookDetail,
            bookDetailCommentInfo,
            commentCreateVal,
            createComment,
            menuImg,
            viewBookSelect,
        };
    },
    components: {
        QuillEditor,
    },
};
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

    &_bg {
        position: fixed;
        z-index: -1;
        width: 100%;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        filter: blur(15px) brightness(0.2);
        img {
            width: 100%;
            object-fit: cover;
        }
    }

    &_inner {
        width: 100%;
        height: 90%;
        overflow-y: auto;
        display: flex;
        justify-content: center;
        position: relative;
        box-sizing: content-box;
        gap: 20px;

        &.-view {
            height: 100%;
        }
        &.-write {
            height: 100%;
            background-color: #333; /* Dark form background color */
        }
        /* 스크롤바 설정*/
        &::-webkit-scrollbar {
            width: 8px;
        }

        /* 스크롤바 막대 설정*/
        &::-webkit-scrollbar-thumb {
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
    &_view {
        width: 100%;
    }
    &_area {
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        overflow: auto;
        display: flex;
        position: relative;
        padding: 10px;
        gap: 30px;
    }
    &_list {
        width: 90%;
        margin: 0 auto;
        height: calc(100% - 35px);
        padding: 20px 0;
        > ul {
            display: grid;
            grid-template-columns: 20% 20% 20% 20% 20%;
            @include mobile() {
                grid-template-columns: 33% 33% 33%;
            }
            @include mobile-mini() {
                grid-template-columns: 50% 50%;
            }
            > li {
                margin: 0 20px 40px;
                display: flex;
                flex-direction: column;
                justify-content: flex-end;

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
                        @include custom(1200px) {
                            min-width: auto;
                        }
                        > div {
                            margin-bottom: 10px;
                        }

                        button {
                            position: relative;
                            z-index: 2;
                            color: #fff;
                            min-width: 150px;

                            @include custom(1200px) {
                                min-width: auto;
                            }
                        }

                        .bt {
                            position: absolute;
                            margin-bottom: 0;
                            bottom: 15px;
                            z-index: 1;
                        }
                    }
                    &:before {
                        position: absolute;
                        content: '';
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
                        content: '';
                        display: block;
                        background: rgba(0, 0, 0, 0.8);
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
                    border-radius: 32.5px 0 0 0;
                }
                .fav_profile {
                    width: 48px;
                    height: 48px;
                    overflow: hidden;
                    position: relative;
                    display: block;
                    border-radius: 50%;
                    background-color: #eee;
                    @include mobile() {
                        width: 30px;
                        height: 30px;
                    }
                }
                .fav_title {
                    width: 80%;
                    word-break: break-word;
                    display: inline-block;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    overflow: hidden;
                    @include mobile() {
                        font-size: 12px;
                        line-height: 20px;
                    }
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
                    @include mobile() {
                        position: relative;
                        top: 10px;
                        padding-left: 0;
                    }
                }
            }
        }
    }
    &_form {
        width: 100%;
        height: 100%;
        .form-container {
            max-width: 100%;
            height: 100%;
            margin: 0 auto;
            padding: 20px;

            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
            display: flex;
            flex-direction: row;
            @include mobile() {
                flex-direction: column;
            }
            & .form-left {
                width: 70%;
                height: 100%;
                @include mobile() {
                    width: 100%;
                }
                > ul {
                    height: 100%;
                    > li {
                        width: 100%;
                        margin-bottom: 10px;
                        &.hc {
                            height: 55%;
                            @include mobile() {
                                height: 32%;
                                max-height: 32%;
                            }
                        }
                        label {
                            width: 10%;
                            display: inline-block;
                            font-size: 14px;
                            font-weight: bold;
                            color: #bbb; /* Label color for dark mode */
                            vertical-align: middle;
                            @include mobile() {
                                width: 100%;
                                display: block;
                                margin-bottom: 1vw;
                                font-size: 12px;
                            }
                        }

                        & .bookAddArea {
                            display: inline-block;
                            width: 85%;
                            justify-content: center;
                            align-items: center;
                            vertical-align: middle;
                            input {
                                &.wC {
                                    width: 70%;
                                }
                            }
                            button {
                                width: 14%;
                                margin-left: 1%;
                                height: 43px;
                                padding: 0 1%;
                                background: #ededed;
                                border-radius: 5px;
                                vertical-align: middle;
                            }
                            .tipTxt {
                                margin-top: 0.5vw;
                                color: #ddd;
                                font-size: 12px;
                            }
                        }
                        input,
                        .editerArea {
                            display: inline-block;
                            vertical-align: middle;
                            width: 85%;
                            height: 100%;
                            @include mobile() {
                                width: 100%;
                                font-size: 12px;
                                padding: 5px 10px;
                            }
                        }
                        .editerArea {
                            @include mobile() {
                                width: 100%;
                                font-size: 12px;
                                padding: 0;
                            }
                        }
                    }
                }
            }

            & .form-right {
                width: 30%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                @include mobile() {
                    display: none;
                    &.-show {
                        display: block;
                        position: fixed;
                        top: 0;
                        right: 0;
                        left: 0;
                        width: 100%;
                        z-index: 1;
                    }
                }
                .uploadImg {
                    > img {
                        max-width: 300px;
                    }
                }
                & .dfTxt {
                    font-size: 16px;
                    color: #fff;
                    text-align: center;
                    span {
                        font-size: 14px;
                    }
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

        input[type='checkbox'],
        input[type='radio'] {
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

        input[type='checkbox']:checked + .checkmark,
        input[type='radio']:checked + .checkmark {
            background-color: #007aff;
            border: 2px solid #007aff;
        }

        .checkmark:after {
            content: '';
            position: absolute;
            display: none;
        }

        input[type='checkbox']:checked + .checkmark:after,
        input[type='radio']:checked + .checkmark:after {
            display: block;
        }

        input[type='checkbox']:checked + .checkmark:after {
            left: 6px;
            top: 2px;
            width: 4px;
            height: 8px;
            border: solid white;
            border-width: 0 2px 2px 0;
            transform: rotate(45deg);
        }

        input[type='radio']:checked + .checkmark:after {
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
    &_book_img {
        width: 45%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin: auto 0;
        position: relative;

        p {
            text-align: center;
            font-size: 18px;
            margin-block: 10px;
        }
        figure {
            height: 70%;
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            img {
                object-fit: contain;
                height: 100%;
            }
        }
    }
    &_book_reviews {
        height: 100%;
        overflow: auto;
        width: 50%;
        padding: 8% 0;

        /* 스크롤바 설정*/
        &::-webkit-scrollbar {
            width: 0;
        }

        .writerArea {
            .review_item {
                display: flex;
                flex-direction: column;
                gap: 30px;
                height: 100%;
                overflow: auto;
                border-bottom: 2px solid #fff;
                padding-bottom: 25px;
                .review-li {
                    display: flex;
                    align-items: flex-start;
                    gap: 15px;

                    .user_profile {
                        position: relative;
                        border-radius: 50%;
                        overflow: hidden;
                        figure {
                            width: 100px;
                            aspect-ratio: 1/1;
                            border-radius: 50%;
                            overflow: hidden;
                            &.wC {
                                width: 60px;
                            }
                        }

                        /* span {
                            position: absolute;
                            left: 0;
                            top: 0;
                            width: 100%;
                            height: 100%;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            background: #000;
                            opacity: 0;
                            color: #fff;
                        }

                        &:hover {
                            span {
                                opacity: 1;
                            }
                        } */
                    }

                    .user_review {
                        line-height: 1.3;
                        color: #fff;
                        max-width: calc(100% - 115px);
                        align-self: center;
                        line-height: 1.3;
                        padding: 15px 10px;
                        background: #085f38;
                        border-radius: 10px;
                        word-break: break-word;
                        position: relative;

                        > div {
                            max-height: 100px;
                            overflow: auto;
                            &::-webkit-scrollbar {
                                width: 2px;
                            }
                            &::-webkit-scrollbar-thumb {
                                background-color: #333333;
                                /* 스크롤바 둥글게 설정    */
                                border-radius: 10px;
                                border: 7px solid #333;
                            }
                        }

                        &:before {
                            content: '';
                            display: block;
                            width: 10px;
                            height: 10px;
                            border-right: 10px solid #085f38;
                            border-left: 10px solid transparent;
                            border-bottom: 10px solid transparent;
                            position: absolute;
                            left: -20px;
                            top: 15px;
                        }
                    }
                }
            }
            .block {
                margin-top: 20px;
                &-header {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-bottom: 16px;
                    .title {
                        display: flex;
                        align-items: flex-start;
                        color: #fff;
                        .tag {
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            margin-left: 4px;
                            background: #f7f7f7;
                            color: #1c1c1c;
                            text-align: center;
                            padding: 0 4px;
                            letter-spacing: 0.04em;
                            text-transform: uppercase;
                            font-weight: 500;
                            font-size: 12px;
                            line-height: 16px;
                            border: 1px solid #e8e8e8;
                            border-radius: 96px;
                        }
                    }
                }
            }
        }

        .writerCommentArea {
            //height: calc(100% - 400px);
            //overflow-y: auto;
            .comment {
                display: grid;
                gap: 14px;
                padding-bottom: 12px;
                margin-bottom: 12px;
                border-bottom: 1px solid #e8e8e8;

                .user-banner {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    .user {
                        gap: 8px;
                        align-items: center;
                        display: flex;
                        color: #fff;
                        .avatar {
                            height: 32px;
                            width: 32px;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            border: 1px solid transparent;
                            position: relative;
                            border-radius: 100px;
                            font-weight: 500;
                            font-size: 13px;
                            line-height: 20px;
                            img {
                                max-width: 100%;
                                border-radius: 50%;
                            }
                            .stat {
                                display: flex;
                                position: absolute;
                                right: -2px;
                                bottom: -2px;
                                display: block;
                                width: 12px;
                                height: 12px;
                                z-index: 9;
                                border: 2px solid #ffffff;
                                border-radius: 100px;
                                &.green {
                                    background: #00ba34;
                                }
                                &.grey {
                                    background: #969696;
                                }
                            }
                        }
                    }
                }
                .writer_util {
                    display: flex;
                    justify-content: flex-end;
                    align-items: center;
                    > span {
                        font-size: 10px;
                        color: #fff;
                    }
                    button {
                        font-size: 12px;
                        padding: 0 8px;
                        color: #fff;
                        &:hover {
                            color: #0085ff;
                        }
                    }
                }
                p {
                    color: #fff;
                    font-size: 14px;
                    line-height: 24px;
                }
            }
        }

        .writing {
            display: flex;
            align-items: center;
            overflow: hidden;
            margin-bottom: 24px;
            .textarea {
                width: 83%;
                margin-right: 2%;
                padding: 12px;
                background: #ffffff;
                border: 1px solid #e8e8e8;
                border-radius: 8px;
                color: #585757;
                height: 80px;
                overflow-y: auto;
                appearance: none;
                border: 0;
                outline: 0;
                resize: none;
                font-size: 14px;
                line-height: 24px;
                &:focus-within {
                    border: 1px solid #0085ff;
                    box-shadow: 0px 0px 2px 2px rgba(0, 133, 255, 0.15);
                }
            }
            button {
                display: flex;
                align-items: center;
                justify-content: center;
                background: #6d6d6d;
                border-radius: 5px;
                color: #fff;
                font-size: 1.125rem;
                font-weight: 600;
                width: 15%;
                height: 80px;
                &:hover {
                    background-color: #42b883;
                }
            }
        }
    }
    .btRightBtn {
        position: absolute;
        bottom: 5px;
        right: 10px;
        z-index: 1;
        > div {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
        }
    }
    .cool-button {
        border: none;
        cursor: pointer;
        border-radius: 5px;
        box-sizing: border-box;
        background: #6e6d70;
        border: 0.5px solid rgba(0, 0, 0, 0.12);
        box-shadow: 0px 0.5px 1px rgba(0, 0, 0, 0.1), inset 0px 0.5px 0.5px rgba(255, 255, 255, 0.5);
        border-radius: 6px;
        transition: all 0.2s ease-in-out;

        display: block;
        padding: 15px 30px;
        font-size: 14px;
        color: #fff;
        @include mobile() {
            font-size: 12px;
            padding: 2vw 5vw;
        }
        &:hover,
        &.-active {
            &.btn-blue {
                background: #4b91f7;
            }
            &.btn-green {
                background: #0cbb7c;
            }
            &.btn-red {
                background: #fc0c0c;
            }
            &.btn-black {
                background: #000;
            }
        }
    }
    .ql-toolbar,
    .ql-container {
        display: inline-block;
        width: 100%;
        background-color: #dddddd;
        box-sizing: border-box;
        strong {
            font-weight: bold;
        }
        em {
            font-style: italic;
        }
    }
    .ql-toolbar {
        height: 13%;
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
        @include mobile() {
            height: 20%;
        }
        &.ql-snow {
            border-left-width: 0;
            border-right-width: 0;
            border-color: #555;
            & .ql-formats {
                @include mobile() {
                    margin-right: 0;
                }
            }
        }
    }
    .ql-container {
        height: 87%;
        border-top-left-radius: 0;
        border-top-right-radius: 0;
    }
    .history_back {
        position: absolute;
        left: 25px;
        bottom: 25px;
        width: 50px;
        aspect-ratio: 1/1;
        background: #35495e;
        border-radius: 50%;
        padding: 5px;
        &:hover {
            -webkit-animation: vibrate-1 0.3s linear infinite both;
            animation: vibrate-1 0.3s linear infinite both;
        }
    }
}
</style>
