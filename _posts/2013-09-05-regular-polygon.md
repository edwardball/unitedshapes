---
layout: post
title: Regular Polygon
name: regular-polygon
---

Regular polygons are shapes that have `n` edges and vertices. The edges are all equal in length,
and their angles are all equal in size.
Additionally, you should be able to draw a circle that touches each and every vertex,
and in the example above, that theoretical circle has a radius of `r` and its center
positioned at `(cx,cy)`.

SVG features an element called `polygon` that allows us to speficy a sequential list of
x- and y-coordinates that make up the vertices of the polygon.

{% highlight html %}
<!-- Example static SVG to create a regular heptagon (7 vertices) -->
<svg>
	<polygon points="200,67 304,117 330,230 258,320 142,320 70,230 96,117" fill="none" stroke="#333" stroke-width="2" />
</svg>
{% endhighlight %}

Some trignometry and a few lines of javascript can be used to precisely calculate these coordinates.
Remember that when using `Math.cos()` or `Math.sin()`, the argument needs to be in radians as
opposed to degrees. The `delta` term simply applies an offset to all the angles
so the polygon can be rotated without having to use a transform.

{% highlight javascript %}
points = "";
delta = rotation*Math.PI/180;
for (var i = 0; i < n; i++) {
	x = cx + r*Math.sin(delta+(2*Math.PI*i/n));
	y = cy - r*Math.cos(delta+(2*Math.PI*i/n));
	points += x + "," + y + " ";
};
{% endhighlight %}

The points attribute can then be updated by using the method `setAttribute("points", points)`
on the polygon element.