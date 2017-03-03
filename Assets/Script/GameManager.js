#pragma strict
import UnityEngine.UI;

/// Public Game Manager class that handles gameplay
/// Holds global variables like player stats
/// Handles loading and instantiating prefabs
public class GameManager extends MonoBehaviour{
    // Prefabs //
    public var playerPrefab : GameObject;
    public var attackBoxPrefab : GameObject;
    public var boosterGaugePrefab : GameObject;
    public var HPBarPrefab : GameObject;

    // Game Objects //
    public var HPBarTextObj: GameObject;	// directrly alter Text component
    // (public to be shared across scripts, but not alterable in Inspector)
    @HideInInspector
    public var player : GameObject;
    @HideInInspector
   	public var attackBox : GameObject;
   	@HideInInspector
    public var boosterGauge : GameObject;
    @HideInInspector
    public var HPBar : GameObject;

    // Player Variables //
    var HP_MAX : float = 100;
    var HP : float;
    var BOOSTER_MAX : float = 100;
    var playerState;

    public function GetHP() { return HP; }
    public function GetBooster()  { return boosterGauge.transform.localScale.z; }
    public function GetRecovering() { return recovering; }

    // HUD Variables //
    var initialHPBarWidth : float;
    var initialBooBarWidth : float;
    var currentHPBarWidth : float;
    var currentBooBarWidth : float;
    var HPBarText : UI.Text;			// Text component of HPBarTextObj
    var booster_affector : float;		// Number count to adjust booster gauge (+/-)
    var recovering : boolean;


    // GAME STATES //
    @HideInInspector
    public enum GameState { Active, GameOver, Paused };
    public var currentState : GameState;


    function Start () {
        // Create Game objects

        // Create Heirarchy----------
        // Player
        //		AttackBox
        //		BoosterGauge
        // HUD
        // 		Background
        //		HPBar
        //--------------------------

        player = Instantiate(playerPrefab, new Vector3(-2.86, 3.55, 0), Quaternion.identity);

        attackBox = Instantiate(attackBoxPrefab, transform.position, Quaternion.identity); // instantiate at local position of GM-GO (transform.position)
        attackBox.transform.parent = player.transform;	// append as child to player object

        HPBar = Instantiate(HPBarPrefab, transform.position, Quaternion.Euler(Vector3(-90,0,0)));
        HPBar.transform.parent = GameObject.Find("HUD").transform;
        HPBar.transform.localPosition = Vector3(1.12, 2.21, 1.16);	// apply position locally to HUD

        HPBarText = HPBarTextObj.GetComponent("Text");

      	boosterGauge = Instantiate(boosterGaugePrefab, transform.position, Quaternion.Euler(Vector3(-90,0,0)));
        boosterGauge.transform.parent = player.transform;
        boosterGauge.transform.localPosition = Vector3(-0.79,0.01,-0.96);
        recovering = false;

        // Set starting values
        HP = HP_MAX;
        initialHPBarWidth = HPBar.transform.localScale.x;

        //boosterLvl = BOOSTER_MAX;
        initialBooBarWidth = boosterGauge.transform.localScale.z;

        booster_affector = boosterGauge.transform.localScale.z / 100;		// an arbitrary fraction of the gauge
        //var playerScript = player.GetComponent("playerScript"); // this specifically doesn't work
        //Debug.Log("Player state=" + boosterGauge.transform.parent.GetComponent(playerScript).GetState());

        currentState = GameState.Active;
   }

    function Update () {

    //Key Press : P is used to Pause
	if (Input.GetKeyDown(KeyCode.P)){
    	if(currentState == GameState.Active){	
    		currentState = GameState.Paused;
    		GameObject.Find("MenuManager").GetComponent(MenuScript).AddScene(2);
    	}
    	else{
    		GameObject.Find("MenuManager").GetComponent(MenuScript).UnloadScene(2);
    		currentState = GameState.Active;
    	}
	}

    if(currentState == GameState.Active){
    		// Actively update booster gauge
	    	playerState = player.GetComponent(playerScript).GetState();
	    	//Debug.Log(playerState);
	    	if (playerState.ToString() == "Gliding" && boosterGauge.transform.localScale.z > 0 ) {
	    		boosterGauge.transform.localScale.z -= booster_affector;
	    		recovering = false;
	    	}
	    	//else {		// as of now the booster bar will grow forever
	    	//	boosterGauge.transform.localScale.z += booster_affector * 2f;
			//	recovering = true;
	    	//}

	    	else if(boosterGauge.transform.localScale.z <= initialBooBarWidth){		// deactivates gliding?
				boosterGauge.transform.localScale.z += booster_affector * 2 ;
				recovering = true;
			}

			if(boosterGauge.transform.localScale.z >= initialBooBarWidth){
	    		recovering = false;
			}


	    }
	    }

	    // Player functions-----------------
    public function TakeDamage(damage : int) {
    	// deplete HP
    	HP -= damage;
    	Debug.Log("HP=" + GetHP());

    	// adjust HP bar & text
    	HPBar.transform.localScale.x = initialHPBarWidth * ( HP / HP_MAX );
  		HPBarText.text = HP + "%";

  		if (HP <= 0) {
  			HPBar.transform.localScale.x = 0f;
  		}
    }

    

}

