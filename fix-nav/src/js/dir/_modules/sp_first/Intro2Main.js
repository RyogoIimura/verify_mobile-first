export default class Intro2Main {
  timeFlag = false;

  static #instance = null;
  constructor() {
    if (Intro2Main.#instance) {
      return Intro2Main.#instance;
    }
    Intro2Main.#instance = this;
  }

  static getInstance() {
    if (!Intro2Main.#instance) {
      Intro2Main.#instance = new Intro2Main();
    }
    return Intro2Main.#instance;
  }

  init() {
    gsap.set("#logoWrapper", {scale:0.9});
    gsap.set("#logoTenth", {alpha:0});
    gsap.to("#tenth", {alpha:0, scale:0.75});
    this.loading();
  }

  loading() {
    setTimeout(() => this.showIntro(), 400)

    // ２秒を測る
    setTimeout(() => this.timeFlag = true, 2500);

    window.addEventListener('load', () => {

      // ２秒以上
      if(this.timeFlag){
        this.hideIntro()
        // console.log('２秒以上', this.timeFlag);

      // ２秒以内
      } else {
        setTimeout(() => this.hideIntro(), 2500);
        // console.log('２秒以内', this.timeFlag);
      }
    });
  }
  showIntro(){
    gsap.to("#logoWrapper", {alpha:1, duration: 0.5, ease:"power1.out",delay:0});
    gsap.to("#logoWrapper", {scale:1.08, duration: 8, ease:"power2.out",delay:0});

    gsap.from("#logoWrapper .hel path", {alpha: 0, scale:0.5,duration: 0.5, ease: "power4.out", stagger: 0.05 ,transformOrigin:"50% 50%"});
    gsap.to("#logoWrapper .hel .l", {alpha: 0, y:-30,duration: 0.4, ease: "back.in",delay:0.7});
    gsap.to("#logoWrapper .hel .o", {alpha: 0, y:-30,duration: 0.4, ease: "back.in",delay:0.8});

    gsap.to("#logoTenth", 0,{alpha:1,delay:0.7});
    gsap.from("#logoTenth .t1", {alpha: 0, y:45,duration: 0.35, ease: "back.out",delay:1});
    gsap.from("#logoTenth .t2", {alpha: 0, y:45,duration: 0.35, ease: "back.out",delay:1.1});
    gsap.from("#logoTenth .th", {alpha:0, scale:0.5,duration: 0.35,transformOrigin:"50% 50%", ease:"power3.out",delay:1.1});
  }
  hideIntro(){
    gsap.to("#logoWrapper", {alpha:0, duration: 0.4, ease:"power2.in",delay:0});
    gsap.to(".logo_container", {scale:1.12, duration: 0.5, ease:"back.in",transformOrigin:"50% 50%",delay:0});

    gsap.to("#Intro", {alpha:0, duration: 0.2, ease:"power2.out",delay:0.3});
    gsap.delayedCall(1, () => { gsap.set("#Intro", {display:"none"}); });
    gsap.delayedCall(0.4, () => { this.showMain(); });
  }

  showMain(){
    gsap.to("#tenth", {alpha:1, duration: 0.8, ease:"power3.out",delay:0});
    gsap.to("#tenth", {scale:1, duration: 0.85, ease:"elastic.out(1.2,0.6)",delay:0});
    gsap.from("#tenth .th", {alpha:0,x:50,duration: 1.25, ease:"power3.out",delay:1.2});
    gsap.from("#tenth .th", {rotation:40,duration: 1, ease:"power2.out",delay:1.2});
    gsap.from("#tenth .th", {y:70,duration: 1, ease:"expo.out",delay:1.2});

    gsap.from("#anniv path", {scale:0.5,duration: 0.75, ease: "power4.out", stagger: 0.06 ,transformOrigin:"50% 50%",delay:0.2});
    gsap.from("#anniv path", {alpha: 0,duration: 0.75, ease: "power2.out", stagger: 0.06 ,transformOrigin:"50% 50%",delay:0.2});

    gsap.from("#madisonBlue", {alpha:0,y:15,duration: 0.7, ease:"power3.out",delay:0.6});
    gsap.from("#hel10Anniv", {alpha:0,y:15,duration: 0.8, ease:"power3.out",delay:0.7});
  }
}