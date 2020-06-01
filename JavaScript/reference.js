$(function () {
  const reference = {
    init: function () {
      this.cacheDom();
      this.start();
    },
    cacheDom: function () {
      this.$main = $(".main-con");
      this.$title = this.$main.find(".title");
      this.$content = this.$main.find(".content-con");
      this.$con = this.$content.find(".con");
      this.$score = this.$con.find(".score p");
      this.$callout = this.$content.find(".callout");
      this.varifyScoreColor();
    },
    varifyScoreColor: function () {
      this.$score.each((i, score) => {
        switch ($(score).text()) {
          case "3":
            $(score).css("color", "#03DAC5");
            break;
          case "5":
            $(score).css("color", "#BB86FC");
            break;
          case "10":
            $(score).css("color", "#FF7597");
            break;
          default:
            break;
        }
      });
    },
    start: function () {
      setTimeout(() => {
        this.$title.show().addClass("ani-slide-in");
        setTimeout(() => {
          this.$con.each((i, con) => {
            $(con).css("display", "grid").addClass("ani-drop");
          });
        }, 300);
      }, 10);
    },
  };
  reference.init();
});
