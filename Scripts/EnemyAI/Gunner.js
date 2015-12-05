#pragma strict

var timer : int;
var bulletPrefab : Transform;
var target : Transform;
var direction : float;
var x = 0;

function Start () {
	timer = 1000; 
	direction = -1.0;
}

function Update () {
	if(target.transform.position.x < transform.position.x) {
		direction = -1.0;
	} else {
		direction = 1.0;
	}

	x++;
	if(x > 70) {
		//print(x);
		x = 0;
		shoot();
		
	}
	
}

function shoot() {
	//print("Shooting!");
	Instantiate(bulletPrefab, Vector3(transform.position.x + direction * 2, transform.position.y - 1, 0), Quaternion.identity).GetComponent(BulletScript).init(direction);
//	var direction;
//	if(GameObject
//	bullet.GetComponent(BulletScript).init();
}