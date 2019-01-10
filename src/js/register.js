//注册的业务逻辑
require(["./requirejs.config"], () => {
	//引入该页面需要依赖的模块
	require(["jquery", "header","footer"], () => {
        $ (function() {
			//给显示密码按钮绑定事件，每次触发的时候判断当前按钮是否被选中
			//以此来更改密码框的type
			$("#according").on("click",function(){
				
				if(this.checked){
					$("#password").attr("type",'text');;
				}else{
					$("#password").attr("type",'password');;
				}
				
			});
			//给诸恶按钮绑定事件
			$("#regBtn").on("click" , function (e) {
				e = e || window.event;
				//将警告给隐藏
				$(".warning").empty().css({display:"none"});
				//定义一个对象存用户输入的信息
				let user = {
					"email": $("#username").val(),
					"username" :$("#allname").val(),
					"password" : $("#password").val(),
					"tel" :$("#tel").val()
				};
				//定义需要校验的正则表达式
				//密码必须超过6位
				//手机格式
				//邮箱格式
				let	pwd =  /^.{6,}$/,
					tel = /^[1][3,4,5,7,8][0-9]{9}$/,
					email = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
				//定义变量存储判断的状态
				//
				let pwdNum = false,telNum = false,emailNum =false,nameNum = false,agree = false;
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
					//判断是否勾选同意协议的按钮
					if($("#agree_mac").prop("checked")){
						agree = true;
					}else{
						$(".warning").css({display:"block"}).append($("<p>").html("请同意魅可官网的条件条款和隐私政策的约束!"));
					}
					//如果每个标尺都是true表示每个都已经合格了，可以将数据传入后台了
				if(emailNum && nameNum && pwdNum && telNum && agree){
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