// Attributes
private var r2d;      					    // Required: 2D Rigidbody Component
//private var grounded : boolean = false;   	// Boolean: Grounded (at ground level and not jumping or flying)
//private var jumping : boolean = false;   	// Boolean: Grounded (at ground level and not jumping or flying)
public var jumpPower : float;    			// Integer: Jump force multiplyer
private var startTime: float;
private var attackTime : float = 0.5f;
private var isAttacking: boolean = false;

public var attackbox : GameObject;              // GameObject: Attack box game object

private var HP : int;     				    // Integer: HP
private var BoosterGauge : int;             // Interger: Booster Gauge count

private enum State { Running,Jumping,Gliding,Falling,Damaged,Attacking,Death };
public var currentState : State;

/// Start function: Used for initialization
function Start () {
    // Get Component of Rigidbody
    r2d = GetComponent.<Rigidbody2D>();
    //attackbox = 
    // Attack Box attackbox Initialization
  // attackbox = GameObject.CreatePrimitive(PrimitiveType.Cube);
  // attackbox.name = "AttackBox";
  // attackbox.transform.localScale = transform.localScale;
  // attackbox.transform.localScale.y *=2;
  // //attackbox.AddComponent.<BoxCollider>();							// give it a box collider (why is there 2)
  // attackbox.GetComponent.<Renderer>().enabled = false;			// don't render the box
  // attackbox.GetComponent.<BoxCollider>().isTrigger = true; // enable trigger		/////// not working

    // State defaulted
    currentState = State.Running;

    var changedState;

}

/// Update function: Called every frame
function Update () {

    var lastState = currentState;
    
	// check state catches
	if (r2d.velocity.y == 0) {
		currentState = State.Running;
	}
	//else if (currentState == State.Jumping && r2d.velocity.y < 0) {
	else if (r2d.velocity.y < 0) {
		currentState = State.Falling;
	}

	if(isAttacking){
        attackbox.transform.position.y = transform.position.y + 1.0f;
		if(startTime + attackTime < Time.time){
			//Destroy(attackbox);
		    isAttacking = false;
			attackbox.transform.position.y = -5;
		}
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


    // Input Management------------------------------------------------
    // JUMP
    if (Input.GetKeyDown(KeyCode.Space) && currentState == State.Running){ 
    	//deltaTime = Time.deltaTime;
    	currentState = State.Jumping;
        jump();
    }
    // Attack
    if (Input.GetKeyDown(KeyCode.RightShift) || Input.GetKeyDown(KeyCode.LeftShift)) {
        //currentState = State.Attacking; //changes state
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

   //if(transform.position.y <=5.5f){
   //		transform.position.y += 0.5f;
   //}
   //grounded = false;
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
