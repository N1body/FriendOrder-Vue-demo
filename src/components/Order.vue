<template>
  <div class="order">
		<div id="header" style="height: 46px;">
			<van-nav-bar
				fixed
				title="我的订单"/>
		</div>
		<div id="title" style="position: fixed; left: 0; right: 0; z-index: 1;">
			<van-tabs v-model="activeKey" color="#1989fa" title-active-color="#1989fa" sticky>
				<van-tab title="全部" name="全部"></van-tab>
				<van-tab title="待接单" name="待接单"></van-tab>
				<van-tab title="待送单" name="待送单"></van-tab>
				<van-tab title="待收单" name="待收单"></van-tab>
				<van-tab title="已完成" name="已完成"></van-tab>
			</van-tabs>
		</div>
		<div class="content" style="margin-top: 54px;">
			<div id="empty" v-show="this.returnUser.order.length==0"><van-empty
				image-size="100px"
			  class="custom-image"
			  :image="empty_logo"
			  description="暂无订单"
			/></div>
			<van-list v-model="loading" :finished="finished" @load="onLoad">
			  <van-cell v-for="item in list" :key="item.orderId" :title="'[' + item.orderTitle + ']'+item.orderId"
				title-style="font-size:12px; font-weight:600"
				v-show="activeKey=='全部'||activeKey==item.orderState"
				@click="test1(item)"
				style="width: 95%; margin: 2% 2.5%; border-radius: 5px;">
					<template>
						<div>{{item.orderState}}</div>
						<div class="order-tool">
							<van-button class="begin-but" size="small" v-show="item.orderState=='待送单'">开始配送</van-button>
							<van-button class="begin-but" size="small" v-show="item.orderState=='待收单'">完成订单</van-button>
							<!-- <van-button class="begin-but" size="small" style="background-color: #F5361C;" v-show="item.orderState=='待送单'">取消配送</van-button> -->
							<van-button class="begin-but" size="small" style="background-color: #F5361C;" v-show="item.orderState!='已完成'" @click.stop="test(item.orderId)">取消订单</van-button>
						</div>
					</template>
					
					<template #label>
						<div class="address" v-show="item.orderTitle!='帮借书'">
							<p class="address-title">取</p>
							<p class="address-info">{{item.pickAddress}}</p>
							<p style="margin: 0 0 0 40px;">{{item.pickInfo}}</p>
						</div>
						<div class="address" v-show="item.orderTitle!='帮还书'">
							<p class="address-title" style="background-color: #F5361C;">收</p>
							<p class="address-info">{{item.receiveAddress}}</p>
							<p style="margin: 0 0 0 40px;">{{item.receiveInfo}}</p>
						</div>
						<div>订单标题：{{item.titleInfo}}</div>
						<div>取件时间：{{item.timeValue}}</div>
						<div>订单备注：{{item.remarkInfo}}</div>
						<!-- <div>下单用户：{{item.placeUser}}</div> -->
						<!-- <div>接单用户：{{item.receiveUser}}</div> -->
						<div style="font-size: 18px; color: black; margin-top: 5px; font-weight: 500;">赏金:￥<span style="color: red;">{{item.numValue}}</span></div>
					</template>
					
				</van-cell>
			</van-list>
		</div>
		<div id="footer" style="height: 50px;">
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
import { Dialog } from 'vant';
Vue.use(VueRouter).use(Toast);

export default {
  name: 'Login',
	data() {
	  return {
	    active: 'home',
			school: "江西财经大学",
			activeKey: '全部',
			empty_logo: require('../assets/img/empty.png'),
			empty: true,
			orderList: this.$store.state.user.order,
			list: [],
			loading: false,
			finished: false,
			text: ''
	  };
	},
	methods: {
		test1(order){
			this.$router.push({name:'orderinfo', params:{order:order}});
		},
		test(id) {
			Dialog.confirm({
			  title: '确认取消该订单？',
			  message: '取消该订单后将无法恢复',
			})
			.then(() => {
				Toast.loading({
					duration: 800, // 持续展示 toast
					forbidClick: true,
					message: '正在取消',
				});
				setTimeout(()=>{
							Toast.success("取消成功");
				},1000);
			})
			.catch(() => {
				// on cancel
			});
			localStorage.removeItem('loglevel:webpack-dev-server');
			for (let i = 0; i < localStorage.length; i++) {
				var key = localStorage.key(i); //获取本地存储的Key
				var user_info = JSON.parse(localStorage.getItem(key));
				var order_list = user_info.order;
				for (let j = 0; j < order_list.length; j++) {
					if(order_list[j].orderId==id){
						order_list[j].orderState = '待接单';
						// console.log(order_list[j].orderState);
					}
				}
				user_info.order = order_list;
				localStorage.setItem(user_info.username, JSON.stringify(user_info));
			}
			for (var i = 0; i < this.returnUser.order.length; i++) {
				if(this.returnUser.order[i].orderId==id){
					this.returnUser.order[i].orderState = '待接单';
				}
			}
			this.onLoad();
			
		},
		onLoad() {
		      // 异步更新数据
		      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
		      setTimeout(() => {
		        this.list = this.returnUser.order;
		
		        // 加载状态结束
		        this.loading = false;
		
		        // 数据全部加载完成
		        if (this.list.length > 0) {
		          this.text = '已经到底啦'
		        }
						this.finished = true;
		      }, 500);
		},
		
		returnFloat(value) {
			value = Number(value);
			value = value.toString();
			var num = value.split(".").length;
			if (num == 1) {
				value = value.toString() + ".00";
				return value;
			} else if (num == 2) {
				if (value.split(".")[1].length == 1) value = value.toString() + "0";
				else value = value.split(".")[0] + "." + value.split(".")[1].substring(0, 2);
				return value;
			}
		},
	},
	computed: {
		returnUser(){
			this.$store.commit('userInit');
			return this.$store.state.user;
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#empty{
	position: absolute; 
	z-index: 1; 
	text-align: center; 
	left: 0; 
	right: 0; 
	top: 280px;
	/* display: none; */
}

.order{
	position: absolute;
	height: 100%;
	width: 100%;
	top:0;
	left: 0;
	overflow-y: auto;
	background-color: #F4F4F4;
}

.address{
	height: 35px;
	margin: 0px 0 8px 0;
}

.address-title{
	font-size: 10px; 
	line-height: 35px; 
	background-color: #0088FF; 
	width: 35px; 
	height: 35px; 
	text-align: center; 
	color: white; 
	border-radius: 10px; 
	margin: 0 0;
	float: left;
}

.address-info{
	color: black;
	/* float: left; */
	margin: 0 40px 0;
	
	/* line-height: 35px; */
	/* margin: 0 10px; */
}

.order-tool{
	margin-top: 130px;
	/* height: 40px; */
}

.begin-but{
	background-color: #1989fa;
	border-radius: 5px;
	height: 40px;
	/* font-size: 10px; */
	color: #FFFFFF;
	/* width: 80px; */
	float: right;
	margin-left: 10px;
}


</style>
