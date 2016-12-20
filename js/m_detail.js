$(function(){
    var loginName=sessionStorage.getItem('phone');

    function GetQueryString(name){
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if(r!=null)return  unescape(r[2]); return null;
    }
    var pid=GetQueryString("pid");
    $('#m_header').load('data/header.php',function(){
        if(loginName) {
            $('.m_my ul li:nth-child(3)').html("<a href='m_login.html'>"+loginName+"</a>"+"<p>退出</p>");
        }else{
            $('.m_my ul li:nth-child(3) a').html('登录');
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
        $('.m_my ul li:nth-child(3) a').html(loginName);
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
    $('.m_footer_box').load('data/footer.php',function(){

        $('.m_main').on('click','.product_detail>a',function(e){
            e.preventDefault();
            if(loginName){
                location.href="m_add_order.html?pid="+pid;
            }else{
                location.href="m_login.html";
            }
        })
        $.ajax({
            type:'POST',
            url:'data/m_detail.php',
            data:{pid:pid},
            success:function(list){
                console.log(list);
                var html='';
                var p=list[0];
                html+=`
                <div class="m_main_header">
                    <a href="m_store.html">首页</a>
                    <span>&nbsp;>&nbsp; ${p.pname}</span>
                </div>
                <div class="m_main_body">
                    <div class="product_img">
                        <img src="${p.bigpic}">
                    </div>
                    <div class="product_detail">
                        <h4>${p.pname}</h4>
                        <b>${p.gift}</b>
                        <p><span>价格:</span>¥${p.price}</p>

                `;
                if(p.network!=='') {
                    html+=`
                <h5><span>网络类型:</span ><a href = "#" >${p.network}</a></h5>
             `
                };
                html+=`
             <h5><span>颜色分类:</span><a href="#">${p.color}</a></h5>
        `;
                if(p.capacity!==""){
                    html+=`
                <h5><span>内存容量:</span><a href="#">${p.capacity}</a></h5>
            `;
                }
                if(p.package!==""){
                    html+=`
                <h5><span>套餐:</span><a href="#">${p.package}</a></h5>
            `;
                }
                html+=`
        <h5><span>支持:</span>
                            <ul>
                                <li><i>√</i>花呗分期</li>
                                <li><i>√</i>顺丰包邮</li>
                                <li><i>√</i>7天无理由退货</li>
                            </ul></h5>
                        <h5><span>服务:</span>本商品由 魅族 负责发货并提供售后服务</h5>
                        <a href="#">立即购买</a>
                    </div>
                    <div class="detail_pic">
                        <p>商品详情</p>
                        <img src="img/detail_pic_1.jpg" alt="">
                        <img src="img/detail_pic_2.jpg" alt="">
                        <img src="img/detail_pic_3.jpg" alt="">
                        <img src="img/detail_pic_4.jpg" alt="">
                        <img src="img/detail_pic_5.jpg" alt="">
                        <img src="img/detail_pic_6.jpg" alt="">
                        <img src="img/detail_pic_7.jpg" alt="">
                        <img src="img/detail_pic_8.jpg" alt="">
                        <img src="img/detail_pic_9.jpg" alt="">
                    </div>
                </div>`;
                $('.m_main').html(html);
            }
        })

    });
})