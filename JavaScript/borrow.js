class inputType {
  constructor(type) {
    this.type = type.attr("id");
    this.typePage = type.attr("data-page");
    this.$input = type.find("input");
    this.$img = type.find("img");
  }
  init() {
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
    this.$img.attr(
      "src",
      "../Icons/General/Form/" + this.type + "-hv-" + this.typePage + ".svg"
    );
  }
  inputFocusOut() {
    this.$input.val() !== ""
      ? this.inputFocus
      : setTimeout(() => {
          this.close();
        }, 50);
  }
  close() {
    this.$input.val("");
    this.$img.attr("src", "../Icons/General/Form/" + this.type + ".svg");
  }
}

class borrowOverObj {
  constructor(con, page, darkColor1, darkColor3, pageType, typePage) {
    this.$con = con;
    this.page = page;
    this.pageType = pageType;
    this.typePage = typePage;
    this.darkColor1 = darkColor1;
    this.darkColor3 = darkColor3;
    this.typeInputs = ["venue", "id"];
    this.typeInputs.forEach((type) => {
      eval(`
      this.${type}Grp = new inputType(this.$con.find("#${type}"));
      this.${type}Grp.init();
      `);
    });
    this.varifyPage();
    this.varifyColor();
    this.createOverObj();
  }
  varifyPage() {
    if (this.page.includes("book")) {
      this.majorPageType = "book";
    } else if (this.page.includes("map")) {
      this.majorPageType = "map";
    } else if (this.page.includes("select")) {
      this.majorPageType = "select";
    } else if (this.page.includes("item")) {
      this.majorPageType = "item";
    } else if (this.page.includes("metricGeo")) {
      this.majorPageType = "metricGeo";
    } else if (this.page.includes("custom")) {
      this.majorPageType = "custom";
    }
  }
  varifyColor() {
    if (this.page.includes("lecture")) {
      this.priColor1 = "#bb86fc";
      this.priColor2 = "#705097";
    } else if (this.page.includes("ict")) {
      this.priColor1 = "#03DAC5";
      this.priColor2 = "#018786";
    }
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
  close() {
    this.typeInputs.forEach((type) => {
      eval(`this.${type}Grp.close()`);
    });
    this.overObj.close();
  }
}

class selectOverObj {
  constructor(con, page, darkColor1, darkColor3, priColor1, priColor2) {
    this.darkColor1 = darkColor1;
    this.darkColor3 = darkColor3;
    this.priColor1 = priColor1;
    this.priColor2 = priColor2;
    this.$select = con.find("select");
    this.defaultSelect = this.$select.val();
    this.$qtt = con.find("#qtt input");
    this.init();
  }
  init() {
    this.bindEvents();
  }
  bindEvents() {
    this.$select.change(() => {
      this.selectChange();
    });
  }
  selectChange() {
    this.$select.css("border", `1px solid ${this.priColor2}`);
    this.$select.css("color", this.priColor1);

    if (this.$select.val() !== this.defaultSelect) {
      if ($(this.$select[0].children[0]).val() === this.defaultSelect) {
        this.$select[0].children[0].remove(0);
      }
    }
  }
  close() {
    if ($(this.$select[0].children[0]).val() !== this.defaultSelect) {
      let def = `<option value = "${this.defaultSelect}">${this.defaultSelect}</option>`;
      this.$select.prepend(def);
      this.$select.val(this.defaultSelect);
    }
    this.$select.css({
      border: `1px solid ${this.darkColor3}`,
      color: this.darkColor3,
    });
    this.$qtt.val("");
  }
}

class itemOverObj {
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
    this.$item = this.$con.find(".item-sec");
    this.$item.each((i, e) => {
      eval(
        `this.itemGrp${i} = new itemGrp(
          $(this.$item[i]), 
          this.page, 
          this.darkColor1, 
          this.darkColor3, 
          this.priColor1, 
          this.priColor2,
          this.pageType,
          this.typePage);`
      );
    });
  }
  close() {
    this.$item.each((i, e) => {
      eval(`this.itemGrp${i}.close()`);
    });
  }
}

class customOverObj {
  constructor(con) {
    this.$item = con.find("#custom input");
    this.$qtt = con.find("#qtt input");
  }
  close() {
    this.$item.val("");
    this.$qtt.val("");
  }
}

class itemGrp {
  constructor(
    item,
    page,
    darkColor1,
    darkColor3,
    priColor1,
    priColor2,
    pageType,
    typePage
  ) {
    this.page = page;
    this.pageType = pageType;
    this.typePage = typePage;
    this.darkColor1 = darkColor1;
    this.darkColor3 = darkColor3;
    this.priColor1 = priColor1;
    this.priColor2 = priColor2;
    this.$icon = item.find(".item-img img");
    this.$input = item.find("input[type='checkbox']");
    this.$qtt = item.find(".item-qtt");
    this.$qttInput = this.$qtt.find("input");
    this.$qttUp = this.$qtt.find(".up img");
    this.$qttDown = this.$qtt.find(".down img");
    this.itemType = this.$icon.attr("data-item");
    this.init();
  }
  init() {
    this.bindEvents();
  }
  bindEvents() {
    this.$input.change(() => {
      this.checked = this.$input[0].checked;
      if (this.checked) {
        this.itemChecked();
        this.$qttInput.change(() => {
          this.qttInputChange();
        });
        this.$qttUp.click(() => {
          this.upListener();
        });
        this.$qttDown.click(() => {
          this.downListener();
        });
        this.qttInputChange();
      } else {
        this.close();
      }
    });
  }
  itemChecked() {
    this.$icon.attr(
      "src",
      "../Icons/" +
        this.typePage +
        "/" +
        this.pageType +
        "/" +
        this.itemType +
        "-hv.svg"
    );
    this.$input.parent().css("border", `1px solid ${this.priColor2}`);
    this.qttIndicatorActive();
  }
  qttLightUp() {
    this.$qttUp.css("pointer-events", "all");
    this.$qttDown.css("pointer-events", "all");
    this.$qttUp.attr(
      "src",
      "../Icons/General/Form/up-hv-" + this.typePage + ".svg"
    );
    this.$qttDown.attr(
      "src",
      "../Icons/General/Form/down-hv-" + this.typePage + ".svg"
    );
    this.$qttInput.css({
      border: `1px solid ${this.priColor2}`,
      color: `${this.priColor1}`,
    });
  }
  qttLightDown() {
    if (!this.checked) {
      this.$qttUp.css("pointer-events", "none");
      this.$qttDown.css("pointer-events", "none");
    }
    this.$qttUp.attr("src", "../Icons/General/Form/up.svg");
    this.$qttDown.attr("src", "../Icons/General/Form/down.svg");
    this.$qttInput.css({
      border: `1px solid ${this.darkColor1}`,
      color: `${this.darkColor3}`,
    });
  }
  qttInputChange() {
    if (this.$qttInput.val() == 0 || this.$qttInput.val() === "") {
      this.qttLightDown();
    }
  }
  qttIndicatorActive() {
    this.qttLightUp();
    this.$qttInput
      .removeAttr("disabled")
      .val("1")
      .attr("placeholder", "")
      .focus(() => {
        this.qttIndicatorFocus();
      })
      .focusout(() => {
        this.$qttInput.val() === ""
          ? this.qttIndicatorFocusOut()
          : this.$qttInput;
      });
  }
  qttIndicatorFocus() {
    this.$qttInput.attr("placeholder", "");
    this.qttLightUp();
  }
  qttIndicatorFocusOut() {
    this.$qttInput.attr({ disabled: "true", placeholder: "0" }).val("");
    this.qttLightDown();
  }
  upListener() {
    this.qttLightUp();
    if (this.$qttInput.val() === "") {
      this.$qttInput.val(1);
    } else {
      this.$qttValue = parseInt(this.$qttInput.val());
      this.$qttInput.val(this.$qttValue + 1);
    }
  }
  downListener() {
    this.qttLightUp();
    if (this.$qttInput.val() !== "" && this.$qttInput.val() > 0) {
      this.$qttValue = parseInt(this.$qttInput.val());
      this.$qttInput.val(this.$qttValue - 1);
    }

    if (this.$qttInput.val() === "0" || this.$qttInput.val() === "") {
      this.qttLightDown();
      this.$qttInput.val("").attr("placeholder", "0");
    }
  }
  close() {
    this.$icon.attr(
      "src",
      "../Icons/" +
        this.typePage +
        "/" +
        this.pageType +
        "/" +
        this.itemType +
        ".svg"
    );
    this.$input
      .prop("checked", false)
      .parent()
      .css("border", `1px solid ${this.darkColor1}`);
    this.qttIndicatorFocusOut();
    this.$qttUp.unbind("click");
    this.$qttDown.unbind("click");
  }
}

class itemRow {
  constructor(
    item,
    page,
    darkColor1,
    darkColor3,
    priColor1,
    priColor2,
    pageType,
    typePage
  ) {
    this.page = page;
    this.pageType = pageType;
    this.typePage = typePage;
    this.darkColor1 = darkColor1;
    this.darkColor3 = darkColor3;
    this.priColor1 = priColor1;
    this.priColor2 = priColor2;
    this.$label = item.find("p");
    this.$icons = item.find(".item-img img");
    this.$inputs = item.find("input[type='checkbox']");
    this.inputsNm = this.$inputs.length;
    this.init();
  }
  init() {
    this.$inputs.each((i, input) => {
      const $targetedInput = $(input);
      const e = i;
      this.bindEvents($targetedInput, e);
    });
  }
  bindEvents($input, e) {
    $input.change((i) => {
      this.geometricType = $input.attr("data-geometric");
      this.checked = $input[0].checked;
      if (this.checked) {
        this.itemChecked($input, e);
      } else {
        this.close();
      }
    });
  }
  itemChecked($input, e) {
    $input.parents("div")[2].children[0].style.color = this.priColor1;
    $input
      .next(0)
      .children(0)
      .attr(
        "src",
        "../Icons/" +
          this.typePage +
          "/geometric/" +
          this.geometricType +
          "-hv.svg"
      );
    $input.parent(0).css("border", `1px solid ${this.priColor2}`);
    this.eS = this.setEs();
    this.disabledInput(e);
  }
  setEs() {
    let eS = [];
    for (let i = 0; i < this.inputsNm; i++) {
      eS.push(i);
    }
    return eS;
  }
  disabledInput(e) {
    this.eS.splice(e, 1);
    this.eS.forEach((e) => {
      this.$inputs[e].setAttribute("disabled", "true");
    });
  }
  enableInput() {
    this.$inputs.each((i, input) => {
      $(input).prop("checked", false).removeAttr("disabled");
    });
  }
  close() {
    this.$inputs.each((i, input) => {
      const $targetedInput = $(input);
      this.geometricType = $targetedInput.attr("data-geometric");
      $targetedInput
        .next()
        .children(0)
        .attr(
          "src",
          "../Icons/" +
            this.typePage +
            "/geometric/" +
            this.geometricType +
            ".svg"
        );
      $targetedInput.parent().css("border", `1px solid ${this.darkColor1}`);
      this.$label.css("color", this.darkColor3);
      this.enableInput();
    });
  }
}
