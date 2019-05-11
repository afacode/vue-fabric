<template>
	<div style="display: flex;justify-content: center;align-items: center;">
		<div>
			
			<router-link to="onself">
				<p>到个人画板</p>
			</router-link>
			 <p>
			 	绑定手机号码
			 </p>
			 <p style="color: red;">{{tip}}</p>
			 
			 
			 <el-form  label-width="80px">
			  <el-form-item label="手机号">
			    <el-input v-model="phone" placeholder="请输入手机号"></el-input>
			  </el-form-item>
			  <el-form-item label="验证码">
			    <el-input v-model="code" placeholder="请输入验证码"></el-input>
			    <el-button  @click="getSmsCode" type="primary">获取验证码</el-button>
			  </el-form-item>
			  <el-form-item label="密码">
			    <el-input v-model="password" placeholder="请输入密码" type="password"></el-input>
			  </el-form-item>
			  <el-form-item>
			    <el-button type="primary" @click="bindPhone">绑定</el-button>
			  </el-form-item>
			</el-form>
			 
			 
			 
<!--			 
			 手机号：<input v-model="phone" placeholder="请输入手机号" /><br />
			 验证码：<input v-model="code"  /><input type="button" @click="getSmsCode" value="获取验证码" /><label>{{getcodeSucc}}</label><br />
			 设置密码：<input v-model="password"  type="password" /><br />
			 <input value="绑定" type="button" @click="bindPhone" />-->
			 <div>
			 	<p>微信绑定</p>
			 	 <el-button type="primary" @click="bindwechat">微信绑定接口</el-button>
			 	<!--<input type="button"  value="微信绑定接口" />-->
			 	
			 </div>
			 <div>
			 	<p>更新密码</p>
			 	<p style="color: red;">{{tip}}</p>
			 	
			 	
			 	<el-form  label-width="90px">
				  <el-form-item label="旧密码">
				    <el-input v-model="pwd_old" placeholder="请输入旧密码"></el-input>
				  </el-form-item>
				  <el-form-item label="新密码">
				    <el-input v-model="newP" placeholder="请输入新密码"></el-input>
				  </el-form-item>
				  <el-form-item label="新密码确认">
				    <el-input v-model="cnewP" placeholder="请输入新密码" type="password"></el-input>
				  </el-form-item>
				    <el-form-item label="名称">
				    <el-input v-model="nickname" placeholder="请输入名称" type="text"></el-input>
				  </el-form-item>
				  <el-form-item>
				    <el-button type="primary" @click="changePwd">密码更新</el-button>
				    <el-button type="primary" @click="changeNickname">名称更新</el-button>
				  </el-form-item>
				</el-form>
			 	
			 	
			 	
			 	<!--旧密码：<input v-model="pwd_old" type="password" /><br />
			 	新密码：<input v-model="newP" type="password" /><br />
			 	新密码确认：<input v-model="cnewP" type="password" /><br />
			 	名称:<input type="tel" v-model="nickname" />
			 	 <input value="密码更新" type="button" @click="changePwd" />
			 	 <input value="名称更新" type="button" @click="changeNickname" />-->
			 </div>
			 	<div>
			 		<p>获取用户信息</p>
			 		<el-button type="primary" @click="getUserInfo">获取用户信息</el-button>
			 		<br />
			 		<!--<input type="button" value="获取用户信息" @click="getUserInfo" /><br />-->
			 		手机号：{{u_phone}}<br />
			 		用户名：{{u_name}}
			 	</div>
		</div>
	</div>
</template>

<script>
	import {getSmsCode,bindPhone,updateUser,getUser} from "@/api/user";
	export default{
		data(){
			return {
				phone:null,
				code:null,
				password:null,
				newP:null,
				cnewP:null,
				pwd_old:null,
				nickname:null,
				wechat_id:'oMuuZwsGdOlmgUo2VsDHSo-zwGME',
				getcodeSucc:'',
				tip:null,
				u_phone:null,
				u_name:null
			}
		},
		mounted(){
//			getUserId(this);
			//todos 获取登录用户wechatId
//			console.log(document.cookie);
//				let cookies = document.cookie
//				let token = cookies.split("Token=")[1];
//				if(token.indexOf("=")>-1){
//					token = token.split(";")[0];
//				}
				if(this.getCookieByName("wechat_id")!=""){
					sessionStorage.setItem("weChatId",this.getCookieByName("wechat_id"));
				}
				if(this.getCookieByName("Token")!=""){
					localStorage.setItem('token',"Bearer "+this.getCookieByName("Token"));
				}
//			  this.$store.commit('weChatId',{userId:res.data.data})
		},
		
		methods:{
			getCookieByName:function(name){
				let strcookie = document.cookie;//获取cookie字符串
				let arrcookie = strcookie.split("; ");//分割
				//遍历匹配
				for ( var i = 0; i < arrcookie.length; i++) {
					let arr = arrcookie[i].split("=");
					if (arr[0] == name){
						 return arr[1];
					}
				}
				return "";
			},
			bindwechat:function(){
				window.location.href = "http://mz.wesetup.cn/api/v1/user/wechat/bind?redirectUrl=http://mz.wesetup.cn/personal"
			},
			getUserInfo:function(){
				getUser()
				.then((res)=>{
					this.u_phone = res.data.data.phone;
					this.u_name = res.data.data.nickname;
				},(err)=>{
					
				})
			},
			changeNickname:function(){
				updateUser({nickname:this.nickname})
				.then(res=>{
					if(res.status == "200"){
						this.tip = res.data.msg
					}
				},err=>{
					
				})
			},
			changePwd:function(){
				updateUser({password:this.newP,pwd_old:this.pwd_old})
				.then(res=>{
					if(res.status == "200"){
						this.tip = res.data.msg
					}
				},err=>{
					
				})
			},
			getSmsCode:function(){
				getSmsCode({phone:this.phone})
				.then((res)=>{
					if(res.status == "200"){
						this.getcodeSucc = "获取成功";
					}
				},(err)=>{
					
				})
			},
			bindPhone:function(){
				bindPhone({phone:this.phone,code:this.code,password:this.password,wechat_id:sessionStorage.getItem("weChatId")})
				.then(res=>{
					if(res.status == "200"){
						this.tip = res.data.msg;
					}
				},err=>{
					
				})
			}
		}
	}
</script>

<style>
</style>