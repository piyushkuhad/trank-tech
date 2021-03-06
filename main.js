$(document).ready(function(){

  //Set Header height
  let headerTopHt = $('.cm-header-top').outerHeight();
  let headerHt = $('.cm-header-wrapper').outerHeight();

  $('.cm-header-container').css('height', headerHt);

  //Mega Menu
  $('.cm-menu-wrapper > ul > li.cm-mega-menu .cm-submenu-lv-1 > li span').click(function(){
      let mmId = $(this).attr('data-mm-id');
      $(this).addClass('mm-active');
      $(this).siblings().removeClass('mm-active');
      let selectedMM = $(this).parent('.cm-menu-heads').siblings('.cm-menu-links').children('.cm-mm-' + mmId);

      console.log(selectedMM.hasClass('cm-mm-' + mmId));

      selectedMM.addClass('mm-active');
      selectedMM.siblings().removeClass('mm-active');
  })

  //Mobile Menu Start
  $(".custom-menu-primary ul li.cm-item-has-children > a").after(' <div class="child-trigger"><i class="fa fa-angle-down"></i></div>');

  $("body").click(function(e) {
      $(this).removeClass("menu-open");
      $(".child-trigger").removeClass("child-open");
      $(".cm-menu-children-wrapper").slideUp(250);
  });

  $(".menu-trigger").click(function(e) {
      e.stopPropagation();
      $("body").toggleClass("menu-open");
      $(".child-trigger").removeClass("child-open");
      $(".cm-menu-children-wrapper").slideUp(250);
      return false
  });

  $(".custom-menu-primary .cm-menu-wrapper").click(function(e) {
      e.stopPropagation();
  });

  $(".child-trigger").click(function() {
      $(this).parent().siblings(".cm-item-has-children").find(".child-trigger").removeClass("child-open");
      $(this).parent().siblings(".cm-item-has-children").find(".cm-menu-children-wrapper").slideUp(250);
      $(this).next(".cm-menu-children-wrapper").slideToggle(250);
      $(this).next(".cm-menu-children-wrapper").children(".cm-item-has-children").find(".cm-menu-children-wrapper").slideUp(250);
      $(this).next(".cm-menu-children-wrapper").children(".cm-item-has-children").find(".child-trigger").removeClass("child-open");
      $(this).toggleClass("child-open");
      return false;
  });     
  //Mobile Menu End

  //Tabber
  $(".cm-tab-panels ul li").click(function() {
    //figure out which panel to show
     var panelToShow = $(this).attr("rel");
     //hide current panel
    $(".cm-tab-panels .panel.active").not("#" + panelToShow).hide(0, function() {
      $(this).removeClass("active");
      $("#" + panelToShow).show(0, function() {
        $(this).addClass("active");
      });
    });
     //show  new panel
     $(this).siblings(".cm-tab-panels ul li").removeClass("active");
     $(this).addClass("active");
   });


  //Homepage Hero Slider
  $('.cm-hero-slider-container').slick({
    infinite: true,
    fade: true,
    // autoplay: true,
    // autoplaySpeed: 5000,
  });

  //Homepage Services Slider
  $('.cm-home-services-slider').slick({
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000,
    fade: true,
    dots: true
  });

  //Homepage Services Slider
  $('.cm-home-client-slider').slick({
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000,
    fade: true,
    dots: true
  });

  //Animated Circle Start

  function startCircleAnim(){

    $('.cm-anim-circle').each(function(){
      let circle = $(this).find('circle');
      let radius = 52;
      let circumference = radius * 2 * Math.PI;
  
      circle.css({'stroke-dasharray': `${circumference} ${circumference}`, 'stroke-dashoffset': `${circumference}`});
  
      function setProgress(percent) {
        const offset = circumference - percent / 100 * circumference;
        circle.css('stroke-dashoffset', offset);
      }
  
      setProgress(circle.attr('data-percent'));
    })

  }

  $(window).scroll(function() {
    if($('.cm-home-planning-container ').hasClass('active-section')) {
      startCircleAnim();
    }
  })

  //Animated Circle End

  //Add Class when Section in viewport
  function sectionInView() {
    $('.cm-section').each(function(){
      let topPos = $(this).offset().top;
      let topScroll = $(window).scrollTop();
      let winHt = $(window).height();
      
       if((topPos - topScroll + winHt*0.1) < winHt) {
         $(this).addClass('active-section');
       }
    })
  }
  
  //Throttling Function
  function throttleFn(fn, limit) {
    let flag= true;
    
    return function(){
      let context = this, args = arguments;
      if(flag) {
        fn.apply(context, args);
        flag = false;
  
        setTimeout(() => flag = true, limit);
      } 
    }
  }
  
  //Throttling SectionInView Fn
  const sectionInViewThrot = throttleFn(sectionInView, 300);

  //Show Tech Icons

  $('.cm-more-tech span').click(function(){
    const techBtn = $(this);

    $('.cm-home-tech-container .cm-tech-item').slice(-3).each(function(){
      $(this).removeClass('tech-hidden');
    });

    $(this).parent().remove();
  })

  //Window Scroll Fn
  $(window).scroll(function(){
    if($(document).scrollTop() > headerTopHt) {
      $('.cm-header-container').addClass('sticky');
    }
    else{
      $('.cm-header-container').removeClass('sticky');
    }

    sectionInViewThrot();

    //Back to top show/hide
    if ($(this).scrollTop()) {
      $('#backToTop').fadeIn();
    } else {
        $('#backToTop').fadeOut();
    }

  });

  $(window).resize(sectionInViewThrot);

  //Convert slider images to background img
  function genBgImg() {
    $('.cm-home-slide').each(function(){
      let imgPath = $(this).find('.cm-slider-img').attr('src');

      $(this).css('background-image', `url(${imgPath})`);
    })
  }

  if(window.innerWidth < 480) {
    genBgImg();
  }

  $("#backToTop").click(function() {
    $("html, body").animate({scrollTop: 0}, 1000);
 });

  //Initialise Scroll transitions
  AOS.init({
    once: true
  });

})