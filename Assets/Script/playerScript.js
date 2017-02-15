// Attributes
private var r2d;      					    // Required: 2D Rigidbody Component
private var HP : int;     				    // Integer: HP
private var grounded : boolean = false;   	// Boolean: Grounded (at ground level and not jumping or flying)
private var jumping : boolean = false;   	// Boolean: Grounded (at ground level and not jumping or flying)
private var deltaTime : float = 0;			// Float: Time Tracker

public var jumpPower : float;    			// Integer: Jump force multiplyer

public var cube : GameObject;

/// Start function
/// Used for initialization
function Start () {
	//Debug.Log("playerScript Initialized");
    // Get Component of Rigidbody
    r2d = GetComponent.<Rigidbody2D>();
    cube= GameObject.CreatePrimitive(PrimitiveType.Cube);
}

/// Update function
/// Called every frame
function Update () {


	//Debug.Log("grounded=" + grounded);
    // Check is player =is dead
    if (isDead) die();

    // Check player is grounded
    if (!grounded && r2d.transform.position.y <=2.85f ) { //STATE MACHINES LATER // AIDEN ALSO DO SPAWNS
        grounded = true;
        jumping = false;
    }

    if(!grounded && !jumping){
    	transform.position.y -=0.1f;
    }

    // Input Management
    if (Input.GetKeyDown(KeyCode.Space) && grounded){ //for simple jump
    	deltaTime = Time.deltaTime;
    	jumping = true;
        jump();
    }
    if(Input.GetKeyUp(KeyCode.Space)){
    jumping = false;
    }
    // Attack
    if (Input.GetKey(KeyCode.RightShift) || Input.GetKey(KeyCode.LeftShift)) {
        // TO DO: Attack code here.
    }
    if(Input.GetKey(KeyCode.Space)){
		glide();
	}
    if(Input.GetKeyDown(KeyCode.LeftShift)){
		attack();
	}
}

//*****************************************************************************************
// Player action functions

function die(){
    // TO DO: Death sequence code here.
}

function jump() {
   // r2d.AddForce(transform.up * jumpPower); 
   if(transform.position.y <=5.5f){
   		transform.position.y += 0.5f;
   }
    grounded = false;
}

function glide(){
	Debug.Log("GLIDING");
	//r2d.AddForce(transform.up * jumpPower/60);
	r2d.transform.position.y += 0.2f;
}

function attack(){
    //make enemy take damage when close enough
    Debug.Log("Attacked!");

}
//*****************************************************************************************
// Helper functions

function isDead() {
    return HP <= 0 ? true : false;
}