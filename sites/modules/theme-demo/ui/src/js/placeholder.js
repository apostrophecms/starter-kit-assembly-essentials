export default () => {
  const hiddenClass = 'is-hidden';

  const adminBar = window.apos.modules['@apostrophecms/admin-bar'];

  if (adminBar) {
    setInterval(togglePlaceholder, 300);
  }

  function togglePlaceholder() {
    const editMode = adminBar.editMode || false;

    const $el = document.querySelector('[data-apos-placeholder]');

    if ($el) {
      if (editMode && !$el.classList.contains(hiddenClass)) {
        apos.util.addClass($el, hiddenClass);
      } else if (!editMode && $el.classList.contains(hiddenClass)) {
        apos.util.removeClass($el, hiddenClass);
      }
    }
  }
};
