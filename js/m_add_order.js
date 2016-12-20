$(function(){
    var loginName=sessionStorage.getItem('phone');
    $('#m_header').load('data/header.php',function(){
        if(loginName) {
            $('.m_my ul li:nth-child(3)').html("<a href='m_login.html'>"+loginName+"</a>"+"<p>退出</p>");
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
    function GetQueryString(name)
    {
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if(r!=null)return  unescape(r[2]); return null;
    }
    var pid=GetQueryString("pid");
    $.ajax({
        type:'POST',
        url:'data/m_detail.php',
        data:{'pid':pid},
        success:function(list){
            var p=list[0];
            var html='';
            html+=`
                        <table>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>单价</th>
                                    <th>数量</th>
                                    <th>小计</th>
                                    <th>配送方式</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <img src="${p.pic}">
                                        <div class="parameter">
                                            <p>${p.pname}</p>
                                            <p>${p.network} ${p.color} ${p.capacity}</p>
                                        </div>
                                    </td>
                                    <td>¥${p.price}</td>
                                    <td>1</td>
                                    <td>¥${p.price}</td>
                                    <td>快递配送:运费 <span>￥0.00</span></td>
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td colspan="5">
                                        <div class="product_info">
                                            <p>发票类型：电子发票</p>
                                            <p>发票抬头：默认为收货人姓名</p>
                                        </div>
                                        <div class="product_total_price">
                                            <h4>合计：<span>¥${p.price}</span></h4>
                                        </div>
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
            `;
            $('.order_detail').html(html);
            html=`
                 <a href="${p.pid}">提交订单</a>
            `;
            $('.order_pay').html(html);
        }

    })
    $('.order_pay').on('click','a',function(e){
        e.preventDefault();
        var pid=$(this).attr('href');
        console.log(pid);
        $.ajax({
            type:'POST',
            url:'data/m_order_add.php',
            data:{'uphone':loginName,'pid':pid},
            success:function(list){
                if(list==='ok'){
                    $('.order_header').slideUp(800);
                    $('.order_consignee').slideUp(800);
                    $('.order_pay').slideUp(800);
                    $('.order_confirm h3').hide();
                    $('.order_detail').html(` <h5>您的订单提交成功！</h5>
                        <p>去 <a href="m_order.html">我的订单</a> 看看购买了那些商品吧</p>
                        <p>您还可以 <a href="m_store.html">返回</a> 继续购买其他商品</p>`);
                }
            }
        })
    })
})
