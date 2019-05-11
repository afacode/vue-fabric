<template>
	<div style="display: flex;justify-content: center;align-items: center;">
		<div >
			<p>注册</p>
			<!--<p style="color: red;">{{tip}}</p>-->
			<label>
				昵&nbsp;&nbsp;&nbsp;称:				
				<div style="display: inline-block;">
					<el-input v-model="nickName" placeholder="请输入昵称"></el-input>
				</div>
			</label>
			<br />
			<br />
			<label>
				手机号:				
				<div style="display: inline-block;">
					<el-input v-model="phoneNum" placeholder="请输入手机号"></el-input>
				</div>
			</label>
			<br />
			<br />
			<label>
				验证码:				
				<div style="display: inline-block;">
					<el-input v-model="code" placeholder="请输入验证码"></el-input>
					
				</div>
				<el-button  @click="getSmscode" type="primary">获取验证码</el-button>
				<label>{{getcodeSucc}}</label>
			</label>
			<br />
			<br />
			<label>
				密&nbsp;&nbsp;&nbsp;码:				
				<div style="display: inline-block;">
					<el-input v-model="password" type="password" placeholder="请输入密码"></el-input>
				</div>
			</label>
			<br />
			
			<br />
			<el-button type="primary" @click="regist" style="width:70%"  >马上注册</el-button>
		</div>
		
	</div>
</template>

<script>
	import {regist} from "@/api/user"
	import {getSmsCode} from "@/api/user"
	export default{
		data(){
			return {
				phoneNum:null,
				nickName:null,
				code:null,
				password:null,
				tip:null,
				getcodeSucc:null
			}
		},
		mounted(){
			
		},
		methods:{
			getSmscode:function(){
				getSmsCode({phone:this.phoneNum})
				.then((res)=>{
					if(res.status == "200"){
						this.getcodeSucc = "获取成功";
					}
//					console.log(res)
				},(err)=>{
					
				})
			},
			regist:function(){
				let _this = this;
				regist({phone:this.phoneNum,nickname:this.nickName,password:this.password,code:this.code})
				.then((res)=>{
					if(res && res.data){
						if(res.data.code == "10000"){
							 this.$message('注册成功');
							setTimeout(function(){
								_this.$router.push({path:'/login'});
							},2000)
						}else if(res.data.code == "12004"){
							this.tip = "用户已经存在";
						}
					}
				},(err)=>{
				})
			}
		}
	}
</script>

<style>
</style>