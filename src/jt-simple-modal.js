'use strict';

class JT_Smodals {

  constructor(args) {
    this.options = Object.assign(this, {
      body: "",
      type: "", 
      header: "Attention!", 
      bodyIcon: "",
      inputType: "text",
      headerIcon: "",
      customClass: '',
      customContent: ""
    }, args);
  }

  logOptions() {
    console.log(this.options);
  };

}
