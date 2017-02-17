// Attributes
private var r2d;      					    // Required: 2D Rigidbody Component
private var HP : int;     				    // Integer: HP
//private var grounded : boolean = false;   	// Boolean: Grounded (at ground level and not jumping or flying)
//private var jumping : boolean = false;   	// Boolean: Grounded (at ground level and not jumping or flying)
private var deltaTime : float = 0;			// Float: Time Tracker
public var jumpPower : float;    			// Integer: Jump force multiplyer

public var cube : GameObject;

private enum State { Running,Jumping,Gliding,Falling,Damaged,Attacking,Death };
public var currentState : State;

/// Start function: Used for initialization
function Start () {
    // Get Component of Rigidbody
    r2d = GetComponent.<Rigidbody2D>();
    cube= GameObject.CreatePrimitive(PrimitiveType.Cube);

    // State defaulted
    currentState = State.Running;

    Debug.Log("Started");

}

/// Update function: Called every frame
function Update () {

	Debug.Log("Current State = " + currentState);

	// check state catches
	if (r2d.velocity.y == 0) {
		currentState = State.Running;
	}
	//else if (currentState == State.Jumping && r2d.velocity.y < 0) {
	else if (r2d.velocity.y < 0) {
		currentState = State.Falling;
	}

    // Check is player is dead
    if (isDead) die();

    // Check player is grounded
    //if (!grounded && r2d.transform.position.y <=2.85f ) {
    //    grounded = true;
    //    jumping = false;
    //}

    // Simulated Gravity
    //if(!grounded && !jumping){
    //	transform.position.y -=0.1f;
    //}

    // Input Management
    // JUMP
    if (Input.GetKeyDown(KeyCode.Space) && currentState == State.Running){ 
    	//deltaTime = Time.deltaTime;
    	currentState = State.Jumping;
        jump();
    }
    //if(Input.GetKeyUp(KeyCode.Space)){
    //	jumping = false;
    //}
    // Attack
    if (Input.GetKey(KeyCode.RightShift) || Input.GetKey(KeyCode.LeftShift)) {
        // TO DO: Attack code here.
    }
    else if(Input.GetKey(KeyCode.Space) && currentState != State.Running && currentState != State.Jumping){	// or gauge is > 0 // can start gliding from jump?? assumedly if you hold it they would start gliding the INSTANT after v.y < 0
    	currentState = State.Gliding;
		glide();
	}
    else if(Input.GetKeyDown(KeyCode.LeftShift)){
		attack();
	}
}

//*****************************************************************************************
// Player action functions

function die(){
    // TO DO: Death sequence code here.
}

function jump() {
   r2d.AddForce(transform.up * jumpPower);

   //if(transform.position.y <=5.5f){
   //		transform.position.y += 0.5f;
   //}
   //grounded = false;
}

function glide(){
	//Debug.Log("GLIDING");
	r2d.AddForce(transform.up * jumpPower/30);
	//r2d.transform.position.y += 0.2f;
}

function attack(){
    //make enemy take damage when close enough
    //Debug.Log("Attacked!");

}
//*****************************************************************************************
// Helper functions

function isDead() {
    return HP <= 0 ? true : false;
}

function GetState() {
	// JUMPING STATE
	// PREREQ: 
	//		Player must be grounded BEFORE able to enter this state <-- will not work, while in jumping they will be set to grounded in teh else (?)
	/*if (grounded && jumping && r2d.velocity.y > 0) {
		currentState = State.Jumping;
	}
	// GLIDING STATE
	else if (!grounded) {
		
	}
	else if () {}
	else {
		currentState = State.Running;
	}*/

	// FALLING STATE CAUGHT
	if (r2d.velocity.y < 0) {
		currentState = State.Falling;
	}
}