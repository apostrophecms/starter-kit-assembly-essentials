import placeholder from './js/placeholder';

export default () => {
  // eslint-disable-next-line no-console
  console.log('Demo theme project level js file');

  // NOTE: Theme specific -
  // Adds a class to the body so we can adjust the layout height

  const isLoggedIn = 'is-logged-in';

  const $body = document.getElementsByTagName('body')[0];

  const adminBar = window.apos.modules['@apostrophecms/admin-bar'];

  if (adminBar && !$body.classList.contains(isLoggedIn)) {
    apos.util.addClass($body, isLoggedIn);
  } else {
    apos.util.removeClass($body, isLoggedIn);
  }

  // NOTE: Theme Specific -
  // Adds editor help text when first editing the Home Page

  placeholder();
};
