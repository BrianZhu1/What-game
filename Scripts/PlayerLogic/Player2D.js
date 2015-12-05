#pragma strict

var X : float;
var speed = 5.0;
var finalSpeed = speed;
var jumpSpeed = 10.0;
var grounded = false;
var smashing = false;
var target : GameObject;
var grabbed = false;
var direction : float;
var stuck : boolean[] = new boolean[2];
var abilities : boolean[] = new boolean[7]; // Walk, Jump, Push, Grab, Smash, Whip, Barf
var evolve : Transform;
var parent : GameObject;
var bulletPrefab : Transform;
var level : String;
var bulletTimer = 0;

function Start () {
	X = transform.localScale.x;
	direction = 1.0;
	parent = transform.parent.gameObject;
	var levelName = Application.loadedLevelName;
	var charLvl = levelName.Substring(levelName.Length - 1);
	var lvl = (int.Parse(charLvl));
	if(lvl > 7) lvl = 7;
	for(var i = 0; i < lvl; i++) {
		abilities[i] = true;
	}
	if(charLvl == "6") {
		abilities[6] = false;
	}
}

function Update () {
	
	// Moving
	if(target == null) grabbed = false;
	if(Mathf.Abs(Input.GetAxis("Horizontal")) >  0.05) {
		if(!grounded) {
			speed *= 2;
		}
		if((direction == 1.0 && !stuck[1]) || (direction == -1.0 && !stuck[0])) {
			transform.position.x += Input.GetAxis("Horizontal") / speed;
			
			// Pushing
			if(target != null) {
				if(grabbed) {
					target.transform.position.x = transform.position.x + (.75 * direction);
				} else {
					target.transform.position.x += Input.GetAxis("Horizontal") / speed;
				}
			}
		}
	}
	
	// Grabbing
	if(abilities[3]) {
		if(target != null && Input.GetKeyDown("g")) {
			grabbed = !grabbed;
			
			// Letting Go
			if(!grabbed) {
				target.rigidbody2D.gravityScale = 1.0;
				if(!grounded) {
					target.rigidbody2D.AddForce(new Vector2(Input.GetAxis("Horizontal") * 3, 0), ForceMode2D.Impulse);
				}
				target = null;
			}
		}
	}
	
	// If target is too far away, make sure it's deselected
	if(target != null && (Mathf.Abs(target.transform.position.x - transform.position.x) > 1.2 || Mathf.Abs(target.transform.position.y - transform.position.y) > 1.2)) {
		target.rigidbody2D.gravityScale = 1.0;
		target = null;
		grabbed = false;
			
	}
	
	if(target != null && grabbed) {
		target.rigidbody2D.gravityScale = 0.0;
		target.transform.position.y = transform.position.y + .45;
	}
	
	if(abilities[1]) {
		// Jumping		
		if((Input.GetKeyDown("up") || Input.GetKeyDown("w")) && grounded) {
			rigidbody2D.velocity.y = 0.0;
			grounded = false;
			rigidbody2D.AddForce(new Vector2(0, jumpSpeed), ForceMode2D.Impulse);
		}
	}
	
	if(abilities[4]) {
		// "Smashing"
		if((Input.GetKeyDown("down") || Input.GetKeyDown("s")) && !smashing && !grounded) {
			smashing = true;
			rigidbody2D.velocity.y = 0.0;
			rigidbody2D.AddForce(new Vector2(0, -jumpSpeed), ForceMode2D.Impulse);
		}
	}
	
	bulletTimer++;
	if(abilities[6] && Input.GetKeyDown("b")) {
		if(bulletTimer > 50) {
			bulletTimer = 0;
			shoot();
		}
	}
	
	if(Input.GetKeyDown("r")) {
		Application.LoadLevel(Application.loadedLevel);
	}
	
	speed = finalSpeed;	
	textureFlip();
}

function OnCollisionEnter2D(coll: Collision2D) {
	if(coll.gameObject.tag.Contains("Pushable") && coll.contacts[0].normal.x != 0) {
		if(Mathf.Abs(transform.position.y - coll.gameObject.transform.position.y) < 1) {
			target = coll.gameObject;
		}
	} else if(!coll.gameObject.tag.Contains("Enemy") && !coll.gameObject.tag.Contains("Food")) {
		if(coll.contacts[0].normal.x > 0) {
			stuck[0] = true;
		} else if(coll.contacts[0].normal.x < 0) {
			stuck[1] = true;
		}
	}
}

function OnCollisionExit2D(coll: Collision2D) {
//	print(coll.gameObject.tag);
	if(coll.gameObject.tag.Contains("Pushable") && target != null && grabbed != true) {
//		grabbed = false;
		target.rigidbody2D.gravityScale = 1.0;
		target = null;
	} else {
		if(stuck[0] || stuck[1]) {
			if(coll.gameObject.transform.position.x > transform.position.x) {
				stuck[1] = false;
			}
			if(coll.gameObject.transform.position.x < transform.position.x) {
				stuck[0] = false;
			}
		}
	}
}

function setGrounded(coll: Collision2D) {
	grounded = true;
	smashing = false;
}

function springJump() {
	if(!grounded) {
		rigidbody2D.AddForce(new Vector2(0, jumpSpeed*1.5), ForceMode2D.Impulse);
		grounded = false;
	}
}

function textureFlip() {
	if(Input.GetAxis("Horizontal") >= 0.01){
		// Going Right
		transform.localScale.x = -X;
		if(target != null && direction < 1.0 && !grabbed) {
			grabbed = false;
			target.rigidbody2D.gravityScale = 1.0;
			target = null;
		}
		direction = 1.0;
	} else if(Input.GetAxis("Horizontal") <= -0.01) {
		// Going Left
		transform.localScale.x = X;
		if(target != null && direction > -1.0 && !grabbed) {
			grabbed = false;
			target.rigidbody2D.gravityScale = 1.0;
			target = null;
		}
		direction = -1.0;
	}
}

function touchedEnemy(enemy: GameObject) {
	if(smashing) {
		Destroy(enemy);
		if(evolve != null) {
			var vtmp = transform.position;
			var qtmp = transform.rotation;
			var e = Instantiate(evolve, Vector3 (transform.position.x, transform.position.y, transform.position.z), Quaternion.identity);
			e.GetComponent(Evolve).init(vtmp, qtmp);
			Destroy(transform.parent.gameObject);
		}
	} else {
		Application.LoadLevel(Application.loadedLevel);
	}
	
}

function kill() {
	Application.LoadLevel(Application.loadedLevel);
}

function touchedFood() {
	print("Ate");
	abilities[6] = true;
}

function shoot() {
	Instantiate(bulletPrefab, Vector3(transform.position.x + direction, transform.position.y + .5, 0), Quaternion.identity).GetComponent(BulletScript).init(direction);
//	bullet.GetComponent(BulletScript).init(direction);
}
