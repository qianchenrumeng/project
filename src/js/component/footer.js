//footer模块的逻辑
define(["jquery"], () => {
    class Footer{
        constructor(){
            this.init();
        }
        init(){
            //resolve表示回调成功，reject表示失败
            new Promise((resolve,reject) => {
                //将footer。html渲染到该页面中的footer标签里面
                $("footer").load("/html/component/footer.html", () =>{
                    resolve();
                })
            }).then(() => {
                this.nav();
            })
        }
        nav(){
            //因为没有外界界面，所以给每一个a标签绑定跳转到百度的链接
           $(".footer").find("a").on("click",function () {
                location.href = "http://baidu.com";
             })
        }
    }
    return new Footer();
})