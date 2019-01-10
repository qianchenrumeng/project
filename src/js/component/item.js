//商品展示的模板的业务逻辑
define(["jquery", "template","cookie"], ($, template) => {
	//构造函数
	function Item(){

	}

	Item.prototype.init = function(url,header){
		//先load到页面上，得到url，然后去请求数据,渲染结构，
		//因为每一次添加购物车事件都要都可能引起header的购物车里面的数量的显示的变化
		//因为在每个页面都引入了header模块，在引入了item模块的页面也引入了header
		//在调用item的init方法的时候传入后端接口的uel以及heaer，这样在item中就可以调用header的方法了
		//接收的header就加在当前对象中去
		this.header = header;
		//load
		new Promise((resolve, reject) => {
			//console.log(url);
			//将当前模板的html加载到当前页面的指定模块中
			$(".list-item").load("/html/component/item.html", () => {
				resolve();
			})
		}).then(() => {
	
			$.ajax({
				url: url,
				type: "get",
				success: (res) => {
					
					// console.log(res.res_data);

					if(res.res_code === 1){
						
						let list = res.res_data;
						
						//通过模板引擎渲染结构
						let html = template("list-template", {list});
						
						$(".list-item").html(html);
						// console.log(html);
						//给每一个单独的模块都要绑定事件，点击就跳转到详情页面，并且将当前商品id传过去
						$(".jump").on("click",function(e){
							var target = e.target;
							
							location.href = "/html/details.html?id=" + $(".jump").data('id');
						})
						this.addShoppingcar();

					}
				}
				
			})
			
		})
		
	}

	Item.prototype.addShoppingcar = function(){
		//因为在调用header的时候是在按钮的监听事件里面，会改变this的指向，所以先用一个变量保存当前this指向
		let _this = this;
		//给每一个添加购物车按钮绑定点击事件
		$(".addShoppingcar").on("click",function(){
			//每次点击以后就获取相关的数据，然后存到一个对象里面
		   let carParent = $(this).parent().parent();
		   let name = $(carParent).children("dt").children("h5").html();
		   let id = $(carParent).children("dt").attr("data-id");
		   let englishName = $(carParent).children("dt").children(".englishName").html();
		   let color = $(carParent).children("dt").children(".color").html();
		   let img = $(carParent).children("dt").children(".img").attr("src") ;
			let size = $(carParent).children("dt").children(".size").children("span").html();
		   let price = $(this).siblings().children("b").html();
			  let num = 1;
			  let totalPrice =num * price;
		   var goodsObj = {id,name,englishName,color,img,price,size,num,totalPrice};

		   var arr = [];
		   //先判断cookie是否存了cart这条数据，如果存了就取出来转成一个json数组
		   if($.cookie("cart")){
			//JSON.parse() 方法用于将一个 JSON 字符串转换为对象。
			var arr = JSON.parse($.cookie("cart"));
			}else{
				// console.log("gyui");
				var arr = [];
			}

			//判断当前的这一条是否已经被添加过了
			//创建一个标志位，记录是否进入过循环
			var flag = true;
			//将上面获得的数组遍历，看本条是否已经存储过了

			for(var i = 0; i < arr.length; i++){
				//如果本条里面的id和从cookie中获得的有一样的，就说明这条已经添加过了
				if(arr[i].id === goodsObj.id){
					//将记录数量的变量加一,并重新获得该商品的总价
					arr[i].num ++;
					arr[i].totalPrice = arr[i].num * arr[i].price;
					flag = false;
					break;
				}
			}
			//flag为true表示没有进入过循环，即之前的cookie中没有存储数据
			if(flag){
				//cookie之前没有存储数据，所以现在直接将本条信息加进去就行
				arr.push(goodsObj);
			}
			//i等于length表示已经循环完毕也没有找到一样的，所以直接插入就行
			if(i === arr.length){
				arr.push(goodsObj);
			}
			// console.log(goodsObj);
		

			$.cookie("cart",JSON.stringify(arr),{
				path:"/"
			});
			_this.header.addcar();
		})
	}

	return new Item();
})