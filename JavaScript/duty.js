class dutyOverObj {
  constructor(con, page) {
    this.$con = con;
    this.page = page;
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
        );
      `);
  }
  varifyType() {
    if (this.page.includes("sort")) {
      this.majorPageType = "sort";
    } else {
      this.majorPageType = "submit";
    }
  }
  close() {
    this.overObj.close();
  }
}

class submitOverObj {
  constructor(con) {
    this.$con = con;
    this.$checkboxCon = con.find(".checkbox");
    this.bindEvents();
  }
  bindEvents() {
    this.$checkboxCon.each((i, button) => {
      const e = i;
      const $input = $(button).find("input");
      $input.change((i, input) => {
        this.checkmarkChange(i, e, $(i.target));
      });
    });
  }
  checkmarkChange(i, e, $input) {
    const eS = [0, 1];
    if ($input[0].checked) {
      eS.splice(e, 1);
      this.checkmarkChecked(eS);
    } else {
      this.checkmarkNotChecked(eS);
    }
  }
  checkmarkChecked(eS) {
    eS.forEach((e) => {
      $(this.$checkboxCon[e])
        .addClass("disabled")
        .children(0)
        .attr("disabled", "true");
    });
  }
  checkmarkNotChecked(eS) {
    eS.forEach((e) => {
      $(this.$checkboxCon[e])
        .removeClass("disabled")
        .children(0)
        .prop("checked", false)
        .removeAttr("disabled");
    });
  }
  close() {
    const eS = [0, 1];
    this.checkmarkNotChecked(eS);
  }
}

$(function () {
  cardCon.init("duty");
});
