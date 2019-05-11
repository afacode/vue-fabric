<template>
<div>
    <ul class="imgul" v-for="single in imgData">
        <li class="imgsize">
            <img :src="single.url" alt="" :data-id="single.id">
            <span @click="addImage()" :data-id="single.id">添加图片</span>
        </li>
    </ul>
</div>
  
</template>
<script>
// import axios from 'axios';
import axios from '@/api/axios'
export default {
  data(){
      return{
          imgData:[
              {
                    id: '979301212879192066',
                    url: 'https://assets.wesetup.cn/22.jpg'
              },
              {
                    id: '979300579321184258',
                    url: 'https://assets.wesetup.cn/QQ%E5%9B%BE%E7%89%8720180328162216.jpg'
              },
              {
                    id: '979300532860878850',
                    url: 'https://assets.wesetup.cn/1.jpg'
              },
              {
                    id: '979300413834919938',
                    url: 'https://assets.wesetup.cn/QQ%E5%9B%BE%E7%89%8720180328162216.jpg'
              }
          ],
          boardId: null
          
      }
  },
  created(){
      
  },
  mounted(){
      this.boardId = this.$route.query.boardId
  },
  methods:{
      addImage(){
          let _self = this;
          axios.post('/api/v1/user/boards/images',{
                boardId: _self.boardId,
                itemId : event.target.getAttribute("data-id")
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
}
</script>
<style scoped>
.imgul{
    margin: 30px;
}
.imgsize{
    width:200px;
    height: 100px;
}
.imgsize img{
    width: 100%;
    height: 100%;
}
.imgsize span:hover{
    cursor: pointer;
}
</style>




