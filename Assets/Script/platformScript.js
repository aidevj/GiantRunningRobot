// No collider?? prob will need one later tho,  make platforms not planes tho
// Rigidbody 2D: Gravity Scale = 0
public var x_velocity : int = -5;   
private var r2d;    // Public variable that contains the speed of the enemy
 private var WIDTH : float;

// Fuction called when the enemy is created
function Start() {
    // Get the rigidbody component
    r2d = GetComponent("Rigidbody2D");
    // Add a horizantal speed to the enemy
    r2d.velocity.x = x_velocity;

	WIDTH = GetComponent.<Renderer>().bounds.size.x;
}

// Function called when the object goes out of the screen
function OnBecameInvisible(){
    Destroy(gameObject);
}

// Update Function
function Update(){ 
    r2d.velocity.x = x_velocity;
}

// Function called when the enemy collides with another object
// This object must have IS TRIGGER checked on Box Collider 2D Component*****
function OnTriggerEnter2D(obj) {
	//Debug.Log("TOUCHING " + obj); //works right
    /*// name of the obejct that collided with the enemy
    var name = obj.gameObject.name;
    // If the enemy collided with the spaceshit
    if (name == "Player") {
        // destroy itself (the enemy) to keep things simple
        Destroy(gameObject);
    }*/

}
function OnCollisionEnter2D(col : Collision2D){
	var playerPosX = col.gameObject.transform.position.x; //player's position in the X
	if(col.gameObject.name == "Player" && playerPosX <= transform.position.x - (WIDTH/2)) //if colliding with the player AND player is to the left of the platform
		Debug.Log("TAKE DAMAGE");
}