// Formun Kendisi ve Icindeki Parametreler Icin Olusturulan
// ES5 Class Functions

// TODO : GUNCEL SAAT ONCESI SECIM YAPILAMAZ

// TODO : STEP'E ILIGILI CLASS ATAMA

// TODO : REGEX KONTROL

// TODO : CREDIT CARD

// TODO : 7 YASINDAN KUCUKSE UYARI


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
  maleGuest: undefined
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
    gender: "#gender",
    email: "#email",
    mobile: "#mobile",
    birthdate: "#birthdate"
  },
  regex: {
    email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    mobile: /^\+[1-9]{1}[0-9]{11,14}$/,
    name: /\w\D/
  },
  test: function() {
    $(".test").bind("click", function() {
      console.log(state);
    });
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

    $(el.time).attr("data-date", _t.getDate());
  },
  events: function() {
    var _t = this,
      el = _t.el,
      cls = _t.cls;
    // Ilk asamadan ikinci asamaya gecerken olusacak durumlar
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

    $(".form-submit").on("click", function(){
      console.log("form clicked");
      
    })
  },
  // REGEX FORM VALIDATIONS
  validations: function() {
    var _t = this,
      input = _t.formInput,
      regex = _t.regex,
      cls = _t.cls;

    var checks = {
      email: false,
      firstName: false,
      lastName: false,
      mobile: false,
      birthDate: false,
      gender: false
    };

    $(input.email).on("input propertychange", function() {
      if (regex.email.test($(this).val())) {
        $(this)
          .addClass("form-valid")
          .removeClass("form-invalid");
        checks.email = true;
      } else {
        $(this)
          .addClass("form-invalid")
          .removeClass("form-valid");
        checks.email = false;
      }
    });
    $(input.firstName).on("input propertychange", function() {
      if (regex.name.test($(this).val())) {
        $(this)
          .addClass("form-valid")
          .removeClass("form-invalid");
        checks.firstName = true;
      } else {
        $(this)
          .addClass("form-invalid")
          .removeClass("form-valid");
        checks.firstName = false;
      }
    });
    $(input.lastName).on("input propertychange", function() {
      if (regex.name.test($(this).val())) {
        $(this)
          .addClass("form-valid")
          .removeClass("form-invalid");
        checks.lastName = true;
      } else {
        $(this)
          .addClass("form-invalid")
          .removeClass("form-valid");
        checks.lastName = false;
      }
    });
    $(input.mobile).on("input propertychange", function() {
      if (regex.mobile.test($(this).val())) {
        $(this)
          .addClass("form-valid")
          .removeClass("form-invalid");
        checks.mobile = true;
      } else {
        $(this)
          .addClass("form-invalid")
          .removeClass("form-valid");
        checks.mobile = false;
      }
    });
    // HER INPUT DEGISIKLIGINDE SUBMIT BUTTONUNU CONTROL EDER
    $(".booking-host-container").find("input").on("input propertychange", function(){
      if (checks.email && checks.mobile && checks.firstName && checks.lastName) {
        $(".form-submit").removeClass(cls.disabled);
      } else {
        $(".form-submit").addClass(cls.disabled);
      }
    })
 
  },
  controls: function() {
    var _t = this;
    (el = _t.el), (cls = _t.cls);
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
    comfirmButton();
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
              defaultDate: "+3d",
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
              numberOfMonths: 1
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
          } else if (type === "check-out") {
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

            // Secili Zamanı UI'da gösterir
            if (state.date.checkOut == fullDate) {
              item.addClass(cls.selectedTime);
            }
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
            } else {
              setTime($(this), "check-out");
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
          _t.controls();
        });

        function checkTimes() {
          $(el.time).removeClass(cls.bookedTime);
          $(el.time).removeClass(cls.selectedTime);

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
          });
        }
        // Tarih İleri Geri Buttonları
        var dateButton = $(".date-counter-button");

        dateButton.on("click", function() {
          var type = $(this).attr("rel");
          function counterDate(picker) {
            var date = $("#" + picker).datepicker("getDate");
            var multiply = 1;
            type === "date-inc" ? (multiply = 1) : (multiply = -1);
            date.setTime(date.getTime() + multiply * 1000 * 60 * 60 * 24);
            $("#" + picker).datepicker("setDate", date);
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
        });

        setDate();
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
  // Booking Info Sekmesine Bilgileri Aktarır
  bookingInfoParser: function() {
    var _t = this,
      el = _t.el,
      cls = _t.cls,
      info = _t.info;
    var fmarkup = "",
      mmarkup = "";

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

    // FEMALE VE MALE GUEST SAYISINA GORE PRODUCT CARD OLUSTURUR

    for (let i = 0; i < state.maleGuest; i++) {
      mmarkup += $("#guestTemplate")
        .html()
        .replace(/[$][$]strURN_KOD[$][$]/g, Math.floor(Math.random() * 10))
        .replace(/[$][$]strURN_AD[$][$]/g, "Male")
        .replace(/[$][$]salesPrice[$][$]/g, 7)
        .replace(/{{hour}}/g, state.date.totalHour)
        .replace(/{{price}}/g, state.date.totalHour * 7);
    }

    for (let i = 0; i < state.femaleGuest; i++) {
      fmarkup += $("#guestTemplate")
        .html()
        .replace(/[$][$]strURN_KOD[$][$]/g, Math.floor(Math.random() * 10))
        .replace(/[$][$]strURN_AD[$][$]/g, "Female")
        .replace(/[$][$]salesPrice[$][$]/g, 7)
        .replace(/{{hour}}/g, state.date.totalHour)
        .replace(/{{price}}/g, state.date.totalHour * 7);
    }

    $(".booking-info-product-wrapper").html(mmarkup + fmarkup);
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
