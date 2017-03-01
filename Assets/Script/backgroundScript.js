#pragma strict
 private var startPos : float;
 private var WIDTH : float;
 private var leftBound : float = -5.28f;		//  Hardcoded values taken from positions of objects in inspector
 private var teleportPoint : float = -13.45188;

function Start () {
	startPos = transform.position.x;
	//WIDTH = GetComponent.<MeshFilter>().mesh.bounds.size.x;
	WIDTH = GetComponent.<Renderer>().bounds.size.x;
}

function Update () {
	// Constantly move the background left
	transform.position.x -= 0.05f;

	// if the position gets to the left most bound
	// move it to the spawn position
	if(transform.position.x <= leftBound - WIDTH/2){
		transform.position.x = 19.04293;		// X position of startPosition of 2nd background panel
	}
}
