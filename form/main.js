// Formun Kendisi ve Icindeki Parametreler Icin Olusturulan
// ES5 Class Functions

// TODO
// 1. BOOKED TIMES ILE SECILEN ZAMAN CAKISMASI BUG

// 7. DATA

// 10. START AGAIN BUTTON
// 11. UYGUN OLMAYAN SAAT KONTROLU

var mockJSON =
  '{"booking":{"location":"SAW","date":"2019-10-08 14:00 2019-10-08 22:00","products":[{"id":832504,"gender":"m","hours":8},{"id":832504,"gender":"m","hours":8},{"id":832504,"gender":"m","hours":8}]},"guest":{"firstName":"Ad","lastName":"Soyad","email":"mail@mail.com","mobile":"+905355555555","birthDate":"2019-04-03"},"card":{"number":"4545 4545 4545 4545","expiration":"01 / 12","cvc":"456","holder":"Ad Soyad"},"reservation":{"id":"KPLR0051853"}}';

var Form = function(booking, guest, card) {
  this.booking = booking;
  this.guest = guest;
  this.card = card;
};

var Booking = function(location, date, products) {
  this.location = location;
  this.date = date;
  this.products = products;
};
var BookingDate = function(checkIn, checkOut, bookedHour) {
  this.checkIn = checkIn;
  this.checkOut = checkOut;
  this.bookedHour = bookedHour;
};

var Product = function(id, gender, hours) {
  this.id = id;
  this.gender = gender;
  this.hours = hours;
};

var Guest = function(firstName, lastName, email, mobile, birthDate) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.email = email;
  this.mobile = mobile;
  this.birthDate = birthDate;
};

var CreditCard = function(number, expiration, cvc, holder) {
  this.number = number;
  this.expiration = expiration;
  this.cvc = cvc;
  this.holder = holder;
};

// Secimlerin Global Olarak Tutulmasi

var state = {
  date: {
    checkIn: undefined,
    checkOut: undefined,
    bookedHours: [],
    totalHour: undefined
  },
  location: undefined,
  locationName: undefined,
  femaleGuest: undefined,
  maleGuest: undefined,
  guest: {
    firstName: undefined,
    lastName: undefined,
    email: undefined,
    mobile: undefined,
    birtdate: undefined
  }
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
    timeInfo: ".time-info",
    timePickerWarnings: ".time-picker-warnings"
  },
  cls: {
    none: "ems-none",
    selectedItem: "selected-item",
    selectedButton: "selected-button",
    selectedText: "selected-text",
    selectedTime: "selected-time",
    bookedTime: "booked-time",
    active: "active",
    disabled: "disabled"
  },
  info: {
    location: ".booking-info-location",
    date: ".booking-info-date",
    maleNumber: ".bi-male-number",
    femaleNumber: ".bi-female-number",
    checkInHour: ".bi-checkin-hour",
    checkOutHour: ".bi-checkout-hour",
    totalHour: ".bi-total-hour",
    hour: ".bi-hour",
    productPrice: ".bi-product-price",
    totalGuest: ".bi-order-total-guest",
    guestPrice: ".bi-order-guest-price",
    totalPrice: ".bi-order-total-price"
  },
  formInput: {
    firstName: "#firstName",
    lastName: "#lastName",
    email: "#email",
    mobile: "#mobile",
    countryCode: "#country-code",
    birthdate: "#birthdate"
  },
  creditCardInput: {
    number: "#cardnumber",
    expiration: "#expiration",
    cvc: "#cvc",
    holder: "#cardHolder",
    accept: "#accept-pd"
  },
  regex: {
    email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    countryCode: /^\+[1-9]{1}[0-9]{1,4}$/,
    mobile: /^[0-9]{10,13}$/,
    name: /\w\D/
  },
  checks: {
    email: false,
    firstName: false,
    lastName: false,
    countryCode: true, // True cunku ilk acildigi +90 value'sunu aliyor
    mobile: false,
    birthDate: false,
    gender: false
  },

  createFormObject: function() {
    // Guest Objects
    var _product = [];
    for (var i = 0; i < state.femaleGuest; i++) {
      _product.push(new Product(832505, "f", state.date.totalHour));
    }
    for (var i = 0; i < state.maleGuest; i++) {
      _product.push(new Product(832504, "m", state.date.totalHour));
    }

    // Host Object
    var _guest = new Guest();

    _guest.firstName = state.guest.firstName;
    _guest.lastName = state.guest.lastName;
    _guest.email = state.guest.email;
    _guest.mobile = state.guest.mobile;
    _guest.birthDate = state.guest.birthdate;

    // Credit Card

    var _card = new CreditCard();

    _card.number = $(this.creditCardInput.number).val();
    _card.expiration = $(this.creditCardInput.expiration).val();
    _card.cvc = $(this.creditCardInput.cvc).val();
    _card.holder = $(this.creditCardInput.holder).val();

    // Booking Date

    var _date = new BookingDate();
    _date.checkIn = state.date.checkIn;
    _date.checkOut = state.date.checkOut;
    _date.bookedHour = state.date.bookedHours;

    // Booking Object
    var _booking = new Booking();
    _booking.location = state.location;
    _booking.date = _date;
    _booking.products = _product;

    // Form Object

    var _form = new Form();
    _form.booking = _booking;
    _form.guest = _guest;
    _form.card = _card;

    // Log
    console.log(JSON.stringify(_form));
  },
  test: function() {
    var _t = this;
    $(".test").bind("click", function() {
      // console.log(state);
      _t.createFormObject();
    });
  },

  // getDay Fonksiyonuna hernangi bir deger girilmez ise bugunun tarihini alir ve string'e cevirir
  // Girilen deger integer olmalidir
  // Deger girilir ise bugunun tarihine girilen deger kadar gun ekler
  getDate: function(addYear, addMonth, addDay) {
    currentDate = new Date();
    addDay ===  undefined  ? addDay = 0 :  addDay;
    addMonth ===  undefined  ? addMonth = 0 : addMonth;
    addYear ===  undefined  ? addYear = 0 : addYear;
    return (
      (currentDate.getFullYear() + addYear).toString() +
      "-" +
      (currentDate.getMonth() + 1 + addMonth).toString().padStart(2, 0) +
      "-" +
      (currentDate.getDate() + addDay).toString().padStart(2, 0)
    );
  },
  setInitialDate: function() {
    var _t = this,
      el = _t.el,
      cls = _t.cls,
      formInput = _t.formInput;

    $(el.time).attr("data-date", _t.getDate());
  },
  events: function() {
    var _t = this,
      el = _t.el,
      cls = _t.cls,
      formInput = _t.formInput,
      card = _t.creditCardInput;

    // STEP 0 to 1
    $(".comfirm-button").bind("click", function() {
      // State'deki valuelari html icine aktarir
      _t.bookingInfoParser();
      // Ilk asamayi cikarip ikinci asamyi getirir
      $(".booking-container").addClass("ems-none");
      $(".booking-info-container").removeClass("ems-none");
      // Step Asamasi
      $(".booking-step-container ")
        .removeClass("step0")
        .addClass("step1");
      // Order -info Container Gelir
      $(".booking-info-order-container").removeClass("ems-none");
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
      });
    });
    
    $(".continue-button").on("click", function() {
      if ($(this).attr("rel") == "card-info") {
        $(".booking-payment-details-container").addClass("ems-none");
        $(".booking-comfirmation-container").removeClass("ems-none");

        // Step Asamasi
        $(".booking-step-container ")
          .removeClass("step3")
          .addClass("step4");
        $(".continue-button").text("BACK TO HOME PAGE");
        $(this).attr("rel", "comfirm-info");
        _t.comfirmationParser();
        _t.createFormObject();
      }

      if ($(this).attr("rel") == "guest-info") {
        $(".booking-guest-info-container").addClass("ems-none");
        $(".booking-payment-details-container").removeClass("ems-none");

        // Guest Info Bolumundeki Form Inputlari State'e yollar
        state.guest.firstName = $(_t.formInput.firstName).val();
        state.guest.lastName = $(_t.formInput.lastName).val();
        state.guest.email = $(_t.formInput.email).val();
        state.guest.mobile =
          $(_t.formInput.countryCode).val() + $(_t.formInput.mobile).val();
        state.guest.birthdate = $(_t.formInput.birthdate).val();

        // Step Asamasi
        $(".booking-step-container ")
          .removeClass("step2")
          .addClass("step3");
        // Button Class Degisimi
        $(".continue-button").text("COMFIRM PAYMENT");

        $(this).attr("rel", "card-info");
      }
      if ($(this).attr("rel") == "booking-info") {
        $(".booking-info-container").addClass("ems-none");
        $(".booking-guest-info-container").removeClass("ems-none");

        // Step Asamasi
        $(".booking-step-container ")
          .removeClass("step1")
          .addClass("step2");

        $(this).attr("rel", "guest-info");
      }
      $(".continue-button").addClass(cls.disabled);
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
      });
    });
    // 7 Yas Uyarisini Açar
    var s = 0;
    var maxDate = _t.getDate(-7,0,0);
    var minDate = _t.getDate(-100,0,0);
    $(formInput.birthdate).on("focus", function() {
      if (s === 0) {
        s++;
        $(".child-warning").removeClass(cls.none);
        $(".warning-background").removeClass(cls.none);
        $(this).attr("type", "date");
        $(formInput.birthdate).attr("max", maxDate);
       
      }
    });
    // 7 Yas Uarisini Kapatir
    $(".child-warning")
      .find("div")
      .bind("click", function() {
        $(".child-warning").addClass(cls.none);
        $(".warning-background").addClass(cls.none);
      });
    // Privacy Policy Açar
    $(".pd-privacy")
      .find(".pd-icon")
      .bind("click", function() {
        $(".pp-warning").removeClass(cls.none);
        $(".warning-background").removeClass(cls.none);
      });
    // Privacy Policy Kapatır
    $(".pp-warning")
      .find("div")
      .bind("click", function() {
        $(".pp-warning").addClass(cls.none);
        $(".warning-background").addClass(cls.none);
      });
    // Terms of Use Açar
    $(".pd-term")
      .find(".pd-icon")
      .bind("click", function() {
        $(".tou-warning").removeClass(cls.none);
        $(".warning-background").removeClass(cls.none);
      });
    // terms of Use Kapatır
    $(".tou-warning")
      .find("div")
      .bind("click", function() {
        $(".tou-warning").addClass(cls.none);
        $(".warning-background").addClass(cls.none);
      });
  },
  // REGEX FORM VALIDATIONS
  validations: function() {
    var _t = this,
      input = _t.formInput,
      regex = _t.regex,
      cls = _t.cls,
      checks = _t.checks;

    // EMAIL VALIDATION
    $(input.email).on("input propertychange", function() {
      if (regex.email.test($(this).val())) {
        $(this)
          .parent()
          .addClass("form-valid")
          .removeClass("form-invalid");
        checks.email = true;
      } else {
        $(this)
          .parent()
          .addClass("form-invalid")
          .removeClass("form-valid");
        checks.email = false;
      }
    });
    // FIRSTNAME VALIDATION
    $(input.firstName).on("input propertychange", function() {
      if (regex.name.test($(this).val())) {
        $(this)
          .parent()
          .addClass("form-valid")
          .removeClass("form-invalid");
        checks.firstName = true;
      } else {
        $(this)
          .parent()
          .addClass("form-invalid")
          .removeClass("form-valid");
        checks.firstName = false;
      }
    });
    // LASTNAME VALIDATION
    $(input.lastName).on("input propertychange", function() {
      if (regex.name.test($(this).val())) {
        $(this)
          .parent()
          .addClass("form-valid")
          .removeClass("form-invalid");
        checks.lastName = true;
      } else {
        $(this)
          .parent()
          .addClass("form-invalid")
          .removeClass("form-valid");
        checks.lastName = false;
      }
    });
    // MOBILE VALIDATION
    $(input.mobile).on("input propertychange", function() {
      if (regex.mobile.test($(this).val())) {
        $(this)
          .parent()
          .parent()
          .addClass("form-valid")
          .removeClass("form-invalid");
        checks.mobile = true;
      } else {
        $(this)
          .parent()
          .parent()
          .addClass("form-invalid")
          .removeClass("form-valid");
        checks.mobile = false;
      }
    });
    // COUNTRY CODE VALIDATION

    $(input.countryCode).on("input propertychange", function() {
      if (regex.countryCode.test($(this).val())) {
        $(this)
          .parent()
          .addClass("form-valid")
          .removeClass("form-invalid");
        checks.countryCode = true;
      } else {
        $(this)
          .parent()
          .addClass("form-invalid")
          .removeClass("form-valid");
        checks.countryCode = false;
      }
    });
    //BIRTHDATE VALIDATION
    $(input.birthdate).on("change", function() {
      if ($(this).val() != "") {
        $(this)
          .parent()
          .addClass("form-valid")
          .removeClass("form-invalid");
        checks.birthDate = true;
      } else {
        $(this)
          .parent()
          .addClass("form-invalid")
          .removeClass("form-valid");
        checks.birthDate = false;
      }
    });
  },
  controls: function() {
    var _t = this,
      cls = _t.cls,
      checks = _t.checks,
      card = _t.creditCardInput;
    var CI = state.date.checkIn,
      CO = state.date.checkOut,
      FG = state.femaleGuest,
      MG = state.maleGuest,
      L = state.location;

    var CCN = card.number,
      CCE = card.expiration,
      CVC = card.cvc,
      CCH = card.holder,
      CCA = card.accept;
    // Tüm Stateler Dolu ise Comfirm Buttonunu Active Hale Getirir
    comfirmButton = function() {
      if (CI != null && CO != "" && FG != null && MG != null && L != null) {
        $(".comfirm-button")
          .removeClass(cls.disabled)
          .addClass("active-button");
      } else {
        $(".comfirm-button").addClass(cls.disabled);
        $(".comfirm-button").removeClass("active-button");
      }
    };
    continueButton = function() {
      // HER INPUT DEGISIKLIGINDE SUBMIT BUTTONUNU CONTROL EDER
      $(".booking-guest-info-container")
        .find("input")
        .on("input propertychange, change", function() {
          if (
            checks.email &&
            checks.mobile &&
            checks.countryCode &&
            checks.firstName &&
            checks.lastName &&
            checks.birthDate
          ) {
            $(".continue-button").removeClass(cls.disabled);
          } else {
            $(".continue-button").addClass(cls.disabled);
          }
        });
    };

    comfirmPaymentButton = function() {
      $(".booking-payment-details-container")
        .find("input")
        .on("input propertychange, change", function() {
          if (
            $(CCN).val() != "" &&
            $(CCE).val() != "" &&
            $(CVC).val() != "" &&
            $(CCH).val() != "" &&
            $(CCA)[0].checked
          ) {
            $(".continue-button").removeClass(cls.disabled);
          } else {
            $(".continue-button").addClass(cls.disabled);
          }
        });
    };

    comfirmButton();
    continueButton();
    comfirmPaymentButton();
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
        _t.controls();
      });

      // Lokasyon Secer
      id.find("ul li").bind("click", function() {
        $(this)
          .addClass(cls.selectedItem)
          .siblings()
          .removeClass(cls.selectedItem);
        id.find(el.inputInfo).html($(this).text());

        // State'e Value Yollar
        state.location = $(this).attr("rel");
        state.locationName = $(this).text();
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

          // State'e value Yollar
          state.maleGuest = $("#male").val();
          state.femaleGuest = $("#female").val();
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
            // state.date.checkIn = $("#in-date").val() + "00:00";
            // state.date.checkOut = $("#out-date").val() + "00:00";
            $(el.calendarButton).text(
              $("#db-in-date")
                .val()
                .toString()
            );
          }
          _t.controls();
        });
    }),
      (customDatePicker = function() {
        // Check-in/out Tarih Secimi
        function setDate() {
          // Check-In Tarihini Secer ve Check-out Tarihine Atar
          $("#in-date")
            .datepicker({
              altFormat: "d M, y",
              dateFormat: "yy-mm-dd",
              altField: "#db-in-date",
              defaultDate: "+1d",
              changeMonth: false,
              numberOfMonths: 1,
              minDate: _t.getDate()
            })
            .on("change", function() {
              $("#out-date").datepicker("setDate", _getDate(this));
              $("#out-date").datepicker("option", "minDate", _getDate(this));

              // Tarih Yazisini Degistirir
              $(el.calendarButton).text(
                $("#db-in-date")
                  .val()
                  .toString()
              );

              // Saat Seçimindeki Date attribute'u degistiri
              $(el.time).attr("data-date", $("#in-date").val());

              // Zaman Aralığını Control Eder
              checkTimes();
              _t.controls();
            });
          // Check-Out Tarihini Secer ve Check-In Tarihine Atar
          $("#out-date")
            .datepicker({
              altFormat: "d M, y",
              dateFormat: "yy-mm-dd",
              altField: "#db-out-date",
              defaultDate: "+1d",
              changeMonth: false,
              numberOfMonths: 1,
              minDate: _t.getDate(),
              beforeShow: function(input, instance) {
                var maxDate = new Date(
                  $("#in-date")
                    .datepicker("getDate")
                    .valueOf()
                );
                maxDate.setDate(maxDate.getDate() + 1);
                $("#out-date").datepicker("option", "maxDate", maxDate);
              }
            })
            .on("change", function() {
              // Tarih Yazisini Degistirir
              $(el.calendarButton).text(
                $("#db-out-date")
                  .val()
                  .toString()
              );
              // Saat Seçimindeki Date attribute'u degistirir
              $(el.time).attr("data-date", $("#out-date").val());

              // Zaman Aralığını Control Eder
              checkTimes();
              _t.controls();
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

          $(".date-picker-container .input-info >div").bind(
            "click",
            function() {
              // İki tarih de seçli ise checkout tarihini seçtirmez
              if (state.date.checkIn !== "" && state.date.checkOut !== "") {
                $(".check-out-info").addClass(cls.disabled);
                $(".check-out-info").removeClass(cls.active);
              }
              var ths = $(this);

              if (ths.hasClass("check-in-info")) {
                $("#in-date").datepicker("show");
                $(".check-out-info").removeClass(cls.disabled);
              }
              if (ths.hasClass("check-out-info")) {
                if (!ths.hasClass(cls.disabled)) {
                  $("#out-date").datepicker("show");
                }
              }
              // Check-in Check-out "active" class degistirir
              ths
                .addClass(cls.active)
                .siblings()
                .removeClass(cls.active);
            }
          );
          // Tarih İleri Geri Buttonları
          var dateButton = $(".date-counter-button");

          dateButton.on("click", function() {
            var type = $(this).attr("rel");

            function counterDate(picker) {
              var date = $("#" + picker).datepicker("getDate");
              var multiply = 1;

              // Tarihi Değiştitir
              if (
                parseInt(
                  $("#out-date")
                    .val()
                    .substring(8, 10)
                ) <
                parseInt(
                  $("#in-date")
                    .val()
                    .substring(8, 10)
                ) +
                  1
              ) {
                type === "date-inc" ? (multiply = 1) : (multiply = -1);
              } else {
                type === "date-inc" ? (multiply = 0) : (multiply = -1);
              }
              date.setTime(date.getTime() + multiply * 1000 * 60 * 60 * 24);
              // Tarihi Değiştirir
              $("#" + picker).datepicker("setDate", date);
              $(el.time).attr("data-date", $("#" + picker).val());
              // Button Arasındaki Text i değiştirir
              $(el.calendarButton).text(
                $("#db-" + picker)
                  .val()
                  .toString()
              );
            }

            if ($(".check-in-info").hasClass(cls.active)) {
              counterDate("in-date");
            }
            if ($(".check-out-info").hasClass(cls.active)) {
              counterDate("out-date");
            }

            checkTimes();
            dateButtonsControl();
          });
          // Tarhi İleri Geri Buttonlarına Disable Class in  atar
          dateButtonsControl = function() {
            $(".date-counter-button").removeClass(cls.disabled);
            $(".date-counter-button").each(function() {
              if (state.date.checkIn != undefined) {
                if (
                  parseInt(
                    $(el.time)
                      .attr("data-date")
                      .substring(8, 10)
                  ) >=
                  parseInt(state.date.checkIn.substring(8, 10)) + 1
                ) {
                  $(this).attr("rel") === "date-inc"
                    ? $(this).addClass(cls.disabled)
                    : null;
                }
                if ($(el.time).attr("data-date") === _t.getDate()) {
                  $(this).attr("rel") === "date-dec"
                    ? $(this).addClass(cls.disabled)
                    : null;
                }
              }
            });
          };
        }

        // setTime fonksiyonu için [item = seçilen element] [type = seçimin türü]
        // type degeri iki farkli deger alabilir "check-in" || "check-out"

        function setTime(item, type) {
          var time = item.attr("data-time");
          var date; // text olarak gozuken tarih
          var dbDate; // database'e gonderilen tarih
          var fullDate = item.attr("data-date") + " " + time;
          $(el.time).removeClass(cls.bookedTime);
          if (type === "check-in") {
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
            // Takvimde tarihi check-in tarihine eşitler
            $("#out-date").datepicker("setDate", dbDate);

            // Checkout'u UI'da Siler
            $(el.datePicker)
              .find(".input-info .check-out-info .time-info") // bu bug lı çalışıyor şu an
              .removeClass("filled")
              .text("");

            $(item)
              .siblings()
              .removeClass(cls.selectedTime);
            // Active Seçimi Değiştirir
            $(el.datePicker)
              .find(".input-info .check-out-info")
              .addClass(cls.active);

            $(el.datePicker)
              .find(".input-info .check-in-info")
              .removeClass(cls.active);

            $(el.calendarButton).text(
              $("#db-in-date")
                .val()
                .toString()
            );
            // Seçili Zamanı UI'da gösterir
            if (state.date.checkIn === fullDate) {
              item.addClass(cls.selectedTime);
            }
            $(el.timePickerWarnings).addClass(cls.none);
            $(".date-warning").addClass(cls.none);
          } else if (type === "check-out") {
            // Tarih Yazısını Degistirir
            if (state.date.checkIn !== fullDate) {
              date = $("#db-out-date")
                .val()
                .toString();

              // Secili Zaman Degerini Alır
              dbDate = $("#out-date")
                .val()
                .toString();

              // State'e tarihi ve zamanı yollar
              state.date.checkOut = dbDate + " " + time;

              // Active Seçimi Değiştirir
              $(el.datePicker)
                .find(".input-info .check-in-info")
                .addClass(cls.active);

              $(el.datePicker)
                .find(".input-info .check-out-info")
                .removeClass(cls.active);

              $(el.calendarButton).text(
                $("#db-out-date")
                  .val()
                  .toString()
              );
            } else {
              state.date.checkOut = "";
              time = "";
              date = "";
            }
            $(el.timePickerWarnings).removeClass(cls.none);
            if (
              state.date.checkOut.slice(0, 11) !==
              state.date.checkIn.slice(0, 11)
            ) {
              $(".date-warning").removeClass(cls.none);
            }
          }
          // Booked Hours Hesaplar
          if (!state.date.checkOut == "") {
            var checkOutTime = state.date.checkOut.slice(11, -3);
            var checkInTime = state.date.checkIn.slice(11, -3);
            var checkOutDay = state.date.checkOut.slice(0, 11);
            var checkInDay = state.date.checkIn.slice(0, 11);
            var totalHour = 0;
            var firstBookedHour = 0;
            var secondBookedHour = 0;
            var totalBookedHour = 0;
            // Eger aynı gun secili ise
            if (checkOutDay === checkInDay) {
              state.date.bookedHours = [];
              totalHour = parseInt(checkOutTime) - parseInt(checkInTime);
              while (totalBookedHour < totalHour) {
                state.date.bookedHours.push(
                  checkInDay +
                    (parseInt(checkInTime) + totalBookedHour)
                      .toString()
                      .padStart(2, 0) +
                    ":00"
                );
                totalBookedHour++;
              }
              state.date.totalHour = totalBookedHour;
            }
            // Eger farklı günler seçili ise
            if (checkOutDay !== checkInDay) {
              state.date.bookedHours = [];
              var firstDay = 24 - parseInt(checkInTime);
              var secondDay = parseInt(checkOutTime);
              totalBookedHour = firstDay + secondDay;
              while (firstBookedHour < firstDay) {
                state.date.bookedHours.push(
                  checkInDay +
                    (parseInt(checkInTime) + firstBookedHour)
                      .toString()
                      .padStart(2, 0) +
                    ":00"
                );
                firstBookedHour++;
              }
              while (secondBookedHour < secondDay) {
                secondBookedHour++;
                state.date.bookedHours.push(
                  checkOutDay +
                    (parseInt(checkOutTime) - secondBookedHour)
                      .toString()
                      .padStart(2, 0) +
                    ":00"
                );
              }
            }
            state.date.totalHour = totalBookedHour;
          }

          // Check-in Check-out Yazısını Değiştirir

          $(el.datePicker)
            .find(".input-info ." + type + "-info")
            .addClass("filled")
            .find(el.timeInfo)
            .text(time + " - " + date);
        }
        // Saat Seçimi
        $(el.time).bind("click", function() {
          var checkInState = state.date.checkIn;
          var checkOutState = state.date.checkOut;
          var hour = parseInt($(this).attr("data-time"));
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
            // secielen saat aynı günde ise
            // secilen saat check-in saatinden küçük ise
            if (
              hour < parseInt(checkInState.slice(11, -3)) &&
              $(this).attr("data-date") == $("#in-date").val()
            ) {
              setTime($(this), "check-in");
              $(this)
                .siblings()
                .removeClass(cls.selectedTime);
            } else if (
              parseInt(
                $(this)
                  .attr("data-date")
                  .substring(8, 10)
              ) >=
                parseInt(
                  $("#in-date")
                    .val()
                    .substring(8, 10)
                ) &&
              $(this).attr("data-time") !== state.date.checkIn.substring(11, 16)
            ) {
              setTime($(this), "check-out");
              timePickerWarnings();
            }
          } else if (
            // check-in ve check-out seçili ise
            checkInState != "" &&
            checkOutState != ""
          ) {
            $(el.time).attr("data-date", $("#in-date").val());

            setTime($(this), "check-in");
          }
          // Zaman Aralığını Control Eder
          checkTimes();
          dateButtonsControl();
          _t.controls();
        });

        function checkTimes() {
          $(el.time).removeClass(cls.bookedTime);
          $(el.time).removeClass(cls.selectedTime);

          var dt = new Date();
          var currentHour = dt.getHours();

          $(el.time).each(function() {
            var thisTime =
              $(this).attr("data-date") + " " + $(this).attr("data-time");
            if (
              thisTime === state.date.checkIn ||
              thisTime === state.date.checkOut
            ) {
              $(this).addClass(cls.selectedTime);
            }
            if (state.date.checkOut != "") {
              state.date.bookedHours.forEach(bookedHour => {
                if (thisTime === bookedHour) {
                  $(this).addClass(cls.bookedTime);
                }
              });
            }
            if (
              $(this).attr("data-date") == _t.getDate() &&
              parseInt($(this).attr("data-time")) <= currentHour
            ) {
              $(this).addClass(cls.disabled);
            } else {
              $(this).removeClass(cls.disabled);
            }
          });
        }

        checkTimes();
        setDate();

        function timePickerWarnings() {
          $("#tp-totalHour").text(state.date.totalHour);
          $("#ci-day").text(
            $("#db-in-date")
              .val()
              .substring(0, 5)
          );
          $("#co-day").text(
            $("#db-out-date")
              .val()
              .substring(0, 5)
          );
        }
      }),
      // Pluginleri Cagirir
      dropDown(el.dropDown); // dropdown

    $(el.counter)
      .find(el.counterWrapper)
      .each(function() {
        counter(this); // counter
      });
    customDatePicker(); //customDatepicker
    // birthDatePicker(); //birtdatePciker
  },
  // Booking Info Sekmesine Bilgileri Aktarır
  bookingInfoParser: function() {
    var _t = this,
      el = _t.el,
      cls = _t.cls,
      info = _t.info;
    var markup = "";

    // ILGILI ALANLARI STATE'DEN CEKEREK DOLDURUR

    $(info.location).text(state.locationName);
    $(info.date).text(
      $("#db-in-date")
        .val()
        .substring(0, 6) +
        " - " +
        $("#db-out-date").val()
    );
    $(info.maleNumber).text(state.maleGuest);
    $(info.femaleNumber).text(state.femaleGuest);
    $(info.checkInHour).text(state.date.checkIn.substring(11, 16));
    $(info.checkOutHour).text(state.date.checkOut.substring(11, 16));
    $(info.totalHour).text(state.date.totalHour.toString());
    $(info.guestPrice).text((state.date.totalHour * 7).toString());
    $(info.totalGuest).text(
      (parseInt(state.maleGuest) + parseInt(state.femaleGuest)).toString()
    );
    $(info.totalPrice).text(
      (
        (parseInt(state.maleGuest) + parseInt(state.femaleGuest)) *
        (state.date.totalHour * 7)
      ).toString()
    );
    var maleCard = state.maleGuest > 0 ? 1 : 0;
    var femaleCard = state.femaleGuest > 0 ? 1 : 0;

    for (var i = 1 - maleCard; i < 1 + femaleCard; i++) {
      markup += $("#guestTemplate")
        .html()
        .replace(/[$][$]strURN_KOD[$][$]/g, Math.floor(Math.random() * 10))
        .replace(/[$][$]strURN_AD[$][$]/g, i == 0 ? "Male" : "Female")
        .replace(
          /{{guestNumber}}/,
          i == 0 ? state.maleGuest : state.femaleGuest
        )
        .replace(/[$][$]salesPrice[$][$]/g, 7)
        .replace(/{{hour}}/g, state.date.totalHour)
        .replace(/{{price}}/g, state.date.totalHour * 7);
    }
    $(".booking-info-product-wrapper").html(markup);
  },

  comfirmationParser: function() {
    var _t = this,
      el = _t.el,
      cls = _t.cls,
      info = _t.info;
    var markup = "";
    var data = JSON.parse(mockJSON);
    var asdsa = `2019-10-08 14:00 2019-10-08 22:00`
    var f = 0;
    var m = 0;
    var months = ["UNKNOWN", "January", "February", "March", "April", "May", "June", "July", "Auguts", "September", "October", "November", "December"]
    data.booking.products.forEach(function(el) {
      if (el.gender == "f") {
        f++;
      }
      if (el.gender == "m") {
        m++;
      }
    });
    function getMotnhs(number) {
      return months[parseInt(number)]
    }

    function parseDates(date){
      var checkIn = date.substring(8,10) + " " + getMotnhs(date.substring(5,7));
      var checkOut = date.substring(25,27) + " " + getMotnhs(date.substring(22,24));
      return checkIn + " - " + checkOut + ", " + date.substring(2,4)
    }

    function parseTimes(date){
      var checkIn = date.substring(11,16)
      var checkOut = date.substring(28,33)
      return checkIn + " - " + checkOut 
    }

    markup = $("#paymentMethodTemplate")
      .html()
      .replace(/{{reservationID}}/g, data.reservation.id)
      .replace(/{{airport}}/g, data.booking.location)
      .replace(/{{dates}}/g, parseDates(data.booking.date))
      .replace(/{{times}}/g, parseTimes(data.booking.date) + " (" +  data.booking.products[0].hours + " hrs)") 
      .replace(/{{guests}}/g, m + " Male, " + f + " Female");
    $(".booking-comfirmation-container").html(markup);

    var guestMarkup = ""
    var maleCard = state.maleGuest > 0 ? 1 : 0;
    var femaleCard = state.femaleGuest > 0 ? 1 : 0;
    for (var i = 1 - maleCard; i < 1 + femaleCard; i++) {
      guestMarkup += $("#guestTemplate")
        .html()
        .replace(/[$][$]strURN_KOD[$][$]/g, Math.floor(Math.random() * 10))
        .replace(/[$][$]strURN_AD[$][$]/g, i == 0 ? "Male" : "Female")
        .replace(
          /{{guestNumber}}/,
          i == 0 ? state.maleGuest : state.femaleGuest
        )
        .replace(/[$][$]salesPrice[$][$]/g, 7)
        .replace(/{{hour}}/g, state.date.totalHour)
        .replace(/{{price}}/g, state.date.totalHour * 7);
    }
    $(".booking-info-product-container").html(guestMarkup);
  },

  // Butun Fonksiyonlari Cagirir
  init: function() {
    console.log(JSON.parse(mockJSON));

    this.setInitialDate();
    this.plugins();
    this.test();
    this.events();
    this.validations();
    this.controls();
  }
};

setForm.init();

/* 
  bunu sil
*/
var translation = {};

/* 
    kredi kart
*/
var crediCart = {
  el: {
    wrp: ".ems-card-wrapper",
    container: ".card-wrapper",
    target: ".pd-credit-card",
    card: ".jp-card-container .jp-card",

    inputName: '[id$="cardHolder"]',
    inputCVC: '[id$="cvc"]',
    inputNumber: '[id$="cardnumber"]',
    inputExpiry: '[id$="expiration"]',

    targetInputName: '[id="card-name"]',
    targetInputCVC: '[id="card-cvc"]',
    targetInputNumber: '[id="card-number"]',
    targetInputExpiry: '[id="card-expiry"]'
  },
  cls: { flipped: "jp-card-flipped" },
  template:
    '<div class="ems-card-wrapper"><div class="card-wrapper"></div><div class="ems-hidden"><input type="text" name="number" id="card-number"><input type="text" name="first-name" id="card-name"/><input type="text" name="expiry" id="card-expiry"/><input type="text" name="cvc" id="card-cvc"/></div></div>',
  set: function(o) {
    var _t = this,
      ID = o["ID"],
      target = o["target"],
      evt = document.createEvent("HTMLEvents");
    evt.initEvent("keyup", false, true);

    setTimeout(function() {
      target
        .val(o["val"] || ID.val() || "")
        .get(0)
        .dispatchEvent(evt);
    }, 1);
  },
  addEvent: function() {
    var _t = this;

    $(_t.el.inputName).bind("keyup", function() {
      _t.set({ ID: $(this), target: $(_t.el.targetInputName) });
    });

    $(_t.el.inputCVC)
      .bind("keyup", function() {
        _t.set({ ID: $(this), target: $(_t.el.targetInputCVC) });
      })
      .bind("focus", function() {
        $(_t.el.card).addClass(_t.cls["flipped"]);
      })
      .bind("blur", function() {
        $(_t.el.card).removeClass(_t.cls["flipped"]);
      });

    $(_t.el.inputNumber).bind("keyup", function() {
      _t.set({ ID: $(this), target: $(_t.el.targetInputNumber) });
    });

    $(_t.el.inputExpiry).bind("keyup", function() {
      _t.set({ ID: $(this), target: $(_t.el.targetInputExpiry) });
    });
  },
  initPlugins: function() {
    var _t = this;

    /*
        payment
      */

    $.payment.formatExpiry = function(expiry) {
      var mon, parts, sep, year;
      parts = expiry.match(/^\D*(\d{1,2})(\D+)?(\d{1,2})?/);
      if (!parts) {
        return "";
      }
      mon = parts[1] || "";
      sep = parts[2] || "";
      year = parts[3] || "";
      if (year.length > 0 || (sep.length > 0 && !/\ \/?\ ?/.test(sep))) {
        sep = " / ";
      }
      if (mon.length === 1 && (mon !== "0" && mon !== "1")) {
        mon = "0" + mon;
        sep = " / ";
      }
      return mon + sep + year;
    };

    $(_t.el.inputNumber).payment("formatCardNumber");
    $(_t.el.inputCVC).payment("formatCardCVC");
    $(_t.el.inputExpiry).payment("formatCardExpiry");

    /* 
        kredi kart
      */
    $.getScript("card.js", function() {
      $(_t.el.wrp).card({
        container: _t.el.container,
        formSelectors: {
          numberInput: _t.el.targetInputNumber,
          expiryInput: _t.el.targetInputExpiry,
          cvcInput: _t.el.targetInputCVC,
          nameInput: _t.el.targetInputName
        },
        placeholders: {
          name: translation["crediCartName"] || "ADINIZ SOYADINIZ"
        }
      });
      _t.addEvent();
    });
  },
  add: function() {
    var _t = this;
    $(_t.el.target).append(_t.template);
  },
  init: function() {
    var _t = this;
    if ($(_t.el.target).length > 0 && $(_t.el.inputName).length > 0) {
      _t.add();
      _t.initPlugins();
    }
  }
};

crediCart.init();
