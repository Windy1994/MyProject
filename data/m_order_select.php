<?php
	header("Content-Type:application/json;charset=utf-8");
	@$uphone=$_REQUEST['uphone'];
	require('init.php');
	$sql="SET NAMES UTF8";
	mysqli_query($conn,$sql);
	$sql="SELECT uid FROM m_user WHERE uphone='$uphone'";
	$result=mysqli_query($conn,$sql);
	$row=mysqli_fetch_row($result);
	if($row){
		$uid=$row[0];
	}else{
		die('{"msg":"err","reason":"non-exists"}');
	}
	$sql="SELECT cid FROM m_cart WHERE userId='$uid'";
	$result=mysqli_query($conn,$sql);
	$row=mysqli_fetch_row($result);
	if($row){
		$cid=$row[0];
	}else{
		die("[]");
	}
	$sql="SELECT pid,pname,pic,price,network,color,capacity,did,orderTime FROM store_all_product,m_cart_detail WHERE pid=productId AND cartId='$cid' ORDER BY price DESC";
	$result=mysqli_query($conn,$sql);
	$row=mysqli_fetch_all($result,MYSQLI_ASSOC);
	echo json_encode($row);