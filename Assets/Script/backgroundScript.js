#pragma strict
 private var startPos : float;
 private var WIDTH : float;
 //NEED A NUMBER TO BE THE CROSSING LINE FOR BG MOVEMENT

function Start () {
	startPos = transform.position.x;
	WIDTH = GetComponent.<MeshFilter>().mesh.bounds.size.x;

	Debug.Log("startPos = " + startPos);
	Debug.Log("width = " + WIDTH);
}

function Update () {
	transform.position.x-=0.1f;
	if(transform.position.x < startPos - WIDTH*1.5){
		transform.position.x = startPos + WIDTH*2;
	}
}
