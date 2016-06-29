/***
*   Insert Client Name - Main JS - Authors: Insert Author (Squiz)
***/

function debounce(e, t, n) {
    var i;
    return function() {
        var s = this
          , a = arguments
          , l = function() {
            i = null ,
            n || e.apply(s, a)
        }
          , r = n && !i;
        clearTimeout(i),
        i = setTimeout(l, t),
        r && e.apply(s, a)
    }
}

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

  if ($('.pagination a').length == 0) {
    $('.pagination').hide();
  };

  $('.tags-list').each(function(index) {
    if ($('.tags-list').text !== "") {
      var $this = $(this),
          $list = $this.text().trim().split(",");
      
      $this.empty();

      for (i=0; i < $list.length; i++) {
         var item = '<li class="' + $list[i] + '"><span>' + $list[i] + '</span></li>';
         $this.append(item);
      }
    };
  });

  $('.utility-nav__item--primary-toggle a').click(function(e) {
    e.preventDefault();
    
    $('.primary-nav').toggle().toggleClass('open');
    $('.utility-nav__item--primary-toggle').toggleClass('close');
  });

  $('.banner').each(function(index) {
      var bannerImage = $(this).data('img');

      if ($(this).hasClass('feature-banner--home')) {
        $(this).css('background','linear-gradient(rgba(72, 33, 192, 0.84), rgba(72, 33, 192, 0.84)) repeat scroll 0 0%, rgba(0, 0, 0, 0) url("'+ bannerImage +'") repeat scroll 0 0');
      } else if ($(this).hasClass('listing-itineraries__header') || $(this).hasClass('itinerary-details__header')){
        $(this).css('background','linear-gradient(rgba(0, 28, 66, 0.6), rgba(0, 28, 66, 0.6)) repeat scroll 0 0%, rgba(0, 0, 0, 0) url("'+ bannerImage +'") repeat scroll 0 0');
      }
      else {
        $(this).css('background-image','url('+ bannerImage +')')
      }
  });


  $('.three-best').find('select').change(function(){
   threeBest();
  });

  $('.our-region').find('select').change(function(){
   ourRegion();
  });

  $('.in-this-section h2').click(function(e) {
    e.preventDefault();
    
    $(this).next('ul').toggle();  
  });






  if ($('.our-region').length !== 0) {    
    $.get(( "../assets/nested-content-assets/content-templates/our-region/our-region-search?id=" + ourRegionRoot[0]), function (response) {
      $('.our-region__wrap').html(response);
      ourRegionSlider();
    });
  }   

  if ($('.three-best').length !== 0) {    
    $.get(( "../assets/nested-content-assets/content-templates/three-best/three-best-search?id=" + threeBestRoot[0]), function (response) {
      $('.three-best__wrap').html(response);
      threeBestSlider();
    });
  }


}; 
// globalActions()

function ourRegionSlider(){
  $('.our-region__list').slick({
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
        breakpoint: 480,
        settings: {
          centerPadding: '24.3%'
        }
      }, 
      {
        breakpoint: 768,
        settings: {
          centerPadding: '32%'
        }
      },
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
}


function threeBest(){
  var root = $('.three-best').find('select').val();
                  
  $.get(( "../assets/nested-content-assets/content-templates/three-best/three-best-search?id=" + root), function (response) {
    $('.three-best__wrap').html(response);
    threeBestSlider();
  });
}

function ourRegion(){
  var root = $('.our-region').find('select').val();
                    
  $.get(( "./assets/nested-content-assets/content-templates/our-region/our-region-search?id=" + root), function (response) {
    $('.our-region__wrap').html(response);
      ourRegionSlider();
  });
}



function threeBestSlider() {

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

 var $mobileSlider = $('.slick-three-best');
  if ($(window).width() < 1023) {
    if($mobileSlider.hasClass('slick-initialized')) {
      $mobileSlider.slick('unslick');
    }

    $mobileSlider.slick({
      dots: true,
      centerMode: true,
      infinite: true,
      speed: 300,
      arrows: false,
      slidesToShow: 1,
      variableWidth: true
    });

  } 
  else {
    if($mobileSlider.hasClass('slick-initialized')) {
      $mobileSlider.slick('unslick');
    }
  }
}


function searchForm() {
  $('.utility-nav__item--search-toggle a').click(function(e) {
    e.preventDefault();
    e.stopPropagation();
    
    $('.site-search').addClass('open');
    
      $('body').click(function(){
        $('.site-search').removeClass('open');
      }); 
  });


  $('.site-search input[type=search]').focus(function(e){
    $(this).parent('fieldset').parent('form').parent('.site-search').addClass('site-search--expanded');
  });

  $('.site-search input[type=search]').focusout(function(e){
    $(this).parent('fieldset').parent('form').parent('.site-search').blur().removeClass('site-search--expanded');
  });
}

function megaMenu() {

  if ($(window).width() > 1023) {
    var navItems = $('.primary-nav ul li');

    $('.primary-nav__first-level > li > a').click(function(e) {
      e.preventDefault();
      e.stopPropagation();

      $(this).parent('li').toggleClass('active').siblings().removeClass('active'); 
    });

    $('body').click(function(){
      navItems.each(function(){
        $(this).removeClass('active');
      })
    });
  } else {
    $('.primary-nav__first-level > li > a').unbind('click');

    $('.primary-nav__first-level > li > a').click(function(e) {
      return true;
    });
  }
} // globalActions()

//
function threeBestSlider() {
 var $mobileSlider = $('.slick-three-best');
  if ($(window).width() < 1023) {
    if($mobileSlider.hasClass('slick-initialized')) {
      $mobileSlider.slick('unslick');
    }

    $mobileSlider.slick({
      dots: true,
      centerMode: true,
      infinite: true,
      speed: 300,
      arrows: false,
      slidesToShow: 1,
      variableWidth: true
    });

  } 
  else {
    if($mobileSlider.hasClass('slick-initialized')) {
      $mobileSlider.slick('unslick');
    }
  }
}

/* Clean me */
$(document).ready(function () {

  $('.slick').slick({
    dots: true,
    infinite: true,
    mobileFirst: true,
    slidesToScroll: 1,
    slidesToShow: 1
  });


  $('.slick-watch-timaru').slick({
    dots: true,
    infinite: true,
    mobileFirst: true,
    slidesToScroll: 1,
    fade: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: false,
    responsive: [
      {
        breakpoint: 768,
        settings: "unslick"
      }
    ]
  });

  
  $('.whats-on-slider ul').slick({
    dots: true,
    infinite: true,
    autoplay: false,
    mobileFirst: true,
    draggable: false,
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
      breakpoint: 768,
        settings: {
          centerMode: true,
          initialSlide: 1,
        }
      }
    ]
  });

  detectScrolling();
  globalActions();
  threeBest();
  megaMenu();  
  searchForm();
  // ourRegion();
 
  $(window).on("resize", debounce(function () {
    threeBestSlider();

    console.log($(window).width())

    megaMenu(); 

  }, 50)); 
});