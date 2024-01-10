(function($){
	var RUTA_JCYL = '/futuretense_cs/JCYL_17/';
	//var RUTA_JCYL = '';
	$(document).ready(function(){
		$('.navegacion-iconos li').each(function(){
			$(this).addClass('items-' + ($(this).siblings().length + 1));
		});
		
		$('.noticias ul li a, .destacados ul li a').on('focus', function(e){
			$(this).parents('li').addClass('over');
		}).on('blur', function(e){
			$(this).parents('li').removeClass('over');
		});
		
		$('.noticias-destacadas li').each(function(){
			var className = 'impar';
			if(($(this).siblings().length + 1) % 2 == 0){
				className = 'par';
			}
			$(this).addClass('items-' + className);
		});
		
		$('.texto-imagen-contenedor .texto-imagen').each(function(){
			$(this).addClass('items-' + ($(this).siblings('.texto-imagen').length + 1));
		});
		
		$('.carrusel-enlaces ul li').each(function(){
			var className = 'impar';
			if(($(this).siblings().length + 1) % 2 == 0){
				className = 'par';
			}
			$(this).addClass('items-' + className);
		});
		
		$('.portales .ver').on('click', function(){
			$('a', this).text('Ver todos los portales').css('background-image', 'none');
			$(this).prev().find('li.elemento-invisible').removeClass('elemento-invisible');
			$(this).unbind('click');
			return false;
		});
		
		$('.noticias-home ul li').on('mouseover', function(){
			$(this).addClass('hover');
		}).on('mouseout', function(){
			$(this).removeClass('hover');
		});
		
		$('.noticias-home ul li p a').on('focus', function(){
			$(this).parents('li').addClass('hover');
		}).on('blur', function(){
			$(this).parents('li').removeClass('hover');
		});
		
		if($.fn.sticky){
			$('#main-menu').sticky({
				zIndex:32000
			});
		}

		$('.selector-idiomas button').on('click', function(){
			if($(this).attr('aria-expanded') == 'false'){
				$(this).attr('aria-expanded', 'true').next('.idiomas').show();
			}
			else{
				$(this).attr('aria-expanded', 'false').next('.idiomas').hide();
			}
		});
		
		var isClick = false;
		$('.preguntas-respuestas dt').on('mousedown', function(e){
			isClick = true;
		}).on('focus', function(e){
			if(!isClick){
				$(this).addClass('menos').siblings('dt').removeClass('menos');
				$(this).next('dd').removeClass('elemento-invisible').siblings('dd').addClass('elemento-invisible');
        $('html, body').animate({
            scrollTop: $(this).offset().top - 100
        }, 1000);
			}
		}).on('click', function(e){
			isClick = false;
			if($(this).next('dd').hasClass('elemento-invisible')){
				$(this).addClass('menos').siblings('dt').removeClass('menos');
				$(this).next('dd').removeClass('elemento-invisible').siblings('dd').addClass('elemento-invisible');
        $('html, body').animate({
            scrollTop: $(this).offset().top - 100
        }, 1000);
			}
			else{
				$(this).removeClass('menos').next('dd').addClass('elemento-invisible');
			}
		}).attr('tabIndex', '0').prepend('<span>').next('dd').addClass('elemento-invisible');
		
		$('.clasificador:not(.desplegado) > ul > li > ul > li:not(.final) > a').on('mousedown', function(e){
			isClick = true;
		}).on('focus', function(e){
			if(!isClick){
				$(this).addClass('menos').next('ul').removeClass('elemento-invisible');
			}
		}).on('click', function(e){
			isClick = false;
			if($(this).next('ul').hasClass('elemento-invisible')){
				$(this).addClass('menos').next('ul').removeClass('elemento-invisible');
			}
			else{
				$(this).removeClass('menos').next('ul').addClass('elemento-invisible');
			}
			return false;
		}).prepend('<span>').next('ul').addClass('elemento-invisible');
		
		$('.clasificador:not(.desplegado) > ul > li > ul > li:not(.final) > strong').prepend('<span>');
		$('.clasificador:not(.desplegado) > ul > li > ul > li.final > a > span').remove();
		
		$('.clasificador:not(.desplegado) > ul > li > ul > li ul li a').each(function(i, elm){
			if($(elm).next().is('ul')){
				$(elm).on('mousedown', function(e){
					isClick = true;
				}).on('focus', function(e){
					if(!isClick){
						$(this).addClass('menos').next('ul').removeClass('elemento-invisible');
					}
				}).on('click', function(e){
				if($(this).next('ul').hasClass('elemento-invisible')){
					$(this).addClass('menos').next('ul').removeClass('elemento-invisible');
				}
				else{
					$(this).removeClass('menos').next('ul').addClass('elemento-invisible');
				}
					return false;
				}).prepend('<span>').addClass('con-hijos').next('ul').addClass('elemento-invisible');
			}
		});
		
		/*if($('#contenidos .clasificador').length){*/
			$('body').prepend(
				$('<p>').attr('aria-hidden', 'true').addClass('arriba').append(
					$('<a>').attr({href:'#', tabindex: '-1'}).text('Arriba').on('click', function(){
						window.scrollTo(0, 0);
						ga('send', 'event', 'Desplegar', 'ScrollToTop', '');
						return false;
					})
				)
			);
		/*}*/
		
		$('.acciones .compartir').on('mouseenter', function(){
			$('ul', this).removeClass('elemento-invisible');
		}).on('mouseleave', function(){
			$('ul', this).addClass('elemento-invisible');
		});
		$('.acciones .compartir > a').on('focus', function(){
			$(this).next('ul').removeClass('elemento-invisible');
		}).on('blur', function(){
			$(this).next('ul').addClass('elemento-invisible');
		});
		$('.acciones .compartir ul li a').on('focus', function(){
			$(this).closest('ul').removeClass('elemento-invisible');
		}).on('blur', function(){
			$(this).closest('ul').addClass('elemento-invisible');
		});
		
		$('#main-menu .buscar-menu a, #main-menu .buscar a').on('click', function(e){
			if($('#menu-jcyl a').attr('aria-expanded') == 'true'){
				$('#menu-jcyl a').click();
			}
			var $that = $(this);
			var $v = $('#ventana-buscador');
			if($that.attr('aria-expanded') == 'false'){
				$that.attr('aria-expanded', 'true');
				$v.slideDown('slow', function(){
					$('#ventana-buscador .cerrar').focus();
					$('#contenedor, #sidr-menu').attr('aria-hidden', 'true');
					//Focusables
					$('#contenedor a, #contenedor input, #contenedor textarea, #contenedor select, #contenedor button, #contenedor area, #contenedor *[tabIndex="0"], #sidr-menu a, #ventana-menu-jcyl a, #ventana-menu-jcyl button').attr('tabIndex', '-1');
				});
				window.scrollTo(0, 0);
			}
			else{
				$that.attr('aria-expanded', 'false');
				$v.slideUp('slow', function(){
					$('#buscador a').focus();
					$('#contenedor').removeAttr('aria-hidden');
					$('#contenedor *[tabIndex="-1"], #sidr-menu *[tabIndex="-1"], #ventana-menu-jcyl *[tabIndex="-1"]').removeAttr('tabIndex');
				});
			}
			return false;
		});
		$('#ventana-buscador .cerrar').on('click', function(e){
			$('#buscador a').attr('aria-expanded', 'false');
      $('#main-menu .buscar-menu a').attr('aria-expanded', 'false');
			$('#ventana-buscador').slideUp('slow', function(){
				$('#buscador a').focus();
				$('#contenedor').removeAttr('aria-hidden');
				$('#contenedor *[tabIndex="-1"], #sidr-menu *[tabIndex="-1"], #ventana-menu-jcyl *[tabIndex="-1"]').removeAttr('tabIndex');
			});
		});
		
		$('#ventana-buscador input[type="text"]').on('mouseover focus', function(){
			$(this).parents('form').addClass('focus');
		}).on('mouseout blur', function(){
			$(this).parents('form').removeClass('focus');
		});
		/*
		$('#main-menu .buscar-menu a, #main-menu .buscar a').on('click', function(){
			window.scrollTo(0, 0);
			$('#buscador a').click();
			return false;
		});
		*/
		$('#menu .buscar-menu').on('mouseenter', function(){
			$('img', this).attr('src', RUTA_JCYL + 'img/buscar-menu-over.png');
		}).on('mouseleave', function(){
			$('img', this).attr('src', RUTA_JCYL + 'img/buscar-menu.png');
		});
		$('#main-menu .buscar-menu a').on('focus', function(){
			$('img', this).attr('src', RUTA_JCYL + 'img/buscar-menu-focus.png');
		}).on('blur', function(){
			$('img', this).attr('src', RUTA_JCYL + 'img/buscar-menu.png');
		});
		
		$('#menu-jcyl a').on('click', function(e){
			if($('#main-menu .buscar-menu a').attr('aria-expanded') == 'true'){
				$('#main-menu .buscar-menu a').click();
			}
			if($('#main-menu .buscar a').attr('aria-expanded') == 'true'){
				$('#main-menu .buscar a').click();
			}
			var $that = $(this);
			var $v = $('#ventana-menu-jcyl');
			if($that.attr('aria-expanded') == 'false'){
				$that.attr('aria-expanded', 'true');
				$v.slideDown('slow', function(){
					$('#ventana-menu-jcyl .cerrar').focus();
					$('#contenedor, #sidr-menu').attr('aria-hidden', 'true');
					//Focusables
					$('#contenedor a, #contenedor input, #contenedor textarea, #contenedor select, #contenedor button, #contenedor area, #contenedor *[tabIndex="0"], #sidr-menu a, #ventana-buscador a, #ventana-buscador button').attr('tabIndex', '-1');
				});
				window.scrollTo(0, 0);
			}
			else{
				$that.attr('aria-expanded', 'false');
				$v.slideUp('slow', function(){
					$('#buscador a').focus();
					$('#contenedor').removeAttr('aria-hidden');
					$('#contenedor *[tabIndex="-1"], #sidr-menu *[tabIndex="-1"], #ventana-buscador *[tabIndex="-1"]').removeAttr('tabIndex');
				});
			}
			return false;
		});
		$('#ventana-menu-jcyl .cerrar').on('click', function(e){
			$('#menu-jcyl a').attr('aria-expanded', 'false');
			$('#ventana-menu-jcyl').slideUp('slow', function(){
				$('#menu-jcyl a').focus();
				$('#contenedor').removeAttr('aria-hidden');
				$('#contenedor *[tabIndex="-1"], #sidr-menu *[tabIndex="-1"], #ventana-buscador *[tabIndex="-1"]').removeAttr('tabIndex');
			});
		});
		
		$('div:not(.bibliobus) > .calendario > table').each(function(i, elm){
			equalHeights(elm);
		});
		var ht = 0;
		$('.bibliobus .calendario > table').each(function(i, elm){
			if($(elm).height() > ht){
				ht = $(elm).height();
			}
		}).height(ht);
		
		$('.directorio .buscador input[type="text"]').on('mouseover focus', function(){
			$(this).parents('form').addClass('focus');
		}).on('mouseout blur', function(){
			$(this).parents('form').removeClass('focus');
		});
		
		if($.fn.owlCarousel){
			$('.carrusel-home .owl-carousel').owlCarousel({
				navigation: false,
				slideSpeed: 300,
				paginationSpeed: 400,
				singleItem: true,
				autoWidth:true
			});
			
			$('.carrusel-enlaces-dinamico .owl-carousel').owlCarousel({
				navigation: true,
				slideSpeed: 300,
				paginationSpeed: 400,
				items:4,
				navigationText:['', ''],
				center:true
			});
			
			$('#facebook-timeline .owl-carousel').owlCarousel({
				navigation: true,
				slideSpeed: 300,
				paginationSpeed: 400,
				items:4,
				navigationText:['', ''],
				center:true
			});
			//Prehome
			$('#carrusel .owl-carousel').owlCarousel({
			  navigation: false,
			  slideSpeed: 300,
			  paginationSpeed: 400,
			  singleItem: true
			});
		}
		
		$('.gobierno .ver-mas').css({
			position:'absolute',
			bottom: '0px',
			left: '5%',
			width:'90%'
		}).prev().css({
			marginBottom: '6em'
		});
    
		var maxHeight = 0;
    /*
		$('.fila.col-2 > div ul').each(function(i, elm){
			if($(elm).height() > maxHeight){
				maxHeight = $(elm).height();
			}
		}).css({
			minHeight: maxHeight
		});
    */
    $('.fila.col-2').each(function(i, elm){
      maxHeight = 0;
      $('> div ul', elm).each(function(j, el){
        if($(el).height() > maxHeight){
          maxHeight = $(el).height();
        }
      }).css({
        minHeight: maxHeight
      });
    });
		maxHeight = 0;
		$('.fila.col-3 > div ul').each(function(i, elm){
			if($(elm).height() > maxHeight){
				maxHeight = $(elm).height();
			}
		}).css({
			minHeight: maxHeight
		});
		
		$(document).bind('cbox_complete', function(){
			$('#ventana-buscador, #ventana-menu-jcyl, #contenedor, #sidr-menu').attr('aria-hidden', 'true');
		}).bind('cbox_closed', function(){
			$('#ventana-buscador, #ventana-menu-jcyl, #contenedor, #sidr-menu').removeAttr('aria-hidden');
		});

		if($.fn.colorbox){
			var current_navigation_title = $('#contenidos h1').eq(0).text();
			$('.organigrama > ul > li > a').colorbox({
				inline: true,
				width:'60%',
				height:'70%',
				current: current_navigation_title + ' <span>{current} de {total}</span>',
				previous: 'anterior',
				next: 'siguiente',
				opacity:0.75,
				className: 'organigrama-colorbox',
				close: '<img src="' + RUTA_JCYL + 'img/cerrar-hc-colorbox.png" alt="Cerrar">'
			});

      $('.galeria-multimedia > ul > li > a.cboxElement, .galeria-multimedia > p > a.cboxElement').colorbox({
        current: 'Imagen {current} de {total}',
        previous: 'anterior',
        next: 'siguiente',
        opacity:0.75,
        maxWidth: '100%',
        maxHeight: '100%',
        className: 'galeria-colorbox',
        close: '<img src="' + RUTA_JCYL + 'img/cerrar-hc-colorbox.png" alt="Cerrar">',
        title: function(){
          var title = $(this).attr('title');
          var url = $(this).attr('href');
          var textoEnlace = 'Ver mas';
          var verMas = $(this).attr('name');
          if (verMas === undefined || verMas.split("-").length < 3) {
            textoEnlace = 'Descargar imagen';
          } else {
            var params = verMas.split("-");
            var siteLogico = params[0];
            var paginaID = params[1];
            var idContenido = params[2];
            url = '/web/jcyl/' + siteLogico + '/es/Plantilla100Detalle/' + paginaID + '/_/' + idContenido + '/Recurso?plantillaObligatoria=17PlantillaContenidoImagenAmpliada';
          }
		  
          return '' + title + ' <a href="' + url + '" target="_blank"> '+ textoEnlace + '<span class="elemento-invisible">Abre en ventana nueva</span></a>';
        }
      });
      
			$('a.cboxElementIframe').colorbox({
				iframe:true,
				previous: 'anterior',
				next: 'siguiente',
				opacity:0.75,
				width: '80%',
				height: '80%',
				className: 'galeria-colorbox',
				close: '<img src="' + RUTA_JCYL + 'img/cerrar-hc-colorbox.png" alt="Cerrar">'
			});
		}
		
		$('.block-tabs').each(function(){
			if($('.tabs li:first-child a', this).attr('data-ajax-url') && $('.tabs li:first-child a', this).attr('data-ajax-url') != ''){
				var act_tab = $('.tabs li:first-child a', this);
				var act_tab_content = $(act_tab.attr('href'));
				var jqxhr = $.ajax(act_tab.attr('data-ajax-url')).done(function(){
					act_tab.attr('data-ajax-done', 'true');
					act_tab_content.html(jqxhr.responseText);
				}).fail(function() {
					act_tab_content.html('<p>Error cargando contenido</p>');
				});
			}
		});
		
		$('.block-tabs .tabs a').bind('click mouseenter', function(){
			$(this).parent().addClass('activo').siblings('li').removeClass('activo');
			$($(this).attr('href')).removeClass('oculto').siblings('.caja').addClass('oculto');
			if($(this).attr('data-ajax-url') && $(this).attr('data-ajax-url') != ''){
				if($(this).attr('data-ajax-done') != 'true'){
					var act_tab = $(this);
					var act_tab_content = $($(this).attr('href'));
					act_tab_content.html('<p>Cargando contenido...</p>');
					var jqxhr = $.ajax($(this).attr('data-ajax-url')).done(function(){
						act_tab.attr('data-ajax-done', 'true');
						act_tab_content.html(jqxhr.responseText);
					}).fail(function() {
						act_tab_content.html('<p>Error cargando contenido</p>');
					});
				}
			}
			return false;
		});
		/*
		$('.block-tabs.redes-sociales .tabs a').bind('click mouseenter', function(){
			$(this).parent().addClass('activo').siblings('li').removeClass('activo');
			$($(this).attr('href')).removeClass('oculto').siblings('.caja').addClass('oculto');
			return false;
		});
		*/
		
		if($.fn.pagination){
			var N_ITEMS = typeof GLOBAL_N_ITEMS !== typeof undefined ? GLOBAL_N_ITEMS : 8;
			$('.galeria-multimedia + .paginacion').each(function(i, elm){
				var $galery = $(elm).prev('.galeria-multimedia');
				var galery_items = $('ul li', $galery).length;
				if(galery_items > N_ITEMS){
					showHideGaleryItems($galery, 0, N_ITEMS);
					$(elm).pagination({
						items: galery_items,
						itemsOnPage: N_ITEMS,
						cssStyle: '',
						prevText: '<',
						nextText: '>',
						onPageClick: function(pageNumber, event){
							showHideGaleryItems($galery, ((pageNumber - 1) * N_ITEMS), N_ITEMS);
						}
					});
				}
			});
			function showHideGaleryItems(galery, start, items){
				$('ul li', galery).addClass('elemento-invisible').each(function(i, elm){
					if(i >= start && i < (start + items)){
						$(elm).removeClass('elemento-invisible');
					}
				});
				
			}
			$('.foros .paginacion').each(function(i, elm){
				var $forum = $(elm).parents('.foros');
				var forum_items = $('.caja ul li', $forum).length;
				if(forum_items > N_ITEMS){
					showHideForumItems($forum, 0, N_ITEMS);
					$(elm).pagination({
						items: forum_items,
						itemsOnPage: N_ITEMS,
						cssStyle: '',
						prevText: '<',
						nextText: '>',
						onPageClick: function(pageNumber, event){
							showHideForumItems($forum, ((pageNumber - 1) * N_ITEMS), N_ITEMS);
						}
					});
				}
			});
			function showHideForumItems(forum, start, items){
				$('.caja > ul > li', forum).addClass('elemento-invisible').each(function(i, elm){
					if(i >= start && i < (start + items)){
						$(elm).removeClass('elemento-invisible');
					}
				});
				
			}
		}
		
		$('.mapa-buscador .mapa img:not(#imgmap):not(.mapa)').hide();
		$('.mapa-buscador map area').on('mouseenter', function(){
			$('.mapa-buscador .mapa img:not(#imgmap)').hide();
			$('.mapa-buscador .mapa .' + $(this).attr('id')).show();
		}).on('mouseleave', function(){
			$('.mapa-buscador .mapa img:not(#imgmap)').hide();
			$('.mapa-buscador .mapa .mapa').show();
		});
    
    /* calendario */
    if($('.calendario.mini .calendario-buscador form').length){
      var a = new Date().getFullYear();
      var m = new Date().getMonth();
      calendarioAjx(m, a);
      $('#mes').val(m);
      $('#anyo').val(a);
      $('.calendario.mini h2').text($('#mes option:selected').text());
      $('.calendario.mini .calendario-resultados h3').text('Eventos del mes');
      $('#aceptar-cal').on('click', function(){
        a = $('#anyo').val();
        m = $('#mes').val();
        calendarioAjx(m, a);
        $('.calendario.mini h2').text($('#mes option:selected').text());
        $('.calendario.mini .calendario-resultados h3').text('Eventos del mes');
        $('.calendario.mini .calendario-resultados ul').html('<li>Cargando datos</li>');
        return false;
      });
    }
    function calendarioAjx($month, $year){
      $('.calendario.mini > table').html(currentCalendar($month, $year));
      var url = $('.calendario.mini .calendario-buscador form').attr('action');
      url = url + '&m=' + (parseInt($month) + 1) + '&a=' + $year;
      var jqxhr = $.ajax({
        url: url,
        dataType: 'json',
        method: 'GET'
      }).done(function(){
        var json = $.parseJSON(jqxhr.responseText);
        $('.calendario.mini .calendario-resultados').data('json', json);
        $('.calendario.mini .calendario-resultados ul').html('');
        $('.calendario.mini table td').each(function(){
          var td = $(this);
          if(td.text() != ''){
            td.attr('id', 'm' + td.text()).data('ne', 0);
          }
        });
        if(json.length > 0){
          for(_event in json){
            var fecha = formatDate(json[_event].fechaini, json[_event].fechafin);
            var li = $('<li>').append(
              $('<p>').addClass('fecha').append(
                $('<span>').addClass('dia').text(fecha)
              )
            ).append(
              $('<p>').append(
                $('<a>').attr('href', json[_event].href).text(json[_event].texto)
              )
            );
            $('.calendario.mini .calendario-resultados ul').append(li);
            //events
            $.each(json[_event].dia, function(){
              var id = 'm' + this;
              var ne = $('#' + id).data('ne');
              ne++;
              var title = 'Hay ' + ne + ' evento';
              if(ne > 1){
                title += 's';
              }
              $('#' + id).addClass('seleccionado').html('').data('ne', ne).append(
                $('<a>').text(this).attr({
                  href: '#',
                  title: title
                }).on('click', function(){
                  $('.calendario.mini .calendario-resultados h3').text('Eventos del día ' + $(this).text());
                  var json = $('.calendario.mini .calendario-resultados').data('json');
                  var dia = $(this).text();
                  $('.calendario.mini .calendario-resultados ul').html('');
                  for(_event in json){
                    var fecha = formatDate(json[_event].fechaini, json[_event].fechafin);
                    if(json[_event].dia.indexOf(parseInt(dia)) != -1){
                      var li = $('<li>').append(
                        $('<p>').addClass('fecha').append(
                          $('<span>').addClass('dia').text(fecha)
                        )
                      ).append(
                        $('<p>').append(
                          $('<a>').attr('href', json[_event].href).text(json[_event].texto)
                        )
                      );
                      $('.calendario.mini .calendario-resultados ul').append(li);
                    }
                  }
                  return false;
                })
              );
            });
          }
        }
        else{
          $('.calendario.mini .calendario-resultados ul').html('<li>No hay eventos en el mes seleccionado</li>');
        }
      }).fail(function() {
        alert('Error cargando los datos del calendario');
      });
    }
    function currentCalendar($month, $year){
      var dt = new Date($year, $month, 01);
      var first_day = dt.getDay();
      first_day--;
      if(first_day == -1) first_day = 6;
      dt.setMonth(parseInt($month) + 1,0);
      var last_date = dt.getDate();
      
      var dy = 1;
      var $html = '<tr><th abbr="Lunes">lu</th><th abbr="Martes">ma</th><th abbr="Miércoles">mi</th><th abbr="Jueves">ju</th><th abbr="Viernes">vi</th><th abbr="Sábado">sá</th><th abbr="Domingo">do</th>';
      for(i = 0; i <= 41; i++){
        if((i%7) == 0){
          $html += '</tr><tr>';
        }
        if((i >= first_day) && (dy <= last_date)){
          $html += '<td>' + dy + '</td>';
          dy++;
        }
        else{
          $html += '<td>&nbsp;</td>';
        }
      }
      $html += '</tr>'; 
      return $html;
    }
    function formatDate(start, end){
        var fi = new Date(start.replace(' 00:00:00.0', ''));
        var fecha = fi.getDate() + '/' + (fi.getMonth() + 1) + '/' + fi.getFullYear();
        if(start != end){
          var ff = new Date(end.replace(' 00:00:00.0', ''));
          fecha = fecha + ' - ' + ff.getDate() + '/' + (ff.getMonth() + 1) + '/' + ff.getFullYear();
        }
        return fecha;
    }
    /* /calendario */
    
    $('.calendario table').addClass('tabla-calendario');
		
		//$('.buscador-filtro + .buscador-especifico.filtro').hide();
		//$('.buscador-especifico.filtro + .buscador-filtro').hide();
		$('#busqueda-avanzada').on('click', function(){
			$('.buscador-filtro').hide();
			$('.buscador-especifico.filtro').show();
		});
		$('#busqueda-simple').on('click', function(){
			$('.buscador-filtro').show();
			$('.buscador-especifico.filtro').hide();
		});
		
		$('#mi-cuenta > a').on('click', function(){
			if($(this).attr('aria-expanded') == 'false'){
				$(this).attr('aria-expanded', 'true').next('#mi-cuenta-detalle').show();
			}
			else{
				$(this).attr('aria-expanded', 'false').next('#mi-cuenta-detalle').hide();
			}
			return false;
		});
		
		if($.fn.datepicker){
			$('.fechas input').datepicker(
				{
					showOn: 'button',
					buttonImage: RUTA_JCYL + 'img/calendario-popup.png',
					buttonImageOnly: true,
					buttonText: ''
				},
				$.datepicker.regional['es']
			);
		}
		
		if($.fn.scrollProgress){
			$('#contenedor').scrollProgress({
				barSelector: '#progress-bar',
				customCss: true,
				offset: 'bottom'
			});
		}
		
		$('#contenidos table:not(.tabla-calendario):not(.ui-datepicker-calendar)').wrap($('<div>').css({overflow:'auto'}));
		
	});
	
	function equalHeights(elm){
		var ff = /firefox/.test(navigator.userAgent.toLowerCase());
		var $elm1 = $(elm);
		var $elm2 = $elm1.next();
		if($elm1.height() > $elm2.height()){//table
			var c = 4;
			if($('caption', $elm1).length > 0 && ff){
				c = $('caption', $elm1).outerHeight();
			}
			$elm2.height($elm1.height() + c - 1);
		}
		else{
			$elm1.height($elm2.height() + 1);
		}
	}
  
  $('.anexos a').on('click', function() {
      $('html, body').animate({
          scrollTop: $('#anexos').offset().top - 100
      }, 2000);
      return false;
  });
  
  $('#qf').on('keyup', function(e){
    var q = $(this).val().toLowerCase();
    if(q == ''){
      var N_ITEMS = typeof GLOBAL_N_ITEMS !== typeof undefined ? GLOBAL_N_ITEMS : 8;
      $('#foros .caja > ul li').addClass('elemento-invisible').each(function(i, elm){
        if(i >= 0 && i < N_ITEMS){
          $(elm).hide().removeClass('elemento-invisible').fadeIn('fast');
        }
      });
      $('#foros .paginacion').pagination('selectPage', 1).show();
    }
    else{
      $('#foros .paginacion').hide();
      $('#foros .caja > ul li').addClass('elemento-invisible').each(function(){
        if($(this).text().toLowerCase().indexOf(q) != -1){
          $(this).hide().removeClass('elemento-invisible').fadeIn('fast');
        }
      });
    }
  });
  $('#aceptar_qf').on('click', function(e){
    $('#qf').val('');
    var N_ITEMS = typeof GLOBAL_N_ITEMS !== typeof undefined ? GLOBAL_N_ITEMS : 8;
    $('#foros .caja > ul li').addClass('elemento-invisible').each(function(i, elm){
      if(i >= 0 && i < N_ITEMS){
        $(elm).hide().removeClass('elemento-invisible').fadeIn('fast');
      }
    });
    $('#foros .paginacion').pagination('selectPage', 1).show();
    return false;
  });
  
})(jQuery);