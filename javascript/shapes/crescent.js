var Crescent = function() {
	this.x = svg.width/4;
	this.y = svg.height/2;
	this.height = svg.height/2;
	this.fill = "none";
	this.stroke = "#333";
	this.strokeWidth = 2;
	this.radius1 = svg.width/3;
	this.radius2 = svg.width/3.5;
	this.largeArc2 = true;
	this.element = null;
	this.init();
}

Crescent.prototype.init = function(){
	this.element = document.createElementNS(svg.namespace,"path");
	svg.element.appendChild(this.element);
	this.element.setAttribute("fill", this.fill);
	this.element.setAttribute("stroke", this.stroke);
	this.element.setAttribute("stroke-width", this.strokeWidth);
	this.draw();
};

Crescent.prototype.draw = function() {

	if (this.largeArc2 == false){
		largeArcFlag = "0";
	} else {
		largeArcFlag = "1";
	}
	path = [
	"M", this.x, ",", this.y-this.height/2,
	"A", this.radius1, ",", this.radius1, ",", 0, " ", "1,1 ", this.x, ",", this.y+this.height/2,
	"A", this.radius2, ",", this.radius2, ",", 0, " ", largeArcFlag,",0 ", this.x, ",", this.y-this.height/2

	]
	this.element.setAttribute("d", path.join(""));

};

var crescent = new Crescent();

gui.add(crescent, 'height',0, svg.height);
gui.add(crescent, 'radius1',0, svg.width/2);
gui.add(crescent, 'radius2',0, svg.width/2);
gui.add(crescent, 'largeArc2');


for (var i in gui.__controllers) {
	gui.__controllers[i].onChange(function(){
		crescent.draw();
	});
};