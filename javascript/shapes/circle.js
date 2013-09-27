var Circle = function() {
	this.cx = svg.width/2;
	this.cy = svg.height/2;
	this.r = svg.width/3;
	this.fill = "none";
	this.stroke = "#333";
	this.strokeWidth = 2;
	this.scale = 1;
	this.element = null;
	this.init();
};

Circle.prototype.draw = function() {
	this.element.setAttribute("cx", this.cx);
	this.element.setAttribute("cy", this.cy);
	this.element.setAttribute("r", this.r);
};

Circle.prototype.init = function(){
	this.element = document.createElementNS(svg.namespace,"circle");
	svg.element.appendChild(this.element);
	this.element.setAttribute("fill", this.fill);
	this.element.setAttribute("stroke", this.stroke);
	this.element.setAttribute("stroke-width", this.strokeWidth);
	this.draw();
};

var circle = new Circle();

gui.add(circle,'cx',0,svg.width);
gui.add(circle,'cy',0,svg.height);
gui.add(circle,'r',0,svg.height/2);


for (var i in gui.__controllers) {
	gui.__controllers[i].onChange(function(){
		circle.draw();
	});
}