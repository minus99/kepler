// Formun Kendisi ve Icindeki Parametreler Icin Olusturulan
// ES5 Class Functions

// TODO

// 1. BOOKED TIMES ILE SECILEN ZAMAN CAKISMASI BUG

// 2. CreateBooking soap request
/*

3. 
Datepicker ileri tarih seç
Checkin saat seç
Checkout saat seç (aynı gün)
Geri tarihe git (button ile)
Checkin saat seç
İleri tarihe git (button ile)
Gidilen tarih datepicker ile seçilen tarih ile aynı
*/

/*
4.
Checkin tarihi seç
Bir sonraki check out tariihi seç
Checkin tarihi seçerken bir önceki gün tarihi seçiyor ve disable saate denk geliyor ise seçiyor

*/

/* 
5. Secili Saat ve Tarih Uyarısı Cıkmıyor ----------------------------- YAPILDI
*/

/* 
6. Start Again Buttonu 
*/

/*
7. Loading Seçiliyor Seçilmemesi Lazım  -------- YAPIlDI
*/

/*
8. Timepicker Request Bitmeden Seçiliyor Seçilememesi Lazım
*/

// CArd'da fiyat dogru degil kişi sayısı ile çarpması gerekiyor


var Form = function(booking, guest, card) {
  this.booking = booking;
  this.guest = guest;
  this.card = card;
};

var Booking = function(airportId, checkInDate, checkOutDate) {
  this.airportId = airportId;
  this.checkInDate = checkInDate;
  this.checkOutDate = checkOutDate;
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

var CreditCard = function(number, expiration, month, year, cvc, holder) {
  this.number = number;
  this.expiration = expiration;
  this.month = month;
  this.year = year;
  this.cvc = cvc;
  this.holder = holder;
};

// Secimlerin Global Olarak Tutulmasi

var state = {
  date: {
    checkIn: undefined,
    checkOut: undefined,
    bookedHours: [],
    totalHour: undefined,
    notAvailable: []
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
    disabled: "disabled",
    notAvailable: "not-available",
    notEnoughCapacity: "not-enough-capacity"
  },
  info: {
    product: "booking-info-product",
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
    var _t = this;
    if (state.maleGuest != null) {
      for (var i = 0; i < state.femaleGuest; i++) {
        _product.push(
          new Product(
            parseInt(
              $("#guestTemplate-Female")
                .find(".booking-info-product")
                .attr("rel")
            ),
            "f",
            state.date.totalHour
          )
        );
      }
    }
    if (state.femaleGuest != null) {
      for (var i = 0; i < state.maleGuest; i++) {
        _product.push(
          new Product(
            parseInt(
              $("#guestTemplate-Male")
                .find(".booking-info-product")
                .attr("rel")
            ),
            "m",
            state.date.totalHour
          )
        );
      }
    }

    // Host Object
    var _guest = new Guest();

    _guest.firstName = state.guest.firstName;
    _guest.lastName = state.guest.lastName;
    _guest.email = state.guest.email;
    // Backend Telefon Fixinden sonra substring olmadan yolla.
    _guest.mobile = state.guest.mobile.substring(2, state.guest.mobile.length);
    _guest.birthDate = state.guest.birthdate;

    // Credit Card

    var _card = new CreditCard();

    _card.number = $(this.creditCardInput.number)
      .val()
      .replace(/ /g, "");
    _card.month = $(this.creditCardInput.expiration)
      .val()
      .substring(0, 2);
    _card.year =
      "20" +
      $(this.creditCardInput.expiration)
        .val()
        .substring(5, 9);
    _card.cvc = $(this.creditCardInput.cvc).val();
    _card.holder = $(this.creditCardInput.holder).val();

    // Booking Object
    var _booking = new Booking();
    _booking.airportId = state.location.replace(/ /g, "");
    _booking.checkInDate = state.date.checkIn;
    _booking.checkOutDate = state.date.checkOut;
    _booking.products = _product;

    // Form Object

    var _form = new Form();
    _form.booking = _booking;
    _form.guest = _guest;
    _form.card = _card;
    console.log(_form);
    // Log
    return JSON.stringify({ data: _form });
  },
  test: function() {
    var _t = this;
    $(".test").bind("click", function() {
      console.log(state);
      _t.createFormObject();
    });
  },

  // getDay Fonksiyonuna hernangi bir deger girilmez ise bugunun tarihini alir ve string'e cevirir
  // Girilen deger integer olmalidir
  // Deger girilir ise bugunun tarihine girilen deger kadar gun ekler
  getDate: function(addYear, addMonth, addDay) {
    currentDate = new Date();
    addDay === undefined ? (addDay = 0) : addDay;
    addMonth === undefined ? (addMonth = 0) : addMonth;
    addYear === undefined ? (addYear = 0) : addYear;
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
      el = _t.el;
    $(el.time).attr("data-date", _t.getDate());
  },

  fetchAirports: function() {
    var markup = "";
    var _t = this;
    $.ajax({
      type: "POST",
      url: "/custom/kepler/keplerservice.asmx/GetAirportList",
      success: function(resp) {
        resp.data.forEach(function(item) {
          // Dropdown Seçeneklerini Getirir
          markup += $("#locationTemplate")
            .html()
            .replace(/{{item.id}}/g, item.id)
            .replace(/{{item.kodu}}/g, item.kodu)
            .replace(/{{item.adi}}/g, item.adi);
        });
        $(_t.el.dropDown)
          .find("ul")
          .html(markup);
      },
      complete: function() {
        // Dropdown Seçiminden Sonrki Actionlar
        $(_t.el.dropDown)
          .find("ul li")
          .bind("click", function() {
            // State'e Value Yolla
            state.location = $(this).attr("airport-id");
            state.locationName = $(this).attr("airport-name");
            $(this)
              .addClass(_t.cls.selectedItem)
              .siblings()
              .removeClass(_t.cls.selectedItem);
            $(_t.el.location)
              .find(_t.el.inputInfo)
              .text($(this).text());
          });
      },
      dataType: "json",
      timeout: 30000,
      error: function() {
        if (typeof callback !== "undefined") callback({ type: "error" });
      }
    });
  },
  fetchCapacity: function() {
    var _t = this;
    $.ajax({
      type: "POST",
      url: "/custom/kepler/keplerservice.asmx/GetAirportAvailableHours",
      data:
        "checkInDate=" +
        state.date.checkIn +
        "&checkOutDate=" +
        "" +
        "&airtportId=" +
        state.location,
      success: function(resp) {
        state.date.notAvailable = [];

        resp.data.forEach(function(data) {
          if (
            state.femaleGuest <= data.kadinKapasite &&
            state.maleGuest <= data.erkekKapasite
          ) {
            // console.log("available : " + data.girisSaati);
          } else {
            var notAvailable =
              data.girisSaati.substring(0, 10) +
              " " +
              data.girisSaati.substring(11, 16);

            state.date.notAvailable.push(notAvailable);
          }
        });
      },
      complete: function() {
        $(_t.el.time).removeClass(_t.cls.notAvailable);
        $(_t.el.time).removeClass(_t.cls.notEnoughCapacity);

        state.date.notAvailable.forEach(function(blocked) {
          $(_t.el.time).each(function() {
            var time =
              $(this).attr("data-date") + " " + $(this).attr("data-time");

            if (!blocked == time) {
              $(this).removeClass(_t.cls.notEnoughCapacity);
            } else if (blocked == time) {
              $(this)
                .next()
                .addClass(_t.cls.notEnoughCapacity);
            }

            // Uygun Olmayan Zaman Sonrası Seçimin İptali
            if (
              (state.date.checkOut == "" || undefined) &&
              (state.date.checkIn != "" || undefined)
            ) {
              $(this)
                .nextAll(".not-enough-capacity")
                .nextAll()
                .addClass(_t.cls.notAvailable);
            } else if (
              (state.date.checkOut != "" || undefined) &&
              (state.date.checkIn != "" || undefined)
            ) {
              $(_t.el.time).removeClass(_t.cls.notAvailable);
            }
          });
        });
      },
      timeout: 30000,
      error: function() {
        if (typeof callback !== "undefined") callback({ type: "error" });
      }
    });
  },
  createBooking: function() {
    var _t = this;
    var data = null;
    $.ajax({
      type: "POST",
      url: "/custom/kepler/KeplerService.asmx/CreateBooking",
      data: _t.createFormObject(),
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function(resp) {
        data = resp.data;
        console.log(resp);
        console.log(JSON.stringify(resp.data));
      },
      complete: function() {
        _t.comfirmationParser(data);
        $(".booking-payment-details-container").addClass("ems-none");
        $(".booking-comfirmation-container").removeClass("ems-none");
        $(".bi-order-payment ").removeClass("ems-none");
        // Step Asamasi
        $(".booking-step-container ")
          .removeClass("step3")
          .addClass("step4");
        $("body")
          .removeClass("step3")
          .addClass("step4");
        $(".continue-button").text("BACK TO HOME PAGE");
        $(".continue-button").attr("rel", "comfirm-info");
      },
      failure: function(resp) {
        console.log(resp.message);
        alert("error");
      }
    });
  },
  events: function() {
    var _t = this,
      el = _t.el,
      cls = _t.cls,
      formInput = _t.formInput,
      card = _t.creditCardInput;

    // Start Again Button

    $(".bi-button-back").bind("click", function() {
      location.reload();
    });

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
      $("body")
        .removeClass("step0")
        .addClass("step1");
      // Order -info Container Gelir
      $(".booking-info-order-container").removeClass("ems-none");
      $(".booking-form").scrollTop({
        top: 0,
        left: 0,
        behavior: "smooth"
      });
    });

    $(".continue-button").on("click", function() {
      if ($(this).attr("rel") == "card-info") {
        // _t.comfirmationParser();

        // _t.createFormObject();
        _t.createBooking();
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
        $("body")
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
        $("body")
          .removeClass("step1")
          .addClass("step2");

        $(this).attr("rel", "guest-info");
      }
      $(".continue-button").addClass(cls.disabled);
      $(".booking-form").scrollTop({
        top: 0,
        left: 0,
        behavior: "smooth"
      });
    });
    // 7 Yas Uyarisini Açar
    var s = 0;
    var maxDate = _t.getDate(-7, 0, 0);

    $(formInput.birthdate).on("focus", function() {
      if (s === 0) {
        s++;
        if (isMobile) {
          $(this).attr("type", "date");
          $(formInput.birthdate).attr("max", maxDate);
        } else {
          $(formInput.birthdate).datepicker({
            maxDate: "-7y",
            changeMonth: true,
            changeYear: true,
            dateFormat: "yy-mm-dd"
          });
        }
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
      var _id = $(id).parent();
      var isFetched = false;
      _id.bind("click", function() {
        $(el.dropDown).toggleClass(cls.none);
        _t.controls();
        if (!isFetched) {
          _t.fetchAirports();
        }
        isFetched = true;
      });
      //
      // Lokasyon Secer
      _id.find("ul").bind("click", "li", function() {
        // Bir Sonraki Adimi Aktif Hale Getirir
        if (state.location != null) {
          _id
            .next()
            .find(el.inputInfo)
            .removeClass(cls.none);
          _id
            .next()
            .find(el.counter)
            .removeClass(cls.none);
          _id
            .next()
            .find("ul")
            .removeClass(cls.none);
        }
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
          _t.fetchCapacity();
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
              _t.fetchCapacity();
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
              _t.fetchCapacity();
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

              _t.fetchCapacity();
            }
          );
          // Tarih İleri Geri Buttonları
          var dateButton = $(".date-counter-button");

          function counterDate(picker, type) {
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

          dateButton.bind("click", function() {
            var type = $(this).attr("rel");

            if ($(".check-in-info").hasClass(cls.active)) {
              counterDate("in-date", type);
            }
            if ($(".check-out-info").hasClass(cls.active)) {
              counterDate("out-date", type);
            }

            checkTimes();
            _t.fetchCapacity();
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
              .find(".input-info .check-out-info .time-info")
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

            // BURASI GEREKSIZ OLABILIR

            // // Seçili Zamanı UI'da gösterir
            // if (state.date.checkIn === fullDate) {
            //   item.addClass(cls.selectedTime);
            // }

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

            // Aynı gun degıl ise zaman uayarısını açar
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
            if ($(this).attr("data-date") == $("#in-date").val()) {
              if (hour < parseInt(checkInState.slice(11, -3))) {
                setTime($(this), "check-in");
                $(this)
                  .siblings()
                  .removeClass(cls.selectedTime);
                // secilen saat check-in saatinden buyuk ise
              } else if (
                $(this).attr("data-time") !==
                state.date.checkIn.substring(11, 16)
              ) {
                setTime($(this), "check-out");
              }
            } else if ($(this).attr("data-date") != $("#in-date").val()) {
              // seclıen ay check-ın tarhinden büyükse
              if (
                parseInt(
                  $(this)
                    .attr("data-date")
                    .substring(5, 7)
                ) >
                parseInt(
                  $("#in-date")
                    .val()
                    .substring(5, 7)
                )
              ) {
                setTime($(this), "check-out");
                // seclıen ay check-ın tarihi aynıysa
              } else if (
                parseInt(
                  $(this)
                    .attr("data-date")
                    .substring(5, 7)
                ) ==
                parseInt(
                  $("#in-date")
                    .val()
                    .substring(5, 7)
                )
              ) {
                if (
                  parseInt(
                    $(this)
                      .attr("data-date")
                      .substring(8, 10)
                  ) >
                  parseInt(
                    $("#in-date")
                      .val()
                      .substring(8, 10)
                  )
                ) {
                  setTime($(this), "check-out");
                }
              }
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
          timePickerWarnings();
          checkTimes();
          dateButtonsControl();
          _t.controls();
          _t.fetchCapacity();
        });

        function checkTimes() {
          $(el.time).removeClass(cls.bookedTime);
          $(el.time).removeClass(cls.selectedTime);

          var dt = new Date();
          var currentHour = dt.getHours();

          $(el.time).each(function() {
            var thisTime =
              $(this).attr("data-date") + " " + $(this).attr("data-time");
            // Check in ve Check out Saat Seçimi
            if (
              thisTime === state.date.checkIn ||
              thisTime === state.date.checkOut
            ) {
              $(this).addClass(cls.selectedTime);
            }
            // Seçilen Saatler
            if (state.date.checkOut != "") {
              state.date.bookedHours.forEach(bookedHour => {
                if (thisTime === bookedHour) {
                  $(this).addClass(cls.bookedTime);
                }
              });
            }
            // Simdiki saatten önceki saatler
            if (
              $(this).attr("data-date") == _t.getDate() &&
              parseInt($(this).attr("data-time")) <= currentHour
            ) {
              $(this).addClass(cls.disabled);
            } else {
              $(this).removeClass(cls.disabled);
            }
          });
          if ($(this).hasClass(cls.disabled)) {
            $(this).removeClass(cls.selectedTime);
            state.date.checkIn = "";
            state.date.checkOut = "";
          }
        }
        setDate();
        checkTimes();

        function timePickerWarnings() {
          $("#tp-totalHour").text(state.date.totalHour);
          $("#ci-day").text(
            $("#db-in-date")
              .val()
              .substring(0, 6)
          );
          $("#co-day").text(
            $("#db-out-date")
              .val()
              .substring(0, 6)
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
    $(info.totalGuest).text(
      (parseInt(state.maleGuest) + parseInt(state.femaleGuest)).toString()
    );
    $(info.totalPrice).text(
      (
        (parseInt(state.maleGuest) + parseInt(state.femaleGuest)) *
        (state.date.totalHour *
          parseInt(
            $("#guestTemplate-Female")
              .find(".bi-unit-price")
              .text()
          ))
      ).toString()
    );
    var maleCard = state.maleGuest > 0 ? 1 : 0;
    var femaleCard = state.femaleGuest > 0 ? 1 : 0;

    for (var i = 1 - maleCard; i < 1 + femaleCard; i++) {
      var price = $("#guestTemplate" + "-" + (i == 0 ? "Male" : "Female"))
        .find(".bi-unit-price")
        .text();

      markup += $("#guestTemplate" + "-" + (i == 0 ? "Male" : "Female"))
        .html()
        .replace(
          /{{guestNumber}}/g,
          i == 0 ? state.maleGuest : state.femaleGuest
        )
        .replace(/{{hour}}/g, state.date.totalHour)
        .replace(/{{price}}/g, (i == 0 ? state.maleGuest : state.femaleGuest) +" x " +  state.date.totalHour * parseInt(price));
    }

    $(".booking-info-product-container .booking-info-product-wrapper").html(
      markup
    );
  },

  comfirmationParser: function(data) {
    var _t = this,
      el = _t.el,
      cls = _t.cls,
      info = _t.info;

    // Reservation Parser

    var bookingDate =
      data.bookingTime.checkInDate +
      " - " +
      data.bookingTime.checkInDate +
      ", " +
      data.bookingTime.year;

    var bookingHour =
      data.bookingTime.checkInTime +
      "-" +
      data.bookingTime.checkOutTime +
      " (" +
      data.bookingTime.totalHours +
      " hrs)";

    reservationMarkup = $("#paymentMethodTemplate")
      .html()
      .replace(/{{reservationID}}/g, data.id)
      .replace(/{{airport}}/g, "Location")
      .replace(/{{dates}}/g, bookingDate)
      .replace(/{{times}}/g, bookingHour)
      .replace(
        /{{guests}}/g,
        data.guest.maleCount + " Male, " + data.guest.femaleCount + " Female"
      );
    $(".booking-comfirmation-container .booking-comfirmation-reservation").html(
      reservationMarkup
    );

    //Product Parser

    var productMarkup = "";

    var maleCard = data.guest.maleCount > 0 ? 1 : 0;
    var femaleCard = data.guest.femaleCount > 0 ? 1 : 0;

    for (var i = 1 - maleCard; i < 1 + femaleCard; i++) {
      var price = $("#guestTemplate" + "-" + (i == 0 ? "Male" : "Female"))
        .find(".bi-unit-price")
        .text();

      productMarkup += $("#guestTemplate" + "-" + (i == 0 ? "Male" : "Female"))
        .html()
        .replace(
          /{{guestNumber}}/g,
          i == 0 ? data.guest.maleCount : data.guest.femaleCount
        )
        .replace(/{{hour}}/g, data.bookingTime.totalHours)
        .replace(/{{price}}/g, data.bookingTime.totalHours * parseInt(price));
    }
    $(".booking-comfirmation-container .booking-info-product-wrapper").html(
      productMarkup
    );

    // Payment Parser

    var paymentMarkup = $("#paymentMethodTemplateBI")
      .html()
      .replace(/{{biOrderCardHolder}}/g, data.card.holder)
      .replace(/{{biOrderCardNumber}}/g, data.card.number);

    $(".bi-order-payment").html(paymentMarkup);

    //Info Parser

    $(info.totalHour).text(data.bookingTime.totalHours.toString());
    $(info.totalGuest).text(
      (data.guest.femaleCount + data.guest.maleCount).toString()
    );
    $(info.totalPrice).text(data.totalAmount.toString());
  },

  // Butun Fonksiyonlari Cagirir
  init: function() {
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
    $.getScript("/styles/js/card.js", function() {
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
