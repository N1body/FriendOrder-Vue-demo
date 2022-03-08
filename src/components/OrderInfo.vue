<template>
  <div class="OrderInfo">
		<div id="header" style="height: 46px;">
			<van-nav-bar 
				left-arrow
				fixed
				@click-left="onClickLeft"
				title="订单详情"/>
		</div>
		<div id="state">
			<van-icon name="wait" />
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
  name: 'OrderInfo',
	data() {
	  return {
			
	  };
	},
	methods: {
		onClickLeft(){
			this.$router.go(-1);
		},
		
	},
	computed: {
		returnUser(){return this.$store.state.user},
	},
	created: function () {
	  // console.log(this.$route.params.order);
	}
}
</script>


<style scoped>
.OrderInfo{
	position: absolute;
	height: 100%;
	width: 100%;
	top:0;
	left: 0;
	overflow-y: auto;
	background-color: #F4F4F4;
}

#state{
	width: 95%;
	margin:2.5% 2.5%;
	border-radius: 8px;
	height: 200px;
	background-color: #FFFFFF;
}
</style>
