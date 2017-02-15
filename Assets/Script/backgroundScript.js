#pragma strict
 private var startPos : float;
 private var WIDTH : float;
 private var leftBound : float = -5.28f; //arb
 private var teleportPoint : float = -13.45188;
 //NEED A NUMBER TO BE THE CROSSING LINE FOR BG MOVEMENT

function Start () {
	startPos = transform.position.x;
	//WIDTH = GetComponent.<MeshFilter>().mesh.bounds.size.x;
	WIDTH = GetComponent.<Renderer>().bounds.size.x;

	Debug.Log("startPos = " + startPos);
	Debug.Log("width = " + WIDTH);
}

function Update () {
	transform.position.x-=0.05f;
	if(transform.position.x <= leftBound-WIDTH/2){
		transform.position.x = 19.04293;
	}
}
