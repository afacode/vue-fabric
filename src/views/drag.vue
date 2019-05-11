<template>
<div>
  <header>
    <button class="btn" @click="copy">复制</button>
    <button class="btn" @click="clip">裁剪</button>
    <button class="btn" @click="del">删除</button>
    <button class="btn" @click="toJson">toJSON</button>
    <button class="btn" @click="toSVG">toSVG</button>
    <button class="btn" @click="toSVGLocal">SVG保存到本地</button>
    <button class="btn" @click="canvasToImage">转化为图片</button>
  </header>
  <div class="contain">
    <div class="leftBar" ref="getLeftBarWidth">
      <div class="imgBox" ref="imgBox">
        <span class="floatText" ref="floatText" @click="imgToCanvas($event)">到画布</span>
        <img class="imgSize" :src="imgInstance[1].pic" draggable="true"   @dragstart="dragstart($event)" @dragend="dragend($event)" />
      </div>
      
    </div>   
      <canvas ref="canvas" class="canvas"  width="600" id="canvas"  height="400" @drop="drop($event)" @dragover="dragover($event)" ></canvas>
  </div>

  <img id="toImage" ref="toImage" src="" />  
  </div>
  
</template>
<style scoped>
.contain{
  display: flex;
}
.btn{
  line-height: 30px;
  min-width: 60px;
}
.leftBar{
  width: 400px;
  height: 400px;
  /* background:#ccc; */
  border:1px solid red;
}
.imgBox{
  position: relative;
  width:200px;
  height: 198px;
}
.imgSize{
  width: 200px ;
}
.floatText{
  position: absolute;
  right: 0;
  display: none;
   /* opacity: 0; */
   cursor: pointer;
  background: deeppink;
}
.canvas{
    border: 1px solid red;
    background-color: #fff;
}
</style>
<script>

export default {
  data() {
    return {
      imgInstance: [
        {
          key: "img1",
          pic: "http://ovfllimsi.bkt.clouddn.com/fabricPic1.jpeg",
          position: { left: 100, top: 100, width: 200, height: 198, angle: 10 }
        },
        {
          key: "img1",
          pic: "../../static/2.jpg",
          position: { left: 100, top: 100, width: 200, height: 198, angle: 10 }
        },
        
      ],
      canvas:"",
      leftBar:{},  //左侧宽高
      canvasPos:{}, //canvas 宽高
      mouseImgPos:{}, // 鼠标拖拽相对图片的位置
      dataCanvasJson:[],
      rebackNum: 0
    };
  },
  mounted() {
    //绘制画布
    let _self = this;
          this.canvas = new fabric.Canvas('canvas');
          // var rect = new fabric.Rect({ width: this.canvas.width, height: this.canvas.height, fill: 'green' });
          // this.canvas.add(rect);  
          this.leftBar={
            width:this.$refs.getLeftBarWidth.offsetWidth,
            height:this.$refs.getLeftBarWidth.offsetHeight
          };
          this.canvasPos={
            width:this.$refs.canvas.offsetWidth,
            height:this.$refs.canvas.offsetHeight
          };
          this.$refs.imgBox.onmouseover = function(e){
            e.preventDefault()
            _self.$refs.floatText.style.display = 'block';
            // _self.$refs.floatText.style.opacity = '1';
          }
          this.$refs.imgBox.onmouseout = function(e){
            e.preventDefault()
            _self.$refs.floatText.style.display = 'none';
            // _self.$refs.floatText.style.opacity = '0';
          }
          
  },
  created() {
  },
  methods: {
    dragstart(ev){
      /*拖拽开始*/
      ev.dataTransfer.setData("url",ev.target.src);
      this.mouseImgPos={
        x: ev.offsetX,
        y: ev.offsetY
      }
    },
    dragend(ev){
      /*拖拽结束*/
      let url = ev.path[0].currentSrc;
      let  canvas = this.canvas;
      if(ev.offsetX > this.leftBar.width && ev.offsetX < (this.leftBar.width+this.canvasPos.width)){
        this.cover(url,ev, canvas);
      }
    },
    cover(url,ev, canvas){
      // var canvas = new fabric.Canvas('canvas');
      console.log(ev.offsetX)
      let _self = this;
      return new fabric.Image.fromURL(url, function(oImg){
          oImg.left = ev.offsetX -  _self.leftBar.width - _self.mouseImgPos.x ;
          oImg.top = ev.offsetY - _self.mouseImgPos.y;
          oImg.scale(1);
          canvas.add(oImg);
        })
        
    },
    drop(ev){
      // console.log('拖拽元素进入目标元素头上，同时鼠标松开的时候');
      ev.preventDefault();
    },
    dragover(ev){
      // console.log('拖拽元素在目标元素头上移动的时候');
      ev.preventDefault();
    },
    paste(_clipboard){
        // clone again, so you can do multiple copies.
        let canvas = this.canvas;
        _clipboard.clone(function(clonedObj) {
            canvas.discardActiveObject();
            clonedObj.set({
                left: clonedObj.left + 20,
                top: clonedObj.top + 20,
                evented: true,
            });
            if (clonedObj.type === 'activeSelection') {
                clonedObj.canvas = canvas;
                clonedObj.forEachObject(function(obj) {
                    canvas.add(obj);
                });
                clonedObj.setCoords();
            } else {
                canvas.add(clonedObj);
            }
            _clipboard.top += 20;
            _clipboard.left += 20;
            canvas.setActiveObject(clonedObj);
        });
    }, 
    copy(){
       let canvas = this.canvas;
       var _self = this;
        canvas.getActiveObject().clone(function(cloned){
              _self.paste(cloned);
            
        })
    },
    clip(){
     },
    del() {
      var el = this.canvas.getActiveObject();
      this.canvas.remove(el);
    },
    toJson(){
      alert(JSON.stringify(this.canvas.toJSON()));
      console.log(JSON.stringify(this.canvas.toJSON()));
    },
    toSVG(){
      console.log(this.canvas.toSVG());
    },
    toSVGLocal(){
      let fso;
        try { 
          fso=new ActiveXObject("Scripting.FileSystemObject"); 

        } catch (e) { 
          alert("当前浏览器不支持");
          return;
        } 
        alert("方法已执行2");
        var f1 = fso.createtextfile("D:\\1.svg", true);
        f1.write(this.canvas.toSVG());  
        f1.close();
    },
    canvasToImage(){
      var MIME_TYPE = "image/png";
      //转换成base64
      var imgURL = this.canvas.toDataURL(MIME_TYPE);
  　　//创建一个a链接，模拟点击下载
      var type = 'png';
  　　var dlLink = document.createElement('a');
      var filename = '个人画板_' + (new Date()).getTime() +  '.' + type;
  　　dlLink.download = filename;
  　　dlLink.href = imgURL;
  　　dlLink.dataset.downloadurl = [MIME_TYPE, dlLink.download, dlLink.href].join(':');
  　　document.body.appendChild(dlLink);
  　　dlLink.click();
  　　document.body.removeChild(dlLink);  
    },
    downloadimage(event){
      // 图片导出为 png 格式
      var type = 'png';
      // 返回一个包含JPG图片的<img>元素
      var img_png_src = this.canvas.toDataURL("image/png");  //将画板保存为图片格式的函数
      // 加工image data，替换mime type
      var imgData = img_png_src.replace(this._fixType(type),'image/octet-stream');
      // 下载后的问题名
      var filename = '个人画板_' + (new Date()).getTime() + '.' + type;
      // download
      this.saveFile(imgData,filename);
    },

    /**
    * 在本地进行文件保存
    * @param  {String} data     要保存到本地的图片数据
    * @param  {String} filename 文件名
    */
    saveFile(data, filename){
      var save_link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
      save_link.href = data;
      save_link.download = filename;
      var event = document.createEvent('MouseEvents');
      event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
      save_link.dispatchEvent(event);
    },

    /**
    * 获取mimeType
    * @param  {String} type the old mime-type
    * @return the new mime-type
    */
    _fixType(type) {
      type = type.toLowerCase().replace(/jpg/i, 'jpeg');
      var r = type.match(/png|jpeg|bmp|gif/)[0];
      return 'image/' + r;
    },
    
  }
};
</script>
