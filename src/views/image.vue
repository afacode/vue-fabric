<template>
	<div>
		<!--<el-upload> <el-button size="small" @change="upload" type="primary">点击上传</el-button></el-upload>-->
		<input class="file" name="file" type="file" accept="image/png,image/gif,image/jpeg" @change="upload"/> 
		<!--<input value="上传图片" @click="upload" type="button" />-->
		<img id="img" />
		<div>
			<p>类别显示</p>
			<div >
				<span  style="display: inline-block;width:70px;cursor: hand;cursor: pointer;text-align: center;" v-for="(c,index) in categoryList" :key="index">
					<span :class="[{'current':cIdx == index}]" @click="setSearchCategory(index,$event)" :cName="c.name" :id="c.categoryId">{{c.name}}</span>
				</span>
				<div>
					搜索关键字：<input v-model="keywords" /><input type="button" @click="searchDetail" value="搜索" />
				</div>
			</div>
		</div>
		<div>
			<p>搜索结果</p>
			<div>
				<span v-for="item in searchResult">
					<img :src="item.img" :id="item.itemId" @click="getImgDetail($event)" />
				</span>
			</div>
		</div>
		<div>
			<p>获取图片明细</p>
			itemId:{{detail.itemId}}
			<img :src="detail.img"  />
		</div>
	</div>
</template>

<script>
	import {qiniuToken,uploadToqiniu,getUrl} from "@/api/qiniu"
	import {uploadImg,getCategory,search,getByItemId} from "@/api/image"
	import {getUserId} from "@/api/user";
	export default{
		data(){
			return {
				categoryList:null,
				searchCategory:null,
				cIdx:null,
				cId:'',
				keywords:"",
				searchResult:null,
				detail:{}
			}
		},
		mounted(){
			getUserId(this);
			this.getCategory("parentId=");
			
		},
		methods:{
			getImgDetail:function(event){
				let id = event.currentTarget.id;
				getByItemId(id)
				.then((res)=>{
					this.detail =res.data;
				},(err)=>{
					
				})
			},
			searchDetail:function(){
				search("k="+this.keywords+"&c="+(this.cId == "" ? "": this.cId))
				.then((res)=>{
					this.searchResult = res.data;
				},(err)=>{
					
				})
			},
			setSearchCategory:function(idx,e){
				this.cIdx = idx;
				this.cId = e.currentTarget.getAttribute("cName");
				
			},
			getCategory:function(param){
				getCategory(param)
				.then((res)=>{
					if(res.status == "200"){
						this.$store.commit("setClasses",res.data);
						this.categoryList = this.$store.getters.images.classes;
					}
				},(err)=>{
					
				})
			},
			getBase64Image(dataURL) {  
			    return dataURL.split("base64,")[1];  
			},
			upload:function(e){
				let file = e.target.files[0];
			    let url = getUrl(file.name);
			    let base64;
			    let reader = new FileReader();
			    let _this = this;
			    let domain = null;
			    reader.onload=function(e){
			    	base64 = _this.getBase64Image(e.target.result);
					qiniuToken()//通过后台获取七牛云token
					.then(
						(res)=>{
							return res.data;
						},
						(err)=>{
							
						}
					).then((res)=>{
						//获取token成功后发送请求到七牛添加图片
						domain = res.domain;
						let config={
							headers:{
								'Content-Type':'multipart/form-data',
								"Authorization":"UpToken "+res.uptoken
							}
						}
						return uploadToqiniu(url,base64,config);
					},(err)=>{
						
					})
					.then((res)=>{
						//在将七牛返回的信息回传给后台
						return uploadImg({
							'imgUrl':(domain+res.data.key),
							'imgHash':res.data.hash
						})
					},(err)=>{
						
					})
					.then((res)=>{
						if(res.status == '200'){
							alert("上传成功")
						}
					},(err)=>{
						
					})
			    }
			    reader.readAsDataURL( file );
			    
			}
		}
	}
</script>

<style>
	.current{
		background-color:#1E90FF;
		color: #fff;;
	}
</style>