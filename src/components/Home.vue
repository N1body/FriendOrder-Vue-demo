<template>
  <div class="index">
		<div id="header" style="">
			<van-nav-bar
				fixed
				@click-left="onClickLeft"
				@click-right="onClickRight">
				<template #right>
				    <van-icon name="message" size="22" color="black"/>
				</template>
				<template #left>
				    <van-icon name="position" size="20" color="black"/>
						<p style="font-size: 15px;">{{returnUser.school}}</p>
						<van-icon name="arrow" size="15" color="black"/>
				</template>
			</van-nav-bar>
			<van-popup v-model="showArea" position="bottom">
			  <van-area
					title="选择学校"
			    :area-list="areaList"
			    @confirm="onConfirm"
			    @cancel="showArea=false"
			  />
			</van-popup>
		</div>
		<div id="content">
			<van-tabs v-model="activeKey" color="#1989fa" title-active-color="#1989fa">
				<van-swipe :autoplay="2500" indicator-color="#1989fa">
				  <van-swipe-item><img src="../assets/img/01.jpg" style="width: 100%;"></van-swipe-item>
				  <van-swipe-item><img src="../assets/img/02.jpg" style="width: 100%;"></van-swipe-item>
				  <van-swipe-item><img src="../assets/img/03.jpg" style="width: 100%;"></van-swipe-item>
				  <van-swipe-item><img src="../assets/img/04.jpg" style="width: 100%;"></van-swipe-item>
				</van-swipe>
			  <van-tab title="我要接单" name="我要接单" style="">
					<div id="recommand-order" style="text-align: center;">
						<p id="recommand-title" style="color: #1989fa;">推荐订单</p>
						<div id="empty" v-show="empty"><van-empty
							image-size="100px"
						  class="custom-image"
						  :image="empty_logo"
						  description="暂无订单"
						/></div>
					</div>
				</van-tab>
				
			  <van-tab title="我要下单" name="我要下单">
					<van-grid clickable :column-num="2" :gutter="5" direction="horizontal" :border="true" style="height: 150px;">
					  <van-grid-item icon="send" text="帮取送" @click="PlaceOrder('帮取送')"/>
						<van-grid-item icon="buy" text="帮买物" @click="PlaceOrder('帮买物')"/>
						<van-grid-item icon="library" text="帮借书" @click="PlaceOrder('帮借书')"/>
						<van-grid-item icon="book" text="帮还书" @click="PlaceOrder('帮还书')"/>
					</van-grid>
				</van-tab>
			</van-tabs>
			
		</div>
		<div id="footer">
			<van-tabbar v-model="active" route>
			  <van-tabbar-item replace to="/home" name="home" icon="home">主页</van-tabbar-item>
			  <van-tabbar-item replace to="/type" name="type" icon="type">分类</van-tabbar-item>
			  <van-tabbar-item replace to="/order" name="order" icon="order">订单</van-tabbar-item>
			  <van-tabbar-item replace to="/me" name="me" icon="me">我的</van-tabbar-item>
			</van-tabbar>
		</div>
  </div>
</template>

<script>
import Vue from 'vue';

import VueRouter from 'vue-router'

import allschool from '../AllSchool.js'
import { Toast } from 'vant';

Vue.use(VueRouter).use(Toast);

export default {
  name: 'Login',
	data() {
	  return {
	    active: 'home',
			activeKey: '我要接单',
			showArea: false,
			areaList: allschool,
			empty_logo: require('../assets/img/empty.png'),
			empty: true,
			orderList: [],
	  };
	},
	methods: {
		PlaceOrder(type){
			if(this.returnStatement=='login'){
				Toast('请先登录再下单');
			}
			else{
				if(this.returnUser.school=='未选择学校'){
					Toast('请先选择学校');
					this.showArea = true;
				}
				else{
					this.$router.push({name:'placeorder', params:{type:type}});
				}
			}
		},
	  onClickLeft(){
			this.showArea = true;
		},
		onClickRight(){
			
		},
		onConfirm(values) {
			var school = values
					.filter((item) => !!item)
					.map((item) => item.name)[2];
			var user = JSON.parse(JSON.stringify(this.returnUser));
			user.school = school;
			this.returnUser.school = user.school; 
			localStorage.setItem(user.username, JSON.stringify(user));
			this.showArea = false;
		},
	},
	computed: {
		returnStatement(){return this.$store.state.statement},
		returnUser(){
			this.$store.commit('userInit');
			return this.$store.state.user;
		},
		
	}
}
</script>


<style scoped>
.index{
	position: absolute;
	/* height: 100%; */
	width: 100%;
	top: 46px;
	left: 0;
	bottom: 50px;
	overflow-y: auto;
	background-color: #F4F4F4;
}
.custom-image{
	margin-top: 20%;
}

.order-box{
	width: 95%; 
	height: 250px; 
	background-color: white; 
	margin: 0 2.5%; 
	border-radius: 10px; 
	border: 1px solid #1989fa;
}

.order-header{
	height: 40px; 
	line-height: 40px; 
	margin: 0; 
	width: 95%; 
	/* background-color: #007FAA; */
	margin: 0 2.5%;
	font-size: 15px;
	border-bottom: 2px dashed #1989fa;
}
.order-content{
	
}
.order-remark{
	margin: 0 2.5%;
	color: #1989fa;
}
.order-remark>span{
	color: black;
}
.order-content>p{
	margin: 2% 4%;
}
.pick-address{
}
.pick{
}
.pick-address{
}
.pick{
}
.address-icon-title{
	font-size: 20px; 
	line-height: 40px; 
	background-color: #0088FF; 
	width: 40px; 
	height: 40px; 
	text-align: center; 
	color: white; 
	border-radius: 10px; 
	margin: 15.5px 10px;
	float: left;
}
</style>
