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
  "2019-09-23 19:00",
  "2019-09-23 12:00",
  "2019-09-24 10:00",
  "2019-09-24 15:00"
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
  
  today :function(addDay){ 
    currentDate = new Date();
    if(addDay === null || "undefined"){
      addDay = 0;
    }
   return currentDate.getFullYear().toString()+"-"+ (currentDate.getMonth()+1).toString().padStart(2,0)+"-"+(currentDate.getDate()+addDay).toString().padStart(2,0)},
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
    calendar : ".calendar",
    hours: ".date-picker-hours ul li",
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

    $(".calendar-button").on("click",function(){
      $("#from").datepicker("setDate", _t.today());
      $(".calendar-button").text($("#db_from").val().toString());
      $("#from").datepicker( "show" )
    } )
    var from = $("#from")
      .datepicker({
        altFormat:"d M, y",
        dateFormat:"yy-mm-dd",
        altField:"#db_from",
        defaultDate: "+1d",
        changeMonth: true,
        numberOfMonths: 1
      })
      .on("change", function() {
        to.datepicker("option", "minDate", getDate(this));
          $(".calendar-button").text($("#db_from").val().toString())
      });
    var to = $("#to")
      .datepicker({
        dateFormat:"d M, y",
        altFormat:"yy-mm-dd",
        altField:"#db_to",
        defaultDate: "+1d",
        changeMonth: true,
        numberOfMonths: 1
      })
      .on("change", function() {
        from.datepicker("option", "maxDate", getDate(this));
        var cd = to.datepicker("getDate");
      });
    function getDate(element) {
      var date;
      try {
        date = $.datepicker.parseDate("yy-mm-dd", element.value);
      } catch (error) {
        date = null;
      }
      return date;
    }
    // TODO: REFACTOR
    $(_t.el.time)
      .find(".date-picker-hours .current-hours li")
      .each(function() {
        $(this).attr("data-day", _t.today());
      });
    $(_t.el.time)
      .find(".date-picker-hours .next-hours li")
      .each(function() {
        $(this).attr("data-day", _t.today());
      });
  },
  addEvent: function() {
    var _t = this;
    changeDay = function() {
      // TODO: REFACTOR
      $(_t.el.time)
        .find(".date-picker-hours .current-hours li")
        .each(function() {
          $(this).attr("data-day", $("#from").val());
        });
      $(_t.el.time)
        .find(".date-picker-hours .next-hours li")
        .each(function() {
          $(this).attr("data-day", $("#to").val());
        });
      _t.availability();
    };
    $("#from").bind("change", changeDay);
    $("#to").bind("change", changeDay);
  },
  availability: function() {
    var _t = this;
    var firstNotAllow = _t.cls.booked + " " + _t.cls.notAllow;
    $(".date-picker-hours ul li").each(function() {
      var ths = $(this);
      ths.removeClass(_t.cls.booked);
      bookedHours.forEach(el => {
        el == ths.attr("data-day") + " " + ths.attr("data-hour")
          ? ths.addClass(firstNotAllow)
          : null;
      });
    });
  },
  controls: function() {
    var _t = this;
    function dateControl() {
      $(".date-picker-hours ul li").each(function() {
        var ths = $(this);
        if (ths.hasClass(_t.cls.outHour)) {
          $(".date-picker-hours .current-hours li").removeClass(
            _t.cls.notAllow
          );
        } else if (ths.hasClass(_t.cls.inHour)) {
          $(".date-picker-hours ul li").removeClass(_t.cls.notAllow);
          ths
            .nextAll(".booked")
            .nextAll()
            .addClass(_t.cls.notAllow);
          if (ths.nextAll().hasClass(_t.cls.notAllow)) {
            ths
              .parent()
              .next()
              .find("li")
              .addClass(_t.cls.notAllow);
          }
        } else if (
          !ths
            .parent()
            .find("li")
            .hasClass(_t.cls.outHour)
        ) {
          ths
            .parent()
            .next()
            .find(".booked")
            .nextAll()
            .addClass(_t.cls.notAllow);
        }
      });
    }
    $(_t.el.time).bind("click", dateControl);
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
              date.find("#from").val() +
              " " +
              hours.find(".checkInHour").attr("data-hour"),
            checkOut:
              date.find("#to").val() +
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

              $("#from").datepicker("setDate", _t.today());
              $(".calendar-button").text($("#db_from").val().toString());
              
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
              var value = item.attr("data-hour")
              $("#checkin-value").text(value)
              $("#checkout-value").text("")
              $("#checkin").find(".date-subtitle").removeClass("active")
              $("#checkout").find(".date-subtitle").addClass("active")
              break;
            case "check out":
              item
                .addClass(_t.cls.outHour)
                .siblings()
                .removeClass(_t.cls.outHour);
                var value = item.attr("data-hour")
                $("#checkout-value").text(value)
                $("#checkout").find(".date-subtitle").removeClass("active")
                $("#checkin").find(".date-subtitle").addClass("active")
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


<<<<<<< HEAD
=======
// $.ajax({
//   type: "POST",
//   url: "http://***.***.***.**/",
//   data: { username: "****", password: "****", grant_type: "password" },
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
//   url: "",
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
>>>>>>> 3efac8e29abbf78fc47469280e56a6145a115785
