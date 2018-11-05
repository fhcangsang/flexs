
//匀速动画开始;
function anm(obj,L,t,v) {//obj对象，L要移动的距离，t定时执行时间，v每次定时移动距离；
    var timer = null;
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        if (L > obj.offsetLeft & L - obj.offsetLeft < v) {//offsetLeft:position下left的值;
            obj.style.left = L + "px"
        }//剩余距离小于一次移动时自动补齐剩余距离；
        if (L < obj.offsetLeft & L - obj.offsetLeft > -v) {
            obj.style.left = L + "px"
        }
        if (L > obj.offsetLeft) {
            obj.style.left = obj.offsetLeft + v + "px"
        }
        if (L < obj.offsetLeft) {
            obj.style.left = obj.offsetLeft - v + "px"
        }
    }, t)
}
//匀速动画结束;

//变速动画；
function bs_anm(obj,L,t) {
    var timer = null;
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        if(L > obj.offsetLeft){
            var v = (L - obj.offsetLeft)/20;
            v = Math.ceil(v);
            obj.style.left = obj.offsetLeft + v + "px"
        }
        if(L < obj.offsetLeft){
            var v = (obj.offsetLeft - L)/20;
            v = Math.ceil(v);
            obj.style.left = obj.offsetLeft - v + "px"
        }
    },t)
}
//变速动画结束；
