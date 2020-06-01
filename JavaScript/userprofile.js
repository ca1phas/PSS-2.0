$(function () {
  const userprofile = {
    init: function () {
      this.cacheDom();
      this.start();
    },
    cacheDom: function () {
      this.$contentCon = $(".content-con");
      this.$leftCon = this.$contentCon.find(".left-con");
      this.$rightUpperCon = this.$contentCon.find(".right-upper-con");
      this.$rightLowerCon = this.$contentCon.find(".right-lower-con");
    },
    start: function () {
      setTimeout(() => {
        this.$leftCon.show().addClass("ani-left-con");
      }, 50);
      setTimeout(() => {
        this.$rightUpperCon.show().addClass("ani-right-upper-con");
      }, 150);
      setTimeout(() => {
        this.$rightLowerCon.show().addClass("ani-right-lower-con");
      }, 400);
    },
  };
  userprofile.init();
});
