var Cross = function() {
	this.x = svg.width/2;
	this.y = svg.height/2;
	this.width = 3*svg.height/4;
	this.height = 3*svg.height/4;
	this.thickness = svg.height/4;
	this.fill = "none";
	this.stroke = "#333";
	this.element = null;
	this.init();
};

Cross.prototype.init = function(){
	this.element = document.createElementNS(svg.namespace,"path");
	svg.element.appendChild(this.element);
	this.element.setAttribute("fill", this.fill);
	this.element.setAttribute("stroke", this.stroke);
	this.element.setAttribute("stroke-width", 2);
	this.draw();
};

Cross.prototype.draw = function(){
	newpath = this.updatePath();
	this.element.setAttribute("d", newpath);
};

Cross.prototype.updatePath = function(){
	path = ["M",this.x-this.thickness/2,",",this.y-this.height/2,"H",this.x+this.thickness/2]; //top left to top right
	path.push("V", this.y-this.thickness/2); //middle top right
	path.push("H", this.x+this.width/2); //right top
	path.push("V", this.y+this.thickness/2); //right bottom,
	path.push("H", this.x+this.thickness/2); //middle bottom right
	path.push("V", this.y+this.height/2); //bottom right
	path.push("H", this.x-this.thickness/2); //bottom left
	path.push("V", this.y+this.thickness/2);//middle bottom left
	path.push("H", this.x-this.width/2);//left bottom
	path.push("V", this.y-this.thickness/2);//left top
	path.push("H", this.x-this.thickness/2);//middle top left
	path.push("Z");
	return path.join("");
};

var cross = new Cross();

gui.add(cross, 'width',0, svg.width);
gui.add(cross, 'height',0, svg.height);
gui.add(cross, 'thickness',0, svg.height/2);

for (var i in gui.__controllers) {
	gui.__controllers[i].onChange(function(){
		cross.draw();
	});
}