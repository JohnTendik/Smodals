'use strict';

class JT_Smodals {

  constructor(options) {

    this.options = {
      body: "",
      type: "simple",
      header: "Attention!",
      bodyIcon: "",
      headerIcon: "fa-info",
      customClass: '',
      customContent: "",
    };


    this.setOptions(options);

    this.eventHandler = (evt) => {
      if (evt.target && (evt.target.id == this.options.htmlID || evt.target.id === 'jt-simple-modal-close')) {
        this.closeModal();
      }

      if (evt.target && evt.target.id == 'jt-simple-modal-submit') {
        if (typeof this.options.unlockOnClick === 'function') {
          const val = document.getElementById('jt-simple-modal-input').value;
          this.options.unlockOnClick(evt, val);
        }
        this.closeModal();
      }

      if (evt.target && evt.target.id == 'jt-simple-modal-confirm') {
        if (typeof this.options.confirmOnClick === 'function') {
          this.options.confirmOnClick(evt);
        }
        this.closeModal();
      }
    };
  }

  setOptions(options) {
    const htmlID = 'jt-simple-modal-' + this.getNextId();
    Object.assign(this.options, {htmlID}, options);
    console.log(this.options);
  }

  getOptions() {
    return this.options;
  }

  getNextId() {
    return document.querySelectorAll('.jt-simple-modal').length;
  }

  attachEvents() {
    document.body.addEventListener('click', this.eventHandler);
  }

  removeEvents() {
    document.body.removeEventListener('click', this.eventHandler);
  }

  openModal(options = {}) {
    // Update the options if needed
    this.setOptions(options);
    // Append the modal to the body
    document.body.insertAdjacentHTML('beforeend', this.prepareModal(options));
    // Get and Set the modal element in var
    this.modal = document.getElementById(this.options.htmlID);
    // Change the modal style to flex to display the modal
    this.modal.style.display = 'flex';
    // Attach event handler
    this.attachEvents();
  }

  closeModal() {
    // Remove the moddal from the DOM
    this.modal.parentNode.removeChild(this.modal);
    // Reset the modal element in var
    this.modal = null;
    // Remove event handler if there are no modals
    if (this.getNextId < 1) {
      this.removeEvents();
    }
  }

  prepareModal() {
    const template = this.getTemplate(this.options);
    return `
      <div id='${this.options.htmlID}' class='jt-simple-modal ${this.options.customClass}'>
        <div id='jt-simple-modal-container'>
          <div id='jt-simple-modal-header'>
            <i class='fa ${this.options.headerIcon}' aria-hidden='true'></i>
            <h4>${this.options.header}</h4>
            <i class='fa fa-times' id='jt-simple-modal-close' aria-hidden='true'></i>
          </div>
          <div id='jt-simple-modal-body'>
            ${template}
          </div>
        </div>
      </div>
    `;
  }

  getTemplate(options) {

    if (!options || !options.type) {
      return;
    }

    switch (options.type) {
      case 'simple':
        return `
          <div class='jt-simple-modal-desc'>
            <i class='fa ${options.bodyIcon}' aria-hidden='true'></i>
            <p>${options.body}</p>
          </div>
        `;
        break;

      case 'unlock':
        const unlockTemplate = `
          <div class='jt-simple-modal-desc'>
            <form id='jt-simple-modal-form'>
              <input id="jt-simple-modal-input" placeholder="${this.options.unlockPlaceholder || 'test'}" name="unlockPassword" type="password">
            </form>
            <a href="#" class="btn btn-primary" id="jt-simple-modal-submit">Unlock</a>
          </div>
        `;
        return unlockTemplate;
        break;

      case 'confirm':
        return `
          <div class='jt-simple-modal-desc'>
            <i class='fa ${this.options.bodyIcon}' aria-hidden='true'></i>
            <p>${this.options.body}</p>
          </div>
          <div class='jt-simple-modal-desc'>
            <button href="#" id="jt-simple-modal-confirm">${this.options.confirmBtnText || 'OK'}</button>
          </div>
        `;
        break;

      default:
        return `
          <div class='jt-simple-modal-desc'>
            <i class='fa ${options.bodyIcon}' aria-hidden='true'></i>
            <p>${options.body}</p>
          </div>
        `
        break;
    }
  }

}
