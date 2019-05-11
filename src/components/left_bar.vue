<template>
  <div class="m-lfbar" ref="getLeftBarWidth">
    <div class="left_bar">
      <img :src="imgInstance[0].pic" draggable="true" id="dragImg" @dragstart="dragstart($event)" @dragend="dragend($event)" />
    </div>
    <!-- <div class="rigth-canvas">
      <canvas class="canvas"  width="600" id="canvas"  height="600" @drop="drop($event)" ></canvas>
    </div> -->
  </div>
</template>

<style scoped>
.contain {
  display: flex;
}
.m-lfbar {
  height: 1000px;
  border: #eee 1px solid;
  padding: 10px;
}
.left_bar {
  width: 200px;
  height: 600px;
  /* background:#ccc; */
}
.canvas {
  border: 1px solid red;
}
</style>
<script>
export default {
  // props: ["canvas", "imgInstanceNew"],
  data() {
    return {
      imgInstance: [
        {
          key: "img1",
          pic: "http://ovfllimsi.bkt.clouddn.com/fabricPic1.jpeg",
          position: { left: 100, top: 100, width: 200, height: 198, angle: 10 }
        }
      ],
      leftBar:{},  //左侧宽高
      canvasPos:{}, //canvas 宽高
      mouseImgPos:{} // 鼠标拖拽相对图片的位置
    };
  },
  mounted() {
    //绘制画布
    this.leftBar={
      width:this.$refs.getLeftBarWidth.offsetWidth,
      height:this.$refs.getLeftBarWidth.offsetHeight
    };
    this.canvasPos={
        x : document.querySelector('canvas').getBoundingClientRect().left,
        y : document.querySelector('canvas').getBoundingClientRect().top,
        w : document.querySelector('canvas').getBoundingClientRect().width,
        h : document.querySelector('canvas').getBoundingClientRect().height,
        l : document.querySelector('canvas').getBoundingClientRect().left,
        t : document.querySelector('canvas').getBoundingClientRect().top,
        r : document.querySelector('canvas').getBoundingClientRect().right,
        b : document.querySelector('canvas').getBoundingClientRect().bottom
    }
  },
  created() {},
  methods: {
    dragstart(ev) {
      /*拖拽开始*/
      ev.dataTransfer.setData("url", ev.target.src);
      ev.dataTransfer.setData("id", ev.target.id);
      let url = ev.dataTransfer.getData("url");
      this.mouseImgPos={
        x: ev.offsetX,
        y: ev.offsetY
      }
    },
    dragend(ev) {
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
      // && ev.offsetY > this.canvasPos.y && ev.offsetY < this.canvasPos.b 
      if(ev.offsetX > this.canvasPos.x && ev.offsetX < this.canvasPos.r ){
              this.cover(url,ev, canvas);
      }
    },
    cover(url, ev, canvas) {
      var _this = this;
      //- _this.mouseImgPos.y
      new fabric.Image.fromURL(url, function(oImg) {
        oImg.left = ev.offsetX - _this.canvasPos.x - _this.mouseImgPos.x;
        oImg.top = ev.offsetY - _this.canvasPos.y ;
        oImg.scale(1);
        _this.$store.state.fabricObj.canvas.add(oImg);
        setTimeout(function() {
          _this.fabricAction.bindSeletUnSelectEvent(oImg,_this);
        }, 50);
      });
    },
    drop(ev) {
      ev.preventDefault();
    }
  }
};
</script>

