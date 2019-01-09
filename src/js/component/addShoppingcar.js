define(["jquery","cookie"],() => {
    class addShoppingcar{
        constructor(){
            this.init();
        }
        init(){
            console.log("shopping");
            console.log($(".addShoppingcar"));
            $(".addShoppingcar").on("click",function(){
                console.log("akdasd");
               let carParent = this.parent().parent();
               console.log(carParent);
            })
        }
    }
    return new addShoppingcar();
})