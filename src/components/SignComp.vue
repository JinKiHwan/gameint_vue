<template>
    <div class="menu">
        <ul>
            <li class="home">
                <router-link to="/">
                    <figure>
                        <img :src="home" alt="" />
                    </figure>
                </router-link>
            </li>
            <li class="monthly">
                <router-link to="/">
                    <figure>
                        <img :src="monthly" alt="" />
                    </figure>
                </router-link>
            </li>
            <li class="recommend">
                <router-link to="/">
                    <figure>
                        <img :src="recommend" alt="" />
                    </figure>
                </router-link>
            </li>
            <li class="history">
                <router-link to="/">
                    <figure>
                        <img :src="history" alt="" />
                    </figure>
                </router-link>
            </li>
            <li class="mybooks">
                <router-link to="/">
                    <figure>
                        <img :src="mybooks" alt="" />
                    </figure>
                </router-link>
            </li>
            <li class="bookreviews">
                <router-link to="/">
                    <figure>
                        <img :src="bookreviews" alt="" />
                    </figure>
                </router-link>
            </li>
            <li class="place">
                <router-link to="/">
                    <figure>
                        <img :src="place" alt="" />
                    </figure>
                </router-link>
            </li>
            <li class="mypage" @click="popupOpen()">
                <a href="javascript:void(0)">
                    <figure>
                        <img :src="mypage" alt="" />
                    </figure>
                </a>
            </li>
        </ul>
    </div>

    <div class="dim"></div>
    <div class="popupLayout">
        <div class="popupLayout_header">
            <ul class="btnWraps">
                <li class="red"><router-link to="/"></router-link></li>
                <li class="yellow"><a href="javascript:void(0)"></a></li>
                <li class="green"><router-link to="/"></router-link></li>
            </ul>
        </div>

        <div class="popupLayout_inner">
            <div class="popupLayout_sign">
                <h2>회원가입z</h2>

                <div class="popupLayout_sign_profile">
                    <figure>
                        <img :src="profileImg" alt="" />
                    </figure>

                    <input type="file" id="editProfile" accept="image/png, image/webp, image/jpeg" @change="handleFileChange" />
                    <label for="editProfile" class="edit">
                        <img :src="pen" alt="" />
                    </label>
                </div>

                <div class="popupLayout_sign_input">
                    <dl>
                        <dt>ID</dt>
                        <dd>
                            <input type="text" v-model="userId" @input="validateId" placeholder="4~12자 의 영문과 숫자조합" />
                            <p v-if="isInvalidId">{{ isInvalidId }}</p>
                            <p v-if="isValidId">{{ isValidId }}</p>
                        </dd>
                    </dl>
                    <dl>
                        <dt>NAME</dt>
                        <dd><input type="text" v-model="username" /></dd>
                    </dl>
                    <dl>
                        <dt>PW</dt>
                        <dd>
                            <input type="password" v-model="password" @change="isPwCheck" @input="validatePw" />
                            <!-- <p v-if="isInvalidPw">{{ isInvalidPw }}</p>
                            <p v-if="isValidPw">{{ isValidPw }}</p> -->
                        </dd>
                    </dl>
                    <dl>
                        <dt>PW확인</dt>
                        <dd>
                            <input type="password" v-model="confirmPassword" @change="isPwCheck" />
                            <p class="alertTxt" v-if="passwordError">{{ passwordError }}</p>
                            <p class="passTxt" v-if="passwordConfirm">{{ passwordConfirm }}</p>
                        </dd>
                    </dl>
                    <dl>
                        <dt>Telegram</dt>
                        <dd><input type="text" v-model="telegram" placeholder="https://t.me/eljsh95" /></dd>
                    </dl>
                </div>

                <div class="popupLayout_sign_btn">
                    <button @click="handleSignup">가입하기</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';

export default {
    name: 'SignComp',

    setup() {
        /* 이미지 모음 */
        const home = ref(require('@/assets/img/home.webp'));
        const bookreviews = ref(require('@/assets/img/bookreviews.webp'));
        const history = ref(require('@/assets/img/history.webp'));
        const monthly = ref(require('@/assets/img/monthly.webp'));
        const mybooks = ref(require('@/assets/img/mybooks.webp'));
        const mypage = ref(require('@/assets/img/mypage.webp'));
        const place = ref(require('@/assets/img/place.webp'));
        const recommend = ref(require('@/assets/img/recommend.webp'));
        const profileImg = ref(require('@/assets/img/profile/profile_df.webp'));
        /* //이미지 모음 */

        /* 변수 모음 */
        const pen = ref('https://cdn-icons-png.flaticon.com/512/227/227104.png');
        const userId = ref('');
        const isInvalidId = ref('');
        const isValidId = ref('');
        const isIdValid = ref(false); //유효성 통과 상태체크
        const isInvalidPw = ref('');
        const isValidPw = ref('');
        const password = ref('');
        const confirmPassword = ref('');
        const passwordError = ref('');
        const passwordConfirm = ref('');
        const isPasswordValid = ref(false); //유효성 통과 상태체크

        const username = ref('');
        const telegram = ref('');
        /* //변수 모음 */

        /* 아이디 유효성 검사 */
        const validateId = () => {
            const alphanumericPattern = /^[A-Za-z0-9]+$/;
            const koreanPattern = /[가-힣]/;

            if (!userId.value) {
                isInvalidId.value = '';
                isValidId.value = '';
                isIdValid.value = false;
            } else if (koreanPattern.test(userId.value)) {
                isInvalidId.value = '영문 숫자만 가능';
                isValidId.value = '';
                isIdValid.value = false;
            } else if (!alphanumericPattern.test(userId.value)) {
                isInvalidId.value = '영문 숫자만 가능';
                isValidId.value = '';
                isIdValid.value = false;
            } else if (userId.value.length < 5) {
                isInvalidId.value = '너무 짧습니다.';
                isValidId.value = '';
                isIdValid.value = false;
            } else if (userId.value.length > 12) {
                isInvalidId.value = '너무 깁니다.';
                isValidId.value = '';
                isIdValid.value = false;
            } else {
                isInvalidId.value = '';
                isValidId.value = '굿';
                isIdValid.value = true;
            }
        };

        /* 비밀번호 유효성 검사 */
        const validatePw = () => {};

        /* 비밀번호 확인검사 */
        const isPwCheck = () => {
            if (!password.value || !confirmPassword.value) {
                passwordError.value = '';
                passwordConfirm.value = '';
                isPasswordValid.value = false;
            } else if (password.value !== confirmPassword.value) {
                passwordError.value = '비밀번호가 일치하지 않습니다.';
                passwordConfirm.value = '';
                isPasswordValid.value = false;
            } else {
                passwordError.value = '';
                passwordConfirm.value = '비밀번호가 일치합니다';
                isPasswordValid.value = true;
            }
        };

        /* 회원가입 버튼 */
        // const handleSignup = () => {
        //     console.log(isIdValid.value, isPasswordValid.value);

        //     if (!isIdValid.value || !isPasswordValid.value) {
        //         alert('입력폼 다시 확인 해주세요');
        //     } else {
        //         alert('가입성공!');
        //     }
        // };

        const handleSignup = async () => {
            if (!isIdValid.value || !isPasswordValid.value) {
                alert('입력폼을 다시 확인해 주세요');
            } else {
                try {
                    const response = await axios.post(
                        'http://localhost:8080/member/create',
                        {
                            name: username.value,
                            account: userId.value,
                            password: password.value,
                            telegram: telegram.value,
                        },
                        {
                            headers: {
                                'Content-Type': 'application/json',
                            },
                        }
                    );

                    if (response === 200) {
                        alert('가입성공!');
                    }
                } catch (error) {
                    alert('가입실패');
                }
            }
        };

        return {
            home,
            bookreviews,
            history,
            monthly,
            mybooks,
            mypage,
            place,
            recommend,
            profileImg,
            pen,
            userId,
            isInvalidId,
            isValidId,
            isIdValid,
            isInvalidPw,
            isValidPw,
            confirmPassword,
            passwordError,
            password,
            passwordConfirm,
            isPasswordValid,
            username,
            telegram,
            isPwCheck,
            validateId,
            validatePw,
            handleSignup,
        };
    },

    methods: {
        //파일 설정 및 용량 제한
        handleFileChange(event) {
            const file = event.target.files[0];
            if (file) {
                // MIME 타입 검사
                const validTypes = ['image/png', 'image/webp', 'image/jpeg'];
                if (!validTypes.includes(file.type)) {
                    alert('올바른 파일 형식을 선택해주세요 (png, webp, jpg, jpeg)');
                    event.target.value = ''; // 선택된 파일을 지웁니다
                    return;
                }

                // 파일 크기 검사 (5MB 제한 예시)
                const maxSize = 3 * 1024 * 1024; // 3MB
                if (file.size > maxSize) {
                    alert('파일 크기가 너무 큽니다. 최대 3MB까지 업로드할 수 있습니다.');
                    event.target.value = ''; // 선택된 파일을 지웁니다
                    return;
                }

                // 파일을 읽기 위한 FileReader 객체 생성
                const reader = new FileReader();

                // 파일이 성공적으로 읽힌 경우
                reader.onload = (e) => {
                    this.profileImg = e.target.result; // 선택된 파일을 이미지로 업데이트
                };

                // 파일을 읽기 시작
                reader.readAsDataURL(file);

                // 파일 처리 로직
                console.log('선택된 파일:', file);
            }
        },
    },
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
        width: min(550px, 45%);
        display: flex;
        flex-wrap: wrap;

        li {
            width: calc((100% - 6vw) / 4);
            aspect-ratio: 1/1;
            margin-left: 2vw;
            margin-bottom: 4vw;
            position: relative;
            background-size: cover;
            background-repeat: no-repeat;
            background-position: center center;

            &:hover {
                figure {
                    filter: brightness(0.5);
                    transform: scale(0.95);
                }
            }

            a {
                display: block;
                width: 100%;
                height: 100%;

                figure {
                    width: 100%;
                    height: 100%;
                    border-radius: 15px;
                    overflow: hidden;
                    transition: filter 0.3s, transform 0.3s;

                    img {
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                    }
                }
            }

            &::after {
                position: absolute;
                width: 100%;
                text-align: center;
                left: 50%;
                bottom: -1.5vw;
                transform: translateX(-50%);
                color: #fff;
                font-size: 16px;
            }

            &.home {
                &::after {
                    content: '홈';
                }
            }

            &.monthly {
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

    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 0.5s ease;
    }

    .fade-enter-from,
    .fade-leave-to {
        opacity: 0;
    }
}

.dim {
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 0;
    left: 0;
    top: 0;
}
.popupLayout {
    width: min(550px, 95%);
    height: auto;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background: rgba($color: #fff, $alpha: 0.5);
    backdrop-filter: blur(5px);
    border-radius: 15px;
    overflow: hidden;

    &_header {
        width: 100%;
        height: 35px;
        background: #fff;
        display: flex;
        align-items: center;
    }

    &_inner {
        margin: 0 auto;
        padding: 25px 25px 55px;
        width: min(700px, 100%);
        max-height: 50vh;
        overflow: auto;
        position: relative;

        &::-webkit-scrollbar {
            width: 5px; /* 스크롤바의 너비 */
        }

        &::-webkit-scrollbar-thumb {
            height: 10%; /* 스크롤바의 길이 */
            background: #2867dd; /* 스크롤바의 색상 */

            border-radius: 10px;
        }

        &::-webkit-scrollbar-track {
            background: rgba(0, 0, 0, 0.5); /*스크롤바 뒷 배경 색상*/
        }

        h2 {
            text-align: center;
            font-size: 45px;
            font-weight: 600;
            letter-spacing: -1px;
            margin-bottom: 15px;
        }
    }

    &_sign {
        &_profile {
            width: min(160px, 60%);
            aspect-ratio: 1/1;
            margin: 0 auto;
            position: relative;

            figure {
                width: 100%;
                height: 100%;
                border-radius: 50%;
                overflow: hidden;
                background: #fff;

                img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
            }

            #editProfile {
                display: none;
            }

            .edit {
                display: block;
                width: 35px;
                position: absolute;
                right: 0;
                bottom: 0;
                cursor: pointer;

                img {
                    width: 100%;
                }
            }
        }
        &_input {
            margin-top: 40px;
            display: flex;
            flex-direction: column;
            gap: 25px;

            dl {
                display: flex;
                justify-content: center;

                dt {
                    width: 100px;
                    font-size: 18px;
                    font-weight: 600;
                }

                dd {
                    //width , max-width
                    width: min(500px, calc(100% - 100px));
                    position: relative;
                    input {
                        width: 100%;
                        height: 35px;
                        border-radius: 5px;
                        border: 0;
                        padding-left: 10px;

                        &:focus {
                            outline-color: blueviolet;
                        }
                    }

                    .alertTxt {
                        color: #f00;
                        position: absolute;
                        left: 0;
                        bottom: -16px;
                    }
                    .passTxt {
                        color: green;
                        position: absolute;
                        left: 0;
                        bottom: -16px;
                    }
                }
            }
        }

        &_btn {
            text-align: center;
            margin: 25px auto 0;
            button {
                width: 70px;
                height: 35px;
                background: #ddd;
            }
        }
    }
}
</style>
