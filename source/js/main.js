/***
*   Timaru District Tourism  - Main JS - Authors: Lilly Dorgan (Squiz)
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
};

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
  };

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
  $("#ms").multipleSelect({
    placeholder: "Tags"
  });

  $("#ms-landing").multipleSelect({
    placeholder: "Category"
  });

  if ($('.pagination a').lengtha == 0) {
    $('.pagination').hide();
  };

  $('.become-list').each(function(index) {
    if ($('.become-list').text !== "") {
      var $this = $(this),
          $list = $this.text().trim().split(",");
      
      $this.empty();

      for (i=0; i < $list.length; i++) {
        var itemClass = $list[i].replace(/ /g,"-").toLowerCase();
        var item = '<li class="' + itemClass + '"><span>' + $list[i] + '</span></li>';
        $this.append(item);
      }
    };
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


  if ($('.three-best').length !== 0) {    
    $.get(( "/../../assets/nested-content-assets/content-templates/three-best/three-best-search?id=" + threeBestRoot[0]), function (response) {
      $('.three-best__wrap').html(response);
      threeBestSlider();
    });
  }


  if ($('.our-region').length !== 0 && !$('.adbt').length) {    
    $.get(( "/../../assets/nested-content-assets/content-templates/our-region/our-region-search?id=" + ourRegionRoot[0]), function (response) {
      $('.our-region__wrap').html(response);
      ourRegionSlider();
    });
  }  
  else {
    ourRegionSlider();
  } 


  if ($('body').hasClass('itineraries')){
    $.each($('.listing-itineraries__highlights'), function() {
      var highlightRoot = $(this).data('root');

      $.get( 'http://tt.timaru.govt.nz/assets/nested-content-assets/nested-content-elements/itineraries/itineraries-highlights?id=' + highlightRoot + '', function( data ) {
        $('.listing-itineraries__highlights').html( data );
      });   
    })
  }


}; 
// globalActions()


function landingTopicSearch() {
  var searchBtn = $('.activity-search').find('input[type=submit]'),
      searchForm = $('.activity-search').closest('form');

  function submitForm() {
    var keywordsQuery = $('#queries_keywords_query').val(),
        optionsQuery = $('#ms-landing').val(),
        queryString = "?queries_options_query=" + optionsQuery + "&queries_keywords_query=" + keywordsQuery + "&current_result_page=1&results_per_page=12";

    if($('.itineraries').length) {
      keywordsQuery = $('#queries_length_query').val(),
      optionsQuery = $('#ms').val();
      queryString = "?queries_options_query=" + optionsQuery + "&queries_length_query=" + keywordsQuery + "&current_result_page=1&results_per_page=12";
    }

    window.location.search = queryString;
  }

  searchBtn.click(function(e){
    e.preventDefault();
    submitForm();
  });
};

function threeBest(){
  var root = $('.three-best').find('select').val();               
    $.get(( "../../assets/nested-content-assets/content-templates/three-best/three-best-search?id=" + root), function (response) {
      $('.three-best__wrap').html(response);
      threeBestSlider();
    });
};

function ourRegion(){
  var root = $('.our-region').find('select').val();

  if(!$('.adbt').length) {
    $.get(( "../../assets/nested-content-assets/content-templates/our-region/our-region-search?id=" + root), function (response) {
      $('.our-region__wrap').html(response);
        ourRegionSlider();
    });
  }
  else {
    ourRegionSlider();
  }
};

function mobileMenu() {
  $('.utility-nav__item--primary-toggle a').click(function(e) {
    e.preventDefault();
    e.stopPropagation();
    
    $('.primary-nav').toggle().toggleClass('open');
    $('.utility-nav__item--primary-toggle').toggleClass('close');
  });

  $('body').click(function(){
      $('.primary-nav').hide().removeClass('open');
      $('.utility-nav__item--primary-toggle').removeClass('close');
  });
};


function videos() {

  $(".watch-timaru__video-filter").click(function(){
    console.log('t');
    var video = $(this).next("video").get(0);
    
    $(this).toggleClass('playing');

    if (video.paused) {
        video.play();
        return false;
    } else {
      video.pause();
      return false;
    }
      return true;
    });
};

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
    draggable: true,
    responsive: [
      {
        breakpoint: 768,
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
  })
};

function ourRegionSlider(){

  $('.our-region__list').slick({
    dots: true,
    infinite: true,
    autoplay: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    mobileFirst: true,
    centerMode: true,
    variableWidth: true,
    centerPadding: '8.6%',
    draggable: true,
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
};

 // var $mobileSlider = $('.slick-three-best');
 //  if ($(window).width() < 1025) {
 //    if($mobileSlider.hasClass('slick-initialized')) {
 //      $mobileSlider.slick('unslick');
 //    }

 //    $mobileSlider.slick({
 //      dots: true,
 //      centerMode: true,
 //      infinite: true,
 //      draggable: true,
 //      speed: 300,
 //      arrows: false,
 //      slidesToShow: 1,
 //      variableWidth: true
 //    });

 //  } 
 //  else {
 //    if($mobileSlider.hasClass('slick-initialized')) {
 //      $mobileSlider.slick('unslick');
 //    }
 //  }



function searchForm() {
  $('.utility-nav__item--search-toggle a').click(function(e) {
    e.preventDefault();
    e.stopPropagation();
    
    $('.site-search').addClass('open');
  });

  $('.site-search').click(function(e){
    e.stopPropagation();
  });

  $(document).click(function(e){
    if (!$(e.target).is('.site-search')) {
      $('.site-search').removeClass('open');
    }
  }); 

  $('.site-search input[type=search]').focus(function(e){
    $(this).parent('fieldset').parent('form').parent('.site-search').addClass('site-search--expanded');
  });

  $('.site-search input[type=search]').focusout(function(e){
    $(this).parent('fieldset').parent('form').parent('.site-search').blur().removeClass('site-search--expanded');
  });
};

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

  $('ul.topic-list').has('li.topic-list__item--featured').removeClass('topic-list--standard').addClass('topic-list--featured');

  console.log('t');
}; // megaMenu()




function threeBestSlider() {
  var $mobileSlider = $('.slick-three-best');
  if ($(window).width() < 767) {
    if($mobileSlider.hasClass('slick-initialized')) {
      $mobileSlider.slick('unslick');
    }

    $mobileSlider.slick({
      dots: true,
      centerMode: true,
      draggable: true,
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
};

function whatsOnSlider() {

  // var $whatsOnSlider = $('.whats-on-slider ul.listing--events:nth-child(3)'),
  //     $clonedSlider = $whatsOnSlider.clone(true, true),
  //     featuredSlides = $('.listing--events__feature').clone(true, true),
  //     featuredSlider = $('.featured-list');
  var featuredItems = featuredItems == null ? $('.listing--events__feature').clone() : featuredItems;

  if($('.featured-list li').length == 0) {
    $('.featured-list').append(featuredItems);
  }

  $('.whats-on-slider ul.listing--events:nth-child(3)').not('.slick-initialized').slick({
    dots: true,
    infinite: true,
    autoplay: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '100px',
    variableWidth: true,
    draggable: true,
    appendArrows: $('.whats-on-slider .slider-tools'),
    appendDots: $('.whats-on-slider .slider-dots'),
    responsive: [
      {
        breakpoint: 480,
        settings: {
          centerMode: false,
          centerPadding: '0px',
          slidesToShow: 2,
          slidesToScroll: 2,
          rows: 1
        }
      }
    ]
  });

  if ($(window).width() < 767) {
    $('.whats-on-slider ul.listing--events:nth-child(3)').slick('slickUnfilter');
    $('.whats-on-slider ul.listing--events:nth-child(3)').slick('slickFilter', ':not(.listing--events__feature)');
  }

  else {
    $('.whats-on-slider ul.listing--events:nth-child(3)').slick('slickUnfilter');
  }
};

/* Clean me */
$(document).ready(function () {
  AOS.init();

  mobileMenu();
  detectScrolling();
  globalActions();
  threeBest();
  megaMenu();  
  searchForm();
  whatsOnSlider(); 
  videos();
  landingTopicSearch();


  $('.slick').slick({
    dots: true,
    infinite: true,
    mobileFirst: true,
    slidesToScroll: 1,
    slidesToShow: 1
  });
// var $grid = $('.listing--events__item').isotope({
//   itemSelector: '.element-item',
//   layoutMode: 'masonryHorizontal'
// });
  $('.slick-watch-timaru').slick({
    dots: true,
    infinite: true,
    mobileFirst: true,
    slidesToScroll: 1,
    fade: true,
    draggable: true,
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

  // var featuredSlides = $('.whats-on-slider ul').slick('slickFilter', ".listing--events__feature");
  // $featuredSlides.each(function(){
    $('.listing--events__feature').parent('.slick-slide').after("<div class='visuallyhidden slick-slide'></div>");
  // });


  $(window).on("resize", debounce(function () {
    threeBestSlider();
    whatsOnSlider(); 
    megaMenu();
  }, 50)); 

});