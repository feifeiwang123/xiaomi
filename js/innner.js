//渐隐渐现轮播5图
var banner = document.getElementById("banner");
var bannerInner = utils.firstChild(banner),
    btn = utils.children(banner,"ul")[0],
    bannerLink = utils.children(banner,"a"),
    leftBtn = bannerLink[0],rightBtn = bannerLink[1];
var divList = bannerInner.getElementsByTagName("div"),
    imgList = bannerInner.getElementsByTagName("img"),
    oLis = btn.getElementsByTagName("li");
var jsonData = null;
//var leftBtn = document.getElementById('leftBtn');
//var rightBtn = document.getElementById('rightBtn');
!function bindDate() {
    var xhr = new XMLHttpRequest();
    xhr.open("get", "data.txt?_="+Math.random(), false);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && /^2\d{2}$/.test(xhr.status)) {
            jsonData = jsonParse(xhr.responseText);
        }
    };
    xhr.send(null);
    var str = "";
    for (var i = 0; i < jsonData.length; i++) {
        var cur = jsonData[i];
        str += '<div><img src="" trueSrc="' + cur.img + '"></div>'
    }
    //str += '<div><img src="" trueSrc="' + jsonData[0].img + '"></div>';
    //animate.setCss(bannerInner, "width", (jsonData.length + 1) * 1000);
    bannerInner.innerHTML = str;
    str = "";
    for (var j = 0; j < jsonData.length; j++) {
        if (j == 0) {
            str += '<li class="select"></li>'
        } else {
            str += '<li></li>';
        }
    }
    btn.innerHTML = str;
}();
function imgDelay() {
    for (var i = 0; i < imgList.length; i++) {
        !function (i) {
            var cur = imgList[i];
            if (cur.isloaded)return;
            var tempImg = new Image();
            tempImg.src = cur.getAttribute("trueSrc");
            tempImg.onload = function (){
                cur.src = this.src;
                cur.style.display = "block";
                if (i == 0){//只对一张做处理 z-index =1
                    var curDiv = cur.parentNode;
                    curDiv.style.zIndex = 1;
                    animate(curDiv,{opacity:1},200);
                }
                tempImg = null;
                cur.isloaded = true;
            }
        }(i);
    }
}
window.setTimeout(imgDelay,500);
//imgList[0].style.opacity = 1;imgList[0].style.zIndex = 1;
var interval = 2000,autoTimer = null,step=0;
autoTimer = window.setInterval(autoMove,interval);
function autoMove(){
    if(step === (jsonData.length-1)){
        step = -1;
    }
    step ++;
    setBanner();
    focusAlign();
}
function setBanner(){//实现轮播图切换效果的代码
    for(var i = 0,len = divList.length ;i< len; i++){
        ~function (i) {
            var curDiv = divList[i];
            if (i === step){
                utils.css(curDiv,"zIndex",1);//css是setCss
                animate(curDiv,{opacity:1},200,function(){
                    var curDivSib = utils.siblings(curDiv);
                    for (var j = 0,len=curDivSib.length; j<len; j++){
                        curDivSib[j].style.opacity=0;
                    }
                });
            } else {
                curDiv.style.zIndex = 0;
            }
        }(i)
    }
}
!function(){
    for (var i = 0 ;i<oLis.length ; i++){
        var cur = oLis[i];
        cur.index = i;
        cur.onclick =function(){
            step = this.index;
            setBanner();
            focusAlign();
        }
    }
}();
function focusAlign(){
    for (var i=0 ;i <oLis.length ; i++){
        var cur = oLis[i];
        cur.className = step == i ? 'select' : '';
    }
}
banner.onmouseover = function(){
    clearInterval(autoTimer);
};
banner.onmouseout = function(){
    autoTimer = window.setInterval(autoMove,3000);
};
leftBtn.onclick = function(){
    if(step == 0){
        step = imgList.length - 1;
    }
    step --;
    setBanner();
    focusAlign();
};
rightBtn.onclick = autoMove;


/*事件绑定 渐隐渐现轮播图上方的li*/
/*
var navList = document.getElementById("nav-list");
var oneUl = document.getElementById("oneUl");
var OLis = utils.children(oneUl);

var On2 = [];
for(var n=0 ; n<OLis.length ; n++){
    var On = utils.lastChild(OLis[n]);
    On.num = n;
    console.log("on是这个",On,On.num);
    On2.push(On);
}

document.documentElement.onmouseover = function(e) {
    e = e || window.event;
    var tar = e.target || e.srcElement;
    //var index = utils.index(tar.parentNode);
    //console.log(index);
    var tarParents = parents(tar);
    for (var i = 0; i < tarParents.length; i++) {
        var curP = tarParents[i];
        if (/^LI$/i.test(curP.tagName) && curP.className.indexOf("category-item") > -1) {
            var curD = utils.lastChild(curP);
            On2[curD.num].style.display = "block";
            for(var j = 0;j<On2.length;j++){
                if(j!=curD.num){
                    On2[j].style.display = "none";
                }
            }
            return;
        }
        //if (curP.id == "oneUl")return;
        if (/^DIV$/i.test(curP.tagName) && curP.className.indexOf("children") > -1){
           return;
        }
        On2[i].style.display="none";
    }
};


function parents(curEle){
    var ary = [];
    ary.push(curEle);
    var p = curEle.parentNode;
    while (p&&p!=document){
        ary.push(p);
        p = p.parentNode;
    }
    return ary;
}
*/
var oneUl = document.getElementById("oneUl");
var OLis = utils.children(oneUl,"li");
for (var i = 0; i < OLis.length; i++) {
    var curLi = OLis[i];
    curLi["lastDiv"] = utils.lastChild(curLi);
    curLi.onmouseover = function(){
        this["lastDiv"].style.display = "block";
    };
    curLi.onmouseout = function(){
        this["lastDiv"].style.display = "none";
    }
}

//轮播10图js
var lunIn = document.getElementById("lunIn");
var oUl = lunIn.getElementsByTagName("ul")[0];
var leftB = document.getElementById("leftB");
var rightB = document.getElementById("rightB");
var div1 = document.getElementById("div1");
function move(){
    lunIn.timer1=window.setInterval(function () {
        animate(oUl,{left:-1240},500);
        lunIn.timer2=window.setTimeout(function () {
            animate(oUl,{left:0},500);
        },0)
    },5000);
}
move();
div1.onmouseover = function(){
    window.clearTimeout(lunIn.timer1);
};
div1.onmouseout = function(){
    move();
};
rightB.onclick = function(){
    animate(oUl,{left:-1240},1000);
};
leftB.onclick = function(){
    animate(oUl,{left:0},1000);
};




/*搭配 配件 周边 的选项卡*/
~function (){
    function tab(){
        var index = utils.index(this);
        var oLis = utils.children(this.parentNode);
        var oUl = utils.next(this.parentNode.parentNode.parentNode).getElementsByTagName("ul")[1].parentNode.getElementsByTagName('ul');
       /* console.log(index);
        console.log(oUl);
        console.log(oLis);
        console.log(this);*/
        for(var i =0 ; i<oLis.length ; i++){
            utils.removeClass(oLis[i],"brick-active");
            utils.removeClass(oUl[i],"brick-active");
        }
        utils.addClass(this,"brick-active");
        utils.addClass(oUl[index],"brick-active");
    }
    var oTabs = utils.getElementsByClass("boxTab");
    //console.log(oTabs);
    for (var i =0 ; i < oTabs.length; i++){
        ~function (i) {
            var cur = oTabs[i];
            var oLis = cur.getElementsByTagName("ul")[0].getElementsByTagName("li");
            for (var j =0 ; j < oLis.length; j++){
                oLis[j].onmouseover = function(){
                    tab.call(this);
                }
            }
        }(i);
    }
}();

/*为你推荐的轮播*/
var rightB2 = document.getElementById("rightB2");
var leftB2 = document.getElementById("leftB2");
var box = document.getElementById("bigBox");
var tUl = box.getElementsByTagName("ul")[0];
var step2 = 0;

rightB2.onclick = function(){
    if (step2 == 3)return;
    step2++;
    animate(tUl,{left:step2 * -1240},500);
};
leftB2.onclick = function(){
    if (step2 == 0)return;
    step2 --;
    animate(tUl,{left:step2* -1240},500);
};

/*内容的轮播*/
!function (){
    //1
    var book = document.getElementById("book");
    var ul1 = book.getElementsByTagName("ul")[0];
    var lis1 = utils.next(book).getElementsByTagName("ul")[0].getElementsByTagName("li");
    var btn1 = document.getElementById("btn1");
    var lBtn1 = btn1.getElementsByTagName("a")[0],
        rBtn1 = btn1.getElementsByTagName("a")[1];
    var step11 = 0;
    //console.log(ul1);
    //console.log(lis1);
    function rightMove(){
        if (step11 == 3)return;
        step11 ++ ;
        animate(ul1,{left:step11*-296},500);
        focusAlign1();
    }
    function  leftMove(){
        if (step11 == 0)return;
        step11 --;
        animate(ul1,{left:step11*-296},500);
        focusAlign1();
    }
    lBtn1.onclick = leftMove;
    rBtn1.onclick = rightMove;
    function focusAlign1(){
        for (var i = 0 ; i< lis1.length ; i++){
            var cur = lis1[i];
            if (step11 == i){
                cur.className = "pager-active";
            }else {
                cur.className = "";
            }
        }
    }
    for(var i = 0 ; i<lis1.length ; i++){
        var cur = lis1[i] ;
        cur.a = i ;
        cur.onclick = function(){
            step11 = this.a;
            animate(ul1,{left:step11*-296},500);
            focusAlign1();
        }
    }
    //2
    var MIUI = document.getElementById("MIUI");
    var ul2 = MIUI.getElementsByTagName("ul")[0];
    var lis2 = utils.next(MIUI).getElementsByTagName("ul")[0].getElementsByTagName("li");
    var btn2 = document.getElementById("btn2");
    var lBtn2 = btn2.getElementsByTagName("a")[0],
        rBtn2 = btn2.getElementsByTagName("a")[1];
    var step22 = 0;
    function rightMove2(){
        if (step22 == 3)return;
        step22 ++ ;
        animate(ul2,{left:step22*-296},500);
        focusAlign2();
    }
    function  leftMove2(){
        if (step22 == 0)return;
        step22 --;
        animate(ul2,{left:step22*-296},500);
        focusAlign2();
    }

    for( i = 0 ; i<lis2.length ; i++){
        var cur2 = lis2[i] ;
        cur2.a = i ;
        cur2.onclick = function(){
            step22 = this.a;
            animate(ul2,{left:step22*-296},500);
            focusAlign2();
        }
    }
    lBtn2.onclick = leftMove2;
    rBtn2.onclick = rightMove2;
    function focusAlign2(){
        for (var i = 0 ; i< lis2.length ; i++){
            var cur = lis2[i];
            if (step22 == i){
                cur.className = "pager-active";
            }else {
                cur.className = "";
            }
        }
    }
    //3
    var game = document.getElementById("game");
    var ul3 = game.getElementsByTagName("ul")[0];
    var lis3 = utils.next(game).getElementsByTagName("ul")[0].getElementsByTagName("li");
    var btn3 = document.getElementById("btn3");
    var lBtn3 = btn3.getElementsByTagName("a")[0],
        rBtn3 = btn3.getElementsByTagName("a")[1];
    var step33 = 0;

    function rightMove3(){
        if (step33 == 3)return;
        step33 ++ ;
        animate(ul3,{left:step33*-296},500);
        focusAlign3();
    }
    function  leftMove3(){
        if (step33 == 0)return;
        step33 --;
        animate(ul3,{left:step33*-296},500);
        focusAlign3();
    }

    for( i = 0 ; i<lis3.length ; i++){
        var cur3 = lis3[i] ;
        cur3.a = i ;
        cur3.onclick = function(){
            step33 = this.a;
            animate(ul3,{left:step33*-296},500);
            focusAlign3();
        }
    }
    lBtn3.onclick = leftMove3;
    rBtn3.onclick = rightMove3;
    function focusAlign3(){
        for (var i = 0 ; i< lis3.length ; i++){
            var cur = lis3[i];
            if (step33 == i){
                cur.className = "pager-active";
            }else {
                cur.className = "";
            }
        }
    }
    //4
    var apply = document.getElementById("apply");
    var ul4 = apply.getElementsByTagName("ul")[0];
    var lis4 = utils.next(apply).getElementsByTagName("ul")[0].getElementsByTagName("li");
    var btn4 = document.getElementById("btn4");
    var lBtn4 = btn4.getElementsByTagName("a")[0],
        rBtn4 = btn4.getElementsByTagName("a")[1];
    var step3 = 0;
    function rightMove4(){
        if (step3 == 3)return;
        step3 ++ ;
        animate(ul4,{left:step3*-296},500);
        focusAlign4();
    }
    function  leftMove4(){
        if (step3 == 0)return;
        step3 --;
        animate(ul4,{left:step3*-296},500);
        focusAlign4();
    }
    for( i = 0 ; i<lis4.length ; i++){
        var cur4 = lis4[i] ;
        cur4.a = i ;
        cur4.onclick = function(){
            step3 = this.a;
            animate(ul4,{left:step3*-296},500);
            focusAlign4();
        }
    }
    lBtn4.onclick = leftMove4;
    rBtn4.onclick = rightMove4;
    function focusAlign4(){
        for (var i = 0 ; i< lis4.length ; i++){
            var cur = lis4[i];
            if (step3 == i){
                cur.className = "pager-active";
            }else {
                cur.className = "";
            }
        }
    }
}();
