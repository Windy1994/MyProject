$(function(){
    var loginName=sessionStorage.getItem('phone');
    $('.m_footer_box').load('data/footer.php');
    $('#m_header').load('data/header.php',function(){
        console.log(loginName)
        if(loginName) {
            $('.m_my ul li:nth-child(3)').html("<a href='m_login.html'>"+loginName+"</a>"+"<p>退出</p>");
        }else{
            $('.m_my ul li:nth-child(3) a').html('登录');
        }
        $('.m_container .m_top .m_my ul li p').click(function(){
            window.sessionStorage.clear();
            window.location.href="m_order.html";
        })
        $('.m_product_list ul li').on('mouseover','a',function(e){
            $(this).click(function(e){
                e.preventDefault();
            })
            e.preventDefault();
            var i=$(this).attr('href');
            $.ajax({
                type:'GET',
                url:'data/s_product_list.php?ptype='+i,
                success:function(list){
                    var html='';
                    html+='<ul>';
                    for(var i=0;i<list.length;i++){
                        var p=list[i];
                        html+=`
							<li class="animated fadeInRight">
								<a href="javascript:;">
									<img src="${p.pic}">
									<p>${p.pname}</p>
									<span>￥${p.price}</span>
								</a>
							</li>
							`;
                    }
                    html+='</ul>';
                    $('.s_phone').html(html);
                },
                error:function(){
                    console.log('ERR');
                }
            });
            $('.s_phone').show();
        })

        $('.s_phone').mouseleave(function(){
            $('.s_phone').hide();
            $('.m_top').css('backgroundColor','rgba(0,0,0,0)');
        })
        if( $('.m_my ul li:nth-child(3) a').html()!=='登录'){
            $('.m_my ul li:nth-child(3) a').click(function(e){
                e.preventDefault();
                location.href="m_order.html";
            })
        }
    });
    $('.s_navlist ul li:not(:first)').on('mouseover','a',function(e){
        $(this).click(function(e){
            e.preventDefault();
        })
        e.preventDefault();
        var i=$(this).attr('href');
        $.ajax({
            type:'GET',
            url:'data/s_navlist_product.php?ptype='+i,
            success:function(list){
                var html='';
                html+='<ul>';
                for(var i=0;i<list.length;i++){
                    var p=list[i];
                    html+=`
							<li>
								<a href="javascript:;">
									<img src="${p.pic}">
									<p>${p.pname}</p>
								</a>
							</li>
							`;
                }
                html+='</ul>';
                $('.s_nav_pro').html(html);
            },
            error:function(){
                console.log('ERR');
            }
        });
        $('.s_nav_pro').show();
    })
    $('.s_nav').mouseleave(function(){
        $('.s_nav_pro').hide();
    })
    $.ajax({
        type:'POST',
        url:'data/all_product_select.php',
        data:{'ptype':1},
        success:function(list){
            var html='';
            for(var i=0;i<list.length;i++){
                var p=list[i];
                var price=parseInt(p.price);
                html+=`
                    <li>
                        <a href="m_detail.html?pid=${p.pid}">
                            <img src="${p.pic}">
                            <h4>${p.pname}</h4>
                            <p>${p.gift}</p>
                            <b>¥${price}</b>
                        </a>

                    </li>
                `;
            }
            $('.phone_list ul li:nth-child(1)').after(html);
        }
    })
    $.ajax({
        type:'POST',
        url:'data/all_product_select.php',
        data:{'ptype':2},
        success:function(list){
            var html='';
            for(var i=0;i<list.length;i++){
                var p=list[i];
                html+=`
                    <li>
                        <a href="m_detail.html?pid=${p.pid}">
                            <img src="${p.pic}" alt="">
                            <h4>${p.pname}</h4>
                            <p>${p.gift}</p>
                            <b>¥${p.price}</b>
                        </a>

                    </li>
                `;
            }
            $('.parts_list ul li:nth-child(1)').after(html);
        }
    })
    $.ajax({
        type:'POST',
        url:'data/all_product_select.php',
        data:{'ptype':3},
        success:function(list){
            var html='';
            for(var i=0;i<list.length;i++){
                var p=list[i];
                html+=`
                    <li>
                        <a href="m_detail.html?pid=${p.pid}">
                            <img src="${p.pic}" alt="">
                            <h4>${p.pname}</h4>
                            <p>${p.gift}</p>
                            <b>¥${p.price}</b>
                        </a>

                    </li>
                `;
            }
            $('.hardware_list ul li:nth-child(1)').after(html);
        }
    })
    $.ajax({
        type:'POST',
        url:'data/all_product_select.php',
        data:{'ptype':4},
        success:function(list){
            var html='';
            for(var i=0;i<list.length;i++){
                var p=list[i];
                html+=`
                    <li>
                        <a href="m_detail.html?pid=${p.pid}">
                            <img src="${p.pic}" alt="">
                            <h4>${p.pname}</h4>
                            <p>${p.gift}</p>
                            <b>¥${p.price}</b>
                        </a>

                    </li>
                `;
            }
            $('.periphery_list ul li:nth-child(1)').after(html);
        }
    })
    $(window).scroll(function(){
        var top=$('body').scrollTop();
        if(top>1200){
            $('.next_top').css('opacity',1);
        }else if(top<1200){
            $('.next_top').css('opacity',0);
        }
    })
})