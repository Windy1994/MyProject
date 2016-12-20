$(function(){

    $('.m_register_box>div>a').click(function(e){
        e.preventDefault();
        var uphone=document.getElementById('uphone').value;
        var upwd=document.getElementById('upwd').value;
        var phoneReg=/^[1][358][0-9]{9}$/;
        var pwdReg=/\w{8,16}/g;
        if(uphone===''){
            $('.m_register_box input[type="text"]').next().html('手机号码不能为空').css('color','#F95454');
            $('.m_register_box input[type="text"]').focus();
        }else if(!phoneReg.test(uphone)){
            $('.m_register_box input[type="text"]').next().html('手机号码格式错误').css('color','#F95454');
            $('.m_register_box input[type="text"]').focus();
        }else if(upwd===''){
            $('.m_register_box input[type="password"]').next().html('密码不能为空').css('color','#F95454');
            $('.m_register_box input[type="password"]').focus();
        }else if(!pwdReg.test(upwd)){
            $('.m_register_box input[type="password"]').next().html('密码格式错误').css('color','#F95454');
            $('.m_register_box input[type="password"]').focus();
        }else {
            $.ajax({
                type: 'POST',
                url: 'data/m_user_add.php',
                data: {'uphone': uphone, 'upwd': upwd},
                success: function (result) {
                    console.log(result)
                    $('.m_register_box>div>a').html('注册成功');
                    setTimeout(function(){
                        location.href="m_login.html";
                    },1000)

                },
                error:function(list){
                    console.log(list)
                }
            })
        }
    })
    $('.m_register_box input[type="text"]').focus(function(){
        $(this).attr('placeholder','大陆手机号码');
    })
    $('.m_register_box input[type="password"]').focus(function(){
        $(this).attr('placeholder','密码长度为8-16个数字');
    })
    $('.m_register_box input[type="text"]').blur(function(){
        $(this).attr('placeholder','手机号码');
        var phone=$(this).val();
        var regexp=/^[1][358][0-9]{9}$/;
        if(!regexp.test(phone)&&phone!==''){
            $(this).next().html("手机号码格式错误").css('color','#F95454');
        }else if(phone===''){
            $(this).next().html("");
        }
        if(phone!==""&&regexp.test(phone)){
            $.ajax({
            type:'POST',
            url:'data/m_user_select.php',
            data:{uphone:phone},
            success:function(result){
                if(result[0]===undefined){
                    $('.m_register_box input[type="text"]').next().html("该手机号未被注册").css('color','#05CE3E');
                }else{
                    $('.m_register_box input[type="text"]').next().html(result[0].uphone+"  已被注册").css('color','#F95454');
                }
            }
        })
        }
    })
    $('.m_register_box input[type="password"]').blur(function(){
        $(this).attr('placeholder','密码');
        var pwd=$(this).val();
        var regexp=/\w{8,16}/g;
        if(!regexp.test(pwd)&&pwd!==''){
            $(this).next().html('密码格式错误').css('color','#F95454');
        }else{
            $(this).next().html('');
        }
    })
})