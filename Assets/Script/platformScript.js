// No collider?? prob will need one later tho,  make platforms not planes tho
// Rigidbody 2D: Gravity Scale = 0
public var x_velocity : int = -5;   
private var r2d;    // Public variable that contains the speed of the enemy
 private var HEIGHT : float;
 private var WIDTH : float;
 private var player;
 private var playerHeight;
private var gm : GameManager;	

// Fuction called when the enemy is created
function Start() {
    // Get the rigidbody component
    r2d = GetComponent("Rigidbody2D");
    // Add a horizantal speed to the enemy
    r2d.velocity.x = x_velocity;
    player = GameObject.Find("Player(Clone)");

    // Access to game object with GM script
    gm = GameObject.Find("GameManager").GetComponent(GameManager);

	WIDTH = GetComponent(Renderer).bounds.size.x;
	HEIGHT = GetComponent(Renderer).bounds.size.y;
	playerHeight = player.GetComponent(Renderer).bounds.size.y;
}

// Function called when the object goes out of the screen
function OnBecameInvisible(){
    Destroy(gameObject);
}

// Update Function
function Update(){ 

    if(gm.currentState == gm.GameState.Active){
	    r2d.velocity.x = x_velocity;

	    if(player.transform.position.y - (playerHeight/2) <= transform.position.y + (HEIGHT/2.5)){ //the HEIGHT/2.5 = half of the total Height it the .5 allowing a buffer
			GetComponent(EdgeCollider2D).enabled = false; //disables the collider so that the player can phase through the bottom of the platform
	    }
	    else{
			GetComponent(EdgeCollider2D).enabled = true; //enables the collider if the player is above the platform
	    }
    }
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
    if(obj.gameObject.transform.position.x <= transform.position.x - (WIDTH/2)){ //if player is to the left of platform

        gm.TakeDamage(5);
    }

}