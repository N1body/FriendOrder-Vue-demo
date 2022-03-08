<template>
  <div class="Me">
		<div id="header">
			<van-nav-bar 
				left-arrow
				fixed
				@click-left="onClickLeft"
				title="资料管理"/>
		</div>
		<div id="content">
			<van-cell-group>
				<van-cell is-link style="height: 60px;" title="头像" :title-style="{
					'line-height': '40px'
				}">
					<template #right-icon>
						<span style="line-height: 45px;"><van-icon name="arrow" class="arrow-right" /></span>
					</template>
					<template #extra>
						<div style="position: absolute; right: 12%;">
							<van-image
								radius="5px"
								fit="contain"
								width="40px"
								height="40px"
							  :src="returnUser.user_logo"
							/>
						</div>
					</template>
				</van-cell>
				<van-cell title="姓名" is-link value="" />
				<van-cell title="性别" is-link value="" />
				<van-cell title="描述" is-link value="" />
			</van-cell-group>
			<van-cell-group style="margin-top: 5%;">
				<van-cell title="手机号" is-link value="" />
			</van-cell-group>
			<van-cell-group style="margin-top: 5%;">
				<van-cell title="账号注销" is-link value="" />
			</van-cell-group>
		</div>
		
		<div  id="footer" style="position: absolute; left: 2.5%; right: 2.5%; bottom: 2%;">
			<van-button type="primary" block color="#FF3B2F" size="large" @click="exit" style="border-radius: 5px;">退出登录</van-button>
		</div>
  </div>
</template>

<script>
import Vue from 'vue';
import VueRouter from 'vue-router'
import allschool from '../AllSchool.js'
import { Toast } from 'vant';
import user from '../user.js'

Vue.use(VueRouter).use(Toast);
export default {
  name: 'Login',
	data() {
	  return {
	    active: 'home',
			school: "江西财经大学",
			username: this.$route.params.userId,
			user_logo: require('../assets/img/user.jpg'),
			wallet: '0.00',
	  };
	},
	methods: {
		exit(){
			this.$store.commit('exitLogin');
			this.$store.state.user = JSON.parse(JSON.stringify(user));
			this.$router.go(-1);
		},
		onClickLeft(){
			this.$router.go(-1);
		},
		afterRead(file) {
		      // 此时可以自行将文件上传至服务器
			console.log(file);
			console.log(URL.createObjectURL(file));
		},
	},
	computed: {
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
#content{
	background-color: #F7F8FA;
	position: absolute;
	top: 46px;
	left: 0;
	right: 0;
	bottom: 0;
}
</style>
