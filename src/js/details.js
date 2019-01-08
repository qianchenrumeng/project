//首页的业务逻辑
require(["./requirejs.config"], () => {
	//引入index需要依赖的模块
	require(["jquery","template","item", "header","footer"], ($,template,item) => {
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
			
			  }
	  
			})

			item.init("http://rap2api.taobao.org/app/mock/123500/recommend");
	  
		  })
    })

})