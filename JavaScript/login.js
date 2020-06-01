class inputType {
  constructor(type) {
    this.$input = type.find("input");
    this.$gap = type.find("span");
  }
  init() {
    this.bindEvents();
  }
  bindEvents() {
    this.$input
      .focus(() => {
        this.inputFocus();
      })
      .focusout(() => {
        this.inputFocusOut();
      });
  }
  inputFocus() {
    this.$gap.show();
  }
  inputFocusOut() {
    this.$input.val() !== ""
      ? this.inputFocus()
      : setTimeout(() => {
          this.close();
        }, 100);
  }
  close() {
    this.$input.val("");
    this.$gap.hide();
  }
}

class loginOverObj {
  constructor(con, page) {
    this.page = page;
    this.typeInputs = ["id", "pw"];
    this.typeInputs.forEach((type) => {
      eval(`
      this.${type} = new inputType(con.find("#${type}"));
      this.${type}.init();
      `);
    });
  }
  close() {
    this.typeInputs.forEach((type) => {
      eval(`this.${type}.close()`);
    });
  }
}

$(function () {
  const loginTrigger = {
    init: function () {
      this.cacheDom();
      this.bindEvents();
    },
    cacheDom: function () {
      this.$button = $(".login-btn");
    },
    bindEvents: function () {
      this.$button.click(() => {
        loginOver.init();
      });
    },
  };

  const loginOver = {
    init: function () {
      this.cacheDom();
      this.start();
    },
    cacheDom: function () {
      this.overlay = new overlay($(".overlay-con"));
    },
    start: function () {
      this.overlay.init();
    },
  };

  loginTrigger.init();
});
