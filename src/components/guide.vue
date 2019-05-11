<template>
  <div class="m-guide" :class="$store.state.fabricObj.jigsawIsOpen ? 'open' : '' ">
      <div class="m" v-for="(item,index) in classFliy" :class="$store.state.fabricObj.jigsawIsOpen ? 'open' : '' ">
          <div class="img-box" @click="setSearchCategory(index,$event)"  :id="item.categoryId">
               <img src="@/assets/img/icon1.png">
          </div>   
          <span :class="[{'current':cIdx == index}]" @click="setSearchCategory(index,$event)"  :id="item.categoryId">{{item.name}}</span>
      </div>
  </div>
</template>
<script>
	import {uploadImg,getCategory,search,getByItemId} from "@/api/image"
export default {
    data(){
        return {
        		cIdx:null,
            classFliy:[]
        }
    },
    mounted(){
    	this.getCategory("parentId=");
    },
    methods:{
    	setSearchCategory:function(idx,e){
    		this.cIdx = idx;
				this.$store.commit("setClass",this.classFliy[idx]);
    	},
    	getCategory:function(param){
				getCategory(param)
				.then((res)=>{
					if(res.status == "200"){
						this.$store.commit("setClasses",res.data);
						this.classFliy = this.$store.getters.images.classes;
					}
				},(err)=>{
					
				})
			},
    }
  
}
</script>
<style rel="stylesheet/scss" lang="scss">
.m-guide{
    max-width: 1440px;
    margin:64px auto 0 auto;
    /*flex布局（作用于容器）*/
    display: flex;
    /*换行（作用于容器）*/
    flex-wrap: wrap;
    &.open {
          margin:27px auto 0 auto;
    }
    .m{
    		cursor: pointer;
        width:100px;
        text-align: center;
        margin:0 20px 20px 20px;
        color:#677BAF;
        font-size:14px;
        margin-bottom:84px;
        &.open {
            width:80px;
            margin-bottom:33px;
        }
        .img-box {
            width:20px;
            margin: auto ;
            
            img {
                width:100%;
            }
        }
    }
}
.current{
	background-color:#1E90FF;
	color: #fff;
}


</style>

