export default function() {
  class SelectLink extends HTMLElement {
    constructor() {
      super();
      this.init();
    }
    async init() {
      this.addEventListener('change', () => {
        console.log(e);
        const value = e.value;
        window.location.href = value;
        e.preventDefault();
        e.stopPropagation();
      });
    }
  }
  customElements.define('select-link', SelectLink);  
}
