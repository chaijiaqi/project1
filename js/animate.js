/**
 * Created by huhan on 2016/12/4.
 */
/**
 *
 * @param obj
 * @param atrr
 * @returns {*}
 */
//获取计算后的属性值
function getStyle(obj, atrr) {
    if (window.getComputedStyle) {
        return window.getComputedStyle(obj, null)[atrr];
    } else {
        return obj.currentStyle[atrr];
    }
}
/**
 *
 * @param obj
 * @param json
 * @param fn
 */
//缓动动画函数�����������
function animate(obj, json, fn) {
    clearInterval(obj.t);
    obj.t = setInterval(function () {
        var flag = true;
        for (var k in json) {
            if (k === 'zIndex') {
                obj.style[k] = json[k];
            } else if (k === 'scrollToY') {
                var targer = json[k];
                var leader = scroll().top;
                var step = (targer - leader) / 10;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                leader = leader + step;
                obj.scrollTo(scroll().left, leader);
                if (leader != json[k]) {
                    flag = false;
                }
            } else if (k === 'scrollToX') {
                var targer = json[k];
                var leader = scroll().left;
                var step = (targer - leader) / 10;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                leader = leader + step;
                obj.scrollTo(leader, scroll().top);
                if (leader != json[k]) {
                    flag = false;
                }
            } else if (k === 'opacity') {
                var targer = json[k] * 1000;
                var leader = getStyle(obj, k) * 1000;
                var step = (targer - leader) / 10;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                leader = leader + step;
                obj.style[k] = leader / 1000;
                if (leader != json[k] * 1000) {
                    flag = false;
                }
            } else {
                var targer = json[k];
                var leader = parseInt(getStyle(obj, k)) || 0;
                var step = (targer - leader) / 10;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                leader = leader + step;
                obj.style[k] = leader + 'px';
                if (leader != json[k]) {
                    flag = false;
                }
            }
        }
        if (flag) {
            clearInterval(obj.t);
            if (fn) {
                fn();
            }
        }
    }, 15)
}
/**
 *
 * @returns {{top: (Number|number), left: (Number|number)}}
 */
//获取页面滚动出去的宽高߿�
function scroll() {
    return {
        top: window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0,
        left: window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0
    };
}
/**
 *
 * @returns {{width: (Number|number), height: (Number|number)}}
 */
//获取网页可视区大小�������
function client() {
    return {
        'width': window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth || 0,
        'height': window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 0
    }
}
/**
 *
 * @param element
 * @returns {*}
 */
//获取下一个兄弟节点兼容写法
function getNextElement(element){
    if (element.nextElementSibling){
        return element.nextElementSibling;
    }else{
        var next = element.nextSibling;
        //判断条件：有  并且  不是元素节点
        while(next && next.nodeType !==1){
            next =next.nextSibling;
        }
        return next;
    }
}