<?php
    header('Content-Type:application/json;charset=utf-8');
    $uphone=$_REQUEST['uphone'];
    require('init.php');
    $sql='SET NAMES UTF8';
    mysqli_query($conn,$sql);
    $sql="SELECT uphone FROM m_user WHERE uphone='$uphone'";
    $result=mysqli_query($conn,$sql);
    if($result===false){
        echo $result;
    }else{
        $row=mysqli_fetch_all($result,MYSQLI_ASSOC);
        echo json_encode($row);
    }