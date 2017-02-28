#pragma strict

/// Public Game Manager class that handles gameplay
/// Holds global variables like player stats
/// Handles loading and instantiating prefabs
public class GameManager extends MonoBehaviour{
    // Prefabs //
    public var playerPrefab : GameObject;
    public var attackBoxPrefab : GameObject;
    public var boosterGaugePrefab : GameObject;
    public var HPBarPrefab : GameObject;
    public var HPBarText: GameObject;	// directrly alter Text component

    // Game Objects //
    // (public to be shared across scripts, but not alterable in Inspector)
    @HideInInspector
    public var player : GameObject;
    @HideInInspector
   	public var attackBox : GameObject;
   	@HideInInspector
    public var boosterGauge : GameObject;
    @HideInInspector
    public var HPBar : GameObject;

    // Player Variables-------------
    private var HP_MAX : int = 100;
    private var HP : int;
    private var BOOSTER_MAX : float = 100;
    private var boosterLvl;

    public function GetHP() { return HP; }
    public function GetBoosterLvl()  { return boosterLvl; }



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

        attackBox = Instantiate(attackBoxPrefab, transform.position, Quaternion.identity); // instantiate at position of GM-GO
        attackBox.transform.parent = player.transform;

        boosterGauge = Instantiate(boosterGaugePrefab, transform.position, Quaternion.identity); // instantiate at position of GM-GO
        boosterGauge.transform.parent = player.transform;

        HPBar = Instantiate(HPBarPrefab, transform.position, Quaternion.identity);
        HPBar.transform.parent = GameObject.Find("HUD").transform; // TO DO: change position locally to HUD, to be done in HUDScript?


   }

    function Update () {
    	// Debug: print HP to console on change

    	// Update HP bar

    	// Update Booster Gauge
    }

    // Player functions-----------------
    public function TakeDamage(damage : int) {
    	HP -= damage;
    }
}

