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

  const heroLoop = function () {
    //elements
    const arrow = document.querySelector('#hero-arrow-path');
    const ear = document.querySelector('#hero-ear');
    const squigglePaths = [...document.querySelectorAll('.hero_path')];
    const svgGroups = [...document.querySelectorAll('.hero_svg')];

    //guard clause
    if (!arrow || squigglePaths.length === 0) return;

    // console.log(arrow);
    //word timelines
    svgGroups.forEach((item) => {
      let tl = gsap.timeline({
        paused: true,
        defaults: {
          duration: 0.6,
          ease: 'power2.inOut',
        },
      });
      tl.fromTo(
        item,
        {
          scale: 1,
        },
        {
          scale: 1.1,
          rotateZ: 'random([-10, 10])',
          transformOrigin: 'center center',
        },
        '<'
      );
      // tl.progress(0);

      item.addEventListener('mouseenter', function (e) {
        tl.play();
      });
      item.addEventListener('mouseleave', function (e) {
        tl.reverse();
      });
    });
    let tl = gsap.timeline({
      delay: 2,
      repeat: -1,
      yoyo: true,
      // paused: true,
      defaults: {
        duration: 2,
        ease: 'power2.inOut',
      },
    });
    tl.fromTo(
      arrow,
      {
        drawSVG: '0% 100%',
      },
      {
        drawSVG: '100% 80%',
      }
    );
    let earTL = gsap.timeline({
      delay: 2,
      repeat: -1,
      yoyo: true,
      // paused: true,
      defaults: {
        duration: 1,
        ease: 'bounce.inOut',
      },
    });
    earTL.fromTo(
      ear,
      {
        rotateZ: 0,
      },
      {
        drawSVG: -12,
      }
    );
    let squiggleTL = gsap.timeline({
      delay: 2,
      defaults: {
        duration: 3,
        ease: 'power2.inOut',
      },
    });
    squiggleTL.fromTo(
      squigglePaths[0],
      {
        drawSVG: '100% 0%',
      },
      {
        stagger: { amount: 1.5, repeat: -1, yoyo: true },
        drawSVG: '0% 0%',
        // transformOrigin: 'center center',
      }
    );
    squiggleTL.fromTo(
      [squigglePaths[1], squigglePaths[2]],
      {
        drawSVG: '0% 100%',
      },
      {
        delay: 1.5,
        stagger: { amount: 1.5, repeat: -1, yoyo: true },
        drawSVG: '100% 100%',
        // transformOrigin: 'center center',
      },
      '<'
    );
  };

  const avatars = function () {
    const WRAP = '[data-ix-avatar="wrap"]';
    const ITEMS = '[data-ix-avatar="item"]';

    //elements

    const wraps = [...document.querySelectorAll(WRAP)];

    //guard clause
    if (wraps.length === 0) return;
    wraps.forEach((wrap) => {
      const items = wrap.querySelectorAll(ITEMS);
      let tl = gsap.timeline({
        scrollTrigger: { trigger: wrap, start: 'top bottom', end: 'bottom top', scrub: true },
        defaults: {
          duration: 1,
          ease: 'none',
        },
      });
      tl.fromTo(
        items,
        {
          yPercent: -30,
        },
        {
          yPercent: 80,
        },
        '<'
      );
      tl.fromTo(
        items[0],
        {
          rotateZ: 0,
        },
        {
          rotateZ: -45,
        },
        '<'
      );
      tl.fromTo(
        items[1],
        {
          rotateZ: 0,
        },
        {
          rotateZ: -15,
        },
        '<'
      );
      tl.fromTo(
        items[2],
        {
          rotateZ: 0,
        },
        {
          rotateZ: 25,
        },
        '<'
      );
    });
  };

  const chartAnimation = function () {
    const PANEL = '.tabs_main_panel';
    const BAR = '.tabs_main_bar';
    const BUBBLE = '.tabs_main_bubble';
    const TAB_LINK = '.tabs_main_link';

    const panels = [...document.querySelectorAll(PANEL)];
    const links = [...document.querySelectorAll(TAB_LINK)];

    if (panels.length === 0) return;
    panels.forEach((panel, index) => {
      const link = links[index];
      const bars = [...panel.querySelectorAll(BAR)];
      const bubbles = [...panel.querySelectorAll(BUBBLE)];

      let tl = gsap.timeline({
        paused: true,
        defaults: {
          duration: 0.8,
          ease: 'power1.inOut',
        },
      });

      tl.fromTo(
        bars,
        {
          clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
        },
        {
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          transformOrigin: 'center center',
          stagger: 0.2,
        }
      );
      tl.fromTo(
        bubbles,
        {
          transformOrigin: 'center center',
          scale: 0.75,
          opacity: 0,
        },
        {
          scale: 1,
          opacity: 1,
          stagger: 0.2,
        },
        '<.2'
      );

      //play animation on scroll in
      ScrollTrigger.create({
        trigger: panel,
        markers: false,
        start: 'top 80%',
        end: 'center 1%',
        onEnter: () => {
          tl.play();
        },
      });
      link.addEventListener('click', () => {
        //do somethign on hover in
        tl.restart();
      });
    });
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
        heroLoop();
        avatars();
        // hoverActive(gsapContext);
        accordion(gsapContext);
        marquee(gsapContext);
        // conditional interactions
        if (!reduceMotion) {
          scrollIn(gsapContext);
          scrolling(gsapContext);
          mouseOver(gsapContext);
          chartAnimation();
          // loop(gsapContext);
          //reset scrolltrigger after load
          setTimeout(() => {
            ScrollTrigger.refresh();
          }, 5000);
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
