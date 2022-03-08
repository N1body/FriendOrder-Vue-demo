import Login from './components/Login.vue'
import App from './App.vue'
import Register from './components/Register.vue'
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

const routers = [
	{
		path: '/',
		component: Login,
	},
	{
		path: '/login',
		name: 'login',
		component: Login,
	},
	{
		path: '/register',
		name: 'register',
		component: Register,
	},
	{
		path: '/home',
		name: 'home',
		component: Home,
	},
	{
		path: '/type',
		name: 'type',
		component: Type,
	},
	{
		path: '/order',
		name: 'order',
		component: Order,
	},
	{
		path: '/me',
		name: 'me',
		component: Me,
	},
	{
		path: '/userinfo',
		name: 'userinfo',
		component: UserInfo
	},
	{
		path:'/topup',
		name: 'topup',
		component: TopUp
	},
	{
		path:'/drawcash',
		name: 'drawcash',
		component: DrawCash
	},
	{
		path: '/address',
		name: 'address',
		component: Address
	},
	{
		path: '/addaddress',
		name: 'addaddress',
		component: AddAddress
	},
	{
		path: '/placeorder',
		name: 'placeorder',
		component: PlaceOrder
	},
	{
		path: '/orderinfo',
		name: 'orderinfo',
		component: OrderInfo
	},
	
];

export default routers



