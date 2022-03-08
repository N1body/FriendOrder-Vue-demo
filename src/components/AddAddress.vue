<template>
  <div class="Me">
		<div id="header">
			<van-nav-bar 
				left-arrow
				fixed
				@click-left="onClickLeft"
				:title="addresstitle"/>
		</div>
		<div id="content">
			<van-address-edit
			  :area-list="areaList"
				:address-info="returnAddress"
			  :show-delete="returnAddress.id!='-1'"
				:show-area="false"
			  show-set-default
			  show-search-result
			  :search-result="searchResult"
				
			  :area-columns-placeholder="['请选择', '请选择', '请选择']"
			  @save="onSave"
			  @delete="onDelete"
			  @change-detail="onChangeDetail"
			></van-address-edit>
		</div>
		
  </div>
</template>

<script>
import Vue from 'vue';
import VueRouter from 'vue-router'
import user from '../user.js'
import { areaList } from '@vant/area-data';
import { Toast } from 'vant';

Vue.use(VueRouter).use(Toast);


export default {
  name: 'Login',
	data() {
	  return {
			areaList,
			searchResult: [],
			isshow: false,
			addresstitle: this.$route.params.id==-1 ? '新增地址':'修改地址',
	  };
	},
	methods: {
		onClickLeft(){
			this.$router.go(-1);
		},
		onSave(content) {
			if(this.returnAddress.id==-1){
				Toast.loading({
					duration: 1000, // 持续展示 toast
					forbidClick: true,
					message: '正在保存',
				});
				setTimeout(()=>{
					var user = JSON.parse(JSON.stringify(this.returnUser));
					if(content.isDefault){
						for (var i = 0; i < user.address.length; i++) {
							user.address[i].isDefault = false;
						}
					}
					user.address.push({
						id: user.address.length,
						name: content.name,
						tel: content.tel,
						address: content.addressDetail,
						isDefault: content.isDefault,
						addressDetail: content.addressDetail,
					});
					this.returnUser.address = user.address; 
					localStorage.setItem(user.username, JSON.stringify(user));
					Toast.success("保存成功");
					this.$router.go(-1);
				},1200);
			}
			else{
				Toast.loading({
					duration: 1000, // 持续展示 toast
					forbidClick: true,
					message: '正在保存',
				});
				setTimeout(()=>{
					var user = JSON.parse(JSON.stringify(this.returnUser));
					if(content.isDefault){
						for (var i = 0; i < user.address.length; i++) {
							user.address[i].isDefault = false;
						}
					}
					user.address[this.returnAddress.id] = {
						id: content.id,
						name: content.name,
						tel: content.tel,
						address: content.addressDetail,
						isDefault: content.isDefault,
						addressDetail: content.addressDetail,
					};
					
					this.returnUser.address = user.address; 
					localStorage.setItem(user.username, JSON.stringify(user));
					Toast.success("保存成功");
					this.$router.go(-1);
				},1200);
			}
		},
		onDelete() {
			Toast.loading({
				duration: 1000, // 持续展示 toast
				forbidClick: true,
				message: '正在删除',
			});
			setTimeout(()=>{
				var user = JSON.parse(JSON.stringify(this.returnUser));
				user.address.splice(this.returnAddress.id,1);
				for (var i = 0; i < user.address.length; i++) {
					user.address[i].id = i;
				}
				this.returnUser.address = user.address; 
				localStorage.setItem(user.username, JSON.stringify(user));
				Toast.success("删除成功");
				this.$router.go(-1);
			},1200);
		},
		onChangeDetail(val) {
			if (val) {
				this.searchResult = [
					
				];
			} else {
				this.searchResult = [];
			}
		},
	},
	computed: {
		returnUser(){return this.$store.state.user},
		returnStatement(){return this.$store.state.statement},
		returnAddress(){return this.$route.params}
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

.van-cell__title{
	text-align: left !important;
}

</style>
