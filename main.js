$(document).ready(function(){

  //Set Header height
  let headerTopHt = $('.cm-header-top').outerHeight();
  let headerHt = $('.cm-header-wrapper').outerHeight();

  $('.cm-header-container').css('height', headerHt);

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
    autoplay: true,
    autoplaySpeed: 5000,
    fade: true,
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
  

  //Test Click
  $('.cm-header-cta').click(function(e){
    e.preventDefault();
    $('.cm-home-achievement-container').toggleClass('active');
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

  //Window Scroll Fn
  $(window).scroll(function(){
    if($(document).scrollTop() > headerTopHt) {
      $('.cm-header-container').addClass('sticky');
    }
    else{
      $('.cm-header-container').removeClass('sticky');
    }

    sectionInViewThrot();
  });

  $(window).resize(sectionInViewThrot);

})