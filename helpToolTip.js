helpToolTip = (function(){
  var toolNum = 1;
  return function(){
    this.toolNum = toolNum++;
  }
})();

helpToolTip.prototype = {
  divPosition: {
    left: "top:-5px;right:40px;",
    right: "top:-5px;left:45px;",
    top: "bottom:42px;left:-15px;",
    bootm: "top:40px;right:-15px;"
  },
  spanPosition: {
    left: "top:3px;right:-22px;border-left-color:lightgray;",
    right: "top:3px;left:-22px;border-right-color:lightgray;",
    top: "bottom:-22px;left:8px;border-top-color:lightgray;",
    bootm: "top:-22px;left:8px;border-bottom-color:lightgray;" 
  },
  init: function(elem, text, dir){ //dir: left,right,top,bottom
    this.elem = elem;
    this.text = text;
    this.dir = dir;
    $(this.elem).mouseover(this.showBox.bind(this));
    $(this.elem).mouseout(this.hideBox.bind(this));
  },
  showBox: function(){
    if(!this.boxElem){
      this.createBox();
      $(this.elem).append(this.boxElem);
    }else{
      $(this.elem + "[data-tool-num='"+ this.toolNum +"']").css("display", "block");
    }
  },
  hideBox: function(){
    $(this.elem + "[data-tool-num='"+ this.toolNum +"']").css("display", "none");
  },
  createBox: function(){
    var divStyle = "position:absolute;padding-left:7px;padding-right:7px;border:2px solid lightgray;font-size:14px;color:gray;background:#fff;border-radius:2px;"
                  + this.divPosition[this.dir],
        spanStyle = "position:absolute;border:10px solid transparent;" + this.spanPosition[this.dir];
    this.boxElem = "<div style='"+ divStyle +"' data-tool-num='"+ this.toolNum +"'><span style='"+ spanStyle +"'><p>"+ this.text +"</p></div>"
  }
}
