function Imgs() {
    this.id =null,
    this.name ='',
    this.img =''
}
Imgs.prototype ={
    //绑定图片
    bindListDom:function (data) {
        var oUl = document.getElementById("oUl");
        var point = document.getElementById("point");


        var str='';
        for (var i=0;i<data.length;i++){
            str+='<li id="'+data[i].id+'">';
            str+='<img src="'+data[i].img+'" style="width: 100%" name="'+data[i].name+'">';
            str+='</li>';
        }
        this.bindList(data,1);
        var list_str = '<img style="width: 100%" src="'+data[0].img+'" />';
        var li = document.createElement("li");
        li.innerHTML =list_str;

        var list_str2 = '<img style="width: 100%" src="'+data[data.length-1].img+'" />';
        var li2 = document.createElement("li");
        li2.innerHTML =list_str2;

        oUl.innerHTML =str;
        oUl.insertBefore(li2,oUl.childNodes[0]);
        oUl.appendChild(li);
        this.carouselAnimation(data)
    },
    //绑定按钮
    bindList:function (data,item) {
        var str='';
        for (var i=0;i<data.length;i++){
            if(data[i].id ==item){
                str+='<span class="current"></span>';
            }else {
                str+='<span></span>';
            }
        }
        document.getElementById('point').innerHTML =str
    },
    carouselAnimation:function (data) {
        var oLi = oUl.getElementsByTagName('li');
        //手动轮播
        var viewWidth = window.innerWidth; //获取屏幕宽度
        var nowTrn = 1;
        var start =null; //开始
        var move =null; //结束
        var point =document.getElementById('point').getElementsByTagName('span'); //获取小图标按钮
        oUl.style.transform ='translate('+(-nowTrn*viewWidth)+'px,0px)';

        for (var i=0 ;i<oLi.length-1;i++){
            var oImg = oLi[i].getElementsByTagName('img')[0];
            oImg.addEventListener('touchstart',function (e) {
                clearInterval(iCount); //关闭定时器
                start = e.touches[0].clientX
            },false);

            oImg.addEventListener('touchmove',function (e) {
                move= e.touches[0].clientX-start;
                oUl.style.transform = 'translate('+(-nowTrn*viewWidth+move)+'px,0px'

            },false);

            oImg.addEventListener('touchend',function(e){
                if(move>viewWidth*.1){
                    nowTrn --;
                }else if(move<-viewWidth*.1){
                    nowTrn++;
                }
                oUl.style.transition='transform .3s ease 0s';
                oUl.style.transform='translate('+(-nowTrn*viewWidth)+'px,0px)';
                oUl.addEventListener('transitionend',function () { //transitionend 事件在 CSS 完成过渡后触发。
                    this.style.transition ='none';
                    console.log(nowTrn);
                    if(nowTrn==0){
                        nowTrn = data.length
                    }else if(nowTrn==oLi.length-1){
                        nowTrn=1;
                    }
                    for (var i=0;i<data.length;i++){
                        point[i].className ='blur'
                    }
                    point[nowTrn-1].className='current';
                    oUl.style.transform='translate('+(-nowTrn*viewWidth)+'px,0px)';
                },false);
                start=null;
                move=null;
                iCount = setInterval(action,3000)
            },false)
        }
        // 自动轮播
        function action() {
            if(nowTrn>data.length) return;

            nowTrn++;
            oUl.style.transition = 'transform .3s ease 0s';
            oUl.style.transform = 'translate('+(-nowTrn*viewWidth)+'px,0px)';
        }
        oUl.addEventListener('transitionend',function () {
            this.style.transition ='none';
            if(nowTrn==0){
                nowTrn = data.length
            }else if(nowTrn>data.length){
                nowTrn=1;
            }
            for(var i=0;i<data.length;i++){
                point[i].className='blur';
            }
             console.log(nowTrn);
            point[nowTrn-1].className='current';
            this.style.transform='translate('+(-nowTrn*viewWidth)+'px,0px)';
        },false)
        var iCount = setInterval(action,3000);
    }
};

var oUl = document.getElementById("oUl");
var point = document.getElementById("point");
var oLi = oUl.getElementsByTagName('li');
window.onload=function () {

    var data =[
        {id:1,name:'第1张banner图',img:'img/l1.jpg'},
        {id:2,name:'第2张banner图',img:'img/l2.jpg'},
        {id:3,name:'第3张banner图',img:'img/l3.jpg'},
        {id:4,name:'第4张banner图',img:'img/l4.jpg'},
        {id:5,name:'第5张banner图',img:'img/l5.jpg'},
        {id:6,name:'第6张banner图',img:'img/l6.jpg'},
        {id:7,name:'第7张banner图',img:'img/l7.jpg'},
        {id:8,name:'第8张banner图',img:'img/l8.jpg'},
    ];
    var imgs = new Imgs();
    imgs.bindListDom(data)





};

