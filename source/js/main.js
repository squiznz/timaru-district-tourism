/***
*   Insert Client Name - Main JS - Authors: Insert Author (Squiz)
***/

function detectScrolling() {

  /** Declare variables **/
  var triggerPoint = 90,
      scrTop = 0,
      featureDetected = false;

  function onRepaint() {
    if (typeof window.requestAnimationFrame === "undefined") {
      detectTrigger();
      return;
    }

    if (!featureDetected) {
      window.requestAnimationFrame(detectTrigger)
    }
    featureDetected = true;
  }

  function detectTrigger() {

    scrTop = $(window).scrollTop();
    featureDetected = false;

    (scrTop >= 10) ? $('html').addClass('moving') : $('html').removeClass('moving');
    (scrTop >= triggerPoint) ? $('html').addClass('scrolling') : $('html').removeClass('scrolling');
  }

  detectTrigger(); // run on page load for refresh when already scrolled
 
  $(window).on("scroll", function () {
    onRepaint();
  });
}; // detectScrolling()



function globalActions() {
  $('.utility-nav__item--primary-toggle a').click(function(e) {
    e.preventDefault();
    
    $('.primary-nav ul').toggle().toggleClass('open');
    $('.utility-nav__item--primary-toggle').toggleClass('close');
  });
  
  $('.utility-nav__item--search-toggle a').click(function(e) {
    e.preventDefault();
    
    $('.site-search').toggle().toggleClass('open');
  });

  $('.in-this-section h2').click(function(e) {
    e.preventDefault();
    
    $(this).next('ul').toggle();  
  });


  $('.site-search input[type=search]').focus(function(e){
    $(this).parent('fieldset').parent('form').parent('.site-search').addClass('site-search--expanded');
  });

  $('.site-search input[type=search]').focusout(function(e){
    $(this).parent('fieldset').parent('form').parent('.site-search').blur().removeClass('site-search--expanded');
  });

}; // globalActions()



$(document).ready(function () {
  $('.slick-center').slick({
    dots: true,
    infinite: true,
    autoplay: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    mobileFirst: true,
    centerMode: true,
    centerPadding: '8.7%',
    draggable: false,
    appendArrows: $('.slider-tools'),
    appendDots: $('.slider-dots'),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      }
    ]
  });

  $('.slick').slick({
    dots: true,
    infinite: true,
    mobileFirst: true,
    slidesToScroll: 1,
    slidesToShow: 1
  });

  $('.slick-three-best').slick({
    dots: true,
    infinite: true,
    autoplay: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    mobileFirst: true,
    centerMode: true,
    centerPadding: '8.7%',
    draggable: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: "unslick"
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  });

  $('.slick-watch-timaru').slick({
    dots: true,
    infinite: true,
    mobileFirst: true,
    slidesToScroll: 1,
    fade: true,
    slidesToShow: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: "unslick"
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  });

  // $('.whats-on-slider .listing--events').slick({
  //   // // dots: true,
  //   // infinite: true,
  //   // mobileFirst: true,
  //   // slidesToScroll: 5,
  //   // slidesToShow: 5,
  //   // rows: 3,
  //   // slidesPerRow: 2,
  //   // // variableWidth: true,
  //   // // draggable: true,
  //   // // arrows: true,
  //   // // fade: true,
  // });


  detectScrolling();
  globalActions();
  
});