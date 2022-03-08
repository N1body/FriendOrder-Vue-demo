<template>
  <div class="Me">
		<div id="header">
			<van-nav-bar 
				left-arrow
				fixed
				@click-left="onClickLeft"
				title="充值"/>
		</div>
		<div id="content">
			<div id="money">
				<p id="money_title">
					钱包余额(元)
				</p>
				<p id="money_num">{{returnFloat(returnUser.wallet)}}</p>
			</div>
			
			<van-grid :column-num="3" clickable :gutter="10" style="height: 150px; margin-bottom: 5%;">
			  <van-grid-item text="10元" @click="test(10)"/>
			  <van-grid-item text="20元" @click="test(20)"/>
			  <van-grid-item text="50元" @click="test(50)"/>
			  <van-grid-item text="100元" @click="test(100)"/>
				<van-grid-item text="200元" @click="test(200)"/>
				<van-grid-item text="500元" @click="test(500)"/>
			</van-grid>
			<!-- 允许输入数字，调起带符号的纯数字键盘 -->
			<div id="num-input" style="position: absolute; left: 2.5%; right: 2.5%;">
				<van-field left-icon="money" v-model="number" type="number" label="输入充值金额" placeholder="输入需要充值的金额" input-align="right" size="large" :maxlength="6" style="border-radius: 5px;"/>
			</div>
		</div>
		<div id="footer" style="position: fixed; left: 2.5%; right: 2.5%; bottom: 1%;">
			<van-button type="primary" block color="#0088FF" size="large" @click="submit" style="border-radius: 5px;">立即充值</van-button>
		</div>
  </div>
</template>

<script>
import Vue from 'vue';
import VueRouter from 'vue-router'
import user from '../user.js'
import { Toast } from 'vant';

Vue.use(VueRouter).use(Toast);

export default {
  name: 'Login',
	data() {
	  return {
			number: '',
	  };
	},
	methods: {
		submit(){
			if(this.number && this.number!=0){
				if(this.returnStatement=="login"){
					Toast('请先登录再充值');
				}
				else{
					Toast.loading({
						duration: 1000, // 持续展示 toast
						forbidClick: true,
						message: '正在充值',
					});
					setTimeout(()=>{
						var user = JSON.parse(JSON.stringify(this.returnUser));
						user.wallet += Number(this.number);
						this.returnUser.wallet = user.wallet; 
						localStorage.setItem(user.username, JSON.stringify(user));
						Toast.success("充值成功");
					},1200);
					
				}
			}
			else{
				Toast("请输入金额");
			}
		},
		test(num){
			this.number = num;
		},
		onClickLeft(){
			this.$router.go(-1);
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
		returnUser(){return this.$store.state.user},
		returnStatement(){return this.$store.state.statement},
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#content{
	background-color: #F7F8FA;
	position: absolute;
	top: 46px;
	left: 0;
	right: 0;
	bottom: 0;
}
#money {
	position: relative;
	width: 95%;
	height: 140px;
	margin: 4% 2.5%;
	background: linear-gradient(to right, rgb(47, 128, 237), rgb(86, 204, 242));
	margin-bottom: 15px;
	border-radius: 10px;
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
	margin-top: 65px;
	margin-left: 15px;
}
</style>
