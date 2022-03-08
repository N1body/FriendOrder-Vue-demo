<template>
  <div class="login">
		<div id="header"><van-nav-bar title="注册"
		left-arrow @click-left="onClickLeft"/></div>
		<div id="content"><van-form @submit="onSubmit">
		  
		  <div style="margin: 16px;"><van-field
				label-width = "4em"
		    v-model="username"
		    name="username"
		    label="用户名"
		    placeholder="用户名"
				left-icon="tubiao211"
		    :rules="[{ validator, message: '5到16位（字母，数字，下划线，减号）' }]"
		  /></div>
			<div style="margin: 16px"><van-field
				label-width = "4em"
		    v-model="password"
		    type="password"
		    name="password"
		    label="密码"
		    placeholder="密码"
				left-icon="mima"
		    :rules="[{ validator, message: '8到16位（同时包含字母，数字）' }]"
		  /></div>
			<div style="margin: 16px"><van-field
				label-width = "4em"
			  v-model="repassword"
			  type="password"
			  name="repassword"
			  label="确认密码"
			  placeholder="确认密码"
				left-icon="mima"
			  :rules="[{ validator, message: '两次密码输入不符合' }]"
			/></div>
		  <div style="margin: 16px;">
		    <van-button round block type="info" native-type="submit">注册</van-button>
		  </div>
		</van-form></div>
		<div id="footer">
		</div>
  </div>
</template>

<script>
import Vue from 'vue';
import user from '../user.js'
import VueRouter from 'vue-router'
import { Toast } from 'vant';

Vue.use(VueRouter).use(Toast);

export default {
  name: 'Login',
  props: {
    msg: String
  },
	
	data() {
	  return {
	    username: '',
	    password: '',
			repassword: '',
			pattern: /^[a-zA-Z0-9_-]{5,16}$/,
	  };
	},
	methods: {
	  onSubmit(values) {
			var register_user = JSON.parse(JSON.stringify(user));
			if (!localStorage.getItem(values.username)){
				register_user.username = values.username;
				register_user.password= values.password;
				register_user.user_logo = require('../assets/img/tx.jpg');
				localStorage.setItem(values.username, JSON.stringify(register_user));
				// localStorage.removeItem("loglevel:webpack-dev-server");
				const tost1 = Toast.loading({
					duration: 1000, // 持续展示 toast
					forbidClick: true,
					message: '正在注册',
				});
				setTimeout(()=>{
					tost1.clear();
					this.$router.push('login');
					Toast.success("注册成功");
				},1200);
			}
			else{
				Toast("用户名已经存在，请重新输入");
				this.username = this.password = this.repassword = null;
			}
	  },
		onClickLeft() {
			this.$router.push('login');
		},
		validator(val,rule) {
			switch(rule.message){
				case '5到16位（字母，数字，下划线，减号）':
					return /^[a-zA-Z0-9_-]{5,16}$/.test(val);
				case '8到16位（同时包含字母，数字）':
					return /^.*(?=.{8,16})(?=.*\d)(?=.*[a-zA-Z]).*$/.test(val);
				case '两次密码输入不符合':
					return this.password == this.repassword;
				default:
					return false;
			}
		}
	},
	computed: {
		// get() {
		// 	return this.$store.state.user;
		// }
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login{
	background-color: #F7F8FA;
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
}

#footer{
	text-align: center;
}
</style>
