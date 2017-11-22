//   Script by Lee Jang Jin.
//   Plugin 0%.
//         ____
//        /  __\
//     __/  /__  ___  ___  ___  ________
// 	  /_   ___/ /  / /  / /__/ /___    /
//     /  /    /  / /  /          /  /
//    /  /    /  /_/  / ___     /  /___
//   /__/     \______/ /__/   /_______/
$(function(){

	line_up();
	resize();
	$(window).resize(resize);
	mainAuto();
	ongoingAuto();
	bulbAuto();

	var gi = 0;
	$('.gnb a').click(function(){
		$('.wrap').stop(true);
		var idx = $(this).parent().index(),
			winHeight = $(window).height();
		$('.wrap').animate({top:-(winHeight*idx)});
		$(this).parent().addClass('on').siblings().removeClass('on');
		gi=idx;
		if(gi==2){
			$('.header').addClass('black');
		}else{
			$('.header').removeClass('black');
		}
		$('.gnb li').eq(gi).addClass('on').siblings().removeClass('on');
		$('.updown li').eq(gi).addClass('on').siblings().removeClass('on');
	});
	$('.updown a').click(function(){
		var idx = $(this).parent().index();
		$('.gnb li').eq(idx).children().click();
	});
	
	$(window).bind('mousewheel DOMMouseScroll', function(e){
		var wrapTop = Math.abs(parseInt($('.wrap').css('top').replace('px',''))),
			winHeight = $(window).height(),
			current = wrapTop/winHeight;
		if(e.originalEvent.wheelDelta < 0 || e.originalEvent.detail > 0) {
			//scroll down
			switch(current){
				case 0 : $('.gnb li').eq(1).children().click();break;
				case 3 : $('.gnb li').eq(4).children().click();break;
			}
		}else {
			//scroll up
			switch(current){
				case 3 : $('.gnb li').eq(2).children().click();break;
				case 4 : $('.gnb li').eq(3).children().click();break;
			}
		}
		return false;
	});
	$('.section02').bind('mousewheel DOMMouseScroll', function(e){
		if(e.originalEvent.wheelDelta < 0 || e.originalEvent.detail > 0) {
			$('.gnb li').eq(2).children().click();
		}else {
			$('.gnb li').eq(0).children().click();
		}
		return false;
	});
	$('.section03').bind('mousewheel DOMMouseScroll', function(e){
		if(e.originalEvent.wheelDelta < 0 || e.originalEvent.detail > 0) {
			//scroll down
			$('.gnb li').eq(3).children().click();
		}else {
			//scroll up
			$('.gnb li').eq(1).children().click();
		}
		return false;
	});

	$('.ongoing div a').click(function(){
		var idx = $(this).index();
		if(!$(this).hasClass('on')){
			$(this).addClass('on').siblings().removeClass('on');
			$('.ongoing .img li.on').animate({left:'-100%'});
			$('.ongoing .img li').eq(idx).animate({left:'100%'},0,function(){
				$(this).animate({left:'0%'}).addClass('on').siblings().removeClass('on');
			});
			$('.ongoing .txt li').eq(idx).addClass('on').siblings().removeClass('on');
		}
		clearInterval(set02);
		ongoingAuto();
	});

	$('.works_item li .item').mouseenter(function(){
		$(this).children('.over').stop().fadeIn();
	});
	$('.works_item li .item').mouseleave(function(){
		$(this).children('.over').stop().fadeOut();
	});

	$('.bulb img').fadeIn(3000).fadeOut(3000);

	$('.works_menu a').click(function(){
		var cls = $(this).parent().attr('class');
		if(!$(this).parent().hasClass('on')){
			$(this).parent().addClass('on').siblings().removeClass('on');
			$('.works_item li').hide();
			$('.works_item li.'+cls).show();
			line_up();
			if($(this).parent().hasClass('all')){
				$('.works_item li').show();
				line_up();
			}
		}
		$('.works_cont .inner,.works_cont .handle,.fuzlog ul,.fuzlog .handle').css('left','0px');
	});


	//2016-03-10
	$('.sl_wrap .paging').delegate('a','click',function(){
		var bWidth = $(window).width(),
			idx = $(this).index();
		if(bWidth > 1024){
			$('.works_cont .inner').animate({left:-idx*1133});
		}else{
			$('.works_cont .inner').animate({left:-idx*987});
		}
		$(this).addClass('on').siblings().removeClass('on');
	});
	$('.sl_wrap .next').click(function(){
		$('.sl_wrap .paging .on').next().click();
	});
	$('.sl_wrap .prev').click(function(){
		$('.sl_wrap .paging .on').prev().click();
	});

	$('.horiz_sl .paging a').click(function(){
		if(!$(this).hasClass('on')){
			var idx = $(this).index();
			$('.section01 .bg .on').animate({left:'-100%'});
			$('.section01 .bg li').eq(idx).animate({left:'100%'},0,function(){
				$(this).animate({left:'0%'}).addClass('on').siblings().removeClass('on');
			});
			$('.horiz_sl .txt .on').fadeOut();
			$('.horiz_sl .txt li').eq(idx).fadeIn().addClass('on').siblings().removeClass('on');
			$(this).addClass('on').siblings().removeClass('on');
			clearInterval(set01);
			mainAuto();
		}
	});
	$('.horiz_sl .next').click(function(){
		if($('.horiz_sl .paging a:last').hasClass('on')){
			$('.horiz_sl .paging a').first().click();
		}else{
			$('.horiz_sl .paging a.on').next().click();
		}
		clearInterval(set01);
		mainAuto();
	});
	$('.horiz_sl .prev').click(function(){
		$('.section01 .bg .on').animate({left:'100%'});
		$('.horiz_sl .txt li').fadeOut();
		if($('.section01 .bg li').first().hasClass('on')){
			$('.section01 .bg li').last().animate({left:'-100%'},0,function(){
				var idx = $(this).index();
				$(this).animate({left:'0%'}).addClass('on').siblings().removeClass('on');
				$('.horiz_sl .paging a').last().addClass('on').siblings().removeClass('on');
				$('.horiz_sl .txt li').eq(idx).fadeIn().addClass('on').siblings().removeClass('on');
			});
		}else{
			$('.section01 .bg .on').prev().animate({left:'-100%'},0,function(){
				var idx = $(this).index();
				$(this).animate({left:'0%'}).addClass('on').siblings().removeClass('on');
				$('.horiz_sl .paging a').eq(idx).addClass('on').siblings().removeClass('on');
				$('.horiz_sl .txt li').eq(idx).fadeIn().addClass('on').siblings().removeClass('on');
			});
		}
		clearInterval(set01);
		mainAuto();
	});

	$('.fuzlog_item .plate').mouseenter(function(){
		$(this).next().fadeIn();
	});
	$('.fuzlog_item .hover').mouseleave(function(){
		$(this).fadeOut();
	});
	$('.fuzlog_item .hover').click(function(){
		$(this).next().show();
	});
	$('.fuzlog_item div a').click(function(){
		$(this).parent().hide();
	});

	//2016-03-17
	$('.sl04 .paging a').click(function(){
		var idx = $(this).index();
		if($(window).width() > 1024){
			$('.sl04 .img_ul ul').animate({left:-idx*1100});
		}else{
			$('.sl04 .img_ul ul').animate({left:-idx*960});
		}
		$(this).addClass('on').siblings().removeClass('on');
	});
	$('.sl04 .next').click(function(){
		$('.sl04 .paging .on').next().click();
	});
	$('.sl04 .prev').click(function(){
		$('.sl04 .paging .on').prev().click();
	});


});

function resize(){
	var winWidth = $(window).width(),
		winHeight = $(window).height(),
		wrapTop = Math.abs(parseInt($('.wrap').css('top').replace('px',''))),
		a = Math.floor(wrapTop/winHeight),
		top = a*winHeight;
	line_up();
	$('div[class*="section0"]').css({
		width:winWidth,
		height:winHeight
	});
	$('.section01 .bg').css('margin-left',-(winWidth/2));
	
	$('.section04 .inner').css('height',winHeight-190);

	$('.works_cont .inner,.works_cont .handle,.fuzlog ul,.fuzlog .handle').css('left','0px');

	if(wrapTop != 0){
		if(wrapTop > winHeight){
			$('.wrap').css({top:-top});
		}else{
			var idx = $('.gnb .on').index();
			$('.wrap').css({top:-(winHeight*idx)});
		}
	}

	$('.gnb .on').click();
}

function mainAuto(){
	set01 = setInterval(function(){
		$('.horiz_sl .next').click();
	},37000);
}

function ongoingAuto(){
	set02 = setInterval(function(){
		if($('.ongoing a:last').hasClass('on')){
			$('.ongoing a').first().click();
		}else{
			$('.ongoing a.on').next().click();
		}
	},5000);
}

function bulbAuto(){
	setInterval(function(){
		$('.bulb img').fadeIn(3000).fadeOut(3000);
	},7000);
}

function line_up(){
	$('.works_item ul').each(function(){
		var li = $(this).children(':visible'),
			size = li.size(),
			li_width,
			li_height = li.height(),
			ul_width;
		if($(window).width() > 1024){
			li_width = li.width()+33;
			ul_width = (li_width)*(Math.ceil(size/2));
		}else{
			li_width = li.width()+27
			ul_width = (li_width)*(Math.ceil(size/2));
		}
		$(this).css({
			width:ul_width,
			height:'500px'
		});
		li.each(function(){
			var idx = $(this).index(),
				hide = $(this).prevAll(':hidden').size(),
				idx2 = idx-hide,
				idx = idx2,
				left = (Math.floor(idx/2))*li_width;
			if(idx%2 == 0){
				$(this).animate({left:left,top:'0px'});
			}else{
				$(this).animate({top:li_height+30,left:left});
			}
		});
		if($(window).width() > 1024){
			var innerW = ul_width+283,
				pgEa = Math.ceil(innerW/1133),
				i=0;
			$('.works_cont .inner').css('width',innerW);
		}else{
			var innerW = ul_width+246,
				pgEa = Math.ceil(innerW/993),
				i=0;
			$('.works_cont .inner').css('width',innerW);
		}
		$('.sl_wrap .paging').children().remove();
		while(i<pgEa){
			$('<a href="#none" />').appendTo('.sl_wrap .paging');
			i++;
		}
		$('.sl_wrap .paging a').first().addClass('on');
	});
}