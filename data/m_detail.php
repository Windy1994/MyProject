<?php
    header('Content-Type:application/json;charset=utf-8');
    $pid=$_REQUEST['pid'];
    require('init.php');
    $sql="SET NAMES UTF8";
    mysqli_query($conn,$sql);
    $sql="SELECT * FROM store_all_product WHERE pid='$pid'";
    $result=mysqli_query($conn,$sql);
    $list=mysqli_fetch_all($result,MYSQLI_ASSOC);
    echo json_encode($list);