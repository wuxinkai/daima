//轮播图
var oUl = document.getElementById("oUl");
var oLi = oUl.getElementsByTagName('li');

//8张图片 创建出10个li， 第10张图片是li1.jpg  最后一张图片 是放到第一个中

for (var i=0; i<oLi.length-1; i++){
    var img = new Image;
    img.src = './img/l'+i+'.jpg';
    img.style.width ='100%';
    oLi[i].appendChild(img); //把图片插入到每个li中

    // 增加两个li 页面滑动起过度作用，障眼法
    console.log(oLi.length-1);
    if(i==1){
        var img2 = new Image();
        img2.src = './img/l'+i+'.jpg';
        img2.style.width='100%';
        oLi[oLi.length-1].appendChild(img2);  //第九个li插入的是第一张图片
    }else if(i==8){ //说明轮训到第九个图片了，马上就第10张图片
        var img2 = new Image();
        img2.src = './img/l'+i+'.jpg';
        img2.style.width='100%';
        oLi[0].appendChild(img2);
    }
}

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
        oUl.style.transform='translate('+(-nowTrn*viewWidth)+'px,0px)'
        oUl.addEventListener('transitionend',function () { //transitionend 事件在 CSS 完成过渡后触发。
            this.style.transition ='none';
            if(nowTrn==0){
                nowTrn =8;
            }else if(nowTrn==9){
                nowTrn=1;
            }
            for (var i=0;i<8;i++){
                point[i].className ='blur'
            }
            point[nowTrn-1].className='current';
            oUl.style.transform='translate('+(-nowTrn*viewWidth)+'px,0px)';
        },false)
        start=null;
        move=null;

    },false)
}

// 自动轮播
setInterval(function () {
    if(nowTrn>8) return;
    nowTrn++;
    oUl.style.transition = 'transform .3s ease 0s';
    oUl.style.transform = 'translate('+(-nowTrn*viewWidth)+'px,0px)';
    
    oUl.addEventListener('transitionend',function () {
        this.style.transition ='none';
        if(nowTrn>8){
            nowTrn=1;
        }
        for(var i=0;i<8;i++){
            point[i].className='blur';
        }
        point[nowTrn-1].className='current';
        this.style.transform='translate('+(-nowTrn*viewWidth)+'px,0px)';
    },false)
},3000);
