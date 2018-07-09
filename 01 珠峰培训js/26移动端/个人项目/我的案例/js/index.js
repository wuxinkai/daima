(function(){
    var main = document.querySelector("#main");
    var oLis = document.querySelectorAll("#list>li");
    var winW = window.innerWidth;  //设备的宽
    var winH = window.innerHeight;  // 设备的高
//    我们设计稿的宽高，也就是背景的宽宽高
    var desW = 640;
    var desH = 960;
//让屏幕与设计稿等比缩放
    main.style.webkitTransform = "scale("+winH/desH+")";  //css3的缩放

//----------------------------等比背景图------------------------------------
//    兼容的事件：
//    touchstart，当用户手指在一个页面元素按下是触发
//    touchmove， 当用户手指拖动一个页面元素时候触发；
//    touchend,  当用户手指从一个页面元素上松开时候触发;


//    上面三个属性都有以下,属性

//    touches        用户手指在(屏幕上)的触碰点的集合；
//    targetTouches  用户在（页面）触碰点的集合
//    changedTouches 又本次事件所涉及到到的所有点的集合, touchend只会包含在changedTouches这个列表中，不会包含上两个列表中

//    给每个图片绑定事件
    for(var i=0; i<oLis.length; i++){
        var cur = oLis[i];
        cur.index = i;// 保存索引，上下滑动的时候需要
        cur.addEventListener("touchstart",start,false);  //按下
        cur.addEventListener("touchmove",move,false); //移动
        cur.addEventListener("touchend",end,false); //松手
    }
//    按下
        function start(e){

            //console.log(e.changedTouches)

            //clientX: 252.5
            //clientY: 266.25
            //force: 1
            //identifier: 0
            //pageX: 252.5    触碰在（页面上）水平和垂直的方向的坐标点
            //pageY: 266.25
            //radiusX: 14.375   在（屏幕上的）水平坐标点和垂直坐标
            //radiusY: 14.375
            //rotationAngle: 0
            //screenX: 228
            //screenY: 424
            //target: li.zIndex  属性触摸的元素
            //__proto__: Touch
            //length: 1
            //__proto__: TouchList
            this.start = e.changedTouches[0].pageY;//我们是上下滑动只要记住Y轴就可以  ,start是按下的位置
    }
//    移动
        function move(e){
            this.flag =true;
            var temp =1/4;
            var moveY = e.changedTouches[0].pageY;  //记录移动的数值

//    move比start的值小就是往上滑动，move比start的大就是往下滑动的
            var changePos = moveY - this.start;
            var cur=this.index; //保存的是当前这张的索引

//    让其他隐藏，带zingde的显示
            for(var i=0 ; i<oLis.length;i++){
                if(!i==cur){  //如果i不等于当前也面的所有，就隐藏
                    oLis[i].style.display ="none";

                }
                oLis[i].className=""
            }

            if(changePos>0){  //向下滑动
                this.prevsIndex = cur ==0?oLis.length-1:cur-1;  //如果当前索引是0的话就是第一张，如果不是最后一张就让他-1 ， 最后把她赋给自定义属性
                var presPos = -winH+changePos;

            }else if(changePos<0){  //向上滑动
              this.prevsIndex = cur==oLis.length-1?0:cur+1;   //判断当前的这个是不是最后一个不是是最后一个就等于0，不是最后一个，就让他，等于索引+1  ,最后把这个值赋给 this.prevsIndex
                var presPos =winH+changePos;//当我往上滑的时候changePos是负数，设备的高度+changePos的值， 最后会越来越小
            }
            var scalePos = 1-Math.abs(changePos)/winW*temp;  //方向很重要
            oLis[cur].style.webkitTransform ='scale('+scalePos+') translate(0,'+changePos+'px)';  //对图片进行缩放的效果

            oLis[this.prevsIndex].style.webkitTransform = 'translate(0,'+presPos+'px)'//下一张图片的效果
            oLis[this.prevsIndex].style.display ="block";
            oLis[this.prevsIndex].className ="zIndex"
        }
//    松手
        function end(e){
            if(this.flag){
                oLis[this.prevsIndex].style.webkitTransform ='translate(0,0)';
                oLis[this.prevsIndex].style.webkitTransform ='.5s'; //加上过渡效果
                oLis[this.prevsIndex].addEventListener('webkitTransitionEnd',transitionend,false)
            }
        //无论往上滑还是往下滑动都要回到最原始的位置

        }
//end 的清楚功能
        function transitionend(){
            this.style.webkitTransition =""
        }



})();
