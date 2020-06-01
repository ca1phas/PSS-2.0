$(function () {
  const footer = {
    init: function () {
      this.cacheDom();
      this.bindEvents();
    },
    cacheDom: function () {
      this.$footer = $(".footer-con");
      this.$facebook = this.$footer.find("#facebook");
      this.$crTrigger = this.$footer.find("a:first-child");
    },
    bindEvents: function () {
      this.$facebook
        .mouseenter(() => {
          this.fbMouseEnter();
        })
        .mouseleave(() => {
          this.fbMouseLeave();
        });
      this.$crTrigger.click(() => {
        modal.init();
      });
    },
    fbMouseEnter: function () {
      this.$facebook
        .find("img")
        .attr("src", "../Icons/General/facebook-hover.svg");
    },
    fbMouseLeave: function () {
      this.$facebook.find("img").attr("src", "../Icons/General/facebook.svg");
    },
  };
  //Copyright Modal
  const modal = {
    init: function () {
      this.cacheDom();
      this.bindEvents();
      this.start();
    },
    cacheDom: function () {
      this.$modal = $(".modal");
      this.$closeBtn = this.$modal.find("span");
    },
    bindEvents: function () {
      this.$closeBtn.click(() => {
        this.closeModal();
      });
    },
    start: function () {
      this.$modal.show().addClass("ani-modal");
    },
    closeModal: function () {
      this.$modal.hide().removeClass("ani-modal");
    },
  };
  footer.init();
});
