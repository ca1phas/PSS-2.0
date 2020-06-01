$(function () {
  const content = {
    init: function () {
      this.cacheDom();
      this.bindEvents();
    },
    bindEvents: function () {
      this.$idInput
        .focus(() => {
          this.inputFocus();
        })
        .focusout(() => {
          this.inputFocusOut();
        });
      this.$checkboxInput.each((i, input) => {
        $(input).change(() => {
          this.checkboxClick(input);
        });
      });
    },
    cacheDom: function () {
      this.$content = $(".content-con");
      this.$idForm = this.$content.find(".id-form");
      this.$idInput = this.$idForm.find("input");
      this.$idLabel = this.$idForm.find("label");
      this.$checkboxForm = this.$content.find(".checkbox-form");
      this.$checkboxInput = this.$checkboxForm.find("input");
    },
    inputFocus: function () {
      this.$idInput.css("border", "1px solid #018786");
      this.$idLabel.addClass("ani-focus");
    },
    inputFocusOut: function () {
      if (!this.$idInput.val()) {
        this.$idInput.css("border", "");
        this.$idLabel.removeClass("ani-focus");
      }
    },
    checkboxClick: function (input) {
      const $target = $(input);
      $target.parent().parent().submit();
      if (input.checked) {
        $target.parent().addClass("checked");
        $target.siblings().show();
      } else {
        $target.parent().removeClass("checked");
        $target.siblings().hide();
      }
    },
  };
  content.init();
});
