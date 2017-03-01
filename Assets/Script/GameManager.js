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
    private var HP_MAX : float = 100;
    private var HP : float;
    private var BOOSTER_MAX : float = 100;
    private var boosterLvl;

    public function GetHP() { return HP; }
    public function GetBoosterLvl()  { return boosterLvl; }

    // HUD Variables //
    var initialHPBarWidth : float;
    var initialBooBarWidth : float;
    var currentHPBarWidth : float;
    var currentBooBarWidth : float;
    var HPBarText : UI.Text;

    // GAME STATES //
    @HideInInspector
    public enum GameState { Active, GameOver, Pause };


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

        HPBar = Instantiate(HPBarPrefab, transform.position, Quaternion.Euler(Vector3(-90,0,0)));
        HPBar.transform.parent = GameObject.Find("HUD").transform; // TO DO: change position locally to HUD, to be done in HUDScript?
        HPBar.transform.localPosition = Vector3(1.12, 2.21, 1.16);

        HPBarText = HPBarTextObj.GetComponent("Text");

        // Set starting values
        HP = HP_MAX;
        initialHPBarWidth = HPBar.transform.localScale.x;
        Debug.Log("initialHPBarWidth=" + initialHPBarWidth);
        initialBooBarWidth = boosterGauge.transform.localScale.x;

   }

    function Update () {
    }

    // Player functions-----------------
    public function TakeDamage(damage : int) {
    	// deplete HP
    	HP -= damage;
    	Debug.Log("HP=" + GetHP());

    	// adjust HP bar & text
    	HPBar.transform.localScale.x = initialHPBarWidth * ( HP / HP_MAX );
  		HPBarText.text = HP + "%";
    }
}

