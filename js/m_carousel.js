/**
 * Created by Administrator on 2016/11/29 0029.
 */
/*封装$*/
/*window.$=HTMLElement.prototype.$=function(selector){
 var elems=(this==window?document:this)
 .querySelectorAll(selector);
 return elems.length==0?null:elems.length==1?elems[0]:elems;
 }
 /*广告图片数组*/
var imgs=[
    {"i":0,"img":"img/b_1.jpg"},
    {"i":1,"img":"img/b_2.jpg"},
    {"i":2,"img":"img/b_3.jpg"},
    {"i":3,"img":"img/b_4.jpg"},
    {"i":4,"img":"img/b_5.jpg"},
];
var adv={
    LIWIDTH:0,   //每个li的width
    $ulImgs:null,//#ings的ul
    INTERVAL:1000,//动画的时间间隔
    WAIT:3000,    //定时器时间
    timer:null,   //自动轮播定时器的序号
    init(){
        //获取id为slide的width转为浮点数保存在LIWIDTH中
        this.LIWIDTH=parseFloat($(".m_carousel").css("width"));
        this.$ulImgs=$("#imgs");
        this.updateView();
        $("#indexs").on("mouseover","li",
            (e)=>{
                //用index检查当前li在indexs>li中的下标i保存在变量target
                var target=$("#indexs>li").index(e.target);
                //获取当前的ings0位置的i的值保存在old中
                var old=imgs[0].i;
                this.move(target-old);
            }
        );
        this.autoMove();
    },
    autoMove(){
        this.timer=setTimeout(this.move.bind(this,1),this.WAIT);
        //	 this.timer=setTimeout(()=>this.move(1),this.WAIT);
    },
    move(n){
        clearTimeout(this.timer);
        if(n<0){
            this.movePrev(n);
            this.$ulImgs.stop(true);
            this.$ulImgs.animate({left:0 },
                this.INTERVAL,
                ()=>this.autoMove()
                //this.moveLeftCallback(n);
            );
        }else{
            this.$ulImgs.stop(true);
            this.$ulImgs.animate({left:-n*this.LIWIDTH },
                this.INTERVAL,
                ()=>this.moveCallback(n)
            );
        }
    },
    movePrev:function(n){//右移
        n*=-1;
        imgs=imgs.splice(-n,n).concat(imgs);
        this.updateView();
        this.$ulImgs.css("left",parseFloat(
                this.$ulImgs.css("left"))-n*this.LIWIDTH);
    },
    moveCallback(n){
        imgs=imgs.concat(imgs.splice(0,n));
        this.updateView();
        this.$ulImgs.css("left",0);
        this.autoMove();
    },
    updateView(){//将imgs数组中的内容更新到页面
        //遍历imgs同时声明lis和idxs为空字符串
        for(var i=0,lis="",idxs="";i<imgs.length;i++){
            lis+=`<li><img src="${imgs[i].img}"></li>`;
            idxs+="<li></li>";
            //设置$ulImgs的内容为lis
            this.$ulImgs.html(lis)
            //设置$ulImgs的width为ings的长度乘LIWIDTH（li的宽度）
            this.$ulImgs.css("width",imgs.length*this.LIWIDTH);
            //设置id为indexs的内容为lis
            $("#indexs").html(idxs);
            //设置id为indexs下的（imgs[0].i）位置的li的class为"hover"
            //其中（imgs[0].i）是imgs中0位置的元素的i属性值
            $("#indexs").children(`li:eq(${imgs[0].i})`)
                .addClass("hover");
        }
    }
}
adv.init();

