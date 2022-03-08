<template>
  <div class="Me">
		<div id="header">
			<van-nav-bar 
				left-arrow
				fixed
				@click-left="onClickLeft"
				title="地址管理"/>
		</div>
		<div id="content">
			<div class="address-logo" style="position: absolute; left: 0; right: 0; text-align: center; top: 30%;" v-show="isAddressShow">
				<img src="../assets/img/address.png" style="width: 100px;">
				<p style="text-align: center; margin: 0; color: #bfbfbf;">暂无收货地址</p>
			</div>
			<van-address-list
			  v-model="chosenAddressId"
			  :list="list"
			  :disabled-list="disabledList"
			  
			  default-tag-text="默认"
				
			  @add="onAdd"
			  @edit="onEdit"
			/>
		</div>
		<!-- disabled-text="以下地址超出配送范围" -->
		<!-- <div id="footer" style="position: absolute;left: 2.5%; right: 2.5%; bottom: 1%;">
			<van-button type="primary" block color="#0088FF" size="large" @click="submit" style="border-radius: 5px;">立即充值</van-button>
		</div> -->
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
			chosenAddressId: -1,
			list: [
				
			],
			disabledList: [
			],
	  };
	},
	methods: {
		onClickLeft(){
			this.$router.go(-1);
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
	},
	computed: {
		returnUser(){return this.$store.state.user},
		returnStatement(){return this.$store.state.statement},
		isAddressShow(){
			if(this.list.length > 0){
				return false;
			}
			else{
				return true;
			}
		}
	},
	created: function () {
	  this.list = this.returnUser.address;
		for (var i = 0; i < this.list.length; i++) {
			if(this.list[i].isDefault){
				this.chosenAddressId = this.list[i].id;
			}
		}
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

</style>
