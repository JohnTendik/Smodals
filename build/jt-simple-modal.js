'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var JT_Smodals = function () {
  function JT_Smodals(options) {
    var _this = this;

    _classCallCheck(this, JT_Smodals);

    this.options = {
      body: "",
      type: "simple",
      header: "Attention!",
      bodyIcon: "",
      headerIcon: "fa-info",
      customClass: '',
      customContent: ""
    };

    this.setOptions(options);

    this.eventHandler = function (evt) {
      if (evt.target && (evt.target.id == _this.options.htmlID || evt.target.id === 'jt-simple-modal-close')) {
        _this.closeModal();
      }

      if (evt.target && evt.target.id == 'jt-simple-modal-submit') {
        if (typeof _this.options.unlockOnClick === 'function') {
          var val = document.getElementById('jt-simple-modal-input').value;
          _this.options.unlockOnClick(evt, val);
        }
        _this.closeModal();
      }

      if (evt.target && evt.target.id == 'jt-simple-modal-confirm') {
        if (typeof _this.options.confirmOnClick === 'function') {
          _this.options.confirmOnClick(evt);
        }
        _this.closeModal();
      }
    };
  }

  _createClass(JT_Smodals, [{
    key: "setOptions",
    value: function setOptions(options) {
      var htmlID = 'jt-simple-modal-' + this.getNextId();
      Object.assign(this.options, { htmlID: htmlID }, options);
      console.log(this.options);
    }
  }, {
    key: "getOptions",
    value: function getOptions() {
      return this.options;
    }
  }, {
    key: "getNextId",
    value: function getNextId() {
      return document.querySelectorAll('.jt-simple-modal').length;
    }
  }, {
    key: "attachEvents",
    value: function attachEvents() {
      document.body.addEventListener('click', this.eventHandler);
    }
  }, {
    key: "removeEvents",
    value: function removeEvents() {
      document.body.removeEventListener('click', this.eventHandler);
    }
  }, {
    key: "openModal",
    value: function openModal() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

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
  }, {
    key: "closeModal",
    value: function closeModal() {
      // Remove the moddal from the DOM
      this.modal.parentNode.removeChild(this.modal);
      // Reset the modal element in var
      this.modal = null;
      // Remove event handler if there are no modals
      if (this.getNextId < 1) {
        this.removeEvents();
      }
    }
  }, {
    key: "prepareModal",
    value: function prepareModal() {
      var template = this.getTemplate(this.options);
      return "\n      <div id='" + this.options.htmlID + "' class='jt-simple-modal " + this.options.customClass + "'>\n        <div id='jt-simple-modal-container'>\n          <div id='jt-simple-modal-header'>\n            <i class='fa " + this.options.headerIcon + "' aria-hidden='true'></i>\n            <h4>" + this.options.header + "</h4>\n            <i class='fa fa-times' id='jt-simple-modal-close' aria-hidden='true'></i>\n          </div>\n          <div id='jt-simple-modal-body'>\n            " + template + "\n          </div>\n        </div>\n      </div>\n    ";
    }
  }, {
    key: "getTemplate",
    value: function getTemplate(options) {

      if (!options || !options.type) {
        return;
      }

      switch (options.type) {
        case 'simple':
          return "\n          <div class='jt-simple-modal-desc'>\n            <i class='fa " + options.bodyIcon + "' aria-hidden='true'></i>\n            <p>" + options.body + "</p>\n          </div>\n        ";
          break;

        case 'unlock':
          var unlockTemplate = "\n          <div class='jt-simple-modal-desc'>\n            <form id='jt-simple-modal-form'>\n              <input id=\"jt-simple-modal-input\" placeholder=\"" + (this.options.unlockPlaceholder || 'test') + "\" name=\"unlockPassword\" type=\"password\">\n            </form>\n            <a href=\"#\" class=\"btn btn-primary\" id=\"jt-simple-modal-submit\">Unlock</a>\n          </div>\n        ";
          return unlockTemplate;
          break;

        case 'confirm':
          return "\n          <div class='jt-simple-modal-desc'>\n            <i class='fa " + this.options.bodyIcon + "' aria-hidden='true'></i>\n            <p>" + this.options.body + "</p>\n          </div>\n          <div class='jt-simple-modal-desc'>\n            <button href=\"#\" id=\"jt-simple-modal-confirm\">" + (this.options.confirmBtnText || 'OK') + "</button>\n          </div>\n        ";
          break;

        default:
          return "\n          <div class='jt-simple-modal-desc'>\n            <i class='fa " + options.bodyIcon + "' aria-hidden='true'></i>\n            <p>" + options.body + "</p>\n          </div>\n        ";
          break;
      }
    }
  }]);

  return JT_Smodals;
}();