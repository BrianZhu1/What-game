var dir : int;
var steps : int;

function Start () {
	steps = 0;
}

function Update () {
	transform.position.x += (.15 * dir);
	steps++;
	if(steps > 30){
		Destroy(gameObject);
	}
}

function init (direction: int) {
     dir = direction;
}

function OnCollisionEnter2D(coll: Collision2D){
	print("Bullet hit " + coll.gameObject.tag);
	if(coll.gameObject.tag == "Player" || coll.gameObject.tag == "Enemy"){
		Destroy(gameObject);
		coll.gameObject.SendMessage("kill");
	}
	if(coll.gameObject.tag == "Boss") {
		Destroy(gameObject);
		coll.gameObject.SendMessage("hit");
	}
}
