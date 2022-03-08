<template>
  <div id="app">
		<!-- <component v-bind:is="index"></component> -->
    <!-- <Login/> -->
		<!-- <transition name="component-fade" mode="out-in">
		</transition> -->
		<transition>
			<router-view class="view"></router-view>
		</transition>
  </div>
</template>

<script>
import Login from './components/Login.vue'
import Register from './components/Register.vue'
import './assets/iconfont/iconfont.css'
import Home from './components/Home.vue'
import Order from './components/Order.vue'
import Type from './components/Type.vue'
import Me from './components/Me.vue'
import UserInfo from './components/UserInfo.vue'
import TopUp from './components/TopUp.vue'
import DrawCash from './components/DrawCash.vue'
import Address from './components/Address.vue'
import AddAddress from './components/AddAddress.vue'
import PlaceOrder from './components/PlaceOrder.vue'
import OrderInfo from './components/OrderInfo.vue'
export default {
  name: 'app',
  components: {
		OrderInfo,
		PlaceOrder,
		AddAddress,
		Address,
		DrawCash,
		TopUp,
		UserInfo,
    Login,
		Register,
		Home,
		Order,
		Me,
		Type
  },
	data() {
		return {
			index: 'login',
		};
	}
	
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.slide-left-enter-active,
.slide-left-leave-active {
		will-change: transform;
		transition: all .3s;
		position: absolute;
		width:100%;
		left:0;
}
.slide-left-enter {
		transform: translateX(100%);
}
.slide-left-leave-active {
		transform: translateX(-100%);
}
</style>
