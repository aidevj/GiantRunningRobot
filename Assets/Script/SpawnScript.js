// Public prefabs
public var enemy : GameObject;      // Game Object: Enemy Prefab
public var platform : GameObject;   // Game Object: Platform Prefab
public var longPlatform : GameObject;   // Game Object: Platform Prefab
public var box : GameObject;  		// Game Object: Platform Prefab
public var mine : GameObject;  		// Game Object: Platform Prefab
public var flying : GameObject;  	// Game Object: Platform Prefab
public var waveCount : int = 1;
public var spawnTime : float = 2;
private var Z_LOC : float = 0;
private var gm : GameManager;				// GameManager object: reference of GameManager script
private var loader : LoadInScript;				

private var y1 : float;         // Float: top bound of renderer of spawn obj
private var y2 : float;         // Float: bottom bound of renderer of spawn obj

// Needs y offset for platforms to spawn (not too close to the ceiling, need character y size)

function Start () {
    // Access to game object with GM script
    gm = GameObject.Find("GameManager").GetComponent(GameManager);
    loader = GameObject.Find("LevelLoader").GetComponent(LoadInScript);
    // get the renderer component of the spawn object
    var render = GetComponent("Renderer");

    // instantiated position of the top & bottom edges of spawn obj
    y1 = transform.position.y - render.bounds.size.y/2;
    y2 = transform.position.y + render.bounds.size.y/2;
  
    // Random Spawning----------------------------------------------------
    // call the 'addEnemy' function in 0 seconds
    // then every 'spawnTime' seconds
    //    InvokeRepeating("addEnemy", Random.Range(0,4), spawnTime);
    //    InvokeRepeating("addPlatform", Random.Range(0,4), spawnTime); 

    //Spawn Loaded Level--------------------------------------------------
    	//set a position for spawning
    	var spawnPos= transform.position;
		spawnPos.y = y1;
    	Debug.Log(transform.position);
    	for(var i=0; i<loader.lvl.length; i++){
    		if(loader.lvl[i] == "B"){
    			//Spawn Box
    			switch(loader.lvl[i+1]){
    				case "1":
	    				Instantiate(box, spawnPos, Quaternion.identity);
						spawnPos.y += 1.0f;
	    				Instantiate(box, spawnPos, Quaternion.identity);
						spawnPos.y = y1;
						//spawnPos.x += 1.5f;
						i++;
						break;
					case "2":
	    				for(var j=0; j<4;j++){
		    				Instantiate(box, spawnPos, Quaternion.identity);
							spawnPos.y += 1.0f;
						}
	    				Instantiate(box, spawnPos, Quaternion.identity);
						//spawnPos.x += 1.5f;
						i++;
						break;
					case "3":
						spawnPos.y += 6.0f;
	    				Instantiate(box, spawnPos, Quaternion.identity);
						spawnPos.y = y1;
						spawnPos.x += 1.5f;
						i++;
						break;
					default:
						Instantiate(box, spawnPos, Quaternion.identity);
						//spawnPos.x += 1.5f;

    			}
			}
			else if(loader.lvl[i] == "P"){
				//Spawn Platform
				var prefb;
				if(loader.lvl[i+1] == "L" || loader.lvl[i+2] == "L")
					prefb = longPlatform;
				else
					prefb = platform;

				switch(loader.lvl[i+1]){
    				case "1":
						spawnPos.y += 3.25f;
	    				Instantiate(prefb, spawnPos, Quaternion.identity);
						spawnPos.y = y1;
						i++;
						break;
					case "2":
						spawnPos.y += 4.5f;
	    				Instantiate(prefb, spawnPos, Quaternion.identity);
						spawnPos.y = y1;
						i++;
						break;
					case "E":
						spawnPos.y += 1.5f;
	    				Instantiate(prefb, spawnPos, Quaternion.identity);
						spawnPos.y += 1.0f;
	    				Instantiate(enemy, spawnPos, Quaternion.identity);
						spawnPos.y = y1;
						i++;
						break;
					default:
						spawnPos.y +=1.5f;
			    		Instantiate(prefb, spawnPos, Quaternion.identity);
						spawnPos.y = y1;

    			}
			}
			else if(loader.lvl[i] == "E"){
				//Spawn Enemy
				switch(loader.lvl[i+1]){
					case "1":
						spawnPos.y += 2.0f;
	    				Instantiate(enemy, spawnPos, Quaternion.identity);
						spawnPos.y = y1;
						i++;
						break;
    				case "2":
						spawnPos.y += 3.0f;
	    				Instantiate(enemy, spawnPos, Quaternion.identity);
						spawnPos.y = y1;
						i++;
						break;
					default:
						spawnPos.y +=1.0f;
			    		Instantiate(enemy, spawnPos, Quaternion.identity);
						spawnPos.y = y1;

				}
				//Debug.Log("Enemy");
			}
			else if(loader.lvl[i] == "M"){
				//Spawn Mines
	    		Instantiate(mine, spawnPos, Quaternion.identity);
				//Debug.Log("MINE");
			}
			else if(loader.lvl[i] == "F"){
				//Spawn Flying Enemies
				switch(loader.lvl[i+1]){
    				case "1":
						spawnPos.y += 3.5f;
	    				Instantiate(flying, spawnPos, Quaternion.identity);
						spawnPos.y = y1;
						i++;
						break;
    				case "2":
						spawnPos.y += 5.0f;
	    				Instantiate(flying, spawnPos, Quaternion.identity);
						spawnPos.y = y1;
						i++;
						break;
					default:
						spawnPos.y += 2.0f;
			    		Instantiate(flying, spawnPos, Quaternion.identity);
						spawnPos.y = y1;
				}

			}
			else{
				//Increment Space
				spawnPos.x += 2.0f;
				//Debug.Log("Platform");
			}
			//reset the Y position of spawning in case y had changed
			spawnPos.y = y1;

    	}
}

// new function to spawn an enemy at random heights
function addEnemy() {
    if(gm.currentState == gm.GameState.Active){
	    // randomly pick a point within the spawn object
	    var spawnPoint = Vector3(transform.position.x, Random.Range(y1, y2), Z_LOC);

	    // create an enemy at the spawnPoint position (x is the position of the spawn point)
	    Instantiate(enemy, spawnPoint, Quaternion.identity);
	}
}

// new function to spawn a Platform at random heights
function addPlatform() {
    if(gm.currentState == gm.GameState.Active){
	    // randomly pick a point within the spawn object
	    var spawnPoint = Vector3(transform.position.x, Random.Range(y1, y2), Z_LOC);

	    // create a platform at the spawnPoint position
	    Instantiate(platform, spawnPoint, Quaternion.Euler(Vector3(0, 0, 0)));
	}
}

