import Swiper from 'swiper/bundle';

const Contents = () => {
  function gifSlider() {
    let gifSwiper;
    gifSwiper = new Swiper('.gif', {
      autoplay: {
        delay: 1000,
      },
      speed: 0,
      loop: true,
      effect: 'fade',
      fadeEffect: {
        crossFade: true,
      },
    });
    gifSwiper.autoplay.start();
  }

  function textsplit() {
    const targets = document.querySelectorAll('.section__head');
    targets.forEach((target) => {
      const nodes = [...target.childNodes];
      let spanWrapText = "";
    
      nodes.forEach((node) => {
        if (node.nodeType == 3) {
          const text = node.textContent.replace(/\r?\n/g, '');
          spanWrapText = spanWrapText + text.split('').reduce((acc, v) => {
            if (v === ' ') {
              return acc + `<span class="char">&nbsp;</span>`;
            } else {
              return acc + `<span class="char">${v}</span>`;
            }
          }, "");
        } else {
          spanWrapText = spanWrapText + node.outerHTML
        }
      })
      target.innerHTML = spanWrapText;
    });
  }


  // function modal() {
  //   const openTriggers = document.querySelectorAll('.js-modalOpen');
  //   const closeTriggers = document.querySelectorAll('.js-modalClose');
  //   const modal = document.querySelector('.modal');
  //   const body = document.body;

  //   function modalAddClass() {
  //     modal.classList.remove('is-hide');
  //     modal.classList.add('is-open');
  //     gsap.set(body, {overflow: 'hidden'});
  //   }

  //   function modalRemoveClass() {
  //     modal.classList.remove('is-open');
  //     modal.classList.add('is-hide');
  //     gsap.set(body, {clearProps: 'overflow'});
  //   }

  //   openTriggers.forEach((openTrigger) => {
  //     openTrigger.addEventListener('click',modalAddClass);
  //   })
  //   closeTriggers.forEach((closeTrigger) => {
  //     closeTrigger.addEventListener('click', modalRemoveClass);
  //   })
  // }

  // function modalSlider() {
  //   const swipers = document.querySelectorAll('.cat__image.swiper');
  //   swipers.forEach((swiper,index) => {
  //     const pagination = swiper.querySelector('.pagination');
  //     let modalSwiper;

  //     function initSwiper() {
  //       modalSwiper = new Swiper(swiper, {
  //         autoplay: {
  //           delay: 5000,
  //         },
  //         speed: 400,
  //         loop: true,
  //         effect: 'fade',
  //         fadeEffect: {
  //           crossFade: true,
  //         },
  //         pagination: {
  //           el: pagination,
  //           clickable: 'true',
  //         }
  //       });
  //       modalSwiper.autoplay.stop();
  //     }

  //     function startObserve() {
  //       const observer = new IntersectionObserver(
  //         intersectionCallback,
  //         { threshold: [0,1.0] }
  //       );
  //       observer.observe(swiper);
  //     }

  //     function intersectionCallback(entries) {
  //       entries.forEach(entry => {
  //         if (entry.intersectionRatio === 1) {
  //           modalSwiper.autoplay.start();
  //           // console.log('swiepr' + index + 'start');
  //         } else if (entry.intersectionRatio === 0) {
  //           modalSwiper.autoplay.stop();
  //           // console.log('swiepr' + index + 'stop');
  //         }
  //       });
  //     }

  //     initSwiper();
  //     startObserve();
  //   });
  // }
  


  function yorunekoAnim() {
    gsap.fromTo('.yoruneko', {
      autoAlpha: 0,
      y: 5,
    },{
      y: 0,
      autoAlpha: 1,
      duration: 0.75,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.yoruneko',
        start: 'top center+=30%',
      }
    });

    const tl = gsap.timeline({
      repeat: -1,
      repeatDelay: 0.5,
      delay: 2,
      scrollTrigger: {
        trigger: '.yoruneko',
        start: 'top center+=30%',
      }
    });

    tl.to('.moon__shadow', {
      xPercent: -25,
      yPercent: -15,
      duration: 0.6,
      ease: 'power1.out'
    }).to('.moon__shadow', {
      xPercent: -75,
      yPercent: -75,
      duration: 3,
      ease: 'power2.inOut'
    },'+=1')
    .set('.moon__shadow', {
      xPercent: 75,
      yPercent: 75,
    },'+=5')
    .to('.moon__shadow', {
      xPercent: 35,
      yPercent: 35,
      duration: 2,
      ease: 'power3.inOut'
    },'+=1')
    .to('.moon__shadow', {
      xPercent: 0,
      yPercent: 0,
      duration: 1.2,
      ease: 'power3.inOut'
    });
  }

  // 実行周り
  const mq = window.matchMedia('(max-width: 767px)');
  const handleMediaQuery = (e) => {
    if(e.matches) {
    } else {
    }
  }

  gifSlider();
  textsplit();
  yorunekoAnim();
  handleMediaQuery(mq);

  mq.addEventListener('change', handleMediaQuery);
}

export default Contents;