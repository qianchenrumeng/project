//首页的业务逻辑
require(["./requirejs.config"], () => {
	//引入index需要依赖的模块
	require(["jquery","template","item", "header","footer"], ($,template,item,header) => {
        $(function(){
			//获取id
			let arrSearch = location.search.slice(1).split("=");
			let searchObj = {};
			searchObj[arrSearch[0]] = arrSearch[1];
	  
			$.ajax({
			  url:"http://rap2api.taobao.org/app/mock/123500/details",
			  type:"GET",
			  data: searchObj,
			  dataType:"json",
			  success: function(res){
				let list = res.res_data;
						
				// //通过模板引擎渲染结构
				 let html = template("detail-template", {list});
						
				$(".detail").html(html);
					addshoppingcar();
			  }
	  
			})

		function	addshoppingcar(){
			$(".details_addShoppingcar").on("click",function(){
		
				 let carParent = $(this).parent().parent();
				 let name = $(carParent).children("li").children("h3").html();
				 let id = $(carParent).attr("data-id");
				 let englishName = $(carParent).children("#details_englishName").children("p").html();
				 let color = $(carParent).children("#details_color").children("p").html();
				 let img = $(carParent).siblings().attr("src") ;
			   let size = $(this).siblings("#details_size").children("span").html();
				 let price = $(this).siblings("#details_price").children("span").children("b").html();
					let num = 1;
					let totalPrice =num * price;

				 var goodsObj = {id,name,englishName,color,img,price,size,num,totalPrice};
	
				 var arr = [];
				 if($.cookie("cart")){
				//JSON.parse() 方法用于将一个 JSON 字符串转换为对象。
				var arr = JSON.parse($.cookie("cart"));
				}else{
				
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
			
			
	
				$.cookie("cart",JSON.stringify(arr));
			})
		}

			item.init("http://rap2api.taobao.org/app/mock/123500/recommend",header);
	  
		  })
    })

})