import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
    state: () => ({
        memberIdx: null,
        name: null,
        profileImg: '/src/assets/img/profile/profile_df.webp',
    }),
    actions: {
        setName(newName) {
            this.name = newName;
            localStorage.setItem('userName', newName);
        },
        setProfileImg(newProfileImg) {
            this.profileImg = newProfileImg;
            localStorage.setItem('userProfileImg', newProfileImg);
        },
        setMemberIdx(newMemberIdx) {
            this.memberIdx = newMemberIdx;
            localStorage.setItem('userMemberIdx', newMemberIdx);
        },
        loadUserData() {
            this.name = localStorage.getItem('userName') || null;
            this.profileImg = localStorage.getItem('userProfileImg') || '/src/assets/img/profile/profile_df.webp';
            this.memberIdx = localStorage.getItem('userMemberIdx') || null;
        },
    },
});
