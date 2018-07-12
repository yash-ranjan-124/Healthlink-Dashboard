/*!

 =========================================================
 * Material Dashboard - v2.1.0
 =========================================================

 * Product Page: https://www.creative-tim.com/product/material-dashboard
 * Copyright 2018 Creative Tim (http://www.creative-tim.com)

 * Designed by www.invisionapp.com Coded by www.creative-tim.com

 =========================================================

 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

 */

(function () {
  isWindows = navigator.platform.indexOf('Win') > -1 ? true : false;

  if (isWindows) {
    // if we are on windows OS we activate the perfectScrollbar function
    $('.sidebar .sidebar-wrapper, .main-panel').perfectScrollbar();

    $('html').addClass('perfect-scrollbar-on');
  } else {
    $('html').addClass('perfect-scrollbar-off');
  }
})();


var breakCards = true;

var searchVisible = 0;
var transparent = true;

var transparentDemo = true;
var fixedTop = false;

var mobile_menu_visible = 0,
  mobile_menu_initialized = false,
  toggle_initialized = false,
  bootstrap_nav_initialized = false;

var seq = 0,
  delays = 80,
  durations = 500;
var seq2 = 0,
  delays2 = 80,
  durations2 = 500;

$(document).ready(function () {

  $('body').bootstrapMaterialDesign();

  $sidebar = $('.sidebar');

  md.initSidebarsCheck();

  window_width = $(window).width();

  // check if there is an image set for the sidebar's background
  md.checkSidebarImage();

  //    Activate bootstrap-select
  if ($(".selectpicker").length != 0) {
    $(".selectpicker").selectpicker();
  }

  //  Activate the tooltips
  $('[rel="tooltip"]').tooltip();

  $('.form-control').on("focus", function () {
    $(this).parent('.input-group').addClass("input-group-focus");
  }).on("blur", function () {
    $(this).parent(".input-group").removeClass("input-group-focus");
  });

  // remove class has-error for checkbox validation
  $('input[type="checkbox"][required="true"], input[type="radio"][required="true"]').on('click', function () {
    if ($(this).hasClass('error')) {
      $(this).closest('div').removeClass('has-error');
    }
  });

});

$(document).on('click', '.navbar-toggler', function () {
  $toggle = $(this);

  if (mobile_menu_visible == 1) {
    $('html').removeClass('nav-open');

    $('.close-layer').remove();
    setTimeout(function () {
      $toggle.removeClass('toggled');
    }, 400);

    mobile_menu_visible = 0;
  } else {
    setTimeout(function () {
      $toggle.addClass('toggled');
    }, 430);

    var $layer = $('<div class="close-layer"></div>');

    if ($('body').find('.main-panel').length != 0) {
      $layer.appendTo(".main-panel");

    } else if (($('body').hasClass('off-canvas-sidebar'))) {
      $layer.appendTo(".wrapper-full-page");
    }

    setTimeout(function () {
      $layer.addClass('visible');
    }, 100);

    $layer.click(function () {
      $('html').removeClass('nav-open');
      mobile_menu_visible = 0;

      $layer.removeClass('visible');

      setTimeout(function () {
        $layer.remove();
        $toggle.removeClass('toggled');

      }, 400);
    });

    $('html').addClass('nav-open');
    mobile_menu_visible = 1;

  }

});

// activate collapse right menu when the windows is resized
$(window).resize(function () {
  md.initSidebarsCheck();

  // reset the seq for charts drawing animations
  seq = seq2 = 0;

  setTimeout(function () {
    md.initDashboardPageCharts();
  }, 500);
});

md = {
  misc: {
    navbar_menu_visible: 0,
    active_collapse: true,
    disabled_collapse_init: 0,
  },

  checkSidebarImage: function () {
    $sidebar = $('.sidebar');
    image_src = $sidebar.data('image');

    if (image_src !== undefined) {
      sidebar_container = '<div class="sidebar-background" style="background-image: url(' + image_src + ') "/>';
      $sidebar.append(sidebar_container);
    }
  },

  showNotification: function (from, align) {
    type = ['', 'info', 'danger', 'success', 'warning', 'rose', 'primary'];

    color = Math.floor((Math.random() * 6) + 1);

    $.notify({
      icon: "add_alert",
      message: "Welcome to <b>Material Dashboard</b> - a beautiful freebie for every web developer."

    }, {
        type: type[color],
        timer: 3000,
        placement: {
          from: from,
          align: align
        }
      });
  },

  initFormExtendedDatetimepickers: function () {
    $('.datetimepicker').datetimepicker({
      icons: {
        time: "fa fa-clock-o",
        date: "fa fa-calendar",
        up: "fa fa-chevron-up",
        down: "fa fa-chevron-down",
        previous: 'fa fa-chevron-left',
        next: 'fa fa-chevron-right',
        today: 'fa fa-screenshot',
        clear: 'fa fa-trash',
        close: 'fa fa-remove'
      }
    });

    $('.datepicker').datetimepicker({
      format: 'MM/DD/YYYY',
      icons: {
        time: "fa fa-clock-o",
        date: "fa fa-calendar",
        up: "fa fa-chevron-up",
        down: "fa fa-chevron-down",
        previous: 'fa fa-chevron-left',
        next: 'fa fa-chevron-right',
        today: 'fa fa-screenshot',
        clear: 'fa fa-trash',
        close: 'fa fa-remove'
      }
    });

    $('.timepicker').datetimepicker({
      //          format: 'H:mm',    // use this format if you want the 24hours timepicker
      format: 'h:mm A', //use this format if you want the 12hours timpiecker with AM/PM toggle
      icons: {
        time: "fa fa-clock-o",
        date: "fa fa-calendar",
        up: "fa fa-chevron-up",
        down: "fa fa-chevron-down",
        previous: 'fa fa-chevron-left',
        next: 'fa fa-chevron-right',
        today: 'fa fa-screenshot',
        clear: 'fa fa-trash',
        close: 'fa fa-remove'

      }
    });
  },


  initSliders: function () {
    // Sliders for demo purpose
    var slider = document.getElementById('sliderRegular');

    noUiSlider.create(slider, {
      start: 40,
      connect: [true, false],
      range: {
        min: 0,
        max: 100
      }
    });

    var slider2 = document.getElementById('sliderDouble');

    noUiSlider.create(slider2, {
      start: [20, 60],
      connect: true,
      range: {
        min: 0,
        max: 100
      }
    });
  },

  initSidebarsCheck: function () {
    if ($(window).width() <= 991) {
      if ($sidebar.length != 0) {
        md.initRightMenu();
      }
    }
  },

  initDashboardPageCharts: function () {

    if ($('#byTherapyChart').length != 0 || $('#byInstChart').length != 0 || $('#patientFBchart').length != 0 || $('#incomeChart').length != 0 || $('#progTypeChart').length != 0 || $('#adherenceChart').length != 0) {
      /* ----------==========     Daily Sales Chart initialization    ==========---------- */


      var byTherapyChart = c3.generate({
        bindto: '#byTherapyChart',
        data: {
          // iris data from R

          columns: [
            ['Cardio Vascular Disease', 39.9],
            ['Diabetes', 19.8],
            ['Chronic Kidney Disease', 4.6],
            ['Chronic Obstructive Pulmonar Disease', 5.7],
            ['Cancer', 20.4]

          ],
          type: 'pie',
          onclick: function (d, i) { console.log("onclick", d, i); },
          onmouseover: function (d, i) { console.log("onmouseover", d, i); },
          onmouseout: function (d, i) { console.log("onmouseout", d, i); }
        }
      });

      setTimeout(function () {
        byTherapyChart.load({
          columns: [
            ['Cardio Vascular Disease', 39.9],
            ['Diabetes', 19.8],
            ['Chronic Kidney Disease', 4.6],
            ['Chronic Obstructive Pulmonar Disease', 5.7],
            ['Cancer', 20.4]

          ]
        });
      }, 1500);

      setTimeout(function () {
        byTherapyChart.unload({
          ids: 'data1'
        });
        byTherapyChart.unload({
          ids: 'data2'
        });
      }, 2500);





      /* ----------==========     Completed Tasks Chart initialization    ==========---------- */
      var dataInstChart = {
        labels: ['Obbovie', 'Cipla', 'pfizer', 'sanofi', 'lilly'],
        series: [
          [70, 60, 60, 40, 20],
          [60, 50, 50, 30, 10]
        ]
      };

      var optionsInstChart = {
        lineSmooth: Chartist.Interpolation.cardinal({
          tension: 0
        }),
        seriesBarDistance: 10,
        axisY: {
          type: Chartist.FixedScaleAxis,
          ticks: [0, 10, 20, 40, 50, 60, 70, 80, 90],
          low: 0
        }, chartPadding: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0
        }
      };

      var responsiveOptions = [
        ['screen and (max-width: 640px)', {
          seriesBarDistance: 5,
          axisX: {
            labelInterpolationFnc: function (value) {
              return value[0];
            }
          }
        }]
      ];

      //new Chartist.Bar('.ct-chart', data, options, responsiveOptions);

      /* var dataInstChart = {
            labels: ['12p', '3p', '6p', '9p', '12p', '3a', '6a', '9a'],
            series: [
              [230, 750, 450, 300, 280, 240, 200, 190]
            ]
          };*/



      var InstChart = new Chartist.Bar('#byInstChart', dataInstChart, optionsInstChart);

      // start animation for the Completed Tasks Chart - Line Chart
      md.startAnimationForLineChart(InstChart);








      var IncomeChart = c3.generate({
        bindto: '#incomeChart',
        data: {
          // iris data from R

          columns: [
            ['$0', 34],
            ['under $25000', 22],
            ['$25000 to $49000', 11],
            ['$50000 to $74000', 9],
            ['$75000 to $99999', 6],
            ['over $100,000', 8]

          ],
          type: 'pie',
          onclick: function (d, i) { console.log("onclick", d, i); },
          onmouseover: function (d, i) { console.log("onmouseover", d, i); },
          onmouseout: function (d, i) { console.log("onmouseout", d, i); }
        }
      });

      setTimeout(function () {
        IncomeChart.load({
          columns: [
            ['$0', 34],
            ['under $25000', 22],
            ['$25000 to $49000', 11],
            ['$50000 to $74000', 9],
            ['$75000 to $99999', 6],
            ['over $100,000', 8]

          ]
        });
      }, 1500);

      setTimeout(function () {
        IncomeChart.unload({
          ids: 'data1'
        });
        IncomeChart.unload({
          ids: 'data2'
        });
      }, 2500);








      var ProgTypeChart = c3.generate({
        bindto: '#progTypeChart',
        data: {
          // iris data from R

          columns: [
            ['Co-pay', 29.2],
            ['Care-Coach', 33.33],
            ['Awareness', 54],
            ['Artheritis Care', 22]

          ],
          type: 'pie',
          onclick: function (d, i) { console.log("onclick", d, i); },
          onmouseover: function (d, i) { console.log("onmouseover", d, i); },
          onmouseout: function (d, i) { console.log("onmouseout", d, i); }
        }
      });

      setTimeout(function () {
        ProgTypeChart.load({
          columns: [
            ['Co-pay', 29.2],
            ['Care-Coach', 33.33],
            ['Awareness', 54],
            ['Artheritis Care', 22]

          ]
        });
      }, 1500);

      setTimeout(function () {
        ProgTypeChart.unload({
          ids: 'data1'
        });
        ProgTypeChart.unload({
          ids: 'data2'
        });
      }, 2500);



      var adherenceChart = c3.generate({
        bindto: '#adherenceChart',
        data: {
          columns: [
            ['Co-pay', 80],
            ['Care-Coach', 60],
            ['Awareness', 40],
            ['Artheritis Care', 20]

          ],
          type: 'bar'
        }
      });
      setTimeout(function () {
        adherenceChart.load({
          columns: [
            ['Co-pay', 80],
            ['Care-Coach', 60],
            ['Awareness', 40],
            ['Artheritis Care', 20]

          ]
        });
      }, 1500);

      setTimeout(function () {
        adherenceChart.unload({
          ids: 'data1'
        });
        adherenceChart.unload({
          ids: 'data2'
        });
      }, 2500);

      //start animation for the Emails Subscription Chart
      // md.startAnimationForBarChart(adherenceChart);



    }
  },

  initMinimizeSidebar: function () {

    $('#minimizeSidebar').click(function () {
      var $btn = $(this);

      if (md.misc.sidebar_mini_active == true) {
        $('body').removeClass('sidebar-mini');
        md.misc.sidebar_mini_active = false;
      } else {
        $('body').addClass('sidebar-mini');
        md.misc.sidebar_mini_active = true;
      }

      // we simulate the window Resize so the charts will get updated in realtime.
      var simulateWindowResize = setInterval(function () {
        window.dispatchEvent(new Event('resize'));
      }, 180);

      // we stop the simulation of Window Resize after the animations are completed
      setTimeout(function () {
        clearInterval(simulateWindowResize);
      }, 1000);
    });
  },

  checkScrollForTransparentNavbar: debounce(function () {
    if ($(document).scrollTop() > 260) {
      if (transparent) {
        transparent = false;
        $('.navbar-color-on-scroll').removeClass('navbar-transparent');
      }
    } else {
      if (!transparent) {
        transparent = true;
        $('.navbar-color-on-scroll').addClass('navbar-transparent');
      }
    }
  }, 17),


  initRightMenu: debounce(function () {
    $sidebar_wrapper = $('.sidebar-wrapper');

    if (!mobile_menu_initialized) {
      $navbar = $('nav').find('.navbar-collapse').children('.navbar-nav');

      mobile_menu_content = '';

      nav_content = $navbar.html();

      nav_content = '<ul class="nav navbar-nav nav-mobile-menu">' + nav_content + '</ul>';

      navbar_form = $('nav').find('.navbar-form').get(0).outerHTML;

      $sidebar_nav = $sidebar_wrapper.find(' > .nav');

      // insert the navbar form before the sidebar list
      $nav_content = $(nav_content);
      $navbar_form = $(navbar_form);
      $nav_content.insertBefore($sidebar_nav);
      $navbar_form.insertBefore($nav_content);

      $(".sidebar-wrapper .dropdown .dropdown-menu > li > a").click(function (event) {
        event.stopPropagation();

      });

      // simulate resize so all the charts/maps will be redrawn
      window.dispatchEvent(new Event('resize'));

      mobile_menu_initialized = true;
    } else {
      if ($(window).width() > 991) {
        // reset all the additions that we made for the sidebar wrapper only if the screen is bigger than 991px
        $sidebar_wrapper.find('.navbar-form').remove();
        $sidebar_wrapper.find('.nav-mobile-menu').remove();

        mobile_menu_initialized = false;
      }
    }
  }, 200),

  startAnimationForLineChart: function (chart) {

    chart.on('draw', function (data) {
      if (data.type === 'line' || data.type === 'area') {
        data.element.animate({
          d: {
            begin: 600,
            dur: 700,
            from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
            to: data.path.clone().stringify(),
            easing: Chartist.Svg.Easing.easeOutQuint
          }
        });
      } else if (data.type === 'point') {
        seq++;
        data.element.animate({
          opacity: {
            begin: seq * delays,
            dur: durations,
            from: 0,
            to: 1,
            easing: 'ease'
          }
        });
      }
    });

    seq = 0;
  },
  startAnimationForBarChart: function (chart) {

    chart.on('draw', function (data) {
      if (data.type === 'bar') {
        seq2++;
        data.element.animate({
          opacity: {
            begin: seq2 * delays2,
            dur: durations2,
            from: 0,
            to: 1,
            easing: 'ease'
          }
        });
      }
    });

    seq2 = 0;
  }
}

// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.

function debounce(func, wait, immediate) {
  var timeout;
  return function () {
    var context = this,
      args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    }, wait);
    if (immediate && !timeout) func.apply(context, args);
  };
};