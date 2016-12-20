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
    $sql="INSERT INTO m_user VALUES(NULL,'$uphone','$upwd')";
    $result=mysqli_query($conn,$sql);
    if($result===true){
        echo 'ok';
    }else{
        echo 'err';
    }
