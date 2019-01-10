//结算的业务逻辑
require(["./requirejs.config"], () => {
	//引入account需要依赖的模块
	require(["jquery", "template","header","footer","cookie"], ($,template,header) => {
        $(function(){
            //因为购物车页面没有全选多选，所以进入结算页面的肯定就是所有要购买的商品
            //将数据从cookie中取出来，渲染结算页面
			var arr = JSON.parse($.cookie("cart"));
			let html = template("list-template", {arr});
				$(".shoppingcar").html(html);
				
				shoppingcar_price(arr);

			function shoppingcar_price(arr) {  
				//计算价格
				var shoppingcar_total = 0;
				//因为页面是根据取出的cookie中的数据渲染的，所以算总价就不用再从页面获取数据，直接计算cookie中取出的数据就可以了
				for(let i = 0; i < arr.length; i++){
					shoppingcar_total += arr[i].totalPrice;
				}
			
			
				var carriage = 0;
			
				$("#shopping_total").text(carriage+shoppingcar_total);
			}
            //给结算按钮绑定事件
            $("#account_account").on("click",function(){
                //先获取用户输入的地址和电话
                let address = $(".address").children().children("input").val();
                let tel =  $(".tel").children().children("input").val();
                //如果有一个没有填写都结算不成功，并且要提示用户输入
                if(address === "" || tel === ""){
                    alert("请输入收货地址和联系电话！");
                }else{
                    //结算完以后就要将该条cart的cookie删除
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