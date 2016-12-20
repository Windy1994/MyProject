$('.m_register_box .login_id input[type="text"]').focus(function(){
    $(this).attr('placeholder','大陆手机号码');
})
$('.m_register_box .login_id input[type="password"]').focus(function(){
    $(this).attr('placeholder','密码长度为8-16个数字');
})
$('.m_register_box .login_id input[type="text"]').blur(function(){
    $(this).attr('placeholder','手机号码');
    var phone=$(this).val();
    var regexp=/^[1][358][0-9]{9}$/;
    if(!regexp.test(phone)&&phone!==''){
        $(this).next().html("手机号码格式错误").css('color','#F95454');
    }else if(phone===''||regexp.test(phone)){
        $(this).next().html("");
    }
})
$('.m_register_box .login_id input[type="password"]').blur(function(){
    $(this).attr('placeholder','密码')
})
$('.m_register_box .login_code input[type="text"]:first').blur(function(){
    var phone=$(this).val();
    var regexp=/^[1][358][0-9]{9}$/;
    if(!regexp.test(phone)&&phone!==''){
        $(this).next().html("手机号码格式错误").css('color','#F95454');
    }else if(phone===''||regexp.test(phone)){
        $(this).next().html("");
    }
})
$('.m_register_box .login_id>a').click(function(e){
    e.preventDefault();
    var uphone=$('.login_id input[type="text"]').val();
    var upwd=$('.login_id input[type="password"]').val();
    var phoneExp=/^[1][358][0-9]{9}$/;
    if(uphone!==''&&upwd!==''&&phoneExp.test(uphone)){
        $.ajax({
        type:'POST',
        url:'data/m_user_login.php',
        data:{'uphone':uphone,'upwd':upwd},
        success:function(list){
            if(list==='ok'){
                sessionStorage.setItem('phone', uphone);
                $('.login_id>a').html('登陆成功');
                setTimeout(function(){
                    location.href='m_store.html';
                },2000)
            }else if(list==='err'){
                $('.login_id input[type="text"]').focus().next().html('手机号或密码错误').css('color','#F95454');
                $('.login_id input[type="password"]').val('');
            }
        },
        error:function(){
            console.alert('err');
        }
    })
    }
})
$('.login_cookie>span').click(function(){
    $(this).toggleClass('yes');
})
$('.login_cookie>a').click(function(e){
    e.preventDefault();
    $(this).prev().toggleClass('yes');
})
$('.login_code').on('click','div>a',function(e){
    e.preventDefault();
    var code='';
    for(var i=0;i<5;i++){
        code+=Math.floor(Math.random()*10);
    }
    $(this).html(code+" (刷新) ");
})
$('.login_code>a').click(function(e){
    e.preventDefault();
    var produceCode=$(this).prev().children('a').html().slice(0,5);
    var inputCode=$(this).prev().children('input').val();
    var uphone=$(this).siblings('input').val();
    console.log(produceCode);
    if(produceCode===inputCode){
        $(this).prev().children('i').html('');
        $.ajax({
            type:'POST',
            url:'data/m_user_login_code.php',
            data:{uphone:uphone},
            success:function(result){
                if(result=='ok'){
                    $('.login_code>a').html('登录成功');
                    $('.login_code>i').html('');
                    setTimeout(function(){
                        location.href="m_store.html";
                    },1000)
                }else if(result=='err'){
                    $('.login_code>i').html('手机号错误,请重新输入').css('color','#F95454').prev().focus();
                }
            }
        })
    }else if(produceCode!==inputCode){
        $(this).prev().children('i').html('验证码错误').css('color','#F95454').siblings('input').focus();
    }
})
$('.m_register_box>i').click(function(){
    $(this).toggleClass('toggleIcon').siblings('.type_toggleIcon').removeClass('type_toggleIcon').siblings('div:visible').addClass('type_toggleIcon');
})
$('.tab-title a').click(function(e){
    e.preventDefault();
    var c=$(this).attr('id');
    var pc=$(this).siblings('a').attr('id');
    $(this).addClass('active').siblings('.active').removeClass('active').parent().siblings('.'+c).removeClass('login_hide').siblings('.'+pc).addClass('login_hide');
})