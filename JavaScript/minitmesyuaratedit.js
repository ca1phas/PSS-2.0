$(function () {
  const form = {
    init: function () {
      this.cacheDom();
      this.bindEvents();
      this.start();
    },
    bindEvents: function () {
      this.$input
        .focus(() => {
          this.inputFocus();
        })
        .focusout(() => {
          this.inputFocusOut();
        });

      this.$submit.click(() => {
        this.submitClicked();
      });
    },
    cacheDom: function () {
      this.$form = $(".edit-form");
      this.$resultCon = this.$form.siblings();
      this.$selectedTime = this.$form.find(".selected-time");
      this.$inputCon = this.$form.find(".input-con");
      this.$inputLabel = this.$inputCon.find("label");
      this.$input = this.$inputCon.find("input");
      this.$submit = this.$inputCon.find("button");
    },
    start: function () {
      this.$form.addClass("ani-fade");
      setTimeout(() => {
        this.$resultCon.addClass("ani-fade").css("display", "grid");
      }, 300);
    },
    inputFocus: function () {
      this.$input.css("border", "2px solid #705097");
      this.$inputLabel.addClass("focus");
      this.$submitIcon.attr(
        "src",
        "../Icons/setiausaha/minitmesyuaratedit-hv.svg"
      );
    },
    inputFocusOut: function () {
      if (!this.$input.val()) {
        this.$input.css("border", "2px solid #55586b");
        this.$inputLabel.removeClass("focus");
        this.$submitIcon.attr(
          "src",
          "../Icons/setiausaha/minitmesyuaratedit.svg"
        );
      }
    },
    submitClicked: function () {
      console.log(1);
    },
  };

  form.init();
});
