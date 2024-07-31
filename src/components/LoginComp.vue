<template>
    <div class="dim"></div>
    <div v-show="popupState" class="popupLayout">
        <div class="popupLayout_header">
            <ul class="btnWraps">
                <li class="red"><a href="javascript:void(0)" @click="closePopup"></a></li>
                <li class="yellow"><a href="javascript:void(0)"></a></li>
                <li class="green"><a href="javascript:void(0)" @click="closePopup"></a></li>
            </ul>
        </div>

        <div class="popupLayout_inner">
            <!-- 로그인 전 -->
            <div class="popupLayout_login" v-if="!isLogin">
                <h2>로그인</h2>

                <div class="popupLayout_login_input">
                    <dl>
                        <dt>ID</dt>
                        <dd><input type="text" /></dd>
                    </dl>
                    <dl>
                        <dt>PASS</dt>
                        <dd><input type="password" /></dd>
                    </dl>
                </div>

                <div class="popupLayout_login_btn">
                    <button>확인</button>
                </div>
            </div>

            <!-- 로그인 후 -->
            <div class="popupLayout_mypage" v-if="isLogin">
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
                    반갑습니다 <span>{{ userName }}</span> 님!
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

export default {
    name: 'LoginComp',
    props: {
        popupState: Boolean,
    },
    emits: ['update:popupState'],

    methods: {
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
                    alert('파일 크기가 너무 큽니다. 최대 5MB까지 업로드할 수 있습니다.');
                    event.target.value = ''; // 선택된 파일을 지웁니다
                    return;
                }

                // 파일을 읽기 위한 FileReader 객체 생성
                const reader = new FileReader();

                // 파일이 성공적으로 읽힌 경우
                reader.onload = (e) => {
                    this.imageSrc = e.target.result; // 선택된 파일을 이미지로 업데이트
                };

                // 파일을 읽기 시작
                reader.readAsDataURL(file);

                // 파일 처리 로직
                console.log('선택된 파일:', file);
            }
        },

        closePopup() {
            this.$emit('update:popupState', false);
        },
    },

    setup() {
        const pen = ref('https://cdn-icons-png.flaticon.com/512/227/227104.png');
        const isLogin = ref(false);
        const imageSrc = ref('');
        const userName = ref('');

        const checkLoginStatus = () => {
            /* 로그인 상태 체크 */
            isLogin.value = false;
        };

        onMounted(() => {
            checkLoginStatus();
            imageSrc.value = 'https://common-cdn-api.joycityglobal.com/community/gw/resources/images/content/left_menu/default-profile-after-login.png?v=231029';
            userName.value = '김기현';
        });

        return {
            isLogin,
            imageSrc,
            userName,
            pen,
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
