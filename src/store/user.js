import { defineStore } from 'pinia';

// 쿠키를 확인하는 함수
function checkMemberCookie() {
    return document.cookie.split(';').some((item) => item.trim().startsWith('member='));
}

export const useUserStore = defineStore('user', {
    state: () => ({
        loginPopup: false,
        isLogin: false,
        memberIdx: null,
        name: null,
        profileImg: '/src/assets/img/profile/profile_df.webp',
    }),
    actions: {
        setLoginStatus(status) {
            this.isLogin = status;
        },
        setName(newName) {
            this.name = newName;
        },
        setProfileImg(newProfileImg) {
            this.profileImg = newProfileImg;
        },
        setMemberIdx(newMemberIdx) {
            this.memberIdx = newMemberIdx;
        },

        // 새로운 초기화 액션
        initializeStore() {
            if (!checkMemberCookie()) {
                this.$reset();
                localStorage.removeItem('user');
            }
        },
    },

    persist: true,
});
