function Cart() {
    this.products=[]; //产品信息
    this.sum=0; //产品个数
    this.allPrice=0; //
}
Cart.prototype={
    bindBasic:function () {
        $('.total_right').html(this.getAllPrice());//总价多少
        $('.rate').html(this.getSum()); //商品数量
    },
    bindList:function () {
        var str ='';
        //存储的是产品的信息，将产品循环，并绑定在数据上
       for(var i=0; i<this.products.length;i++){
           str+='<div class="cart_box">';
                str+='<div class="message">';
                   str+=' <div class="alert-close"> </div>';
                   str+=' <div class="list_img"> <img src="'+this.products[i].images[0].small+'" class="img-responsive" alt=""/> </div>';
                   str+=' <div class="list_desc" style="overflow:hidden;"><h4><a href="#">'+this.products[i].name+'</a></h4><span class="actual">'+ this.products[i].groupbugPrice+'</span></div>';
                   str+=' <div class="clearfix"></div>';
                   str+='  <div class="clearfix"></div>';
                str+='</div>';
           str+='</div>'
       }
        $('.shopping_cart').html(str);//绑定数据

    },
    //结算
    calcalate:function () {
        this.sum = this.products.length;
        return this.sum
    },
    //获取商品数量
    getSum:function () {
        this.sum = this.products.length;
        return this.sum
    },
    //获取产品总价
    getAllPrice:function () {
        //循环添加后的内容
        this.allPrice=0;
        for (var i=0;i<this.products.length;i++){
            //转化为数字
            this.allPrice += parseInt(this.products[i].groupbugPrice)
        }
        return this.allPrice; //获取总价
    },

    //删除 产品
    deleteProducts:function (i) {

        if ( this.products.length >0) {

            this.products.splice(i,1);

console.log(  this.products)
        }
    }
};