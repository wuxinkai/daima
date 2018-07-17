//基于内置类String.prototype扩展一些我们自己常用的方法
(function (pro) {
    pro.myTrim = function myTrim() {
        return this.replace(/(^ +| +$)/g, "");
    };
    pro.mySub = function mySub() {
        var len = arguments[0] || 10, isD = arguments[1] || false, str = "", n = 0;
        for (var i = 0; i < this.length; i++) {
            var s = this.charAt(i);
            /[\u4e00-\u9fa5]/.test(s) ? n += 2 : n++;
            if (n > len) {
                isD ? str += "..." : void 0;
                break;
            }
            str += s;
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

var $urlHost = "http://matchweb.sports.qq.com"; //请求地址
var $index = 0;
var timeModel={
    timeUl:$('.time-list>ul'),
    //绑定日期
    bind:function (ary) {
        var str = '';
        for (var i=0; i<ary.length;i++){
            var cur = ary[i];
            cur['weekday']  =cur['weekday'] || "--"; //初始化星期  星期几的显示方法，
            cur['date'] = cur['date'] || "2015-01-01";
            str+="<li class='cursor left' title='"+cur['date']+"'>";
            str+="<span class='list-top'>"+cur['weekday']+"</span>";
            str += "<span class='list-bot'>" + cur["date"].myFormatTime("{1}-{2}") + "</span>";
            str+="</li>"
        }
        this.timeUl.html(str).css('width',ary.length * 105)
    },
    //当前选择的样式
    selectCur:function (today) {
        this.timeUl.children('li').mouseover(function () {
            $(this).addClass('hover')
        }).mouseout(function () {
            $(this).removeClass('hover')
        }).each(function () {
            var $title = $(this).attr('title');
            //如果当前的li的日期和今天日期一样那么就选中这个样式
            $title === today ? $(this).addClass('select') : $(this).removeClass('select');
            $title === today ? $index = $(this).index():null;
        });

        //->（5）让UL滚动到当前日期的位置
        $index = $index - 3;
        this.timeUl.css({left: -$index * 105});
        //->绑定对应的数据
        listModel.init(today);

    },
    //(5)点击效果
    clickBtn:function () {
        var _this = this;
        $(".time-left,.time-right").click(function (e) {
            e = e || window.event;
            e.target = e.target || e.srcElement;
            var n=1;
            if(e.target.className.indexOf("time-left")> -1){
                n *= -1
            }
            $index += n;
            _this.timeUl.stop().animate({left:-$index * 105},300,function () {
                //还是让当前的这个选中的向左或者向右移动一个选择
                var $curItem = _this.timeUl.children('li').eq($index+3);
                $curItem.addClass('select').siblings().removeClass('select');
                //切换完成后绑定数据
                listModel.init($curItem.attr("title"));
            });


        })
    },
    //外界操作事件或者调用方法
    callback:function (jsonData) {
        //（2）判断是否有数据，给数据从新赋值
        if(jsonData.code !== 0){
            return
        }
        jsonData = jsonData['data']; //从新赋值
        var today = jsonData['today'];

        //（3）绑定数据
        this.bind(jsonData['data']);

        //（4）绑定默认样式
        this.selectCur(today)

        //->(6)给左右按钮绑定点击事件
        this.clickBtn();


        //点击事件li的 显示当前的 要比赛的队伍
        var _this =this;
        this.timeUl.children("li").click(function () {
            $(this).addClass('select').siblings().removeClass('select');
            listModel.init($(this).attr('title'));
            $index = $(this).index() - 3;
            _this.timeUl.animate({left:-$index *105},500)
        })
    },
    //请求数据
    init:function () {
        //（1）ajax请求
        var _htis =this;
        $.ajax({
            url: $urlHost + "/kbs/calendar?columnId=100000&_=" + Math.random(),
            type:'get',
            dataType:'jsonp',
            jsonpCallback:'calendar', //jsonpCallback: 回掉函数名，默认jquery自动生成
            success:function () {
                _htis.callback(arguments[0])
            }
        })
    }
};

//绑定每个队的数据
var listModel ={
    callback:function (jsonDta,time) {
        if(jsonDta["code"] !==0){ //判断是否有数据
            return;
        }
        jsonDta = jsonDta['data'][time];
        var str ="<h2 class='content-title'>"+time.myFormatTime("{1}-{2}日")+"<h2>";
        str+="<ul class='content-list bg-white'>";
        for (var i=0; i<jsonDta.length; i++){
            var cur =jsonDta[i];
            //判断 cur['leftGoal'] ==0  是否等于 0   最后赋值给 cur['leftGoal']
            cur['leftGoal'] = cur['leftGoal'] ==0 ? "" : cur["leftGoal"];  //左侧比分
            cur['rightGoal'] = cur['rightGoal'] ==0 ? "" : cur["rightGoal"];  //右侧比分
            str += "<li>";
            //时间
            str += "<div class='conList-left left'><span class='w80 left'>"+cur["startTime"].myFormatTime("{3}-{4}")+"</span><span class='w140 left'>"+cur["matchDesc"]+"</span></div>";
            str += "<div class='conList-center left'>";
            str += "<img src='"+cur['leftBadge']+"' class='home left'/>";
            str += "<span class='home left'>"+cur['leftName']+"</span>";
            str += "<span class='w92 left'>"+cur['leftGoal']+"-"+cur['rightGoal']+"</span>";
            str += "<img src='"+cur["rightBadge"]+"' class='away right'/>";
            str += "<span class='away right'>"+cur["rightName"]+"</span>";
            str += "</div>";
            str += "<div class='conList-right left'><span>视频锦集</span></div>";
            str += "</li>"
        }
        str+="</ul>"
        $(".box-content").html(str).animate({opacity:1},500)
    },
    init:function (time) {
        var _this =this;
        $('.box-content').css('opacity','0');
        $.ajax({
            url: $urlHost + "/kbs/list?columnId=100000&startTime=" + time + "&endTime=" + time + "&_=" + Math.random(),
            type:'get',
            dataType:'jsonp',
            jsonpCallback:'gameList',
            success:function () {
                _this.callback(arguments[0],time)
            }
        })
    }
};

timeModel.init();