
export default class PcUi {
  deviceType;

  constructor(){
    this.breakPoint = 768;
    this.pageLinkBtn = document.querySelectorAll('.pageLinkBtn');
  }

  init(){
    this.toPageCont();
    this.pageContPosi();
    this.checkDevice();
  }

  toPageCont(){
    this.pageLinkBtn.forEach((e,index) => {
      e.addEventListener('click', () => {
        const target = document.querySelector(`.mdl_thumb_${index+1}`);
        const targetTop = Math.trunc(target.getBoundingClientRect().top + window.pageYOffset);
        // console.log(targetTop);

        // スクロールした量（ビューポート上部の位置）よりターゲット上部の位置の方が下にある場合
        if( window.pageYOffset < targetTop ){
          gsap.set( window, {scrollTo: { y: targetTop - 100 }});
          gsap.to( window, {duration: .7, ease: 'power3.out',scrollTo: { y: targetTop }});

        // スクロールした量（ビューポート上部の位置）よりターゲット上部の位置の方が上にある場合
        } else if( window.pageYOffset > targetTop ){
          gsap.set( window, {scrollTo: { y: targetTop + 100 }});
          gsap.to( window, {duration: .7, ease: 'power3.out',scrollTo: { y: targetTop }});
        }
      });
    });
  }
  pageContPosi(){
    for( let i = 0; i < this.pageLinkBtn.length; i++ ){
      const target = document.querySelector(`.mdl_thumb_${i+1}`);
      let targetFlag = false;

      window.addEventListener('scroll', () => {
        if( this.deviceType == "pc" ){
          const targetTop = Math.trunc(target.getBoundingClientRect().top);
          const targetBtm = Math.trunc(target.getBoundingClientRect().bottom);
          // if( i == 0 ) console.log(targetTop, targetBtm);

          if( targetTop <= 0 && 0 < targetBtm ){
            if( targetFlag == false ){
              targetFlag = true;
              this.pageLinkBtn[i].style.backgroundColor = '#000';
              this.pageLinkBtn[i].style.color = '#fff';
            }

          } else {
            if( targetFlag == true ){
              targetFlag = false;
              this.pageLinkBtn[i].style.backgroundColor = 'rgba(0,0,0,0)';
              this.pageLinkBtn[i].style.color = '#000';
            }
          }
        }
      });
    }
  }
  checkDevice(){
    if( window.matchMedia(`(min-width: ${this.breakPoint}px)`).matches ){
      this.deviceType = "pc";
    } else {
      this.deviceType = "sp";
    }

    let ww = window.innerWidth;
    window.addEventListener('resize', () => {
      if( ww != window.innerWidth ){
        ww = window.innerWidth;

        if( window.matchMedia(`(min-width: ${this.breakPoint}px)`).matches ){
          if( this.deviceType == "sp" ) this.deviceType = "pc";
        } else {
          if( this.deviceType == "pc" ) this.deviceType = "sp";
        }
      }
    });
  }
}
