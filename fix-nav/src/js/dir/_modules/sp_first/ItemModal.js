import Swiper from 'swiper/bundle';

export default class ItemModal {
  constructor(){
    this.body = document.getElementsByTagName('body')[0];

    this.url;
    this.queryNum;
    this.modal = document.getElementById('Modal');
    this.mdlBg = document.getElementById('mdl_bg');
    this.mdl = document.querySelectorAll('.mdl');
    this.mdlBdContainer = document.querySelectorAll('.border_container');
    this.mdlFixWrapper = document.querySelectorAll('.fix_wrapper');
    this.open_btn1 = document.querySelectorAll('.mdlOpen1');
    this.open_btn2 = document.querySelectorAll('.mdlOpen2');
    this.close_btn = document.querySelectorAll('.mdlClose');

    this.mdlSlideFlag = false;
    this.animationTime = 350;
    this.mdlArrowPrev = document.querySelectorAll('.mdlArrowPrev');
    this.mdlArrowNext = document.querySelectorAll('.mdlArrowNext');
  }

  init(){
    this.mdlFunc();
    this.mdlSlide();
    this.mdlSwiper();
    this.thumbSlider();
    // this.mdlHeight();

    // クエリパラメーターが最初からある場合の処理
    if(window.location.search){
      this.queryNumSave();
      this.mdlOpen(this.queryNum);
    }
  }

  queryNumSave(){
    this.url = new URL(window.location.href);
    const searchParams = new URLSearchParams(window.location.search)
    this.queryNum = Number(searchParams.get('mdl'));
  }

  mdlFunc(){
    // open
    for( let i = 0; i < this.open_btn1.length; i++ ){
      this.open_btn1[i].addEventListener("click", () => this.mdlOpen(i));
    }
    for( let i = 0; i < this.open_btn2.length; i++ ){
      this.open_btn2[i].addEventListener("click", () => this.mdlOpen(i));
    }
    // close
    for( let i = 0; i < this.close_btn.length; i++ ){
      this.close_btn[i].addEventListener("click", () => this.mdlClose());
    }
  }
  mdlOpen(i){
    if(this.mdl[i]){
      this.body.style.overflow = 'hidden';

      // クエリパラメータが無ければ付与
      if(!window.location.search){
        const params = { mdl: i }
        const urlSearchParam =  new URLSearchParams(params).toString();
        history.pushState(null, null, window.location.href + "?" + urlSearchParam);
      }

      // モーダル開く
      if( this.mdlSlideFlag == false ) this.gsapOpen(this.modal);
      else this.mdlSlideFlag = false;
      this.gsapOpen(this.mdl[i]);

      this.mdlFixWrapper
      gsap.to(this.modal, { duration: 0, scrollTo: { y: 0 }});
      gsap.set([this.mdlBdContainer, this.mdlFixWrapper], { y: 70 })
      gsap.to([this.mdlBdContainer, this.mdlFixWrapper], { duration: this.animationTime * .001, ease: "power3.out", y: 0 })
    }
    // モーダルがない場合の処理
    else history.replaceState(null, '', this.url.pathname);
  }
  mdlClose(){
    this.body.style.overflow = 'visible';
    this.queryNumSave();

    // モーダル閉じる
    if( this.mdlSlideFlag == false ) this.gsapClose(this.modal);
    this.gsapClose(this.mdl[this.queryNum])

    gsap.set(this.mdlBdContainer, { y: 0 })
    gsap.to(this.mdlBdContainer, { duration: this.animationTime * .001, ease: "power3.out", y: 70 })

    // クエリパラメータ削除
    history.replaceState(null, '', this.url.pathname);
  }
  gsapOpen(elm){
    gsap.set(elm, { display: 'none', opacity: 0 })
    gsap.to(elm, { duration: this.animationTime * .001, ease: "power3.out", display: 'block', opacity: 1 })
  }
  gsapClose(elm){
    gsap.set(elm, { display: 'block', opacity: 1 })
    gsap.to(elm, { duration: this.animationTime * .001, ease: "power3.out", display: 'none', opacity: 0 })
  }

  mdlSlide(){
    for( let i = 0; i < this.mdl.length; i ++ ){

      // 前のモーダルへ
      this.mdlArrowPrev[i].addEventListener("click", () => {
        this.mdlSlideFlag = true;
        this.mdlClose();
        // console.log(this.queryNum, this.mdl.length - 1)

        if( this.queryNum == 0 ) this.mdlOpen(this.mdl.length - 1);
        else this.mdlOpen(this.queryNum - 1);
      });

      // 次のモーダルへ
      this.mdlArrowNext[i].addEventListener("click", () => {
        this.mdlSlideFlag = true;
        this.mdlClose();
        // console.log(this.queryNum, this.mdl.length - 1)

        if( this.queryNum == this.mdl.length - 1 ) this.mdlOpen(0);
        else this.mdlOpen(this.queryNum + 1);
      });
    }
  }
  mdlSwiper(){
    const mdlSwiper = document.querySelectorAll('.mdl_swiper');
    const mdlPagination = document.querySelectorAll('.mdl_swiper-pagination');
    const mdlNext = document.querySelectorAll('.mdl_swiper-button-next');
    const mdlPrev = document.querySelectorAll('.mdl_swiper-button-prev');

    for ( let i = 0; i < mdlSwiper.length; i++) {

      mdlSwiper[i].className += i;
      mdlPagination[i].className += i;
      mdlNext[i].className += i;
      mdlPrev[i].className += i;

      const mdl_Swiper = new Swiper('.mdl_swiper' + i, {
        speed: 500,
        loop: true,

        pagination: {
          el: '.mdl_swiper-pagination' + i,
          clickable: true,
        },

        navigation: {
          nextEl: '.mdl_swiper-button-next' + i,
          prevEl: '.mdl_swiper-button-prev' + i,
          watchOverflow: 'true',
        },
      });
    }
  }
  thumbSlider(){
    const thumbSlider = document.querySelectorAll('.thumbSlider');

    const slideSwitch = (selector) => {
      let sel_first = selector.firstElementChild;
      let sel_last = selector.lastElementChild;
      selector.appendChild(sel_first);
      gsap.to(sel_first, { duration: this.animationTime * .001, ease: "power3.out", opacity: 1 })

      setTimeout(() => gsap.to(sel_last, { duration: this.animationTime * .001, ease: "power3.out", opacity: 0 }), this.animationTime);
    }

    for( let i = 0; i < thumbSlider.length; i++ ) slideSwitch(thumbSlider[i]);
    setInterval(() => {
      for( let i = 0; i < thumbSlider.length; i++ ){
        setTimeout(() => slideSwitch(thumbSlider[i]), (i * 500));
      }
    }, 5000)
  }

  mdlHeight(){
    let ih = window.innerHeight;
    window.addEventListener('resize', () => {
      if( ih != window.innerHeight ){
        ih = window.innerHeight;
        // console.log(ih);

        this.modal.style.height = window.innerHeight + 'px';
        this.mdlBg.style.height = window.innerHeight + 'px';
      }
    });
  }
}
