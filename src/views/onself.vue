<template>
  <div class="onself">
      个人中心
      <p>收藏夹</p>
       <el-button type="text" @click="dialogFormVisible = true">添加收藏夹</el-button>
      <hr>
      <ul v-for="(collection, index) in collectionList">
          
            <li>
                {{collection.title}}
                <!-- <div class="cover" @click="alertModel()" v-bind:style="{}"> -->
                    <!-- <span class="cover-button" @click="setCover()">设为封面</span> -->
                <!-- </div> -->
                <div class="sm-img-icon">
                    <div class="img-icon"  v-for="img in collection.boardImg"
                    v-bind:style="{ backgroundImage: 'url('+img.imgUrl+')'}">
                        <span class="cover-button-set" @click="setCover()" :data-imageId="img.itemId" :data-boardId="collection.boardId">设为封面</span>

                    </div>
                </div>

            <span class="del" :data-boardId="collection.boardId"  @click="delCollection()">删除</span> 
            <!-- <el-button :plain="true" :data-boardId="collection.boardId" @click="delCollection()">删除</el-button> -->
            <span class="chg" :data-boardId="collection.boardId" @click="chgCollection()">修改</span>
            <span v-if="collection.isShare == 0" class="chg" :data-isShare="collection.isShare"  :data-boardId="collection.boardId" @click="share()">共享</span>
            <span v-if="collection.isShare == 1" class="chg" :data-isShare="collection.isShare" :data-boardId="collection.boardId" @click="share()">不共享</span>
            <span class="chg" :data-boardId="collection.boardId" @click="detail()">详情</span>
            <span class="chg" :data-boardId="collection.boardId" @click="toAddImg()">添加图片</span>
            </li>
            <hr>
      </ul>
      
      <!-- <button @click="newCollection()">添加收藏夹</button> -->
     
      <el-dialog title="收藏夹" :visible.sync="dialogFormVisible">
          名称<el-input v-model="getCollectionTitle" placeholder="请输入收藏夹名称" ref="getCollectionTitle">
              
          </el-input>
          描述
            <el-input v-model="getCollectionDescript" placeholder="请输入收藏夹描述" ref="getCollectionDescript"></el-input>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="newCollection()">确 定</el-button>
            </div>
      </el-dialog>

      
  </div>
</template>
<script>
// import axios from 'axios';
import axios from '@/api/axios'
    export default {
        data(){
            return {
                collectionList: null,
                tempData: null,
                boardImg:[],
                getCollectionTitle:'',
                getCollectionDescript:'',
                dialogFormVisible: false,
            }
        },
        created(){
            this.getCollection();
        },
        mounted(){

        },
        methods:{
            // 查找所有画板接口
            getCollection(){
                let _self = this; 
                axios.get('/api/v1/user/boards')
                        .then(function(response){
                            _self.tempData = response.data;
                            _self.tempData.forEach((element, index) => {
                                _self.getImg(element.boardId, index);
                                // 如果 调用图片接口完成
                                
                            });

                        })
                        .catch(function(err){
                            console.log(err);
                        });
            },
            //添加收藏夹
            newCollection(){
                let _self = this; 
                if(this.$refs.getCollectionTitle.value){
                    this.dialogFormVisible = false
                    axios.post('/api/v1/user/boards',{
                            title: _self.$refs.getCollectionTitle.value,
                            description: _self.$refs.getCollectionDescript.value
                        })
                        .then(function(res){
                            if(res.status == '200'){
                                _self.$message({
                                    message: '恭喜你，添加成功',
                                    type: 'success'
                                });
                                _self.getCollection();
                            }
                        })
                        .catch(function(err){
                            console.log(err);
                    });
                }
            },
            //删除收藏夹
            delCollection(){
                let _self =this;
                axios.put(`/api/v1/user/boards/${event.target.getAttribute("data-boardId")}`,{   
                    })
                    .then(function(res){
                        if(!res.data){
                            _self.$message.error('删除失败');
                            // alert('删除失败')
                        }
                        _self.$message({
                            message: '恭喜你，删除成功',
                            type: 'success'
                        });
                        _self.getCollection();

                    })
                    .catch(function(err){
                        
                    })
            },
            //修改收藏夹
            chgCollection(){
                let _self = this;
                var title=prompt("修改标题");
                axios.put('/api/v1/user/boards',{
                        boardId : event.target.getAttribute("data-boardId"),
                        title : title,
                        description: ''
                    })
                    .then(function(res){
                        if(res.data){
                             _self.$message({
                                message: '恭喜你，修改成功',
                                type: 'success'
                            });
                            _self.getCollection();
                        }
                    })
                    .catch(function(err){
                        
                    })
            },
            //共享 不共享
            share(){
                let _self = this;
                if(event.target.getAttribute("data-isShare") == 0){
                    axios.put(`/api/v1/user/boards/shared/${event.target.getAttribute("data-boardId")}`,{
                    })
                    .then(function(res){
                        if(res.data){
                            _self.$message({
                                message: '恭喜你，设置成功',
                                type: 'success'
                            });
                            _self.getCollection();
                        }
                    })
                    .catch(function(err){
                        
                    })
                }else{
                    axios.put(`/api/v1/user/boards/unshared/${event.target.getAttribute("data-boardId")}`,{
                        
                    })
                    .then(function(res){
                        console.log(res)
                        if(res.data){
                            _self.$message({
                                message: '恭喜你，设置成功',
                                type: 'success'
                            });
                            _self.getCollection();
                        }
                        
                    })
                    .catch(function(err){
                        
                    })
                }
                
            },
            //收藏夹详情
            detail(){
                let _self = this; 
                axios.get(`/api/v1/user/boards/${event.target.getAttribute("data-boardId")}`)
                        .then(function(res){
                            if(res.status == 200){
                                // alert(res.data.title)
                                _self.$alert(`标题${res.data.title}====详情${res.data.description}`, '收藏夹详情', {
                                        confirmButtonText: '确定'
                                    });
                            }
                        })
                        .catch(function(err){
                            console.log(err);
                        });

            },
            //添加图片 /boards/images
            addImg(){
                let _self = this;
                axios.post('/api/v1/user/boards/images',{
                        title: name
                    })
                    .then(function(res){
                        if(res.status == '200'){
                            // alert('添加成功')
                            _self.getCollection();
                        }
                    })
                    .catch(function(err){
                        console.log(err);
                });
            },
            //获取图片 /boards/images/${board_id}
            getImg(boardId, index){
                let _self = this;
                axios.get(`/api/v1/user/boards/images/${boardId}`)
                        .then(function(res){
                            // _self.boardImg[index] = res.data
                            _self.tempData[index].boardImg = res.data; 
                            if(index == _self.tempData.length -1){
                                    setTimeout(function(){
                                        _self.$message({
                                            message: '获取收藏夹成功',
                                            type: 'success'
                                        });
                                        _self.collectionList = _self.tempData;
                                    },800)
                                    
                                }             
                        })
                        .catch(function(err){
                            console.log(err);
                        });
            },
            //设置为封面 /boards/images/is_primary
            setCover(){
                let confirmboolean = confirm('确定添加为封面');
                if(confirmboolean){
                    axios.put('/api/v1/user/boards/images/isPrimary',{
                        boardId: event.target.getAttribute("data-boardId"),
                        imageId: event.target.getAttribute("data-imageId")
                    })
                    .then(function(res){
                        console.log(res.data)
                        if(res.data){
                             _self.$message({
                                message: '设置成功',
                                type: 'success'
                            });
                        }
                    })
                    .catch(function(err){
                        console.log(err)
                    })
                }
                
            },
            toAddImg(){
                console.log(event.target.getAttribute("data-boardId"))
                var boardId = event.target.getAttribute("data-boardId");
                this.$router.push({path:'/sing',query:{boardId:boardId}});//类似post传参
            },
        }
    
    }
</script>
<style lang="scss" scoped>

ul, li{
    list-style:none;
}
.onself{
    margin-left: 20px;
}
.del{
    cursor: pointer;
    &:hover{
        color: blue;
        background: #f0f;
    }
}
.chg{
    cursor: pointer;
    &:hover{
        color:#fff;
        background: red;
    }
}
.cover{
    background: url(http://iph.href.lu/200x250) no-repeat 100%;
    width:200px;
    height: 200px;
    position: relative;
    &:hover{
        cursor: pointer;
    }
    .cover-button{
        display: inline-block;
        position: absolute;
        bottom: 4px;
        right: 4px;
        background: #ccc;
        &:hover{
            background: dodgerblue;
        }
    }
}
.sm-img-icon{
    display: flex;
    flex-wrap:wrap ;
    .img-icon{
        position: relative;
        background-size: cover;
        width:100px;
        height: 100px;
        border: 1px solid #000;
        margin: 4px;
    }
    .cover-button-set{
        font-size: 12px;
        color: deeppink;
        // display: none;
        &:hover{
            cursor: pointer;
            // display: inline-block;
        }
    }
}

</style>


