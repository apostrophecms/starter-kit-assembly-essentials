export default function() {
  document.body.addEventListener('click', (e) => {
    if (!e.target.hasAttribute('data-edit-site')) {
      return;
    }
    e.preventDefault();
    e.stopPropagation();

    apos.bus.$emit('admin-menu-click', {
      itemName: 'site:editor',
      props: {
        docId: e.target.getAttribute('data-edit-site')
      }
    });
  });
}
