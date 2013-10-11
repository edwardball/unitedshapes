---
layout: post
title: Tetrahedron
name: tetrahedron
date: 2013-09-17 14:46:19
---

The tetrahedron is a four sided shape where each side is a triangle. In our example, all the triangles are equilateral and
have a width of `width`. The shape has 4 vertices and 6 edges. With SVG we can make 6 lines that use the coordinates
of the 4 vertices to create a 2d representation of this 3d shape.

{% highlight html %}
<svg height="400px" width="400px">
	<g stroke="#333" stroke-width="2">
		<line x1="200" y1="26.8" x2="350" y2="286.6" />
		<line x1="200" y1="26.8" x2="50" y2="286.6" />
		<line x1="200" y1="26.8" x2="200" y2="200" />
		<line x1="50" y1="286.6" x2="350" y2="286.6" />
		<line x1="50" y1="286.6" x2="200" y2="200" />
		<line x1="200" y1="200" x2="350" y2="286.6" />
	</g>
</svg>
{% endhighlight %}

Each  `<line>` element has 4 attributes. `x1` and `y1` define the coordinates of the start of the line, and `x2` and `y2` define
the end of the line. We have wrapped all 6 lines in a `<g>` (group) tag so we only have to apply styles to one element, and
that will cascade down, instead of having to apply styles to each line individually.

The most complicated part of creating this shape is correctly positioning the vertices. We begin by imagining one of the tetrahedron's vertices
is pointing exactly at us and we are looking exactly down it. This means the back face of the tetrahedron is exactly perpendicular to us, giving us a
perfect, flat view of the equilateral triangle that it is made of. For such atriangle, the height is found
by multiplying the width by the square root of 3 and dividing by 2.

`height = width*Math.sqrt(3)/2`

With this in mind, the `(x,y)` coordinates of the 3 outer vertices on this back face can be calculated.
Next, the `(x,y)` coordinates of the vertex which is pointing towards us needs to be calculated. The `x` coordinate
is easy because we know it must be in the exact center due to symmetry. The `y` coordinate is exactly one third of the
height of the triangle.

That gives you enough information to draw the shape in it's initial configuration. However, for a more mind-blowing experience,
we're going to assign each vertex a `z` coordinate, which will allow us to transform the shape using rotations
through an artbitary angle.

Since the triangle on the far face is perpendicular to us, it lies in a plane parallel to the x-y plane, so put simply: all the coordinates in
that triangle have the same `z` value. If want the origin of the coordinate system to be located at the center of mass of
the tetrahedron, then these `z` coordinates will have a value of `-depth/3`, where `depth = height`. And the `z-coordinate` of
the point down which we are looking has `z = depth * 2/3`.

Now that we've calculated the correct `x,y,z` coordinates for each of the vertices, we can use the following tranformation equations to rotate the shape about any
angle we want.

{% highlight javascript %}

//Rotation around the x-axis;
x = x;
y = y * Math.cos(angle) - z * Math.sin(angle);
z = y * Math.sin(angle) + z * Math.cos(angle);

//Rotation around the y-axis;
x = x * Math.cos(angle) + z * Math.sin(angle);
y = y;
z = x * -Math.sin(angle) + z * Math.cos(angle);

//Rotation around the z-axis;
x = x * Math.cos(angle) - y * Math.sin(angle);
y = x * Math.sin(angle) + y * Math.cos(angle);
z = z;
{% endhighlight %}

To look at the exact code that assigns the coordinates to the lines and updates the code, click on the 'Edit on Codepen' button at the top of the page.