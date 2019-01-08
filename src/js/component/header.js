define(["jquery"], () => {
	class Header{
		constructor(){
			this.init();
		}
		init(){
			//加载header.html
			new Promise((resolve, reject) => {
				$("header").load("/html/component/header.html", () => {
					resolve();
				})
			}).then(() => {
				this.nav();
			})
		}
		nav(){
			$(".nav").on("click", "li", function(){
				location.href = "/html/list.html";
			})
		}
	}
	return new Header();
})