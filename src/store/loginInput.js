import { defineStore } from 'pinia';

export const userLoginInput = defineStore('loginInput', {
    state: () => ({
        id: '123',
        pw: '456',
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
