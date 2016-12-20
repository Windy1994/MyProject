$(function(){
    var loginName=sessionStorage.getItem('phone');
    $('#m_header').load('data/header.php',function(){
        if(loginName) {
            $('.m_my ul li:nth-child(3)').html("<a href='m_order.html'>"+loginName+"</a>"+"<p>退出</p>");
        }else{
            location.href="m_login.html";
        }
        if( $('.m_my ul li:nth-child(3) a').html()!=='登录'){
                $('.m_my ul li:nth-child(3) a').click(function(e){
                    e.preventDefault();
                    location.href="m_order.html";
                })
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
    });
    $('.m_footer_box').load('data/footer.php');
    $('.m_main .order_left').on('click','a:not([class="type_title"])',function(e){
        e.preventDefault();
        $(this).addClass('active').siblings('.active').removeClass('active');
        var html=$(this).html();
        $('.m_main .order_right').html("<h1>"+html+"</h1>");
    })

    $('.order_right .right_header li').on('click','a',function(e){
        e.preventDefault();
        $(this).addClass('active').parent().siblings('li').children('a.active').removeClass('active');
    })
    Date.prototype.toMZString=function(){

        return `${this.getFullYear()}-${this.getMonth()+1}-${this.getDate()}&nbsp;&nbsp;${this.getHours()}:${this.getMinutes()}:${this.getSeconds()}`;
    }
    $.ajax({
        type:'POST',
        url:'data/m_order_select.php',
        data:{'uphone':loginName},
        success:function(list){
            var html='';
            for(var i=0;i<list.length;i++){
                var p=list[i];
                html+=`
                    <tr class="trHead">
                                    <td colspan="5">
                                        <div>
                                            下单时间： <span class="order_time">${new Date(parseInt(p.orderTime)).toMZString()}</span>
                                            订单号：<span class="order_number">${p.orderTime}</span>
                                        </div>
                                    </td>
                                </tr>
                                <tr class="list_box">
                                    <td>
                                        <div class="box_border">
                                            <a href="#">
                                                <img src="${p.pic}" alt="" style="width: 90px">
                                            </a>
                                            <div>
                                                <p>${p.pname} ${p.network} ${p.color} ${p.capacity}</p>
                                                <span>￥${parseInt(p.price)}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <p>￥${p.price}</p>
                                    </td>
                                    <td>等待付款</td>
                                    <td>
                                        <a href="#">查看详情</a>
                                    </td>
                                </tr>
                                <tr class="tr_empty"></tr>
                `;
            }
            $('.order_table table tbody').html(html);
        }
    })
})
