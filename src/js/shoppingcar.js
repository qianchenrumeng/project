//首页的业务逻辑
require(["./requirejs.config"], () => {
	//引入index需要依赖的模块
	require(["jquery", "template","header","footer","cookie"], ($,template,header) => {
        $(function(){
		
			var str = $.cookie("cart");
		
			var arr = [];
			takeOut();
			//根据cookie的状态判断提示购物车空的提示显示还是隐藏
			function takeOut(){
				//如果是空的，或者没有存数据，那就显示
				if(str === undefined || str == "[]"){
					$("#shopping_replace").css({display:"block"});
				}else{
					
					arr = JSON.parse(str);
				}
			}
			//将从cookie中取出的数据渲染到界面上
			let html = template("list-template", {arr});
				$(".shoppingcar").html(html);
		
				shoppingcar_price(arr);

			function shoppingcar_price(arr) {  
				//计算价格
				var shoppingcar_total = 0;
				//因为界面上的数据是根据从cookie中取出的数据渲染的
				//所以计算总价的时候就不用再去页面获取然后计算，直接对取得的数组里面的数据进行计算就可以了
				for(let i = 0; i < arr.length; i++){
					shoppingcar_total += arr[i].totalPrice;
				}
				//将计算的结果渲染到界面上
				$("#shoppingcar_total").text(shoppingcar_total);
				var carriage = 0;
				$("#shopping_carriage").text(carriage);
				$("#shopping_total").text(carriage+shoppingcar_total);
			}

			//增加
			$(".shoppingcar_add").on("click",function(){
				//获得当前的商品的id，价格以及数量
				let id = $(this).parent().parent().attr("data-id");
				let price = $(this).parent().siblings(".shopping_price").children("span").html();
				let num = $(this).siblings(".shoppingcar_num").html();
				let totalPrice ;
				//通过id找到再cookie数组中对应的对象，对arr里面的数据进行修改
				for(let i = 0; i < arr.length; i++){
					if(arr[i].id === id){
						arr[i].num++;
						arr[i].totalPrice = arr[i].num * price;
						totalPrice = arr[i].totalPrice;
					}
				}
				//将修改以后的数据存入cookie中，将之前存在cookie中的数据覆盖
				$.cookie("cart",JSON.stringify(arr),{
					path:"/"
				});
				//每次修改数量都要调用一下计算总价的函数，更新页面上的总价
				shoppingcar_price(arr);
				$(this).siblings(".shoppingcar_num").html(++num);
				$(this).parent().siblings(".shoppping_totalprice").children("span").html(totalPrice);

				
			})
			//减少
			//减少数量和增加数量的方法差不多，只是减少的时候要判断减到0的时候需要将该行删去
			$(".shoppingcar_subtract").on("click",function(){
				let id = $(this).parent().parent().attr("data-id");
				let price = $(this).parent().siblings(".shopping_price").children("span").html();
				let num = $(this).siblings(".shoppingcar_num").html();
				let totalPrice ;
				//判断减去一个以后是否为0
				if(--num<=0){
					//如果等于0就要执行删除操作
					$(arr).each(function(index,item){
						if(item.id === id){
							//找到id一样的，删去当前下标的数据1个
							arr.splice(index,1);
						}
					})
					//删去对应的DOM节点
					$(this).parent().parent().remove();
					
				}else{
					//减去以后不是0，就和增加的操作一样，对数组进行操作然后将更改后的数量以及总价渲染到页面对应位置
					for(let i = 0; i < arr.length; i++){
						if(arr[i].id === id){
							arr[i].num--;
							arr[i].totalPrice = arr[i].num * price;
							totalPrice = arr[i].totalPrice;
						}
					}
					$(this).siblings(".shoppingcar_num").html(num);
					$(this).parent().siblings(".shoppping_totalprice").children("span").html(totalPrice);
	
				}
				//将修改以后的数据存入cookie
				$.cookie("cart",JSON.stringify(arr),{
					path:"/"
				});
				
				shoppingcar_price(arr);
				header.addcar();
				//减去的时候会涉及到删除节点，所以对当前cookie对应的数组进行判断，如果等于0，即cookie中没有数据，购物车是空的
				//所以要将提示语句显示出来
				if(arr.length === 0){
					$("#shopping_replace").css({display:"block"});
				}
				
			})

			//删除
			$(".shopping_delete").on("click",function () { 
				//删除当前商品，获得当前商品的id，通过当前id找到cookie中对应的数组中的数据进行删除操作
				let id = $(this).parent().parent().parent().parent().attr("data-id");
				$(arr).each(function(index,item){
					if(item.id === id){
						arr.splice(index,1);
					}
				})
				//将删去一条信息的数组重新存入cookie，将之前的覆盖
				$.cookie("cart",JSON.stringify(arr),{
					path:"/"
				});
				//删去对应的DOM节点
				$(this).parent().parent().parent().parent().remove();

				shoppingcar_price(arr);
				//因为删除操作关系到header里面购物车对应的数量，所以要调用header中的方法更新一下header中的购物车商品数量
				header.addcar();
				//判断购物车中是否还有商品，如果没有，提示信息显现
				if(arr.length === 0){
					$("#shopping_replace").css({display:"block"});
				}
			 })
			 //结算
			 $("#shoppingcar_account").on("click",function(){
				 //如果user的cookie有表示已经登录了，跳转到结算页面
				//如果购物车里面没有商品，提示用户先添加商品
				 if($.cookie("cart")){
					 //判断用户是否是登录状态，如果是的话进入结算页面，如果不是就提示用户登录以后才能结算
					if($.cookie("user")){
						location.href = "/html/account.html"	
					}else{
						if(confirm("请先登录再进行结算!")){
							location.href = "/html/login.html"	
						}
					}
				 }else{
					 alert("请先添加商品到购物车再进行结算");
				 }
				
			 })
		})
    })

})