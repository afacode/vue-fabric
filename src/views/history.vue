<template>
<div>
  <header>
    <button class="btn" @click="copy">复制</button>
    <button type="button" class="btn" ref="undo" id="undo" @click="undo" >撤销</button>
    <button type="button" class="btn" ref="redo" id="redo"  @click="redo">重做</button>
    <button type="button" class="btn" ref="display"   @click="display">可见</button>
    <button type="button" class="btn" ref="hide"   @click="hide">不可见</button>
    <button type="button" class="btn" ref="flip"   @click="flip">翻转</button>

  </header>
  <div class="contain">
    <div class="leftBar" ref="getLeftBarWidth">
      <div class="imgBox" ref="imgBox">
        <span class="floatText" ref="floatText" @click="imgToCanvas($event)">到画布</span>
        <img :src="imgInstance[0].pic" draggable="true"   @dragstart="dragstart($event)" @dragend="dragend($event)" />
      </div>
      
    </div>   
      <canvas ref="canvas" class="canvas"  width="600" id="canvas"  height="400" @drop="drop($event)" @dragover="dragover($event)" ></canvas>
  </div>
  <div><p>收藏夹</p></div>
</div>
  
</template>

<script>

export default {
  data() {
    return {
        imgInstance: [
            {
            key: "img1",
            pic: "http://ovfllimsi.bkt.clouddn.com/fabricPic1.jpeg",
            position: { left: 100, top: 100, width: 200, height: 198, angle: 10 }
            }
        ],
        canvas:"",
        leftBar:{},  //左侧宽高
        canvasPos:{}, //canvas 宽高
        mouseImgPos:{}, // 鼠标拖拽相对图片的位置
        config : {
            canvasState             : [],
            currentStateIndex       : -1,
            redoStatus              : false, //撤销状态
            undoStatus              : false,  // 重做状态
            undoFinishedStatus      : 1,
            redoFinishedStatus      : 1,
            undoButton              : this.$refs.undo,
            redoButton              : this.$refs.redo,
        }
    };
  },
  mounted() {
    //绘制画布
    let _self = this;
    this.canvas = new fabric.Canvas('canvas');
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
    
    this.config.redoButton = this.$refs.redo;
    this.config.undoButton = this.$refs.undo;
    this.canvasDataChange();
  },
  created() {
  },
  methods: {
    

    hide(){
        this.canvas.getActiveObject().set('opacity', 0).setCoords();
        this.canvas.requestRenderAll()
    },
    display(){
        this.canvas.getActiveObject().set('opacity', 1).setCoords();
        this.canvas.requestRenderAll()
    },
    flip(){
        //document.getElementById('target').style.transform = 'scaleX(-1)'; 
        this.canvas.getActiveObject().set('scaleX', -1).setCoords();
        this.canvas.requestRenderAll();
    },
    canvasDataChange(){
      let _self = this;
      this.canvas.on('object:modified', function(){
          _self.updateCanvasState();
      });
      this.canvas.on('object:added', function(){
          _self.updateCanvasState()
      });
      this.canvas.on('object:removed', function(){
          _self.updateCanvasState()
      });
      this.canvas.on('object:rotating', function(){
          _self.updateCanvasState()
      });
    },
    updateCanvasState() {
        var _self = this;
		if(this.config.undoStatus == false && this.config.redoStatus == false){
			var jsonData  = _self.canvas.toJSON();
			var canvasAsJson        = JSON.stringify(jsonData);
			if(_self.config.currentStateIndex < _self.config.canvasState.length-1){
				var indexToBeInserted                  = _self.config.currentStateIndex+1;
				_self.config.canvasState[indexToBeInserted] = canvasAsJson;
				var numberOfElementsToRetain           = indexToBeInserted+1;
				_self.config.canvasState                    = _self.config.canvasState.splice(0,numberOfElementsToRetain);
			}else{
	    	    _self.config.canvasState.push(canvasAsJson);
			}
            _self.config.currentStateIndex = _self.config.canvasState.length-1;
            if((_self.config.currentStateIndex == _self.config.canvasState.length-1) && _self.config.currentStateIndex != -1){
                
            }
		}
    }, 
    undo() {
        let _self =this;
		if(this.config.undoFinishedStatus){
			if(this.config.currentStateIndex == -1){
	    	    this.config.undoStatus = false;
			}
			else{
		        if (this.config.canvasState.length >= 1) {
        	        this.config.undoFinishedStatus = 0;
                    if(this.config.currentStateIndex != 0){
                        this.config.undoStatus = true;
                        this.canvas.loadFromJSON(this.config.canvasState[this.config.currentStateIndex-1],function(){
                                var jsonData = JSON.parse(_self.config.canvasState[_self.config.currentStateIndex-1]);
                                _self.canvas.renderAll();
                                _self.config.undoStatus = false;
                                _self.config.currentStateIndex -= 1;
                                    if(_self.config.currentStateIndex !== _self.config.canvasState.length-1){
                                    }
                                _self.config.undoFinishedStatus = 1;
                        });
                    }
                    else if(_self.config.currentStateIndex == 0){
                        _self.canvas.clear();
                        _self.config.undoFinishedStatus = 1;
                        _self.config.currentStateIndex -= 1;
                    }
                }
			}
		}
    },
    redo() {
        let _self = this;
		if(this.config.redoFinishedStatus){
			if((this.config.currentStateIndex == this.config.canvasState.length-1) && this.config.currentStateIndex != -1){
				// this.config.redoButton.disabled= true;
			}else{
		  	if(this.config.canvasState.length > this.config.currentStateIndex && this.config.canvasState.length != 0){
                this.config.redoFinishedStatus = 0;
                this.config.redoStatus = true;
                this.canvas.loadFromJSON(this.config.canvasState[this.config.currentStateIndex+1],function(){
                    var jsonData = JSON.parse(_self.config.canvasState[_self.config.currentStateIndex+1]);
                    _self.canvas.renderAll();
                    _self.config.redoStatus = false;
                    _self.config.currentStateIndex += 1;
                    if(_self.config.currentStateIndex != -1){
                    //    _self.config.redoButton.disabled = false;
                    }
                    _self.config.redoFinishedStatus = 1;
                    if((_self.config.currentStateIndex == _self.config.canvasState.length-1) && _self.config.currentStateIndex != -1){
                        // _self.config.redoButton.disabled= true;
                    }
		      });
		    }
			}
		}
	},
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
      let _self = this;
      return new fabric.Image.fromURL(url, function(oImg){
          oImg.left = ev.offsetX -  _self.leftBar.width - _self.mouseImgPos.x ;
          oImg.top = ev.offsetY - _self.mouseImgPos.y;
          oImg.scale(1);
          canvas.add(oImg);
        })
        
    },
    drop(ev){
      ev.preventDefault();
    },
    dragover(ev){
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
            // let _clipboard = cloned;
              _self.paste(cloned);
            
        })
    },    
  }
};
</script>


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
  border:1px solid red;
}
.imgBox{
  position: relative;
  width:200px;
  height: 198px;
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
}
</style>
