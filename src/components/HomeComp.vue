<template>
    <div class="home">
        <div class="home_inner">
            <div class="home_main">
                <div class="home_main_title">
                    <p class="big" ref="big"><span>Expand your thoughts</span></p>
                    <p class="big" ref="big"><span>by communicating</span></p>
                    <p class="big" ref="big"><span>with books and opinions</span></p>

                    <p class="small" ref="small"><i>책과 의견을 소통하며 생각을 확장하다</i> <span></span></p>
                </div>
                <figure>
                    <img :src="oilpastelImg" alt="" />
                </figure>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, onMounted, reactive } from 'vue';
import { gsap } from 'gsap';

export default {
    name: 'homeComp',

    setup() {
        const oilpastelImg = require('@/assets/img/oilpastel.webp');
        const bigTitle = ref(null);
        const animations = reactive({
            titleAni: null,
        });

        onMounted(() => {
            const bigElements = gsap.utils.toArray('.big span');

            animations.titleAni = gsap
                .timeline()
                .set(bigElements, {
                    yPercent: 100,
                })
                .set('.home_main figure', {
                    transformOrigin: 'center',
                    scale: 0,
                    borderRadius: 0,
                })
                .set('.small i', {
                    opacity: 0,
                })
                .set('.small span', {
                    width: 0,
                })

                .to(bigElements, {
                    delay: 0.3,
                    yPercent: 0,
                })
                .to('.home_main figure', {
                    scale: 1,
                    duration: 1,
                    ease: 'power3.inOut',
                })
                .to('.home_main figure', {
                    borderRadius: 150,
                })
                .to(
                    '.small i',
                    {
                        delay: 0.3,
                        opacity: 1,
                    },
                    '<'
                )
                .to('.small span', {
                    width: '100%',
                });
        });

        return {
            oilpastelImg,
            bigTitle,
            animations,
        };
    },
};
</script>

<style lang="scss" scoped>
.home {
    background: #fff;
    height: 100%;
    overflow: auto;

    &_inner {
        width: 100%;
        padding: 0 10px;
    }

    &_main {
        width: 100%;
        aspect-ratio: 16/9;
        position: relative;

        &_title {
            position: absolute;
            z-index: 1;
            left: 50%;
            top: 30%;
            transform: translate(-50%, -50%);

            p {
                &.big {
                    font-size: 75px;
                    font-weight: 600;
                    letter-spacing: -1px;
                    white-space: nowrap;
                    overflow: hidden;
                    line-height: 1.4;
                    margin: -15px 0;

                    span {
                        display: block;
                    }
                }

                &.small {
                    margin-top: 50px;
                    font-size: 22px;
                    font-weight: 600;
                    position: relative;
                    display: inline-block;
                    z-index: 0;
                    //color: #fff;
                    text-shadow: 0 0 10px rgba($color: #fff, $alpha: 0.5);

                    span {
                        width: 105%;
                        height: 10px;
                        background: #30d158;
                        display: block;
                        position: absolute;
                        z-index: -1;
                        left: 50%;
                        bottom: -2px;
                        transform: translateX(-50%);
                        border-radius: 15px;
                        filter: blur(3px);
                    }
                }
            }
        }

        figure {
            width: 100%;
            aspect-ratio: 4/1;
            border-radius: 170px;
            overflow: hidden;
            filter: contrast(0.5);
            position: absolute;
            left: 0;
            top: 65%;
            transform: translateY(-50%);

            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }
    }
}
</style>
