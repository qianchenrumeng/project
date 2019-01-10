//首页的业务逻辑
require(["./requirejs.config"], () => {
	//引入index需要依赖的模块
	require(["jquery","item", "header","footer","cookie"], ($,item,header) => {
		
		$(function() {

			item.init("http://rap2api.taobao.org/app/mock/123500/lip",header);
			//设置轮播图
			function slide(){
				let $ul = $(".banner_wrap ul");
				let $imgs = $ul.children();
				let index = 0;
				let timer = null;
				let btns = [];
				let len = $imgs.length;
				let liWidth = $imgs.eq(0).width();
				
				for (var i = 1; i <= len; i++) {
					//拼接按钮
					btns.push($("<li>").addClass(i===1?"ac":"").appendTo($(".banner_wrap ol")));
				
				}
			
				//在结尾追加一个img，计算ul宽度
				$ul.append($imgs.eq(0).clone());
				$ul.width((len+1)*liWidth);
			
				$.each(btns, (i, $btn) => {
					$btn.on("click", function(){
						
						btns[index].removeClass("ac");
						$(this).addClass("ac");
						index = $(this).index();
						//ul移动到当前位置
						// -index*liWidth
						$ul.stop().animate({left : -index*liWidth},"slow");
					})
				})
		
				//下一张
				function gonext(){
					btns[index].removeClass("ac");
					if(++index >= len){
						//移动到追加得那一张，但是移动完成之后瞬间回到第0张
						$ul.stop().animate({left: -len*liWidth}, "slow", function(){
							$ul.css({left: 0});
						})
						index = 0;
					}else{
						$ul.stop().animate({left: -index*liWidth});
					}
			
					btns[index].addClass("ac");
				}
			
				$(".banner_wrap").hover(function(){
					clearInterval(timer);
				}, (function autoPlay(){
					timer = setInterval(() => {
						gonext();
					},3000);
					return autoPlay;
				})());
			
			}
			slide();
			//设置选项卡
			function index_tab(){
				$(".main_center_wr li").on("click",function () {
					//给ul设置
					$(this).siblings().removeClass("ac");
					$(this).addClass("ac");
					//给选项卡渲染内部的ul
					// console.log($(".main_center_wr .main_center_wrap div").eq($(this).index()).children());
					//给div设置隐藏显示
					$(".main_center_wr .main_center_wrap div").eq($(this).index()).siblings().removeClass("main_center_ac").removeClass("list-item");
					$(".main_center_wr .main_center_wrap div").eq($(this).index()).addClass("main_center_ac").addClass("list-item");
					if($(".main_center_wr .main_center_wrap div").eq($(this).index()).children().length === 0){
						item.init("http://rap2api.taobao.org/app/mock/123500/lip",header);
					}
					
				  })
			}
			index_tab();
			
			

		})
	
	})
})