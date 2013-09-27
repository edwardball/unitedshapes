var Ellipse = function() {
	this.cx = svg.width/2;
	this.cy = svg.height/2;
	this.rx = svg.width/4;
	this.ry = svg.height/3;
	this.fill = "none";
	this.stroke = "#333";
	this.strokeWidth = 2;
	this.scale = 1;
	this.element = null;
	this.init();
};

Ellipse.prototype.draw = function() {
	this.element.setAttribute("cx", this.cx);
	this.element.setAttribute("cy", this.cy);
	this.element.setAttribute("rx", this.rx);
	this.element.setAttribute("ry", this.ry);
};

Ellipse.prototype.init = function(){
	this.element = document.createElementNS(svg.namespace,"ellipse");
	svg.element.appendChild(this.element);
	this.element.setAttribute("fill", this.fill);
	this.element.setAttribute("stroke", this.stroke);
	this.element.setAttribute("stroke-width", this.strokeWidth);
	this.draw();
};

var ellipse = new Ellipse();

gui.add(ellipse,'cx',0,svg.width);
gui.add(ellipse,'cy',0,svg.height);
gui.add(ellipse,'rx',0,svg.height/2);
gui.add(ellipse,'ry',0,svg.height/2);


for (var i in gui.__controllers) {
	gui.__controllers[i].onChange(function(){
		ellipse.draw();
	});
}