class card {
  constructor(type, cardType, pageType) {
    this.type = cardType;
    this.pageType = pageType;
    this.card = type.find(".card");
    this.cardType = this.card.attr("data-card");
    this.icon = type.find(".card-icon-con img ");
    this.heading = type.find(".card-heading");
    this.arrow = type.find(".card-heading-con img");
  }
  init() {
    this.bindEvents();
  }
  bindEvents() {
    this.card
      .mouseenter(() => {
        this.cardMouseEnter();
      })
      .mouseleave(() => {
        this.cardMouseLeave();
      });
  }
  cardMouseEnter() {
    setTimeout(() => {
      this.heading.css("color", "#999aa6");
      this.arrow.attr("src", "../Icons/General/arrowRight-hv.svg");
      this.icon.css("transform", "scale(1.15)");

      switch (this.heading.text().toLowerCase()) {
        case "others":
          this.icon.attr(
            "src",
            "../Icons/General/Card/others-hv-" + this.type + ".svg"
          );
          break;
        case "custom":
          this.icon.attr(
            "src",
            "../Icons/General/Card/custom-hv-" + this.type + ".svg"
          );
          break;
        default:
          this.icon.attr(
            "src",
            "../Icons/" + this.type + "/" + this.cardType + "-hv.svg"
          );
          break;
      }
    }, 20);
  }
  cardMouseLeave() {
    this.heading.css("color", "#55586b");
    this.arrow.attr("src", "../Icons/General/arrowRight.svg");
    this.icon.attr("transform", "");

    switch (this.heading.text().toLowerCase()) {
      case "others":
        this.icon.attr("src", "../Icons/General/Card/others.svg");
        break;
      case "custom":
        this.icon.attr("src", "../Icons/General/Card/custom.svg");
        break;
      default:
        this.icon.attr(
          "src",
          "../Icons/" + this.type + "/" + this.cardType + ".svg"
        );
        break;
    }
  }
}
