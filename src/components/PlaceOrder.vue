<template>
  <div class="Me">
		<div id="header">
			<van-nav-bar 
				left-arrow
				fixed
				@click-left="onClickLeft"
				title="下单"/>
		</div>
		<div id="content">
			<div id="location" style="width: 95%; margin: 2.5%;">
				<van-cell-group style="border-radius: 8px;">
					<van-cell is-link style="height: 90px; border-radius: 8px;" v-show="orderTitle!='帮借书'" @click="()=>{editAddress=true;this.juge=true;}">
						<template #title>
							<p class="address-title">取</p>
							<div class="address-content">
								<p v-show="!showPick" style="margin: 0; height: 70px; line-height: 70px; font-size: 25px;">在哪里取货？</p>
								<p v-show="showPick" style="margin: 0; height: 35px; line-height: 45px; font-size: 18px;">{{pickAddress}}</p>
								<p v-show="showPick" style="margin: 0; height: 35px; line-height: 25px;">{{pickInfo}}</p>
							</div>
						</template>
						<template #right-icon>
							<div style="line-height: 78px;"><van-icon name="arrow" /></div>
						</template>
					</van-cell>
					<van-cell is-link style="height: 90px; border-radius: 8px;" v-show="orderTitle!='帮还书'" @click="()=>{editAddress=true;this.juge=false;}">
						<template #title>
							<p class="address-title" style="background-color: #F5361C;">收</p>
							<div class="address-content">
								<p v-show="!showReceive"  style="margin: 0; height: 70px; line-height: 70px; font-size: 25px;">要送到哪里？</p>
								<p v-show="showReceive" style="margin: 0; height: 35px; line-height: 45px; font-size: 18px;">{{receiveAddress}}</p>
								<p v-show="showReceive" style="margin: 0; height: 35px; line-height: 25px;">{{receiveInfo}}</p>
							</div>
						</template>
						<template #right-icon>
							<div style="line-height: 78px;"><van-icon name="arrow" /></div>
						</template>
					</van-cell>
				</van-cell-group>
								
				<van-cell-group style="border-radius: 8px; margin-top: 5%;">
					<van-cell icon="title" title="订单标题" :value="title" is-link @click="showTitle=true" style="border-radius: 8px;" :title-style="{'margin-left':'3%'}"/>
					<van-cell icon="type" title="订单类型" :value="orderTitle" is-link @click="showType=true" style="border-radius: 8px;" :title-style="{'margin-left':'3%'}"/>
					<van-cell icon="time" title="收货时间" :value="timeValue" is-link @click="showPicker = true" style="border-radius: 8px;" :title-style="{'margin-left':'3%'}"/>
					<van-cell v-show="orderTitle=='帮借书'" :value="date" icon="calendar" title="借书时间段" is-link @click="showDate=true" style="border-radius: 8px;" :title-style="{'margin-left':'3%'}"/>
					<van-cell icon="coupon" title="优惠卷" :value="'-￥'+returnFloat(couponNum)" is-link @click="showList = true" style="border-radius: 8px;" :title-style="{'margin-left':'3%'}" />
					<van-cell icon="money" title="赏金" :value="'￥'+ returnFloat(numValue)" is-link @click="showNum=true" style="border-radius: 8px; border-radius: 8px;" :title-style="{'margin-left':'3%'}"/>
				</van-cell-group>
				
				<van-cell-group style="border-radius: 8px; margin-top: 5%;">
					<van-cell icon="remark" title="备注" :value="remark" is-link @click="showRemark=true" style="border-radius: 8px; border-radius: 8px;" :title-style="{'margin-left':'3%'}"/>
				</van-cell-group>
			</div>
		</div>
		
		<!-- 优惠券列表 -->
		<van-popup
		  v-model="showList"
		  round
		  position="bottom"
		  style="height: 50%; padding-top: 4px;"
		>
		  <van-coupon-list
		    :coupons="coupons"
		    :chosen-coupon="chosenCoupon"
		    :disabled-coupons="disabledCoupons"
		    @change="onChange"
		    @exchange="onExchange"
				:show-exchange-bar="false"
		  />
		</van-popup>
		<!-- 时间选择 -->
		<van-popup v-model="showPicker" position="bottom">
		  <van-datetime-picker
		    type="time"
		    @confirm="onConfirm"
		    @cancel="showPicker = false"
		  />
		</van-popup>
		<!-- 赏金数字键盘 -->
		<van-number-keyboard
			v-model="numValue"
		  :show="showNum"
		  theme="custom"
		  extra-key="."
		  close-button-text="完成"
		  @blur="showNum = false"
			z-index="20"
			maxlength="6"
		/>
		<!-- 选择订单类型 -->
		<van-popup v-model="showType" position="bottom">
		  <van-picker
		    show-toolbar
		    :columns="columns"
		    @confirm="onConfirmType"
		    @cancel="showType = false"
			/>
		</van-popup>
		<!-- 选择日期取件 -->
		<van-calendar v-model="showDate" type="range" @confirm="onConfirmDate" />
		<!-- 填写标题 -->
		<van-popup v-model="showTitle" position="bottom" :style="{ height: '30%' }" >
			<div>
				<p class="pop-title">标题信息</p>
				<van-field
				style="width: 95%; margin: 2.5% 2.5%; border: 1px #DADADA solid;"
					v-model="titleInfo"
					rows="2"
					autosize
					type="textarea"
					maxlength="50"
					placeholder="请输入标题"
					show-word-limit
				/>
				<div style="width: 95%; margin:5% 2.5%;">
					<van-button type="primary" block color="#0088FF" @click="onConfirmTitle()">确定</van-button>
				</div>
			</div>
		</van-popup>
		<!-- 填写备注 -->
		<van-popup v-model="showRemark" position="bottom" :style="{ height: '50%'}" >
			<div>
				<p class="pop-title">备注信息</p>
				<van-field
				style="width: 95%; margin: 2.5% 2.5%; border: 1px #DADADA solid;"
					v-model="remarkInfo"
					rows="2"
					autosize
					type="textarea"
					maxlength="50"
					placeholder="请输入备注信息"
					show-word-limit
				/>
				<div style="width: 95%; margin:5% 2.5%;">
					<van-button type="primary" block color="#0088FF" @click="onConfirmRemark()">确定</van-button>
				</div>
			</div>
		</van-popup>
		
		<!-- 填写取货地址 -->
		<van-popup v-model="editAddress" position="bottom" :style="{ height: '50%', background: 'rgb(246,246,246)'}" >
			<div class="address-logo" style="position: absolute; left: 0; right: 0; text-align: center; top: 30%;" v-show="isAddressShow">
				<img src="../assets/img/address.png" style="width: 100px;">
				<p style="text-align: center; margin: 0; color: #bfbfbf;">暂无收货地址</p>
			</div>
			<p class="pop-title" style="background-color: white;">
				<span style="float: left; margin-left: 5%; color: #969799;" @click="editCancel">取消</span>
				填写地址
				<span style="float: right; margin-right: 5%; color: #576b95;" @click="editConfirm">确定</span>
			</p>
			<van-address-list
			  v-model="chosenAddressId"
			  :list="list"
			  :disabled-list="disabledList"
			  default-tag-text="默认"
			  @add="onAdd"
			  @edit="onEdit"
			/>
		</van-popup>
		
		<div>
			<van-submit-bar @submit="onSubmit" :price="returnPrice" button-text="提交订单" text-align="left" button-color="#0088FF" style="z-index: 1;"/>
		</div>
  </div>
</template>

<script>
import Vue from 'vue';
import VueRouter from 'vue-router'
import user from '../user.js'
import { Toast } from 'vant';

Vue.use(VueRouter).use(Toast);
const coupon = {
  available: 1,
  condition: '无使用门槛',
  reason: '',
  value: 100,
  name: '友单新用户优惠卷',
  startAt: 1625155200,
  endAt: 1625414400,
  valueDesc: '1.0',
  unitDesc: '元',
};

var order = {
	orderId: '',
	placeUser: '',
	receiveUser: '',
	orderState: '待接单',
	pickAddress: '',
	pickInfo: '',
	receiveAddress: '',
	receiveInfo: '',
	titleInfo: '',
	orderTitle: '',
	timeValue: '',
	date: '',
	chosenCoupon: -1,
	couponNum: 0,
	numValue: '',
	remarkInfo: '',
}

export default {
  name: 'PlaceOrder',
	data() {
	  return {
			showPick:false,
			showReceive:false,
			pickAddress: '',
			pickInfo: '',
			receiveAddress: '',
			receiveInfo: '',
			titleInfo: '',
			orderTitle: this.$route.params.type,
			timeValue: '请选择时间',
			date: '选择借书时间段',
			chosenCoupon: -1,
			couponNum: 0,
			numValue: '',
			remarkInfo: '',
			showList: false,
			coupons: [coupon],
			disabledCoupons: [],
			juge: true,
			showTitle: false,
			showRemark: false,
			showDate: false,
			showPicker: false,
			showNum: false,
			editAddress: false,
			title: '请填写标题',
			remark: '请填写备注',
			columns: ['帮取送', '帮买物', '帮借书', '帮还书'],
			showType: false,
			chosenAddressId: -1,
			list: [],
			disabledList: [],
			
	  };
	},
	methods: {
		setOrderId(){
			var id="";  //订单号
			for(var i=0;i<3;i++) //3位随机数，用以加在时间戳后面。
			{
			    id += Math.floor(Math.random()*10);
			}
			id = new Date().getTime() + id;  //时间戳，用来生成订单号。
			return id;
		},
		onSubmit(){
			order.placeUser = this.returnUser.username;
			order.pickAddress = this.pickAddress;
			order.pickInfo = this.pickInfo ;
			order.receiveAddress = this.receiveAddress ;
			order.receiveInfo = this.receiveInfo ;
			order.titleInfo = this.titleInfo ;
			order.orderTitle = this.orderTitle ;
			order.timeValue = this.timeValue ;
			order.date = this.date ;
			order.chosenCoupon = this.chosenCoupon ;
			order.couponNum = this.couponNum ;
			order.numValue = this.numValue ;
			order.remarkInfo = this.remarkInfo ;
			order.orderId = this.setOrderId();
			Toast.loading({
				duration: 1000, // 持续展示 toast
				forbidClick: true,
				message: '正在提交',
			});
			setTimeout(()=>{
				var user = JSON.parse(JSON.stringify(this.returnUser));
				user.order.push(order);
				if(user.wallet>=this.returnPrice/100 && user.wallet!=0){
					user.wallet -= this.returnPrice/100
					localStorage.setItem(user.username, JSON.stringify(user));
					Toast.success("提交成功");
					this.$store.commit('clearPlace');
					this.$router.push('home');
				}
				else{
					Toast.fail("余额不足，请充值后下单");
				}
			},1200);
		},
		editCancel(){
			this.editAddress = false;
		},
		editConfirm(){
			if(this.returnId==-1){
				Toast('请先添加地址');
			}
			else{
				if(this.juge){
					this.showPick = true;
					this.pickAddress = this.list[this.chosenAddressId].addressDetail;
					this.pickInfo = this.list[this.chosenAddressId].name + ' ' + this.list[this.chosenAddressId].tel;
					var receive = {
						showPick:this.showPick,
						pickAddress:this.pickAddress,
						pickInfo:this.pickInfo
					}
					this.$store.commit('placeOrderPick',receive);
				}
				else{
					// Toast("下面");
					this.showReceive = true;
					this.receiveAddress = this.list[this.chosenAddressId].addressDetail;
					this.receiveInfo = this.list[this.chosenAddressId].name + ' ' + this.list[this.chosenAddressId].tel;
					var pick = {
						showReceive:this.showReceive,
						receiveAddress:this.receiveAddress,
						receiveInfo: this.receiveInfo
					}
					this.$store.commit('placeOrderReceive',pick);
				}
				this.editAddress = false;
			}
			
		},
		onAdd() {
			this.$router.push({name:'addaddress', params: {
					id: -1,
					name: '',
					tel: '',
					address: '',
					isDefault: false,
					addressDetail: '',
			}});
		},
		onEdit(item, index) {
			this.$router.push({name:'addaddress', params: this.returnUser.address[item.id]});
		},
		formatDate(date) {
			return `${date.getMonth() + 1}/${date.getDate()}`;
		},
		onConfirmRemark(){
			var str = this.remarkInfo=='' ? '请填写备注':this.remarkInfo;
			this.remark = str;
			this.showRemark = false;
		},
		onConfirmTitle(){
			var str = this.titleInfo=='' ? '请填写备注':this.titleInfo;
			this.title = str;
			this.showTitle = false;
		},
		onConfirmDate(date) {
			const [start, end] = date;
			this.showDate = false;
			this.date = `${this.formatDate(start)} - ${this.formatDate(end)}`;
		},
		onConfirmType(value) {
			this.orderTitle = value;
			this.showType = false;
		},
		onConfirm(time) {
			this.timeValue = time;
			this.showPicker = false;
		},
		onChange(index) {
			this.showList = false;
			this.chosenCoupon = index;
			if(index == -1){
				this.couponNum = 0;
			}
			else{
				this.couponNum = this.coupons[this.chosenCoupon].valueDesc;
			}
		},
		onExchange(code) {
			this.coupons.push(coupon);
		},
		onClickLeft(){
			this.$store.commit('clearPlace');
			this.$router.go(-1);
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
		returnUser(){return this.$store.state.user},
		returnStatement(){return this.$store.state.statement},
		returnId(){return this.chosenAddressId},
		returnPlaceOrderState(){return this.$store.state.placeOrderState},
		isAddressShow(){
			if(this.list.length > 0){
				return false;
			}
			else{
				return true;
			}
		},
		returnPrice(){
			var priceNum = Number(this.numValue) - Number(this.couponNum);
			priceNum = priceNum > 0 ? priceNum : 0;
			return priceNum*100;
		}
	},
	created: function () {
	  this.list = this.returnUser.address;
		for (var i = 0; i < this.list.length; i++) {
			if(this.list[i].isDefault){
				this.chosenAddressId = this.list[i].id;
			}
		}
		this.showPick = this.returnPlaceOrderState.showPick;
		this.pickAddress = this.returnPlaceOrderState.pickAddress ;
		this.pickInfo = this.returnPlaceOrderState.pickInfo;
		this.showReceive = this.returnPlaceOrderState.showReceive;
		this.receiveAddress = this.returnPlaceOrderState.receiveAddress;
		this.receiveInfo = this.returnPlaceOrderState.receiveInfo;
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
.address-title{
	font-size: 20px; 
	line-height: 45px; 
	background-color: #0088FF; 
	width: 45px; 
	height: 45px; 
	text-align: center; 
	color: white; 
	border-radius: 10px; 
	margin: 12.5px 0;
	float: left;
}

.address-content{
	height: 70px;
	line-height: 70px;
	/* width: 100px; */
	/* background-color: #0074D9; */
	margin: 0 4%;
	float: left;
}
.pop-title{
	width: 100%;
	text-align: center; 
	background-color: #DADADA; 
	margin: 0; 
	height: 50px; 
	line-height: 50px;
}
</style>
