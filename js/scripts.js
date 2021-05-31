(function ($) {
  $(document).ready(function () {
    "use strict";


    // HAMBURGER MENU
    $('.hamburger-menu').on('click', function (e) {
      if ($("body").hasClass('hamburger-navigation-active')) {

        $("body .hamburger-navigation").css("transition", "");
        $("body .hamburger-navigation").css("transition-delay", "0.6s");
        $("body .hamburger-navigation .nav-menu").css("transition-delay", "0s");
        $("body .hamburger-navigation .info-box").css("transition-delay", "0.2s");
        $("body .navbar .logo").css("transition-delay", "1.2s");
        $("body .navbar .navbar-text").css("transition-delay", "1.2s");
        $("body .navbar .site-menu").css("transition-delay", "1.2s");

        window.setTimeout(function () {
          $("body .hamburger-navigation").css("top", "0");
          $("body .hamburger-navigation").css("transition", "none");
        }, 2000);

        $("body.hamburger-navigation-active .hamburger-navigation").css("top", "100vh");

      } else {
        $("body .hamburger-navigation").css("transition", "");
        $("body .hamburger-navigation").css("transition-delay", "0s");
        $("body .hamburger-navigation .nav-menu").css("transition-delay", "1.5s");
        $("body .hamburger-navigation .info-box").css("transition-delay", "1.7s");
        $("body .navbar .logo").css("transition-delay", "0s");
        $("body .navbar .navbar-text").css("transition-delay", "0s");
        $("body .navbar .site-menu").css("transition-delay", "0s");

      }
      $(".hamburger-menu svg").toggleClass('opened');
      $("body").toggleClass('hamburger-navigation-active');
    });


    // DATEPICKER
    $('[data-toggle="datepicker"]').datepicker();


    // SPACING CONDUTIONS
    $('.overlap-bottom').closest('section').addClass('bottom-spacing');
    $('.left-align').closest('section').addClass('bottom-spacing');
    $('.side-gallery').closest('section').addClass('top-spacing');


    // PAGE TRANSITION
    $('body a').on('click', function (e) {

      var target = $(this).attr('target');
      var fancybox = $(this).data('fancybox');
      var url = this.getAttribute("href");
      if (target != '_blank' && typeof fancybox == 'undefined' && url.indexOf('#') < 0) {


        e.preventDefault();
        var url = this.getAttribute("href");
        if (url.indexOf('#') != -1) {
          var hash = url.substring(url.indexOf('#'));


          if ($('body ' + hash).length != 0) {
            $('.page-transition').removeClass("active");


          }
        } else {
          $('.page-transition').toggleClass("active");
          setTimeout(function () {
            window.location = url;
          }, 2000);

        }
      }
    });


    // TAB
    $(".tab-nav li").on('click', function (e) {
      $(".tab-item").hide();
      $(".tab-nav li").removeClass('active');
      $(this).addClass("active");
      var selected_tab = $(this).find("a").attr("href");
      $(selected_tab).stop().show();
      return false;
    });

  });
  // END DOCUMENT READY


  // RANGE SLIDER
  var rangeSlider = function () {
    var slider = $('.range-slider'),
      range = $('.range-slider__range'),
      value = $('.range-slider__value');

    slider.each(function () {

      value.each(function () {
        var value = $(this).prev().attr('value');
        $(this).html(value);
      });

      range.on('input', function () {
        $(this).next(value).html(this.value);
      });
    });
  };

  rangeSlider();


  // ROOMS SLIDER
  var swiper = new Swiper('.rooms-slider', {
    slidesPerView: 'auto',
    centeredSlides: true,
    spaceBetween: 30,
    breakpoints: {
      1024: {
        spaceBetween: 30,
      },
      768: {
        spaceBetween: 0,
        slidesPerView: 1,
      },
      640: {
        slidesPerView: 1,
        spaceBetween: 0,
      },
      320: {
        slidesPerView: 1,
        spaceBetween: 0,
      }
    }
  });


  // SLIDER
  var mainslider = new Swiper('.gallery-top', {
    spaceBetween: 0,

    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'progressbar',
    },

    thumbs: {
      swiper: sliderthumbs
    }
  });


  // SLIDER THUMBS
  var sliderthumbs = new Swiper('.gallery-thumbs', {
    direction: 'vertical',
    slidesPerView: 3,
    touchRatio: 0.2,
    slideToClickedSlide: true,

    breakpoints: {
      1024: {
        slidesPerView: 3
      },
      768: {
        slidesPerView: 1
      },
      640: {
        slidesPerView: 1
      },
      320: {
        slidesPerView: 1
      }
    }
  });

  if ($(".gallery-top")[0]) {
    mainslider.controller.control = sliderthumbs;
    sliderthumbs.controller.control = mainslider;
  } else {

  }


  Scrollbar.use(OverscrollPlugin);
  Scrollbar.init(document.querySelector('#main'));


  // Detect request animation frame
  var scroll = window.requestAnimationFrame
    ||
    // IE Fallback
    function (callback) {
      window.setTimeout(callback, 3000)
    };
  var elementsToShow = document.querySelectorAll('.reveal-effect');

  function loop() {

    Array.prototype.forEach.call(elementsToShow, function (element) {
      if (isElementInViewport(element)) {
        element.classList.add('animated');
      }
    });

    scroll(loop);
  }

  // Call the loop for the first time
  loop();

  // Helper function from: http://stackoverflow.com/a/7557433/274826
  function isElementInViewport(el) {
    // special bonus for those using jQuery
    if (typeof jQuery === "function" && el instanceof jQuery) {
      el = el[0];
    }
    var rect = el.getBoundingClientRect();
    return (
      (rect.top <= 0
        && rect.bottom >= 0)
      || (rect.bottom >= (window.innerHeight || document.documentElement.clientHeight)
        && rect.top <= (window.innerHeight || document.documentElement.clientHeight))
      || (rect.top >= 0
        && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight))
    );
  }


  // DATA BACKGROUND IMAGE
  var pageSection = $("*");
  pageSection.each(function (indx) {
    if ($(this).attr("data-background")) {
      $(this).css("background", "url(" + $(this).data("background") + ")");
    }
  });


  // DATA BACKGROUND COLOR
  var pageSection = $("*");
  pageSection.each(function (indx) {
    if ($(this).attr("data-background")) {
      $(this).css("background", $(this).data("background"));
    }
  });


  // SLIDER
  var roomslider = new Swiper('.room-gallery-top', {
    slidesPerView: "auto",
    spaceBetween: 10,
    autoplay: {
      delay: 9500,
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'progressbar',
    },

    thumbs: {
      swiper: roomthumbs
    }
  });


  // SLIDER THUMBS
  var roomthumbs = new Swiper('.room-gallery-thumbs', {
    spaceBetween: 10,
    slidesPerView: 6,
    touchRatio: 0.2,
    slideToClickedSlide: true,
    breakpoints: {
      1024: {
        slidesPerView: 3
      },
      768: {
        slidesPerView: 1
      },
      640: {
        slidesPerView: 1
      },
      320: {
        slidesPerView: 1
      }
    }
  });

  if ($(".room-gallery-top")[0]) {
    roomslider.controller.control = roomthumbs;
    roomthumbs.controller.control = roomslider;
  } else {

  }


  var swiper = new Swiper('.carousel-image-box', {
    slidesPerView: 4,
    spaceBetween: 30,
    scrollbar: {
      el: '.swiper-scrollbar',
      hide: true,
    },
    observer: true,
    observeParents: true,
    breakpoints: {
      1024: {
        slidesPerView: 3
      },
      768: {
        slidesPerView: 2
      },
      640: {
        slidesPerView: 1
      },
      320: {
        slidesPerView: 1
      }
    }
  });


  var swiper = new Swiper('.carousel-events-box', {
    slidesPerView: 3,
    spaceBetween: 30,

    observer: true,
    observeParents: true,
    navigation: {
      nextEl: '.swiper-next',
      prevEl: '.swiper-prev',
    },
    breakpoints: {
      1024: {
        slidesPerView: 3
      },
      768: {
        slidesPerView: 2
      },
      640: {
        slidesPerView: 1
      },
      320: {
        slidesPerView: 1
      }
    }
  });


  // SLIDER


  var menu = [];
  jQuery('.swiper-slide').each(function (index) {
    menu.push(jQuery(this).find('.slide-inner').attr("data-text"));
  });
  var interleaveOffset = 0.5;
  var swiperOptions = {
    loop: true,
    speed: 600,
    parallax: true,
    autoplay: {
      delay: 5500,
      disableOnInteraction: false,
    },
    grabCursor: true,
    watchSlidesProgress: true,
    navigation: {
      nextEl: '.slider-next',
      prevEl: '.slider-prev',
    },
    pagination: {
      el: '.slider-fraction',
      type: 'fraction',
    },
    on: {
      progress: function () {
        var swiper = this;
        for (var i = 0; i < swiper.slides.length; i++) {
          var slideProgress = swiper.slides[i].progress;
          var innerOffset = swiper.width * interleaveOffset;
          var innerTranslate = slideProgress * innerOffset;
          swiper.slides[i].querySelector(".slide-inner").style.transform =
            "translate3d(" + innerTranslate + "px, 0, 0)";
        }
      },
      touchStart: function () {
        var swiper = this;
        for (var i = 0; i < swiper.slides.length; i++) {
          swiper.slides[i].style.transition = "";
        }
      },
      setTransition: function (speed) {
        var swiper = this;
        for (var i = 0; i < swiper.slides.length; i++) {
          swiper.slides[i].style.transition = speed + "ms";
          swiper.slides[i].querySelector(".slide-inner").style.transition =
            speed + "ms";
        }
      }
    }
  };

  var swiper = new Swiper(".main-slider", swiperOptions);

  /* MAGNET CURSOR*/
  var cerchio = document.querySelectorAll('.hamburger-menu');
  cerchio.forEach(function (elem) {
    $(document).on('mousemove touch', function (e) {
      magnetize(elem, e);
    });
  })

  function magnetize(el, e) {
    var mX = e.pageX,
      mY = e.pageY;
    const item = $(el);

    const customDist = item.data('dist') * 20 || 80;
    const centerX = item.offset().left + (item.width() / 2);
    const centerY = item.offset().top + (item.height() / 2);

    var deltaX = Math.floor((centerX - mX)) * -0.35;
    var deltaY = Math.floor((centerY - mY)) * -0.35;

    var distance = calculateDistance(item, mX, mY);

    if (distance < customDist) {
      TweenMax.to(item, 0.5, {
        y: deltaY,
        x: deltaX,
        scale: 1
      });
      item.addClass('magnet');
    } else {
      TweenMax.to(item, 0.6, {
        y: 0,
        x: 0,
        scale: 1
      });
      item.removeClass('magnet');
    }
  }

  function calculateDistance(elem, mouseX, mouseY) {
    return Math.floor(Math.sqrt(Math.pow(mouseX - (elem.offset().left + (elem.width() / 2)), 2) + Math.pow(mouseY - (elem.offset().top + (elem.height() / 2)), 2)));
  }

  function lerp(a, b, n) {
    return (1 - n) * a + n * b
  }

  // Inizio Cursor
  class Cursor {
    constructor() {
      this.bind()
      //seleziono la classe del cursore
      this.cursor = document.querySelector('.js-cursor')

      this.mouseCurrent = {
        x: 0,
        y: 0
      }

      this.mouseLast = {
        x: this.mouseCurrent.x,
        y: this.mouseCurrent.y
      }

      this.rAF = undefined
    }

    bind() {
      ['getMousePosition', 'run'].forEach((fn) => this[fn] = this[fn].bind(this))
    }

    getMousePosition(e) {
      this.mouseCurrent = {
        x: e.clientX,
        y: e.clientY
      }
    }

    run() {
      this.mouseLast.x = lerp(this.mouseLast.x, this.mouseCurrent.x, 0.2)
      this.mouseLast.y = lerp(this.mouseLast.y, this.mouseCurrent.y, 0.2)

      this.mouseLast.x = Math.floor(this.mouseLast.x * 100) / 100
      this.mouseLast.y = Math.floor(this.mouseLast.y * 100) / 100

      this.cursor.style.transform = `translate3d(${this.mouseLast.x}px, ${this.mouseLast.y}px, 0)`

      this.rAF = requestAnimationFrame(this.run)
    }

    requestAnimationFrame() {
      this.rAF = requestAnimationFrame(this.run)
    }

    addEvents() {
      window.addEventListener('mousemove', this.getMousePosition, false)
    }

    on() {
      this.addEvents()

      this.requestAnimationFrame()
    }

    init() {
      this.on()
    }
  }

  if ($('.js-cursor').length > 0) {
    const cursor = new Cursor()

    cursor.init();


    /* CURSOR CONDITIONS */
    $('.carousel-image-box').hover(function () {
      $('.cursor').toggleClass('drag');
    });

    $('a, .hamburger-menu, .equalizer, .swiper-pagination-bullet, .swiper-button-prev, .swiper-button-next, .main-nav button, submit[type="submit"], .rooms-slider .room-detail h3').hover(function () {
      $('.cursor').toggleClass('light');
    });

  }


  // PRELOADER
  var width = 100,
    perfData = window.performance.timing, // The PerformanceTiming interface represents timing-related performance information for the given page.
    EstimatedTime = -(perfData.loadEventEnd - perfData.navigationStart),
    time = parseInt((EstimatedTime / 1000) % 60) * 60;

  $(".loadbar").animate({
    width: width + "%"
  }, time);

  function animateValue(id, start, end, duration) {

    var range = end - start,
      current = start,
      increment = end > start ? 1 : -1,
      stepTime = Math.abs(Math.floor(duration / range)),
      obj = $(id);

    var timer = setInterval(function () {
      current += increment;
      $(obj).text(current + "%");
      if (current == end) {
        clearInterval(timer);
      }
    }, stepTime);
  }

  setTimeout(function () {
    $("body").addClass("page-loaded");
  }, time);


})(jQuery);
