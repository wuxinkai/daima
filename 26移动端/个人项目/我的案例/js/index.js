(function(){
    var main = document.querySelector("#main");
    var oLis = document.querySelectorAll("#list>li");
    var winW = window.innerWidth;  //�豸�Ŀ�
    var winH = window.innerHeight;  // �豸�ĸ�
//    ������Ƹ�Ŀ�ߣ�Ҳ���Ǳ����Ŀ���
    var desW = 640;
    var desH = 960;
//����Ļ����Ƹ�ȱ�����
    main.style.webkitTransform = "scale("+winH/desH+")";  //css3������

//----------------------------�ȱȱ���ͼ------------------------------------
//    ���ݵ��¼���
//    touchstart�����û���ָ��һ��ҳ��Ԫ�ذ����Ǵ���
//    touchmove�� ���û���ָ�϶�һ��ҳ��Ԫ��ʱ�򴥷���
//    touchend,  ���û���ָ��һ��ҳ��Ԫ�����ɿ�ʱ�򴥷�;


//    �����������Զ�������,����

//    touches        �û���ָ��(��Ļ��)�Ĵ�����ļ��ϣ�
//    targetTouches  �û��ڣ�ҳ�棩������ļ���
//    changedTouches �ֱ����¼����漰���������е�ļ���, touchendֻ�������changedTouches����б��У���������������б���

//    ��ÿ��ͼƬ���¼�
    for(var i=0; i<oLis.length; i++){
        var cur = oLis[i];
        cur.index = i;// �������������»�����ʱ����Ҫ
        cur.addEventListener("touchstart",start,false);  //����
        cur.addEventListener("touchmove",move,false); //�ƶ�
        cur.addEventListener("touchend",end,false); //����
    }
//    ����
        function start(e){

            //console.log(e.changedTouches)

            //clientX: 252.5
            //clientY: 266.25
            //force: 1
            //identifier: 0
            //pageX: 252.5    �����ڣ�ҳ���ϣ�ˮƽ�ʹ�ֱ�ķ���������
            //pageY: 266.25
            //radiusX: 14.375   �ڣ���Ļ�ϵģ�ˮƽ�����ʹ�ֱ����
            //radiusY: 14.375
            //rotationAngle: 0
            //screenX: 228
            //screenY: 424
            //target: li.zIndex  ���Դ�����Ԫ��
            //__proto__: Touch
            //length: 1
            //__proto__: TouchList
            this.start = e.changedTouches[0].pageY;//���������»���ֻҪ��סY��Ϳ���  ,start�ǰ��µ�λ��
    }
//    �ƶ�
        function move(e){
            this.flag =true;
            var temp =1/4;
            var moveY = e.changedTouches[0].pageY;  //��¼�ƶ�����ֵ

//    move��start��ֵС�������ϻ�����move��start�Ĵ�������»�����
            var changePos = moveY - this.start;
            var cur=this.index; //������ǵ�ǰ���ŵ�����

//    ���������أ���zingde����ʾ
            for(var i=0 ; i<oLis.length;i++){
                if(!i==cur){  //���i�����ڵ�ǰҲ������У�������
                    oLis[i].style.display ="none";

                }
                oLis[i].className=""
            }

            if(changePos>0){  //���»���
                this.prevsIndex = cur ==0?oLis.length-1:cur-1;  //�����ǰ������0�Ļ����ǵ�һ�ţ�����������һ�ž�����-1 �� �����������Զ�������
                var presPos = -winH+changePos;

            }else if(changePos<0){  //���ϻ���
              this.prevsIndex = cur==oLis.length-1?0:cur+1;   //�жϵ�ǰ������ǲ������һ�����������һ���͵���0���������һ��������������������+1  ,�������ֵ���� this.prevsIndex
                var presPos =winH+changePos;//�������ϻ���ʱ��changePos�Ǹ������豸�ĸ߶�+changePos��ֵ�� ����Խ��ԽС
            }
            var scalePos = 1-Math.abs(changePos)/winW*temp;  //�������Ҫ
            oLis[cur].style.webkitTransform ='scale('+scalePos+') translate(0,'+changePos+'px)';  //��ͼƬ�������ŵ�Ч��

            oLis[this.prevsIndex].style.webkitTransform = 'translate(0,'+presPos+'px)'//��һ��ͼƬ��Ч��
            oLis[this.prevsIndex].style.display ="block";
            oLis[this.prevsIndex].className ="zIndex"
        }
//    ����
        function end(e){
            if(this.flag){
                oLis[this.prevsIndex].style.webkitTransform ='translate(0,0)';
                oLis[this.prevsIndex].style.webkitTransform ='.5s'; //���Ϲ���Ч��
                oLis[this.prevsIndex].addEventListener('webkitTransitionEnd',transitionend,false)
            }
        //�������ϻ��������»�����Ҫ�ص���ԭʼ��λ��

        }
//end ���������
        function transitionend(){
            this.style.webkitTransition =""
        }



})();
