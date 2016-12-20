//$(function(){
//    var i=0;
//    var clone=$('.m_carousel #imgs img').first().clone();
//    $('.m_carousel #imgs').append(clone);
//    var size=$('.m_carousel #imgs img').size();
//
//    for(var j=0;j<size-1;j++){
//        $('.m_carousel #buttons').append('<span></span>');
//        $('#buttons span').first().addClass('on');
//    }
//    $('#buttons span').click(function(){
//        var index=$(this).index();
//        i=index;
//        $('.m_carousel #imgs').stop().animate({
//            left:-index*1250
//        },500)
//        $(this).addClass('on').siblings().removeClass('on');
//    })
//    function moveR(){
//        i++;
//        if(i==size){
//            $('.m_carousel #imgs').css({left:0})
//            i=0;
//        }
//        $('.m_carousel #imgs').stop().animate({
//            left:-i*1250
//        },500)
//        if (i==size-1){
//            $('#buttons span').eq(0).addClass('on').siblings().removeClass('on');
//        }else{
//            $('#buttons span').eq(i).addClass('on').siblings().removeClass('on');
//        }
//
//    }
//    $('#next').click(function(){
//        moveR()
//    })
//
//    function moveL(){
//        i--;
//        if(i==-1){
//            $('.m_carousel #imgs').css({left:-(size-1)*1250})
//            i=size-2;
//        }
//        $('.m_carousel #imgs').stop().animate({
//            left:-i*1250
//        },500)
//        $('#buttons span').eq(i).addClass('on').siblings().removeClass('on');
//
//    }
//    $('#prev').click(function(){
//        moveL();
//    })
//
//    var timer=setInterval(function(){
//        i++;
//        if(i==size){
//            $('.m_carousel #imgs').css({left:0})
//            i=0;
//        }
//        $('.m_carousel #imgs').stop().animate({
//            left:-i*1250
//        },500)
//        $('#buttons span').eq(i).addClass('on').siblings().removeClass('on');
//    },2000)
//
//    $('.m_carousel').hover(function(){
//            clearInterval(timer);
//    },function(){
//        timer=setInterval(moveR,2000)
//    })
//})
$(function(){
    var imgList=$('#imgs img');
    var imgLength=imgList.length;
    var _index=0;
    var _moving;
    var btn_ul='<ul>';
    for(var i=0;i<imgLength;i++){
        btn_ul+='<li></li>';
    }
    btn_ul+='<ul>';
    $('#buttons').html(btn_ul);
    var btnList=$('#buttons li');
    btnList.mouseover(function(){
        _index=btnList.index(this);
        imgList.filter(':visible').fadeOut(200,function(){
            imgList.eq(_index).fadeIn(200);
        })
        $(this).addClass('on').siblings().removeClass('on');
    }).eq(0).mouseover();
    _moving=setInterval(autoShow,2000);

    imgList.hover(function(){
        clearInterval(_moving)
    },function(){
        _moving=setInterval(autoShow,2000);
    })
    function autoShow(){
        _index++;
        if(_index==imgLength){
            _index=0;
        }
        btnList.eq(_index).trigger('mouseover');
    }
})