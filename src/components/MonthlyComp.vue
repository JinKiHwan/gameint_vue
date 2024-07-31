<template>
    <div class="monthly">
        <div class="monthly_inner">
            <div class="monthly_book_img">
                <p>{{ currentMonthBook }}</p>
                <figure>
                    <img :src="monthlyBook" alt="" />
                </figure>
            </div>

            <div class="monthly_book_info">
                <dl>
                    <dt>책 제목</dt>
                    <dd>{{ bookName }}</dd>
                </dl>

                <dl>
                    <dt>출판사</dt>
                    <dd>{{ publisher }}</dd>
                </dl>

                <dl>
                    <dt>카테고리</dt>
                    <dd>{{ category }}</dd>
                </dl>

                <dl>
                    <dt>추천인</dt>
                    <dd>{{ recommendUser }}</dd>
                </dl>

                <dl>
                    <dt>추천이유</dt>
                    <dd>{{ recommendReason }}</dd>
                </dl>
            </div>

            <button class="view_review">작성글보기 -></button>
            <button class="write_review">리뷰 작성하기</button>
        </div>
    </div>
</template>

<script>
import { ref, computed } from 'vue';

export default {
    name: 'MonthlyComp',

    setup() {
        const monthlyBook = ref(require('@/assets/img/book01.webp'));
        const currentMonthBook = computed(() => {
            const now = new Date();
            const year = now.getFullYear();
            const month = now.getMonth() + 1;
            return `${year}년 ${month}월의 책`;
        });

        const bookName = ref('');
        const publisher = ref('');
        const category = ref('');
        const recommendUser = ref('');
        const recommendReason = ref('');

        //데이터 여기에 넣으면 됩니당
        bookName.value = '심판';
        publisher.value = '열린책들';
        category.value = '희곡';
        recommendUser.value = '진기환';
        recommendReason.value = `계속 소설이 채택된다는 목소리가 나왔기에 다른 장르의 책을 추천해봅니다.읽은지 오래되어 자세히 기억이 나지는 않습니다만,뇌를 연구하는 물리학자 정재승이 인간의 뇌 구조를 기반으로 이런 저런 이야기를 적어놓은 책입니다.오늘 점심 뭐 먹지? 결정장애가 생기는 이유에서부터 사람이 미신에 빠져드는 이유까지흥미로운 주제를 한 사람의 주관이 아닌 인간의 뇌구조를 기반으로 설명해주니이런 장르에 관심이 없는 저도 굉장히 재밌게 읽을 수 있었습니다.계속 소설이 채택된다는 목소리가 나왔기에 다른 장르의 책을 추천해봅니다.읽은지 오래되어 자세히 기억이 나지는 않습니다만,뇌를 연구하는 물리학자 정재승이 인간의 뇌 구조를 기반으로 이런 저런 이야기를 적어놓은 책입니다.오늘 점심 뭐 먹지? 결정장애가 생기는 이유에서부터 사람이 미신에 빠져드는 이유까지흥미로운 주제를 한 사람의 주관이 아닌 인간의 뇌구조를 기반으로 설명해주니이런 장르에 관심이 없는 저도 굉장히 재밌게 읽을 수 있었습니다.계속 소설이 채택된다는 목소리가 나왔기에 다른 장르의 책을 추천해봅니다.읽은지 오래되어 자세히 기억이 나지는 않습니다만,뇌를 연구하는 물리학자 정재승이 인간의 뇌 구조를 기반으로 이런 저런 이야기를 적어놓은 책입니다.오늘 점심 뭐 먹지? 결정장애가 생기는 이유에서부터 사람이 미신에 빠져드는 이유까지흥미로운 주제를 한 사람의 주관이 아닌 인간의 뇌구조를 기반으로 설명해주니이런 장르에 관심이 없는 저도 굉장히 재밌게 읽을 수 있었습니다.계속 소설이 채택된다는 목소리가 나왔기에 다른 장르의 책을 추천해봅니다.읽은지 오래되어 자세히 기억이 나지는 않습니다만,뇌를 연구하는 물리학자 정재승이 인간의 뇌 구조를 기반으로 이런 저런 이야기를 적어놓은 책입니다.오늘 점심 뭐 먹지? 결정장애가 생기는 이유에서부터 사람이 미신에 빠져드는 이유까지흥미로운 주제를 한 사람의 주관이 아닌 인간의 뇌구조를 기반으로 설명해주니이런 장르에 관심이 없는 저도 굉장히 재밌게 읽을 수 있었습니다.`;

        return {
            monthlyBook,
            currentMonthBook,
            bookName,
            publisher,
            category,
            recommendUser,
            recommendReason,
        };
    },
};
</script>

<style lang="scss" scoped>
.monthly {
    height: 100%;
    &_inner {
        width: 100%;
        height: 100%;
        overflow: auto;
        display: flex;
        justify-content: center;
        position: relative;
        box-sizing: content-box;
        gap: 20px;
    }

    &_book_img {
        max-width: 45%;
        p {
            text-align: center;
            font-size: 18px;
            margin-block: 10px;
        }
        figure {
            height: 90%;
            display: flex;
            justify-content: center;
            align-items: center;
            img {
                object-fit: contain;
                height: 100%;
            }
        }
    }
    &_book_info {
        max-width: 40%;
        height: 100%;
        overflow: auto;
        display: flex;
        flex-direction: column;
        gap: 15px;
        padding-top: 40px;
        dl {
            display: flex;
            font-size: 18px;
            font-weight: 600;
            line-height: 1.3;

            dt {
                width: 80px;
            }

            dd {
                width: calc(100% - 80px);
                white-space: pre-wrap;
                position: relative;

                &::before {
                    content: ':';
                    position: absolute;
                    left: -10px;
                    top: 0;
                }
            }
        }
    }

    .view_review {
        position: absolute;
        right: 0;
        top: 0;
    }

    .write_review {
        position: absolute;
        right: 0;
        bottom: 0;
        width: 150px;
        height: 35px;
        background: #222;
        color: #fff;
    }
}
</style>
