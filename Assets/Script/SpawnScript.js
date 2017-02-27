// Public prefabs
public var enemy : GameObject;      // Game Object: Enemy Prefab
public var platform : GameObject;   // Game Object: Platform Prefab
public var waveCount : int = 1;
public var spawnTime : float = 2;
private var Z_LOC : float = 0;

private var y1 : float;         // Float: top bound of renderer of spawn obj
private var y2 : float;         // Float: bottom bound of renderer of spawn obj

// Needs y offset for platforms to spawn (not too close to the ceiling, need character y size)

function Start () {
    // get the renderer component of the spawn object
    var render = GetComponent("Renderer");

    // instantiated position of the top & bottom edges of spawn obj
    y1 = transform.position.y - render.bounds.size.y/2;
    y2 = transform.position.y + render.bounds.size.y/2;

    // call the 'addEnemy' function in 0 seconds
    // then every 'spawnTime' seconds
    for (var i = 0; i < Random.Range(1,3); i++) {
        InvokeRepeating("addEnemy", Random.Range(0,4), spawnTime);
    }   
    for (var j = 0; j < Random.Range(1,3); j++) {
        InvokeRepeating("addPlatform", Random.Range(0,4), spawnTime);
    }   
}

// new function to spawn an enemy at random heights
function addEnemy() {
    // randomly pick a point within the spawn object
    var spawnPoint = Vector3(transform.position.x, Random.Range(y1, y2), Z_LOC);

    // create an enemy at the spawnPoint position (x is the position of the spawn point)
    Instantiate(enemy, spawnPoint, Quaternion.identity);
}

// new function to spawn a Platform at random heights
function addPlatform() {
    // randomly pick a point within the spawn object
    var spawnPoint = Vector3(transform.position.x, Random.Range(y1, y2), Z_LOC);

    // create a platform at the spawnPoint position
    Instantiate(platform, spawnPoint, Quaternion.Euler(Vector3(0, 0, 0)));
}