// Public variable that contains the speed of the enemy
public var x_velocity : int = -5;
public var amplitude : float = 1;
public var frequency : float = .7;

// Fuction called when the enemy is created
function Start() {
    // Get the rigidbody component
    var r2d = GetComponent("Rigidbody2D");

    // Add a horizantal speed to the enemy
    r2d.velocity.x = x_velocity;

    // make the enemy rotate on itself
    //r2d.angularVelocity = Random.Range(-200, 200);
}

// Function called when the object goes out of the screen
function OnBecameInvisible(){
    // Destroy the enemy
    Destroy(gameObject);
}

// Update Function
function Update(){ 
    //transform.position += amplitude * (Mathf.Sin(2 * Mathf.PI * frequency * Time.time) - Mathf.Sin(2 * Mathf.PI * frequency*(Time.time - Time.deltaTime))) * transform.up;
}

// Function called when the enemy collides with another object
function OnTriggerEnter2D(obj) {
    // name of the obejct that collided with the enemy
    var name = obj.gameObject.name;

    // If the enemy collided with a bullet
    /*if (name == "bullet(Clone)") {
        // destroy itself (the enemy) and bullet
        Destroy(gameObject);
        Destroy(obj.gameObject);
    }*/

    // If the enemy collided with the spaceshit
    //if (name == "Player") {
    //    Destroy(gameObject);
    //    // player needs to take damage--PlayerScript
    //}


    // collide with attack box
    if (name == "AttackBox") { //AAAAAAAAaaaaaaaaa... A
        Destroy(gameObject);
        // TODO: Destroy attack box
    }
}