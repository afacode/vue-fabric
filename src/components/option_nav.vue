<template>
  <div class="bar-nav"> 
    <div class="optin-box" :class="$store.state.fabricObj.optionSelect ? 'select' : '' "> 
    <span id="filter" class="optionElem"> <img src="@/assets/icon/filter.png" @click="showFilters" /> 
    <div class="filter-list-c" v-show="showFilterList">
        亮度
        <input type="range" max="1" min="-1" @input="changeBright" step="0.01" v-model="lightnum" /> 
        <span>{{lightnum}}</span>
        <br /> 对比度
        <input type="range" max="1" min="-1" @input="changeContrast" step="0.01" v-model="contrastnum" /> 
        <span>{{contrastnum}}</span>
        <br /> 饱和度
        <input type="range" max="1" min="-1" @input="changeSaturationnum" step="0.01" v-model="saturationnum" /> 
        <span>{{saturationnum}}</span>
        <br /> 清晰度
        <input type="range" max="1" min="0" @input="changeBlurnum" step="0.01" v-model="blurnum" /> 
        <span>{{blurnum}}</span>
        <br /> 透明度
        <input type="range" max="100" min="0" @input="changeOpacity" step="0.01" v-model="opacitynum" /> 
        <span>{{opacitynum}}</span>
        <br /> 
    </div> </span> 
    <span id="cut" class="optionElem" @click="cut()"> <img src="@/assets/icon/cut.png" /> </span> 
    <span id="copy" class="optionElem" @click="clone()"> <img src="@/assets/icon/copy.png" /> </span> 
    <span id="lock" class="optionElem" @click="lock()"> <img :src="$store.state.fabricObj.unclock?'http://ovfllimsi.bkt.clouddn.com/lockOpen.png':'http://ovfllimsi.bkt.clouddn.com/lockClose.png'" /> </span> 
    <span id="del" class="optionElem" @click="del()"> <img src="@/assets/icon/del.png" /> </span> 
    <span id="group" class="optionElem" @click="group()"> <img src="@/assets/icon/group.png" /> </span> 
    <span id="ungroup" class="optionElem" @click="ungroup()"> <img src="@/assets/icon/ungroup.png" /> </span> 
    <span id="ward" class="optionElem forWordOption" @click="showHideForWard()"> <img src="@/assets/icon/forWard.png" /> </span> 
    <span id="clip" class="optionElem" @click="clip()"> <img src="http://ovfllimsi.bkt.clouddn.com/flip.jpg" /> </span> 
    <span id="display" class="optionElem option-special" @click="display()"> 显示 </span> 
    <span id="hide" class="optionElem option-special" @click="hide()"> 隐藏 </span> 
    <span id="undo" class="optionElem" @click="undo()"> <img src="http://ovfllimsi.bkt.clouddn.com/go-back.png" /> </span> 
    <span id="redo" class="optionElem" @click="redo()"> <img src="http://ovfllimsi.bkt.clouddn.com/forword.jpg" /> </span> 
    <span id="canvasToImage" class="optionElem" @click="canvasToImage()"> <img src="http://ovfllimsi.bkt.clouddn.com/down.jpg" /> </span> 
    <div class="action" :class=" $store.state.fabricObj.forWrodBoxShow ? 'select' : '' "> 
    <span id="forWard" class="elmForWard" @click="changeForWord('forWard')"> <img src="@/assets/icon/forWard.png" /> </span> 
    <span id="backWard" class="elmForWard" @click="changeForWord('backWard')"> <img src="@/assets/icon/backWard.png" /> </span> 
    <span id="toFront" class="elmForWard" @click="changeForWord('toFront')"> <img src="@/assets/icon/toFront.png" /> </span> 
    <span id="toBack" class="elmForWard" @click="changeForWord('toBack')"> <img src="@/assets/icon/toBack.png" /> </span> 
 
    </div> 
    </div> 
    <div class="cut-optin" id="cutOptin" :class=" $store.state.fabricObj.cutSelect ? 'select' : '' "> 
    <span id="cancle" class="optionElem" @click="cutCancle()"> <img src="@/assets/icon/cancle.png" /> </span> 
    <span id="sure" class="optionElem" @click="cutSure()"> <img src="@/assets/icon/sure.png" /> </span> 
    </div> 
</div>
</template>
<script>

export default {
  props: ["config"],
  data() {
    return {
      showFilterList: false,
      lightnum: 0,
      contrastnum: 0,
      saturationnum: 0,
      blurnum: 0,
      colornum: 0,
      opacitynum: 0,
      filter: fabric.Image.filters,
      cutRect: {
        el: "",
        object: "",
        lastActive: "",
        object1: "",
        object2: "",
        cntObj: "",
        selection_object_left: "",
        selection_object_top: ""
      }
    };
  },
  mounted() {},
  methods: {
    clone() {
      var _this = this;
      var timestamp = Date.parse(new Date());
      _this.fabricAction.Copy(this);
      setTimeout(function() {
        _this.fabricAction.Paste(_this);
        return;
      }, 5);
    },
    del() {
      var el = this.$store.state.fabricObj.canvas.getActiveObject();
      this.$store.state.fabricObj.canvas.remove(el);
    },

    cut() {
      this.$store.commit("setOptionSelect", false);
      this.$store.commit("setCutSelect", true);
      this.fabricAction.startCrop(this);
    },
    group() {
      this.fabricAction.fabricObjGroup(this);
    },
    ungroup() {
      this.fabricAction.fabricObjUnGroup(this);
    },
    cutCancle() {
      this.$store.state.fabricObj.canvas.remove(this.cutRect.el);
    },
    cutSure() {
      this.$store.commit("setOptionSelect", true);
      this.$store.commit("setCutSelect", false);
      this.fabricAction.crop(this);
    },
    showFilters: function() {
      if (this.showFilterList) {
        this.showFilterList = false;
        return;
      }
      this.showFilterList = true;
    },
    getObject: function() {
      return this.$store.state.fabricObj.canvas.getActiveObject();
    },
    changeOpacity: function() {
      var obj = this.getObject();
      obj.opacity = parseFloat(1 - this.opacitynum / 100);
      this.$store.state.fabricObj.canvas.renderAll();
    },
    changeBlurnum: function() {
      var obj = this.getObject();
      obj.filters[3] = new this.filter.Blur({
        blur: parseFloat(this.blurnum)
      });
      obj.applyFilters();
      this.$store.state.fabricObj.canvas.renderAll();
    },
    changeSaturationnum: function() {
      var obj = this.getObject();
      obj.filters[2] = new this.filter.Saturation({
        saturation: parseFloat(this.saturationnum)
      });
      obj.applyFilters();
      this.$store.state.fabricObj.canvas.renderAll();
    },
    changeContrast: function() {
      var obj = this.getObject();
      obj.filters[1] = new this.filter.Contrast({
        contrast: parseFloat(this.contrastnum)
      });
      obj.applyFilters();
      this.$store.state.fabricObj.canvas.renderAll();
    },
    changeBright: function() {
      var obj = this.getObject();
      obj.filters[0] = new this.filter.Brightness({
        brightness: parseFloat(this.lightnum)
      });
      obj.applyFilters();
      this.$store.state.fabricObj.canvas.renderAll();
    },
    applyFilterValue: function(index, prop, value) {
      var obj = this.canvas.getActiveObject();
      if (obj.filters[index]) {
        obj.filters[index][prop] = value;
        obj.applyFilters();
        this.$store.state.fabricObj.canvas.renderAll();
      }
    },
    applyFilter: function(index, filter) {
      var obj = canvas.getActiveObject();
      obj.filters[index] = filter;
      obj.applyFilters();
      canvas.renderAll();
    },
    lock() {
      this.fabricAction.lockOption(this);
    },
    showHideForWard() {
      this.$store.commit(
        "setForwordBox",
        !this.$store.state.fabricObj.forWrodBoxShow
      );
    },
    changeForWord(style) {
      this.fabricAction.fabricForward(this, style);
    },
    /**@augments
     * anthor lifq
     * @param
     * @return
     */
    clip() {
      this.fabricAction.clip(this);
    },
    hide() {
      this.fabricAction.hide(this);
    },
    display() {
      this.fabricAction.display(this);
    },
    // 历史记录
    undo() {
      let _self = this;
        this.$store.commit("setOptionSelect", false);
        this.$store.commit("setCutSelect", false);
      if (this.config.undoFinishedStatus) {
        if (this.config.currentStateIndex == -1) {
          this.config.undoStatus = false;
          return
        }
         if (this.config.canvasState.length >= 1) {
            this.config.undoFinishedStatus = 0;
            if (this.config.currentStateIndex != 0) {
              this.config.undoStatus = true;
              this.$store.state.fabricObj.canvas.loadFromJSON(
                this.config.canvasState[this.config.currentStateIndex - 1],
                function() {
                  var jsonData = JSON.parse(
                    _self.config.canvasState[_self.config.currentStateIndex - 1]
                  );
                  _self.$store.state.fabricObj.canvas.renderAll();
                  _self.config.undoStatus = false;
                  _self.config.currentStateIndex -= 1;
                  _self.config.undoFinishedStatus = 1;
                }
              );
              setTimeout(() => {
                _self.bindOption(_self);
               
              }, 200);
              return
            } 
            if (_self.config.currentStateIndex == 0) {
              _self.$store.state.fabricObj.canvas.clear();
              _self.config.undoFinishedStatus = 1;
              _self.config.currentStateIndex -= 1;

            }
          }
      }
    },
    redo() {
      let _self = this;
      // if (this.config.redoFinishedStatus) {
        if ( this.config.canvasState.length > this.config.currentStateIndex && this.config.canvasState.length != 0) {
          this.config.redoFinishedStatus = 0;
          this.config.redoStatus = true;
          this.$store.state.fabricObj.canvas.loadFromJSON(
            this.config.canvasState[this.config.currentStateIndex + 1],
            function() {
              var jsonData = JSON.parse(
                _self.config.canvasState[_self.config.currentStateIndex + 1]
              );
              _self.$store.state.fabricObj.canvas.renderAll();
              _self.config.redoStatus = false;
              _self.config.currentStateIndex += 1;
              _self.config.redoFinishedStatus = 1;
            }
          );
          setTimeout(() => {
            _self.bindOption(_self);
           
          }, 200);
        }
      // }
    },
    /**@augments
     * fucntion  loadFromJSON 的对象需要遍历循环绑定事件
     */
    bindOption(_this) {
      _this.$store.state.fabricObj.canvas.getObjects().forEach(function(k, i) {
        // _this.fabricAction.bindSeletUnSelectEvent(k, _this);
        k
          .on("selected", function(options) {
            _this.$store.commit("setOptionSelect", true);
          })
          .on("deselected", function(options) {
            // option.style.display = "none";
            _this.$store.commit("setOptionSelect", false);
          });
      });
    },
    /**@augments
     * fucntion 转为图片并下载到本地
     */
    canvasToImage() {
      var MIME_TYPE = "image/png";
      //转换成base64
      var imgURL = this.$store.state.fabricObj.canvas.toDataURL(MIME_TYPE); //创建一个a链接，模拟点击下载
      var dlLink = document.createElement("a");
      var filename = "个人画板_" + new Date().getTime() + ".png";
      dlLink.download = filename;
      dlLink.href = imgURL;
      dlLink.dataset.downloadurl = [
        MIME_TYPE,
        dlLink.download,
        dlLink.href
      ].join(":");
      document.body.appendChild(dlLink);
      dlLink.click();
      document.body.removeChild(dlLink);
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
.filter-list-c {
  position: absolute;
  background: #fff;
  top: 20px;
  right: 10px;
  border: 1px solid #eee;
  z-index: 999;
  padding: 20px 20px 30px 20px;
}
.bar-nav {
  background: #eee;
  padding: 10px;
  height: 30px;
  position: relative;
}
.optin-box {
  display: none;
  position: relative;
  span {
    display: inline-block;
    width: 25px;
    margin-right: 20px;
    vertical-align: middle;
    &.select {
      display: block;
    }
    &.option-special {
      width: 40px;
    }
    cursor: pointer;
    img {
      display: inline-block;
      float: left;
      width: 100%;
    }
  }
  .action {
    width: 220px;
    position: absolute;
    background-color: #eee;
    padding: 4px;
    top: 10px;
    left: 450px;
    border: #ccc 1px solid;
    display: none;
    &.select {
      display: block;
    }
    span {
      display: inline-block;
      img {
        width: 25px;
      }
    }
  }
}
.cut-optin {
  display: none;
  position: absolute;
  left: 100px;
  background: #fff;
  padding: 2px 10px;
  border: #eee 1px solid;
  span {
    display: inline-block;
    width: 25px;
    margin-right: 20px;
    cursor: pointer;
    img {
      display: inline-block;
      float: left;
      width: 100%;
    }
  }
}
.select {
  display: block;
}
</style>
