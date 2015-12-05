#pragma strict

 var steps : float;
 var X : float;
 var toRight : boolean;
 var maxSteps = 50;

function Start () {
	steps = 0;
	toRight = true;
	X = transform.localScale.x;
}

function Update () {
	if( steps < maxSteps) {
		transform.position.x += toRight ?  .1: -.1;
		steps++;
	} else if(steps == maxSteps) {
		toRight = !toRight;
		steps = 0;
	}
	
	flip();
}

function OnCollisionEnter2D(coll : Collision2D) {
	if( coll.gameObject.tag == "Player"){
		coll.gameObject.SendMessage("touchedEnemy", this.gameObject);
	}

}

function kill() {
	Destroy(transform.parent.gameObject);
}

function flip() {
	if(toRight) {
		transform.localScale.x = X;
	} else {
		transform.localScale.x = -X;
	}
}

function sighted() {
	print("sighted");
}