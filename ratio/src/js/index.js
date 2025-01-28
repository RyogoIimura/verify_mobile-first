import 'intersection-observer';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import imagesLoaded from "imagesloaded";

window.gsap = gsap;
window.ScrollTrigger = ScrollTrigger;
gsap.registerPlugin(ScrollToPlugin);
gsap.registerPlugin(ScrollTrigger);

import Main from './_modules/Main.js';
import Contents from './_modules/Contents.js';

const domContentLoaded = () => {
  Main();
  Contents();
};

const loadTarget = document.querySelector('.mv');
const imageloaded = () => {
  document.getElementById('wrapper').classList.add('is-loaded');
  // document.body.classList.add('is-loaded');
}

const loaded = () => {
};

window.addEventListener('DOMContentLoaded', domContentLoaded);
window.addEventListener('load', loaded);
imagesLoaded( loadTarget, imageloaded);