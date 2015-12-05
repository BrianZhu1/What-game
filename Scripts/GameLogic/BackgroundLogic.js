#pragma strict

var level : String;

function Update () {
	
}

function OnTriggerEnter2D(other: Collider2D) {
	if(other.gameObject.tag == "Player") {
		Application.LoadLevel(level);
	}
}