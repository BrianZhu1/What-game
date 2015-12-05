#pragma strict

function Start () {

}

function Update () {

}

function onTriggerEnter2D ( other: Collider2D) {
	print("Colliding");
	if(other.gameObject.tag == "Player")
		SendMessageUpwards("sighted");
}