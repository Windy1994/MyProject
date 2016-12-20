<?php
header('Content-Type:application/json;charset=utf-8');
$ptype=$_REQUEST['ptype'];
require('init.php');
$sql='SET NAMES UTF8';
mysqli_query($conn,$sql);
$sql="SELECT * FROM m_navbar_product WHERE ptype='$ptype'";
$reslut=mysqli_query($conn,$sql);
if($reslut===false){
    echo 'ERR';
}else{
    $list=mysqli_fetch_all($reslut,MYSQLI_ASSOC);
    echo json_encode($list);
}