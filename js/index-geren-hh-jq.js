/**
 * Created by huhan on 2016/12/12.
 */
window.onload = function () {
    var hot = 0;        //标记
    var flag = true;    //节流阀
    //重置浏览器滚动条位置
    setTimeout(function () {
        window.scrollTo(0, 0);
    }, 50)
    //右边第一个小圆圈高亮显示
    $('.ol').find('li').eq(hot).css('backgroundColor', 'rgba(0,204,255,1)');
    //窗口尺寸改变时，滚动条定位到当前屏位置
    $(window).resize(function () {
        window.scrollTo(0, $('div.li').eq(hot).offset().top)
    })
    //绑定小圆圈点击事件
    $('.ol ol').on('click', 'li', function () {
        if (flag) {
            hot = $(this).index();
            an();
        }
    })
    //an函数，滚动屏幕，启动每一屏动画
    function an() {
        //关闭节流阀
        flag = false;
        //右边对应小圆圈高亮显示
        $('.ol').find('li')
            .eq(hot)
            .css('backgroundColor', 'rgba(0,204,255,1)')
            .siblings('li')
            .css('backgroundColor', 'rgba(0,204,255,0)');
        //大盒子类名改变，让动画回到初始位置
        $('#animatebox').removeClass('animate');
        //视频暂停播放
        $('video')[0].pause();
        //播放按钮显示
        $('.player').show();
        //如果是第七屏，下拉按钮隐藏
        if (hot === $('div.li').length - 1) {
            $('.xiala').hide();
        }
        //调用封装好的动画滚动屏幕
        animate(window, {
            'scrollToY': $('div.li').eq(hot).offset().top,
        }, function () {
            //传入回调函数打开节流阀，如果不是第七屏，显示下拉按钮，更改大盒子类名，启动动画
            if (hot !== $('div.li').length - 1) {
                $('.xiala').show();
            }
            $('#animatebox').addClass('animate');
            flag = true;
        })
    }
    //鼠标滚轮滚动事件
    window.onmousewheel = function (e) {
        //先判断节流阀
        if (flag) {
            var e = e || window.event;
            //向上滚而且不是第一屏，标记减一，调用an函数
            if (e.wheelDelta > 0 && hot > 0) {
                hot--;
                an();
            }
            //向下滚而且不是最后一瓶，标记加一，调用an函数
            if (e.wheelDelta < 0 && hot < $('.li').length - 1) {
                hot++;
                an();
            }
        }
    }
    //绑定下拉按钮事件
    $('.xiala').on('click', function () {
        if(flag){
            hot++;
            an();
        }
    })
    //视频播放完成事件
    $('video')[0].onended = function () {
        $(this).next().show();
        $('.player').show();
    }
    //播放按钮事件
    $('.player').on('click', function () {
        $(this)
            .hide()
            .parent()
            .siblings('.bg')
            .hide()
            .prev()[0]
            .play();
    })
    //导航栏点击弹出和关闭事件
    $('.navm').prev().on('click', function () {
        $('.navm').hide();
        $(this)
            .next()
            .show();
    })
    $('.closenavm').on('click', function () {
        $(this)
            .parent()
            .hide();
    })
}