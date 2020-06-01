class namelistOverObj {
  constructor(con) {
    this.$con = con;
    this.$input = this.$con.find(".input-grp input");
    this.$label = this.$input.siblings();
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
    this.$input.css("border", "2px solid #018786");
    this.$label.addClass("focus");
  }
  inputFocusOut() {
    if (this.$input.val() === "" || this.$input.val() === null) {
      this.$input.css("border", "2px solid #444655");
      this.$label.removeClass("focus");
    }
  }
  close() {
    this.$input.val("");
    this.inputFocusOut();
    namelist.closeOverlay();
  }
}

class namelistSortOverObj {
  constructor(con) {
    this.$con = con;
    this.$leftCheckbox = this.$con.find(".left-con label");
    this.$rightCheckbox = this.$con.find(".right-con label");
    this.allCheckbox = [this.$leftCheckbox, this.$rightCheckbox];
    this.bindEvents();
  }
  bindEvents() {
    this.allCheckbox.forEach(($checkbox) => {
      $checkbox.each((i, button) => {
        const e = i;
        const $input = $(button).find("input");
        $input.change((i) => {
          this.checkmarkChange($checkbox, i, e);
        });
      });
    });
  }
  createEs($checkbox) {
    this.checkmarkNm = $checkbox.find("input").length;
    let eS = [];
    for (let i = 0; i < this.checkmarkNm; i++) {
      eS.push(i);
    }
    return eS;
  }
  checkmarkChange($checkbox, i, e) {
    const eS = this.createEs($checkbox);
    eS.splice(e, 1);
    if (i.target.checked) {
      this.checkmarkChecked(eS, $checkbox);
    } else {
      this.checkmarkNotChecked($checkbox);
    }
  }
  checkmarkChecked(eS, $checkbox) {
    eS.forEach((e) => {
      $($checkbox[e]).addClass("disabled").children(0).attr("disabled", "true");
    });
  }
  checkmarkNotChecked($checkbox) {
    const eS = this.createEs($checkbox);
    eS.forEach((e) => {
      $($checkbox[e])
        .removeClass("disabled")
        .children(0)
        .prop("checked", false)
        .removeAttr("disabled", "true");
    });
  }
  close() {
    this.allCheckbox.forEach(($checkbox) => {
      this.checkmarkNotChecked($checkbox);
    });
    namelist.closeOverlay();
  }
}

class namelistEditOverObj {
  constructor(con) {
    this.$con = con;
  }
  close() {
    namelist.closeOverlay();
  }
}

$(function () {
  namelist = {
    init: function () {
      this.cacheDom();
      this.verifyStatus();
      this.bindEvents();
      this.createOverlay();
      this.start();
    },
    cacheDom: function () {
      this.$body = $("body");
      this.$content = this.$body.find(".content-con");
      this.$filter = this.$content.find(".filter-con button");
      this.$sort = this.$content.find(".sort-con button");
      this.$allDetailCon = this.$content.find(".detail-con");
    },
    bindEvents: function () {
      this.$filter.click(() => {
        this.callOverlayFunc("filter");
      });
      this.$sort.click(() => {
        this.callOverlayFunc("sort");
      });
      this.$allDetailCon.each((i, con) => {
        $(con).click(() => {
          this.callOverlayFunc("edit", $(con).find(".name span").text());
        });
      });
    },
    start: function () {
      this.$content.addClass("ani-namelist");
    },
    verifyStatus: function () {
      this.$allDetailCon.each((i, con) => {
        const $img1 = $(con).find(".status-con img:first-child");
        const $img2 = $(con).find(".status-con img:last-child");
        const score = $(con).find(".score-con p").text();
        let status;
        if (score < 70) {
          status = 1;
          if (score < 40) {
            status += 1;
            if (score == 0) {
              status += 1;
            }
          }
        } else {
          status = 0;
        }

        this.renderStatus(status, $img1, $img2);
      });
    },
    renderStatus: function (status, $img1, $img2) {
      switch (status) {
        case 1:
          $img1.attr("src", "../Icons/return/warning.svg");
          break;
        case 2:
          console.log(2);
          $img1.attr("src", "../Icons/return/warning.svg");
          $img2.attr("src", "../Icons/return/warning.svg");
          break;
        case 3:
          $img1.attr("src", "../Icons/return/error.svg");
          break;
      }
    },
    createOverlay: function () {
      this.filterOver = new overlay($(".filter-overlay"));
      this.sortOver = new overlay($(".sort-overlay"));
      this.editOver = new overlay($(".edit-overlay"));
    },
    callOverlayFunc: function (type, id) {
      this.$body.css("overflow", "hidden");
      this.y = window.pageYOffset;
      eval(`
        this.${type}Over.init();
        this.${type}Over.$con.css({
          top: "${this.y}px"
        })
      `);
    },
    closeOverlay: function () {
      this.$body.css("overflow", "visible");
    },
  };
  namelist.init();
});

let namelist = {};
