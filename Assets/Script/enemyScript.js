// Public variable that contains the speed of the enemy
public var x_velocity : int = -5;
public var amplitude : float = 1;
public var frequency : float = .7;

private var gm : GameManager;				// GameManager object: reference of GameManager script

// Fuction called when the enemy is created
function Start() {
    // Get the rigidbody component
    var r2d = GetComponent("Rigidbody2D");

    // Access to game object with GM script
    gm = GameObject.Find("GameManager").GetComponent(GameManager);

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

    // Collision with Player
    if (name == "Player(Clone)") {
        Destroy(gameObject);
        // alert player script of damage, call TakeDamage
        gm.TakeDamage(5);
        //Destroy(obj.gameObject); // dont' do this its just a reference code
    }

    // Collision with active AttackBox
    if (name == "AttackBox(Clone)") { 
        Destroy(gameObject);
        // Reset (do not destroy) attackbox
        //obj.SetActive(false);	/////////////////
    }
}