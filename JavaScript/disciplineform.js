$(function () {
  const form = {
    init: function () {
      this.cacheDom();
      this.bindEvents();
      this.start();
    },
    bindEvents: function () {
      this.allCategory.forEach((cat) => {
        eval(`
        this.$${cat}
        .click((target) => {
            this.categoryClick(cat, target);
        })
        .parent()
        .mouseenter((target) => {
            this.categoryHover(target);
        })
        .mouseleave((target) => {
            this.categoryLeave(target)
        })
            `);
      });
    },
    cacheDom: function () {
      this.$form = $(".form-con");
      this.$category = this.$form.find(".cat-con");
      this.$arrow = this.$category.find(".arrow");
      this.$title = this.$category.find(".title p");
      this.$titleLine = this.$category.find(".title span");
      this.$categoryRow = this.$category.find(".row");
      this.allCategory = ["asas", "orang", "masa", "tt"];
      this.allCategory.forEach((cat) => {
        eval(`this.$${cat} = this.$category.find(".${cat} input")`);
      });
      this.$case = this.$form.find(".case-con");
      this.$submit = this.$case.find(".submit-con");
    },
    start: function () {
      this.$title.css("display", "block").addClass("ani-slide-in");
      setTimeout(() => {
        this.$titleLine.css("display", "flex").addClass("ani-slide-in");
      }, 150);
      setTimeout(() => {
        this.$categoryRow.each((i, row) => {
          $(row).css("display", "flex").addClass("ani-slide-down");
        });
      }, 300);
    },
    categoryHover: function (target) {
      $(target[0]).attr("type") === "checkbox"
        ? (x = target.parent())
        : (x = $(target.target));
      x.parent()
        .css({
          transform: "scale(1.05)",
          transition: "0.1s ease-out",
        })
        .children()
        .css({
          color: "#eee",
        })
        .children("img")
        .attr("src", "../Icons/General/arrowRight-hv.svg");
    },
    categoryLeave: function (target) {
      $(target.target)
        .parent()
        .css({
          transform: "scale(1)",
          transition: "0.1s ease-out",
        })
        .children()
        .css({
          color: "#999aa6",
        })
        .children("img")
        .attr("src", "../Icons/General/arrowRight.svg");
    },
    categoryClick: function (cat, target) {
      if (target.target.checked) {
        this.categoryClicked(cat);
      } else {
        this.categoryNotClicked();
      }
    },
    categoryClicked: function (cat) {
      this.allCategory.forEach((category, i) => {
        if (category === cat) {
          this.e = i;
        }
      });
      this.clicked = this.allCategory[this.e];
      this.allCategory.splice(this.e, 1);
      this.disableCategory();
      this.showClickedCategory();
      this.allCategory.splice(this.e, 0, this.clicked);
      this.displayCases();
    },
    categoryNotClicked: function () {
      this.enableCategory();
      this.removeCases();
    },
    disableCategory: function () {
      this.allCategory.forEach((cat) => {
        eval(`
            this.$${cat}
            .off("click")
            .parent()
            .off("mouseenter")
            .off("mouseleave")
            .css({
                "pointer-events": "none",
                "color" : "#55586b"
            })
          `);
      });
    },
    enableCategory: function () {
      this.bindEvents();
      this.allCategory.forEach((cat) => {
        eval(`
                this.$${cat}
                .parent()
                .css({
                    "pointer-events": "",
                    "color": "#999aa6"
                })
              `);
      });
    },
    showClickedCategory: function () {
      eval(`
            this.$${this.clicked}.parent().off("mouseleave");
            this.categoryHover(this.$${this.clicked})
        `);
    },
    verifyCaseType: function () {
      switch (this.clicked) {
        case "asas":
          this.rowNm = "nine";
          this.rowInt = 9;
          break;
        case "orang":
          this.rowNm = "eight";
          this.rowInt = 8;
          break;
        case "masa":
          this.rowNm = "one";
          this.rowInt = 1;
          break;
        case "tt":
          this.rowNm = "eight";
          this.rowInt = 8;
          break;
        default:
          alert("Invalid Case Type");
      }
    },
    displayCases: function () {
      this.verifyCaseType();
      this.$form.css("grid-template-columns", "354px 376px");
      eval(`
        this.$case
        .addClass("${this.rowNm}-row")
        .css({
            "display": "grid",
        })
        .find(".row-${this.clicked}").each((i,row) => {
            row.style.display = "flex"
        })
        this.caseInit();
      `);
    },
    removeCases: function () {
      this.verifyCaseType();
      this.$form.css("grid-template-columns", "354px");
      eval(`
        this.$case
        .removeClass("${this.rowNm}-row")
        .css({
            "display": "none",
        })
        .find(".row-${this.clicked}").each((i,row) => {
            row.style.display = "none"
        })
      `);
      this.hideIdForm();
    },
    caseInit: function () {
      this.caseCacheDom();
      this.caseBindEvents();
    },
    caseCacheDom: function () {
      eval(`this.$caseRows = this.$case.find(".row-${this.clicked}")`);
    },
    caseBindEvents: function () {
      this.$caseRows.each((i, row) => {
        $(row)
          .children()
          .children("input")
          .click((target) => {
            this.caseClick(target);
          });
      });
    },
    caseClick: function (target) {
      if (target.target.checked) {
        this.caseClicked(target);
      } else {
        this.caseNotClicked(target);
      }
    },
    caseClicked: function (target) {
      this.$caseRows.each((i, row) => {
        if ($(row.children[0].children[0]).val() == $(target.target).val()) {
          this.eC = i;
        }
      });
      this.clickedCase = this.$caseRows[this.eC];
      this.$clickedCase = $(this.clickedCase);
      this.$caseRows.splice(this.eC, 1);
      this.disableCase();
      this.displayIdForm();
      this.$caseRows.splice(this.eC, 0, this.clickedCase);
    },
    caseNotClicked: function (target) {
      this.caseBindEvents();
      this.$caseRows.each((i, row) => {
        $(row).css("display", "flex");
      });
      this.hideIdForm();
    },
    disableCase: function () {
      this.$caseRows.each((i, row) => {
        $(row).hide();
      });
    },
    displayIdForm: function () {
      eval(`
        this.$case
        .removeClass("${this.rowNm}-row")
        .addClass("two-row")
      `);
      this.$submit.css("display", "grid");
      this.idFormInit();
    },
    hideIdForm: function () {
      eval(`
        this.$case
        .removeClass("two-row")
        .addClass("${this.rowNm}-row")
      `);
      this.$submit.hide();
      if (this.$idInput) {
        this.$idInput.val("");
      }
    },
    idFormInit: function () {
      this.idCacheDom();
      this.idBindEvents();
    },
    idCacheDom: function () {
      this.$idInput = this.$submit.find("input");
      this.$idLabel = this.$submit.find("label");
      this.$idGap = this.$submit.find("span");
    },
    idBindEvents: function () {
      this.$idInput
        .focus(() => {
          this.idFocus();
        })
        .focusout(() => {
          this.idFocusOut();
        });
    },
    idFocus: function () {
      this.$idInput.css({
        color: "#bb86fc",
        border: "1px solid #705097",
      });
      this.$idLabel.addClass("ani-focus").removeClass("ani-focus-out");
      this.$idGap.show();
    },
    idFocusOut: function () {
      if (!this.$idInput.val()) {
        this.$idInput.css({
          color: "",
          border: "",
        });
        this.$idLabel.removeClass("ani-focus").addClass("ani-focus-out");
        this.$idGap.hide();
      }
    },
  };
  form.init();
});
