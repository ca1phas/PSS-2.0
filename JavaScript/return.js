class returnOverObj {
  constructor(con, page, darkColor1, darkColor3, pageType, typePage) {
    this.$con = con;
    this.page = page;
    this.pageType = pageType;
    this.typePage = typePage;
    this.darkColor1 = darkColor1;
    this.darkColor3 = darkColor3;
    this.priColor1 = "#bb86fc";
    this.priColor2 = "#705097";
    this.init();
  }
  init() {
    this.varifyType();
    this.createOverObj();
  }
  createOverObj() {
    eval(`
      this.overObj = new ${this.majorPageType}OverObj(
        this.$con,
        this.page,
        this.darkColor1,
        this.darkColor3,
        this.priColor1,
        this.priColor2,
        this.pageType,
        this.typePage,
        );
      `);
  }
  varifyType() {
    if (this.page.includes("filter")) {
      this.majorPageType = "filter";
    } else if (this.page.includes("sort")) {
      this.majorPageType = "sort";
    } else if (this.page.includes("edit")) {
      this.majorPageType = "edit";
    } else if (this.page.includes("delete")) {
      this.majorPageType = "delete";
    }
  }
  close() {
    this.overObj.close();
  }
}

class filterOverObj {
  constructor(
    con,
    page,
    darkColor1,
    darkColor3,
    priColor1,
    priColor2,
    pageType,
    typePage
  ) {
    this.$con = con;
    this.page = page;
    this.pageType = pageType;
    this.typePage = typePage;
    this.darkColor1 = darkColor1;
    this.darkColor3 = darkColor3;
    this.priColor1 = priColor1;
    this.priColor2 = priColor2;
    this.$checkbox = this.$con.find(".input-btn-grp label");
    this.$inputs = this.$con.find(".right-con input");
    this.$selects = this.$con.find("select");
    this.defaultSelect = "Mon";
    this.bindEvents();
  }
  bindEvents() {
    this.$checkbox.each((i, box) => {
      const $input = $(box).find("input");
      $input.change((i) => {
        this.checkmarkChange(i);
      });
    });
    this.$inputs.each((i, input) => {
      $(input)
        .focus((i) => {
          this.inputFocus($(i.target));
        })
        .focusout((i) => {
          if (!$(i.target).val()) {
            this.inputFocusOut($(i.target));
          }
        });
    });
    this.$selects.each((i, select) => {
      const $select = $(select);
      $select.change(() => {
        this.selectChange($select);
      });
    });
  }
  checkmarkChange(i) {
    const $targetedInput = $(i.target);
    if (i.target.checked) {
      this.checkmarkChecked($targetedInput);
    } else {
      this.checkmarkNotChecked($targetedInput);
    }
  }
  checkmarkChecked($targetedInput) {
    $targetedInput.parent().addClass("checked");
  }
  checkmarkNotChecked($targetedInput) {
    $targetedInput.prop("checked", false).parent().removeClass("checked");
  }
  inputFocus($targetedInput) {
    $targetedInput.css("border", `1px solid ${this.priColor2}`);
  }
  inputFocusOut($targetedInput) {
    $targetedInput.val("").css("border", `1px solid ${this.darkColor1}`);
  }
  selectChange($select) {
    $select.css({
      border: `1px solid ${this.priColor2}`,
      color: this.priColor1,
    });

    if ($select.val() !== this.defaultSelect) {
      if ($select.children(0).val() === this.defaultSelect) {
        $select[0].children[0].remove();
      }
    }
  }
  close() {
    this.$checkbox.each((i, box) => {
      const $input = $(box).find("input");
      this.checkmarkNotChecked($input);
    });
    this.$inputs.each((i, input) => {
      this.inputFocusOut($(input));
    });
    this.$selects.each((i, select) => {
      const $select = $(select);
      if ($select.children(0).val() !== this.defaultSelect) {
        let def = `<option value = "${this.defaultSelect}">${this.defaultSelect}</option>`;
        $select.prepend(def);
        $select.val(this.defaultSelect);
      }
      $select.css({
        border: `1px solid ${this.darkColor1}`,
        color: this.darkColor3,
      });
    });
  }
}

class sortOverObj {
  constructor(con) {
    this.$con = con;
    this.$leftCheckbox = this.$con.find(".sort-left-content-con label");
    this.$rightCheckbox = this.$con.find(".sort-right-content-con label");
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
  }
}

class editOverObj {
  constructor(con) {
    this.$con = con;
    this.$qtt = this.$con.find("#qtt input");
  }
  close() {
    this.$qtt.val("");
  }
}

class deleteOverObj {
  constructor(con) {
    this.$con = con;
    this.$cancel = this.$con.find(".btn-con a");
    this.bindEvents();
  }
  bindEvents() {
    this.$cancel.click(() => {
      this.close();
    });
  }
  close() {
    this.$con.removeClass("overlay");
    this.$con.css("background", "");
  }
}

$(function () {
  class tableData {
    constructor(data) {
      this.$row = data;
      //Column
      this.$statusCol = data.find(".status-column");
      this.$categoryCol = data.find(".category-column");
      this.$itemNameCol = data.find(".item-name-column");
      this.$quantityCol = data.find(".quantity-column");
      this.$venueCol = data.find(".venue-column");
      this.$idCol = data.find(".id-column");
      this.$borrowDateCol = data.find(".borrow-date-column");
      this.$returnDateCol = data.find(".return-date-column");
      this.$returnQuantityCol = data.find(".return-quantity-column");
      this.returnPssCol = data.find(".return-pss-column");
      this.$detailsCol = data.find(".details-column");
      //Time & Date
      this.date = new Date();
      this.year = this.date.getFullYear();
      this.month = this.date.getUTCMonth() + 1;
      this.day = this.date.getDate();
      this.currentDate = this.varifyCurrentDate();
      this.borrowDate = this.$borrowDateCol.children().text();
      this.returnDate = this.$returnDateCol.children().text();
      this.difInYear =
        this.currentDate.substring(0, 4) - this.borrowDate.substring(0, 4);
      this.difInMonth =
        this.currentDate.substring(5, 7) - this.borrowDate.substring(5, 7);
      this.difInDay =
        this.currentDate.substring(8, 10) - this.borrowDate.substring(8, 10);
    }
    init() {
      this.varifyReturn();
      this.bindEvents();
      this.renderStatus();
    }
    bindEvents() {
      this.$row.click(() => {
        this.callOverlayFunc();
      });
      this.$row.contextmenu((e) => {
        this.callDeleteOverlay(e);
      });
    }
    varifyCurrentDate() {
      let currentDate;
      if (this.month < 10) {
        if (this.day < 10) {
          currentDate = this.year + "-0" + this.month + "-0" + this.day;
        } else {
          currentDate = this.year + "-0" + this.month + "-" + this.day;
        }
      } else {
        if (this.day < 10) {
          currentDate = this.year + "-" + this.month + "-0" + this.day;
        } else {
          currentDate = this.year + "-" + this.month + "-" + this.day;
        }
      }
      return currentDate;
    }
    varifyReturn() {
      if (this.returnDate) {
        this.varifyReturnStatus();
      } else {
        this.varifyDelayStatus();
      }
    }
    varifyDelayStatus() {
      if (this.difInMonth > 1) {
        this.status = "warning";
      } else {
        if (this.difInDay > -16) {
          if (this.difInDay < 0) {
            this.status = "warning";
          } else {
            this.status = null;
          }
        } else {
          this.status = null;
        }
      }
    }
    varifyReturnStatus() {
      this.borrowQuantity = this.$quantityCol.children().text();
      this.returnQuantity = this.$returnQuantityCol.children().text();
      this.difInQuantity = this.returnQuantity - this.borrowQuantity;

      if (this.difInQuantity < 0) {
        this.status = "error";
      } else {
        this.status = "sucess";
      }
    }
    renderStatus() {
      const img = document.createElement("img");
      this.$statusCol.append(img);
      this.status !== null
        ? eval(
            `this.$statusCol.children(0).attr("src", "../Icons/return/${this.status}.svg")`
          )
        : this.status;
    }
    callOverlayFunc() {
      table.editOver.init();
    }
    callDeleteOverlay(e) {
      table.deleteOver.init();
      e.preventDefault();
    }
  }
  const table = {
    init: function () {
      this.cacheDom();
      this.createDataRow();
      this.createOverlay();
      this.bindEvents();
      this.start();
    },
    cacheDom: function () {
      this.$table = $(".table-con");
      this.$tableMain = this.$table.find(".table-main");
      this.$tableHeading = this.$tableMain.find(".table-heading");
      this.$tableDatas = this.$tableMain.find(".table-data");
      this.$filter = this.$table.find(".filter-con button");
      this.$sort = this.$table.find(".sort-con button");
    },
    bindEvents: function () {
      this.$filter.click(() => {
        this.callOverlayFunc("filter");
      });
      this.$sort.click(() => {
        this.callOverlayFunc("sort");
      });
    },
    createDataRow: function () {
      this.$tableDatas.each((i, data) => {
        eval(`dataRow${i} = new tableData($(data)); dataRow${i}.init()`);
      });
    },
    createOverlay: function () {
      this.filterOver = new overlay($(".filter-overlay"));
      this.sortOver = new overlay($(".sort-overlay"));
      this.editOver = new overlay($(".edit-overlay"));
      this.deleteOver = new overlay($(".delete-overlay"));
    },
    start: function () {
      setTimeout(() => {
        this.$table.show().addClass("ani-table");
      }, 100);
    },
    callOverlayFunc: function (type) {
      eval(`this.${type}Over.init()`);
    },
  };

  table.init();
});
