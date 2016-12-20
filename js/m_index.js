$(function(){
    $('.m_navbar ul li').on('mouseover','a',function(e){
        $(this).click(function(e){
            e.preventDefault();
        })
        e.preventDefault();
        var i=$(this).attr('href');
        $.ajax({
            type:'GET',
            url:'data/m_product.php?ptype='+i,
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
								</a>
							</li>
							`;
                }
                html+='</ul>';
                $('.m_top_product').html(html);
            },
            error:function(){
                console.log('ERR');
            }
        })
        $('.m_top').css('backgroundColor','#fff');
        $('.m_top_product').show().css('backgroundColor','#fff');
    })
    $('.m_navbar').mouseleave(function(){
        $('.m_top_product').hide();
        $('.m_top').css('backgroundColor','rgba(0,0,0,0)');
    })
})
