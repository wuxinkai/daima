function News() {
//公用部分
    this.title ='',
    this.comments =0,
    this.date ='',
//列表内容
    this.source ='',
    this.introduce ='',
    this.images ='',
//详情内容
    this.content=''
}
News.prototype ={
    //绑定数据
    bindListDom:function () {
        var str ='';
        str+='<li>'
        str+='<a href="detail.html">'
        str+='<b>'+this.title+'</b>'
        str+='<span><img src="'+this.images+'" width="120" height="80" alt=""></span>'
        str+=this.introduce
        str+='</a>';
        str+='<p class="p-btm">';
        str+='<u>'+this.source+'</u>';
        str+='<time>'+this.date+'</time>';
        str+='<i><a href="javascript:;">评论('+this.comments+')条</a></i>';
        str+='</p>';
        str+='</li>';
        return str
    },
    //点击详情
    bindDetailDom:function (dom) {
        var str='';
        str+='<h1>'+this.title+'</h1>';
        str+='<div class="other">';
            str+='<u>'+this.author+'</u>';
            str+='<time>'+this.date+'</time>';
            str+='<i><a href="">评论('+this.comments+')条</a></i>';
        str+='</div>';
        str+='<table>';
            str+='<tbody>';
            str+='<tr>';
            str+='<td id="article_content">';
            str+=this.content;
            str+='</td>';
            str+='</tr>';
            str+='<tbody>';
        str+='</table>';
        dom.innerHTML =str;
    }

}