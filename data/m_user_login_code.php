<?php
    header('Content-Type:text/plain;charset=utf-8');
    $uphone=$_REQUEST['uphone'];
    require('init.php');
    $sql='SET NAMES UTF8';
    mysqli_query($conn,$sql);
    $sql="SELECT * FROM m_user WHERE uphone='$uphone'";
    $result=mysqli_query($conn,$sql);
    $list=mysqli_fetch_all($result,MYSQLI_ASSOC);
    if($list){
        echo 'ok';
    }else{
        echo 'err';
    }