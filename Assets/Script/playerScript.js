// Attributes
private var r2d;      					    // Required: 2D Rigidbody Component
private var gm : GameManager;				// GameManager object: reference of GameManager script
public var jumpPower : float = 300;			// Integer: Jump force multiplyer

private var attackbox : GameObject;          // GET FROM GM
private var startTime: float;
private var attackTime : float = 0.5f;
private var isAttacking: boolean = false;
private var initialGravity: float;			//Variable to save the initial gravity scale. (Used to stop falling during pause)

//private var HP : int = 100;  				// Integer: HP, default (100%)
//private var BoosterGauge : int = 100;       // Interger: Booster Gauge count
private enum State { Running,Jumping,Gliding,Falling,Death };
private var currentState : State;
private var startPosX;

// Get Method for other scripts to use
function GetState() { return currentState; }

/// Start function: Used for initialization
function Start () {
    // Get Component of Rigidbody
    r2d = GetComponent.<Rigidbody2D>();
    initialGravity = r2d.gravityScale;

    // Access to game object with GM script
    gm = GameObject.Find("GameManager").GetComponent(GameManager);

    // Get attackbox from GM??
    attackbox = GameObject.Find("AttackBox(Clone)");
    attackbox.transform.localPosition = Vector3(1, 0.5, 0);
    attackbox.SetActive(false);	// begins false

    startPosX = transform.position.x;
    // State defaulted
    currentState = State.Running;
    var changedState;
}

/// Update function: Called every frame
function FixedUpdate () {

    if(gm.currentState == gm.GameState.Active){
    	r2d.gravityScale = initialGravity;

		transform.position.x = startPosX;
	    //var lastState = currentState;	// for Debug: prints current state to console upon change

	    //Debug.Log( gm.GetBooster());
	    // Check is player is dead
	    if (IsDead()) Die();

		// State catching-------------------------------------------------------
		if (r2d.velocity.y <= 0 && r2d.velocity.y >=-0.02) { //range set to account for minimal velocity while on platform
			currentState = State.Running;
		}
		else if (r2d.velocity.y < -0.02) {
			currentState = State.Falling;
		}

		// Action catching-------------------------------------------------------

		if(isAttacking){
	        //attackbox.transform.position.y = 1.0f;
	        //attackbox.SetActive(true);

			if(startTime + attackTime < Time.time){
			    isAttacking = false;
				//attackbox.transform.position.y = -10;
				attackbox.SetActive(false); // THIS WORKS DONT TOUCH

			}
		}

	    // Input Management------------------------------------------------
	    // Space: Jump
	    if (Input.GetKeyDown(KeyCode.Space) && currentState == State.Running){
	    	currentState = State.Jumping;
	        Jump();
	    }
	    // Left/Right Shift: Attack
	    if (Input.GetKeyDown(KeyCode.Z) || Input.GetKeyDown(KeyCode.RightShift) || Input.GetKeyDown(KeyCode.LeftShift)) {
			Attack();
	    }
	    // Hold Space: Glide
	    else if(Input.GetKey(KeyCode.Space) && currentState != State.Running && currentState != State.Jumping && gm.GetBooster() > 0 && gm.GetRecovering() == false){	// or gauge is > 0 // can start gliding from jump?? assumedly if you hold it they would start gliding the INSTANT after v.y < 0
	    	currentState = State.Gliding;
			Glide();
		}
	    //------------------------------------------------------------------

	    // for Debug: Only print state to console if there is a change
	    /*changedState = currentState;
	    if (lastState != changedState) {
	        Debug.Log("Current State = " + currentState);
	    }*/

	    r2d.velocity.y = Mathf.Clamp(r2d.velocity.y, -4.0f, 8.0f); //try for 6
    }
    else{ 
    	r2d.velocity.y = 0; //set velocity to 0 to prevent falling
    	r2d.gravityScale = 0; //disables gravity (< ^ BOTH are necessary)
    }

	
}

//*****************************************************************************************
// Player action functions

function Die(){
    // TO DO: Death sequence code here.
    //Debug.Log("Die function called in playerScript");
    currentState = State.Death;
}

function Jump() {
   r2d.AddForce(transform.up * jumpPower);
}

function Glide(){
	r2d.AddForce(transform.up * jumpPower / 30);
}

function Attack(){
    isAttacking = true;
    attackbox.SetActive(true);		// THIS WORKS DONT TOUCH
	//attackbox.transform.position = transform.position;
	//attackbox.transform.position.x += transform.localScale.x;
	startTime = Time.time;

}

//*****************************************************************************************
// Helper functions

function IsDead() {
    return gm.GetHP() <= 0;
}