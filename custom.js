// Copyright Jon Wexler 2016 

$(document).ready(function(){
	setUp();

	$('.links, #link-home').click(function(e){
		// e.preventDefault();
		fadeContent($(this).attr('id').split('-').pop());
	});
});

function setUp () {
	$('.links').hide();
	const links = $('.links');
	links.each(function(i) {
		console.log(i)
		$(this).fadeIn(500 + i*500);
	});

	$(function() {
		fadeContent(document.location.href.split("#").pop());
	});
	
}

function fadeContent (type) {
	if (type.length > 10 || type.length <= 0) type = 'home';
	if (type === 'work') {
		getWork();
	}else {

	};
	$('#main-content').html($('#'+type).html()).hide().fadeIn(2000);
}

function getWork () {
	var videos = '';
	$.ajax({
		url: 'https://www.googleapis.com/youtube/v3/search?order=date&part=snippet&channelId=UC0tpI0agJuwzyMfyOyc1IVw&maxResults=25&key=AIzaSyDbmx7n9OMWLjpAYKWzarvP6sOxLyUrecc',
		success: function(data){
			// $('body').html(data);
			console.log(data.items);
			data.items.forEach(function(item){
				var link = "https://www.youtube.com/watch?v="+ item.id.videoId
				var emlink = "https://www.youtube.com/embed/"+ item.id.videoId
				videos += "<iframe width='560' height='315' class='youtube' src=" + emlink + " frameborder='0' allowfullscreen></iframe> <a href='"+ link + "' class='youtube-title'>"+ item.snippet.title +"</a> ";
			});
			$('#main-content').html(videos);
		
		}
	})
}