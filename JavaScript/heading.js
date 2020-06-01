$(function () {
  const heading = {
    init: function () {
      this.cacheDom();
      this.start();
    },
    cacheDom: function () {
      this.$heading = $(".heading");
      this.$heading1 = this.$heading.find("#heading-1");
      this.$heading2 = this.$heading.find("#heading-2");
    },
    start: function () {
      setTimeout(() => {
        this.$heading1.show().addClass("ani-heading-1");
      }, 300);
      setTimeout(() => {
        this.$heading2.show().addClass("ani-heading-2");
      }, 500);
    },
  };

  heading.init();
});
