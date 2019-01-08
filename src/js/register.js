//首页的业务逻辑
require(["./requirejs.config"], () => {
	//引入index需要依赖的模块
	require(["jquery", "header","footer"], () => {
        $ (function() {
			$("#according").on("click",function(){
				
				if(this.checked){
					$("#password").attr("type",'text');;
				}else{
					$("#password").attr("type",'password');;
				}
				
			});
			$("#regBtn").on("click" , function (e) {
				e = e || window.event;
				$(".warning").empty().css({display:"none"});
				let user = {
					"email": $("#username").val(),
					"username" :$("#allname").val(),
					"password" : $("#password").val(),
					"tel" :$("#tel").val()
				};
		
				let	pwd =  /^.{6,}$/,
					tel = /^[1][3,4,5,7,8][0-9]{9}$/,
					email = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
				//定义变量存储判断的状态
				//
				let pwdNum = false,telNum = false,emailNum =false,nameNum = false;
				//判断邮箱
					if(user.email === ""){
						$(".warning").css({display:"block"}).append($("<p>").html("邮箱不能为空!"));
					}else if(!email.test(user.email)){
			
						$(".warning").css({display:"block"}).append($("<p>").html("请按照123@163.com格式填写邮箱"));

					}else{
						emailNum = true;
					}
					//判断用户名
					if(user.username === ""){

						$(".warning").css({display:"block"}).append($("<p>").html("名字不能为空!"));
					}else{
						nameNum = true;
					}
					//判断密码
					if(user.password === ""){
						$(".warning").css({display:"block"}).append($("<p>").html("密码不能为空!"));
					}else if(!pwd.test(user.password)){
	
						$(".warning").css({display:"block"}).append($("<p>").html("密码必须超过6位!"));

					}else{
						pwdNum = true;
					}
					//判断手机
					if(user.tel === ""){
						$(".warning").css({display:"block"}).append($("<p>").html("电话不能为空!"));
					}else if(!tel.test(user.tel)){
	
						$(".warning").css({display:"block"}).append($("<p>").html("请填写正确的手机号!"));

					}else{
						telNum = true;
					}
				if(emailNum && nameNum && pwdNum && telNum){
					$.ajax({
						type:"post",
						url:"http://localhost/mac/register.php",
						dataType:"json",
						data:{
							//用户名和邮箱要去掉空格，密码不用
							"username" :user.username,
							"email":user.email,
							"password" : user.password,
							"tel" :user.tel
						},
						//根据返回参数执行函数
						success:function (res) {
							console.log(res);
							if(res.res_code){
								if(confirm(res.res_message)){
									window.location.href = "login.html";
								}
							}else{
								if(confirm(res.res_message)){
									window.location.href = "register.html";
								}
			
							}
						}
					});
				}
				
		

				e.preventDefault();
				return false;
			})
		})
		
    })

})