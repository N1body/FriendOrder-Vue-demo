<template>
  <div class="Me">
		<div id="header">
			<van-nav-bar 
				left-arrow
				fixed
				@click-left="onClickLeft"
				title="提现"/>
		</div>
		<div id="content">
			<div id="money">
				<p id="money_title">
					钱包余额(元)
				</p>
				<p id="money_num">{{returnFloat(returnUser.wallet)}}</p>
			</div>
			
			<div style="width: 95%; margin-left: 2.5%;">
				<van-radio-group v-model="radio">
				  <van-cell-group style="background-color: rgb(246,246,246);">
				    <van-cell clickable @click="radio = '1'" style="height: 60px; margin-bottom: 10px; border-radius: 10px;">
							<template #icon>
								<img src="../assets/img/wechatPay.png" >
							</template>
				      <template #right-icon>
				        <van-radio name="1" />
				      </template>
							<template #title>
								<p style="font-size: 18px; height: 18px; line-height: 5px; float: left; margin-left: 10px;">提现到微信</p>
							</template>
				    </van-cell>
				    <van-cell clickable @click="radio = '2'"  style="height: 60px; margin-bottom: 10px; border-radius: 10px;">
							<template #icon>
								<img src="../assets/img/alipay.png" >
							</template>
				      <template #right-icon>
				        <van-radio name="2" />
				      </template>
							<template #title>
								<p style="font-size: 18px; height: 18px; line-height: 5px; float: left; margin-left: 10px;">提现到支付宝</p>
							</template>
				    </van-cell>
						<van-cell clickable @click="radio = '3'" style="height: 60px; margin-bottom: 10px; border-radius: 10px;">
							<template #icon>
								<img src="../assets/img/card.png" >
							</template>
						  <template #right-icon>
						    <van-radio name="3" />
						  </template>
							<template #title>
								<p style="font-size: 18px; height: 18px; line-height: 5px; float: left; margin-left: 10px;">提现到银行卡</p>
							</template>
						</van-cell>
				  </van-cell-group>
				</van-radio-group>
				
			</div>
			
			<!-- 允许输入数字，调起带符号的纯数字键盘 -->
			<div id="num-input" style="width: 95%; margin-left: 2.5%;">
				<van-field v-model="number" type="number" label="输入提现金额" placeholder="输入需要提现的金额" input-align="right" size="large" :maxlength="6" style="border-radius: 5px;"/>
			</div>
			<p @click="drawAll" style="float: right; margin-right: 5%; margin-top: 2%; color: #0088FF;">全部提现</p>
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
			radio: '1',
	  };
	},
	methods: {
		drawAll(){
			this.number = this.returnUser.wallet;
		},
		submit(){
			if(this.number){
				if(this.number==0){
					Toast('抱歉，您无余额可以体现');
				}
				else{
					Toast.loading({
						duration: 1000, // 持续展示 toast
						forbidClick: true,
						message: '正在提现',
					});
					setTimeout(()=>{
						var user = JSON.parse(JSON.stringify(this.returnUser));
						user.wallet -= Number(this.number);
						this.returnUser.wallet = user.wallet; 
						localStorage.setItem(user.username, JSON.stringify(user));
						Toast.success("提现成功");
					},1200);
					
				}
			}
			else{
				Toast("请输入金额");
			}
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
