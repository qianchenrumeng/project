require(["./requirejs.config"], () => {
	require(["jquery", "item",  "header","footer"], ($, item) => {
		item.init("http://rap2api.taobao.org/app/mock/123500/lipstick");
	})
})