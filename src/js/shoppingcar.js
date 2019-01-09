//首页的业务逻辑
require(["./requirejs.config"], () => {
	//引入index需要依赖的模块
	require(["jquery", "template","header","footer","cookie"], ($,template,header) => {
        $(function(){
			var str = $.cookie("cart");
		
			var arr = [];
			if(str != undefined){
				 arr = JSON.parse(str);
			}
			
			let html = template("list-template", {arr});
				$(".shoppingcar").html(html);
		
				shoppingcar_price(arr);

			function shoppingcar_price(arr) {  
				//计算价格
				var shoppingcar_total = 0;
				
				for(let i = 0; i < arr.length; i++){
					shoppingcar_total += arr[i].totalPrice;
				}
	
				$("#shoppingcar_total").text(shoppingcar_total);
				var carriage = 0;
				$("#shopping_carriage").text(carriage);
				$("#shopping_total").text(carriage+shoppingcar_total);
			}

			//增加
			$(".shoppingcar_add").on("click",function(){
				let id = $(this).parent().parent().attr("data-id");
				let price = $(this).parent().siblings(".shopping_price").children("span").html();
				let num = $(this).siblings(".shoppingcar_num").html();
				let totalPrice ;
				for(let i = 0; i < arr.length; i++){
					if(arr[i].id === id){
						arr[i].num++;
						arr[i].totalPrice = arr[i].num * price;
						totalPrice = arr[i].totalPrice;
					}
				}
				$.cookie("cart",JSON.stringify(arr),{
					path:"/"
				});
				shoppingcar_price(arr);
				$(this).siblings(".shoppingcar_num").html(++num);
				$(this).parent().siblings(".shoppping_totalprice").children("span").html(totalPrice);

				
			})
			//减少
			$(".shoppingcar_subtract").on("click",function(){
				let id = $(this).parent().parent().attr("data-id");
				let price = $(this).parent().siblings(".shopping_price").children("span").html();
				let num = $(this).siblings(".shoppingcar_num").html();
				let totalPrice ;
				if(--num<=0){
					$(arr).each(function(index,item){
						if(item.id === id){
							arr.splice(index,1);
						}
					})
					$(this).parent().parent().remove();
				}else{
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
				
				$.cookie("cart",JSON.stringify(arr),{
					path:"/"
				});

				shoppingcar_price(arr);
				header.addcar();
				
			})

			//删除
			$(".shopping_delete").on("click",function () { 
				let id = $(this).parent().parent().parent().parent().attr("data-id");
				$(arr).each(function(index,item){
					if(item.id === id){
						arr.splice(index,1);
					}
				})
				$.cookie("cart",JSON.stringify(arr),{
					path:"/"
				});
				$(this).parent().parent().parent().parent().remove();
				shoppingcar_price(arr);
				header.addcar();
			 })
			 //结算
			 $("#shoppingcar_account").on("click",function(){
				 //如果user的cookie有表示已经登录了，跳转到结算页面
				//如果购物车里面没有商品，提示用户先添加商品
				 if($.cookie("cart")){
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