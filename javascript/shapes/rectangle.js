var Rectangle = function() {
	this.x = svg.width/8;
	this.y = svg.height/4;
	this.width = 6*svg.width/8;
	this.height = svg.height/2;
	this.rx = 20;
	this.ry = 20;
	this.scale = 1;
	this.fill = "none";
	this.stroke = "#333";
	this.strokeWidth = 2;
	this.element = null;
	this.init();
}

Rectangle.prototype.init = function(){
	this.element = document.createElementNS(svg.namespace,"rect");
	svg.element.appendChild(this.element);
	this.element.setAttribute("fill",this.fill);
	this.element.setAttribute("stroke",this.stroke);
	this.element.setAttribute("stroke-width",this.strokeWidth);
	this.draw();
};

Rectangle.prototype.draw = function(){
	this.element.setAttribute("x",this.x);
	this.element.setAttribute("y",this.y);
	this.element.setAttribute("width",this.width);
	this.element.setAttribute("height",this.height);
	this.element.setAttribute("rx",this.rx);
	this.element.setAttribute("ry",this.ry);
}

var rectangle = new Rectangle();

gui.add(rectangle,'x',0,svg.width);
gui.add(rectangle,'y',0,svg.height);
gui.add(rectangle,'width',0,svg.width);
gui.add(rectangle,'height',0,svg.height);
gui.add(rectangle,'rx',0,100);
gui.add(rectangle,'ry',0,100);

for (var i in gui.__controllers) {
	gui.__controllers[i].onChange(function(){
		rectangle.draw();
	});
}