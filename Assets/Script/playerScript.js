// Attributes
private var r2d;      					    // Required: 2D Rigidbody Component
private var HP : int;     				    // Integer: HP
private var grounded : boolean = true;   	// Boolean: Grounded (at ground level and not jumping or flying)
private var deltaTime : float = 0;			// Float: Time Tracker

public var jumpPower : float;    			// Integer: Jump force multiplyer

/// Start function
/// Used for initialization
function Start () {
	//Debug.Log("playerScript Initialized");
    // Get Component of Rigidbody
    r2d = GetComponent.<Rigidbody2D>();
}

/// Update function
/// Called every frame
function Update () {
	
	//Debug.Log("grounded=" + grounded);
    // Check is player =is dead
    if (isDead) die();

    // Check player is grounded
    if (!grounded && r2d.velocity.y == 0  && r2d.transform.position.y <= -9.032f) {
        grounded = true;
    }

    // Input Management
    //if (Input.GetKey(KeyCode.Space) && grounded){ //for gliding
    if (Input.GetKeyDown(KeyCode.Space) && grounded){ //for simple jump
    	deltaTime = Time.deltaTime;
        jump();
    }
    // Attack
    if (Input.GetKey(KeyCode.RightShift) || Input.GetKey(KeyCode.LeftShift)) {
        // TO DO: Attack code here.
    }
    if(!grounded && Input.GetKey(KeyCode.Space)){
		glide();
	}
}

//*****************************************************************************************
// Player action functions

function die(){
    // TO DO: Death sequence code here.
}

function jump() {
    r2d.AddForce(transform.up * jumpPower); 
    grounded = false;
}

function glide(){
	Debug.Log("GLIDING");
	r2d.AddForce(transform.up * jumpPower/60);
}

//*****************************************************************************************
// Helper functions

function isDead() {
    return HP <= 0 ? true : false;
}