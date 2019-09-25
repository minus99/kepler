// Formun Kendisi ve Icindeki Parametreler Icin Olusturulan
// ES5 Class Functions

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

// Secimlerin Global Olarak Tutulmasi

var state = {
  date: {
    checkIn: undefined,
    checkOut: undefined
  },
  location: undefined,
  femaleGuest: null,
  maleGuest: null,
  bookedHours: null
};

// Form Kontrolleri ve Secimleri

var setForm = {
  // Form Icin Tekrar Eden elementler ve classlar
  el: {
    inputInfo: ".input-info",
    input: "input",
    location: ".location-container",
    dropDown: ".location-menu",
    guest: ".guest-container",
    counter: ".counter-container",
    counterWrapper: ".counter-wrapper",
    counterButton: ".button-counter",
    buttonTitle: ".button-title",
    datePicker: ".date-picker-container",
    calendar: ".calendar-container",
    calendarButton: ".calendar-button",
    timeContainer: ".time-container",
    time: ".time-container li",
    timeInfo: ".time-info"
  },
  cls: {
    none: "ems-none",
    selectedItem: "selected-item",
    selectedButton: "selected-button",
    selectedText: "selected-text",
    selectedTime: "selected-time",
    bookedTime: "booked-time",
    active: "active"
  },

  // getDay Fonksiyonuna hernangi bir deger girilmez ise bugunun tarihini alir ve string'e cevirir
  // Girilen deger integer olmalidir
  // Deger girilir ise bugunun tarihine girilen deger kadar gun ekler
  getDate: function(addDay) {
    currentDate = new Date();
    if (addDay === null || "undefined") {
      addDay = 0;
    }
    return (
      currentDate.getFullYear().toString() +
      "-" +
      (currentDate.getMonth() + 1).toString().padStart(2, 0) +
      "-" +
      (currentDate.getDate() + addDay).toString().padStart(2, 0)
    );
  },
  setInitialDate: function() {
    var _t = this,
      el = _t.el,
      cls = _t.cls;

    $(el.time).attr("data-date", this.getDate());
  },
  events: function() {
    var _t = this,
      el = _t.el,
      cls = _t.cls;
  },
  // Dropdown Menu, Counter, Datepicker Fonksiyonlarini Cagirir
  plugins: function() {
    // Fonksiyonlardaki 'id' Parametresi Containeri Belirtir
    var _t = this,
      el = _t.el,
      cls = _t.cls;
    dropDown = function(id) {
      // Dropdown Menu Acilir || Kapanir
      var id = $(id).parent();

      id.bind("click", function() {
        $(el.dropDown).toggleClass(cls.none);
      });

      // Lokasyon Secer
      id.find("ul li").bind("click", function() {
        $(this)
          .addClass(cls.selectedItem)
          .siblings()
          .removeClass(cls.selectedItem);
        id.find(el.inputInfo).html($(this).text());
        // Bir Sonraki Adimi Aktif Hale Getirir
        id.next()
          .find(el.inputInfo)
          .removeClass(cls.none);
        id.next()
          .find(el.counter)
          .removeClass(cls.none);
        id.next()
          .find("ul")
          .removeClass(cls.none);
      });
    };
    // Guest Miktarini Degistirir
    (counter = function(id) {
      var input = $(id).find(el.input);
      var c = 0;
      $(id)
        .find(el.counterButton)
        .bind("click", function() {
          // Guest Degerini Arttirir || Azaltir
          var value = parseInt(input.val()),
            type = $(this).attr("rel");
          var target = $(input.attr("data-target"));
          value = type === "inc" ? (value = value + 1) : (value = value - 1);
          value < 0 ? (value = 0) : input.val(value);

          target.length > 0 ? target.text(value) : "1";

          // Ilgili counter'a class atar
          $(id)
            .addClass(cls.selectedButton)
            .siblings()
            .removeClass(cls.selectedButton);

          // Ilgili counter'in title'ina class atar
          $(id)
            .siblings()
            .find(el.buttonTitle)
            .removeClass(cls.selectedText);
          $(id)
            .find(el.buttonTitle)
            .addClass(cls.selectedText);

          // Bir Sonraki Adimi Aktif Hale Getirir
          if (c === 0) {
            c++;
            var parent = $(id)
              .parent()
              .parent();
            parent
              .next()
              .find(el.inputInfo)
              .removeClass(cls.none);
            parent
              .next()
              .find(el.calendar)
              .removeClass(cls.none);
            parent
              .next()
              .find("ul")
              .removeClass(cls.none);
            // Datepicker Tarihini Bugünün Tarihine Getirir
            $("#in-date").datepicker("setDate", _t.getDate());
            $("#out-date").datepicker("setDate", _t.getDate());
            $(el.calendarButton).text(
              $("#db-in-date")
                .val()
                .toString()
            );
          }
        });
    }),
      (customDatePicker = function() {
        // Check-In Tarihini Secer ve Check-out Tarihine Atar
        var from = $("#in-date")
          .datepicker({
            altFormat: "d M, y",
            dateFormat: "yy-mm-dd",
            altField: "#db-in-date",
            defaultDate: "+3d",
            changeMonth: false,
            numberOfMonths: 1,
            minDate: _t.getDate()
          })
          .on("change", function() {
            to.datepicker("option", "minDate", _getDate(this));
            to.datepicker("setDate", _getDate(this))
            // Tarih Yazisini Degistirir
            $(el.calendarButton).text(
              $("#db-in-date")
                .val()
                .toString()
            );
            // Saat Seçimindeki Date attribute'u degistiri
            $(el.time).removeClass(cls.selectedTime);
            $(el.time).attr("data-date", $("#in-date").val());

            // Secili Zamanı UI'da gösteri
            $(el.time).each(function() {
              var ths = $(this);
              var fullDate =
                ths.attr("data-date") + " " + ths.attr("data-time");
              if (state.date.checkIn == fullDate) {
                ths.addClass(cls.selectedTime);
              }
              if (state.date.checkOut == fullDate) {
                ths.addClass(cls.selectedTime);
              }
            });
          });
        // Check-Out Tarihini Secer ve Check-In Tarihine Atar
        var to = $("#out-date")
          .datepicker({
            altFormat: "d M, y",
            dateFormat: "yy-mm-dd",
            altField: "#db-out-date",
            defaultDate: "+1d",
            changeMonth: false,
            numberOfMonths: 1
          })
          .on("change", function() {
            from.datepicker("option", "maxDate", _getDate(this));

            // Tarih Yazisini Degistirir
            $(el.calendarButton).text(
              $("#db-out-date")
                .val()
                .toString()
            );

            // Saat Seçimindeki Date attribute'u degistiri
            $(el.time).removeClass(cls.selectedTime);
            $(el.time).attr("data-date", $("#out-date").val());

            // Secili Zamanı UI'da gösteri
            $(el.time).each(function() {
              var ths = $(this);
              var fullDate =
                ths.attr("data-date") + " " + ths.attr("data-time");
              console.log(fullDate)
              if (state.date.checkIn == fullDate) {
                ths.addClass(cls.selectedTime);
              }
              if (state.date.checkOut == fullDate) {
                ths.addClass(cls.selectedTime);
              }
            });
          });
        // Secilen Tarih Degerini Alir
        function _getDate(element) {
          var date;
          try {
            date = $.datepicker.parseDate("yy-mm-dd", element.value);
          } catch (error) {
            date = null;
          }
          return date;
        }

        // Check-in/out Tarih Secimi
        function setDate() {
          $(".date-picker-container .input-info >div").bind(
            "click",
            function() {
              var type = $(this).attr("class");
              var dataType;
              switch (type) {
                case "check-in-info":
                  dataType = "#in-date";
                  break;
                case "check-out-info":
                  dataType = "#out-date";
                  break;
                default:
                  dataType = "#in-date";
                  break;
              }
              // Ilgıli takvimi açar
              $(dataType).datepicker("show");
              // Check-in Check-out "active" class degistirir
              $(this)
                .addClass(cls.active)
                .siblings()
                .removeClass(cls.active);
            }
          );
        }

        setDate();

        // setTime fonksiyonu için [item = seçilen element] [type = seçimin türü]
        // type degeri iki farkli deger alabilir "check-in" || "check-out"

        function setTime(item, type) {
          var time = item.attr("data-time");
          var date; // text olarak gozuken tarih
          var dbDate; // database'e gonderilen tarih
          var fullDate = item.attr("data-date") + " " + time;

          switch (type) {
            case "check-in":
              // Tarih Yazısını Degistirir
              date = $("#db-in-date")
                .val()
                .toString();

              // Secili Zaman Degerini Alır
              dbDate = $("#in-date")
                .val()
                .toString();

              // State'e tarihi ve zamanı yollar
              state.date.checkIn = dbDate + " " + time;
              state.date.checkOut = "";

              // Seçili Zamanı UI'da gösterir
              if (state.date.checkIn == fullDate) {
                item.addClass(cls.selectedTime);
              }
              break;
            case "check-out":
              // Tarih Yazısını Degistirir
              date = $("#db-out-date")
                .val()
                .toString();

              // Secili Zaman Degerini Alır
              dbDate = $("#out-date")
                .val()
                .toString();

              // State'e tarihi ve zamanı yollar
              state.date.checkOut = dbDate + " " + time;

              // Secili Zamanı UI'da gösterir
              if (state.date.checkOut == fullDate) {
                item.addClass(cls.selectedTime);
              }
              break;
            default:
              break;
          }
          $(el.datePicker)
            .find(".input-info " + type+ "-info" + ".active") // bu bug lı çalışıyor şu an
            .addClass("filled")
            .find(el.timeInfo)
            .text(time + " - " + date);
          $(el.datePicker) // bu switch casein içine girmeli
            .find(".input-info >div")
            .toggleClass(cls.active);
        }
        // Saat Seçimi
        $(el.time).bind("click", function() {
          var checkInState = state.date.checkIn || "",
            checkOutState = state.date.checkOut || "";
           
          var hour = parseInt($(this).attr("data-time"))
          
          if (
            // check-in ve check-out seçili değil ise
            checkInState == "" &&
            checkOutState == ""
          ) {

            setTime($(this), "check-in");
          } else if (
            // check-in seçili ve check-out seçili değil ise
            checkInState != "" &&
            checkOutState == ""
          ) {
            var checkinhour = parseInt(state.date.checkIn.slice(6, -1))
            if(hour>checkinhour){
              setTime($(this), "check-out")
            } else{
              setTime($(this), "check-in"); 
              $(this).siblings().removeClass(cls.selectedTime)
            }
          } else if (
            // check-in ve check-out seçili ise
            checkInState != "" &&
            checkOutState != ""
          ) {
            setTime($(this), "check-in");
            $(this).siblings().removeClass(cls.selectedTime)
          }
        });
      }),
    
    // Pluginleri Cagirir
    dropDown(el.dropDown); // dropdown

    $(el.counter)
      .find(el.counterWrapper)
      .each(function() {
        counter(this); // counter
      });
    customDatePicker();
  },
  // Butun Fonksiyonlari Cagirir
  init: function() {
    this.setInitialDate();
    this.plugins();
  }
};

setForm.init();
