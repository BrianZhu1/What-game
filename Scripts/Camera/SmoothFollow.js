var target : Transform;
var distance = 8.5;
var yOffset = 0.75;
var xOffset = 5.0;

function Start() {
	wantedPosition = target.TransformPoint(0, 20, -distance);
	transform.position = wantedPosition;
	transform.position.y = yOffset;
}

function Update () {
	transform.position.y = target.transform.position.y * yOffset;
	transform.position.x = target.position.x + xOffset;
	
}