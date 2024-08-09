<template>
    <div class="dim"></div>
    <div class="popupLayout">
        <div class="popupLayout_header">
            <ul class="btnWraps">
                <li class="red"><a href="javascript:void(0)" @click="emitClosePopup"></a></li>
                <li class="yellow"><a href="javascript:void(0)"></a></li>
                <li class="green"><a href="javascript:void(0)" @click="emitClosePopup"></a></li>
            </ul>
        </div>

        <div class="popupLayout_inner">
            <!-- 로그인 전 -->
            <div class="popupLayout_login" v-if="!isLogin">
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
            </div>

            <!-- 로그인 후 -->
            <div class="popupLayout_mypage" v-else>
                <div class="popupLayout_mypage_profile">
                    <figure>
                        <img :src="imageSrc" :alt="userName" />
                    </figure>

                    <input type="file" id="editProfile" accept="image/png, image/webp, image/jpeg" @change="handleFileChange" />
                    <label for="editProfile" class="edit">
                        <img :src="pen" alt="" />
                    </label>
                </div>

                <p>
                    반갑습니다 <span>{{ userId }}</span> 님!
                </p>

                <div class="popupLayout_mypage_btn">
                    <button>수정하기</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';

export default {
    name: 'LoginComp',

    props: {
        isLogin: {
            type: Boolean,
            required: true,
        },
    },

    emits: ['login-success', 'close-popup'], // 여기에 emits 옵션을 추가합니다

    setup(props, { emit }) {
        const pen = ref('https://cdn-icons-png.flaticon.com/512/227/227104.png');
        const imageSrc = ref('');
        const userName = ref('');
        const isIdValid = ref(true);
        const isPasswordValid = ref(true);
        const userId = ref('');
        const password = ref('');

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
                    console.log(response.data);

                    if (response.data.code === 1) {
                        alert('로그인 성공!');
                        imageSrc.value = response.data.profileImage;
                        emit('login-success', true); // 여기서 emit 함수 호출
                    } else {
                        alert('로그인 실패: ' + response.data.message);
                    }
                } catch (error) {
                    alert('로그인 오류: ' + error.message);
                }
            }
        };

        // onMounted(() => {
        //     checkLoginStatus();
        //     imageSrc.value = 'https://common-cdn-api.joycityglobal.com/community/gw/resources/images/content/left_menu/default-profile-after-login.png?v=231029';
        //     userName.value = '김기현';
        // });

        const emitClosePopup = () => {
            emit('close-popup');
        };

        onMounted(() => {
            //checkLoginStatus();
        });

        return {
            imageSrc,
            userName,
            pen,
            handleLogin,
            isIdValid,
            isPasswordValid,
            userId,
            password,
            emitClosePopup,
            //checkLoginStatus,
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
        }
    }
}
</style>
