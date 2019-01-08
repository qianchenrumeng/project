define(["jquery", "template"], ($, template) => {
	function Item(){

	}

	Item.prototype.init = function(url){
		//先load到页面上，得到url，然后去请求数据,渲染结构，
		
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
				success: function(res){
					
					console.log(res.res_data);

					if(res.res_code === 1){
						
						let list = res.res_data;
						
						//通过模板引擎渲染结构
						let html = template("list-template", {list});
						
						$(".list-item").html(html);
						
						$(".jump").on("click",function(e){
							var target = e.target;
							console.log(target);
							location.href = "/html/details.html?id=" + $(".jump").data('id');
						})

					}
				}
			})
		})
		
		
	}

	return new Item();
})