$(document).ready(function () {
   //产品相关
   //开始编程
   //实例化

    var product = new Product();
    product.name ='Apple Watch Series 3智能手表（GPS+蜂窝网络款 42毫米 深空灰色铝金属表壳 黑色运动型表带 MQQT2CH/A）'; //标题名字
    product.description ='【激情六月】乐享运动，更防水，更自由，更来电！享6期白条免息，更有精美表带相赠，售完即止'; // 产品描述
    product.normalPrice ='3288.00'; //原价
    product.groupbugPrice ='2788.00';//团购价
    product.bugSum ='100'; //多少人购买
    product.images =[
        {small:'./images/s11.jpg',big:'./images/s11.jpg'},
        {small:'./images/s12.jpg',big:'./images/s12.jpg'},
        {small:'./images/s13.jpg',big:'./images/s13.jpg'}
    ]

    //使用对象的方法和属性
    product.bingDomImages(); //绑定图片
    product.bingDomDetail(); //绑定图片
    product.bingEvevts(); //绑定图片



    //购物车商品
    var cart = new Cart();
    cart.sum=100;
    cart.allPrice=0;

    //存储的是 商品信息;

    cart.products.push(product);
    cart.products.push(product);

    //方法购物车执行
    cart.bindBasic(); // 基础信息加载
    cart.bindList(); // 绑定列表


    //添加购物车功能
    $("#btnaddcart").click(function () {
        //向购物车中添加产品
            cart.products.push(product)
        //从新调用购物车方法
        cart.bindBasic();
        cart.bindList();
    })

    //点击只执行一次的解决办法
    $('.shopping_cart').on('click','.alert-close', function(c){
        var index = $(".shopping_cart .message").index($(this).parent('.message'));

        cart.deleteProducts(index);
        cart.bindList();
        cart.bindBasic();
    })


});