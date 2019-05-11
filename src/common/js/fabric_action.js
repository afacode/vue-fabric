const bindSeletUnSelectEvent = function (imgObj, _this) {
  imgObj.on("selected", function (options) {
    _this.$store.commit("setOptionSelect", true);
    if (_this.$store.state.fabricObj.canvas.getActiveObject().lockMovementX) {
      _this.$store.commit("setUnclock", false);
      return
    }
    _this.$store.commit("setUnclock", true);
  })
    .on("deselected", function (options) {
      _this.$store.commit("setOptionSelect", false);
    });
}
const createCanvas = function (canvasId) {
  return new fabric.Canvas(canvasId); //声明画布
}

const Copy = function (_this) {
  _this.$store.state.fabricObj.canvas.getActiveObject().clone(function (cloned) {
    _this.$store.commit("setClipboard", cloned);
  });
}
const Paste = function (_this) {
  _this.$store.state.fabricObj._clipboard.clone(function (clonedObj) {
    _this.$store.state.fabricObj.canvas.discardActiveObject();
    clonedObj.set({
      left: clonedObj.left + 50,
      top: clonedObj.top + 50,
      evented: true
    });
    if (clonedObj.type === "activeSelection") {
      clonedObj.canvas = _this.$store.state.fabricObj.canvas;
      clonedObj.forEachObject(function (obj) {
        _this.$store.state.fabricObj.canvas.add(obj);
      });
      clonedObj.setCoords();
    } else {
      _this.$store.state.fabricObj.canvas.add(clonedObj);
    }
    _this.$store.state.fabricObj._clipboard.top += 30;
    _this.$store.state.fabricObj._clipboard.left += 30;
    _this.$store.state.fabricObj.canvas.setActiveObject(clonedObj);
    _this.$store.state.fabricObj.canvas.requestRenderAll();
    _this.fabricAction.bindSeletUnSelectEvent(clonedObj, _this);
    _this.$store.commit("setOptionSelect", true);

  });
}

const startCrop = function (_this) {
  _this.$store.state.fabricObj.canvas.remove(_this.cutRect.el);
  if (_this.$store.state.fabricObj.canvas.getActiveObject()) {
    _this.cutRect.object = _this.$store.state.fabricObj.canvas.getActiveObject();

    if (_this.cutRect.lastActive && _this.cutRect.lastActive !== _this.cutRect.object) {
      _this.cutRect.lastActive.clipTo = null;
    }

    _this.cutRect.el = new fabric.Rect({
      fill: "rgba(0,0,0,0.3)",
      originX: "left",
      originY: "top",
      stroke: "#ccc",
      strokeDashArray: [2, 2],
      opacity: 1,
      width: 1,
      height: 1,
      borderColor: "#36fd00",
      cornerColor: "green",
      hasRotatingPoint: false
    });
    _this.cutRect.el.left = _this.$store.state.fabricObj.canvas.getActiveObject().left;
    _this.cutRect.selection_object_left = _this.$store.state.fabricObj.canvas.getActiveObject().left;
    _this.cutRect.selection_object_top = _this.$store.state.fabricObj.canvas.getActiveObject().top;
    _this.cutRect.el.top = _this.$store.state.fabricObj.canvas.getActiveObject().top;
    _this.cutRect.el.width =
      _this.$store.state.fabricObj.canvas.getActiveObject().width *
      _this.$store.state.fabricObj.canvas.getActiveObject().scaleX;
    _this.cutRect.el.height =
      _this.$store.state.fabricObj.canvas.getActiveObject().height *
      _this.$store.state.fabricObj.canvas.getActiveObject().scaleY;
    _this.$store.state.fabricObj.canvas.add(_this.cutRect.el);
    _this.$store.state.fabricObj.canvas.setActiveObject(_this.cutRect.el);
    return
  }
  alert("Please select an object or layer");

}
const crop = function (_this) {
  var left = _this.cutRect.el.left - _this.cutRect.object.left;
  var top = _this.cutRect.el.top - _this.cutRect.object.top;
  left *= 1;
  top *= 1;
  var width = _this.cutRect.el.width * 1;
  var height = _this.cutRect.el.height * 1;
  _this.cutRect.object.clipTo = function (ctx) {
    ctx.rect(-(_this.cutRect.el.width / 2) + left, -(_this.cutRect.el.height / 2) + top, parseInt(width * _this.cutRect.el.scaleX), parseInt(_this.cutRect.el.scaleY * height));
  };
  _this.$store.state.fabricObj.canvas.remove(_this.$store.state.fabricObj.canvas.getActiveObject());
  _this.cutRect.lastActive = _this.cutRect.object;
  _this.$store.state.fabricObj.canvas.renderAll();
}
const lockOption = function (_this) {
  if (_this.$store.state.fabricObj.unclock) {
    _this.$store.state.fabricObj.canvas.getActiveObject().lockMovementX = true;
    _this.$store.state.fabricObj.canvas.getActiveObject().lockMovementY = true;
    _this.$store.state.fabricObj.canvas.getActiveObject().lockRotation = true;
    _this.$store.state.fabricObj.canvas.getActiveObject().lockScalingX = true;
    _this.$store.state.fabricObj.canvas.getActiveObject().lockScalingY = true;
    _this.$store.commit("setUnclock", false);
    return;
  }
  _this.$store.state.fabricObj.canvas.getActiveObject().lockMovementX = false;
  _this.$store.state.fabricObj.canvas.getActiveObject().lockMovementY = false;
  _this.$store.state.fabricObj.canvas.getActiveObject().lockRotation = false;
  _this.$store.state.fabricObj.canvas.getActiveObject().lockScalingX = false;
  _this.$store.state.fabricObj.canvas.getActiveObject().lockScalingY = false;
  _this.$store.commit("setUnclock", true);

}

const fabricObjGroup = function (_this) {
  if (!_this.$store.state.fabricObj.canvas.getActiveObject()) {
    return;
  }
  if (_this.$store.state.fabricObj.canvas.getActiveObject().type !== 'activeSelection') {
    return;
  }
  _this.$store.state.fabricObj.canvas.getActiveObject().toGroup();
  _this.$store.state.fabricObj.canvas.requestRenderAll();
}

const fabricObjUnGroup = function (_this) {
  if (!_this.$store.state.fabricObj.canvas.getActiveObject()) {
    return;
  }
  if (_this.$store.state.fabricObj.canvas.getActiveObject().type !== 'group') {
    return;
  }
  _this.$store.state.fabricObj.canvas.getActiveObject().toActiveSelection();
  _this.$store.state.fabricObj.canvas.requestRenderAll();
}

const fabricForward = function (_this, style) {
  _this.$store.commit("setForwordBox", false);
  debugger
  _this.$store.state.fabricObj.canvas.preserveObjectStacking = true;
  if (style == 'forWard') {

    _this.$store.state.fabricObj.canvas.bringForward(_this.$store.state.fabricObj.canvas.getActiveObject());
    return
  }
  if (style == 'backWard') {
    _this.$store.state.fabricObj.canvas.sendBackwards(_this.$store.state.fabricObj.canvas.getActiveObject());

    return
  }
  if (style == 'toFront') {

    _this.$store.state.fabricObj.canvas.bringToFront(_this.$store.state.fabricObj.canvas.getActiveObject());
    return
  }
  if (style == 'toBack') {
    _this.$store.state.fabricObj.canvas.sendToBack(_this.$store.state.fabricObj.canvas.getActiveObject());
    return
  }
}

/**
 * author lifq
 * function 水平翻转
 * @param {string}
 * @returns 
 */
const clip = function (_this) {
  _this.$store.state.fabricObj.canvas.getActiveObject().set('scaleX', -1).setCoords();
  _this.$store.state.fabricObj.canvas.requestRenderAll();
}

/**
 * fuction 不可见
 */
const hide = function (_this) {
  _this.$store.state.fabricObj.canvas.getActiveObject().set('opacity', 0).setCoords();
  _this.$store.state.fabricObj.canvas.requestRenderAll()
}

/**
 * fuction 可见
 */
const display = function (_this) {
  _this.$store.state.fabricObj.canvas.getActiveObject().set('opacity', 1).setCoords();
  _this.$store.state.fabricObj.canvas.requestRenderAll()
}

/**
 * function 监听canvas变动事件
 */
const canvasDataChange = function (_self) {
  _self.$store.state.fabricObj.canvas.on('object:modified', function () {
    updateCanvasState(_self);
  });
  _self.$store.state.fabricObj.canvas.on('object:added', function () {
    updateCanvasState(_self)
  });
  _self.$store.state.fabricObj.canvas.on('object:removed', function () {
    updateCanvasState(_self)
  });
  _self.$store.state.fabricObj.canvas.on('object:rotating', function () {
    updateCanvasState(_self)
  });
}

// 定义一些数据常量
var config = {
  canvasState: [],
  currentStateIndex: -1,
  redoStatus: false, //撤销状态
  undoStatus: false,  // 重做状态
  undoFinishedStatus: 1,
  redoFinishedStatus: 1,
  undoButton: null,
  redoButton: null,
}
/**
 * function 存储操作数据状态
 */
const updateCanvasState = function (_this) {
  var _self = _this;
  _self.canvas = _this.$store.state.fabricObj.canvas;
  if (config.undoStatus == false && config.redoStatus == false) {
    var jsonData = _self.canvas.toJSON();
    var canvasAsJson = JSON.stringify(jsonData);
    if (config.currentStateIndex < config.canvasState.length - 1) {
      var indexToBeInserted = config.currentStateIndex + 1;
      config.canvasState[indexToBeInserted] = canvasAsJson;
      var numberOfElementsToRetain = indexToBeInserted + 1;
      config.canvasState = config.canvasState.splice(0, numberOfElementsToRetain);
    } else {
      config.canvasState.push(canvasAsJson);
    }
    config.currentStateIndex = config.canvasState.length - 1;
    if ((config.currentStateIndex == config.canvasState.length - 1) && config.currentStateIndex != -1) {
      
    }
  }
}
/**
 * function 历史记录回退
 */
const undo = function (_this) {
  let _self = _this;
  _self.canvas = _this.$store.state.fabricObj.canvas;
  if (config.undoFinishedStatus) {
    if (config.currentStateIndex == -1) {
      config.undoStatus = false;
    }
    else {
      if (config.canvasState.length >= 1) {
        config.undoFinishedStatus = 0;
        if (config.currentStateIndex != 0) {
          config.undoStatus = true;
          _self.canvas.loadFromJSON(config.canvasState[config.currentStateIndex - 1], function () {
            var jsonData = JSON.parse(config.canvasState[config.currentStateIndex - 1]);
            _self.canvas.renderAll();
            config.undoStatus = false;
            config.currentStateIndex -= 1;
            if (config.currentStateIndex !== config.canvasState.length - 1) {
            }
            config.undoFinishedStatus = 1;
          });
        }
        else if (config.currentStateIndex == 0) {
          _self.canvas.clear();
          config.undoFinishedStatus = 1;
          config.currentStateIndex -= 1;
        }
      }
    }
  }
}
/**
 * function 历史记录前进
 */
const redo = function (_this) {
  let _self = _this;
  _self.canvas = _this.$store.state.fabricObj.canvas;
  if (config.redoFinishedStatus) {
    if ((config.currentStateIndex == config.canvasState.length - 1) && config.currentStateIndex != -1) {
      
    } else {
      if (config.canvasState.length > config.currentStateIndex && config.canvasState.length != 0) {
        config.redoFinishedStatus = 0;
        config.redoStatus = true;
        _self.canvas.loadFromJSON(config.canvasState[config.currentStateIndex + 1], function () {
          var jsonData = JSON.parse(config.canvasState[config.currentStateIndex + 1]);
          _self.canvas.renderAll();
          config.redoStatus = false;
          config.currentStateIndex += 1;
          if (config.currentStateIndex != -1) {
          }
          config.redoFinishedStatus = 1;
          if ((config.currentStateIndex == config.canvasState.length - 1) && config.currentStateIndex != -1) {
            
          }
        });
      }
    }
  }
}



export default { bindSeletUnSelectEvent, createCanvas, Copy, Paste, startCrop, crop, lockOption, fabricObjGroup, fabricObjUnGroup, fabricForward, clip, hide, display, canvasDataChange, undo, redo } 