$(function () {
  const form = {
    init: function () {
      this.cacheDom();
      this.start();
    },
    cacheDom: function () {
      this.$form = $(".select-form");
      this.$selectedYear = this.$form.find(".selected-time").parent();
      this.$row = this.$form.find(".row");
    },
    start: function () {
      this.$form.addClass("ani-fade");
    },
  };
  form.init();
});
