// var formObject = {
//   location: null,
//   date: {
//     checkIn: null,
//     checkOut: null
//   },
//   guests: []
// };

// var guestObject = {
//   id: null,
//   gender: null
// };

var bookedHours = [
  "2019-09-19 19:00",
  "2019-09-19 12:00",
  "2019-09-20 10:00",
  "2019-09-20 15:00"
];

var Form = function(id, booking, host, card) {
  this.id = id;
  this.booking = booking;
  this.host = host;
  this.card = card;
};

var Booking = function(id, location, date, guests) {
  this.id = id;
  this.location = location;
  this.date = date;
  this.guests = guests;
};

var Guest = function(id, gender, hours) {
  this.id = id;
  this.gender = gender;
  this.hours = hours;
};

var Host = function(id, firstName, lastName, gender, email, mobile, birthDate) {
  this.id = id;
  this.firstName = firstName;
  this.lastName = lastName;
  this.gender = gender;
  this.email = email;
  this.mobile = mobile;
  this.birthDate = birthDate;
};

var CreditCard = function(id, number, expiration, cvc, cardHolder) {
  this.id = id;
  this.number = number;
  (this.expiration = expiration), (this.cvc = cvc);
  this.cardHolder = cardHolder;
};

var orderForm = {
  el: {
    booking: ".booking-container",
    host: ".host-container",
    dropdown: ".dropdown",
    counterContainer: ".counter-container",
    info: ".info-wrapper.input-info",
    counter: ".counter-wrapper",
    counterButton: ".button-counter",
    input: "input",
    showButton: ".next-button",
    time: ".date-picker-container",
    firstName: "#firstName",
    lastName: "#lastName",
    gender: "#gender",
    email: "#email",
    mobile: "#mobile",
    birthDate: "#birthdate"
  },
  cls: {
    opened: "opened",
    selected: "selected",
    inHour: "checkInHour",
    outHour: "checkOutHour",
    btwnHour: "betweenHour",
    booked: "booked",
    notAllow: "not-allowed"
  },
  startEvent: function() {
    var _t = this;
    $(_t.el.time)
      .find(".date-picker-hours .current-hours li")
      .each(function() {
        $(this).attr("data-day", $("#checkInDay").val());
      });
    $(_t.el.time)
      .find(".date-picker-hours .next-hours li")
      .each(function() {
        $(this).attr("data-day", $("#checkOutDay").val());
      });
  },
  addEvent: function() {
    var _t = this;
    changeDay = function() {
      $(_t.el.time)
        .find(".date-picker-hours .current-hours li")
        .each(function() {
          $(this).attr("data-day", $("#checkInDay").val());
        });
      $(_t.el.time)
        .find(".date-picker-hours .next-hours li")
        .each(function() {
          $(this).attr("data-day", $("#checkOutDay").val());
        });
      _t.availability();
    };
    $("#checkInDay").bind("change", changeDay);
    $("#checkOutDay").bind("change", changeDay);
  },
  availability: function() {
    var _t = this;
    $(".date-picker-hours ul li").each(function() {
      var ths = $(this);
      ths.removeClass(_t.cls.booked);
      bookedHours.forEach(el => {
        el == ths.attr("data-day") + " " + ths.attr("data-hour")
          ? ths.addClass(_t.cls.booked)
          : null;
      });
    });
  },
  controls:function(){
    var _t = this;
  
    function dateControl(){
      console.log($(".date-picker-hours ul").find(".booked").index())
      console.log($(".date-picker-hours ul").find(".checkInHour").index())
      $(".date-picker-hours ul li").each(function() {
        var ths = $(this);
      });
    }
    $(_t.el.time).bind("click", dateControl)
  },
  createForm: function() {
    var newForm = new Form();
    var _t = this;
    var c = 0;
    $("#start").bind("click", function() {
      if (c === 0) {
        createBooking(_t.el.booking);
        createHost(_t.el.host);
        c++;
      }
    });

    createBooking = function(ID) {
      var newBooking = new Booking();
      var date = $(_t.el.time);
      var hours = $(_t.el.time).find(".date-picker-hours ul");
      var female = $("#female");
      var male = $("#male");
      $(ID)
        .find(_t.el.showButton)
        .bind("click", function() {
          var guests = [];
          var location = $(".location ul")
            .find(".selected")
            .attr("rel");
          var card = [male, female];
          var hourCount = 0;
          if ($(".current-hours li").hasClass("checkOutHour")) {
            hourCount =
              parseInt(
                $(".current-hours")
                  .find(".checkOutHour")
                  .attr("data-hour")
              ) -
              parseInt(
                $(".current-hours")
                  .find(".checkInHour")
                  .attr("data-hour")
              );
          } else {
            hourCount =
              parseInt(
                $(".next-hours")
                  .find(".checkOutHour")
                  .attr("data-hour")
              ) +
              (24 -
                parseInt(
                  $(".current-hours")
                    .find(".checkInHour")
                    .attr("data-hour")
                ));
          }

          for (let i = 0; i < card.length; i++) {
            for (let j = 0; j < card[i][0].value; j++) {
              guests.push(
                new Guest(
                  Math.floor(Math.random() * 1000),
                  card[i][0].id,
                  hourCount
                )
              );
            }
          }
          newBooking.date = {
            checkIn:
              date.find("#checkInDay")[0].value +
              " " +
              hours.find(".checkInHour").attr("data-hour"),
            checkOut:
              date.find("#checkOutDay")[0].value +
              " " +
              hours.find(".checkOutHour").attr("data-hour")
          };
          newBooking.location = location;
          newBooking.guests = guests;
          newForm.booking = newBooking;
        });
    };
    createHost = function(ID) {
      $(ID)
        .find(_t.el.showButton)
        .bind("click", function() {
          var newHost = new Host();
          newHost = {
            id: Math.floor(Math.random() * 1000),
            firstName: $(_t.el.firstName)[0].value,
            lastName: $(_t.el.lastName)[0].value,
            gender: $(_t.el.gender)[0].value,
            email: $(_t.el.email)[0].value,
            mobile: $(_t.el.mobile)[0].value,
            birthDate: $(_t.el.birthDate)[0].value
          };
          newForm.host = newHost;
          // console.log(newHost);
          console.log(newForm);
          // console.log(JSON.stringify(newForm));
        });
    };
  },
  initPlugins: function() {
    var _t = this,
      htmlDropDown = function(ID) {
        ID.find("> .input-title")
          .bind("click", function() {
            if (ID.hasClass(_t.cls["opened"]))
              $(_t.el["dropdown"]).removeClass(_t.cls["opened"]);
            else {
              $(_t.el["dropdown"]).removeClass(_t.cls["opened"]);
              ID.addClass(_t.cls["opened"]);
            }
          })
          .end()
          .find("[rel]")
          .bind("click", function() {
            var ths = $(this);
            ths
              .addClass(_t.cls["selected"])
              .siblings()
              .removeClass(_t.cls["selected"]);

            ID.removeClass(_t.cls["opened"])
              .find("> .input-info")
              .html(ths.text());
          });
      },
      counter = function(ID) {
        var input = ID.find(_t.el.input);
        ID.find(_t.el.counterButton).bind("click", function() {
          var ths = $(this),
            val = parseInt(input.val()),
            typ = ths.attr("rel") || "inc";

          val = typ == "inc" ? (val = val + 1) : (val = val - 1);
          if (val < 0) val = 0;
          input.val(val);

          var target = $(input.attr("data-target") || "");

          if (target.length > 0) {
            target.text(val);
          }
        });
      },
      datePicker = function(ID) {
        function addHour(item, type) {
          switch (type) {
            case "check in":
              item
                .addClass(_t.cls.inHour)
                .siblings()
                .removeClass(_t.cls.inHour);
              break;
            case "check out":
              item
                .addClass(_t.cls.outHour)
                .siblings()
                .removeClass(_t.cls.outHour);
              break;
            default:
              break;
          }
        }

        var container = $(ID).find(".date-picker-hours");
        var hours = container.find("ul li");
        var range = [null, null];
        hours.bind("click", function() {
          var ths = $(this);
          if (ths.parent().hasClass("current-hours")) {
            if (range[0] == null && range[1] == null) {
              range[0] = ths.index();

              addHour(ths, "check in");
            } else if (range[0] != null && range[1] == null) {
              if (ths.index() < range[1] || ths.index() < range[0]) {
                range[0] = ths.index();

                addHour(ths, "check in");
              } else if (ths.index() > range[1] && ths.index() > range[0]) {
                range[1] = ths.index();

                addHour(ths, "check out");
              }
              for (let index = range[0] + 1; index < range[1]; index++) {
                hours[index].classList.add(_t.cls.btwnHour);
              }
            } else {
              range[1] = null;
              range[0] = ths.index();
              hours.removeClass(_t.cls.inHour);

              addHour(ths, "check in");
              hours.removeClass(_t.cls.outHour);
              hours.removeClass(_t.cls.btwnHour);
            }
          } else {
            if (range[0] !== null && range[1] === null) {
              range[1] = ths.index();
              ths.addClass(_t.cls.outHour);
              ths.prevAll().addClass(_t.cls.btwnHour);
              container
                .find(".current-hours ." + _t.cls.inHour)
                .nextAll()
                .addClass(_t.cls.btwnHour);
            } else if (range[0] !== null && range[1] !== null) {
              if (ths.index() > range[1]) {
                range[1] = ths.index();
                addHour(ths, "check out");
                ths.prevAll().addClass(_t.cls.btwnHour);
                container
                  .find(".current-hours ." + _t.cls.inHour)
                  .nextAll()
                  .addClass(_t.cls.btwnHour);
              } else {
                range[1] = ths.index();
                addHour(ths, "check out");
                ths.nextAll().removeClass(_t.cls.btwnHour);
                ths.prevAll().addClass(_t.cls.btwnHour);
                container.find(".current-hours li").removeClass(_t.cls.outHour);
                container
                  .find(".current-hours li")
                  .removeClass(_t.cls.btwnHour);
                container
                  .find(".current-hours ." + _t.cls.inHour)
                  .nextAll()
                  .addClass(_t.cls.btwnHour);
              }
            }
          }

          console.log(range);
        });
      };
    $(_t.el.dropdown).each(function() {
      htmlDropDown($(this));
    });

    $(_t.el.counterContainer)
      .find(_t.el.counter)
      .each(function() {
        counter($(this));
      });
    $(_t.el.time).each(function() {
      datePicker($(this));
    });
  },
  init: function() {
    var _t = this;
    _t.startEvent();
    _t.initPlugins();
    _t.createForm();
    _t.availability();
    _t.addEvent();
    _t.controls();
  }
};

orderForm.init();

// var token =""

// $.ajax({
//   type: "POST",
//   url: "http://213.155.108.98/keplertest/token",
//   data: { username: "Proje", password: "UT64LX9", grant_type: "password" },
//   dataType: "json",

//   error: function(e) {
//     if (typeof callback !== "undefined") callback({ type: "error" });
//   },
//   timeout: 30000,
//   success: function(res) {
//     res.access_token = token;
//   }
// });
// $.ajax({
//   type: "POST",
//   url: "http://213.155.108.98/keplertest/Durum/kapasiteSorgula",
//   data: {
//     tarih: "2019-09-19",
//     havalimaniId: "a381e989-53a7-4c97-ad82-f4cdb368a71d"
//   },
//   dataType: "json",
//   contentType: "application/json",
//   headers: {
//     Authorization:
//       "Bearer " + token
//   },
//   error: function(e) {
//     if (typeof callback !== "undefined") callback({ type: "error" });
//   },
//   timeout: 30000,
//   success: function(d) {
//     console.log(d);
//     if (typeof callback !== "undefined") callback({ type: "success", val: d });
//   }
// });
