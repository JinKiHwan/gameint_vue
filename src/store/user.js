import { defineStore } from 'pinia';

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
    },

    persist: true,
});
