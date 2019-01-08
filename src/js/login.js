//首页的业务逻辑
require(["./requirejs.config"], () => {
	//引入index需要依赖的模块
	require(["jquery", "header","footer"], () => {
        $(function () { 
			$("#regBtn").on("click",function(e){
				e = e || window.event;
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
							console.log(res);
							// if(confirm("登录成功，去首页？")){
							// 	window.location.href = "index.html";
							// }
						}
					}
				});
				
				e.preventDefault();
				return false;
			})
		 })
    })

})