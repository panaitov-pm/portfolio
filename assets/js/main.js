;(function($) {

	
	var scrollWidth = scrollbarWidth();
	var $navMenu = $('.navigation');

	$(function() {

		//Init Tilt
		if($.fn.VanillaTilt) {

			VanillaTilt.init($('.portfolio-slide'), {
				max: 35,
				speed: 400
			});
		}

		//Init WOW
		new WOW().init({   
            mobile: false 
		});

		//Init smoothscroll
		SmoothScroll({
			touchpadSupport: true
		});

		//Sliders
		if($.fn.slick) {

			var portfolioSlider = $('.portfolio-slider');
			var newsSlider = $('.news-slider');

			portfolioSlider.slick({
				dots: false,
	  			slidesToShow: 4,
	  			slidesToScroll: 3,
	  			slide: '.portfolio-slider__item',
	  			speed: 1200,
				infinite: false,
				/*autoplay: true,
				autoplaySpeed: 2500,*/
				prevArrow: $('.portfolio-slide__btn--prev'),
				nextArrow: $('.portfolio-slide__btn--next'),
				responsive: [
					{
						breakpoint: 1024,
					    settings: {
					        slidesToShow: 3,
					        slidesToScroll: 2
					    }
					},
					{
						breakpoint: 850,
					    settings: {
					        slidesToShow: 2,
					        slidesToScroll: 1
					    }
					},
					{
						breakpoint: 640,
					    settings: {
					        slidesToShow: 1,
					        slidesToScroll: 1
					    }
					}
				]
			}); // end slider

			// Show current and total count of slides
			var $status = $('.news-slide__count');

			newsSlider.on('init reInit afterChange', function(event, slick, currentSlide, nextSlide){
			    //currentSlide is undefined on init -- set it to 0 in this case (currentSlide is 0 based)
			    var lengthSlideActive = $('.news-slide.slick-active').length;
			    var i = (currentSlide ? currentSlide : 0) + 1;
			    var visibleSlideActive = (i + (lengthSlideActive -  1) );
			    var windowWidth = $(window).width() + scrollWidth;

				
				if(windowWidth > (641) ) {
					$status.text(i + ' - ' + visibleSlideActive + ' of ' + slick.slideCount + ' posts');

				} else {
					$status.text(i + ' of ' + slick.slideCount + ' posts');
				}
			}); // end afterChange

			newsSlider.slick({
				dots: false,
	  			slidesToShow: 4,
	  			slide: '.news-slide',
	  			speed: 1200,
				infinite: false,
				/*autoplay: true,
				autoplaySpeed: 2500,*/
				prevArrow: $('.news-slide__btn--prev'),
				nextArrow: $('.news-slide__btn--next'),
				vertical: true,
				verticalSwiping: true,
				responsive: [
					{
						breakpoint: 1125,
					    settings: {
					       slidesToShow: 3,
					    }
					},
					{
						breakpoint: 686,
					    settings: {
					        slidesToShow: 2
					    }
					},
					{
						breakpoint: 641,
					    settings: {
					    	vertical: false,
							verticalSwiping: false,
					        slidesToShow: 1
					    }
					}
				]
			}); // end slider
		}

		$(document).on('click', '.menu-toggle', function(event) {
			event.preventDefault();

			$navMenu.toggleClass('js-nav-open');
		}); // end click

		$(document).on('click', '.navigation__link', function(event) {
			event.preventDefault();
			
			var link = $(this).attr('href');
			$navMenu.toggleClass('js-nav-open');

			setTimeout(function() {
				location.href = link;
			}, 200);
		}); //end click

		// Modal message
		var $modal = $('.modal');

		// Close modal
		$(document).on('click', '.modal, .modal__close', function(event) {
			event.preventDefault();
			
			$modal.fadeOut();
		}); // end click

		// Send form
		$('.contact-form').submit(function() {
			$modal.fadeIn();

			$.ajax({
				type: 'POST',
				url: 'mail.php',
				data: $(this).serialize()
			}).done(function() {
				$(this).find(".contact-form__field").val('');

				setTimeout(function(){
					$('.contact-form').trigger('reset');
					$modal.fadeOut();
				}, 2000);
			});
			return false;
		});


	}); // end ready

	$(window).resize(function(event) {

		$navMenu.removeClass('js-nav-open');
	}); // end resize

	$(window).scroll(function(event) {

		var windowWidth = $(window).width();

		//Hide mobile menu
		if(windowWidth <= (768 + scrollWidth) ) {
			$navMenu.removeClass('js-nav-open');
		}
	}); // end scroll

	$(window).load(function() {
		
		if( $.fn.swipebox ) {

			$('.portfolio-swipebox').swipebox({
				hideCloseButtonOnMobile : true,
				afterOpen: function(){
					$('body').find('#swipebox-arrows').append("<a class='js-view-link' href=" + "#" + ">View more</a>");
				},
			});
			
			$(document).on('click', '.js-view-link', function(event) {
				event.preventDefault();
				
				var otherWindow = window.open();
				var imgSrc = $('#swipebox-slider').find('.slide.current img').attr('src');
				var link = $('.portfolio-swipebox[href="' + imgSrc + '"]').attr('data-link');
				
				$(this).attr('href', link);
				otherWindow.opener = null;
				otherWindow.location = link;
			}); // end click
		}
	}); // end load

	function scrollbarWidth() {
  		var documentWidth = parseInt(document.documentElement.clientWidth);
  		var windowsWidth = parseInt(window.innerWidth);
  		var scrollbarWidth = windowsWidth - documentWidth;
  		return scrollbarWidth;
	}

})(jQuery);