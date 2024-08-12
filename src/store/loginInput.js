import { defineStore } from 'pinia';

export const userLoginInput = defineStore('loginInput', {
    state: () => ({
        id: '',
        pw: '',
    }),
    actions: {
        inputId(value) {
            this.id = value;
        },
        inputPw(value) {
            this.pw = value;
        },
    },
});
