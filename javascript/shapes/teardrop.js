var Teardrop = function() {
	this.x = svg.width * 0.5;
	this.y = svg.height * 0.1;
	this.width = svg.width * 0.4;
	this.triangleHeight = svg.height * 0.5;
	this.yCP1 = svg.height * 0.2;
	this.yCP2 = svg.height * 0.45;
	this.element = null;
	this.ctrlPoints = [];
	this.anchors = [];
	this.fill = "none";
	this.stroke = "#333";
	this.strokeWidth = 2;
	this.showCtrlPoints = true;
	this.init();
}

Teardrop.prototype.init = function(){
	this.element = document.createElementNS(svg.namespace,"path");
	svg.element.appendChild(this.element);
	this.element.setAttribute("fill",this.fill);
	this.element.setAttribute("stroke",this.stroke);
	this.element.setAttribute("stroke-width",this.strokeWidth);

	for (var i = 0 ; i < 3 ; i++){
		this.ctrlPoints.push(document.createElementNS(svg.namespace,"circle"));
		svg.element.appendChild(this.ctrlPoints[i]);

		this.ctrlPoints[i].setAttribute("fill",this.fill);
		this.ctrlPoints[i].setAttribute("stroke",'red');
		this.ctrlPoints[i].setAttribute("stroke-width",1);


		this.anchors.push(document.createElementNS(svg.namespace,"line"));
		svg.element.appendChild(this.anchors[i]);

		this.anchors[i].setAttribute("stroke-width",1);
		this.anchors[i].setAttribute("stroke",this.stroke);
		this.anchors[i].setAttribute("stroke-dasharray","3,2");
	}

	this.draw();
}

Teardrop.prototype.draw = function(){
	this.radius = this.width/2;
	path = [
		"M", this.x, ",", this.y,
		"C", this.x, ",", this.yCP1, " ", this.x+ this.width/2, ",", this.yCP2, " ", this.x+ this.width/2, ",", this.y + this.triangleHeight,
		"A", this.radius,",",this.radius, ",",  "0 0,1,", this.x- this.width/2, ",", this.y + this.triangleHeight,
		"C", this.x - this.width/2, ",", this.yCP2, " ", this.x, ",", this.yCP1, " ", this.x, ",", this.y
	];
	this.element.setAttribute("d", path.join(""));

	cpCoords = [];
	cpCoords[0] = [this.x, this.yCP1];
	cpCoords[1] = [this.x - this.width/2, this.yCP2];
	cpCoords[2] = [this.x + this.width/2, this.yCP2];

	anchorCoords = [];
	anchorCoords[0] = [this.x, this.y];
	anchorCoords[1] = [this.x - this.width/2, this.y + this.triangleHeight];
	anchorCoords[2] = [this.x + this.width/2, this.y + this.triangleHeight];

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
}

var teardrop = new Teardrop();

gui.add(teardrop, 'triangleHeight',0, svg.height*0.75);
gui.add(teardrop, 'width',0, 200);
gui.add(teardrop, 'yCP1',0, svg.height);
gui.add(teardrop, 'yCP2',0, svg.height);
gui.add(teardrop, 'showCtrlPoints',0, svg.height);

for (var i in gui.__controllers) {
	gui.__controllers[i].onChange(function(){
		teardrop.draw();
	});
}