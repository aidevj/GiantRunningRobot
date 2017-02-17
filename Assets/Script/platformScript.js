// No collider?? prob will need one later tho,  make platforms not planes tho
// Rigidbody 2D: Gravity Scale = 0

public var x_velocity : int = -5;       // Public variable that contains the speed of the enemy

// Fuction called when the enemy is created
function Start() {
    // Get the rigidbody component
    var r2d = GetComponent("Rigidbody2D");

    // Add a horizantal speed to the enemy
    r2d.velocity.x = x_velocity;
}

// Function called when the object goes out of the screen
function OnBecameInvisible(){
    Destroy(gameObject);
}

// Update Function
function Update(){ 

}

// Function called when the enemy collides with another object
// This object must have IS TRIGGER checked on Box Collider 2D Component*****
function OnTriggerEnter2D(obj) {
    /*// name of the obejct that collided with the enemy
    var name = obj.gameObject.name;
    // If the enemy collided with the spaceshit
    if (name == "Player_temp") {
        // destroy itself (the enemy) to keep things simple
        Destroy(gameObject);
    }*/
}