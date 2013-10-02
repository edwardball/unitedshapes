var Salinon = function() {
	this.x = svg.width/2;
	this.y = svg.height/2;
	this.dOuter = 3*svg.width/4;
	this.dInner =svg.width/2;
	this.fill = "none";
	this.stroke = "#333";
	this.strokeWidth = 2;
	this.scale = 1;
	this.element;
	this.init();
};

Salinon.prototype.init = function(){
	this.element = document.createElementNS(svg.namespace,"path");
	svg.element.appendChild(this.element);
	this.element.setAttribute("fill",this.fill);
	this.element.setAttribute("stroke",this.stroke);
	this.element.setAttribute("stroke-width",this.strokeWidth);
	this.draw();
};

Salinon.prototype.draw = function(){
	newpath = this.updatePath();
	this.element.setAttribute("d", newpath);
};

Salinon.prototype.updatePath = function(){
	totalRadius = this.dOuter/2;
	innerRadius = this.dInner/2;
	innerRadius2 = (this.dOuter - this.dInner)/4;

	path = [
		"M", this.x-totalRadius, ",", this.y,
		"A",totalRadius,",",totalRadius,
		" 0 0,1 ",
		this.x+totalRadius, ",", this.y,
		"A",innerRadius2,",",innerRadius2,
		" 0 0,0 ",
		this.x+totalRadius - innerRadius2*2, ",", this.y,
		"A",innerRadius,",",innerRadius,
		" 0 0,1 ",
		this.x+totalRadius - innerRadius2*2 - this.dInner, ",", this.y,
		"A",innerRadius2,",",innerRadius2,
		" 0 0,0 ",
		this.x-totalRadius, ",", this.y
	];

	return path.join("");
};

var salinon = new Salinon();

gui.add(salinon,'x',0,svg.width);
gui.add(salinon,'y',0,svg.height);
gui.add(salinon,'dOuter',0,svg.width);
gui.add(salinon,'dInner',0,svg.width);


for (var i in gui.__controllers) {
	gui.__controllers[i].onChange(function(){
		salinon.draw();
	});
}