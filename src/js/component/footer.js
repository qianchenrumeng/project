define(["jquery"], () => {
    class Footer{
        constructor(){
            this.init();
        }
        init(){
            //resolve表示回调成功，reject表示失败
            new Promise((resolve,reject) => {
                $("footer").load("/html/component/footer.html", () =>{
                    resolve();
                })
            }).then(() => {
                this.nav();
            })
        }
        nav(){
            console.log("yes");
        }
    }
    return new Footer();
})