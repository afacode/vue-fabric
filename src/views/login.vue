<template>
	<div style="display: flex;justify-content: center;align-items: center;">
		<div style="text-align: center;">
			<h2 style="color: #333;">登 录</h2>
			<!--<p style="color: red;">{{tip}}</p>-->
			<label>
				手机号:				
				<div style="display: inline-block;">
					<el-input v-model="phone" placeholder="请输入手机号"></el-input>
				</div>
			</label>
			<br />
			<br />
			<label>
				密   码：
				<div style="display: inline-block;">
					<el-input v-model="password" type="password" placeholder="请输入密码"></el-input>
				</div>
			</label>
			<br />
			<br />
			<el-button type="primary" @click="login" style="width:100%"  >登录</el-button>
			<br />
			<br />
			<router-link to="regist">
				<el-button type="success"  style="width:100%"  >注册</el-button>
			</router-link>
			<br />
			<br />
			<el-button type="success" @click="loginBywx" style="width:100%"  >微信登录</el-button>
		</div>
		
	</div>
</template>

<script>
	import {loginBywx,login} from "@/api/user";
	export default{
		data(){
			return {
				phone:null,
				password:null,
				tip:null
			}
		},
		mounted(){
			
		},
		methods:{
			login:function(){
				let _this = this;
				login({phone:this.phone,password:this.password})
				.then(function(res){
					if(res && res.data){
						if(res.data.code == "13001"){
							_this.tip = res.data.msg;
							 _this.$message(res.data.msg);
							setTimeout(function(){
								_this.$router.push({path:'/sing'});
							},2000)
						}else{
							_this.tip = res.data.msg;
						}
					}
				},function(err){
				})
			},
			loginBywx:function(){
				window.location.href = "http://mz.wesetup.cn/api/v1/user/wechat/login?redirectUrl=http://mz.wesetup.cn/personal";
			}
		}
	}
</script>

<style>
</style>