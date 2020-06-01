class overlay {
  constructor(con) {
    this.$con = con;
    this.$closeBtn = con.find(".overlay-close button");
    this.page = con.attr("data-page");
    this.pageType = con.attr("data-pageType");
    this.typePage = con.attr("data-typePage");
    this.darkColor1 = "#444655";
    this.darkColor3 = "#999aa6";
  }
  init() {
    this.start();
  }
  bindEvents() {
    this.$closeBtn.click(() => {
      this.close();
    });
  }
  varifyPage() {
    if (this.page.includes("login")) {
      this.majorPageType = "login";
    } else if (this.page.includes("borrow")) {
      this.majorPageType = "borrow";
    } else if (this.page.includes("return")) {
      this.majorPageType = "return";
    } else if (this.page.includes("dutySort")) {
      this.majorPageType = "dutySort";
    } else if (this.page.includes("duty")) {
      this.majorPageType = "duty";
    } else if (this.page.includes("gantiSort")) {
      this.majorPageType = "gantiSort";
    } else if (this.page.includes("namelistSort")) {
      this.majorPageType = "namelistSort";
    } else if (this.page.includes("namelistEdit")) {
      this.majorPageType = "namelistEdit";
    } else if (this.page.includes("namelist")) {
      this.majorPageType = "namelist";
    }
  }
  start() {
    if (!this.$con.hasClass("overlay")) {
      this.renderOverlay();
      this.varifyPage();
      this.createOverObj();
      this.bindEvents();
      this.renderOverlay();
    } else {
      this.close();
    }
  }
  createOverObj() {
    eval(`
      this.overObj = new ${this.majorPageType}OverObj(
        this.$con, 
        this.page,
        this.darkColor1,
        this.darkColor3,
        this.pageType,
        this.typePage
        );
      `);
  }
  renderOverlay() {
    this.$con.addClass("overlay");
    setTimeout(() => {
      this.$con.css("background", "rgba(0, 0, 0, 0.5)");
    }, 175);
  }
  close() {
    this.overObj.close();
    this.$con.removeClass("overlay");
    this.$con.css("background", "");
  }
}
