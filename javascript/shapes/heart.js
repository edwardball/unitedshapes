var Heart = function() {
	this.x = svg.width/2;
	this.y = svg.height/2;
	this.width = 3*svg.width/4;
	this.fill = "none";
	this.stroke = "#333";
	this.strokeWidth = "2px";
	this.centralHeight = svg.height/2;
	this.cp1y = this.centralHeight/2 + 50;
	this.element = null;
	this.path = null;
	this.yCP1 = this.y - this.centralHeight/2 + svg.height/6;
	this.yCP2 = this.y + this.centralHeight/2 - svg.height/6;
	this.ctrlPoints = [];
	this.anchors = [];
	this.showCtrlPoints = true;
	this.init();
}

Heart.prototype.init = function (){
	this.element = document.createElementNS(svg.namespace,"g");
	svg.element.appendChild(this.element);
	this.path = document.createElementNS(svg.namespace,"path");
	this.element.appendChild(this.path);
	this.element.setAttribute("fill",this.fill);
	this.element.setAttribute("stroke",this.stroke);
	this.element.setAttribute("stroke-width",this.strokeWidth);

	for (var i = 0 ; i < 3 ; i++){
		this.ctrlPoints.push(document.createElementNS(svg.namespace,"circle"));
		this.element.appendChild(this.ctrlPoints[i]);

		this.ctrlPoints[i].setAttribute("fill",this.fill);
		this.ctrlPoints[i].setAttribute("stroke",'red');
		this.ctrlPoints[i].setAttribute("stroke-width",1);


		this.anchors.push(document.createElementNS(svg.namespace,"line"));
		this.element.appendChild(this.anchors[i]);

		this.anchors[i].setAttribute("stroke-width",1);
		this.anchors[i].setAttribute("stroke",this.stroke);
		this.anchors[i].setAttribute("stroke-dasharray","3,2");
	}

	this.draw();
};

Heart.prototype.draw = function(){

	path = [
	"M", this.x, ",", this.y-this.centralHeight/2,
	"A", this.width/4, ",", this.width/4, " 0 0,0 ", this.x - this.width/2, ",", this.y-this.centralHeight/2,
	"C", this.x - this.width/2,",",this.yCP1," ",this.x, ",", this.yCP2," ",this.x, ",", this.y+this.centralHeight/2,
	"C", this.x, ",", this.yCP2, " ", this.x + this.width/2,",", this.yCP1, " ",this.x + this.width/2, ",", this.y-this.centralHeight/2,
	"A", this.width/4, ",", this.width/4, " 0 0,0 ", this.x, ",", this.y-this.centralHeight/2
	];
	this.path.setAttribute("d", path.join(""));
	this.element.setAttribute("transform", "translate(0,"+svg.height/8+")");

	cpCoords = [];
	cpCoords[0] = [this.x - this.width/2, this.yCP1];
	cpCoords[1] = [this.x + this.width/2, this.yCP1];
	cpCoords[2] = [this.x, this.yCP2];

	anchorCoords = [];
	anchorCoords[0] = [this.x - this.width/2, this.y-this.centralHeight/2];
	anchorCoords[1] = [this.x + this.width/2, this.y-this.centralHeight/2];
	anchorCoords[2] = [this.x, this.y + this.centralHeight/2];

	for (var i = 0 ; i < 3 ; i++){
		this.ctrlPoints[i].setAttribute("cx",cpCoords[i][0]);
		this.ctrlPoints[i].setAttribute("cy",cpCoords[i][1]);

		this.anchors[i].setAttribute("x1",cpCoords[i][0]);
		this.anchors[i].setAttribute("x2",anchorCoords[i][0]);
		this.anchors[i].setAttribute("y1",cpCoords[i][1]);
		this.anchors[i].setAttribute("y2",anchorCoords[i][1]);

		if (this.showCtrlPoints){
			this.ctrlPoints[i].setAttribute("r",2);
			this.anchors[i].setAttribute("stroke-width",1);
		} else {
			this.ctrlPoints[i].setAttribute("r",0);
			this.anchors[i].setAttribute("stroke-width",0);
		}
	}
};

var heart = new Heart();

gui.add(heart, 'width',1, svg.width);
gui.add(heart, 'centralHeight',1, 300);
gui.add(heart, 'yCP1',0, 300);
gui.add(heart, 'yCP2',0, 300);
gui.add(heart, 'showCtrlPoints',0, svg.height);

for (var i in gui.__controllers) {
	gui.__controllers[i].onChange(function(){
		heart.draw();
	});
};