#pragma strict
/// Unique to StartScreen Scene
/// Must be on an object in StartScreen Scene
function Start () {
	
}

function Update () {
	// Return key -> To Level Select scene
	if (Input.anyKey){
	    GameObject.Find("MenuManager").GetComponent(MenuScript).ChangeScene(4);
	}
}
