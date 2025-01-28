export default class ScrlUtil{

  static scrlToTw = (movePos, scrollTime = 1, transitions = Cubic.easeInOut, delay = 0) =>{
    TweenLite.to($('html,body'),scrollTime,{scrollTop:movePos,ease:transitions,delay:delay});
  }

  //各コンテンツへのページ内スクロール
  static scrlContents = (targetTag, margin=0, scrlTime = 0.75, ease = Quint.easeOut,diffPer = 8000) =>{
    let movePos = $(targetTag).offset().top+margin;
    let currentTop = $(window).scrollTop();
    let diffPos = Math.abs(movePos - currentTop);
    let time = diffPos/diffPer + scrlTime;

    ScrlUtil.scrlToTw(movePos, time, ease);
  }

  //ページトップへのスクロール
  static scrlTop = (scrlTime = 1, ease = Cubic.easeInOut, delay = 0) =>{
    ScrlUtil.scrlToTw(0, scrlTime, ease, delay);
  }

  static scrlPos = (pos,scrlTime = 1, ease = Cubic.easeInOut, delay = 0) =>{
    // TweenLite.to $('html,body'),scrlTime,{scrollTop:pos,ease:ease}
    ScrlUtil.scrlToTw(pos, scrlTime, ease, delay);
  }

  //aタグのhref属性から一括設定
  static setPageScrl = (margin=0, scrlTime = 1.2, ease = Cubic.easeOut) =>{
    $('a[href^="#"]').on('click', function(e) {
      let href = $(this).attr('href');
      let movePos = $(href).offset().top+margin;
      ScrlUtil.scrlToTw(movePos, scrlTime, ease);
      return false;
    });
  }

  //aタグのhref属性から一括設定 距離に応じて時間調整　
  static setPageScrlPer = (margin=0, baseTime = 0.8, diffPer = 3000, ease = Quint.easeInOut) =>{
    $('a[href^="#"]').on('click', function(e) {
      let href = $(this).attr('href');
      let target = $(href === '#' || href === '' ? 'html' : href);
      let movePos = target.offset().top+margin;
      let currentTop = $(window).scrollTop();
      let diffPos = Math.abs(movePos - currentTop);
      let time = diffPos/diffPer + baseTime;

      console.log(href,target,movePos);
      ScrlUtil.scrlToTw(movePos, time, ease);
      return false;
    });
  }

  //スクロールイベント無効(スクロール禁止)PC用
  static noScrlPc = ()=>{
    // let scroll_event = 'onwheel' in document ? 'wheel' : 'onmousewheel' in document ? 'mousewheel' : 'DOMMouseScroll';
    // $(document).on(scroll_event, (e) =>{
    //   e.preventDefault()
    // });
    document.addEventListener("mousewheel", ScrlUtil.handleTouchMove, { passive: false });
  }
  //sp用
  static noScrlSp = ()=>{
    // $(document).on('touchmove.noScroll', (e) =>{
    //   e.preventDefault()
    // });
    document.addEventListener('touchmove', ScrlUtil.handleTouchMove, { passive: false });
  }
  //スクロール復活 PC用
  static noScrlOffPc = ()=>{
    // let scroll_event = 'onwheel' in document ? 'wheel' : 'onmousewheel' in document ? 'mousewheel' : 'DOMMouseScroll';
    // $(document).off(scroll_event);
    document.removeEventListener("mousewheel", ScrlUtil.handleTouchMove, { passive: false });
  }
  //スクロール復活 SP用
  static noScrlOffSp = ()=>{
    // $(document).off('.noScroll');
    document.removeEventListener('touchmove', ScrlUtil.handleTouchMove, { passive: false });
  }

  //両方
  static noScroll() {
    // PCでのスクロール禁止
    document.addEventListener("mousewheel", ScrlUtil.handleTouchMove, { passive: false });
    // TweenMax.set('body', {'overflow':"hidden",'paddingRight': 15});
    // スマホでのタッチ操作でのスクロール禁止
    document.addEventListener("touchmove", ScrlUtil.handleTouchMove, { passive: false });
  }
  // スクロール禁止解除
  static noScrlOff() {
      // PCでのスクロール禁止解除
      document.removeEventListener("mousewheel", ScrlUtil.handleTouchMove, { passive: false });
      // TweenMax.set('body', {'overflow':"visible",'paddingRight': 0});
      // スマホでのタッチ操作でのスクロール禁止解除
      document.removeEventListener('touchmove', ScrlUtil.handleTouchMove, { passive: false });
  }

  static handleTouchMove(event) {
    event.preventDefault();
  }
}
