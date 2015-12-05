#pragma strict

var timer = 0;
var waitCycles = 100;
var targetPrefab : Transform;
var v : Vector3;
var q : Quaternion;

function Start () {

}

function Update () {
	timer++;
	if(timer > waitCycles) {
		print(v.x + " - " + v.y);
		var e = Instantiate(targetPrefab, Vector3 (transform.position.x, .5, transform.position.z), Quaternion.identity);
		var player = e.transform.Find("Player2D");
		player.transform.position = v;
		player.transform.rotation = q;
//		player.rigidbody2D.gravityScale = 0.0;
		Destroy(gameObject);
	}
}

function init(vb: Vector3, qb: Quaternion) {
	v = vb;
	q = qb;
}