$(document).ready(initPage);
function initPage(){
	mobileMenu();
	slider('.portfolio__slider');
	slider('.market__slider');
	slider('.reviews__slider');
	whomSlider();
	acordionTabs();
	select2();
	selectFilter();
	formEffect();
	multiLevel();
	validateFields(".contact-form");
	validateFields(".modal-form");
	validateFields(".interested-form");
	header_fixed_class();
	dropServices();
	filterMobile();
	$(function() {
		jcf.replaceAll();
	});
}
function select2(){
	$('.form-select').select2({
		minimumResultsForSearch: Infinity,
		placeholder: "Оберіть послугу",

	});
}

function selectFilter(){
	const selectF = document.querySelectorAll('.jcf-filter')
	for (let i = 0; i < selectF.length; i++){
		selectF[i].onfocusin = function () {
			this.parentNode.classList.add('focus')
		}
		selectF[i].onfocusout = function () {
			this.parentNode.classList.remove('focus')
		}
		selectF[i].onchange = function () {
			this.parentNode.classList.remove('focus')
			this.parentNode.classList.add('selected')
		}
	}
}

function filterMobile() {
	const filter = document.querySelector('.filter__tablet-btn')
	const filterClose = document.querySelector('.btn-back')
	const filterBlock = document.querySelector('.filter__wrap')
	const body = document.querySelector('body')
	if(filter){
		filter.addEventListener('click', function () {
			filterBlock.classList.add('open')
			body.classList.add('overflow')
		})
		filterClose.addEventListener('click', function () {
			filterBlock.classList.remove('open')
			body.classList.remove('overflow')
		})
	}



}


function dropServices() {
	const btnClick = document.querySelectorAll('.services__open')
	for(let i = 0; i < btnClick.length; i++ ){
		console.log(btnClick[i])
		btnClick[i].addEventListener('click', function() {
			this.parentNode.classList.toggle('open')
			// parent.classList.toggle('.open')
		})
	}

}

function header_fixed_class(){
	var header = $('.header');
	var wrapper = $('.page');
	var heightEl  = 0;
	$(window).scrollTop() > heightEl ? header.addClass('modify') : header.removeClass('modify');
	$(window).scrollTop() > heightEl ? wrapper.addClass('header_fixed') : wrapper.removeClass('header_fixed');
	$(window).scroll(function(event){
		//event.stopImmediatePropagation();
		$(window).scrollTop() > heightEl ? header.addClass('modify') : header.removeClass('modify');
		$(window).scrollTop() > heightEl ? wrapper.addClass('header_fixed') : wrapper.removeClass('header_fixed');
	});
}


function formEffect(){
	$('.form__box .form__control').focusin(function(event) {
		$(this).parent().addClass('input--filled');
		//maskInputs();
	})
	$('.form__box .form__control').focusout(function(event) {
		if ($(this).val().length < 1) {
			$(this).parent().removeClass('input--filled');
			$('.form__box .form__label').addClass('focusout-label');
		}
	});
	$('.form__box .form__control').on('keyup', function() {
		if ($(this).val().length < 1) {
			$(this).parent().find('.form__input-clear').removeClass('active');
		} else {
			$(this).parent().find('.form__input-clear').addClass('active');
		}
	});

	$('.form__box .form__control label').click(function () {
		$(this).parent().addClass('input--filled');
	});

	$('.form__input-clear').click(function(event) {
		event.preventDefault();
		if ( $(this).parent().find('.form__input').value != ' ' ){
			$(this).parent().find('.form__input').val("");
			$(this).removeClass('active');
			$(this).parent().parent().removeClass('input--filled');
		}
	});
}


function slider(slider) {
	$(slider).slick({
		arrows: true,
		dots: false,
		infinite: false,
		slidesToShow: 2,
		slidesToScroll: 1,
		swipeToSlide: true,
		responsive: [
			{
				breakpoint: 1450,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 1,
					arrows: true,
					dots: false,
				}
			},
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1,
					arrows: false,
					dots: true,
				}
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					arrows: false,
					dots: true,
				}
			},
		]
	});
}


function whomSlider(slider) {
	$('.whom-slider').slick({
		arrows: true,
		dots: false,
		infinite: false,
		fade: true,
		slidesToShow: 1,
		swipeToSlide: true,
	})
}

function acordionTabs() {
	const cat = document.querySelectorAll('.has-drop')
	const list = document.querySelector('.services__nav-list')
	console.log(cat)
	for (let i = 0; i < cat.length; i++) {
		list.addEventListener('mouseenter', (e) => {
			cat[i].classList.remove('active');
			list.addEventListener('mouseleave', (e) => {
				cat[0].classList.add('active')
			})
		})

	}
	//Acoordion
	const clearAllAccordions = function(elements) {
		elements.forEach(function(element) {
			element.classList.remove('closed');
			element.classList.remove('opened');

			const content = element.querySelector('.js-accordion-content');

			content.style.height = null;
		});
	};
	const closeAllAccordions = function(elements) {
		elements.forEach(function(element) {
			element.classList.add('closed');
			element.classList.remove('opened');
		});
	};

	const toggleAccordion = function(element) {
		element.classList.toggle('closed');
		element.classList.toggle('opened');
	};

	const initAccordion = function(element, allElements) {
		const head = element.querySelector('.js-accordion-head');
		const content = element.querySelector('.js-accordion-content');

		const onAccordironHeadClick = function(evt) {
			evt.preventDefault();
			evt.stopImmediatePropagation();

			const accordionElement = evt.currentTarget.closest('.js-accordion');

			if (accordionElement.classList.contains('closed')) {
				closeAllAccordions(allElements);
			}
			toggleAccordion(accordionElement);
		};

		head.addEventListener('click', onAccordironHeadClick);
		setTimeout(function() { content.style.height = content.firstElementChild.offsetHeight + 'px'; }, 0);
		element.classList.remove('opened');
		element.classList.add('closed');
	};

	function init() {
		const accordionElements = document.querySelectorAll('.js-accordion');
		if (window.innerWidth <= 768) {
			accordionElements.forEach(function (element) {
				initAccordion(element, accordionElements);
			});
		} else {
			clearAllAccordions(accordionElements);
		}
	}

	document.addEventListener('DOMContentLoaded', function(){
		init();
	});

	let autoResize;
	window.addEventListener('resize', function(event) {
		clearTimeout(autoResize);
		autoResize = setTimeout(init, 400);
	});

}


function mobileMenu(){
	$('<span class="open-menu"><span></span><span></span><span></span><span></span></span>').appendTo('.header .header__wrap');
	$('<span class="fader"/>').appendTo('.header .header__wrap');
	$('html').on('click', '.open-menu', function() {
		$('body').toggleClass('menu-opened');
		return false;
	});
	$('.fader').on('click touchmove', function(event) {
		$('body').removeClass('menu-opened');
	});
}

function multiLevel() {
	(function(window) {

		'use strict';

		var support = { animations : Modernizr.cssanimations },
			animEndEventNames = { 'WebkitAnimation' : 'webkitAnimationEnd', 'OAnimation' : 'oAnimationEnd', 'msAnimation' : 'MSAnimationEnd', 'animation' : 'animationend' },
			animEndEventName = animEndEventNames[ Modernizr.prefixed( 'animation' ) ],
			onEndAnimation = function( el, callback ) {
				var onEndCallbackFn = function( ev ) {
					if( support.animations ) {
						if( ev.target != this ) return;
						this.removeEventListener( animEndEventName, onEndCallbackFn );
					}
					if( callback && typeof callback === 'function' ) { callback.call(); }
				};
				if( support.animations ) {
					el.addEventListener( animEndEventName, onEndCallbackFn );
				}
				else {
					onEndCallbackFn();
				}
			};

		function extend( a, b ) {
			for( var key in b ) {
				if( b.hasOwnProperty( key ) ) {
					a[key] = b[key];
				}
			}
			return a;
		}

		function MLMenu(el, options) {
			this.el = el;
			this.options = extend( {}, this.options );
			extend( this.options, options );

			// the menus (<ul>´s)
			this.menus = [].slice.call(this.el.querySelectorAll('.menu__level'));
			// index of current menu
			this.current = 0;

			this._init();
		}

		MLMenu.prototype.options = {
			// show breadcrumbs
			backCtrl : true,
			// initial breadcrumb text
			initialBreadcrumb : null,
			// show back button
			// delay between each menu item sliding animation
			itemsDelayInterval : 60,
			// direction
			direction : 'r2l',
			// callback: item that doesn´t have a submenu gets clicked
			// onItemClick([event], [inner HTML of the clicked item])
			onItemClick : function(ev, itemName) { return false; }
		};

		MLMenu.prototype._init = function() {
			// iterate the existing menus and create an array of menus, more specifically an array of objects where each one holds the info of each menu element and its menu items
			this.menusArr = [];
			var self = this;
			this.menus.forEach(function(menuEl, pos) {
				var menu = {menuEl : menuEl, menuItems : [].slice.call(menuEl.querySelectorAll('.menu__item'))};
				self.menusArr.push(menu);

				// set current menu class
				if( pos === self.current ) {
					classie.add(menuEl, 'menu__level--current');
				}
			});



			// create breadcrumbs
			if( self.options.backCtrl ) {
				this.backCtrl = document.createElement('nav');
				this.backCtrl.className = 'menu__breadcrumbs';
				this.el.insertBefore(this.backCtrl, this.el.firstChild);
				// add initial breadcrumb
				this._addBreadcrumb(0);
			}

			// event binding
			this._initEvents();
		};

		MLMenu.prototype._initEvents = function() {
			var self = this;

			for(var i = 0, len = this.menusArr.length; i < len; ++i) {
				this.menusArr[i].menuItems.forEach(function(item, pos) {
					item.querySelector('a').addEventListener('click', function(ev) {
						var submenu = ev.target.getAttribute('data-submenu'),
							itemName = ev.target.innerHTML,
							subMenuEl = self.el.querySelector('ul[data-menu="' + submenu + '"]');

						// check if there's a sub menu for this item
						if( submenu && subMenuEl ) {
							ev.preventDefault();
							// open it
							self._openSubMenu(subMenuEl, pos, itemName);
						}
						else {
							// add class current
							var currentlink = self.el.querySelector('.menu__link--current');
							if( currentlink ) {

								classie.remove(self.el.querySelector('.menu__link--current'), 'menu__link--current');
							}
							classie.add(ev.target, 'menu__link--current');

							// callback
							self.options.onItemClick(ev, itemName);
						}
					});
				});
			}

			// back navigation
			if( this.options.backCtrl ) {
				this.backCtrl.addEventListener('click', function() {
					self._back();

				});
			}
		};

		MLMenu.prototype._openSubMenu = function(subMenuEl, clickPosition, subMenuName) {
			if( this.isAnimating ) {
				return false;
			}
			this.isAnimating = true;



			// save "parent" menu index for back navigation
			this.menusArr[this.menus.indexOf(subMenuEl)].backIdx = this.current;
			// save "parent" menu´s name
			this.menusArr[this.menus.indexOf(subMenuEl)].name = subMenuName;
			// current menu slides out
			this._menuOut(clickPosition);
			// next menu (submenu) slides in
			this._menuIn(subMenuEl, clickPosition);
		};

		MLMenu.prototype._back = function() {
			if( this.isAnimating ) {
				return false;
			}
			this.isAnimating = true;

			// current menu slides out
			this._menuOut();
			// next menu (previous menu) slides in
			var backMenu = this.menusArr[this.menusArr[this.current].backIdx].menuEl;
			this._menuIn(backMenu);

			// remove last breadcrumb
			if( this.options.backCtrl ) {
				this.backCtrl.removeChild(this.backCtrl.lastElementChild);
			}
		};

		MLMenu.prototype._menuOut = function(clickPosition) {
			// the current menu
			var self = this,
				currentMenu = this.menusArr[this.current].menuEl,
				isBackNavigation = typeof clickPosition == 'undefined' ? true : false;

			// slide out current menu items - first, set the delays for the items
			this.menusArr[this.current].menuItems.forEach(function(item, pos) {
				item.style.WebkitAnimationDelay = item.style.animationDelay = isBackNavigation ? parseInt(pos * self.options.itemsDelayInterval) + 'ms' : parseInt(Math.abs(clickPosition - pos) * self.options.itemsDelayInterval) + 'ms';
			});
			// animation class
			if( this.options.direction === 'r2l' ) {
				classie.add(currentMenu, !isBackNavigation ? 'animate-outToLeft' : 'animate-outToRight');
			}
			else {
				classie.add(currentMenu, isBackNavigation ? 'animate-outToLeft' : 'animate-outToRight');
			}
		};

		MLMenu.prototype._menuIn = function(nextMenuEl, clickPosition) {
			var self = this,
				// the current menu
				currentMenu = this.menusArr[this.current].menuEl,
				isBackNavigation = typeof clickPosition == 'undefined' ? true : false,
				// index of the nextMenuEl
				nextMenuIdx = this.menus.indexOf(nextMenuEl),

				nextMenuItems = this.menusArr[nextMenuIdx].menuItems,
				nextMenuItemsTotal = nextMenuItems.length;

			// slide in next menu items - first, set the delays for the items
			nextMenuItems.forEach(function(item, pos) {
				item.style.WebkitAnimationDelay = item.style.animationDelay = isBackNavigation ? parseInt(pos * self.options.itemsDelayInterval) + 'ms' : parseInt(Math.abs(clickPosition - pos) * self.options.itemsDelayInterval) + 'ms';

				// we need to reset the classes once the last item animates in
				// the "last item" is the farthest from the clicked item
				// let's calculate the index of the farthest item
				var farthestIdx = clickPosition <= nextMenuItemsTotal/2 || isBackNavigation ? nextMenuItemsTotal - 1 : 0;

				if( pos === farthestIdx ) {
					onEndAnimation(item, function() {
						// reset classes
						if( self.options.direction === 'r2l' ) {
							classie.remove(currentMenu, !isBackNavigation ? 'animate-outToLeft' : 'animate-outToRight');
							classie.remove(nextMenuEl, !isBackNavigation ? 'animate-inFromRight' : 'animate-inFromLeft');
						}
						else {
							classie.remove(currentMenu, isBackNavigation ? 'animate-outToLeft' : 'animate-outToRight');
							classie.remove(nextMenuEl, isBackNavigation ? 'animate-inFromRight' : 'animate-inFromLeft');
						}
						classie.remove(currentMenu, 'menu__level--current');
						classie.add(nextMenuEl, 'menu__level--current');

						//reset current
						self.current = nextMenuIdx;
						var nav = document.querySelector('.main-nav')
						// control back button and breadcrumbs navigation elements
						if( !isBackNavigation ) {
							// show back button
							if( self.options.backCtrl ) {
								classie.remove(self.backCtrl, 'menu__back--hidden');

								nav.classList.add('multi')
							}

							// add breadcrumb
							self._addBreadcrumb(nextMenuIdx);
						}
						else if( self.current === 0 && self.options.backCtrl ) {
							// hide back button
							classie.add(self.backCtrl, 'menu__back--hidden');
							nav.classList.remove('multi')
						}

						// we can navigate again..
						self.isAnimating = false;
					});
				}
			});

			// animation class
			if( this.options.direction === 'r2l' ) {
				classie.add(nextMenuEl, !isBackNavigation ? 'animate-inFromRight' : 'animate-inFromLeft');
			}
			else {
				classie.add(nextMenuEl, isBackNavigation ? 'animate-inFromRight' : 'animate-inFromLeft');
			}
		};
		MLMenu.prototype._addBreadcrumb = function(idx) {

			if(!this.options.backCtrl) {
				return false;
			}

			if(idx === 0){
				this.backCtrl.classList.add('menu__back--hidden')

			}
			var bc = document.createElement('span');
			bc.className = 'nav__link';
			bc.innerHTML = idx ? this.menusArr[idx].name : this.options.initialBreadcrumb;
			this.backCtrl.appendChild(bc);

			var self = this;
			bc.addEventListener('click', function(ev) {
				ev.preventDefault();

				// do nothing if this breadcrumb is the last one in the list of breadcrumbs
				if( !bc.nextSibling || self.isAnimating ) {
					return false;
				}
				self.isAnimating = true;

				// current menu slides out
				self._menuOut();
				// next menu slides in
				var nextMenu = self.menusArr[idx].menuEl;
				self._menuIn(nextMenu);

				// remove breadcrumbs that are ahead
				var siblingNode;
				while (siblingNode = bc.nextSibling) {
					self.backCtrl.removeChild(siblingNode);
				}
			});
		};

		window.MLMenu = MLMenu;

	})(window);


	(function() {
		var menuEl = document.getElementById('ml-menu'),
			mlmenu = new MLMenu(menuEl, {
				// backCtrl : true, // show breadcrumbs
				// initialBreadcrumb : 'all', // initial breadcrumb text
				backCtrl : true, // show back button
				// itemsDelayInterval : 60, // delay between each menu item sliding animation
				// onItemClick: loadDummyData // callback: item that doesn´t have a submenu gets clicked - onItemClick([event], [inner HTML of the clicked item])
			});


	})();

}

function validateFields(el) {
	if (document.querySelector('.contact-form')) {
		$(el).validate({
			highlight: function(element) {
				$(element).parent().addClass('form__box_error').removeClass('form__box_valid');
				$(el).addClass('novalidate')
			},
			unhighlight: function(element) {
				$(element).parent().removeClass('form__box_error').addClass('form__box_valid');
				$(el).removeClass('novalidate')
			},
			rules: {
				request: {
					required: false,
					minlength: false
				},
				text: {
					required: false,
					minlength: false
				},
				company: {
					required: false,
					minlength: false
				},
				name: {
					required: true,
					minlength: 2
				},
				email: {
					required: true,
					email: true,
					myEmail: true
				}
			},
			messages: {
				request: {
					required: false,
					minlength: false
				},
				name: {
					required: false,
					minlength: false
				},
				email: {
					required: false,
					email: false,
					myEmail: false
				}
			}
		});
		$.validator.addMethod("myEmail", function(value, element) {
			return value.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
		});
	}
}