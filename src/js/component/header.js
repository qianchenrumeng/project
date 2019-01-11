//header部分的业务逻辑
define(["jquery","cookie"], () => {
	class Header{
		constructor(){
			this.init();
		}
		init(){
			//加载header.html
			new Promise((resolve, reject) => {
				$("header").load("/html/component/header.html", () => {
					resolve();
				})
			}).then(() => {
				//如果cookie里面存了user，那证明用户是登录状态，顶部要显示欢迎，并且将跳转功能禁止
			if($.cookie("user")){
				var str =decodeURIComponent($.cookie("user"));
				var obj_user = JSON.parse(str);
				$("#header_login").html("欢迎您！"+obj_user.allname);
				
				
			}
				this.addcar();
				this.nav();
				this.user_login();
			})
		}
		nav(){
			//导航栏每个跳转都是到list页面
			$(".nav").on("click", "li", function(){
				location.href = "/html/list.html";
			})
		}
		addcar(){
			//从cookie里取出商品数量，然后加到导航栏的购物车显示中去
			var arr = [];
			var str = $.cookie("cart");
			//判断是否能取出数据，不然如果没有该条cookie，直接json转型的话会报错
			if(str != undefined){
				arr = JSON.parse(str);
			}
			
			$("#car").html(arr.length);
		}
		user_login(){
			//在登录按钮被点击的时候判断是否处于登录状态
			$("#header_login").on("click",function(){
				//如果是登录状态，就将该按钮禁用，禁止跳转到登录页面
				if($.cookie("user")){
					// $("#header_login").attr('disabled', 'true');
					$(".my_login").css({display:"block"});
					$(".my_out").on("click",function () {  
						if(confirm("确定退出登录吗？")){
							$.cookie("user",null,{
								expires:-1,
								path:"/"
							});
							$("#header_login").html("用户登录");
							$(".my_login").css({display:"none"});
						}else{
							$(".my_login").css({display:"none"});
						}
					
					})
					
				}else{
					location.href = "/html/login.html";
				}
			})
			//给购物车按钮绑定跳转事件
			$("#goShoppingcar").on("click",function () {
				location.href = "/html/shoppingcar.html";
			  })
		}
	}
	return new Header();
})