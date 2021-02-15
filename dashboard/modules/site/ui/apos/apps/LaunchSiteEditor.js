export default function() {
  console.log('registering');
  document.body.addEventListener('click', (e) => {
    console.log('got click');
    if (!e.target.hasAttribute('data-edit-site')) {
      console.log('not ours');
      return;
    }
    console.log('ours');
    e.preventDefault();
    e.stopPropagation();
    console.log('emitting:', e.target.getAttribute('data-edit-site'));
    apos.bus.$emit('admin-menu-click', {
      itemName: 'site:editor',
      props: {
        docId: e.target.getAttribute('data-edit-site')
      }
    });
  });
}

