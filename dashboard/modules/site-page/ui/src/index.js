export default function() {
  class SelectLink extends HTMLElement {
    constructor() {
      super();
      this.init();
    }
    async init() {
      const initialValue = this.querySelector('option[selected]').value;
      this.addEventListener('change', e => {
        const value = e.target.value;
        e.target.value = initialValue;
        window.location.href = value;
        e.preventDefault();
        e.stopPropagation();
      });
      this.querySelector('select').value = initialValue;
    }
  }
  customElements.define('select-link', SelectLink);  
}
