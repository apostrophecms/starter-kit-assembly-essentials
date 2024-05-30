/**
 * For Demo Purposes, this Slideshow is powered by Swiper.js
 * You could swap this out another library or your own implementation
 */

import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

export default () => {

  apos.util.widgetPlayers.slideshow = {
    selector: '[data-slideshow-widget]',
    player: function (el) {

      /**
       * For all available parameters see:
       * https://swiperjs.com/swiper-api#parameters
       */
      const options = {
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },

        pagination: {
          el: '.swiper-pagination'
        },

        modules: [ Navigation, Pagination ],

        ...(el.dataset.slideshowWidget && {
          ...JSON.parse(el.dataset.slideshowWidget).swiper
        })
      };

      // eslint-disable-next-line
      new Swiper('.swiper', options);
    }
  };

};
