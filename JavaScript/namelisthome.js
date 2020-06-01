$(function () {
  const form = {
    init: function () {
      this.cacheDom();
      this.start();
    },
    cacheDom: function () {
      this.$form = $("form");
    },
    start: function () {
      this.$form.addClass("ani-form");
    },
  };
  form.init();
});
