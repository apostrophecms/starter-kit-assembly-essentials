export default () => {
  const hiddenClass = 'c-placeholder--is-hidden';
  const loggedIn = !!window.apos.modules['@apostrophecms/admin-bar'];
  if (loggedIn) {
    setTimeout(() => {
      setInterval(checkModeAndToggleVisibility, 300);
    }, 200);
  }

  function checkModeAndToggleVisibility() {
    const editMode = window.apos.modules['@apostrophecms/admin-bar'].editMode || false;
    const el = document.querySelector('[data-apos-placeholder-container]');
    if (el) {
      if (editMode && !el.classList.contains(hiddenClass)) {
        apos.util.addClass(el, hiddenClass);
      } else if (!editMode && el.classList.contains(hiddenClass)) {
        apos.util.removeClass(el, hiddenClass);
      }
    }
  }
};
