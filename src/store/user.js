import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
    state: () => ({
        memberIdx: '1',
        name: '홍길동',
        profileImg: '/src/assets/img/profile/profile_df.webp',
    }),
    actions: {
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
});
