/**
 * Created by huhan on 2016/12/5.
 */
//页面加载完成运行函数
window.onload = function () {
    //声明标记（记录现在是第几屏），获取要操作的元素，声明节流阀
    var hot = 0;
    var uls = document.getElementsByClassName('li');
    var ols = document.getElementsByClassName('ol')[0].getElementsByTagName('li');
    var xiaLa = document.getElementsByClassName('xiala')[0];
    var playbutton = uls[0].getElementsByClassName('player')[0];
    var video = uls[0].getElementsByTagName('video')[0];
    var bg1 = uls[0].getElementsByClassName('bg')[0];
    var animatebox = document.getElementById('animatebox');
    var shownavms = document.getElementsByClassName('shownavm');
    var closenavms = document.getElementsByClassName('closenavm');
    var flag = true;
    //将滚动条重置为页面顶部，避免刷新后浏览器记忆滚动条位置
    setTimeout(function () {
        window.scrollTo(0, 0);
    }, 50);
    //右边第一个小圆圈高亮显示
    ols[hot].style.backgroundColor = 'rgba(0,204,255,1)';
    //窗口尺寸改变时，滚动条定位到当前屏的位置，避免窗体改变尺寸时出现两屏错乱
    window.onresize = function () {
        window.scrollTo(0, uls[hot].offsetTop);
    }
    //遍历绑定右边小圆圈点击事件
    for (var i = 0; i < ols.length; i++) {
        ols[i].index = i;
        ols[i].onclick = function () {
            //判断节流阀，更改标记，调用an函数，滚动到点击的小圆圈对应的一屏
            if (flag) {
                hot = this.index;
                an();
            }
        }
    }
    //an函数，滚动屏幕到标记的一屏
    function an() {
        //先关闭节流阀
        flag = false;
        //滚动屏幕时恢复大盒子类名，动画恢复到起始状态
        animatebox.className = 'unanimate';
        //滚动屏幕前把 视频暂停，播放按钮显示
        video.pause();
        playbutton.style.display = 'block';
        //如果当前是第七屏，下拉按钮在动画开始前隐藏，如果当前不是第七屏，下拉按钮在动画结束后显示
        if (hot === ols.length - 1) {
            xiaLa.style.display = 'none';
        }
        //清除其他小圆圈高亮显示，只有当前屏对应的小圆圈高亮显示
        for (var i = 0; i < ols.length; i++) {
            ols[i].style.backgroundColor = 'rgba(0,204,255,0)';
        }
        ols[hot].style.backgroundColor = 'rgba(0,204,255,1)';
        //调用封装好的缓动动画滚动屏幕，传入回调函数打开节流阀，更改大盒子类名，启用每一屏css3动画，符合条件时显示下拉按钮
        animate(window, {
            'scrollToY': uls[hot].offsetTop,
        }, function () {
            flag = true;
            animatebox.className = 'animate';
            if (hot !== ols.length - 1) {
                xiaLa.style.display = 'block';
            }
        })
    }
    //鼠标滚轮滚动事件，先判断节流阀
    window.onmousewheel = function (e) {
        if (flag) {
            //鼠标向上滚，而且不是第一屏，标记减1，调用an函数滚动屏幕
            if (e.wheelDelta > 0 && hot > 0) {
                hot--;
                an();
            }
            //鼠标向下滚，而且不是最后一屏，标记加1，调用an函数滚动屏幕
            if (e.wheelDelta < 0 && hot < ols.length - 1) {
                hot++;
                an();
            }
        }
    }
    //点击下拉按钮事件：标记+1，调用an函数滚动屏幕
    xiaLa.onclick = function () {
        if (flag) {
            hot++;
            an();
        }
    }
    //视频播放完成事件：显示播放按钮，显示背景图片
    video.onended = function () {
        playbutton.style.display = 'block';
        bg1.style.display = 'block';
    }
    //播放按钮点击事件：视频继续播放或者重新播放，隐藏播放按钮和背景图片
    playbutton.onclick = function () {
        playbutton.style.display = 'none';
        bg1.style.display = 'none';
        video.play();
    }
    //导航栏点击弹出和关闭二级菜单
    var navms = {};
    for(var i=0;i<shownavms.length;i++){
        navms[i] = closenavms[i].parentNode;
        shownavms[i].index = i;
        shownavms[i].onclick = function(){
            for(var j=0;j<shownavms.length;j++){
                navms[j].style.display = 'none';
            }
            navms[this.index].style.display = 'block';
        }
        closenavms[i].index = i;
        closenavms[i].onclick = function(){
            navms[this.index].style.display = 'none';
        }
    }
}