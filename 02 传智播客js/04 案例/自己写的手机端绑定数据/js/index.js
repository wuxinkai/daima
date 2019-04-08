window.onload =function () {
    var data =[
        {title:'京东商品',comments:100,source:'新浪网',date:'2017-07-8',images:'images/head.jpg',introduce:'梯子 包邮 家用梯子 折叠梯 加厚铝合金人字 人字梯 楼梯伸缩扶梯 室内装修爬梯康鹏 新款加固铝合金 5步梯'},
        {title:'京东商品',comments:100,source:'新浪网',date:'2017-07-8',images:'images/head.jpg',introduce:'梯子 包邮 家用梯子 折叠梯 加厚铝合金人字 人字梯 楼梯伸缩扶梯 室内装修爬梯康鹏 新款加固铝合金 5步梯'},
        {title:'京东商品',comments:100,source:'新浪网',date:'2017-07-8',images:'images/head.jpg',introduce:'梯子 包邮 家用梯子 折叠梯 加厚铝合金人字 人字梯 楼梯伸缩扶梯 室内装修爬梯康鹏 新款加固铝合金 5步梯'},
        {title:'京东商品',comments:100,source:'新浪网',date:'2017-07-8',images:'images/head.jpg',introduce:'梯子 包邮 家用梯子 折叠梯 加厚铝合金人字 人字梯 楼梯伸缩扶梯 室内装修爬梯康鹏 新款加固铝合金 5步梯'},
        {title:'京东商品',comments:100,source:'新浪网',date:'2017-07-8',images:'images/head.jpg',introduce:'梯子 包邮 家用梯子 折叠梯 加厚铝合金人字 人字梯 楼梯伸缩扶梯 室内装修爬梯康鹏 新款加固铝合金 5步梯'},
        {title:'京东商品',comments:100,source:'新浪网',date:'2017-07-8',images:'images/head.jpg',introduce:'梯子 包邮 家用梯子 折叠梯 加厚铝合金人字 人字梯 楼梯伸缩扶梯 室内装修爬梯康鹏 新款加固铝合金 5步梯'},
    ]

    var str ='';
    var container = document.getElementById('container');
    for(var i=0; i<data.length; i++){
        var news = new News();
        news.title =data[i].title;
        news.comments =data[i].comments;
        news.source =data[i].source;
        news.date =data[i].date;
        news.images =data[i].images;
        news.introduce =data[i].introduce;
        str+=news.bindListDom()
    }
    container.innerHTML=str;
};

