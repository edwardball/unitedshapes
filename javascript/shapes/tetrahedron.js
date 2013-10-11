var Tetrahedron = function() {
	this.cx = svg.width/2;
	this.cy = svg.height/2;
	this.stroke = "#333";
	this.scale = 1;
	this.element;

	this.width = 300;
	this.height = this.width*Math.sqrt(3)/2;
	this.depth = this.height;

	this.xangle = 0;
	this.yangle = 0;
	this.zangle =0;

	this.xangleAnimate = false;
	this.points = [];

	this.elements = [];

	this.edges = [
			[0,1],[0,2],[0,3],
			[2,1],[2,3],[3,1]
			]
};


Tetrahedron.prototype.init = function(){

	for (var i = this.edges.length - 1; i >= 0; i--) {
		element = document.createElementNS(svg.namespace,"line");
		svg.element.appendChild(element);
		this.elements.push(element);
		element.setAttribute("stroke", "#333");
		element.setAttribute("stroke-width", 2);
	};

	this.update();
};

Tetrahedron.prototype.draw = function(element, start, end){
	element.setAttribute("x1", start[0]+this.cx);
	element.setAttribute("y1", start[1]+this.cy);
	element.setAttribute("x2", end[0]+this.cx);
	element.setAttribute("y2", end[1]+this.cy);
}

Tetrahedron.prototype.update = function(){
	this.height = this.width*Math.sqrt(3)/2;
	this.depth = this.height;
	this.points = [
					[0,-2*this.height/3,-this.depth/3],
					[this.width/2,this.height/3,-this.depth/3],
					[-this.width/2,this.height/3,-this.depth/3],
					[0, 0, 2*this.depth/3]
				];

	this.rotatePoints(this.yangle,this.xangle, this.zangle);

	for (var i = this.edges.length - 1; i >= 0; i--) {
		start = this.edges[i][0];
		end = this.edges[i][1];
		this.draw(this.elements[i], this.points[start].rotated, this.points[end].rotated)
	};
}

Tetrahedron.prototype.rotatePoints = function(yangle,xangle,zangle){
	for (var i = this.points.length - 1; i >= 0; i--) {
		this.points[i].rotated = this.rotateX(this.points[i], this.xangle)
		this.points[i].rotated = this.rotateY(this.points[i].rotated, this.yangle)
		this.points[i].rotated = this.rotateZ(this.points[i].rotated, this.zangle)
	};
}

Tetrahedron.prototype.rotateX = function(point, angle){
	angle = angle * Math.PI / 180;
	newPoint = {};
	newPoint[0] = point[0];
	newPoint[1] = point[1] * Math.cos(angle) - point[2] * Math.sin(angle);
	newPoint[2] = point[1] * Math.sin(angle) + point[2] * Math.cos(angle);
	return newPoint;
}
Tetrahedron.prototype.rotateY = function(point, angle){
	angle = angle * Math.PI / 180;
	newPoint = {};
	newPoint[0] = point[0] * Math.cos(angle) + point[2] * Math.sin(angle);
	newPoint[1] = point[1];
	newPoint[2] = point[0] * -Math.sin(angle) + point[2] * Math.cos(angle);
	return newPoint;
}
Tetrahedron.prototype.rotateZ = function(point, angle){
	angle = angle * Math.PI / 180;
	newPoint = {};
	newPoint[0] = point[0] * Math.cos(angle) - point[1] * Math.sin(angle);
	newPoint[1] = point[0] * Math.sin(angle) + point[1] * Math.cos(angle);
	newPoint[2] = point[2];
	return newPoint;
}


var tetrahedron = new Tetrahedron();
tetrahedron.init();

gui.add(tetrahedron,'xangle',0,360).listen();
gui.add(tetrahedron,'yangle',0,360).listen();
gui.add(tetrahedron,'zangle',0,360).listen();
gui.add(tetrahedron,'width',0,svg.width);
xangleAnimateController = gui.add(tetrahedron,'xangleAnimate');


for (var i in gui.__controllers) {
	gui.__controllers[i].onChange(function(){
		tetrahedron.update();
	});
}

/*-------ANIMATION --------*/

var xangleanimation;

function xangleAnimate(){
	xangleanimation = requestAnimationFrame(xangleAnimate);
	tetrahedron.xangle += 1;
	// tetrahedron.yangle += 1;
	// tetrahedron.zangle += 1;
	if (tetrahedron.xangle > 360) tetrahedron.xangle = 0;
	// if (tetrahedron.yangle > 360) tetrahedron.yangle = 0;
	// if (tetrahedron.zangle > 360) tetrahedron.zangle = 0;
	tetrahedron.rotatePoints(tetrahedron.yangle,tetrahedron.xangle, tetrahedron.zangle);
	tetrahedron.update();
}

xangleAnimateController.onChange(function(){
	if (tetrahedron.xangleAnimate == true){
		xangleAnimate();
	} else {
		console.log("cancel");
		window.cancelAnimationFrame(xangleanimation);
	}
});

(function() {
    var lastTime = 0;
    var vendors = ['webkit', 'moz'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame =
          window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); },
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());