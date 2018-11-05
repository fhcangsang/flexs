$(function(){
        //轮播图1开始
        var index = 1
        $(".btn .next").click(function(){
            index++
            if(index==6){
                $(".newMovie .bottom ul li").css("left","-712px")
                index=2
            }
            var x = -712*index+"px"
            $(".newMovie .bottom ul li").stop(true).animate({left:x},1000)
            var y = index
            if(y==5){y=1}
            $(".newMovie .top .right .num").text(y)
        })
        $(".btn .prev").click(function(){
            index--
            if(index==-1){
                $(".newMovie .bottom ul li").css("left","-2848px")
                index=3
            }
            var x = -712*index+"px"
            $(".newMovie .bottom ul li").stop(true).animate({left:x},1000)
            var y = index
            if(y==0){y=4}
            $(".newMovie .top .right .num").text(y)
        })
        function roll(){
            index++
            if(index==6){
                $(".newMovie .bottom ul li").css("left","-712px")
                index=2
            }
            var x = -712*index+"px"
            $(".newMovie .bottom ul li").stop(true).animate({left:x},1000)
            var y = index
            if(y==5){y=1}
            $(".newMovie .top .right .num").text(y)
        }
        var nM_roll = setInterval(roll,2500)
        //轮播图一结束

        //轮播图二开始
        var index_2 = 1
        $(".recentMovie .bottom .btn_two .ul_btn .next").click(function(){
            index_2++
            var x_2 = -712*index_2+"px"
            $(".recentMovie .bottom .ul_main li").stop(true).animate({left:x_2},1000)
            if(index_2==5){
                $(".recentMovie .bottom .ul_main li").css("left","-712px")
            }



            var y_2 = index_2-1
            if(y_2==4){y_2=0}
            $(".recentMovie .bottom .btn_two .ul_btn .point").eq(y_2).addClass("blue").siblings().removeClass("blue")
        })
        $(".recentMovie .bottom .btn_two .ul_btn .prev").click(function(){
            index_2--
            if(index_2==-1){
                $(".recentMovie .bottom .ul_main li").css("left","-2848px")
                index_2 = 3
            }
            var x_2 = -712*index_2+"px"
            $(".recentMovie .bottom .ul_main li").stop(true).animate({left:x_2},1000)
            var y_2 = index_2-1
            if(y_2==-1){y_2=3}
            $(".recentMovie .bottom .btn_two .ul_btn .point").eq(y_2).addClass("blue").siblings().removeClass("blue")
        })
        $(".recentMovie .bottom .btn_two .ul_btn .point").click(function(){
            index_2 = $(this).index()
            var x_2 = -712*index_2+"px"
            $(".recentMovie .bottom .ul_main li").stop(true).animate({left:x_2},1000)
            $(this).addClass("blue").siblings().removeClass("blue")
        })
        //轮播图二结束
        //轮播图三开始
        var index_3 = 1
        $(".recentTV .bottom .btn_two .ul_btn .next").click(function(){
            index_3++
            if(index_3==6){
                $(".recentTV .bottom .ul_main li").css("left","-712px")
                index_3 = 2
            }
            var x_3 = -712*index_3+"px"
            $(".recentTV .bottom .ul_main li").stop(true).animate({left:x_3},1000)
            var y_3 = index_3-1
            if(y_3==4){y_3=0}
            $(".recentTV .bottom .btn_two .ul_btn .point").eq(y_3).addClass("blue").siblings().removeClass("blue")
        })
        $(".recentTV .bottom .btn_two .ul_btn .prev").click(function(){
            index_3--
            if(index_3==-1){
                $(".recentTV .bottom .ul_main li").css("left","-2848px")
                index_3 = 3
            }
            var x_3 = -712*index_3+"px"
            $(".recentTV .bottom .ul_main li").stop(true).animate({left:x_3},1000)
            var y_3 = index_3-1
            if(y_3==-1){y_3=3}
            $(".recentTV .bottom .btn_two .ul_btn .point").eq(y_3).addClass("blue").siblings().removeClass("blue")
        })
        $(".recentTV .bottom .btn_two .ul_btn .point").click(function(){
            index_3 = $(this).index()
            var x_3 = -712*index_3+"px"
            $(".recentTV .bottom .ul_main li").stop(true).animate({left:x_3},1000)
            $(this).addClass("blue").siblings().removeClass("blue")
        })
        //轮播图三结束
        //轮播图四开始
        var index_4 = 1
        $(".hotRecommend .top .right .btn .next").click(function(){
            index_4++
            if(index_4==9){
                $(".hotRecommend .info ul li").css("left","-650px")
                index_4=2
            }
            var x_4 = -650*index_4 +"px"
            $(".hotRecommend .info ul li").stop(true).animate({left:x_4},1000)
            var y_4 = index_4
            if(y_4==8){y_4=1}
            $(".hotRecommend .top .right .num").text(y_4)
        })
        $(".hotRecommend .top .right .btn .prev").click(function(){
            index_4--
            if(index_4 ==-1){
                $(".hotRecommend .info ul li").css("left","-4550px")
                index_4=6
            }
            var x_4 = -650*index_4+"px"
            $(".hotRecommend .info ul li").stop(true).animate({left:x_4},1000)
            var y_4 = index_4
            if(y_4 ==0){y_4 =7}
            $(".hotRecommend .top .right .num").text(y_4)
        })
        function roll_4(){
            index_4++
            if(index_4==9){
                $(".hotRecommend .info ul li").css("left","-650px")
                index_4=2
            }
            var x_4 = -650*index_4 +"px"
            $(".hotRecommend .info ul li").stop(true).animate({left:x_4},1000)
            var y_4 = index_4
            if(y_4==8){y_4=1}
            $(".hotRecommend .top .right .num").text(y_4)
        }
        var nM_roll_4 = setInterval(roll_4,5000)
        //轮播图四结束
    })
