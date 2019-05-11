<template>
  <div class="m-topbar">
    <div class="large" v-if="!$store.state.fabricObj.jigsawIsOpen">
         <div class="logo">LOGO</div>
          <div class="classfily">
              <span  v-for="item in menu" v-bind:class="{ 'active': $store.state.fabricObj.currentNav==item.link }"  @click="goLink(item.link)">{{item.name}}</span>
          </div>
          <div class="aside">
              <span><img src="" alt=""></span>
              <span class="user">用户名</span>
              <span class="pingtu" @click="changeJigsaw()">拼图</span>
          </div>
    </div>
    <div v-else class="small">
        <span class="menu"><img src="@/assets/icon/menu.png" alt=""></span>
        <div class="aside">
        	<router-link to="/personal">
        		<span class="person"><img src="@/assets/icon/person.png"alt=""></span>
        	</router-link>
            <span class="change" @click="changeJigsaw()">切换</span>
        </div>
    </div>
  
  </div>
</template>
<script>
export default {
  data(){
    return {
        menu: [
          { link: "sing",name: "单品" },
          { link: "jigsaw",name: "拼图" },
          { link: "brand",name: "品牌" },

      ]
    }
    
  },
  methods:{
  
    changeJigsaw(){
       this.$store.commit("setJigsaw", !this.$store.state.fabricObj.jigsawIsOpen);
    },
     goLink(link) {
      this.$router.push({
        path: "./" + link
      });
     
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss">
    .m-topbar{
        background: #eee;
        height: 64px;
        .large{
          position: relative;
           .classfily {
              width:464px;
              margin:0 auto;
              span{
                display: inline-block;
                padding:0 43px;
                line-height: 64px;
                position: relative;
                cursor: pointer;
              }
              .active{
                &:after{
                  position: absolute;
                  content:"";
                  display: inline-block;
                  border:blue 1px solid;
                  bottom:0;
                  width:25%;
                  left:42px;

                }
              }
            }
            .logo {
              position: absolute;
              height: 64px;
              line-height: 64px;
              left:0;
              padding:0 24px;
            }
            .aside {
              width:200px;
              position: absolute;
              right:25px;
              top:0;
              margin-top:16px;
              .user {
                font-size:14px;
              }
              .pingtu {
                margin-left:10px;
                display: inline-block;
                background: #d8d8d8;
                border-radius: 65px;
                padding:4px 30px;
                opacity: .85;
                cursor: pointer;
              }
            }
        }
        .small {
          height: 64px;
          background: #F2F2F3;
          overflow: hidden;
          .menu {
            display: inline-block;
            width:24px;
            margin:14px 20px;
            img {
              width:100%;
            }
          }
          .aside {
            float:right;
              margin:14px 20px;
            .person {
                display: inline-block;
                width:24px;
                float:left;
                margin-right:20px;
                img {
                   width:100%;
                   display: inline-block;
                  
                }
            }
            .change {
                display:inline-block;
                float:left; 
                background: #D8D8D8;
                border-radius: 65px;
                padding:3px 20px;
                font-size:12px;
                cursor: pointer;
            }
          }
        }
       
    }
</style>


