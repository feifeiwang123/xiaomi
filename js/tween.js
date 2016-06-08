function Linear(t,b,c,d){ return c*t/d + b; }
function animate(ele,obj,duration,callback){
	var oBegin={};//用来保存多个方向begin；
	var oChange={};//用来保存多个方向的change;
	var flag=0;//用来记录各个方向的距离是否有效
	for(var attr in obj){
		var target=obj[attr];
		var begin=animate.getCss(ele,attr);
		var change=target-begin;
		if(change){//判断一下此方向的运动距离有效，不为0
			oBegin[attr]=begin;
			oChange[attr]=change;
			flag++;
		}
	}//for in 循环结束
	if(!flag)return;//如果各个方向的运动距离都是0，则结束动画的执行
	var interval=15;
	var times=0;
	clearInterval(ele.timer);
	function step(){
		times+=interval;
		if(times<duration){//如果没有到终点，求出当前元素的当前状态
			for(var attr in oChange){//遍历oChange这个对象里面的值
				var change=oChange[attr];//将change和begin进行重新赋值，target的值一直没有变化
				var begin=oBegin[attr];
				//var val=times/duration*change+begin;
				var val=Linear(times,begin,change,duration);//求出元素的当前状态
				animate.setCss(ele,attr,val);//设置元素的当前状态
			}
		}else{//如果时间到终点，继续遍历每一项，直接取出终点值进行赋值操作
			for(var attr in oChange){
				var target=obj[attr];
				animate.setCss(ele,attr,target);	
			}
			clearInterval(ele.timer);//停止定时器
			ele.timer=null;//清空上一次的定时器留下的值
			if(typeof callback == "function"){//如果留下的是一个函数，直接让此回调函数执行
				callback.call(ele);
			}
		}
		
	}
	ele.timer=setInterval(step,interval);
}

animate.getCss=function(ele,attr){
	if(window.getComputedStyle){
		return parseFloat(window.getComputedStyle(ele,null)[attr]);	
	}else{
		if(attr=="opacity"){
			var val=ele.currentStyle.filter;
			//"alpha(opacity=50)";//匹配到这样的一个字符串，然后把这个字符串中的数字部分拿到
			var reg=/alpha\(opacity=(\d+(?:\.\d+)?)\)/;
			if(reg.test(val)){
				return RegExp.$1/100;
			}else{
				//如果没有给IE中的不透明度赋值，则上边的正则为false
				return 1;//如果没有给不透明度赋值，则应该把默认值1返回
			}
			//方法没有返回值，则此方法执行结束后留下一个undefined。即：没有返回值的方法返回的是undefined
		}else{
			return parseFloat(ele.currentStyle[attr]);
		}		
	}
};

animate.setCss=function(ele,attr,val){
		if(attr=="opacity"){
			ele.style.opacity=val;
			ele.style.filter="alpha(opacity="+val*100+")";
		}else{
			ele.style[attr]=val+"px";
		}
};
function jsonParse(jsonStr){
	return "JSON" in window ? JSON.parse(jsonStr) : eval("("+jsonStr +")");
}