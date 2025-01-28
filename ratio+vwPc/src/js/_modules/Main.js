const Main = () => {
  // console.log('jsが読み込まれました');
  const secHeadings = document.querySelectorAll('.section__head');

  function typeanim_set() {
    secHeadings.forEach((target) => {
      const char = target.querySelectorAll('.char');
      gsap.set(target, { autoAlpha:0 })
      for(let i = 0; i < char.length; i++) {
        gsap.set(char[i+1], {display:'none'})
      }
    });
  }

  function typeanim() {
    secHeadings.forEach((target) => {
      const char = target.querySelectorAll('.char');
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: target,
          start: 'top center+=30$%'
        }
      });
      
      tl.to(target, {
        autoAlpha: 1,
        duration: 0.3,
        ease:'power1.out',
      })
      .to(char, {
        display:'inline-block',
        stagger: {
          amount: 0.6,
        },
      },'<');
    });
  }

  // function ytTimeout() {

  // }

  function ytPlay() {
    const yt_player = document.getElementById('player');
    const yt_id = yt_player.getAttribute('data-youtube');
  
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  
    let player;
    let readyFlag = false;
    window.onYouTubeIframeAPIReady = () => {
      player = new YT.Player(yt_player, {
        width: '100%',
        height: '200%',
        videoId: yt_id,
        events: {
          'onReady': onPlayerReady,
          'onStateChange': onPlayerStateChange
        },
        playerVars: {
          playsinline: 1,
          autohide: 0,
          controls: 0,
          modestbranding: 1,
          rel: 0,
        }
      });
    }
  
    const onPlayerReady = (e) => {
      e.target.mute();
      e.target.playVideo();
      readyFlag = true;
      // console.log('ready:' + readyFlag);
      afterLoadedAction();
    }
  
    const onPlayerStateChange = (e) => {
      switch (e.data) {
        case YT.PlayerState.ENDED:
          e.target.playVideo();
          break;
      }
    }

    // 再生準備完了後のアクション
    function afterLoadedAction() {
      // document.body.classList.add('is-ready');
      document.getElementById('wrapper').classList.add('is-ready');
      typeanim_set();
      setTimeout(typeanim,1000);
    }

    // 重たい時は画像を表示する
    function fallbackImage() {
      gsap.set('.ytWrapper', {display:'none'});
      gsap.set('.poster', {display:'block'});
    }

    function checkReadyFlag() {
      return new Promise((resolve,reject) => {
        setTimeout(() => {
          if(readyFlag == false) {
            reject(new Error("Timeout"));
          } else {
            resolve();
          }
        },4000);
      });
    }

    checkReadyFlag()
    .then(() => {
    })
    .catch(() => {
      // console.log('Timeout');
      fallbackImage();
    });
  }

  function ytSpFit() {
    const movieRatio = 16/9;
    const winW = window.screen.width;
    const winH = window.screen.height;
    const winRatio =  winH/winW;
    const movieW = Math.ceil(winRatio*100/movieRatio);

    if(movieRatio < winRatio) {
      gsap.set('.ytWrapper', { width: `${movieW}%`})
    }
  }

  function ytPcFit() {
    // 縦長の時
    const movieRatio = 16/9;
    const area = document.querySelector('.movie');
    const areaRect = area.getBoundingClientRect();
    const areaRatio =  areaRect.height/areaRect.width;
    const movieW = Math.ceil(areaRatio*100/movieRatio);
    // 横長の時
    const movieRatioW = 580/640; //閾値

    if(movieRatio < areaRatio) {
      gsap.set('.ytWrapper', { clearProps: 'all' })
      gsap.set('.ytWrapper', { width: `${movieW}%`})
    } else if(movieRatioW > areaRatio) {
      gsap.set('.ytWrapper', { clearProps: 'width' })
      gsap.set('.ytWrapper', {
        height: 'auto',
        yPercent: -25,
      })
    } else {
      gsap.set('.ytWrapper', { clearProps: 'all' })
    }
  }

  // const mq = window.matchMedia('(max-width: 767px)');
  // const handleMediaQuery = (e) => {
  //   if(e.matches) {
  //     ytSpFit();
  //   } else {
  //     ytPcFit();
  //     window.addEventListener('resize', ytPcFit);
  //   }
  // }

  ytSpFit();
  ytPlay();  
  // handleMediaQuery(mq);

  // mq.addEventListener('change', handleMediaQuery);
}

export default Main;