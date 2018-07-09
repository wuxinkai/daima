
    $.ajax({
        url: 'http://www.weather.com.cn/data/sk/101091101.html'+ Math.random(),
        type: "get",
        dataType: "jsonp",
        success: function () {
            console.log(arguments[0])
        }
    });
