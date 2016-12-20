<?php
    header("Content-Type:text/html;charset=utf-8");
    $html='
    <div class="m_top">
            <div class="m_box">
                <div class="m_top_navbar">
                        <ul>
                            <li><a href="index.html">魅族官网</a></li>
                            <li><a href="m_store.html">魅族商城</a></li>
                            <li><a href="javascript:;">Flyme</a></li>
                            <li><a href="javascript:;">专卖店</a></li>
                            <li><a href="javascript:;">服务</a></li>
                            <li><a href="javascript:;">社区</a></li>
                        </ul>

                    </div>
                <div class="m_my">
                    <ul>
                        <li><a href="javascript:;">我的收藏</a></li>
                        <li><a href="m_order.html">我的订单</a></li>
                        <li><a href="m_login.html">登陆</a></li>
                        <li><a href="m_register.html">注册</a></li>
                    </ul>
                </div>

            </div>
        </div>
        <div class="m_product_nav">
            <div class="m_top_logo">
                <a href="m_store.html">
                    <img src="img/m_logo.png" alt="">
                </a>
            </div>
            <div class="m_product_list">
                <ul>
                    <li><a href="1">PRO手机</a></li>
                    <li><a href="2">魅蓝手机</a></li>
                    <li><a href="3">MX手机</a></li>
                    <li><a href="4">精选配件</a></li>
                    <li><a href="5">智能硬件</a></li>
                </ul>
            </div>
            <div class="s_phone">
        </div>
    </div>
    ';
    echo $html;