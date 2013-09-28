var SVG = function(){
	this.element = document.getElementsByTagName("svg")[0];
	this.namespace = "http://www.w3.org/2000/svg";
	this.width = this.element.clientWidth || this.element.parentNode.clientWidth;
	this.height = this.element.clientHeight ||  this.element.parentNode.clientHeight;
	this.padding = 20;
}

SVG.prototype.addGUI = function(){
	//Create a new user interface and append it to the my-gui-container div
	gui = new dat.GUI({autoPlace: false});
	document.getElementById('my-gui-container').appendChild(gui.domElement);
	return gui;
}

SVG.prototype.initCodepenButton = function(script){
	var codepenHTML = "<svg width='100%' height='100%'></svg>";
	var codepenCSS = "html,body{height:100%;}";
	var codepenJavascript = 'var SVG = function(){\n';
	codepenJavascript += '\tthis.element = document.getElementsByTagName("svg")[0];\n';
	codepenJavascript += '\tthis.namespace = "http://www.w3.org/2000/svg";\n';
	codepenJavascript += '\t//We set the width and height below.\n';
	codepenJavascript += '\t//Firefox returns zero for element\'s Width & Height so that\'s why we check the parent node.\n';
	codepenJavascript += '\tthis.width = this.element.clientWidth || this.element.parentNode.clientWidth;\n';
	codepenJavascript += '\tthis.height = this.element.clientHeight ||  this.element.parentNode.clientHeight\n';
	codepenJavascript += '}\n\n';
	codepenJavascript += 'var svg = new SVG();\n';
	codepenJavascript += 'var gui = new dat.GUI();\n\n';
	codepenJavascript += '/****Here\'s where the code to create the shape begins!****/\n';
	var codepenExternalJavascript = "//cdnjs.cloudflare.com/ajax/libs/dat-gui/0.5/dat.gui.min.js";

	var data = {
		html: codepenHTML,
		css: codepenCSS,
		js: codepenJavascript+script,
		js_external: codepenExternalJavascript
	};

	var JSONstring = JSON.stringify(data)
					// Need to replace quotes with HTML entities or else the JSON won't work properly
					.replace(/"/g, "&quot;")
					.replace(/'/g, "&apos;");

	var form = '<form id="codepen" action="http://codepen.io/pen/define" method="POST" target="_blank">'
				+ '<input type="hidden" name="data" value=\''
				+ JSONstring
				+ '\'>'
				+ '<input type="submit" value="Edit on CodePen">'
				+ '</form>';

	$("#my-gui-container").after(form);
}