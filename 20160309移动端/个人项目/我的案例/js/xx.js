function getEle(ele) {
    return document.querySelector(ele);
}
// ƥ����Ļ
var main = getEle("#main");
var winW = document.documentElement.clientWidth;
var winH = document.documentElement.clientHeight;
var desW = 640;
var desH = 1008;
if (winW / winW <= desW / desH) {
    main.style.webkitTransform = "scale(" + winH / desH + ")"
} else {
    main.style.webkitTransform = "scale(" + winW / desW + ")"
}
//��������
var num = 0;
function fnLoad() {
    var progress = getEle(".progress");
    var loading = getEle("#loading");
    var arr = ['phoneBg.jpg', 'cubeBg.jpg', 'cubeImg1.png', 'cubeImg2.png', 'cubeImg3.png', 'cubeImg4.png', 'cubeImg5.png', 'cubeImg6.png', 'phoneBtn.png', 'phoneKey.png', 'messageHead1.png', 'messageHead2.png', 'messageText.png', 'phoneHeadName.png'];
    for (var i = 0; i < arr.length; i++) {
        var oImg = new Image();
        oImg.src = "img/" + arr[i];
        oImg.onload = function () {
            num++;
            progress.style.width = num / arr.length * 100 + "%";

            if (num == arr.length && loading) {
                progress.addEventListener("webkitTransitionEnd", function () {
                    main.removeChild(loading);
                    loading = null;
                }, false);
            }
        }
    }
}
fnLoad()



var fnPhone = {
    init:function(){
        this.phone =getEle("#phone");
        //click����300������ӳ�
        this.phone.addEventListener("click",this.touch,false)
    },
    touch:function(e){
        var target = e.target;
        if(target.className==="listenTouch"){
            target.parentNode.style.display = "none";
            fnPhone.speaker.style.webkitTransform ="translase(0,0)"
        }else if(target.className==="hangUp"){
            fnPhone.closePhone()
        }
    },
    closePhone:function(){ //
        var that = this;
        window.setTimeout(function(){
            this.prone.style.webkitTransform ="translase(0,"+desH+")"
            main.removeChild(that.phone)
        })

    }
};
fnPhone.init() /*��ʼ��*/



function fnMessage(){
//    ��ʼ�����صģ�ÿ��1һ�����һ�Σ�����ÿ���ƶ���û��ƫ�Ƶ�λ��
//    ����3��li֮��ul���������ƶ�
//    ���е�li��������massage��ɾ����������ħ��ҳ��
    var message = getEle("massage");
    var oLi = document.querySelectorAll("#massage>ul>li");
    var oUl = getEle("#massage>ul");
    var num =0; /*��ʼ������*/
    var h=num;
    var timer = window.setInterval(function(){
        if(num==oLis.length){
            window.clearInterval(timer);
            main.removeChild(message);
            return
        }
        var oLis = oLi[num]
        oLis.style.opacity =1 /*��һ����ʾ*/
        oLis.style.webkitTransform = "translate(0,0)";
        h+=oLis.offsetHeight;
        if(num>=3){
            oUl.style.webkitTransform = "translate(0,-"+h+"px)"
        }
        num++
    },1000)
}


















