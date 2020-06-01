const cardCon = {
  init: function (typeCard) {
    this.cacheDom();
    this.cacheDomFunc(typeCard);
    this.bindEvents(this.triggerTypes);
    this.start(this.cardGrpNm);
  },
  cacheDom: function () {
    this.$con = $(".card-con");
    this.$pageType = this.$con.attr("data-type");
  },
  cacheDomFunc: function (typeCard) {
    this.cardTypes = [];
    this.varifyTypeCard(typeCard);
    this.triggerTypes.forEach((type) => {
      this.varifyTrigger(type);
      this.varifyCard(type);
      this.cardTypes.push(eval(`this.${type}Card`));
      this.varifyOverlay(type);
    });
    this.cardGrpNm = this.cardTypes.length / 4;
    this.cardGrpBol = this.cardGrpNm < 1;
    if (!this.cardGrpBol) {
      this.cardGrouping(this.cardGrpNm);
    }
  },
  bindEvents: function (triggerTypes) {
    triggerTypes.forEach((type) => {
      eval(`this.$${type}.click(() => { 
            this.callOverlayFunc(type);
           });`);
    });
  },
  varifyTypeCard: function (typeCard) {
    switch (typeCard) {
      case "major":
        this.triggerTypes = ["lec", "ict"];
        break;
      case "lec":
        this.triggerTypes = [
          "book",
          "map",
          "geoModel",
          "glob",
          "whiteboard",
          "geometric",
          "calculator",
          "stationary",
          "games",
          "cds",
          "others",
          "custom",
        ];
        break;
      case "ict":
        this.triggerTypes = [
          "table",
          "chair",
          "projector",
          "mixer",
          "wire",
          "hailer",
          "radio",
          "scanner",
          "laptop",
          "screen",
          "others",
          "custom",
        ];
        break;
      case "duty":
        this.triggerTypes = ["duty", "record"];
        break;
      case "discipline":
        this.triggerTypes = [
          "discipline",
          "namelist",
          "minitmesyuarat",
          "gantilist",
        ];
        break;
      case "setiausaha":
        this.triggerTypes = [
          "minitmesyuaratedit",
          "namelist",
          "minitmesyuarat",
          "view",
        ];
        break;
      case "add":
        this.triggerTypes = ["id", "pss"];
        break;
      default:
        alert("varifyTypeCard: Invalid Type Card");
        break;
    }
  },
  varifyTrigger: function (type) {
    eval(`this.$${type} = this.$con.find(".${type}")`);
  },
  varifyCard: function (type) {
    eval(
      `this.${type}Card = new card(this.$${type}, this.$pageType, this.$pageType); this.${type}Card.init()`
    );
  },
  cardGrouping: function (g) {
    let n = 0;
    for (let i = 0; i < g; i++) {
      eval(`this.cardGrp${i} = []`);
      for (let x = 0; x < 4; x++) {
        eval(`this.cardGrp${i}.push(this.cardTypes[n])`);
        n += 1;
      }
    }
  },
  start: function (cardGrpNm) {
    if (!this.cardGrpBol) {
      for (let i = 0; i < cardGrpNm; i++) {
        this.delayCardGrpShow(i);
      }
    } else {
      this.noCardGrpShow();
    }
  },
  delayCardGrpShow: function (i) {
    setTimeout(() => {
      eval(
        `this.cardGrp${i}.forEach((index)=>{
            setTimeout(() => {
              this.cardGrpShow(index);
            }, 300);
          })`
      );
    }, 100 * i);
  },
  cardGrpShow: function (i) {
    i.card.show().addClass("fade-right");
    setTimeout(() => {
      i.card.removeClass("fade-right");
    }, 400);
  },
  noCardGrpShow: function () {
    setTimeout(() => {
      this.triggerTypes.forEach((type, i) => {
        let aniClass;
        switch (i) {
          case 0:
            aniClass = "slide-down";
            break;
          case 1:
            aniClass = "slide-up";
            break;
          case 2:
            aniClass = "slide-down";
            break;
          default:
            alert("No Card Group Show Error");
            break;
        }
        eval(`this.$${type}.find(".card").show().addClass(aniClass)`);
        setTimeout(() => {
          eval(`this.$${type}.find(".card").removeClass(aniClass)`);
        }, 400);
      });
    }, 300);
  },
  varifyOverlay: function (type) {
    type === "table" || type === "chair" ? (type = "tnc") : type;
    type === "record" ||
    type === "lec" ||
    type === "ict" ||
    type === "namelist" ||
    type === "gantilist"
      ? type
      : eval(`this.${type}Over = new overlay ($(".${type}-overlay"))`);
  },
  callOverlayFunc: function (type) {
    type === "table" || type === "chair" ? (type = "tnc") : type;
    type === "record" || type === "lec" || type === "ict"
      ? type
      : eval(`this.${type}Over.init()`);
  },
};
