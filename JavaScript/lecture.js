class bookOverObj {
  constructor(con, page, darkColor1, darkColor3, priColor1, priColor2) {
    this.$con = con;
    this.page = page;
    this.darkColor1 = darkColor1;
    this.darkColor3 = darkColor3;
    this.priColor1 = priColor1;
    this.priColor2 = priColor2;
    this.$np = this.$con.find("#np input");
    this.overObj = new selectOverObj(
      this.$con,
      this.page,
      this.darkColor1,
      this.darkColor3,
      this.priColor1,
      this.priColor2
    );
  }
  close() {
    this.$np.val("");
    this.overObj.close();
  }
}

class mapOverObj {
  constructor(con, page, darkColor1, darkColor3, priColor1, priColor2) {
    this.$con = con;
    this.page = page;
    this.darkColor1 = darkColor1;
    this.darkColor3 = darkColor3;
    this.priColor1 = priColor1;
    this.priColor2 = priColor2;
    this.overObj = new selectOverObj(
      this.$con,
      this.page,
      this.darkColor1,
      this.darkColor3,
      this.priColor1,
      this.priColor2
    );
    this.$checkbox = con.find(".checkbox");
    this.$checkmark = con.find(".checkbox input");
    this.init();
  }
  init() {
    this.bindEvents();
  }
  bindEvents() {
    this.$checkmark.change(() => {
      this.checkmarkChange();
    });
  }
  checkmarkChange() {
    if (this.$checkmark[0].checked) {
      this.checkmarkChecked();
    } else {
      this.checkmarNotChecked();
    }
  }
  checkmarkChecked() {
    this.$checkbox.find("img").show();
    this.$checkbox.css("border", `1px solid ${this.priColor2}`);
    this.$checkbox.find("span").css("backgroundColor", this.priColor1);
  }
  checkmarNotChecked() {
    this.$checkbox.find("img").hide();
    this.$checkbox.css("border", `1px solid ${this.darkColor3}`);
    this.$checkbox.find("span").css("backgroundColor", this.darkColor3);
  }
  close() {
    this.checkmarNotChecked();
    this.$checkbox.find("p").css("color", this.darkColor3);
    this.overObj.close();
  }
}

class metricGeoOverObj {
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
    this.$row = con.find(".item-row");
    this.$row.each((i, e) => {
      eval(
        `this.itemRow${i} = new itemRow(
          $(this.$row[i]),
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
    this.$row.each((i, e) => {
      eval(`this.itemRow${i}.close()`);
    });
  }
}

$(function () {
  cardCon.init("lec");
});
