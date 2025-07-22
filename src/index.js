import { attr } from './utilities';
import { accordion } from './interactions/accordion';
import { load } from './interactions/load';
import { loop } from './interactions/loop';
import { scrollIn } from './interactions/scroll-in';
import { mouseOver } from './interactions/mouse-over';
import { scrolling } from './interactions/scrolling';
import { marquee } from './interactions/marquee';
import { hoverActive } from './interactions/hover-active';
import { initLenis } from './interactions/lenis';

document.addEventListener('DOMContentLoaded', function () {
  // Comment out for production
  console.log('Local Script');
  // register gsap plugins if available
  if (gsap.ScrollTrigger !== undefined) {
    gsap.registerPlugin(ScrollTrigger);
  }
  if (gsap.Flip !== undefined) {
    gsap.registerPlugin(Flip);
  }

  //////////////////////////////
  //Global Variables
  let lenis;

  const menu = function (gsapContext) {
    const ANIMATION_ID = 'menu';
    const MENU_WRAP = `[data-ix-menu="wrap"]`;
    const MENU_LINK = `[data-ix-menu="link"]`;
    const MENU_TEXT_WRAP = `[data-ix-menu="text-wrap"]`;
    const ACTIVE_CLASS = 'is-active';
    const HOVER_CLASS = 'is-hovered';
    const OPEN_CLASS = 'is-open';

    const menuWrap = document.querySelector(MENU_WRAP);
    const menuLinks = [...document.querySelectorAll(MENU_LINK)];
    if (menuLinks.length === 0 || !menuWrap) return;

    //function to hover menu items
    const hoverMenuItem = function (activeItem, active = true) {
      // get target of flip
      const textWrap = activeItem.querySelector(MENU_TEXT_WRAP);
      const flipItems = [activeItem, textWrap];

      //get state of items
      const state = Flip.getState(flipItems, {
        // props: 'width,height,margin',
        nested: true,
        absolute: true,
      });
      if (active) {
        activeItem.classList.add(HOVER_CLASS);
      } else {
        activeItem.classList.remove(HOVER_CLASS);
      }
      // animate element
      Flip.from(state, {
        duration: 0.5,
        ease: 'power2.inOut',
      });
    };

    //add hover class for menu items when item is hovered
    menuLinks.forEach((link) => {
      link.addEventListener('mouseenter', function (e) {
        console.log(link);
        hoverMenuItem(link);
      });
      link.addEventListener('mouseleave', function (e) {
        hoverMenuItem(link, false);
      });
    });

    //function to activate menu items
    // const activateMenuItem = function (activeItem) {
    //   // get target of flip
    //   const flipItems = gsap.utils.toArray([MENU_SUB_LIST]);
    //   //get state of items
    //   const state = Flip.getState(flipItems, {
    //     props: 'margin,height',
    //     nested: true,
    //     absolute: true,
    //   });
    //   menuItems.forEach((item) => {
    //     //if the item is the active one add the class otherwise remove it
    //     if (item === activeItem) {
    //       item.classList.add(ACTIVE_CLASS);
    //     } else {
    //       item.classList.remove(ACTIVE_CLASS);
    //     }
    //   });
    //   // animate element
    //   Flip.from(state, {
    //     duration: 0.5,
    //     ease: 'power1.out',
    //   });
    // };

    // // hide and show menu in specific sections
    // const anchorItems = gsap.utils.toArray(MENU_ANCHORS);
    // anchorItems.forEach((item) => {
    //   //get the attribute values for the numbers in question
    //   let numberTopAttribute = item.firstChild?.getAttribute(MENU_TARGET_ABOVE);
    //   let numberBotAttribute = item.firstChild?.getAttribute(MENU_TARGET_BELOW);
    //   // if attributes exist get their numbers
    //   if (!numberTopAttribute || !numberBotAttribute) return;
    //   let topTargetNumber = attr(0, numberTopAttribute);
    //   let bottomTargetNumber = attr(0, numberBotAttribute);

    //   //resuable function for the scroll anchors
    //   const activateTop = function () {
    //     if (topTargetNumber === 0) {
    //       // if the enter target is zero open the menu
    //       menuWrap.classList.remove(OPEN_CLASS);
    //     }
    //     if (0 < topTargetNumber && topTargetNumber < 6) {
    //       menuWrap.classList.add(OPEN_CLASS);
    //       const topTarget = document.querySelector(`[${MENU_NUMBER}="${topTargetNumber}"]`);
    //       if (!topTarget) return;
    //       activateMenuItem(topTarget);
    //     }
    //   };
    //   const activateBottom = function () {
    //     if (bottomTargetNumber === 0) {
    //       // if the enter target is zero open the menu
    //       menuWrap.classList.remove(OPEN_CLASS);
    //     }
    //     if (0 < bottomTargetNumber && bottomTargetNumber < 6) {
    //       menuWrap.classList.add(OPEN_CLASS);
    //       const bottomTarget = document.querySelector(`[${MENU_NUMBER}="${bottomTargetNumber}"]`);
    //       if (!bottomTarget) return;
    //       activateMenuItem(bottomTarget);
    //     }
    //   };
    //   ScrollTrigger.create({
    //     trigger: item,
    //     markers: false,
    //     start: 'center 0%',
    //     end: 'center 1%',
    //     onEnter: () => {
    //       activateBottom();
    //     },
    //     onEnterBack: () => {
    //       activateTop();
    //     },
    //   });
    // });
  };
  //////////////////////////////
  //Control Functions on page load
  const gsapInit = function () {
    let mm = gsap.matchMedia();
    mm.add(
      {
        //This is the conditions object
        isMobile: '(max-width: 767px)',
        isTablet: '(min-width: 768px)  and (max-width: 991px)',
        isDesktop: '(min-width: 992px)',
        reduceMotion: '(prefers-reduced-motion: reduce)',
      },
      (gsapContext) => {
        let { isMobile, isTablet, isDesktop, reduceMotion } = gsapContext.conditions;
        //functional interactions
        lenis = initLenis();
        menu();
        load(gsapContext);
        hoverActive(gsapContext);
        accordion(gsapContext);
        marquee(gsapContext);
        // conditional interactions
        if (!reduceMotion) {
          scrollIn(gsapContext);
          scrolling(gsapContext);
          mouseOver(gsapContext);
          loop(gsapContext);
        }
      }
    );
  };
  gsapInit();

  //reset gsap on click of reset triggers
  const scrollReset = function () {
    //selector
    const RESET_EL = '[data-ix-reset]';
    //time option
    const RESET_TIME = 'data-ix-reset-time';
    const resetScrollTriggers = document.querySelectorAll(RESET_EL);
    resetScrollTriggers.forEach(function (item) {
      item.addEventListener('click', function (e) {
        //reset scrolltrigger
        ScrollTrigger.refresh();
        //if item has reset timer reset scrolltriggers after timer as well.
        if (item.hasAttribute(RESET_TIME)) {
          let time = attr(1000, item.getAttribute(RESET_TIME));
          //get potential timer reset
          setTimeout(() => {
            ScrollTrigger.refresh();
          }, time);
        }
      });
    });
  };
  scrollReset();

  const updaterFooterYear = function () {
    // set the fs-hacks selector
    const YEAR_SELECTOR = '[data-footer-year]';
    // get the the span element
    const yearSpan = document.querySelector(YEAR_SELECTOR);
    if (!yearSpan) return;
    // get the current year
    const currentYear = new Date().getFullYear();
    // set the year span element's text to the current year
    yearSpan.innerText = currentYear.toString();
  };
  updaterFooterYear();
});
