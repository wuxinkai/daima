/*
 * utils class v1.0:The common methods used in our JS are included.
 * by Team on 2016/01/20
 */
var utils = {
    //listToArray:Converts an array of classes into an array
    listToArray: function (likeAry) {
        var ary = [];
        try {
            ary = Array.prototype.slice.call(likeAry, 0);
        } catch (e) {
            for (var i = 0; i < likeAry.length; i++) {
                ary[ary.length] = likeAry[i];
            }
        }
        return ary;
    },
    //toJSON:Converts a string of JSON format to an object in the JSON format
    toJSON: function (str) {
        return "JSON" in window ? JSON.parse(str) : eval("(" + str + ")");
    }
};

//getCss:Gets the style of the current element that is calculated by the browser
utils.getCss = function (curEle, attr) {//curEle 当前要操作的元素（比如div li）  attr是div里的属性。
    var val = reg = null;
    if ("getComputedStyle" in window) {
        val = window.getComputedStyle(curEle, null)[attr];
    } else {
        if (attr === "opacity") {
            val = curEle.currentStyle["filter"];
            //opacity; 这里的是ie6，7，8
            reg = /^alpha\(opacity=(\d+(\.\d+)?)\)$/;
            val = reg.test(val) ? reg.exec(val)[1] / 100 : 1; //没捕获到就是1，有可能没加透明度；
        } else {
            val = curEle.currentStyle[attr];
        }
    }
    reg = /^-?\d+(\.\d+)?(px|pt|em|rem)?$/;  //去单位
    return reg.test(val) ? parseFloat(val) : val; //去单位，
};

//offset:Gets the offset of the current element distance body
utils.offset = function (curEle) {
    var t = curEle.offsetTop, l = curEle.offsetLeft, p = curEle.offsetParent;
    while (p) {
        if (navigator.userAgent.indexOf("MSIE 8.0") === -1) {
            t += p.clientTop;
            l += p.clientLeft;
        }
        t += p.offsetTop;
        l += p.offsetLeft;
        p = p.offsetParent;
    }
    return {top: t, left: l};
};

//珠峰最新版DOM库的gitHub地址:https://github.com/zhufengpeixun/zhufengDom.git