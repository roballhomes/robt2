//  note: body-loading gets removed on window.load
$('body').addClass('body-loading');


function makeSlider(divID) {
  var sliderDiv = $("#" + divID);
  if (sliderDiv.length === 0) {
    return null;
  }
  var slider = $("#" + divID).royalSlider({
    imageScaleMode: 'fit',
    controlNavigation: 'none',
    arrowsNav: true,
    fullscreen: {
  		// fullscreen options go here
  		enabled: true,
  		nativeFS: true,
      buttonFS: true
  	}
  }).data('royalSlider');

  // add rsDefault styles

  sliderDiv.addClass('royalSlider rsDefault');

  // slider Nav
  //
  // var sliderNav = $("#" + divID + '-nav');


  // Captions

  var captions = sliderDiv.closest('.grid').children('.bottom-content').first().children('.slider__captions');
  console.log(captions);

  // init styles
  captions.children().first().addClass('current');
  // set Nav state

  // insert navigation elements

  var sliderNav = $('<div class="slider__nav"></div>');

  var sliderNavLeft = $('<div class="slider__nav__arrow slider__nav__arrow--left"></div>');
  var sliderNavRight = $('<div class="slider__nav__arrow slider__nav__arrow--right"></div>');
  var sliderBullet = '<a class="slider__nav__bullet"></a>';

  for(var i = 0; i < slider.numSlides; i++){
    var newBullet = $(sliderBullet);
    sliderNav.append(newBullet);
  }

  var sliderBullets = sliderNav.children('.slider__nav__bullet');

  sliderNav.prepend(sliderNavLeft);
  sliderNav.append(sliderNavRight);

  // init style
  sliderNav.addClass('start');
  sliderBullets.first().addClass('current');

  sliderNavLeft.click(function() {
    slider.prev();
  });
  sliderNavRight.click(function() {
    slider.next();
  });

  sliderNav.insertBefore(captions);

  var sliderCount = $('.slider__count');
  // sliderNav.append(sliderCount);
  //
  var sliderCurrentCount = $('.current-count');
  var sliderFullCount = $('.full-count');

  sliderCurrentCount.html(slider.currSlideId + 1);
  sliderFullCount.html(slider.numSlides);

  // sliderCount.append([sliderCurrentCount, sliderFullCount]);
  //
  // sliderFullscreen = $('<div class="slider__fullscreen-button"><svg viewBox="0 0 300 300"  preserveAspectRatio="xMidYMid meet"><use x="0" y="0" href="#zoom"></use></svg><span>Fullscreen</span></div>');
  //
  // sliderNav.append(sliderFullscreen);
  // sliderNav.insertAfter(sliderDiv);

  var currentCount = sliderNav;

  // activate fullscreen button

  // sliderFullscreen.on('click', function(){
  //   console.log(slider);
  //   slider.enterFullscreen();
  // });

  slider.ev.on('rsBeforeAnimStart', function() {
    sliderCurrentCount.html(slider.currSlideId + 1);
    if (slider.currSlideId === 0) {
      sliderNav.attr('class', 'slider__nav start');
    } else if (slider.currSlideId === (slider.numSlides - 1)) {
      sliderNav.attr('class', 'slider__nav end');
    } else {
      sliderNav.attr('class', 'slider__nav middle');
    }
    //remove current class from all captions, then add to current
    captions.children().removeClass('current').eq(slider.currSlideId).addClass('current');
    //remove current class from all bullets, then add to current
    sliderBullets.removeClass('current').eq(slider.currSlideId).addClass('current');

  });

  // fullscreen




  // play Videos on slide

  var prevSlideVideo;
  var playSlideVideo = function() {
    if (prevSlideVideo) {
      prevSlideVideo.currentTime = 0;
      prevSlideVideo.pause();
    }
    var video = slider.currSlide.content.find('video');
    if (video.length) {
      prevSlideVideo = video[0];
      prevSlideVideo.play();
    } else {
      prevSlideVideo = null;
    }
  };
  slider.ev.on('rsAfterSlideChange', playSlideVideo);
  playSlideVideo();

  return slider;

}

// Video chapters

var chVidSection = 'section--songs-vid';



$(document).ready(function(){
  var locationList = document.getElementById(chVidSection).getElementsByClassName("slider__captions")[0],
  chapterVideo = document.getElementById("songs-video"),
  trackElement = chapterVideo.getElementsByTagName("track")[0];
  var sliderNav = $('<div class="slider__nav"></div>');
  var sliderNavLeft = $('<div class="slider__nav__arrow slider__nav__arrow--left"></div>');
  var sliderNavRight = $('<div class="slider__nav__arrow slider__nav__arrow--right"></div>');
  var sliderBullet = '<a class="slider__nav__bullet"></a>';


  chapterVideo.addEventListener("loadedmetadata", function run_tests() {
        if (trackElement.readyState == 1) { setTimeout(run_tests, 0); } else { displayChapters(); }
  });

  function displayChapters(){
    if ((trackElement.readyState == 2) && (textTrack = trackElement.track) && (window.matchMedia("(min-width: 500px)").matches)){
          if(textTrack.kind === "chapters"){
              var textTrack = trackElement.track;
              textTrack.mode = 'hidden';
              // for (var i = 0; i < textTrack.cues.length; ++i) {
              //     var cue = textTrack.cues[i];
              //     var chapterName = cue.text,
              //     start = cue.startTime;
              //
              //     // create captions
              //     var newLocale = document.createElement("div");
              //     newLocale.className = 'caption';
              //     var newLocalePara = document.createElement("p");
              //     var localeDescription = document.createTextNode(cue.text);
              //     newLocalePara.appendChild(localeDescription);
              //     newLocale.appendChild(newLocalePara);
              //     locationList.appendChild(newLocale);
              //
              //     // insert navigation elements
              //
              //     var newBullet = $(sliderBullet);
              //     newBullet.attr('id', start);
              //     newBullet.attr('tabindex', '0');
              //     sliderNav.append(newBullet);
              //
              //     newBullet.on("click",
              //     function() {
              //     	chapterVideo.currentTime = this.id;
              //     }, false);
              //
              // }

              // set up newly created nav
              //
              //   var sliderBullets = sliderNav.children('.slider__nav__bullet');
              //
              // sliderNav.prepend(sliderNavLeft);
              // sliderNav.append(sliderNavRight);
              //
              // // init style
              // sliderNav.addClass('start');
              // sliderBullets.first().addClass('current');
              //
              // var currentChapter = 0;
              // var totalChapters = textTrack.cues.length;
              //
              // sliderNavLeft.click(function() {
              //   if(currentChapter > 0){
              //     currentChapter--;
              //     var targetTime = $('.slider__nav__bullet')[currentChapter].id;
              //     chapterVideo.currentTime = targetTime;
              //   }else{
              //     console.log('At chapter one already');
              //     return;
              //   }
              //
              // });
              // sliderNavRight.click(function() {
              //   if(currentChapter < totalChapters){
              //     currentChapter++;
              //     var targetTime = $('.slider__nav__bullet')[currentChapter].id;
              //     chapterVideo.currentTime = targetTime;
              //   }else{
              //     console.log('At last chapter');
              //     return;
              //   }
              // });
              //
              // sliderNav.insertBefore(locationList);
              //
              // // init styles
              // $(locationList).children().first().addClass('current');


              textTrack.addEventListener("cuechange", function(e) {
                console.log(e);
                var thisOne = e.srcElement;
                    var currentLocation = textTrack.activeCues[0].startTime;
                    if (chapter = document.getElementById(currentLocation)) {
                    	var locations = [].slice.call(document.querySelectorAll("#chapters li a"));
                    	for (var i = 0; i < locations.length; ++i) { locations[i].classList.remove("current"); }
                        chapter.classList.add("current");
                      // locationlist.style.top = "-"+chapter.parentNode.offsetTop+"px";
                      // alternative approach, as scrollIntoView will cause entire page to jump if video is not at top of page
                      chapter.scrollIntoView();
                    }
                }, false);


          }
      }
  }
});





// scrolling animation

var lastScroll = 0;

var scrollDirection = function(section) {
  if (section.scrollTop > lastScroll) {
    lastScroll = section.scrollTop;
    return 'down';
  } else {
    lastScroll = section.scrollTop;
    return 'up';
  }
};

var cgu_mod_TL = new TimelineMax({paused: true});



$(window).on('load', function() {

  // stops FOUC

  $('body').removeClass('body-loading');

  // JS version of media query

  var deviceOrient = window.orientation;
  var deviceWidth = window.innerWidth;
  var deviceType = 'desktop';

  if(deviceOrient === 0 && deviceWidth <= 414){
    deviceType = 'mobile';
  }

  // alert(deviceType);

  // if(deviceOrient === )

  cgu_mod_TL
    .from('[src*="mod-block-1"]', 1, {
      x: '-50%',
      y: '-100%'
    }, 'start+=0.3')
    .from('[src*="mod-block-2"]', 1, {
      x: '20%',
      y: '-20%'
    }, 'start')
    .from('[src*="mod-block-3"]', 1, {
      x: '50%',
      y: '-150%'
    }, 'start+=0.3')
    .from('[src*="mod-block-4"]', 1, {
      x: '50%',
      y: '70%'
    }, 'start+=0.6')
  ;

  // set up CGU scrolling anim



  if($('body').hasClass('e-newsletters')){

    $(window).on('scroll', function(){
      // modular blocks animation
      var cgu_mod_progress = progress('#email-main', 200);
      cgu_mod_TL.progress(cgu_mod_progress);

      // mobile mail animation
      var cgu_mail_progress = progress('#cgu-mobile-edm', 400);
      console.log(cgu_mail_progress);
      $('#cgu-mobile-edm').css('transform', 'translateY(-' + 32 * cgu_mail_progress + '%)');

    });

  }

  // if($('body').hasClass('index')){

    function initClass(ev){
      if(window.pageYOffset>100){
        $('body').removeClass('init');
      }
      if(window.pageYOffset<100){
        $('body').addClass('init');
      }
    }

    initClass();
    window.onscroll=initClass
    // }

});


function progress(element, offsetStart){ // element is the selector string

  var scrollElement= $(element);
  var scrollTopStart = scrollElement.offset().top - offsetStart;
  var scrollTopEnd = scrollElement.height() / 2 + scrollTopStart;

  var currentPosition = window.pageYOffset;
  console.log('IE POSITION', currentPosition);
  var progress;
  if (currentPosition < scrollTopStart) {
      progress = 0;
  } else if (currentPosition > scrollTopEnd) {
      progress = 1;
  } else {
      progress = ((currentPosition - scrollTopStart) / (scrollTopEnd - scrollTopStart));
  }
  return progress;

}

$(document).ready(function() {

  var sliderHangtime = makeSlider("slider-hangtime");
  var sliderCampaigns = makeSlider("slider-campaigns");
  var sliderCampaigns = makeSlider("slider-vertical-vid");
  var sliderWattyl1 = makeSlider("slider-wattyl1");
  var sliderWattyl2 = makeSlider("slider-wattyl2");
  var sliderPoetry = makeSlider("slider-poetry");
  var sliderStoreLocator = makeSlider("slider-store-locator");

  $('#wattyl-video').on('click', function(){
    $(this).removeClass('placeholder').children('video').get(0).play();
  });

  var redHighlights = $('[src*="email-red"]');
  var redTL = new TimelineMax({repeat: -1});

  redTL
  .staggerFrom(redHighlights, 0.4, {
    opacity:0
  }, 1.5, 'start')
  .staggerTo(redHighlights, 0.4, {
    opacity:0,
    delay: 1.5
  }, 1.5, 'start');

  $('.app__menu__button, .app__menu__close-icon').click(function(){
    // $('.app__menu').toggleClass('show');
    $('.app__body, .app__header').toggleClass('menu');
  });


});
