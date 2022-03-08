<template>
  <div class="index">
		<div id="header" style="height: 46px;">
			<van-nav-bar 
				fixed
				title="分类订单"/>
		</div>
		<div id="content" style="background-color: white; height: 100%;">
			<!-- <van-search v-model="search_value" placeholder="请输入订单标题关键字" shape="round" /> -->
			<div id="sidebar">
				<van-sidebar v-model="activeKey">
					<van-sidebar-item title="所有订单"/>
					<van-sidebar-item title="帮取送" />
					<van-sidebar-item title="帮买物" />
					<van-sidebar-item title="帮借书" />
					<van-sidebar-item title="帮还书" />
				</van-sidebar>
			</div>
			<div id="type-order">
				<div id="empty" v-show="empty"><van-empty
					image-size="100px"
				  class="custom-image"
				  :image="empty_logo"
				  description="暂无订单"
				/></div>
				<!-- <div style="width: 95%; height: 100px; border: 1px solid #0000EE; margin: 2% 2.5%;"></div> -->
			</div>
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
			school: "江西财经大学",
			activeKey: 0,
			search_value: '',
			empty_logo: require('../assets/img/empty.png'),
			empty: true,
	  };
	},
	methods: {
	  
	},
	computed: {
		
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.index{
	position: absolute;
	width: 100%;
	top: 0;
	left: 0;
	bottom: 50px;
	overflow-y: auto;
	background-color: #FFFFFF;
}
#sidebar{
	float: left; 
	width: 80px; 
	height: 100%; 
	position: fixed; 
	background-color: #F7F8FA;
	top: 46px;
}

#type-order{
	position: absolute; 
	/* background-color: #1989fa; */
	left: 80px; 
	right: 0;
	top: 46px;
	
}
.custom-image{
	position: fixed;
	left: 80px;
	right: 0;
	top: 250px;
}
</style>
