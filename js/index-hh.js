/**
 * Created by huhan on 2016/12/5.
 */
//每隔2.5秒调用缓动动画更改背景图透明度，形成3张图轮换的效果
window.onload = function () {
    var bgs = document.getElementById('bg').children;
    var hot = 0;
    setInterval(function () {
        hot = hot < bgs.length - 1 ? hot + 1 : 0;
        if (hot === 0) {
            animate(bgs[0], {'opacity': 1});
            animate(bgs[1], {'opacity': 0});
            animate(bgs[2], {'opacity': 0});
        } else {
            animate(bgs[hot], {'opacity': 1})
        }
    }, 2500)
}