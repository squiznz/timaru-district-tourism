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
    
    $('.primary-nav').toggle().toggleClass('open');
    $('.utility-nav__item--primary-toggle').toggleClass('close');

  });
  
  $('.utility-nav__item--search-toggle a').click(function(e) {
    e.preventDefault();
    
    $('.site-search').toggle().toggleClass('open');

  });
}; // globalActions()





$(document).ready(function () {
  $('.slick-center').slick({
    dots: true,
    autoplay: true,
    infinite: true,
    autoplay: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    mobileFirst: true,
    centerMode: true,
    centerPadding: '8.7%',
    draggable: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
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

  $('.slick').slick({
    dots: true,
    infinite: true,
    autoplay: true,
    mobileFirst: true,
    slidesToScroll: 1,
    slidesToShow: 1
  });

  $('.slick-events').slick({
    dots: true,
    infinite: true,
        autoplay: true,
    mobileFirst: true,
    slidesToScroll: 1,
    slidesToShow: 4
  });


  detectScrolling();
  globalActions();
  
});