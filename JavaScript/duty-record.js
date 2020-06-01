class dutySortOverObj {
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
      this.dateCol = data.find(".date-column");
      this.startCol = data.find(".start-column");
      this.endCol = data.find(".end-column");
      this.dutyorgantiCol = data.find(".dutyorganti-column");
      this.verify = data.find(".verify-column");
      //Time & Date
      this.startHour = this.startCol.children().text().substring(0, 2);
      this.endHour = this.endCol.children().text().substring(0, 2);
      this.startMin = this.startCol.children().text().substring(3, 6);
      this.endMin = this.endCol.children().text().substring(3, 6);
      this.difInHour = this.startHour - this.endHour;
      this.difInMinute = this.startMin - this.endMin;
    }
    init() {
      this.varifySession();
      this.varifyStatus();
      this.calGantiNm();
      this.renderStatus();
    }
    varifySession() {
      if (this.startCol.children().text().substring(0, 2) < 12) {
        this.session = "morning";
      } else if (this.startCol.children().text().substring(0, 2) > 12) {
        this.session = "afternoon";
      }
    }
    varifyStatus() {
      if (this.startHour < 12) {
        if (this.startHour - 7 > 0) {
          this.status = "error";
        } else if (this.difInHour > -5) {
          if (this.difInMinute > 0) {
            this.status = "error";
          } else {
            this.status = "sucess";
          }
        } else {
          this.status = "sucess";
        }
      } else if (this.startHour > 12) {
        if (this.startHour - 13 > 0) {
          this.status = "error";
        } else if (this.difInHour > -4) {
          if (this.difInMinute > 0) {
            this.status = "error";
          } else {
            this.status = "sucess";
          }
        } else {
          this.status = "sucess";
        }
      }
    }
    calGantiNm() {
      switch (this.status) {
        case "sucess":
          if (this.dutyorgantiCol.children().text() === "Ganti") {
            table.gantiNm -= 1;
          }
          break;
        case "error":
          table.gantiNm += 1;
          break;
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
      this.createOverlay();
      this.renderGantiNm();
      this.bindEvents();
      this.start();
    },
    cacheDom: function () {
      this.gantiNm = 0;
      this.$table = $(".table-con");
      this.$tableMain = this.$table.find(".table-main");
      this.$tableHeading = this.$tableMain.find(".table-heading");
      this.$tableDatas = this.$tableMain.find(".table-data");
      this.$gantiCon = this.$table.find(".ganti-con");
      this.$gantiData = this.$gantiCon.find(".data");
      this.$sort = this.$table.find(".sort-con");
    },
    bindEvents: function () {
      this.$sort.click(() => {
        this.callOverlayFunc();
      });
    },
    createDataRow: function () {
      this.$tableDatas.each((i, data) => {
        eval(`dataRow${i} = new tableData($(data)); dataRow${i}.init()`);
      });
    },
    createOverlay: function () {
      this.$sortOver = new overlay($(".sort-overlay"));
    },
    renderGantiNm: function () {
      this.gantiNm < 0
        ? this.$gantiData.text("0")
        : this.$gantiData.text(this.gantiNm);
    },
    start: function () {
      setTimeout(() => {
        this.$table.show().addClass("ani-table");
      }, 100);
    },
    callOverlayFunc: function () {
      this.$sortOver.init();
    },
  };
  table.init();
});
