// Formun Kendisi ve Icindeki Parametreler Icin Olusturulan
// ES5 Class Functions

// TODO
// 1. BOOKED TIMES ILE SECILEN ZAMAN CAKISMASI BUG I

// 6. THANK YOU SAYFASI
// 7. DATA

// 9. SAFARI DESKTOP ICIN DATEPICKER

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

  test: function() {
    $(".test").bind("click", function() {
      console.log(state);
    });
  },

  // getDay Fonksiyonuna hernangi bir deger girilmez ise bugunun tarihini alir ve string'e cevirir
  // Girilen deger integer olmalidir
  // Deger girilir ise bugunun tarihine girilen deger kadar gun ekler
  getDate: function(addDay, addMonth, addYear) {
    currentDate = new Date();
    if (
      addDay === null ||
      ("undefined" && addMonth === null) ||
      ("undefined" && addDay === null) ||
      "undefined"
    ) {
      addDay = 0;
      addMonth = 0;
      addYear = 0;
    }
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
    $(formInput.birthdate).attr("min", _t.getDate(0, 0, -7));
  },
  events: function() {
    var _t = this,
      el = _t.el,
      cls = _t.cls,
      formInput = _t.formInput;
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
        $("").removeClass("ems-none");

        // Step Asamasi
        $(".booking-step-container ")
          .removeClass("step3")
          .addClass("step4");

        $(this).attr("rel", "");
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
        state.guest.birtdate = $(_t.formInput.birtdate).val();

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
    // 7 Yas Uyarisini Cikarir
    var s = 0;
    $(formInput.birthdate).on("focus", function() {
      if (s === 0) {
        s++;
        $(".child-warning").removeClass(cls.none);
        $(".warning-background").removeClass(cls.none);
      }
    });
    // 7 Yas Uarisini Kapatir
    $(".child-warning")
      .find("div")
      .bind("click", function() {
        $(".child-warning").addClass(cls.none);
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
      input = _t.formInput,
      regex = _t.regex,
      cls = _t.cls,
      checks = _t.checks;
    var CI = state.date.checkIn,
      CO = state.date.checkOut,
      FG = state.femaleGuest,
      MG = state.maleGuest,
      L = state.location;

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
    continueButtonS1 = function() {
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

    comfirmButton();
    continueButtonS1();
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
      // Guest Info Bolumundeki Datepicker
      // (birthDatePicker = function() {
      //   $("#birthdate")
      //     .datepicker({
      //       dateFormat: "dd/mm/yy",
      //       defaultDate: "+3d",
      //       changeMonth: false,
      //       numberOfMonths: 1
      //     })
      //     .on("change", function() {});
      //   // TODO : 7 yas eksi validation
      // });

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
  // Butun Fonksiyonlari Cagirir
  init: function() {
    this.setInitialDate();
    this.plugins();
    this.test();
    this.events();
    this.validations();
  }
};

setForm.init();
