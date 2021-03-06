function changeGradientColoredElementsToCanvas(){

var replacer = {

    elemWidth: null,

    elemHeight: null,

    elemFont: null, 

    elemText : null,

    elemComputedStyle: null,

    elemStyle: null,

    elemClass: null,

    elemHasClass: false,

    elemId: null,

    elemColor: null,

    canvas: null,

    gradient: null,

    context: null,

    init : function(element){

        this.getElemData(element)

        this.canvasGen();

        this.gradientGen();

        this.fillCanvas();

       

    },

    clear: function(){

    this.elemWidth = null;

    this.elemHeight = null;

    this.elemFont = null;

    this.elemText = null;

    this.elemComputedStyle = null;

    this.elemStyle = null;

    this.elemClass = null;

    this.elemHasClass = false;

    this.elemId = null;

    this.elemColor = null;

    this.canvas = null;

    this.gradient = null;

    this.context = null;

    if(document.getElementById("temporaryCanvasIdForReplacing")){

    document.getElementById("temporaryCanvasIdForReplacing").setAttribute("id", "");

    }

   

    },

    getElemData: function(elem){

    if(!(elem.hasAttribute("id"))){

        elem.setAttribute("id", "temporaryCanvasIdForReplacing");

        }

       

        this.elemId = elem.getAttribute("id");

    var computedStyle = window.getComputedStyle(document.getElementById(this.elemId), null);

        this.elemWidth = elem.offsetWidth;

        this.elemHeight = elem.offsetHeight;

       	        

        this.elemComputedStyle = computedStyle.cssText;

        this.elemStyle = document.getElementById(this.elemId).getAttribute("style");

       

        if(document.getElementById(this.elemId).hasAttribute("class")){

        this.elemClass = document.getElementById(this.elemId).getAttribute("class");

        this.elemHasClass = true;

        }

       

        var fontFamily = computedStyle.cssText.substr(computedStyle.cssText.indexOf("font-family:"));

        fontFamily =  fontFamily.substr(0,fontFamily.indexOf(";")).split(":")[1].substr(1);

        var fontSize = computedStyle.cssText.substr(computedStyle.cssText.indexOf("font-size:"));

        fontSize = fontSize.substr(0,fontSize.indexOf(";")).split(":")[1].substr(1);

        var fontStyle = computedStyle.cssText.substr(computedStyle.cssText.indexOf("font-style:"));

        fontStyle = fontStyle.substr(0,fontStyle.indexOf(";")).split(":")[1].substr(1);

        var fontVariant = computedStyle.cssText.substr(computedStyle.cssText.indexOf("font-variant:"));

        fontVariant = fontVariant.substr(0,fontVariant.indexOf(";")).split(":")[1].substr(1);

        var fontWeight = computedStyle.cssText.substr(computedStyle.cssText.indexOf("font-weight:"));

        fontWeight = fontWeight.substr(0,fontWeight.indexOf(";")).split(":")[1].substr(1);

        var lineHeight = computedStyle.cssText.substr(computedStyle.cssText.indexOf("line-height:"));

        lineHeight = lineHeight.substr(0,lineHeight.indexOf(";")).split(":")[1].substr(1);

       

        this.elemFont = '' + fontStyle + ' ' + fontVariant + ' ' + fontWeight +  ' ' + fontSize + '/' + lineHeight + ' ' + fontFamily;

       

        this.elemText = elem.innerText;

        var color = computedStyle.cssText.substr(computedStyle.cssText.indexOf("color:"));

        this.elemColor = color.substr(0,color.indexOf(";")).split(":")[1].substr(1);

       

    },

    canvasGen : function(){

        this.canvas = document.createElement("canvas");

        this.canvas.setAttribute('width', this.elemWidth);

        this.canvas.setAttribute('height', this.elemHeight);

        this.context = this.canvas.getContext('2d');  

    }, 

    gradientGen : function(){

    var grd = this.context.createLinearGradient(0,0,0,this.elemHeight);

    var stops = this.elemStyle.split(":")[1];

    stops = stops.substr(stops.indexOf("(")+1, stops.indexOf(")")).split(",");

    console.log('stops I got: ' , stops);

    for(var i=0; i<stops.length; i++){

    if(stops[i].length > 1){

    var stop = stops[i].replace(/^\s+|\s+$/g, '').split(" ");

    if(stop.length>1){

    var color = stop[0];

    var point = parseInt(stop[1].substr(0, stop[1].indexOf("%")))/100;

    grd.addColorStop(point, color);

    }

    }

    }

        this.gradient = grd;

    },

    fillCanvas : function(){

          this.context.fillStyle = this.gradient;

          this.context.textBaseline = 'top'; 

          this.context.font = '' + this.elemFont; 

          console.info('context font: ',this.context.font);

    },

    replace : function(elem){

        this.init(elem);

        this.context.fillText(this.elemText, 0, 0);

        this.canvas.setAttribute("style", this.elemComputedStyle);

        if(elem.hasAttribute("id")){

        this.canvas.setAttribute("id", this.elemId);

        }

        if(this.elemHasClass){this.canvas.setAttribute("class", this.elemClass);}

        document.body.replaceChild(this.canvas, document.getElementById(this.elemId));

        this.clear();

    }

}



for(var tagNo = 0; tagNo < arguments.length; tagNo++){

var elements = document.getElementsByTagName(arguments[tagNo]);

for(var elemNo=0; elemNo < elements.length; elemNo++){

var currentElementStyle = elements[elemNo].getAttribute("style").split(";");

    for(var cssProps = 0; cssProps < currentElementStyle.length-1; cssProps++){

    if(currentElementStyle[cssProps].indexOf("color") != -1){

    var colorProperty = currentElementStyle[cssProps];

    }

    }


if(colorProperty.indexOf("gradient") != -1){

replacer.replace(elements[elemNo]);

}

}