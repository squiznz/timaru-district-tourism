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

function megaMenu() {
  var navItems = $('.primary-nav ul li');

  $('.primary-nav ul > li > a').click(function(e) {
    e.preventDefault();
    e.stopPropagation();

    $(this).parent('li').toggleClass('active').siblings().removeClass('active'); 
  });

  $('body').click(function(){
    navItems.each(function(){
      $(this).removeClass('active');
    })
  });
}

$(document).ready(function () {
  $('.slick-center ul').slick({
    dots: true,
    infinite: true,
    autoplay: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    mobileFirst: true,
    centerMode: true,
    centerPadding: '8.6%',
    draggable: false,
    appendArrows: $('.slick-center .slider-tools'),
    appendDots: $('.slick-center .slider-dots'),
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

  
  $('.whats-on-slider ul').slick({
    dots: true,
    infinite: true,
    autoplay: false,
    mobileFirst: true,
    draggable: false,
    // mobileFirst: true,
    variableWidth: true,
    centerMode: false,
    initialSlide: 1,
    appendArrows: $('.whats-on-slider .slider-tools'),
    appendDots: $('.whats-on-slider .slider-dots'),
    responsive: [
      {
      breakpoint: 0,
        settings: "unslick"
      },
      {
      breakpoint: 1024,
        settings: {
          centerMode: true,
          initialSlide: 1,
        }
      }
    ]
  });

  detectScrolling();
  globalActions();
  megaMenu();
  
});