// Attributes
private var r2d;      					    // Required: 2D Rigidbody Component
public var jumpPower : float;    			// Integer: Jump force multiplyer
private var startTime: float;
private var attackTime : float = 0.5f;
private var isAttacking: boolean = false;
public var attackbox : GameObject;          // GameObject: Attack box game object

// Gauge stuff
var HP : int = 100;  				// Integer: HP, default (100%)
private var BoosterGauge : int;             // Interger: Booster Gauge count

private enum State { Running,Jumping,Gliding,Falling,Death };
public var currentState : State;

/// Start function: Used for initialization
function Start () {
    // Get Component of Rigidbody
    r2d = GetComponent.<Rigidbody2D>();
 
    // State defaulted
    currentState = State.Running;
    var changedState;
}

/// Update function: Called every frame
function Update () {

    var lastState = currentState;
    
	// State catching-------------------------------------------------------
	if (r2d.velocity.y == 0) {
		currentState = State.Running;
	}
	else if (r2d.velocity.y < 0) {
		currentState = State.Falling;
	}

	// Action catching-------------------------------------------------------

	if(isAttacking){
        attackbox.transform.position.y = transform.position.y + 1.0f;
		if(startTime + attackTime < Time.time){
		    isAttacking = false;
			attackbox.transform.position.y = -5;
		}
	}

    // Check is player is dead
    if (isDead) die();


    // Input Management------------------------------------------------
    // JUMP
    if (Input.GetKeyDown(KeyCode.Space) && currentState == State.Running){
    	currentState = State.Jumping;
        jump();
    }
    // Attack
    if (Input.GetKeyDown(KeyCode.RightShift) || Input.GetKeyDown(KeyCode.LeftShift)) {
		attack();
    }

    else if(Input.GetKey(KeyCode.Space) && currentState != State.Running && currentState != State.Jumping){	// or gauge is > 0 // can start gliding from jump?? assumedly if you hold it they would start gliding the INSTANT after v.y < 0
    	currentState = State.Gliding;
		glide();
	}
    //------------------------------------------------------------------

    // Only print state to console if there is a change
    changedState = currentState;
    if (lastState != changedState) {
        Debug.Log("Current State = " + currentState);
    }
}

//*****************************************************************************************
// Player action functions

function die(){
    // TO DO: Death sequence code here.
}

function jump() {
   r2d.AddForce(transform.up * jumpPower);
}

function glide(){
	r2d.AddForce(transform.up * jumpPower/30);
	//r2d.transform.position.y += 0.2f;
}

function attack(){
    isAttacking = true;

	attackbox.transform.position = transform.position;
	attackbox.transform.position.x += transform.localScale.x;
	startTime = Time.time;

}
//*****************************************************************************************
// Helper functions

function isDead() {
    return HP <= 0 ? true : false;
}

function takeDamage(damage : int){
	HP -= damage;
}
