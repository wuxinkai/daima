

var product =  new Product()
//ҳ���ҵ���߼�
$(document).ready(function(){
    $$.myAjax('http://localhost/data/product.json',function(e){
        var json = JSON.parse(e);
        /*��ʼ���*/
        /*��Ʒ���*/
        /*ʵ����*/
        product.name=json.name;
        product.description=json.description
        product.normalPrice=json.price;
        product.groupbuyPrice=json.youhuijia;
        product.buySum=json.sum;
        product.images=[
            {small:'images/s11.jpg',big:'images/s11.jpg'},
            {small:'images/s12.jpg',big:'images/s12.jpg'},
            {small:'images/s13.jpg',big:'images/s13.jpg'}
        ]
        /*ʹ�ö����еķ�������*/
        product.bindDOMDetail()
        product.bindDOMImage()

        /*���¼�*/
        $('#btnaddcart').click(function(){
            /*���ﳵ����һ����Ʒ*/
            cart.products.push(product)
            ///*���¹��ﳵ - ���°󶨹��ﳵ*/
            /*�������װ������Ϳ��ܲ��������ظ�*/
            cart.bindBasic()
            cart.bindList()
            $(window).scrollTop(0);
        });

    });


    /*ʵ�����ﳵ*/
    var cart =  new Cart()
    cart.sum=3
    cart.allPrice=2000

    /*���蹺�ﳵ���Ѿ���������Ʒ*/
    cart.products.push(product)
    cart.products.push(product)
    cart.products.push(product)

    /*ʹ�ö����еķ�������*/
    cart.bindBasic()
    cart.bindList()

});