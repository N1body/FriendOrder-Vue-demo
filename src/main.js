import Vue from 'vue'
import VueRouter from 'vue-router'
import routers from './routes.js'
import Vuex from 'vuex'
import App from './App.vue'
import './assets/iconfont/iconfont.css'
import user from './user.js'
import { SubmitBar,CouponCell,
				 CouponList,DatetimePicker,
				 NumberKeyboard,AddressList,
				 Form,Field,Button,Tabbar,Tabs,
				 TabbarItem,Cell,CellGroup,Tab,
				 NavBar,Icon,Toast,Empty,SidebarItem,
				 Area,Popup,Image as VanImage,
				 Grid,GridItem,RadioGroup,Sidebar,
				 Radio,AddressEdit,Swipe,SwipeItem,
				 Picker,Calendar,List
			  } from 'vant';

Vue.use(NumberKeyboard).use(TabbarItem).
		use(DatetimePicker).use(SidebarItem).
		use(CouponCell).use(CouponList).
		use(SubmitBar).use(Vuex).use(Sidebar).
		use(VueRouter).use(AddressList).
		use(Radio).use(RadioGroup).
		use(Grid).use(GridItem).use(VanImage).
		use(Popup).use(Toast).use(Icon).
		use(VueRouter).use(NavBar).use(Form).
		use(Field).use(Button).use(Area).
		use(AddressEdit).use(Empty).use(Swipe).
		use(SwipeItem).use(Tab).use(Tabs).
		use(Cell).use(CellGroup).use(Tabbar).
		use(Picker).use(Calendar).use(List);
		
Vue.config.productionTip = false


const router = new VueRouter({
	// mode: 'history',
	routes: routers,
});

const store = new Vuex.Store({
	state: {
	    user: JSON.parse(JSON.stringify(user)),
			statement: 'login',
			placeOrderState: {
				showPick: false,
				pickAddress: '',
				pickInfo: '',
				showReceive: false,
				receiveAddress: '',
				receiveInfo: '',
			},
			
	  },
	  mutations: {
	    login (state,payload) {
	      state.user = JSON.parse(localStorage.getItem(payload));
				state.statement = 'userinfo';
	    },
			userInit(state){
				if(state.statement=="login"){
					state.user.user_logo = require('./assets/img/user.jpg');
					state.user.username = '登录/注册'
				}
				else{
					state.user = JSON.parse(localStorage.getItem(state.user.username));
				}
			},
			placeOrderPick(state,payload){
				state.placeOrderState.showPick = payload.showPick;
				state.placeOrderState.pickAddress = payload.pickAddress ;
				state.placeOrderState.pickInfo = payload.pickInfo;
			},
			placeOrderReceive(state,payload){
				state.placeOrderState.showReceive = payload.showReceive;
				state.placeOrderState.receiveAddress = payload.receiveAddress;
				state.placeOrderState.receiveInfo = payload.receiveInfo;
			},
			clearPlace(state){
				state.placeOrderState.showPick = false;
				state.placeOrderState.pickAddress = '';
				state.placeOrderState.pickInfo = '';
				state.placeOrderState.showReceive = false;
				state.placeOrderState.receiveAddress = '';
				state.placeOrderState.receiveInfo = '';
			},
			exitLogin(state){
				state.statement = 'login';
			}
		},
		getters: {
		}
});

const app = new Vue({
	el: "#app",
	router,
	store,
	data: {
	  currentRoute: window.location.pathname
	},
	components:{
		App
	},
	watch: {
		// '$route':function(newVal,oldVal){
		// 	console.log(newVal.name,oldVal.name);
		// }
	},
	template: '<App/>'
});


