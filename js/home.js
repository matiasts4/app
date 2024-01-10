(function($){
	$(document).ready(function(){
		$('#portales .ver').on('click', function(){
			$('a', this).text('Ver todos los portales').css('background-image', 'none');
			$(this).prev().find('li.elemento-invisible').removeClass('elemento-invisible');
			$(this).unbind('click');
			return false;
		});
		
		$('#noticias ul li').on('mouseover', function(){
			$(this).addClass('hover');
		}).on('mouseout', function(){
			$(this).removeClass('hover');
		});
		
		$('#noticias ul li p a').on('focus', function(){
			$(this).parents('li').addClass('hover');
		}).on('blur', function(){
			$(this).parents('li').removeClass('hover');
		});
		
		$('#carrusel .owl-carousel').owlCarousel({
		  navigation: false,
		  slideSpeed: 300,
		  paginationSpeed: 400,
		  singleItem: true
		});
		
		$('.social-tabs h3').on('click', function(){
			$(this).addClass('activo').siblings('h3').removeClass('activo');
			$(this).next('.contenido').removeClass('elemento-invisible').siblings('.contenido').addClass('elemento-invisible');
		});

		$('#main-menu').sticky({
			zIndex:32000
		});
		
		if($.fn.colorbox){
			$('a.cboxElementIframe').colorbox({
				iframe:true,
				previous: 'anterior',
				next: 'siguiente',
				opacity:0.75,
				width: '80%',
				height: '80%',
				className: 'galeria-colorbox'
			});
		}
		
	});
	
	$(window).load(function(){
		if($.fn.masonry){
			$('#seccion .contenedor > ul').masonry({
				  itemSelector: '#seccion .contenedor > ul > li',
				  columnWidth: '#seccion .contenedor > ul > li',
				  percentPosition: false
			});
		}
	});
})(jQuery);