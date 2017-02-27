﻿// Attributes
private var r2d;      					    // Required: 2D Rigidbody Component
public var jumpPower : float = 300;			// Integer: Jump force multiplyer

private var attackbox : GameObject;          // GET FROM GM
private var startTime: float;
private var attackTime : float = 0.5f;
private var isAttacking: boolean = false;

// Gauge stuff
private var HP : int = 100;  				// Integer: HP, default (100%)
private var BoosterGauge : int = 100;       // Interger: Booster Gauge count
private enum State { Running,Jumping,Gliding,Falling,Death };
private var currentState : State;
private var startPosX;

/// Start function: Used for initialization
function Start () {
    // Get Component of Rigidbody
    r2d = GetComponent.<Rigidbody2D>();

    // Get attackbox from GM??
    attackbox = GameObject.Find("AttackBox(Clone)");
    attackbox.transform.localPosition = Vector3(1, 0.5, 0);	// this is making it 1,.5,0 at the GLOBAL position?????
    attackbox.SetActive(false);	// begins false

    startPosX = transform.position.x;
    // State defaulted
    currentState = State.Running;
    var changedState;
}

/// Update function: Called every frame
function Update () {
	transform.position.x = startPosX;
    var lastState = currentState;	// for Debug: prints current state to console upon change
    
	// State catching-------------------------------------------------------
	if (r2d.velocity.y == 0) {
		currentState = State.Running;
	}
	else if (r2d.velocity.y < 0) {
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

    // Check is player is dead
    if (IsDead) Die();


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
    else if(Input.GetKey(KeyCode.Space) && currentState != State.Running && currentState != State.Jumping){	// or gauge is > 0 // can start gliding from jump?? assumedly if you hold it they would start gliding the INSTANT after v.y < 0
    	currentState = State.Gliding;
		Glide();
	}
    //------------------------------------------------------------------

    // for Debug: Only print state to console if there is a change
    changedState = currentState;
    if (lastState != changedState) {
        Debug.Log("Current State = " + currentState);
    }
}

//*****************************************************************************************
// Player action functions

function Die(){
    // TO DO: Death sequence code here.
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
    return HP <= 0 ? true : false;
}

/// Function to deplete HP by damage recieved from HUD Script
/// Then sends new HP count back to HUD
function TakeDamage(damage : int){
	HP -= damage;
	// send new HP back to HUD

}