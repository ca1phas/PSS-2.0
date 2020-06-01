class gantiSortOverObj {
  constructor(con) {
    this.$con = con;
    this.$leftCheckbox = con.find(".sort-left .checkbox");
    this.$rightCheckbox = con.find(".sort-right .checkbox");
    this.allCheckbox = [this.$leftCheckbox, this.$rightCheckbox];
    this.bindEvents();
  }
  bindEvents() {
    this.allCheckbox.forEach(($checkbox) => {
      $checkbox.each((i, button) => {
        const e = i;
        const $input = $(button).find("input");
        $input.change((i) => {
          this.checkmarkChange(i, e, $checkbox);
        });
      });
    });
  }
  checkmarkChange(i, e, $checkbox) {
    const eS = [0, 1];
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
    const eS = [0, 1];
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

$(function () {
  class tableData {
    constructor(data) {
      //Column
      this.statusCol = data.find(".status-column");
      this.nameCol = data.find(".name-column");
      this.classCol = data.find(".class-column");
      this.gantiCol = data.find(".ganti-column");
      this.gantiNm = this.gantiCol.children().text();
    }
    init() {
      this.verifyStatus();
      this.renderStatus();
    }
    verifyStatus() {
      if (this.gantiNm < 20) {
        if (this.gantiNm < 10) {
          this.status = "sucess";
        } else {
          this.status = "warning";
        }
      } else {
        this.status = "error";
      }
    }
    renderStatus() {
      const img = document.createElement("img");
      this.statusCol.append(img);
      this.statusCol
        .children()
        .attr("src", `../Icons/return/${this.status}.svg`);
    }
  }
  const table = {
    init: function () {
      this.cacheDom();
      this.createDataRow();
      this.bindEvents();
      this.createOverlay();
      this.start();
    },
    cacheDom: function () {
      this.$table = $(".table-con");
      this.$tableMain = this.$table.find(".table-main");
      this.$tableHeading = this.$tableMain.find(".table-heading");
      this.$tableDatas = this.$tableMain.find(".table-data");
      this.$sort = this.$table.find(".sort-con");
    },
    bindEvents: function () {
      this.$sort.click(() => {
        this.callOverlayFunc();
      });
    },
    start: function () {
      this.$table.show().addClass("ani-table");
    },
    createDataRow: function () {
      this.$tableDatas.each((i, data) => {
        eval(`dataRow${i} = new tableData($(data)); dataRow${i}.init()`);
      });
    },
    createOverlay: function () {
      this.$sortOver = new overlay($(".sort-overlay"));
    },
    callOverlayFunc: function () {
      this.$sortOver.init();
    },
  };
  table.init();
});
