<template>
  <div class="login">
		<div id="header"><van-nav-bar title="登录" /></div>
		<div id="content"><van-form @submit="onSubmit">
		  
		  <div style="margin: 16px;"><van-field
				label-width = "4em"
		    v-model="username"
		    name="username"
		    label="用户名"
				left-icon="tubiao211"
		    placeholder="用户名"
		    :rules="[{ required: true, message: '请填写用户名' }]"
		  /></div>
			<div style="margin: 16px"><van-field
				label-width = "4em"
		    v-model="password"
		    type="password"
		    name="password"
		    label="密码"
				left-icon="mima"
		    placeholder="密码"
		    :rules="[{ required: true, message: '请填写密码' }]"
		  /></div>
		  <div style="margin: 16px;">
		    <van-button round block type="info" native-type="submit">登录</van-button>
		  </div>
		</van-form></div>
		<div id="footer">
			<p>没有账号?
			<router-link to="register" style="color: #1989FA;">立即注册</router-link>
			</p>
			
		</div>
  </div>
</template>

<script>
import Vue from 'vue';
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
	  };
	},
	methods: {
	  onSubmit(values) {
			Toast.loading({
				duration: 1000, // 持续展示 toast
				forbidClick: true,
				message: '正在登录',
			});
			setTimeout(()=>{
				if(localStorage.getItem(values.username)){
					var login_user = JSON.parse(localStorage.getItem(values.username));
					if(values.password==login_user.password){
						this.$store.commit('login',login_user.username);
						// this.$router.push({name:'me',params:{username:login_user.username,statement:'已登录'}});
						this.$router.push('me');
						Toast.success("登录成功");
					}
					else{
						Toast("密码错误，请重新输入");
						this.password = null;
					}
				}
				else{
					Toast("该用户不存在，请注册后登录");
					this.username = this.password = null;
				}
			},1200);
	    
	  },
	},
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
