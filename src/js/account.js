//首页的业务逻辑
require(["./requirejs.config"], () => {
	//引入index需要依赖的模块
	require(["jquery", "template","header","footer","cookie"], ($,template,header) => {
        $(function(){
			var arr = JSON.parse($.cookie("cart"));
			let html = template("list-template", {arr});
				$(".shoppingcar").html(html);
				
				shoppingcar_price(arr);

			function shoppingcar_price(arr) {  
				//计算价格
				var shoppingcar_total = 0;
				
				for(let i = 0; i < arr.length; i++){
					shoppingcar_total += arr[i].totalPrice;
				}
			
			
				var carriage = 0;
			
				$("#shopping_total").text(carriage+shoppingcar_total);
			}

            $("#account_account").on("click",function(){
                let address = $(".address").children().children("input").val();
                let tel =  $(".tel").children().children("input").val();
                if(address === "" || tel === ""){
                    alert("请输入收货地址和联系电话！");
                }else{
                    $.cookie("cart",JSON.stringify(arr),{
                        expires:-1,
                        path:"/"
                    });
                    if(confirm("结算成功！")){
                        location.href = "/index.html";
                    }
                }
            })


		})
    })

})