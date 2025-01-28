import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Inview from '../_common/inview';
import ItemModal from './_modules/sp_first/ItemModal';
import Intro2Main from './_modules/sp_first/Intro2Main';
import PcUi from './_modules/sp_first/PcUi.js';

window.gsap = gsap;
gsap.registerPlugin(ScrollToPlugin);
gsap.registerPlugin(ScrollTrigger);


const domContentLoaded = () => {
  const defaults = {
    inview: new Inview({
      selector: '.inview',
      options: { rootMargin: '-30% 0px -30% 0px', threshold: [0] },
    }),
    inviewInfinite: new Inview({
      selector: '.inview--infinite',
      options: { rootMargin: '0%' },
      infinite: true,
    }),
  };

  Intro2Main.getInstance().init();
};

const loaded = () => {
  const item_modal = new ItemModal();
  item_modal.init();
  const pc_ui = new PcUi();
  pc_ui.init();
};


window.addEventListener('DOMContentLoaded', domContentLoaded);
window.addEventListener('load', loaded);
