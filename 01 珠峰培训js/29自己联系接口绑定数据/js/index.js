//在原型上扩展方法
(function (pro) {
    pro.myTrim = function myTrim() {
        return this.replace(/(^ +| +$)/g,""); //删除开通或者结尾的空格
    };
    pro.mySub = function mySub() {
        var len = arguments[0] || 10;
        var isD =  arguments[1] || false;
        var str = "";
        var n = 0;
        for (var i=0;i<this.length;i++){
            var s = this.charAt(i);
            /[\u4e00-\u9fa5]/.test(s) ? n += 2 : n++; ///[\u4e00-\u9fa5]/.test(s)至少匹配一个汉字的写法,表中的汉字的头和尾。
            if(n>len){
                isD ? str += "..." : void 0; //undefined === void 0，  就是undefined的意思
                break;
            }
            str+=s;
        }
        return str;
    };

    pro.myFormatTime = function myFormatTime() {
        var reg = /^(\d{4})(?:-|\/|\.|:)(\d{1,2})(?:-|\/|\.|:)(\d{1,2})(?:\s+)?(\d{1,2})?(?:-|\/|\.|:)?(\d{1,2})?(?:-|\/|\.|:)?(\d{1,2})?$/g, ary = [];
        this.replace(reg, function () {
            ary = [].slice.call(arguments, 1, 7);
        });
        var format = arguments[0] || "{0}-{1}-{2} {3}:{4}:{5}";
        return format.replace(/{(\d+)}/g, function () {
            var val = ary[arguments[1]];
            return val && val.length === 1 ? "0" + val : val;
        });
    };
    pro.queryURLParameter = function queryURLParameter() {
        var reg = /([^?&=]+)=([^?&=]+)/g, obj = {};
        this.replace(reg, function () {
            obj[arguments[1]] = arguments[2];
        });
        return obj;
    };

})(String.prototype);


var $urlHost = "http://matchweb.sports.qq.com";
var $index = 0;
var timemodel = {
    timeUl:$('.time-list>ul'),
    bind:function (ary) {
        //绑定的是头部日期
        console.log(ary)
        var str='';
        for (var i=0;i<ary.length;i++){
            var cur = ary[i];
            cur['weekday'] = cur['weekday'] || "--" //星期几
            cur['date'] = cur['date'] || '2015-02-07' //年 默认时间
            str +='<li class="cursor left" title='+cur['date']+'>'
            str +='<span class="list-top">'+cur['weekday']+'</span>'
            str +='<span class="list-bot">'+cur['date'].myFormatTime("{1}-{2}")+'</span>'
            str +='</li>'
        }
        this.timeUl.html(str).css('width',ary.length * 105)
    },

    selectCur:function (today) {
        //鼠标滑过的样式
        this.timeUl.children('li').mousemove(function () {
            $(this).addClass('hover')
        }).mouseout(function () {
            $(this).removeClass('hover')
        }).each(function () {
            var $time =$(this).attr('time');
            //如果当前的li的日期和今天日期一样，那么就选中样式；
            $time === today ? $(this).addClass('select'):$(this).removeClass('select');
            $time === today ? $index = $(this).index():null
        });
        //-> 让UL滚动到当前日期位置
        $index = $index -3;
        this.timeUl.css({left:-$index*105});

        //->绑定对应的数据, 传过去的是当前日期
         listModel.init(today);
    },
    clickBtn:function () {
        var _this =this;
        $(".time-left,.time-right").click(function (e) {
            e=e ||window.event;
            e.target =e.target || e.srcElement;
            var n=1;
            if(e.target.className.indexOf("time-left")>-1){ //点击到头了
                n *= -1
            }
            $index += n;
            _this.timeUl.stop().animate({left:-$index*105},300,function () {
                //默认样式随着日期的变化而变化
                var $curItem = _this.timeUl.children('li').eq($index+3);
                $curItem.addClass('select').siblings().removeClass('select');
                listModel.init($curItem.attr("title")); //获取属性上的日期传递给初始化

            })
        })
    },
    callback:function (jsonData) {
        if(jsonData.code !==0){
            //->只有code===0才是正常的返回我们需要的数据
            return;
        }
        jsonData = jsonData["data"];
        var today = jsonData["today"];

        //->绑定数据
        this.bind(jsonData["data"]);

        //->让当前的这个时间默认被选中
        this.selectCur(today);

        //->给左右按钮绑定点击事件
        this.clickBtn();

        //点击切换内容
        var _this = this;
        this.timeUl.children('li').click(function () {
            $(this).addClass('select').siblings().removeClass('select');
            listModel.init($(this).attr('title')) //获取属性上的值
            //点击后移动位置
            $index  = $(this).index() -3;
            _this.timeUl.animate({left:-$index*105},500)

        })
    },
    init:function () {
        var _this = this;
        $.ajax({
            url:$urlHost+"/kbs/calendar?columnId=100000&_=" + Math.random(),
            type:'get',
            dataType:'jsonp',
            jsonpCallback:'calendar',
            success:function () {
                _this.callback(arguments[0])
            }
        })
    }
}
var listModel = {
    //绑定nba两个球队 今天比赛的时间  队名
    callback:function (jsonData, time) {
        console.log(jsonData)
        if(jsonData['code'] !==0){ //不等于0 就说明没有数据
            return
        };
        jsonData = jsonData['data'][time]; //从所有数据中
        var str = "<h2 class='content-title'>" + time.myFormatTime("{1}月{2}日") + "</h2>";

        str+='<ul class="content-list bg-white">';
            for (var i=0; i<jsonData.length; i++){
                var cur = jsonData[i];
                //leftGoal 是比分, 如果cur['leftGoal'] 是0就赋值给当前这个元素，等到的额就是0
                //如果没有获取到任何东西，返回的 空字符串
                cur['leftGoal'] = cur['leftGoal'] ==0 ?"":cur['leftGoal']; // 灰熊队分数
                cur["rightGoal"] = cur["rightGoal"] == 0 ? "" : cur["rightGoal"];//火箭队分数
                str+='<li>';
                //直播时间 和 标题
                str+='<div class="conList-left left"><span class="w80 left">'+cur["startTime"].myFormatTime("{3}:{4}")+'</span><span class="w140 left">'+cur["matchDesc"]+'</span></div>'
                str+='<div class="conList-center left">';
                str+='<img src="'+cur['leftBadge']+'" class="home left" />'; //队徽
                str+='<span class="home left">'+cur['leftName']+'</span>'; //队名
                str+='<span class="w92 left">'+cur['leftGoal']+'-'+cur['rightGoal']+'</span>'; //比分
                str+='<img src="'+cur["rightBadge"]+'" class="away right" />'; //队徽
                str+='<span class="away right">'+cur["rightName"]+'</span>'; //队名
                str+='</div>';
                str+='<div class="conList-right left"><span>视频锦集</span></div>'; //视频
                str+='</li>'
            }
        str+='</ul>';

        $(".box-content").html(str).animate({opacity: 1}, 500);//有数据显示出来
    },
    init:function (time) {
        var _this =this;
        $('.box-content').css('opacity','0'); //底部内容有数据才会显示
        //获取的是今天的比赛数据
        $.ajax({
            url:$urlHost + "/kbs/list?columnId=100000&startTime=" + time + "&endTime=" + time + "&_=" + Math.random(),
            type:"get",
            dataType:"jsonp",
            jsonpCallback:"gameList",
            success:function () {
                _this.callback(arguments[0],time)
            }
        });

    },
};
timemodel.init();