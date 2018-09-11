var windowWith,windowHeight;
var ismobistaute = false;
var browser={ 
    versions:function(){
        var u = navigator.userAgent, app = navigator.appVersion;
        var sUserAgent = navigator.userAgent;
        return {
        trident: u.indexOf('Trident') > -1,
        presto: u.indexOf('Presto') > -1, 
        isChrome: u.indexOf("chrome") > -1, 
        isSafari: !u.indexOf("chrome") > -1 && (/webkit|khtml/).test(u),
        isSafari3: !u.indexOf("chrome") > -1 && (/webkit|khtml/).test(u) && u.indexOf('webkit/5') != -1,
        webKit: u.indexOf('AppleWebKit') > -1, 
        gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,
        mobile: !!u.match(/AppleWebKit.*Mobile.*/), 
        ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), 
        android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,
        iPhone: u.indexOf('iPhone') > -1, 
        iPad: u.indexOf('iPad') > -1,
        iWinPhone: u.indexOf('Windows Phone') > -1
        };
    }()
}
if(browser.versions.mobile || browser.versions.iWinPhone){
    //ismobistaute = true;
} 


$(function(){
	getWindowSize();
	
	 if(windowWith < 768){
		ismobistaute = true;
	}
	
	//点击手机导航效果
	$(".mobirightNav").click(function(){
		if($(this).hasClass("current")){
			$(this).removeClass("current");
			$(".mobi_navfixed").animate({left:"-100%"},500,function(){
				$(this).hide();
			});
		}else{
			$(this).addClass("current");
			$(".mobi_navfixed").show().animate({left:0},500);
		}
	});
	
	// 点击手机导航下拉菜单
	$('.navfixed_con ul li').click(function(){
		$(this).find('dl').slideToggle();
	})

	//点击手机搜索效果
	$(".mobirightSearch").click(function(){
		console.log(1);
		if($(this).hasClass("current")){
			$(this).removeClass("current");
			$(".mobirightSearch-box").fadeOut(300);
		}else{
			$(this).addClass("current");
			$(".mobirightSearch-box").fadeIn(300);
		}
	});
	$(document).bind("click",function(e){
		var target = $(e.target);
		if(target.closest(".mobirightSearch,.mobirightSearch-box").length == 0){
			$(".mobirightSearch-box").hide();
			$(".mobirightSearch").removeClass("current");
		}
	})
	
	
	//首页 banner
	var mySwiper = new Swiper('.home-banner .swiper-container',{
		pagination: '.home-banner .pagination',
		autoplay : 6000,
		loop:true,
		grabCursor: true,
		paginationClickable: true
	})
	
	if(ismobistaute){
		//首页 精彩视频 mobile
		var mySwiper = new Swiper('.home-video .video-focus .swiper-container',{
			loop:true,
			grabCursor: true,
			paginationClickable: true
		})
		
	}
	
	//首页 图片新闻
	var noticeSwiper = new Swiper('.home-notice .list .swiper-container',{
		speed:500,
		onSlideChangeStart: function(){
		  $(".home-notice .base-top-title .tabs a.active").removeClass('active')
		  $(".home-notice .base-top-title .tabs a").eq(noticeSwiper.activeIndex).addClass('active')
		}
	})
	$(".home-notice .base-top-title .tabs a").on('touchstart mouseover',function(e){
		e.preventDefault()
		$(".home-notice .base-top-title .tabs a.active").removeClass('active')
		$(this).addClass('active')
		noticeSwiper.swipeTo( $(this).index() )
	})
	$(".home-notice .base-top-title .tabs a").click(function(e){
		e.preventDefault()
	})
	
	//首页 微博
	var sinaSwiper = new Swiper('.home-weibo .list .swiper-container',{
		speed:500,
		onSlideChangeStart: function(){
		$(".home-weibo .base-top-title .tabs a.active").removeClass('active')
		$(".home-weibo .base-top-title .tabs a").eq(sinaSwiper.activeIndex).addClass('active')
		}
	})
	$(".home-weibo .base-top-title .tabs a").on('touchstart mouseover',function(e){
		e.preventDefault()
		$(".home-weibo .base-top-title .tabs a.active").removeClass('active')
		$(this).addClass('active')
		sinaSwiper.swipeTo( $(this).index() )
	})
	$(".home-weibo .base-top-title .tabs a").click(function(e){
		e.preventDefault()
	})
	
	//首页 精彩视频
	var homeVideoSwiper = new Swiper('.home-video .video-focus .swiper-container',{
		paginationClickable: true,
		centeredSlides: true,
		slidesPerView: 'auto',
		watchActiveIndex: true,
		loop: true,
		loopedSlides: 3
	})
	$('.home-video .video-focus .swiper-button-prev').on('click', function(e){
		e.preventDefault()
		homeVideoSwiper.swipePrev()
	})
	$('.home-video .video-focus .swiper-button-next').on('click', function(e){
		e.preventDefault()
		homeVideoSwiper.swipeNext()
	})
	
	
	
	
})
	
	


function getWindowSize(){
	 windowWith = $(window).width();
	 windowHeight = $(window).height();
}

var tabs = function(tab, con){
    tab.click(function(){ var indx = tab.index(this);
        tab.removeClass('current');
        $(this).addClass('current');
        con.hide();
        con.eq(indx).show();
    })    
}

/*视频播放*/
function Videoplay(){
	var flashvars={
		f:"",
		p:1
	};
	var video=['ckplayer/video/1_0.mp4->video/mp4'];
	
	$(".video-play").click(function(){
		$(".pop-video-layer").fadeIn(300);
		var mp4_src=$(this).attr("data-url");
		flashvars.f=mp4_src;
		video[0]=mp4_src;
		
		CKobject.embed('ckplayer/ckplayer.swf','pop-video','ckplayer_a1','100%','100%',true,flashvars,video);
		
	});
	
	$(".pop-video-layer .close").on('click',function(){
		$(".pop-video-layer").fadeOut();
		$("#pop-video").html('');
	});
}

// 返回顶部
$(function() {
	$('.btn_top').hide();
	$('.btn_top').live("click",function(){
		$('html, body').animate({scrollTop: 0},300);
		return false;
	})
	$(window).bind('scroll resize',function(){
		if($(window).scrollTop()<=300){
			$('.btn_top').hide();
		}else{
			$('.btn_top').show();
		}
	})
})