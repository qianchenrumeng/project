define(["jquery", "template","cookie"], ($, template) => {
	function Item(){

	}

	Item.prototype.init = function(url,header){
		//先load到页面上，得到url，然后去请求数据,渲染结构，
		this.header = header;
		//load
		new Promise((resolve, reject) => {
			//console.log(url);
			
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
		let _this = this;
		$(".addShoppingcar").on("click",function(){
			
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
					//将记录数量的变量加一
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