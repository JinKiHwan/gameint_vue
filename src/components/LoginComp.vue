<template>
    <div class="dim"></div>
    <div class="popupLayout">
        <div class="popupLayout_header">
            <ul class="btnWraps">
                <li class="red" @click="closePopup"><a href="javascript:void(0)"></a></li>
                <li class="yellow"><a href="javascript:void(0)"></a></li>
                <li class="green" @click="closePopup"><a href="javascript:void(0)"></a></li>
            </ul>
        </div>

        <div class="popupLayout_inner">
            <!-- 로그인 전 -->
            <div class="popupLayout_login" v-if="!userStore.isLogin">
                <h2>로그인</h2>
                <div class="popupLayout_login_input">
                    <dl>
                        <dt>ID</dt>
                        <dd><input type="text" v-model="userId" /></dd>
                    </dl>
                    <dl>
                        <dt>PASS</dt>
                        <dd><input type="password" v-model="password" /></dd>
                    </dl>
                </div>

                <div class="popupLayout_login_btn">
                    <button @click="handleLogin">확인</button>
                </div>

                <!-- <figure class="faceId">
                    <img :src="faceId" alt="" />
                </figure> -->
            </div>

            <!-- 로그인 후 -->
            <div class="popupLayout_mypage" v-else>
                <div class="popupLayout_mypage_profile">
                    <figure>
                        <img :src="userStore.profileImg" :alt="userName" />
                    </figure>

                    <input type="file" id="editProfile" accept="image/png, image/webp, image/jpeg" @change="handleFileChange" />
                    <label for="editProfile" class="edit">
                        <img :src="pen" alt="" />
                    </label>
                </div>

                <p>
                    반갑습니다 <span>{{ userStore.name }}</span> 님!
                </p>

                <div class="popupLayout_mypage_btn">
                    <button>수정하기</button>
                    <button @click="logOut">로그아웃</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';

import { useUserStore } from '@/store/user';
import { userLoginInput } from '@/store/loginInput';

export default {
    name: 'LoginComp',

    setup() {
        const userStore = useUserStore();
        const loginInputStore = userLoginInput();
        const pen = ref('https://cdn-icons-png.flaticon.com/512/227/227104.png');
        const faceId = ref(require('@/assets/img/faceid.gif'));
        const imageSrc = ref('');
        const userName = ref('');
        const isIdValid = ref(true);
        const isPasswordValid = ref(true);
        const userId = ref('');
        const password = ref('');

        /* //////////////////// */
        /* ///로그인////////// */
        /* /////////////////// */
        const handleLogin = async () => {
            if (!isIdValid.value || !isPasswordValid.value) {
                alert('입력폼을 다시 확인해 주세요');
            } else {
                try {
                    const response = await axios.post(
                        'http://localhost:3000/api/member/sign-in',
                        {
                            account: userId.value,
                            password: password.value,
                        },
                        {
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            withCredentials: true, // 쿠키를 주고받을 수 있게 설정
                        }
                    );

                    if (response.data.code === 1) {
                        alert('로그인 성공!');
                        loginInputStore.id = userId.value;
                        loginInputStore.pw = password.value;

                        userStore.setLoginStatus(true); //로그인 상태 true

                        //user 상태 변경
                        userStore.setName(response.data.data.name);
                        userStore.setMemberIdx(response.data.data.memberIdx);

                        // 페이지 리로드
                        window.location.reload();

                        if (response.data.data.profileImg) {
                            userStore.setProfileImg(response.data.data.profileImg);
                        }

                        //imageSrc.value = response.data.profileImage;
                    } else {
                        alert('로그인 실패: ' + response.data.message);
                    }
                } catch (error) {
                    alert('로그인 오류: ' + error.message);
                }
            }
        };

        /* //////////////////// */
        /* ///로그아웃////////// */
        /* /////////////////// */
        const logOut = () => {
            // 쿠키(member) 삭제
            document.cookie = 'member=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';

            // Pinia 스토어 초기화
            userStore.$reset();

            // 로컬 스토리지에서 Pinia 상태 삭제
            localStorage.removeItem('user');

            // 페이지 리로드
            window.location.reload();
        };

        /* //////////////////// */
        /* ///팝업창 닫기/////// */
        /* /////////////////// */
        const closePopup = () => {
            userStore.loginPopup = false;
        };

        onMounted(() => {});

        return {
            faceId,
            imageSrc,
            userName,
            pen,
            handleLogin,
            isIdValid,
            isPasswordValid,
            userId,
            password,
            userStore,
            loginInputStore,
            logOut,
            closePopup,
        };
    },
};
</script>

<style lang="scss">
.dim {
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: -1;
    left: 0;
    top: 0;
}
.popupLayout {
    width: min(450px, 95%);
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
        padding: 25px 0 55px;
        width: min(700px, 95%);
        position: relative;

        h2 {
            text-align: center;
            font-size: 45px;
            font-weight: 600;
            letter-spacing: -1px;
            margin-bottom: 15px;
        }
    }

    &_login {
        &_input {
            margin-top: 40px;

            dl {
                display: flex;
                justify-content: center;
                &:nth-child(2) {
                    margin: 20px auto;
                }

                dt {
                    width: 50px;
                    font-size: 18px;
                    font-weight: 600;
                }

                dd {
                    //width , max-width
                    width: min(500px, calc(100% - 50px));

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
                }
            }
        }

        &_btn {
            position: absolute;
            right: 0;
            bottom: 15px;
            button {
                width: 70px;
                height: 35px;
                background: #ddd;
            }
        }

        .faceId {
            position: fixed;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background: #fff;
        }
    }

    &_mypage {
        &_profile {
            width: min(160px, 60%);
            aspect-ratio: 1/1;
            margin: 0 auto 30px;
            position: relative;
            figure {
                height: 100%;
                overflow: hidden;
                border-radius: 50%;

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
        p {
            text-align: center;
            font-size: 24px;

            span {
                font-weight: 600;
            }
        }

        &_btn {
            position: absolute;
            left: 50%;
            bottom: 15px;
            transform: translateX(-50%);
            font-weight: 600;
            display: flex;
            gap: 15px;
        }
    }
}
</style>
