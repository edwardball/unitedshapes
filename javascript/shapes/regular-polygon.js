var Polygon = function() {
	this.cx = svg.width/2;
	this.cy = svg.height/2;
	this.r = svg.width/3;
	this.fill = "none";
	this.stroke = "#333";
	this.strokeWidth = 2;
	this.scale = 1;
	this.n = 7;
	this.rotation = 0;
	this.points = "";
	this.element = null;
	this.init();
};

Polygon.prototype.draw = function() {
	this.points = "";
	this.delta = this.rotation*Math.PI/180;
	for (var i = 0; i < this.n; i++) {
		x = Math.round(this.cx + this.r*Math.sin(this.delta+(2*Math.PI*i/this.n)));
		y = Math.round(this.cy - this.r*Math.cos(this.delta+(2*Math.PI*i/this.n)));
		this.points += x + "," + y + " ";
	};
	this.element.setAttribute("points", this.points);
};

Polygon.prototype.init = function(){
	this.element = document.createElementNS(svg.namespace,"polygon");
	svg.element.appendChild(this.element);
	this.element.setAttribute("fill", this.fill);
	this.element.setAttribute("stroke", this.stroke);
	this.element.setAttribute("stroke-width", this.strokeWidth);
	this.draw();
};

var polygon = new Polygon();

gui.add(polygon,'cx',0,svg.width);
gui.add(polygon,'cy',0,svg.height);
gui.add(polygon,'r',0,svg.height/2);
gui.add(polygon,'n',3,20).step(1);
gui.add(polygon,'rotation',0,359);


for (var i in gui.__controllers) {
	gui.__controllers[i].onChange(function(){
		polygon.draw();
	});
}