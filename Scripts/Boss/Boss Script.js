#pragma strict

var moves : int;
var timer : int;
var health = 30;

function Start () {
	moves = 0;
	timer = 0;
}

function Update () {
	timer++;
	if(timer > 300) {
		//print(x);
		timer = 0;
		cycle();
		
	}
}

function cycle () {
	if(moves == 0) {
		gameObject.GetComponent(AI).enabled = true;
		gameObject.GetComponent(Gunner).enabled = false;
	} else if (moves == 1) {
		gameObject.GetComponent(Gunner).enabled = true;
		gameObject.GetComponent(AI).enabled = false;
	}
	moves++;
	if(moves > 3)
		moves = 0;
	
}

function hit() {
	health -= 10;
	if(health <= 0) {
		print(health);
		Destroy(gameObject);
		Application.LoadLevel("Title");
	}
	
}