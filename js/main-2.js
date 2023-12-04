//swiper 변수선언
let swiperState;

//gsap js
const visualCon = document.querySelector('.visual-con');
const visualWrap = document.querySelector('.visual__wrap');
const circle = document.querySelector('.visual__circle');
const people = document.querySelectorAll('.visual__people');
const visualTitle = document.querySelector('.visual__title');
const visualBtn = document.querySelector('.visual-con .more-view-btn');

const introCon = document.querySelector('.intro-con');
const introTitle = document.querySelector('.intro-con .title-box__title');
const introText = document.querySelector('.intro-con .title-box__text');
const introImg = document.querySelector('.intro-con .intro__img-wrap');

const reviewCon = document.querySelector('.review-con');
const reviewTitle = document.querySelector('.review-con .title-box__title');
const reviewText = document.querySelector('.review-con .title-box__text');
const slideItem = document.querySelectorAll('.review-box');
const itemWidth = (slideItem[0].offsetWidth) + parseInt(window.getComputedStyle(slideItem[0]).getPropertyValue('margin-right'));

const satisCon = document.querySelector('.satis-con');
const satisTitle = document.querySelector('.satis-con .title-box__title');
const satisText = document.querySelector('.satis-con .title-box__text');
const satisGraph = document.querySelector('.content-wrap__graph');
const satisCnText = document.querySelectorAll('.content-wrap__right .content-text');

//초기 css세팅
slideItem.forEach((el, index) => {
    el.style.transform = `translateX(${itemWidth * (slideItem.length - index)}px)`;
})

function visualSection() {
    const tl = gsap.timeline();

    tl.to(circle, {
        duration: 0.3,
        opacity: 1,
    }).to(people[0], {
        duration: 0.3,
        opacity: 1,
    }).to(people[1], {
        duration: 0.3,
        opacity: 1,
    }).to(visualTitle, {
        duration: 0.5,
        opacity: 1,
        y: 0,
    }).to(visualBtn, {
        duration: 0.5,
        opacity: 1,
        y: 0,
    })
}
visualSection();

window.addEventListener('scroll', () => {
    const scrollPoint = (window.innerHeight / 10) * 9; //evt 노출 위치값
    const visualScroll = visualCon.getBoundingClientRect().top;
    const introScroll = introTitle.getBoundingClientRect().top;
    const reviewScroll = reviewTitle.getBoundingClientRect().top;
    const satisScroll = satisTitle.getBoundingClientRect().top;
    const mediaWidth = window.matchMedia('(max-width:500px)').matches;

    //1st section
    gsap.to(visualWrap, {
        duration: 0.5,
        y: visualScroll < 0 ? (-visualScroll / 40) : "0",
    })
    if (window.matchMedia('(max-width:500px)').matches) {
        gsap.to(visualCon, {
            duration: 0.3,
            height: -visualScroll <= 500 ? 667 + (visualScroll / 3) : 500,
        })
    } else if (window.matchMedia('(max-width:1024px)').matches) {
        gsap.to(visualCon, {
            duration: 0.3,
            // height: -visualScroll <= 600 ? 768 + (visualScroll / 3) : 574,
            height: -visualScroll <= 500 ? 768 + (visualScroll / 3) : 601,
        })
    } else {
        gsap.to(visualCon, {
            duration: 0.3,
            height: -visualScroll <= 600 ? 840 + (visualScroll / 3) : 640,
        })
    }

    //2nd section
    if (introScroll <= scrollPoint) {
        let tl = gsap.timeline();
        tl.to(introTitle, {
            duration: 0.3,
            opacity: 1,
            y: 0,
        }).to(introText, {
            duration: 0.3,
            opacity: 1,
            y: 0,
        }).to(introImg, {
            duration: 0.3,
            opacity: mediaWidth ? 0.1 : 1,
        })
    }

    //3rd section
    if (reviewScroll <= scrollPoint) {
        let tl = gsap.timeline();

        tl.to(reviewTitle, {
            duration: 0.3,
            opacity: 1,
            y: 0,
        }).to(reviewText, {
            duration: 0.3,
            opacity: 1,
            y: 0,
        })

        slideItem.forEach(el => {
            gsap.to(el, {
                duration: 1,
                x: 0,
            })
        })
        //swiper js
        if (!swiperState) {
            swiperState = true;
            swiper = new Swiper(".mySwiper", {
                speed: 5000,
                slidesPerView: 1,
                spaceBetween: 20,
                loop: true,
                loopAdditionalSlides: 1,
                autoplay: {
                    delay: 0,
                    disableOnInteraction: false,
                },
                breakpoints: {
                    1024: {
                        slidesPerView: 2,
                    },
                    1400: {
                        slidesPerView: 4,
                    }
                }
            });
        }

        //4th section
        if (satisScroll <= scrollPoint) {
            let tl = gsap.timeline();
            tl.to(satisTitle, {
                duration: 0.3,
                opacity: 1,
                y: 0,
            }).to(satisText, {
                duration: 0.3,
                opacity: 1,
                y: 0,
            }).to(satisGraph, {
                duration: 0.3,
                opacity: 1,
            }).to(satisCnText[0], {
                duration: 0.3,
                opacity: 1,
                y: 0,
            }).to(satisCnText[1], {
                duration: 0.3,
                opacity: 1,
                y: 0,
            }).to(satisCnText[2], {
                duration: 0.3,
                opacity: 1,
                y: 0,
            })
        }
    }
});


const graph = document.querySelector('.content-wrap__graph');
const graphText = document.querySelector('.graph__axis span');
let percent = 98;
let i = 0;
let isPlay;

function makeChart() {
    if (!isPlay) {
        isPlay = true;
        const chartAct = setInterval(() => {
            if (i <= percent) {
                graph.style.background = 'conic-gradient(#3ED4EC 0% ' + i + '%, #fff ' + i + '% 100%)';
                graphText.innerHTML = i;
                i++;
            } else {
                clearInterval(chartAct);
            }
        }, 10);
    }
}

window.addEventListener('scroll', function () {
    const scrollPoint = (window.innerHeight / 10) * 9;

    if (graph.getBoundingClientRect().top <= scrollPoint) {

        setTimeout(makeChart, 600);
    }
});