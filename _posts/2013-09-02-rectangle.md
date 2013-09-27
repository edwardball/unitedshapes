---
layout: post
title: Rectangle
name: rectangle
---

The rectangle is another shape that is so fundamental it has its own element, `<rect/>`.

{% highlight html %}
<svg>
	<rect x="50" y="100" width="300" height="200" rx="20" ry="20" fill="none" stroke="#333" stroke-width="2" />
</svg>
{% endhighlight %}

Here, `x` and `y` are the coordinates of the top-left corner of the rectangle, and `width` and `height`, are, as you
may have guessed, the width and height of the shape.

The optional attributes `rx` and `ry` determine the amount of rounding applied to the corners. In other words,
the sharp corner is replaced by one quarter of an ellipse that has radii of `rx` and `ry`. If one of the radius
attributes is omitted, the browser will automtically assign the missing radius a value equal to the non-missing
radius. Setting the radii to 0 or omitting them completely will give you sharp 90&deg; corners.

If `rx` is greater than half the width of the rectangle, it is automatically set to `width/2`. The same principle
applies for `ry` and the rectangle's height. 