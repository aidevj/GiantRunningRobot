#pragma strict
<<<<<<< HEAD
private var depletion: float; //value by how much the guage will deplete
private var maxSize : float; //the size of a Full Bar
private var player;

function Start () {
	depletion = transform.localScale.z/100;
	maxSize = transform.localScale.z;

    player = transform.parent.GetComponent(playerScript).currentState;
    Debug.Log(player);
}

function Update () {

    player = transform.parent.GetComponent(playerScript).currentState;

	if(Input.GetKey(KeyCode.Space) && transform.localScale.z >= 0 && player.ToString() == "Gliding"){ //if Space is being pressed --> Need to add "if gliding"
		transform.localScale.z -= depletion ;
    	Debug.Log(player);
	}
	else if(transform.localScale.z <= maxSize){
		transform.localScale.z += depletion*2 ;
	}
=======

function Start () {
	
}

function Update () {
	
>>>>>>> origin/PlatformUpdate
}
