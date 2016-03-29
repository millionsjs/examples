var Millions = require('millions/lib/millions');

// set up a scene with a single diagonal line, whose thickness and color vary at
// the endpoints
var scene = new Millions.Scene()
    .withBackgroundColor(Millions.Color.fromRGB(250, 250, 250))
    .withLineAdded({
        x: -100,
        y: -50,
        thickness: 2,
        color: Millions.Color.fromRGB(255, 0, 0)
    }, {
        x: 100,
        y: 50,
        thickness: 20,
        color: Millions.Color.fromRGB(0, 0, 255)
    });

// set up our renderer in the page's mountpoint (we use createRenderer() because
// that can try WebGL and fall back to Canvas2D if needed -- if we wanted to force
// one type of renderer we could just manually new it here instead)
var renderer = Millions.createRenderer(document.querySelector('#mountpoint'));

// use a camera that guarantees our scene will be in view, with a small amount of
// edge padding
var camera = new Millions.Camera()
    .withAspectRatio(renderer.aspectRatio())
    .withSceneInFrame(scene, 25);

// and render. If we resize the page, the context won't automatically re-shape but
// we'll handle that in other examples.
renderer.render(scene, camera);
