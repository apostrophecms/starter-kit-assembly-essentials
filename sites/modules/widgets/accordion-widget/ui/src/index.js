/**
 * For Demo Purposes, this Accordion is powered by accordion-js
 * You could swap this out another library or your own implementation
 */

import Accordion from 'accordion-js';

export default () => {

  apos.util.widgetPlayers.accordion = {
    selector: '[data-accordion-widget]',
    player: function (el) {

      /**
       * For all available options see:
       * https://www.npmjs.com/package/accordion-js#options
       */
      const options = {
        duration: 300,
        ...(el.dataset.accordionWidget && {
          ...JSON.parse(el.dataset.accordionWidget).accordionjs
        })
      };

      // eslint-disable-next-line
      new Accordion('.accordion-container', options);
    }
  };

};
