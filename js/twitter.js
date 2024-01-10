//(function($){
//	$(document).ready(function(){
	$.tweet = function(values){
		var url = values.url;
		var username = values.username;
		var textoCargando = values.loading;
		var textoError = values.error;
		
		$('#loading').html('<p>' + textoCargando + '<p>');
		$('#error').hide();
		
		$.ajax({
			/*url: 'http://10.201.184.81:8080/Tweets/twitter_two.jsp?count=20&followers=true&sdfsdfdsabbbbbbb',*/
			/*url: 'json/timeline.json',*/
			url:url,
			dataType: 'json'
		}).done(function(data){
			var ul = $('<ul>').addClass('timeline owl-carousel');
			$.each(data[1], function(key, value){
				var tweet = value.text;
				$.each(value.entities.urls, function(_key, url){
					tweet = tweet.replace(
						url.url,
						'<a href="' + url.expanded_url + '" title="Enlace externo">' + url.display_url + ' <span class="elemento-invisible">Enlace externo</span></a>'
					);
				});
				$.each(value.entities.user_mentions, function(_key, user){
					tweet = tweet.replace(
						'@' + user.screen_name,
						'<a href="https://twitter.com/' + user.screen_name + '" title="Enlace externo (usuario)">@' + user.screen_name + ' <span class="elemento-invisible">Enlace externo (usuario)</span></a>'
					);
				});
				$.each(value.entities.hashtags, function(_key, hash){
					tweet = tweet.replace(
						'#' + hash.text,
						'<a href="https://twitter.com/search?q=%23' + hash.text + '&src=hash" title="Enlace externo (hashtag)">#' + hash.text + ' <span class="elemento-invisible">Enlace externo (hashtag)</span></a>'
					);
				});
				/*
				var ops = $('<a>').append(
					'opciones tweet ',
					 $('<span>').text(' pulsa para mostrar').addClass('elemento-invisible')
				).attr({
					'href': '#',
					'class': 'actions-button'
				}).bind('click', function(e){
					var ul = $(this).next('ul');
					if(ul.hasClass('closed')){
						ul.removeClass('closed').addClass('opened').show();
						$('span', this).text(' pulsa para ocultar');
					}
					else if(ul.hasClass('opened')){
						ul.removeClass('opened').addClass('closed').hide();
						$('span', this).text(' pulsa para mostrar');
					}
					return false;
				});
				*/
				var menu = $('<ul>').addClass('actions closed').append(
					$('<li>').append(
						$('<a>').attr({
							href: 'https://twitter.com/intent/tweet?in_reply_to=' + value.id_str,
							'class': 'reply'
						}).text('Responder')
					),
					$('<li>').append(
						$('<a>').attr({
							href: 'https://twitter.com/intent/retweet?tweet_id=' + value.id_str,
							'class': 'retweet'
						}).text('Retwittear')
					),
					$('<li>').append(
						$('<a>').attr({
							href: 'https://twitter.com/intent/favorite?tweet_id=' + value.id_str,
							'class': 'like'
						}).text('Favorito')
					)
				);
				
				ul.append(
					$('<li>').append(
						$('<img>').attr({src:value.user.profile_image_url, alt: ''}),
						
						$('<p>').append(tweet),
						$('<span>').text(H(value.created_at)).addClass('time'),
						/*ops,*/
						menu
					)
				);
			});
			$('#twitter-timeline').html('').append(
				$('<h2>').append(
					'Tuits de ' + '<a href="https://twitter.com/' + username + '">' + username + '</a>'
				),
				ul
			);
			if($.fn.owlCarousel){
				ul.owlCarousel({
					navigation: true,
					slideSpeed: 300,
					paginationSpeed: 400,
					items:4,
					navigationText:['', ''],
					center:true
				});
			}
		}).fail(function(xhr, status){
			$('#loading').hide();
			$('#error').html('<p>' + textoError + '</p>').show();
		});
	}
//	});
//})(jQuery);

var K = function () {
    var a = navigator.userAgent;
    return {
        ie: a.match(/MSIE\s([^;]*)/)
    };
}();
 
var H = function (a) {
    var b = new Date();
    var c = new Date(a);
    if (K.ie) {
        c = Date.parse(a.replace(/( \+)/, ' UTC$1'));
    }
    var d = b - c;
    var e = 1000,
        minute = e * 60,
        hour = minute * 60,
        day = hour * 24,
        week = day * 7;
    if (isNaN(d) || d < 0) {
        return "";
    }
    if (d < e * 7) {
        return "ahora ";
    }
    if (d < minute) {
        return "hace " + Math.floor(d / e) + " segundos ";
    }
    if (d < minute * 2) {
        return "hace 1 minuto";
    }
    if (d < hour) {
        return "hace " + Math.floor(d / minute) + " minutos ";
    }
    if (d < hour * 2) {
        return "hace 1 hora";
    }
    if (d < day) {
        return "hace " + Math.floor(d / hour) + " horas ";
    }
    if (d > day && d < day * 2) {
        return "ayer";
    }
    if (d < day * 365) {
        return "hace " + Math.floor(d / day) + " días ";
    } else {
        return "hace más de un año ";
    }
};