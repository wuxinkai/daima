//定义产品对象
function Product() {
    this.name =''; //标题名字
    this.description =''; // 产品描述
    this.normalPrice =''; //原价
    this.groupbugPrice ='';//团购价
    this.bugSum =''; //多少人购买
    this.images =[

    ]
}
Product.prototype={
    //普通购买
    buy:function () {

    },
    //字符串拼接绑定图片
    bingDomImages:function () {
        var str ='';
        for (var i=0;i<this.images.length;i++){
            str+='<li>';
                str+='<img class="etalage_thumb_image" src="'+this.images[i].small+'" class="img-responsive" />';
                str+='<img class="etalage_source_image"  src="'+this.images[i].small+'" class="img-responsive" />';
            str+='</li>'
        }
        $('#etalage').html(str)


        //利用插件，让右侧菜单显示
        $("#etalage").etalage({
            thumb_image_width:300,
            thumb_image_height:400,
            show_hint: true,  //动画

        })
    },
    //jquery实现幻灯片放映


    //绑定详细信息
    bingDomDetail:function () {
        $("#pname").html(this.name);
        $("#description").html(this.description);
        $("#price").html(this.normalPrice);
        $("#groupPrice").html(this.groupbugPrice);
        $("#buyCount").html(this.bugSum);
    },
    //绑定事件
    bingEvevts:function () {
        $("#dropdownlist").onclick =function () {
            alert('1')
        },
        $("#btnbuy").click(function () {
            alert("立即购买")
        })
    },
    //团购
    groupBuy:function () {

    },
    //添加购物车
    addCart:function () {

    }
};