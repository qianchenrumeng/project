//首页的业务逻辑
require(["./requirejs.config"], () => {
	//引入index需要依赖的模块
	require(["jquery", "header","footer","cookie"], () => {
        $(function () { 
			$("#regBtn").on("click",function(e){
				e = e || window.event;
				let user = {
					"username" :$("#username").val(),
					"password" : $("#password").val()

				}
				console.log(user);
				$.ajax({
					type:"post",
					url:"http://localhost/mac/login.php",
					dataType:"json",
					data:{
						"username" :$("#username").val(),
						"password" : $("#password").val()
					},
					success:function (res) {
						console.log(res.res_body);
						if(res.res_code){
							var str = JSON.stringify(res.res_body);
							console.log(str);
							$.cookie("user", encodeURIComponent(str) ,{
								path:"/"
							});

								window.location.href = "/index.html";

						
						}else{
							// if(confirm(res.res_body)){
							// 	window.location.href = "login.html";
							// }
							$(".warning").css({display:"block"}).append($("<p>").html(res.res_body));
						}
					}
				});
				
				e.preventDefault();
				return false;
			})
		 })
    })

})