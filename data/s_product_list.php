<?php
    header('Content-Type:application/json;charset=utf-8');
    $ptype=$_REQUEST['ptype'];
    require('init.php');
    $sql='SET NAMES UTF8';
    mysqli_query($conn,$sql);
    $sql="SELECT * FROM m_s_product_list WHERE ptype='$ptype'";
    $result=mysqli_query($conn,$sql);
    if($result===false){
        echo 'err';
    }else{
        $list=mysqli_fetch_all($result,MYSQLI_ASSOC);
        echo json_encode($list);
    }