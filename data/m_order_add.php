<?php
	header("Content-Type:text/plain;charset=utf-8");
	@$uphone=$_REQUEST['uphone'];
	@$pid=$_REQUEST['pid'];
	$orderTime=time()*1000;
	if(!$uphone||!$pid){
	    return;
	}
	require('init.php');
	$sql="SET NAMES UTF8";
	mysqli_query($conn,$sql);
	$sql="SELECT uid FROM m_user WHERE uphone='$uphone'";
	$result=mysqli_query($conn,$sql);
	$row=mysqli_fetch_row($result);
	$uid=$row[0];
	$sql="SELECT cid FROM m_cart WHERE userId='$uid'";
	$result=mysqli_query($conn,$sql);
	$row=mysqli_fetch_row($result);
	if($row){
		$cid=$row[0];
	}else{
		$sql="INSERT INTO m_cart VALUES(NULL,'$uid')";
		mysqli_query($conn,$sql);
		$cid=mysqli_insert_id($conn);
	}
	$sql="SELECT did FROM m_cart_detail WHERE cartId='$cid' AND productId='$pid'";
	$result=mysqli_query($conn,$sql);
	$row=mysqli_fetch_row($result);
	if(!$row){
        $sql="INSERT INTO m_cart_detail VALUES(NULL,'$cid','$pid','$orderTime','$orderTime')";
        $result=mysqli_query($conn,$sql);
    }
    echo 'ok';