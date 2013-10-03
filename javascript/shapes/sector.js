var Pacman = function() {
	this.x = svg.width/2;
	this.y = svg.height/2;
	this.radius = svg.width*0.4;
	this.fill = "none";
	this.stroke = "#333";
	this.strokeWidth = 2;
	this.angle = 60;
	this.wacawaca = false;
	this.element = null;
	this.init();
};

Pacman.prototype.init = function(){
	this.element = document.createElementNS(svg.namespace,"path");
	svg.element.appendChild(this.element);
	this.element.setAttribute("fill",this.fill);
	this.element.setAttribute("stroke",this.stroke);
	this.element.setAttribute("stroke-width",this.strokeWidth);
	this.draw();
};

Pacman.prototype.draw = function(){
	rads = Math.PI * this.angle /180;

	if (this.angle > 180){
		large_arc_flag = 0;
	} else {
		large_arc_flag = 1;
	}

	path = [
		"M", this.x, ",", this.y,
		"L", this.x + (this.radius*Math.cos(rads/2)), ",", this.y - (this.radius*Math.sin(rads/2)),
		"A",this.radius,",",this.radius,
		" 0 ",large_arc_flag,",0",
		this.x + (this.radius*Math.cos(rads/2)), ",", this.y + (this.radius*Math.sin(rads/2)),
		"Z"
	];

	this.element.setAttribute("d", path.join(""));
};

var pacman = new Pacman();

gui.add(pacman, 'x',0, svg.width);
gui.add(pacman, 'y',0, svg.height);
gui.add(pacman, 'radius',0, svg.width/2);
gui.add(pacman, 'angle',0.001, 360);

for (var i in gui.__controllers) {
	gui.__controllers[i].onChange(function(){
		pacman.draw();
	});
}