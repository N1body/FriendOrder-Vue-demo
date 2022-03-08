<template>
  <div class="Me">
		<div id="header" style="height: 46px;">
			<van-nav-bar 
				fixed
				title="个人中心"/>
		</div>
		<div id="content">
			<div id="user_content" style="background-color: white;">
				<van-cell is-link style="height: 80px;" :to="returnStatement">
				  <template #right-icon>
				    <span style="line-height: 65px;"><van-icon name="arrow" class="arrow-right" /></span>
				  </template>
					<template #title>
						<span class="user">
							<van-image
							  round
								fit="contain"
								width="60px"
								height="60px"
							  :src="returnUser.user_logo"
							/>
						</span>
						<span class="user-name">{{returnUser.username}}</span>
					</template>
				</van-cell>
				<div id="money">
					<p id="money_title">
						钱包余额(元)
					</p>
					<p id="money_num">{{returnFloat(returnUser.wallet)}}</p>
					<p id="money_buy" @click="topUp()">充值</p>
					<p id="money_cash" @click="drawCash()">提现</p>
				</div>
				
				<div id="order" style="width: 100%;">
					<p id="order-title">
						我的订单
						<router-link to="order" style="font-size: 15px; color: black; float: right; margin-right: 2.5%;">查看全部></router-link>
					</p>
					<van-grid :column-num="4" :border="false">
					  <van-grid-item>
							<van-icon name="wait" color="#1989fa" />
							<p style="margin: 4px 0;">待接单</p>
					  </van-grid-item>
					  <van-grid-item>
					    <van-icon name="send" color="#1989fa" />
							<p style="margin: 4px 0;">代送单</p>
					  </van-grid-item>
						<van-grid-item>
						  <van-icon name="receive" color="#1989fa" />
							<p style="margin: 4px 0;">待收单</p>
						</van-grid-item>
						<van-grid-item>
						  <van-icon name="finish" color="#1989fa" />
							<p style="margin: 4px 0;">已完成</p>
						</van-grid-item>
					</van-grid>
				</div>
			</div>
			<div id="user_tool" style="margin-top: 10px; margin-bottom: 30px;">
				<van-cell icon="location" is-link @click="Address">
					<template #title>
						<span style="margin-left: 5px;">常用地址</span>
					</template>
				</van-cell>
				<van-cell icon="coupon" is-link >
					<template #title>
						<span style="margin-left: 5px;">优惠卷</span>
					</template>
				</van-cell>
				<van-cell icon="serve" is-link >
					<template #title>
						<span style="margin-left: 5px;">客服</span>
					</template>
				</van-cell>
				<van-cell icon="help" is-link >
					<template #title>
						<span style="margin-left: 5px;">帮助</span>
					</template>
				</van-cell>
				<van-cell icon="set" is-link >
					<template #title>
						<span style="margin-left: 5px;">设置</span>
					</template>
				</van-cell>
				
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
			wallet: '0.00',
	  };
	},
	methods: {
		Address(){
			if(this.returnStatement=='userinfo'){
				this.$router.push('address');
			}
			else{
				Toast("请先登录后再设置地址！");
			}
		},
		topUp(){
			if(this.returnStatement=='userinfo'){
				this.$router.push('topup');
			}
			else{
				Toast("请先登录后再充值！");
			}
		},
		drawCash(){
			if(this.returnStatement=='userinfo'){
				this.$router.push('drawcash');
			}
			else{
				Toast("请先登录后再充值！");
			}
		},
		returnFloat(value) {
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
		// returnUsername(){return this.$store.state.username},
		returnStatement(){return this.$store.state.statement},
		// returnUserlogo(){return this.$store.state.userlogo},
		returnUser(){
			this.$store.commit('userInit');
			return this.$store.state.user;
		},
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.Me{
	position: absolute;
	/* height: 100%; */
	width: 100%;
	top: 0;
	left: 0;
	bottom: 50px;
	overflow-y: auto;
	background-color: #F4F4F4;
}
.user{
	float: left; 
	line-height: 60px; 
	display: block; 
	height: 60px; 
	border-radius: 50px;
}

#money {
	position: relative;
	width: 95%;
	height: 120px;
	margin-left: 2.5%;
	background: linear-gradient(to right, rgb(47, 128, 237), rgb(86, 204, 242));
	border-radius: 10px;
	margin-bottom: 4%;
}

#money_title {
	position: absolute;
	font-size: 15px;
	margin-left: 15px;
	margin-top: 15px;
	color: #A1EBFF;
	text-shadow: 0px 1px 1px rgb(35, 170, 250);
}

#money_num {
	position: absolute;
	color: white;
	text-shadow: 0px 1px 1px rgb(35, 170, 250);
	font-size: 30px;
	margin-top: 55px;
	margin-left: 15px;
}

#money_buy,
#money_cash {
	position: absolute;
	background-color: white;
	color: rgb(35, 170, 250);
	text-shadow: 0px 1px 1px white;
	font-size: 16px;
	width: 60px;
	text-align: center;
	height: 35px;
	line-height: 35px;
	border-radius: 25px 0 0 25px;
	right: 1px;
}

#money_cash {
	top: 50px;
}

.user-name{
	line-height: 60px; 
	font-size: 18px; 
	float: left; 
	margin-left: 15px;
}
#order-title{
	font-size: 18px; 
	height: 10px; 
	text-align: left; 
	margin-left: 2.5%;
}
</style>
