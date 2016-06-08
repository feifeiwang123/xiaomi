var utils1 = (function () {

    var flag = 'getComputedStyle' in window;

    function listToArray(similarArray) {
        var a = [];
        if (flag) {
            a = Array.prototype.slice.call(similarArray);
        } else {
            for (var i = 0; i < similarArray.length; i++) {
                a[a.length] = similarArray[i];
            }
        }
        return a;
    }

    function JsonParse(JsonStr) {
        return 'JSON' in window ? JSON.parse(JsonStr) : eval('(' + JsonStr + ')');
    }

    function win(attr, val) {
        if (typeof val == 'undefined') {
            return document.documentElement[attr] || document.body[attr];
        }
        document.documentElement[attr] = val;
        document.body[attr] = val;
    }

    function offset(curEl) {
        var totalLeft = null, totalTop = null, par = curEl.offsetParent;
        totalLeft += curEl.offsetLeft;
        totalTop += curEl.offsetTop;
        while (par) {
            if (navigator.userAgent.indexOf('MSIE 8.0') == -1) {
                totalLeft += par.clientLeft;
                totalTop += par.clientTop;
            }
            totalLeft += par.offsetLeft;
            totalTop += par.offsetTop;
            par = par.offsetParent;
        }
        return {left: totalLeft, top: totalTop};
    }

    function children(curEle, tagName) {
        var ary = [], nodeList = curEle.childNodes;
        for (var i = 0; i < nodeList.length; i++) {
            var cur = nodeList[i];
            if (cur.nodeType == 1) {
                if (typeof tagName == 'string') {
                    if (cur.nodeName.toLowerCase() == tagName.toLowerCase()) {
                        ary[ary.length] = cur;
                    }
                } else {
                    ary[ary.length] = cur;
                }
            }
        }
        nodeList = null;
        return ary;
    }

    function prev(curEle) {
        if (flag) {
            return curEle.previousElementSibling;
        } else {
            var prev = curEle.previousSibling;
            while (prev && prev.nodeType != 1) {
                prev = prev.previousSibling;
            }
            return prev;
        }
    }

    function next(curEle) {
        if (flag) {
            return curEle.nextElementSibling;
        } else {
            var next = curEle.nextSibling;
            while (next && next.nodeType != 1) {
                next = next.nextSibling;
            }
            return next;
        }
    }

    function prevAll(curEle) {
        var cur = [], pre = this.prev(curEle);
        while (pre) {
            cur.unshift(pre);
            pre = this.prev(pre);
        }
        return cur;
    }

    function nextAll(curEle) {
        var cur = [], nex = this.next(curEle);
        while (nex) {
            cur.push(nex);
            nex = this.next(nex);
        }
        return cur;
    }

    function siblings(curEle) {
        var cur = [], pre = this.prev(curEle), nex = this.next(curEle);
        pre ? cur.push(pre) : null;
        nex ? cur.push(nex) : null;
    }

    function siblingsAll(curEle) {
        return this.prevAll(curEle).concat(this.nextAll(curEle));
    }

    function curIndex(curEle) {
        return this.prevAll(curEle).length;
    }

    function firstBrother(curEle) {
        var cur = this.prevAll(curEle);
        return cur.length > 0 ? cur[0] : null;
    }

    function lastBrother(curEle) {
        var cur = this.nextAll(curEle);
        return cur.length > 0 ? cur[cur.length - 1] : null;
    }

    function firstChild(curEle) {
        var cur = this.children(curEle);
        return cur.length > 0 ? cur[0] : null;
    }

    function lastChild(curEle) {
        var cur = this.children(curEle);
        return cur.length > 0 ? cur[cur.length - 1] : null;
    }

    function prepend(curEle, container) {
        var fir = this.firstChild(container);
        container.insertBefore(curEle, fir);
    }

    function insertAfter(newEle, oldEle) {
        var cur = this.next(oldEle);
        oldEle.parentNode.insertBefore(newEle, cur);
    }

    function hasClass(curEle,className){
        var nameList = className.replace(/^ +| +$/g,'').split(/ +/g);
        for(var i=0;i<nameList.length;i++){
            var cur = nameList[i];
            var reg = new RegExp('(^| +)'+cur+'( +|$)');
            if(!reg.test(curEle.className)){
                return false;
            }
        }
        return true;
    }

    function addClass(curEle, className) {
        var ary = className.replace(/^ +| +$/g,'').split(/ +/g);
        for (var i = 0; i < ary.length; i++) {
            var cur = ary[i];
            if (!this.hasClass(curEle, cur)) {
                curEle.className += ' ' + cur;
            }
        }
    }

    function removeClass(curEle, className) {
        var ary = className.replace(/^ +| +$/g,'').split(/ +/g);
        for (var i = 0; i < ary.length; i++) {
            var cur = ary[i];
            if (this.hasClass(curEle, cur)) {
                var reg = new RegExp('(^| +)' + cur + '( +|$)');
                curEle.className = curEle.className.replace(reg, ' ');
            }
        }
    }

    function getElementsByClass(className, context) {
        context = context || document;
        if (flag) {
            return this.listToArray(context.getElementsByClassName(className));
        } else {
            var ary = [], classAry = className.replace(/^ +| +$/g, '').split(/ +/g);
            var nodeList = context.getElementsByTagName('*');
            for (var i = 0, len = nodeList.length; i < len; i++) {
                var curNode = nodeList[i], isOk = true;
                for (var j = 0; j < classAry.length; j++) {
                    var reg = new RegExp('(^| +)' + classAry[j] + '( +|$)');
                    if (!reg.test(curNode.className)) {
                        isOk = false;
                        break;
                    }
                }
                if (isOk) {
                    ary.push(curNode);
                }
            }
            return ary;
        }
    }

    function getCss(attr) {
        var val = null,reg = null;
        if (flag) {
            val = getComputedStyle(this,null)[attr];
        } else {
            if (attr == 'opacity'||'filter') {
                //console.dir(this.currentStyle);
                //console.log(this.currentStyle['filter']);
                //console.log((/\d+(\.\d+)?/.exec(this.currentStyle['filter'])));
                val = (/\d+(\.\d+)?/.exec(this.currentStyle['filter']))[0] / 100;
            } else {
                val = this.currentStyle[attr];
            }
        }
        reg = /^(-?\d+(\.\d+)?)(px|em|rem|pt|deg)?$/i;
        return reg.test(val) ? parseFloat(val) : val;
    }

    function setCss(attr, value) {

        if (attr == 'float') {
            this['style']['cssFloat'] = value;
            this['style']['styleFloat'] = value;
            return;
        }
        if (attr == 'opacity') {
            this['style']['opacity'] = value;
            this['style']['filter'] = 'alpha(opacity=' + value*100 + ')';
            return;
        }
        var reg = /^(height|lineHeight|width|left|top|right|bottom|((margin|padding)(Left|Top|Right|Bottom)?)|fontSize)$/;
        if (reg.test(attr)) {
            if (!isNaN(value)) {
                value += 'px'
            }
        }
        this['style'][attr] = value;
    }

    function setGroupCss(opations) {
        for (var key in opations) {
            if (opations.hasOwnProperty(key)) {
                setCss.call(this, key, opations[key]);
            }
        }
    }

    function myCss(curEle){
        var sec=arguments[1];
        var ary=Array.prototype.slice.call(arguments,1);
        sec=sec||0;
        if(typeof sec=='string'){
            if(typeof arguments[2] == 'undefined'){
                return getCss.apply(curEle,ary);
            } else {
                setCss.apply(curEle,ary);
            }
        }
        if(sec.toString()=='[object Object]'){
            setGroupCss.apply(curEle,ary);
        }
    }

    return {
        listToArray: listToArray,
        JsonParse: JsonParse,
        win: win,
        offset: offset,
        children: children,
        prev: prev,
        next: next,
        prevAll: prevAll,
        nextAll: nextAll,
        siblings: siblings,
        siblingsAll: siblingsAll,
        curIndex: curIndex,
        firstBrother: firstBrother,
        lastBrother: lastBrother,
        firstChild: firstChild,
        lastChild: lastChild,
        prepend: prepend,
        insertAfter: insertAfter,
        hasClass: hasClass,
        addClass: addClass,
        removeClass: removeClass,
        getElementsByClass: getElementsByClass,
        myCss: myCss
    }
})();


