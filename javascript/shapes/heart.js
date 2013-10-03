var Heart = function() {
	this.x = svg.width/2;
	this.y = svg.height/2;
	this.width = 3*svg.width/4;
	this.fill = "none";
	this.strokeWidth = "2px";
	this.centralHeight = svg.height/2;
	this.cp1y = this.centralHeight/2 + 50;
	this.pointedTip = 30;
	this.element = null;
	this.init();
}

Heart.prototype.init = function (){
	this.element = document.createElementNS(svg.namespace,"path");
	svg.element.appendChild(this.element);
	this.element.setAttribute("fill",this.fill);
	this.element.setAttribute("stroke","#333");
	this.element.setAttribute("stroke-width",this.strokeWidth);
	this.draw();
}

Heart.prototype.draw = function(){
	this.cp2x = this.x - this.width/2;
	this.cp2y = this.y - (this.y + this.cp1y - this.centralHeight);

	this.cp3x = this.x + (this.x - 2*this.width + this.cp1x);
	this.cp3y = this.y - (this.y + this.cp1y - this.centralHeight);


	path = [
	"M", this.x, ",", this.y-this.centralHeight/2,
	"A", this.width/4, ",", this.width/4, " 0 0,0 ", this.x - this.width/2, ",", this.y-this.centralHeight/2,
	"C", this.cp2x,",",this.y - this.cp2y," ",this.x, ",", this.y+this.centralHeight/2 - this.pointedTip," ",this.x, ",", this.y+this.centralHeight/2,
	"C", this.x, ",", this.y+this.centralHeight/2 - this.pointedTip, " ", this.x + this.width/2,",",this.y - this.cp2y, " ",this.x + this.width/2, ",", this.y-this.centralHeight/2,
	"A", this.width/4, ",", this.width/4, " 0 0,0 ", this.x, ",", this.y-this.centralHeight/2
	]
	this.element.setAttribute("d", path.join(""));
	this.element.setAttribute("transform", "translate(0,"+this.width/8+")");
}


var heart = new Heart();



var circleNode = document.createElementNS(svg.namespace,"circle");
var circleElement = svg.element.appendChild(circleNode);
function drawCircle(){
	circleElement.setAttribute("cx", heart.cp2x);
	circleElement.setAttribute("cy",heart.y - heart.cp2y);
	circleElement.setAttribute("r","2");
};
drawCircle();


widthController =  gui.add(heart, 'width',1, svg.width);
centralHeightController =  gui.add(heart, 'centralHeight',1, 300);
pointController =  gui.add(heart, 'pointedTip',0, 100);
// cp1xController =  gui.add(heart, 'cp1x',0, 300);
cp1yController =  gui.add(heart, 'cp1y',0, 300);

for (var i in gui.__controllers) {
	gui.__controllers[i].onChange(function(){
		heart.draw();
	});
};

widthController.onChange(function(){
	heart.draw();
	drawCircle();
})


