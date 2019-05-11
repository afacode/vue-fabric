<template>
<div class="m-singp">
     <div class="wrap">
        <div class="search-box">
        		<el-autocomplete
			      class="inline-input "
			      style="width:auto"
			      v-model="keywords"
			      :fetch-suggestions="querySearch"
			      placeholder="请输入内容"
			      :trigger-on-focus="false"
			      @select="handleSelect"
			    ></el-autocomplete>
			    <el-button type="primary" @click="searchList(keywords)" >筛选</el-button>
        </div>
     <div class="container"> 
        <div class="waterfall" ref="getLeftBarWidth"> 
            <div class="pin" v-for="(item,index) in dataList" :key="index" draggable="true" @dragstart="dragstart($event)" @dragend="dragend($event,item.paletteId)"> 
                
                <span class="del" @click="delCase((item.paletteId))" v-if="type=='jigsaw'"><img src="@/assets/icon/del.png" alt=""></span>
                <img v-if="type=='sing'" :src="item.img||'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1522757523364&di=f78444b0ec36366afa8d8cbd5a2d722f&imgtype=0&src=http%3A%2F%2Fpic34.photophoto.cn%2F20150122%2F0020032986643717_b.jpg'" > 
                <img v-if="type=='jigsaw'" :src="item.thumb||'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1522757523364&di=f78444b0ec36366afa8d8cbd5a2d722f&imgtype=0&src=http%3A%2F%2Fpic34.photophoto.cn%2F20150122%2F0020032986643717_b.jpg'" > 

                <span class="collection" @click="addImageToCollection" v-else :data-itemId="item.itemId">
                  收藏
                  </span>
         
                <p>{{item.name}}</p> 
            </div> 
        
        </div> 
        </div>
    </div>
</div>
 
</template>
<script>
//import Vue from "vue";
import axios from '@/api/axios'
import {query} from "@/api/image";
import { caseBasic, del } from "@/api/case";
export default {
  props: ["dataList", "type"],
  data() {
    return {
    	state1:"",
      leftBar: {}, //左侧宽高
      canvasPos: {}, //canvas 宽高
      mouseImgPos: {}, // 鼠标拖拽相对图片的位置
      keywords: "",
      boardId: null,
      list:[]
    };
  },
  created() {},
  mounted() {
    this.boardId = this.$route.query.boardId
  },
  methods: {
  	handleSelect:function(){},
  	querySearch:function(queryString,cb){
  		query(queryString)
  		.then(res=>{
  			if(res.status == "200"){
  				this.list = [];
  				let data = res.data;
  				for(let i of data){
  					let temp ={};
  					temp.value =  i;
  					this.list.push(temp);
  				}
  				cb(this.list);  
  			}
  		})
  	},
    /**@augments
     * function 收藏图片到个人中心
     */
    collection() {
      // 判断是否登陆 无 跳登陆注册   添加收藏夹 或者取消收藏
    },

    dragstart(ev) {
      /*拖拽开始*/
      ev.dataTransfer.setData("url", ev.target.src);
      ev.dataTransfer.setData("id", ev.target.id);
      let url = ev.dataTransfer.getData("url");
      this.mouseImgPos = {
        x: ev.offsetX,
        y: ev.offsetY
      };
    },
    dragend(ev, paletteId) {
      /*拖拽结束*/
      let url = ev.path[0].currentSrc;
      let imgId = ev.path[0].id + new Date().getTime();
      // this.$emit('childMethod','childParam');
      //第一个参数名为调用的方法名，第二个参数为需要传递的参数
      let pos = {
        left: 10,
        top: 10,
        width: 100,
        height: 100,
        angle: 0
      };
      this.drawObj();
      if (ev.clientX > this.canvasPos.x && ev.clientX < this.canvasPos.r) {
        if (this.type == "jigsaw") {
          this.getCaseBasic(paletteId); //获取案例基础信息
          return;
        }
        this.cover(url, ev, canvas);
      }
    },

    cover(url, ev) {
      var _this = this;
      var canvas = _this.$store.state.fabricObj.canvas;

      fabric.util.loadImage(
        url,
        function(oimg) {
          var imgInstance = new fabric.Image(oimg, {
            //设置图片在canvas中的位置和样子
            left: ev.clientX - _this.canvasPos.x - _this.mouseImgPos.x,
            top: ev.clientY - _this.canvasPos.y - _this.mouseImgPos.y,
            scale: 1
          });

          canvas.add(imgInstance);
          imgInstance.crossOrigin = "Anonymous";
          imgInstance
            .on("selected", function(options) {
              _this.$store.commit("setOptionSelect", true);
            })
            .on("deselected", function(options) {
              // option.style.display = "none";
              _this.$store.commit("setOptionSelect", false);
            });
        },
        canvas.getContext(),
        true
      );
    },
    drop(ev) {
      ev.preventDefault();
    },
    drawObj() {
      this.leftBar = {
        width: this.$refs.getLeftBarWidth.offsetWidth,
        height: this.$refs.getLeftBarWidth.offsetHeight
      };

      this.canvasPos = {
        x: document.querySelector("canvas").getBoundingClientRect().left,
        y: document.querySelector("canvas").getBoundingClientRect().top,
        w: document.querySelector("canvas").getBoundingClientRect().width,
        h: document.querySelector("canvas").getBoundingClientRect().height,
        l: document.querySelector("canvas").getBoundingClientRect().left,
        t: document.querySelector("canvas").getBoundingClientRect().top,
        r: document.querySelector("canvas").getBoundingClientRect().right,
        b: document.querySelector("canvas").getBoundingClientRect().bottom
      };
    },
    getCaseBasic(paletteId) {
      var _this = this;
      caseBasic(paletteId).then(
        function(res) {
          _this.$emit("setCaseBasic", res.data);
        },
        function(err) {}
      );
    },
    delCase(paletteId) {
      del(paletteId);
      this.$emit("refrashList");
    },
    searchList(keywords) {
      this.$emit("setSearchList", keywords);
    },
    //添加图片到收藏夹
    addImageToCollection(){
          let _self = this;
          if(!this.boardId){
            this.$notify.info({
                title: '提示',
                message: '请指定添加的位置'
              });
            return  _self.$router.push({path:'/onself'});
          }
          axios.post('/api/v1/user/boards/images',{
                boardId: _self.boardId,
                itemId : event.target.getAttribute("data-itemId")
            })
            .then(function(res){
                if(res.data){
                    _self.$router.push({path:'/onself'});
                }  
            })
            .catch(function(err){
                console.log(err);
        });
      }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss">
.inline-input{
	width:auto;
}
.m-singp {
  background: #f5f5f5;
  .wrap {
    max-width: 1440;
    padding: 48px 0;
    margin: 0 auto;
    .search-box {
      overflow: hidden;
      width:1440px;
      margin: 0 auto;
      .el-autocomplete{
        width:80%;
      }
      .search {
        float: left;
        width: 70%;
        border-radius: 4px;
        border: #d9d9d9 1px solid;
        line-height: 20px;
        padding: 10px;
        float: left;
      }
      .btn {
        float: left;
        padding: 9px 16px;
        border-radius: 4px;
        background: #fff;
        border: #ccc 1px solid;
        margin-left: 10px;
        cursor: pointer;
      }
    }
    .container {
      max-width: 1440px;
      min-height: 800px;
      margin: 20px auto;
      .waterfall {
        column-count: 3;
        column-width: 4em;
        column-gap: 1em;
        .pin {
          position: relative;
           font-size:14px;
          .collection{
            position: absolute;
            top:2px;
            right: 10px;
            width: 42px;
            color:#677baf;
            &:hover{
              background: #868686;
            }
          }
          .del {
            position: absolute;
            right: 10px;
            bottom: 10px;
            width: 20px;
            cursor: pointer;
            display: inline-block;
            img {
              width: 100%;
            }
          }
          padding: 1em;
          margin: 0 0.125em 1em;
          -moz-page-break-inside: avoid;
          -webkit-column-break-inside: avoid;
          break-inside: avoid;
          background: white;
          img {
            width: 100%;
            padding-bottom: 1em;
            margin-bottom: 0.5em;
          }
          span {
            position: absolute;
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>


