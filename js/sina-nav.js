(function ($) {
	'use strict';
	$.fn.sinaNav = function () {
		return this.each( function() {
			var getNav		= $(this),
				top 		= getNav.data('top') || getNav.offset().top,
				mdTop 		= getNav.data('md-top') || getNav.offset().top,
				xlTop 		= getNav.data('xl-top') || getNav.offset().top,
				navigation 	= getNav.find('.sina-menu'),
				getWindow 	= $(window).outerWidth(),
				// anim 		= getNav.data('animate-prefix') || '',
				getIn 		= navigation.data('in'),
				getOut 		= navigation.data('out');

				$(window).on('resize', function(){
					getWindow 	= $(window).outerWidth();
				});


			// Mobile Sidebar
			// ---------------------------------
			if( getNav.hasClass('mobile-sidebar') ) {
				var $collapse = getNav.find('.navbar-collapse');

				// Add Class to body
				if ( $('body').children('.wrapper').length < 1 ) {
					$('body').wrapInner('<div class="wrapper"></div>');
				}


					$collapse.on('shown.bs.collapse', function() {
						$('body').addClass('mobile-left');
					});
					$collapse.on('hide.bs.collapse', function() {
						$('body').removeClass('mobile-left');
					});
					$(window).on('resize', function(){
						$('body').removeClass('mobile-left');
						getNav.find('.navbar-collapse').removeClass('show');
						getNav.find('.navbar-toggle .fa', this).addClass('fa-bars');
					});

			}


			// // Toggle Button
			// getNav.find('.navbar-toggle').on('click', function(){
			// 	$('.fa', this).toggleClass('fa-bars');
			// });




			// Eevent
			// -------------------------------------
			getNav.find('.sina-menu, .extension-nav').each(function(){
				var menu = this;

				// $('.dropdown-toggle', menu).on('click', function () {
				// 	e.stopPropagation();
				// 	return false;
				// });

				$('.dropdown-menu', menu);
				$('.dropdown', menu).on('mouseenter', function(){
					var dropdown = this;

					$('.dropdown-menu', dropdown).eq(0).removeClass(getOut).stop().fadeIn().addClass(getIn);
					$(dropdown).addClass('on');
				});

				$('.dropdown', menu).on('mouseleave', function(){
					var dropdown = this;

					$('.dropdown-menu', dropdown).eq(0).removeClass(getIn).stop().fadeOut().addClass(getOut);
					$(dropdown).removeClass('on');
				});
				$('.mega-menu-col', menu).children('.sub-menu');
			});

			if( getWindow < 992 ) {
				// Megamenu
				getNav.find('.menu-item-has-mega-menu').each(function(){
					var megamenu 	= this,
						$columnMenus = [];

					$('.mega-menu-col', megamenu).children('.sub-menu');
					$('.mega-menu-col', megamenu).each(function(){
						var megamenuColumn = this;

						$('.mega-menu-col-title', megamenuColumn).on('mouseenter', function(){
							var title = this;

							$(title).closest('.mega-menu-col').addClass('on');
							$(title).siblings('.sub-menu').stop().fadeIn().addClass(getIn);
						});

						if( !$(megamenuColumn).children().is('.mega-menu-col-title') ) {
							$columnMenus.push( $(megamenuColumn).children('.sub-menu') );
						}
					});

					$(megamenu).on('mouseenter', function(){
						var submenu;
						for (submenu in $columnMenus) {
							$columnMenus[ submenu ].stop().fadeIn().addClass(getIn);
						}
					});

					$(megamenu).on('mouseleave', function() {
						$('.dropdown-menu', megamenu).stop().fadeOut().removeClass(getIn);
						$('.mega-menu-col', megamenu).removeClass('on');
					});
				});
			}
		});
	}
	// Initialize
	$('.sina-nav').sinaNav();
}(jQuery));
