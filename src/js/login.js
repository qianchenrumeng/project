//首页的业务逻辑
require(["./requirejs.config"], () => {
	//引入index需要依赖的模块
	require(["jquery", "header","footer","cookie"], () => {
        $(function () { 
			$("#regBtn").on("click",function(e){
				e = e || window.event;
			//登录的逻辑比较简单，获得页面上用户输入的数据，然后传给后台，然后根据后台返回的结果进行显示给用户
				$.ajax({
					type:"post",
					url:"http://localhost/mac/login.php",
					dataType:"json",
					data:{
						"username" :$("#username").val(),
						"password" : $("#password").val()
					},
					success:function (res) {
						
						if(res.res_code){
							//将取得的用户信息存入cookie中，方便别的页面取出来
							var str = JSON.stringify(res.res_body);
							// console.log(str);
							$.cookie("user", encodeURIComponent(str) ,{
								path:"/"
							});

								window.location.href = "/index.html";

						
						}else{
							
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