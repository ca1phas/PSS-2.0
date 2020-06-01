$(function () {
  const nav = {
    init: function () {
      this.cacheDom();
      this.bindEvents();
    },
    cacheDom: function () {
      this.$nav = $(".nav-con");
      this.$navLinks = this.$nav.find(".nav-links");
      this.$user = this.$nav.find(".nav-user-con");
      this.$userIcon = this.$user.find("img");
    },
    bindEvents: function () {
      this.$user
        .mouseenter(() => {
          this.userMouseEnter();
        })
        .mouseleave(() => {
          this.userMouseLeave();
        });
    },
    userMouseEnter: function () {
      this.$userIcon.attr("src", "../Icons/General/user-hover.svg");
    },
    userMouseLeave: function () {
      this.$userIcon.attr("src", "../Icons/General/user.svg");
    },
  };

  nav.init();
});
