<?php
    header('Content-Type:text/plain;charset=utf-8');
    @$uphone=$_REQUEST['uphone'];
    @$upwd=$_REQUEST['upwd'];
    if(!$uphone||!$upwd){
        return;
    }
    require('init.php');
    $sql='SET NAMES UTF8';
    mysqli_query($conn,$sql);
    $sql="SELECT * FROM m_user WHERE uphone='$uphone' AND upwd='$upwd'";
    $result=mysqli_query($conn,$sql);
    $list=mysqli_fetch_all($result,MYSQLI_ASSOC);
    if(!$list){
        echo "err";
    }else{
        echo 'ok';
    }
