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
			$(".nav").on("click", "li", function(){
				location.href = "/html/list.html";
			})
		}
		addcar(){
			var arr = [];
			var str = $.cookie("cart");
			console.log(str)
			if(str != undefined){
				arr = JSON.parse(str);
			}
			
			$("#car").html(arr.length);
		}
		user_login(){
			$("#header_login").on("click",function(){
				if($.cookie("user")){
					$("#header_login").attr('disabled', 'true');
				}else{
					location.href = "/html/login.html";
				}
			})
			$("#goShoppingcar").on("click",function () {
				location.href = "/html/shoppingcar.html";
			  })
		}
	}
	return new Header();
})