require(["./requirejs.config"], () => {
	require(["jquery", "item",  "header","footer"], ($, item,header) => {
		//list页面做的比较简单，就请求到数据将其渲染到界面上就行了
		
		item.init("http://rap2api.taobao.org/app/mock/123500/lipstick",header);
	
	})
})