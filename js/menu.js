(function($){
	$(document).ready(function(){
		var timer = null;
		//Ratón
		$('#main-menu #sidr > ul > li').on('mouseenter', function(e){
			clearTimeout(timer);
			$(this).addClass('activo').find('>a.menu-focus').attr('aria-expanded', 'true').end().siblings().removeClass('activo').find('>a.menu-focus').attr('aria-expanded', 'false');
		}).on('mouseleave', function(e){
			var that = $(this);
			timer = setTimeout(function(){
				//console.log(that);
				that.removeClass('activo').find('>a.menu-focus').attr('aria-expanded', 'false');
			}, 500);
			//$(this).removeClass('activo').find('>a.menu-focus').attr('aria-expanded', 'false');
		});
		//Teclado
		$('#main-menu #sidr > ul > li > a.menu-focus').each(function(idx, elm){
			if($(this).next('.submenu').length > 0){
				$(this).attr({
					'aria-expanded': 'false',
					'aria-haspopup': 'true'
				}).on('click', function(e){
					if($(this).attr('aria-expanded') == 'false'){
						$(this).attr('aria-expanded', 'true')
							.parents('li').addClass('activo').removeClass('activo-focus')
							.siblings().removeClass('activo').find('a').attr('aria-expanded', 'false');
					}
					return false;
				});
			}
			$(this).on('focus', function(e){
				$(this).parents('li').addClass('activo-focus');
			}).on('blur', function(e){
				$(this).parents('li').removeClass('activo-focus');
			});
		});
		//Escape
		$('#main-menu #sidr > ul > li a').on('keyup', function(e){
			if(e.keyCode == 27){
				if($(this).parents('.activo').length > 0){
					$(this).parents('.activo').removeClass('activo').find('>a').attr('aria-expanded', 'false').focus();
				}
			}
		});
		//Cerrar al salir
		$('#main-menu #sidr ul li .submenu').each(function(){
			$(this).find('ul').last().find('a').last().on('blur', function(e){
				$('#main-menu #sidr > ul > li').removeClass('activo').find('>a.menu-focus').attr('aria-expanded', 'false')
			});
		});

		//Hamburguesa
		$('#main-menu .hamburger').on('click', function(e){
			$(this).toggleClass('is-active');
			if($(this).hasClass('is-active')){
				$(this).attr('aria-expanded', 'true');
			}
			else{
				$(this).attr('aria-expanded', 'false');
			}
		});
		//Responsive
		if($('#sidr').length > 0){
			$('#main-menu .hamburger').sidr({
				name: 'sidr-menu',
				source: '#sidr',
				renaming: false,
				onOpen: function(){
					$('#sidr-menu #menu li a[aria-haspopup="true"]').off('click').on('click', function(e){
						if($(this).attr('aria-expanded') == 'false'){
							$(this).attr('aria-expanded', 'true').parents('li').addClass('activo');
						}
						else{
							$(this).attr('aria-expanded', 'false').parents('li').removeClass('activo');
						}
						return false;
					});
				}
			});
		}
		//Anchos
		$(':not(body.home) #menu > li').each(function(idx, elm){
			var className = 'items-' + ($(this).siblings().length + 1);
			$(this).addClass(className).parents('#main-menu').addClass(className);
		});
	});
})(jQuery);